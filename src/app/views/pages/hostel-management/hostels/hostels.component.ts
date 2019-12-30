import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {

  allStates;
  allHostels;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  allMaster;
  allRoomType;
  addHostelForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    HouseID: null
  }
  UpdateRecord = {
    HouseID: null
  }
  singleHostel;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addHostelForm = this.formBuilder.group({
      HouseNo: new FormControl(name, Validators.required),
      HouseName: new FormControl(name, Validators.required),
      HouseMasterID: new FormControl(name),
      HouseType: new FormControl(true),
      NoOfRooms: new FormControl(name, Validators.required),
      HEmail: new FormControl(name, Validators.required),
      HContactNo: new FormControl(name),
      HouseAddress: new FormControl(name, Validators.required),
      NoOfBeds: new FormControl(name),
      IsActive: new FormControl(true)
    });
    // this.getAllStates();
    this.getAllMaster();
    this.getAllHostel();
  }

  // getAllStates() {
  //   this.apiService.hostelService.getAllState().subscribe((res: any) => {
  //     this.allStates = res;
  //     console.log("All States", this.allStates);

  //   })
  // }
  getAllHostel() {
    this.apiService.hostelService.getAllHostels().subscribe(res => {
      this.allHostels = res;
      console.log("All Hostel", this.allHostels);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
getAllMaster(){
  this.apiService.employeeService.getAllEmployee().subscribe((res:any)=>{
    this.allMaster=res;
    console.log("Masters",this.allMaster);
    
  })
}

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this, this.addHostelForm.enable();
      this.addHostelForm.reset();
      const formControl = this.addHostelForm.get('HouseID');
      if (formControl) {
        this.addHostelForm.removeControl('HouseID');
      }
    }
    if (type == 'edit') {

      this, this.addHostelForm.enable();
    }
    if (type == 'view') {

      this.addHostelForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addHostelForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addHostelForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.hostelService.createHostel(this.addHostelForm.value).subscribe((res: any) => {
        //this.addHostelForm.removeControl('StudentNO');
        this.getAllHostel();
        this.isVisible = false;
        this.notification.create("success", "Success", "Hostel Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Hostel Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addHostelForm.value)

      this.apiService.hostelService.updateHostel(this.addHostelForm.value).subscribe((res: any) => {
        this.addHostelForm.removeControl('HouseID');

        this.getAllHostel();
        this.isVisible = false;
        this.notification.create("success", "Success", "Hostel Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Hostel Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.HouseID = id;
    this.apiService.hostelService.getHostelById(id).subscribe((res: any) => {
      this.singleHostel = res.Table[0];
      console.log("Single Hostel Record", this.singleHostel)
      this.addHostelForm.addControl('HouseID', new FormControl(id));
      this.addHostelForm.patchValue(this.singleHostel)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.hostelService.getHostelById(id).subscribe((res: any) => {
      this.singleHostel = res.Table[0];
      console.log("Single Hostel Record", this.singleHostel)
      this.addHostelForm.addControl('HouseID', new FormControl(id));
      this.addHostelForm.patchValue(this.singleHostel)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.HouseID = id;
    this.apiService.hostelService.deleteHostel(this.DeleteRecord).subscribe((res: any) => {
      this.getAllHostel();
      this.notification.create("success", "Success", "Hostel Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Hostel Record Deletion Failed")
    })
  }





  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.clear().destroy();
      this.dataTable = null;
    }

    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
      'autoWidth': false,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Hostel Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Hostel Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Hostel Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Hostel Report',
          exportOptions: {
            columns: [0, 1, 2]
          }
        }
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('<i class="fa fa-file-excel-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('<i class="fa fa-columns"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('<i class="fa fa-file-pdf-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('<i class="fa fa-print"> </i>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');
    $('div.dt-buttons span').addClass('text');

    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');

    $('#example_wrapper').addClass('row');
    $('#example_length').addClass('col-lg-6 col-md-6');
    $('#example_filter').addClass('col-lg-6 col-md-6');

    $('#example_length select').css('width', '80px');
    $('#example_length select option:contains("10 rows")').text('10');
    $('#example_length select option:contains("25 rows")').text('25');
    $('#example_length select option:contains("50 rows")').text('50');
    $('#example_length select option:contains("Show all")').text('100').val('100');

    $('#example_info').addClass('col-12');
    $('#example_paginate').addClass('col-12');

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 6 || i === 1) {

      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search" />');
      }

      i++;
    });
    // Apply the search
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        if (that.search() !== (<HTMLInputElement>this).value) {
          that
            .search((<HTMLInputElement>this).value)
            .draw();
        }
      });
    });

    this.flag = false;
  }
}
