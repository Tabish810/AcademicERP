import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  allRooms;
  allRoomType;
  addRoom: FormGroup;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  flag = true;
  submitted = false;
  DeleteRecord = {
    HouseRoomID: null
  }
  UpdateRecord = {
    HouseRoomID: null
  }
  singleRoom;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.addRoom = this.formBuilder.group({
      HouseRoomCode: new FormControl(name, Validators.required),
      Name: new FormControl(name),
      HouseNo: new FormControl(name, Validators.required),
      RoomTypeNo: new FormControl(name, Validators.required),
      TotalBeds: new FormControl(name),
      Price: new FormControl(name, Validators.required),
      Description: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getAllRoomType();
    this.getAllRooms();
  }
  getAllRooms() {
    this.apiService.roomService.getAllRooms().subscribe((res: any) => {
      this.allRooms = res;
      console.log("All Rooms", this.allRooms);

      this.DataTablesFunctionCallAfterDataInit();
    })

  }
  getAllRoomType() {
    this.apiService.roomTypeService.getAllRoomTypes().subscribe((res: any) => {
      this.allRoomType = res;

    })
  }

  //For Modal

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.addRoom.reset();
      const formControl = this.addRoom.get('HouseRoomID');
      if (formControl) {
        this.addRoom.removeControl('HouseRoomID');
      }
    }
    if (type == 'edit') {

    }
    if (type == 'view') {

    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addRoom.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addRoom.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.roomService.createRoom(this.addRoom.value).subscribe((res: any) => {
        //this.addRoom.removeControl('StudentNO');
        this.getAllRooms();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Room Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Room Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addRoom.value)

      this.apiService.roomService.updateRoom(this.addRoom.value).subscribe((res: any) => {
        this.addRoom.removeControl('HouseRoomID');

        this.getAllRooms();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Room Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Room Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.HouseRoomID = id;
    this.apiService.roomService.getRoomById(id).subscribe((res: any) => {
      this.singleRoom = res.Table[0];
      console.log("Single Room Record", this.singleRoom)
      this.addRoom.addControl('HouseRoomID', new FormControl(id));
      this.addRoom.patchValue(this.singleRoom)
    })
    this.addRoom.enable();
  }

  viewRecord(id) {
    this.isOnEdit = false;
    this.addRoom.disable();
    console.log("view ID", id);
    this.apiService.roomService.getRoomById(id).subscribe((res: any) => {
      this.singleRoom = res.Table[0];
      console.log("Single Room Record", this.singleRoom)
      this.addRoom.addControl('HouseRoomID', new FormControl(id));
      this.addRoom.patchValue(this.singleRoom)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.HouseRoomID = id;
    this.apiService.roomService.deleteRoom(this.DeleteRecord).subscribe((res: any) => {
      this.getAllRooms();
      this.notification.create("success", "Success", "Room Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Room Record Deletion Failed")
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
          title: 'Fees Room Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Fees Room Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Fees Room Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Fees Room Report',
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
