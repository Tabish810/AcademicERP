import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

declare const $: JQueryStatic;

@Component({
  selector: 'kt-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  isVisible = false;
  addSectionForm: FormGroup;
  allSection;
  isOnEdit = false;
  dataTable: any;
  flag = true;
  SectionID;
  submitted = false;
  section = {
    SectionName: null,
    SectionCode: null,
    IsActive : true
  }

  updateSection = {
    SectionName: null,
    SectionCode: null,
    SectionID: null,
    IsActive : true
  }

  DeleteSection = {
    SectionID: null
  }



  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addSectionForm = this.formBuilder.group({
      name: new FormControl(name, Validators.required),
      sectionId: new FormControl(name, [Validators.required, Validators.minLength(4)]),
      IsActive : new FormControl(name)
    });
    this.getAllSection();
  }

  get f() { return this.addSectionForm.controls; }

  //View Section
  ViewRecord(id) {
    this.showModal();
    let c;
    c = this.allSection.filter(x => x.SectionID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].SectionID)
      console.log("Field 1", c[0].SectionCode)
      console.log("Field 1", c[0].SectionName)
      this.addSectionForm.setValue({ name: c[0].SectionName, sectionId: c[0].SectionCode })
      this.addSectionForm.disable();
    }
  }




  //Delete Section
  deleteRecord(id) {
    console.log("Section id to delete", id)

    this.DeleteSection.SectionID = id;
    if (id != null || id != undefined) {

      this.apiService.sectionService.deleteSection(this.DeleteSection).subscribe((res: any) => {
        this.getAllSection();
        this.notification.create("success", "Deleted", "Section Deleted Successfully");

      }, (err) => {
        this.notification.create("error", "Failed", "Section Deleting Failed")

      })
    }
  }

  //Update Section
  editRecord(id) {
    this.addSectionForm.enable();
    this.isOnEdit = true;
    this.showModal();
    let c;
    c = this.allSection.filter(x => x.SectionID == id);
    console.log("Seleted row data ", c);
    if (c != undefined || c != null) {
      console.log("Field 1", c[0].SectionCode)
      console.log("Field 1", c[0].SectionName)
      console.log("Field 1", c[0].SectionID)
      this.SectionID = c[0].SectionID;
      this.addSectionForm.setValue({ name: c[0].SectionName, sectionId: c[0].SectionCode })
    }
  }

  onSave() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addSectionForm.invalid) {
      return;
    } else {
      this.section.SectionCode = this.addSectionForm.get('sectionId').value;
      this.section.SectionName = this.addSectionForm.get('name').value;
      this.section.IsActive = this.addSectionForm.get('IsActive').value;
      console.log("Form data", this.addSectionForm.value);
      if (!this.isOnEdit) {
        this.apiService.sectionService.createSection(this.section).subscribe((res: any) => {
          this.isVisible = false;
          this.addSectionForm.reset();
          this.getAllSection();
          console.log("Data before isnerting", this.section)
          this.notification.create("success", "Success", "Section Added Successfully");
        }, (err) => {

          console.log(err)
          this.isVisible = false;
          this.addSectionForm.reset();
          this.notification.create("error", "Failed", "Section Adding Failed")
        })
      }
      else {
        this.updateSection.SectionCode = this.addSectionForm.get('sectionId').value;
        this.updateSection.SectionName = this.addSectionForm.get('name').value;
        this.updateSection.SectionID = this.SectionID;
        this.updateSection.IsActive = this.addSectionForm.get('IsActive').value;
        this.apiService.sectionService.updateSection(this.updateSection).subscribe((res: any) => {
          this.isVisible = false;
          this.addSectionForm.reset();
          this.getAllSection();
          this.notification.create("success", "Updated", "Section Updated Successfully");
        }, (err) => {

          console.log(err)
          this.isVisible = false;
          this.addSectionForm.reset();
          this.notification.create("error", "Failed", "Section Updating Failed")
        }

        )
      }

    }
  }


  onReset() {
    this.submitted = false;
    this.addSectionForm.reset();
  }

  showModal(): void {
    this.isVisible = true;
  }
  hideModal() {

    this.addSectionForm.reset();
    this.isVisible = false;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    this.addSectionForm.enable();
    this.addSectionForm.reset();
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getAllSection() {
    this.apiService.sectionService.getAllSection().subscribe((res: any) => {
      this.allSection = res;
      console.log("Sectionss ", this.allSection)
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
