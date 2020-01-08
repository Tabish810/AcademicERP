import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  allEvents;
  isVisible = false;
  isOnEdit = false;
  isView: boolean = false;
  dataTable: any;
  addEventForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    EventID: null
  }
  UpdateRecord = {
    EventID: null
  }
  singleEvent;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addEventForm = this.formBuilder.group({
      EventNo: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      Description: new FormControl(name, Validators.required),
      IsActive: new FormControl(name)
    });
    this.getAllCity();
  }

  getAllCity() {
    this.apiService.eventService.getAllEvent().subscribe(res => {
      this.allEvents = res;
      console.log("All Event", this.allEvents);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.isOnEdit = false;
      this.isView = false;
     this.addEventForm.enable();
      this.addEventForm.reset();
      const formControl = this.addEventForm.get('EventID');
      if (formControl) {
        this.addEventForm.removeControl('EventID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this.isView = false;
     this.addEventForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.isView = true;
      this.addEventForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addEventForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addEventForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.eventService.createEvent(this.addEventForm.value).subscribe((res: any) => {
        //this.addEventForm.removeControl('StudentNO');
        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Event Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Event Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addEventForm.value)

      this.apiService.eventService.updateEvent(this.addEventForm.value).subscribe((res: any) => {
        this.addEventForm.removeControl('EventID');

        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Event Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Event Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.EventID = id;
    this.apiService.eventService.getEventById(id).subscribe((res: any) => {
      this.singleEvent = res.Table[0];
      console.log("Single Event Record", this.singleEvent)
      this.addEventForm.addControl('EventID', new FormControl(id));
      this.addEventForm.patchValue(this.singleEvent)
    })
  }

  viewRecord(id) {
    console.log("view ID", id);
    this.apiService.eventService.getEventById(id).subscribe((res: any) => {
      this.singleEvent = res.Table[0];
      console.log("Single Event Record", this.singleEvent)
      this.addEventForm.addControl('EventID', new FormControl(id));
      this.addEventForm.patchValue(this.singleEvent)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    if (confirm("Are you sure ?")) {
      this.DeleteRecord.EventID = id;
      this.apiService.eventService.deleteEvent(this.DeleteRecord).subscribe((res: any) => {
        this.getAllCity();
        this.notification.create("success", "Success", "Event Record Deleted Successfully")
      }, (err) => {
        this.notification.create("error", "Failed", "Event Record Deletion Failed")
      })
    }
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
          title: 'Event Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Event Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Event Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Event Report',
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
