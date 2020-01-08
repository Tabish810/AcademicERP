import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  allCountries;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addCountryForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    CountryID: null
  }
  UpdateRecord = {
    CountryID: null
  }
  singleState;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addCountryForm = this.formBuilder.group({
      CountryCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsActive: new FormControl(name)
    });
    this.getallCountries();
  }

  getallCountries() {
    this.apiService.countryService.getAllCountry().subscribe((res: any) => {
      this.allCountries = res;
      console.log("All Countries", this.allCountries);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  isView : boolean = false;
  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this.isView = false;
      this.isOnEdit = false;
      this, this.addCountryForm.enable();
      this.addCountryForm.reset();
      const formControl = this.addCountryForm.get('CountryID');
      if (formControl) {
        this.addCountryForm.removeControl('CountryID');
      }
    }
    if (type == 'edit') {
      this.isOnEdit = true;
      this.isView = false;
      this, this.addCountryForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.isView = true;
      this.addCountryForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addCountryForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addCountryForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.countryService.createCountry(this.addCountryForm.value).subscribe((res: any) => {
        //this.addCountryForm.removeControl('StudentNO');
        this.getallCountries();
        this.isVisible = false;
        this.notification.create("success", "Success", "State Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "State Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addCountryForm.value)

      this.apiService.countryService.updateCountry(this.addCountryForm.value).subscribe((res: any) => {
        this.addCountryForm.removeControl('CountryID');

        this.getallCountries();
        this.isVisible = false;
        this.notification.create("success", "Success", "State Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "State Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.CountryID = id;
    this.apiService.countryService.getCountryById(id).subscribe((res: any) => {
      this.singleState = res.Table[0];
      console.log("Single State Record", this.singleState)
      this.addCountryForm.addControl('CountryID', new FormControl(id));
      this.addCountryForm.patchValue(this.singleState)
    })
  }

  viewRecord(id) {
    console.log("view ID", id);
    this.apiService.countryService.getCountryById(id).subscribe((res: any) => {
      this.singleState = res.Table[0];
      console.log("Single State Record", this.singleState)
      this.addCountryForm.addControl('CountryID', new FormControl(id));
      this.addCountryForm.patchValue(this.singleState)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    if (confirm("Are you sure ?")) {
      this.DeleteRecord.CountryID = id;
      this.apiService.countryService.deleteCountry(this.DeleteRecord).subscribe((res: any) => {
        this.getallCountries();
        this.notification.create("success", "Success", "State Record Deleted Successfully")

      }, (err) => {

        this.notification.create("error", "Failed", "State Record Deletion Failed")
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
          title: 'State Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'State Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'State Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'State Report',
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
