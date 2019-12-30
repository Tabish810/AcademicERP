import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'kt-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  isVisible = false;
  addSubjectForm: FormGroup;
  allSubject;
  dataTable: any;
  flag = true;
  isOnEdit = false;
  SubjectID;
  submitted = false;
  allClasses;
  Class;
  classs = {
    ClassID: null
  }

  subject = {
    SubjectName: null,
    SubjectCode: null,
    FK_ClassID: null,
    IsActive: true
  }

  updateSubject = {
    SubjectName: null,
    SubjectCode: null,
    FK_ClassID: null,
    SubjectID: null

  }

  DeleteSubject = {
    SubjectID: null
  }
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addSubjectForm = this.formBuilder.group({
      name: new FormControl(name, Validators.required),
      subjectcode: new FormControl(name, [Validators.required, Validators.minLength(4)]),
      class: new FormControl(name, Validators.required),
    });

    this.getAllClass();
    this.getallSubject();
  }
  // get name() { return this.addSubjectForm.get('name'); }

  // get classId() { return this.addSubjectForm.get('classId'); }

  get f() { return this.addSubjectForm.controls; }


  getAllClass() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
      console.log("Response ", res)
    })
  }

  //View Subject
  ViewRecord(id) {
    this.showModal();
    let c;
    c = this.allSubject.filter(x => x.SubjectID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].FK_ClassID)
      console.log("Field 1", c[0].SubjectCode)
      console.log("Field 1", c[0].SubjectName)
      this.addSubjectForm.setValue({ name: c[0].SubjectName, subjectcode: c[0].SubjectCode, class: c[0].FK_ClassID })
      this.addSubjectForm.disable();
    }
  }




  //Delete Subject
  deleteRecord(id) {
    console.log("Subject id to delete", id)

    this.DeleteSubject.SubjectID = id;
    if (id != null || id != undefined) {

      this.apiService.subjectService.deleteSubject(this.DeleteSubject).subscribe((res: any) => {
        this.getallSubject();
        this.notification.create("success", "Deleted", "Subject Deleted Successfully");

      }, (err) => {
        this.notification.create("error", "Failed", "Subjcet Deleting Failed")

      })
    }
  }

  getClassById(id) {

    let c = this.allClasses.find(x => x.ClassID == id)
    if (c != undefined) {
      console.log("C", c)
      return c.ClassName
    } else {
      return "Class not found"
    }
  }

  //Update Subject
  editRecord(id) {
    this.addSubjectForm.enable();
    this.isOnEdit = true;
    this.showModal();
    let c;
    c = this.allSubject.filter(x => x.SubjectID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].SubjectCode)
      console.log("Field 1", c[0].SubjectName)
      console.log("Field 1", c[0].FK_ClassID)
      this.SubjectID = c[0].SubjectID;
      this.addSubjectForm.setValue({ name: c[0].SubjectName, subjectcode: c[0].SubjectCode, class: c[0].FK_ClassID })
    }
  }

  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addSubjectForm.invalid) {
      return;
    } else {
      this.subject.SubjectCode = this.addSubjectForm.get('subjectcode').value;
      this.subject.SubjectName = this.addSubjectForm.get('name').value;
      this.subject.FK_ClassID = this.addSubjectForm.get('class').value;
      console.log("Form data", this.addSubjectForm.value);
      if (!this.isOnEdit) {
        this.apiService.subjectService.createSubject(this.subject).subscribe((res: any) => {
          this.isVisible = false;
          this.addSubjectForm.reset();
          this.getallSubject();
          console.log("Data before isnerting", this.subject)
          this.notification.create("success", "Success", "Subject Added Successfully");
        }, (err) => {

          console.log(err)
          this.addSubjectForm.reset();
          this.isVisible = false;
          this.notification.create("error", "Failed", "Subject Adding Failed")
        })
      }
      else {
        this.updateSubject.SubjectCode = this.addSubjectForm.get('subjectcode').value;
        this.updateSubject.SubjectName = this.addSubjectForm.get('name').value;
        this.updateSubject.FK_ClassID = this.addSubjectForm.get('class').value;
        this.updateSubject.SubjectID = this.SubjectID;
        this.apiService.subjectService.updateSubject(this.updateSubject).subscribe((res: any) => {
          this.isVisible = false;
          this.addSubjectForm.reset();
          this.getallSubject();
          this.notification.create("success", "Updated", "Subject Updated Successfully");
        }, (err) => {

          console.log(err)
          this.isVisible = false;
          this.addSubjectForm.reset();
          this.notification.create("error", "Failed", "Subject Updating Failed")
        }

        )
      }

    }
  }
  onReset() {
    this.submitted = false;
    this.addSubjectForm.reset();
  }

  showModal(): void {
    this.isVisible = true;
  }
  hideModal() {

    this.isVisible = false;

    this.addSubjectForm.reset();
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.addSubjectForm.enable();
    this.addSubjectForm.reset();
  }

  getallSubject() {
    this.apiService.subjectService.getAllSubject().subscribe((res: any) => {
      this.allSubject = res;
      console.log("Subjectss ", this.allSubject)
      this.DataTablesFunctionCallAfterDataInit();
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
          title: 'Subject Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Subject Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Subject Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Subject Report',
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
