import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})

export class ClassComponent implements OnInit {
  isVisible = false;
  addclassForm: FormGroup;
  allClasses;
  isOnEdit = false;
  dataTable: any;
  flag = true;
  submitted = false;
  allSection: any;

  section;
  class = {
    ClassName: null,
    ClassCode: null,
    SectionNo: null,
    IsActive: true,
  }

  updateClass = {
    ClassName: null,
    ClassCode: null,
    SectionNo: null,
    IsActive: true,
    ClassID: null
  }
  DeleteClass = {
    ClassID: null
  }
  ClassID;



  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addclassForm = this.formBuilder.group({
      name: new FormControl(name, Validators.required),
      classcode: new FormControl(name, [Validators.required, Validators.minLength(4)]),
      section: new FormControl(name, Validators.required),
      IsActive : new FormControl(name)
    });

    this.getAllSection();
    this.getAllClass();
    this.getByID(25);
  }
  // get name() { return this.addclassForm.get('name'); }

  // get classcode() { return this.addclassForm.get('classcode'); }

  get f() { return this.addclassForm.controls; }
  onSave() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addclassForm.invalid) {
      return;
    } else {
      this.class.ClassCode = this.addclassForm.get('classcode').value;
      this.class.ClassName = this.addclassForm.get('name').value;
      this.class.SectionNo = this.addclassForm.get('section').value;
      this.class.IsActive = this.addclassForm.get('IsActive').value;
      console.log("Form data", this.addclassForm.value);
      console.log("Form data", this.class);
      if (!this.isOnEdit) {
        this.apiService.classService.createClass(this.class).subscribe((res: any) => {
          this.isVisible = false;
          this.addclassForm.reset();
          this.getAllSection();
          this.getAllClass();
          this.notification.create("success", "Success", "Class Added Successfully");

        }, (err) => {

          console.log(err)
          this.isVisible = false;

          this.addclassForm.reset();
          this.notification.create("error", "Failed", "Class Adding Failed")
        }


        )
      } else {
        this.updateClass.ClassCode = this.addclassForm.get('classcode').value;
        this.updateClass.ClassName = this.addclassForm.get('name').value;
        this.updateClass.SectionNo = this.addclassForm.get('section').value;
        this.updateClass.ClassID = this.ClassID;
        this.updateClass.IsActive = this.addclassForm.get('IsActive').value;
        console.log("Form data for update", this.addclassForm.value);
        console.log("Form data for update class", this.class);
        this.apiService.classService.updateClass(this.updateClass).subscribe((res: any) => {
          this.isVisible = false;

          this.addclassForm.reset();
          this.getAllSection();
          this.getAllClass();
          this.notification.create("success", "Updated", "Class Updated Successfully");

        }, (err) => {
          this.isVisible = false;

          this.addclassForm.reset();
          this.notification.create("error", "Failed", "Class udpating Failed")

        })
      }
    }




  }

  editClass(id) {

    this.isOnEdit = true;
    this.showModal();
    let c;
    c = this.allClasses.filter(x => x.ClassID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].ClassID)
      console.log("Field 1", c[0].ClassCode)
      console.log("Field 1", c[0].ClassName)
      console.log("Field 1", c[0].SectionNo)
      this.ClassID = c[0].ClassID;
      this.addclassForm.setValue({ name: c[0].ClassName, classcode: c[0].ClassCode, section: c[0].SectionNo })
      this.addclassForm.enable();
    }
  }
  ViewClass(id) {
    this.showModal();
    let c;
    c = this.allClasses.filter(x => x.ClassID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].ClassID)
      console.log("Field 1", c[0].ClassCode)
      console.log("Field 1", c[0].ClassName)
      console.log("Field 1", c[0].SectionNo)
      this.addclassForm.setValue({ name: c[0].ClassName, classcode: c[0].ClassCode, section: c[0].SectionNo })
      this.addclassForm.disable();
    }
  }
  deleteClass(id) {
    console.log("Class id to delete", id)

    this.DeleteClass.ClassID = id;
    if (id != null || id != undefined) {


      this.apiService.classService.deleteClass(this.DeleteClass).subscribe((res: any) => {
        this.getAllSection();
        this.getAllClass();
        this.notification.create("success", "Deleted", "Class Deleted Successfully");

      }, (err) => {
        this.notification.create("error", "Failed", "Class Deleting Failed")

      })
    }
  }
  onReset() {
    this.submitted = false;
    this.addclassForm.reset();
  }

  showModal(): void {
    this.isVisible = true;
  }
  hideModal() {

    this.addclassForm.reset();
    this.isVisible = false;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.addclassForm.enable();
    this.addclassForm.reset();
  }

  getAllClass() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
      console.log("Classes ", this.allClasses)
      console.log("Response ", res)
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Section ", this.allSection)
    })

  }

  getSectByID(id) {

    let section = this.allSection.find(x => x.SectionCode == id);

    if (section != undefined) {
      return section.SectionName
    } else {
      return "not found"
    }

  }

  getByID(id) {
    // this.apiService.classService.getClassById(id).subscribe((res: any) => {
    //   console.log("get by id", res);
    // })
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
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('&nbsp;&nbsp;<i class="fa fa-table"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('&nbsp;&nbsp;<i class="fa fa-columns"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('&nbsp;&nbsp;<i class="fa fa-file"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('&nbsp;&nbsp;<i class="fa fa-print"> </i>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');

    // Buttons
    $('div.dt-buttons button:nth-child(1)').addClass('button-ops-group').css("margin-right", "10px");
    $('div.dt-buttons button:nth-child(2)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(3)').addClass('button-ops-group').css("margin-right", "10px");;
    $('div.dt-buttons button:nth-child(4)').addClass('button-ops-group').css("margin-right", "10px");;


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

