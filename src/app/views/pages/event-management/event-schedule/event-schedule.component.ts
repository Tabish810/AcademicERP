import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-event-schedule',
  templateUrl: './event-schedule.component.html',
  styleUrls: ['./event-schedule.component.scss']
})
export class EventScheduleComponent implements OnInit {

  allEventSchedule;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addEventScheduleForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    EventScheduleID: null
  }
  UpdateRecord = {
    EventScheduleID: null
  }
  singleBookIssue;
  // time1 = new Date(0, 0, 0, 0, 0, 0);
  // time2 = new Date();
  //  this.admissionDate = new Date(this.admissionDate).toISOString().split('T')[0]
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addEventScheduleForm = this.formBuilder.group({
      EventNo: new FormControl(name, Validators.required),
      DateFrom: new FormControl(name, Validators.required),
      DateTo: new FormControl(name),
      TimeFrom: new FormControl(name, Validators.required),
      TimeTo: new FormControl(name),
      Location: new FormControl(name, Validators.required),
      OrganizaedBy: new FormControl(name, Validators.required),
      AwardNo: new FormControl(name),
      EventIncharge: new FormControl(name, Validators.required),
      Description: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getallEventSchedule();
  }

  getallEventSchedule() {
    this.apiService.eventScheduleService.getAllEventSchedule().subscribe(res => {
      this.allEventSchedule = res;
      console.log("All Event Schedule", this.allEventSchedule);
      console.log("Time", this.allEventSchedule[0].TimeFrom);
      var a = (this.allEventSchedule[0].TimeFrom).split(':')[0]
      var b = (this.allEventSchedule[0].TimeFrom).split(':')[1]
      // this.time1.setHours(a)
      // this.time1.setMinutes(b);
      // console.log("A=", a);
      // console.log("B=", b);
      // console.log("hour ", this.time1.getHours());
      // console.log("minute ", this.time1.getMinutes());
      console.log("typ of time", typeof this.allEventSchedule[0].TimeFrom);

      // this.time1 = this.allEventSchedule[0].TimeFrom
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addEventScheduleForm.enable();
      this.addEventScheduleForm.reset();
      const formControl = this.addEventScheduleForm.get('EventScheduleID');
      if (formControl) {
        this.addEventScheduleForm.removeControl('EventScheduleID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this, this.addEventScheduleForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addEventScheduleForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addEventScheduleForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addEventScheduleForm.reset();
  }
  onSave() {

    let dfrom = this.addEventScheduleForm.get("DateFrom").value
    dfrom = new Date(dfrom).toISOString().split('T')[0];
    this.addEventScheduleForm.controls['DateFrom'].patchValue(dfrom);
    console.log("dfrom", dfrom)

    let dTo = this.addEventScheduleForm.get("DateTo").value
    dTo = new Date(dfrom).toISOString().split('T')[0];
    this.addEventScheduleForm.controls['DateTo'].patchValue(dfrom);
    console.log("dTo", dTo);

    let Timefrom = this.addEventScheduleForm.get("TimeFrom").value
    Timefrom = new Date(Timefrom).toISOString().split('T')[1];
    this.addEventScheduleForm.controls['TimeFrom'].patchValue(Timefrom);
    console.log("Timefrom", Timefrom)

    let TimeTo = this.addEventScheduleForm.get("TimeTo").value
    TimeTo = new Date(TimeTo).toISOString().split('T')[1];
    this.addEventScheduleForm.controls['TimeTo'].patchValue(TimeTo);
    console.log("TimeTo", TimeTo);




    if (!this.isOnEdit) {
      this.apiService.eventScheduleService.createEventSchedule(this.addEventScheduleForm.value).subscribe((res: any) => {
        //this.addEventScheduleForm.removeControl('StudentNO');
        this.getallEventSchedule();
        this.isVisible = false;
        this.notification.create("success", "Success", "Event Schedule Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Event Schedule Adding Failed")
      })
    } else {



      console.log("Form Dta", this.addEventScheduleForm.value)

      this.apiService.eventScheduleService.updateEventSchedule(this.addEventScheduleForm.value).subscribe((res: any) => {
        this.addEventScheduleForm.removeControl('EventScheduleID');

        this.getallEventSchedule();
        this.isVisible = false;
        this.notification.create("success", "Success", "Event Schedule Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Event Schedule Updating Failed")
      })


    }

  }

  editRecord(id) {

    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.EventScheduleID = id;
    this.apiService.eventScheduleService.getEventScheduleById(id).subscribe((res: any) => {
      this.singleBookIssue = res.Table[0];
      console.log("Single Event Schedule Record", this.singleBookIssue)
      this.addEventScheduleForm.addControl('EventScheduleID', new FormControl(id));
      this.addEventScheduleForm.patchValue(this.singleBookIssue)
      let Timefrom = this.addEventScheduleForm.get("TimeFrom").value
      Timefrom = new Date(Timefrom).toISOString().split('T')[1];
      this.addEventScheduleForm.controls['TimeFrom'].patchValue(Timefrom);
      console.log("Timefrom", Timefrom)

      let TimeTo = this.addEventScheduleForm.get("TimeTo").value
      TimeTo = new Date(TimeTo).toISOString().split('T')[1];
      this.addEventScheduleForm.controls['TimeTo'].patchValue(TimeTo);
      console.log("TimeTo", TimeTo);
    })
  }

  viewRecord(id) {
    console.log("view ID", id);
    this.apiService.eventScheduleService.getEventScheduleById(id).subscribe((res: any) => {
      this.singleBookIssue = res.Table[0];
      console.log("Single Event Schedule Record", this.singleBookIssue)
      this.addEventScheduleForm.addControl('EventScheduleID', new FormControl(id));
      this.addEventScheduleForm.patchValue(this.singleBookIssue)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.EventScheduleID = id;
    this.apiService.eventScheduleService.deleteEventSchedule(this.DeleteRecord).subscribe((res: any) => {
      this.getallEventSchedule();
      this.notification.create("success", "Success", "Event Schedule Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Event Schedule Record Deletion Failed")
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
          title: 'Event Schedule Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Event Schedule Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Event Schedule Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Event Schedule Report',
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
