import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-event-awards',
  templateUrl: './event-awards.component.html',
  styleUrls: ['./event-awards.component.scss']
})
export class EventAwardsComponent implements OnInit {


  allAwards;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addAwardForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    AwardID: null
  }
  UpdateRecord = {
    AwardID: null
  }
  singleDepart;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addAwardForm = this.formBuilder.group({
      AwardNo: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getAllCity();
  }

  getAllCity() {
    this.apiService.eventAwardsService.getAllEventAwards().subscribe(res => {
      this.allAwards = res;
      console.log("All Award", this.allAwards);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addAwardForm.enable();
      this.addAwardForm.reset();
      const formControl = this.addAwardForm.get('AwardID');
      if (formControl) {
        this.addAwardForm.removeControl('AwardID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this, this.addAwardForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addAwardForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addAwardForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addAwardForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.eventAwardsService.createEventAwards(this.addAwardForm.value).subscribe((res: any) => {
        //this.addAwardForm.removeControl('StudentNO');
        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Award Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Award Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addAwardForm.value)

      this.apiService.eventAwardsService.updateEventAwards(this.addAwardForm.value).subscribe((res: any) => {
        this.addAwardForm.removeControl('AwardID');

        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Award Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Award Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.AwardID = id;
    this.apiService.eventAwardsService.getEventAwardsById(id).subscribe((res: any) => {
      this.singleDepart = res.Table[0];
      console.log("Single Award Record", this.singleDepart)
      this.addAwardForm.addControl('AwardID', new FormControl(id));
      this.addAwardForm.patchValue(this.singleDepart)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.eventAwardsService.getEventAwardsById(id).subscribe((res: any) => {
      this.singleDepart = res.Table[0];
      console.log("Single Award Record", this.singleDepart)
      this.addAwardForm.addControl('AwardID', new FormControl(id));
      this.addAwardForm.patchValue(this.singleDepart)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.AwardID = id;
    this.apiService.eventAwardsService.deleteEventAwards(this.DeleteRecord).subscribe((res: any) => {
      this.getAllCity();
      this.notification.create("success", "Success", "Award Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Award Record Deletion Failed")
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
          title: 'Award Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Award Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Award Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Award Report',
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
