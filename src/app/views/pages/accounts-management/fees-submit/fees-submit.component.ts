import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-fees-submit',
  templateUrl: './fees-submit.component.html',
  styleUrls: ['./fees-submit.component.scss']
})
export class FeesSubmitComponent implements OnInit {
  singleStudent;
  allStudent;
  allFeesSubmit;
  isVisible = false;
  addFessForm: FormGroup;
  isOnEdit = false;
  dataTable: any;
  flag = true;
  submitted = false;
  DeleteRecord = {
    RowUID: null
  }
  UpdateRecord = {
    RowUID: null
  }
  singleFeesSubmit;


  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {

    this.addFessForm = this.formBuilder.group({
      RegistrationNo: new FormControl(name, Validators.required),
      FeesTypeNo: new FormControl(name, Validators.required),
      Amount: new FormControl(name, Validators.required),
      Date: new FormControl(name, Validators.required),
      LateFessAmount: new FormControl(0),
      AdditionalAmount: new FormControl(0),
      IsActive: new FormControl(name),
      Description: new FormControl('')
    });
    this.getAllStduent();
    this.getAllFeesSubmit();
  }
  getAllFeesSubmit() {
    this.apiService.feesSubmitService.getAllFeesSubmit().subscribe((res: any) => {
      this.allFeesSubmit = res;
      console.log("All fees SDubmit", this.allFeesSubmit);

      this.DataTablesFunctionCallAfterDataInit();

    })
  }
  getAllStduent() {
    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudent = res;
      console.log("All stduents", this.allStudent);

    })

  }
  getStduent(id) {
    this.apiService.studentService.getStudentById(id).subscribe((res: any) => {
      this.singleStudent = res;
      console.log("Student b y id ", this.singleStudent);
    })
  }

  handleCancel() {
    this.isVisible = false;
  }
  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.addFessForm.reset();
    }

  }
  hideModal() {
    this.isVisible = false;
  }
  onSave() {
    let date = this.addFessForm.get('Date').value
    let regno = this.addFessForm.get('RegistrationNo').value;
    this.addFessForm.controls['RegistrationNo'].patchValue(regno.toString())
    date = new Date(date).toISOString().split('T')[0];
    this.addFessForm.controls['Date'].patchValue(date)
    let c = this.allStudent.filter(x => x.RegistrationNo == this.addFessForm.get('RegistrationNo').value)
    console.log("C", c[0]);
    this.addFessForm.addControl('StudentNO', new FormControl(c[0].StudentCode));
    console.log("Stdudeny NO", c[0].StudentCode)
    console.log("Form Dta", this.addFessForm.value)
    if (!this.isOnEdit) {
      this.apiService.feesSubmitService.createFeesSubmit(this.addFessForm.value).subscribe((res: any) => {
        this.addFessForm.removeControl('StudentNO');
        this.isVisible = false;
        this.getAllFeesSubmit();
        this.notification.create("success", "Success", "Fees Submitted Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Submission Failed")
      })
    } else {

      console.log("Form Dta", this.addFessForm.value)
      this.addFessForm.addControl('RowUID', new FormControl(this.UpdateRecord.RowUID));
      this.apiService.feesSubmitService.updateFeesSubmit(this.addFessForm.value).subscribe((res: any) => {
        this.addFessForm.removeControl('RowUID');
        this.addFessForm.removeControl('StudentNO');
        this.isVisible = false;
        this.getAllFeesSubmit();
        this.notification.create("success", "Success", "Fees Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Updation Failed")
      })
    }
  }

  editRecord(id) {
    this.UpdateRecord.RowUID = id;
    console.log("ROW UID", id)

    this.apiService.feesSubmitService.getFeesSubmitById(id).subscribe((res: any) => {
      this.singleFeesSubmit = res.Table[0];
      console.log("Single fees submit", this.singleFeesSubmit);
      this.addFessForm.patchValue({
        RegistrationNo: this.singleFeesSubmit.RegistrationNo.toString(), FeesTypeNo: this.singleFeesSubmit.FeesTypeNo, Amount: this.singleFeesSubmit.Amount,
        Date: this.singleFeesSubmit.Date, LateFessAmount: this.singleFeesSubmit.LateFessAmount, AdditionalAmount: this.singleFeesSubmit.AdditionalAmount,
        IsActive: this.singleFeesSubmit.IsActive, Description: this.singleFeesSubmit.Description
      });

      console.log("Reg no", this.addFessForm.get('RegistrationNo').value);
      console.log(typeof this.addFessForm.get('RegistrationNo').value);

      this.isOnEdit = true;
      this.addFessForm.enable();
    })
    this.showModal('edit');

  }



  deleteRecord(id) {
    this.DeleteRecord.RowUID = id;
    this.apiService.feesSubmitService.deleteFeesSubmit(this.DeleteRecord).subscribe((res: any) => {
      this.getAllFeesSubmit();
      this.notification.create("success", "Success", "Fess Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Fess Record Deletion Failed")
    })
  }
  ViewRecord(id) {
    console.log("ROW UID", id)
    this.apiService.feesSubmitService.getFeesSubmitById(id).subscribe((res: any) => {
      this.singleFeesSubmit = res.Table[0];
      console.log("Single fees submit", this.singleFeesSubmit);
      this.addFessForm.patchValue({
        RegistrationNo: this.singleFeesSubmit.RegistrationNo, FeesTypeNo: this.singleFeesSubmit.FeesTypeNo, Amount: this.singleFeesSubmit.Amount,
        Date: this.singleFeesSubmit.Date, LateFessAmount: this.singleFeesSubmit.LateFessAmount, AdditionalAmount: this.singleFeesSubmit.AdditionalAmount,
        IsActive: this.singleFeesSubmit.IsActive, Description: this.singleFeesSubmit.Description
      });
    })
    this.isOnEdit = false;
    this.addFessForm.disable();

    this.showModal('view');
  }
  onReset() {
    this.addFessForm.reset();
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
          title: 'Section Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Section Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Section Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Section Report',
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
