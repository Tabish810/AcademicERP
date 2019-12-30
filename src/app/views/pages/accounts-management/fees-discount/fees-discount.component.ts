import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-fees-discount',
  templateUrl: './fees-discount.component.html',
  styleUrls: ['./fees-discount.component.scss']
})
export class FeesDiscountComponent implements OnInit {
  allFeesDiscount;
  allClasses;
  addFeesDiscount: FormGroup;
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
  singleFeesDiscount;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }

  ngOnInit() {
    this.addFeesDiscount = this.formBuilder.group({
      DiscountType: new FormControl(name, Validators.required),
      ClassNo: new FormControl(name, Validators.required),
      AmountPer: new FormControl(name),
      Amount: new FormControl(name, Validators.required),
      IsActive: new FormControl(true)
    });
    this.getAllClasses();
    this.getAllDiscount();
  }
  getAllDiscount() {
    this.apiService.fessDiscountService.getAllFeesDiscount().subscribe((res: any) => {
      this.allFeesDiscount = res;
      console.log("All FeesDiscount", this.allFeesDiscount);

      this.DataTablesFunctionCallAfterDataInit();
    })

  }
  getAllClasses() {
    this.apiService.classService.getAllClass().subscribe((res: any) => {
      this.allClasses = res;
    })
  }

  //For Modal

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this.addFeesDiscount.reset();
      const formControl = this.addFeesDiscount.get('RowUID');
      if (formControl) {
        this.addFeesDiscount.removeControl('RowUID');
      }
    }
    if (type == 'edit') {

    }
    if (type == 'view') {

    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addFeesDiscount.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addFeesDiscount.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.fessDiscountService.createFeesDiscount(this.addFeesDiscount.value).subscribe((res: any) => {
        //this.addFeesDiscount.removeControl('StudentNO');
        this.getAllDiscount();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Discount Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Discount Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addFeesDiscount.value)

      this.apiService.fessDiscountService.updateFeesDiscount(this.addFeesDiscount.value).subscribe((res: any) => {
        this.addFeesDiscount.removeControl('RowUID');

        this.getAllDiscount();
        this.isVisible = false;
        this.notification.create("success", "Success", "Fees Discount Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Fees Discount Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.RowUID = id;
    this.apiService.fessDiscountService.getFeesDiscountById(id).subscribe((res: any) => {
      this.singleFeesDiscount = res.Table[0];
      console.log("Single Discount Record", this.singleFeesDiscount)
      this.addFeesDiscount.addControl('RowUID', new FormControl(id));
      this.addFeesDiscount.patchValue(this.singleFeesDiscount)
    })
    this.addFeesDiscount.enable();
  }

  viewRecord(id) {
    this.isOnEdit = false;
    this.addFeesDiscount.disable();
    console.log("view ID", id);
    this.apiService.fessDiscountService.getFeesDiscountById(id).subscribe((res: any) => {
      this.singleFeesDiscount = res.Table[0];
      console.log("Single Discount Record", this.singleFeesDiscount)
      this.addFeesDiscount.addControl('RowUID', new FormControl(id));
      this.addFeesDiscount.patchValue(this.singleFeesDiscount)
    })
    this.showModal('view')
    
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.RowUID = id;
    this.apiService.fessDiscountService.deleteFeesDiscount(this.DeleteRecord).subscribe((res: any) => {
      this.getAllDiscount();
      this.notification.create("success", "Success", "Discount Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Discount Record Deletion Failed")
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
          title: 'Fees Discount Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Fees Discount Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Fees Discount Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Fees Discount Report',
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
