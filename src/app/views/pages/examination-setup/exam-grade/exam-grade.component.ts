import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;


@Component({
  selector: 'kt-exam-grade',
  templateUrl: './exam-grade.component.html',
  styleUrls: ['./exam-grade.component.scss']
})
export class ExamGradeComponent implements OnInit {
  allGrades;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addGradeForm: FormGroup;
  flag = true;
  isView : boolean = false;
  submitted = false;
  DeleteRecord = {
    ExamGradeID: null
  }
  UpdateRecord = {
    ExamGradeID: null
  }
  singleGrade;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.addGradeForm = this.formBuilder.group({
      ExamgradeNo: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      PercentageFrom: new FormControl(name, Validators.required),
      PercentageTo: new FormControl(name, Validators.required),
      IsActive: new FormControl(name)
    });
    this.getAllGrades()
  }

  getAllGrades() {
    this.apiService.gradeService.getAllGrades().subscribe((res: any) => {
      this.allGrades = res;
      console.log("All Grades", this.allGrades);
      this.DataTablesFunctionCallAfterDataInit();
    })

  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    this.isView = false;
    if (type == 'new') {
      this.isView = false;
      this.isOnEdit = false;
      this.addGradeForm.reset();
      this.addGradeForm.enable();
      const formControl = this.addGradeForm.get('ExamGradeID');
      if (formControl) {
        this.addGradeForm.removeControl('ExamGradeID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this.isView = false;
      this.addGradeForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.isView = true;
      this.addGradeForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addGradeForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addGradeForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.gradeService.createGrade(this.addGradeForm.value).subscribe((res: any) => {
        //this.addGradeForm.removeControl('StudentNO');
        this.getAllGrades();
        this.isVisible = false;
        this.notification.create("success", "Success", "Grade Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Grade Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addGradeForm.value)

      this.apiService.gradeService.updateGrade(this.addGradeForm.value).subscribe((res: any) => {
        this.addGradeForm.removeControl('ExamGradeID');

        this.getAllGrades();
        this.isVisible = false;
        this.notification.create("success", "Success", "Grade Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Grade Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.ExamGradeID = id;
    this.apiService.gradeService.getGradeById(id).subscribe((res: any) => {
      this.singleGrade = res.Table[0];
      console.log("Single Grade Record", this.singleGrade)
      this.addGradeForm.addControl('ExamGradeID', new FormControl(id));
      this.addGradeForm.patchValue(this.singleGrade)
    })
  }

  viewRecord(id) {
    console.log("view ID", id);
    this.apiService.gradeService.getGradeById(id).subscribe((res: any) => {
      this.singleGrade = res.Table[0];
      console.log("Single Grade Record", this.singleGrade)
      this.addGradeForm.addControl('ExamGradeID', new FormControl(id));
      this.addGradeForm.patchValue(this.singleGrade)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    if (confirm("Are you sure ?")) {
      this.DeleteRecord.ExamGradeID = id;
      this.apiService.gradeService.deleteGrade(this.DeleteRecord).subscribe((res: any) => {
        this.getAllGrades();
        this.notification.create("success", "Success", "Grade Record Deleted Successfully")

      }, (err) => {

        this.notification.create("error", "Failed", "Grade Record Deletion Failed")
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
          title: 'Grade Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Grade Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Grade Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Grade Report',
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
