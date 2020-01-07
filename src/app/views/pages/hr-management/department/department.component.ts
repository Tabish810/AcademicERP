import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  allDeparts;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addDepartForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    DepartmentID: null
  }
  UpdateRecord = {
    DepartmentID: null
  }
  singleDepart;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addDepartForm = this.formBuilder.group({
      DepartmentCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsActive: new FormControl(name)
    });
    this.getAllCity();
  }

  getAllCity() {
    this.apiService.departmentService.getAllDepartment().subscribe(res => {
      this.allDeparts = res;
      console.log("All Department", this.allDeparts);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isOnEdit = false;
      this, this.addDepartForm.enable();
      this.addDepartForm.reset();
      const formControl = this.addDepartForm.get('DepartmentID');
      if (formControl) {
        this.addDepartForm.removeControl('DepartmentID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this, this.addDepartForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addDepartForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addDepartForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addDepartForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.departmentService.createDepartment(this.addDepartForm.value).subscribe((res: any) => {
        //this.addDepartForm.removeControl('StudentNO');
        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Department Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Department Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addDepartForm.value)

      this.apiService.departmentService.updateDepartment(this.addDepartForm.value).subscribe((res: any) => {
        this.addDepartForm.removeControl('DepartmentID');

        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "Department Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Department Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.DepartmentID = id;
    this.apiService.departmentService.getDepartmentById(id).subscribe((res: any) => {
      this.singleDepart = res.Table[0];
      console.log("Single Department Record", this.singleDepart)
      this.addDepartForm.addControl('DepartmentID', new FormControl(id));
      this.addDepartForm.patchValue(this.singleDepart)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.departmentService.getDepartmentById(id).subscribe((res: any) => {
      this.singleDepart = res.Table[0];
      console.log("Single Department Record", this.singleDepart)
      this.addDepartForm.addControl('DepartmentID', new FormControl(id));
      this.addDepartForm.patchValue(this.singleDepart)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.DepartmentID = id;
    this.apiService.departmentService.deleteDepartment(this.DeleteRecord).subscribe((res: any) => {
      this.getAllCity();
      this.notification.create("success", "Success", "Department Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Department Record Deletion Failed")
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
          title: 'Department Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Department Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Department Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Department Report',
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
