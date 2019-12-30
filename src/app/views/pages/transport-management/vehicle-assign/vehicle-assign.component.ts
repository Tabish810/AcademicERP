import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-vehicle-assign',
  templateUrl: './vehicle-assign.component.html',
  styleUrls: ['./vehicle-assign.component.scss']
})
export class VehicleAssignComponent implements OnInit {


  allAsVehicle;
  allVehicles;
  allRoutes;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addasVehicleForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    AssignVehicleID: null
  }
  UpdateRecord = {
    AssignVehicleID: null
  }
  singleAsVehicle;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addasVehicleForm = this.formBuilder.group({
      RoutNo: new FormControl(name, Validators.required),
      VehicleNo: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getAllVehicle();
    this.getAllRoutes();
    this.getAllassignVehicle();
  }

  getAllassignVehicle() {
    this.apiService.assignVehicleService.getAllAssignVehicle().subscribe(res => {
      this.allAsVehicle = res;
      console.log("All assignVehicle", this.allAsVehicle);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
  getAllVehicle() {
    this.apiService.vehicleService.getAllVehicle().subscribe((res: any) => {
      this.allVehicles = res;
      console.log("All Vehicles ", this.allVehicles);

    })
  }


  getAllRoutes() {
    this.apiService.routeService.getAllRoute().subscribe((res: any) => {
      this.allRoutes = res;
      console.log("All routes", this.allRoutes);

    })
  }
  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addasVehicleForm.enable();
      this.addasVehicleForm.reset();
      const formControl = this.addasVehicleForm.get('AssignVehicleID');
      if (formControl) {
        this.addasVehicleForm.removeControl('AssignVehicleID');
      }
    }
    if (type == 'edit') {

      this, this.addasVehicleForm.enable();
    }
    if (type == 'view') {

      this.addasVehicleForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addasVehicleForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addasVehicleForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.assignVehicleService.createAssignVehicle(this.addasVehicleForm.value).subscribe((res: any) => {
        //this.addasVehicleForm.removeControl('StudentNO');
        this.getAllassignVehicle();
        this.isVisible = false;
        this.notification.create("success", "Success", "Assign Vehicle Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Assign Vehicle Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addasVehicleForm.value)

      this.apiService.assignVehicleService.updateAssignVehicle(this.addasVehicleForm.value).subscribe((res: any) => {
        this.addasVehicleForm.removeControl('AssignVehicleID');

        this.getAllassignVehicle();
        this.isVisible = false;
        this.notification.create("success", "Success", "Assign Vehicle Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Assign Vehicle Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.AssignVehicleID = id;
    this.apiService.assignVehicleService.getAssignVehicleById(id).subscribe((res: any) => {
      this.singleAsVehicle = res.Table[0];
      console.log("Single Assign Vehicle Record", this.singleAsVehicle)
      this.addasVehicleForm.addControl('AssignVehicleID', new FormControl(id));
      this.addasVehicleForm.patchValue(this.singleAsVehicle)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.assignVehicleService.getAssignVehicleById(id).subscribe((res: any) => {
      this.singleAsVehicle = res.Table[0];
      console.log("Single Assign Vehicle Record", this.singleAsVehicle)
      this.addasVehicleForm.addControl('AssignVehicleID', new FormControl(id));
      this.addasVehicleForm.patchValue(this.singleAsVehicle)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.AssignVehicleID = id;
    this.apiService.assignVehicleService.deleteAssignVehicle(this.DeleteRecord).subscribe((res: any) => {
      this.getAllassignVehicle();
      this.notification.create("success", "Success", "Assign Vehicle Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Assign Vehicle Record Deletion Failed")
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
          title: 'Assign Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Assign Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Assign Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Assign Vehicle Report',
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
