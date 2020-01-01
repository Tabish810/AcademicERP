import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;
@Component({
  selector: 'kt-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  allVehicle;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addVehicleForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    Vehicleid: null
  }
  UpdateRecord = {
    Vehicleid: null
  }
  singleVehicle;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addVehicleForm = this.formBuilder.group({
      VehicleName: new FormControl(name, Validators.required),
      NoPlate: new FormControl(name, Validators.required),
      Model: new FormControl(name),
      DriverName: new FormControl(name, Validators.required),
      DriverContactNo: new FormControl(name),
      DriverLicenceno: new FormControl(name, Validators.required),
      Description: new FormControl(name),
      IsActive: new FormControl(true)
    });
    this.getAllInstitute();
  }

  getAllInstitute() {
    this.apiService.vehicleService.getAllVehicle().subscribe(res => {
      this.allVehicle = res;
      console.log("All institutes", this.allVehicle);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    if (type == 'new') {
      this, this.addVehicleForm.enable();
      this.addVehicleForm.reset();
      const formControl = this.addVehicleForm.get('Vehicleid');
      if (formControl) {
        this.addVehicleForm.removeControl('Vehicleid');
      }
    }
    if (type == 'edit') {

      this, this.addVehicleForm.enable();
    }
    if (type == 'view') {

      this.addVehicleForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addVehicleForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addVehicleForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.vehicleService.createVehicle(this.addVehicleForm.value).subscribe((res: any) => {
        //this.addVehicleForm.removeControl('StudentNO');
        this.getAllInstitute();
        this.isVisible = false;
        this.notification.create("success", "Success", "Vehicle Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Vehicle Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addVehicleForm.value)

      this.apiService.vehicleService.updateVehicle(this.addVehicleForm.value).subscribe((res: any) => {
        this.addVehicleForm.removeControl('Vehicleid');

        this.getAllInstitute();
        this.isVisible = false;
        this.notification.create("success", "Success", "Vehicle Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Vehicle Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.isOnEdit = true;
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.Vehicleid = id;
    this.apiService.vehicleService.getVehicleById(id).subscribe((res: any) => {
      this.singleVehicle = res.Table[0];
      console.log("Single Vehicle Record", this.singleVehicle)
      this.addVehicleForm.addControl('Vehicleid', new FormControl(id));
      this.addVehicleForm.patchValue(this.singleVehicle)
    })
  }

  viewRecord(id) {
    this.isOnEdit = false;
    console.log("view ID", id);
    this.apiService.vehicleService.getVehicleById(id).subscribe((res: any) => {
      this.singleVehicle = res.Table[0];
      console.log("Single Vehicle Record", this.singleVehicle)
      this.addVehicleForm.addControl('Vehicleid', new FormControl(id));
      this.addVehicleForm.patchValue(this.singleVehicle)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.Vehicleid = id;
    this.apiService.vehicleService.deleteVehicle(this.DeleteRecord).subscribe((res: any) => {
      this.getAllInstitute();
      this.notification.create("success", "Success", "Vehicle Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Vehicle Record Deletion Failed")
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
          title: 'Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Vehicle Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Vehicle Report',
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