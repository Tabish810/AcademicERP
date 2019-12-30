import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  allDesignation;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addDesignationForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    DesignationID: null
  }
  UpdateRecord = {
    DesignationID: null
  }
  singleDesignation;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addDesignationForm = this.formBuilder.group({
      DesignatioCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getAllCity();
  }

  getAllCity() {
    this.apiService.designationService.getAllDesignation().subscribe(res => {
      this.allDesignation = res;
      console.log("All Designation", this.allDesignation);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addDesignationForm.enable();
      this.addDesignationForm.reset();
      const formControl = this.addDesignationForm.get('DesignationID');
      if (formControl) {
        this.addDesignationForm.removeControl('DesignationID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this, this.addDesignationForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addDesignationForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addDesignationForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addDesignationForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.designationService.createDesignation(this.addDesignationForm.value).subscribe((res: any) => {
        //this.addDesignationForm.removeControl('StudentNO');
        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Designation Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Designation Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addDesignationForm.value)

      this.apiService.designationService.updateDesignation(this.addDesignationForm.value).subscribe((res: any) => {
        this.addDesignationForm.removeControl('DesignationID');

        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Designation Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Designation Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.DesignationID = id;
    this.apiService.designationService.getDesignationById(id).subscribe((res: any) => {
      this.singleDesignation = res.Table[0];
      console.log("Single Designation Record", this.singleDesignation)
      this.addDesignationForm.addControl('DesignationID', new FormControl(id));
      this.addDesignationForm.patchValue(this.singleDesignation)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.designationService.getDesignationById(id).subscribe((res: any) => {
      this.singleDesignation = res.Table[0];
      console.log("Single Designation Record", this.singleDesignation)
      this.addDesignationForm.addControl('DesignationID', new FormControl(id));
      this.addDesignationForm.patchValue(this.singleDesignation)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.DesignationID = id;
    this.apiService.designationService.deleteDesignation(this.DeleteRecord).subscribe((res: any) => {
      this.getAllCity();
      this.notification.create("success", "Success", "Designation Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Designation Record Deletion Failed")
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
          title: 'Designation Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Designation Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Designation Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Designation Report',
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
