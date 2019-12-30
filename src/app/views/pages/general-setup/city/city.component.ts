import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  allStates;
  allCities;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addCityForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    CityID: null
  }
  UpdateRecord = {
    CityID: null
  }
  singleCity;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addCityForm = this.formBuilder.group({
      CityCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      StateNo: new FormControl(name),
      IsActive: new FormControl(true)
    });
    this.getAllStates();
    this.getAllCity();
  }

  getAllStates() {
    this.apiService.stateService.getAllState().subscribe((res: any) => {
      this.allStates = res;
      console.log("All States", this.allStates);

    })
  }
  getAllCity() {
    this.apiService.cityService.getAllCity().subscribe(res => {
      this.allCities = res;
      console.log("All City", this.allCities);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this, this.addCityForm.enable();
      this.addCityForm.reset();
      const formControl = this.addCityForm.get('CityID');
      if (formControl) {
        this.addCityForm.removeControl('CityID');
      }
    }
    if (type == 'edit') {

      this, this.addCityForm.enable();
    }
    if (type == 'view') {

      this.addCityForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addCityForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addCityForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.cityService.createCity(this.addCityForm.value).subscribe((res: any) => {
        //this.addCityForm.removeControl('StudentNO');
        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "City Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "City Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addCityForm.value)

      this.apiService.cityService.updateCity(this.addCityForm.value).subscribe((res: any) => {
        this.addCityForm.removeControl('CityID');

        this.getAllCity();
        this.isVisible = false;
        this.notification.create("success", "Success", "City Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "City Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.CityID = id;
    this.apiService.cityService.getCityById(id).subscribe((res: any) => {
      this.singleCity = res.Table[0];
      console.log("Single City Record", this.singleCity)
      this.addCityForm.addControl('CityID', new FormControl(id));
      this.addCityForm.patchValue(this.singleCity)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.cityService.getCityById(id).subscribe((res: any) => {
      this.singleCity = res.Table[0];
      console.log("Single City Record", this.singleCity)
      this.addCityForm.addControl('CityID', new FormControl(id));
      this.addCityForm.patchValue(this.singleCity)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.CityID = id;
    this.apiService.cityService.deleteCity(this.DeleteRecord).subscribe((res: any) => {
      this.getAllCity();
      this.notification.create("success", "Success", "City Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "City Record Deletion Failed")
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
          title: 'City Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'City Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'City Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'City Report',
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
