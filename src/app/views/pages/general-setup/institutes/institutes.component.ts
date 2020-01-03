import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss']
})
export class InstitutesComponent implements OnInit {
  allInstitutes;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addInstituteForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    InstitueID: null
  }
  UpdateRecord = {
    InstitueID: null
  }
  singleExam;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addInstituteForm = this.formBuilder.group({
      InstituteCode: new FormControl(name, Validators.required),
      InstituteName: new FormControl(name, Validators.required),
      TaxID: new FormControl(name),
      RegistrationNo: new FormControl(name, Validators.required),
      NTNNo: new FormControl(name),
      Currency: new FormControl(name, Validators.required),
      ContactNo: new FormControl(name),
      ContactNo2: new FormControl(name, Validators.required),
      Email: new FormControl(name, Validators.required),
      FaxNo: new FormControl(name, Validators.required),
      WebSite: new FormControl(name, Validators.required),
      CountryNo: new FormControl(name, Validators.required),
      StateNo: new FormControl(name, Validators.required),
      CityNo: new FormControl(name, Validators.required),
      PostalCode: new FormControl(name, Validators.required),
      Address: new FormControl(name),
      IsActive: new FormControl(true)
    });
    this.getAllInstitute();
  }

  getAllInstitute() {
    this.apiService.instituteService.getAllInstitute().subscribe(res => {
      this.allInstitutes = res;
      console.log("All institutes", this.allInstitutes);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this, this.addInstituteForm.enable();
      this.addInstituteForm.reset();
      const formControl = this.addInstituteForm.get('InstitueID');
      if (formControl) {
        this.addInstituteForm.removeControl('InstitueID');
      }
    }
    if (type == 'edit') {

      this, this.addInstituteForm.enable();
    }
    if (type == 'view') {

      this.addInstituteForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addInstituteForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addInstituteForm.reset();
  }
  onSave() {
    console.log(this.addInstituteForm.value);
    if (!this.isOnEdit) {
      this.apiService.instituteService.createInstitute(this.addInstituteForm.value).subscribe((res: any) => {
        //this.addInstituteForm.removeControl('StudentNO');
        this.getAllInstitute();
        this.isVisible = false;
        this.notification.create("success", "Success", "Institute Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Institute Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addInstituteForm.value)

      this.apiService.instituteService.updateInstitute(this.addInstituteForm.value).subscribe((res: any) => {
        this.addInstituteForm.removeControl('InstitueID');

        this.getAllInstitute();
        this.isVisible = false;
        this.notification.create("success", "Success", "Exam Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Exam Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.InstitueID = id;
    this.apiService.instituteService.getInstituteById(id).subscribe((res: any) => {
      this.singleExam = res.Table[0];
      console.log("Single Exam Record", this.singleExam)
      this.addInstituteForm.addControl('InstitueID', new FormControl(id));
      this.addInstituteForm.patchValue(this.singleExam)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.instituteService.getInstituteById(id).subscribe((res: any) => {
      this.singleExam = res.Table[0];
      console.log("Single Exam Record", this.singleExam)
      this.addInstituteForm.addControl('InstitueID', new FormControl(id));
      this.addInstituteForm.patchValue(this.singleExam)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.InstitueID = id;
    this.apiService.instituteService.deleteInstitute(this.DeleteRecord).subscribe((res: any) => {
      this.getAllInstitute();
      this.notification.create("success", "Success", "Exam Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Exam Record Deletion Failed")
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
          title: 'Exam Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Exam Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Exam Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Exam Report',
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

    // Buttons
    $('div.dt-buttons button:nth-child(1)').addClass('button-ops-group').css("margin-right", "10px");
    $('div.dt-buttons button:nth-child(2)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(3)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(4)').addClass('button-ops-group').css("margin-right", "10px");;

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
