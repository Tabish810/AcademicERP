import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-promote-student',
  templateUrl: './promote-student.component.html',
  styleUrls: ['./promote-student.component.scss']
})
export class PromoteStudentComponent implements OnInit {
  allpromoted;
  allClasses;
  allSection;
  allStudent;
  addPromoteStudent: FormGroup;
  isVisible = false;
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
  singleClass;
  singleSection;
  singlePromoteStudent;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.addPromoteStudent = this.formBuilder.group({
      StudentNo: new FormControl(name, Validators.required),
      FromClassNo: new FormControl(name),
      ToClassNo: new FormControl(name, Validators.required),
      ToSectionNo: new FormControl(name, Validators.required),
      Date: new FormControl(name, Validators.required),
      FromSectionNo: new FormControl(name),
      IsActive: new FormControl(true)
    });

    this.getAllSection();
    this.getAllClass();
    this.getAllStudent();
    this.getAllPromotedStudent();

  }

  getAllClass() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
    })
  }
  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Section ", this.allSection)
    })
  }
  getAllStudent() {
    this.apiService.studentService.getAllStudent().subscribe((res: any) => {
      this.allStudent = res;
      console.log("All students ", this.allStudent);
    })
  }
  getAllPromotedStudent() {
    this.apiService.promteStudentService.getAllPromoteStudent().subscribe((res: any) => {
      this.allpromoted = res;
      console.log("Promoted Student ", this.allpromoted)
      this.DataTablesFunctionCallAfterDataInit();
    })

  }

  getClass(id) {
    console.log("IDDDD", id);

    console.log("Classes to filter", this.allClasses);
    let classname = this.allClasses.filter(x => x.ClassID == id);
    console.log("Class Name", classname);
    console.log("");

    return classname[0].ClassName;
  }

  getSection(id) {
    if (this.allSection != undefined) {
      let secname = this.allSection.filter(x => x.SectionID == id)
      console.log("sectio name", secname);
      console.log("");

      return secname[0].SectionName;
    }
  }

  //For Modal 


  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.addPromoteStudent.reset();
      const formControl = this.addPromoteStudent.get('RowUID');
      if (formControl) {
        this.addPromoteStudent.removeControl('RowUID');
      }
      this.isOnEdit = false;
    }
    if (type == 'edit') {
      this.isOnEdit = true;
    }
    if (type == 'view') {
      this.isOnEdit = false;
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addPromoteStudent.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addPromoteStudent.reset();
  }
  onSave() {

    let date = this.addPromoteStudent.get('Date').value;
    date = new Date(date).toISOString().split('T')[0];
    this.addPromoteStudent.controls['Date'].patchValue(date);

    if (!this.isOnEdit) {
      this.apiService.promteStudentService.createPromoteStudent(this.addPromoteStudent.value).subscribe((res: any) => {
        //this.addPromoteStudent.removeControl('StudentNO');
        this.getAllPromotedStudent();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Promotion Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Promotion Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addPromoteStudent.value)

      this.apiService.promteStudentService.updatePromoteStudent(this.addPromoteStudent.value).subscribe((res: any) => {
        this.addPromoteStudent.removeControl('RowUID');

        this.getAllPromotedStudent();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Promotion Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Promotion Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.RowUID = id;
    this.apiService.promteStudentService.getPromoteStudentById(id).subscribe((res: any) => {
      this.singlePromoteStudent = res.Table[0];
      console.log("Single Promotion Record", this.singlePromoteStudent)
      this.addPromoteStudent.addControl('RowUID', new FormControl(id));
      this.addPromoteStudent.patchValue(this.singlePromoteStudent)
    })
    this.addPromoteStudent.enable();
  }

  viewRecord(id) {
    this.isOnEdit = false;
    this.addPromoteStudent.disable();
    console.log("view ID", id);
    this.apiService.promteStudentService.getPromoteStudentById(id).subscribe((res: any) => {
      this.singlePromoteStudent = res.Table[0];
      console.log("Single Promotion Record", this.singlePromoteStudent)
      this.addPromoteStudent.addControl('RowUID', new FormControl(id));
      this.addPromoteStudent.patchValue(this.singlePromoteStudent)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.RowUID = id;
    this.apiService.promteStudentService.deletePromoteStudent(this.DeleteRecord).subscribe((res: any) => {
      this.getAllPromotedStudent();
      this.notification.create("success", "Success", "Promotion Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Promotion Record Deletion Failed")
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
          title: 'Class Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Class Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Class Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Class Report',
          exportOptions: {
            columns: [0, 1, 2, 3]
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
