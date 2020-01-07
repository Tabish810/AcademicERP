import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit {


  allRoomType;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addRoomTypeForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    RoomTypeID: null
  }
  UpdateRecord = {
    RoomTypeID: null
  }
  singleRoomType;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addRoomTypeForm = this.formBuilder.group({
      RommTypeCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsActive: new FormControl(name)
    });
    this.getAllRoomType();
  }

  getAllRoomType() {
    this.apiService.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.allRoomType = res;
      console.log("All Room Type", this.allRoomType);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addRoomTypeForm.enable();
      this.addRoomTypeForm.reset();
      const formControl = this.addRoomTypeForm.get('RoomTypeID');
      if (formControl) {
        this.addRoomTypeForm.removeControl('RoomTypeID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this, this.addRoomTypeForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addRoomTypeForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addRoomTypeForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addRoomTypeForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.roomTypeService.createRoomType(this.addRoomTypeForm.value).subscribe((res: any) => {
        //this.addRoomTypeForm.removeControl('StudentNO');
        this.getAllRoomType();
        this.isVisible = false;
        this.notification.create("success", "Success", "Room Type Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Room Type Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addRoomTypeForm.value)

      this.apiService.roomTypeService.updateRoomType(this.addRoomTypeForm.value).subscribe((res: any) => {
        this.addRoomTypeForm.removeControl('RoomTypeID');

        this.getAllRoomType();
        this.isVisible = false;
        this.notification.create("success", "Success", "Room Type Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Room Type Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.RoomTypeID = id;
    this.apiService.roomTypeService.getRoomTypeById(id).subscribe((res: any) => {
      this.singleRoomType = res.Table[0];
      console.log("Single Room Type Record", this.singleRoomType)
      this.addRoomTypeForm.addControl('RoomTypeID', new FormControl(id));
      this.addRoomTypeForm.patchValue(this.singleRoomType)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.roomTypeService.getRoomTypeById(id).subscribe((res: any) => {
      this.singleRoomType = res.Table[0];
      console.log("Single Room Type Record", this.singleRoomType)
      this.addRoomTypeForm.addControl('RoomTypeID', new FormControl(id));
      this.addRoomTypeForm.patchValue(this.singleRoomType)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.RoomTypeID = id;
    this.apiService.roomTypeService.deleteRoomType(this.DeleteRecord).subscribe((res: any) => {
      this.getAllRoomType();
      this.notification.create("success", "Success", "Room Type Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Room Type Record Deletion Failed")
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
          title: 'Room Type Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Room Type Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Room Type Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Room Type Report',
          exportOptions: {
            columns: [0, 1, 2]
          }
        }
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('&nbsp;&nbsp;<i class="fa fa-table"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('&nbsp;&nbsp;<i class="fa fa-columns"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('&nbsp;&nbsp;<i class="fa fa-file"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('&nbsp;&nbsp;<i class="fa fa-print"> </i>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');
    $('div.dt-buttons span').addClass('text');

    // Buttons
    $('div.dt-buttons button:nth-child(1)').addClass('button-ops-group').css("margin-right", "10px");
    $('div.dt-buttons button:nth-child(2)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(3)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(4)').addClass('button-ops-group').css("margin-right", "10px");;


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
