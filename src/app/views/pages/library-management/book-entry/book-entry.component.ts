import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../../../services/common/api-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
declare const $: JQueryStatic;

@Component({
  selector: 'kt-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.scss']
})
export class BookEntryComponent implements OnInit {
  allBooks;
  isVisible = false;
  isOnEdit = false;
  dataTable: any;
  addBookForm: FormGroup;
  flag = true;
  submitted = false;
  DeleteRecord = {
    BookID: null
  }
  UpdateRecord = {
    BookID: null
  }
  singleBook;
  constructor(private notification: NzNotificationService, private formBuilder: FormBuilder, private httpClient: HttpClient, private chRef: ChangeDetectorRef, private apiService: ApiServiceService) { }


  ngOnInit() {
    this.addBookForm = this.formBuilder.group({
      BookCode: new FormControl(name, Validators.required),
      Name: new FormControl(name, Validators.required),
      IsbnNP: new FormControl(name, Validators.required),
      Publisher: new FormControl(name, Validators.required),
      Author: new FormControl(name, Validators.required),
      SubjectNo: new FormControl(name),
      RackNo: new FormControl(name),
      Qty: new FormControl(name, Validators.required),
      Price: new FormControl(name),
      Date: new FormControl(name, Validators.required),
      Description: new FormControl(name),
      IsActive: new FormControl(true)
    });
    this.getAllBooks();
  }


  getAllBooks() {
    this.apiService.bookService.getAllBook().subscribe(res => {
      this.allBooks = res;
      console.log("All Book", this.allBooks);
      this.DataTablesFunctionCallAfterDataInit();
    })
  }

  showModal(type) {
    this.isVisible = true;
    this.isOnEdit = false;
    if (type == 'new') {
      this, this.addBookForm.enable();
      this.addBookForm.reset();
      this.isOnEdit = false;
      const formControl = this.addBookForm.get('BookID');
      if (formControl) {
        this.addBookForm.removeControl('BookID');
      }
    }
    if (type == 'edit') {

      this.isOnEdit = true;
      this.addBookForm.enable();
    }
    if (type == 'view') {
      this.isOnEdit = false;
      this.addBookForm.disable();
    }
  }
  hideModal() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
    this.addBookForm.reset();
  }
  //End

  //For CRUD

  onReset() {
    this.addBookForm.reset();
  }
  onSave() {
    if (!this.isOnEdit) {
      this.apiService.bookService.createBook(this.addBookForm.value).subscribe((res: any) => {
        //this.addBookForm.removeControl('StudentNO');
        this.getAllBooks();
        this.isVisible = false;
        this.notification.create("success", "Success", "Book Added Successfully")
        this.isVisible = false;
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Book Adding Failed")
      })
    } else {

      console.log("Form Dta", this.addBookForm.value)

      this.apiService.bookService.updateBook(this.addBookForm.value).subscribe((res: any) => {
        this.addBookForm.removeControl('BookID');

        this.getAllBooks();
        this.isVisible = false;
        this.notification.create("success", "Success", "Book Updated Successfully")
      }, (err) => {
        this.isVisible = false;
        this.notification.create("error", "Failed", "Book Updating Failed")
      })


    }

  }

  editRecord(id) {
    this.showModal('edit');
    console.log("Edit ID", id);
    this.UpdateRecord.BookID = id;
    this.apiService.bookService.getBookById(id).subscribe((res: any) => {
      this.singleBook = res.Table[0];
      console.log("Single Book Record", this.singleBook)
      this.addBookForm.addControl('BookID', new FormControl(id));
      this.addBookForm.patchValue(this.singleBook)
    })
  }

  viewRecord(id) {
    console.log("view ID", id);
    this.apiService.bookService.getBookById(id).subscribe((res: any) => {
      this.singleBook = res.Table[0];
      console.log("Single Book Record", this.singleBook)
      this.addBookForm.addControl('BookID', new FormControl(id));
      this.addBookForm.patchValue(this.singleBook)
    })
    this.showModal('view')
  }
  deleteRecord(id) {
    console.log("Delete ID", id);
    this.DeleteRecord.BookID = id;
    this.apiService.bookService.deleteBook(this.DeleteRecord).subscribe((res: any) => {
      this.getAllBooks();
      this.notification.create("success", "Success", "Book Record Deleted Successfully")

    }, (err) => {

      this.notification.create("error", "Failed", "Book Record Deletion Failed")
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
          title: 'Book Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Book Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Book Report',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Book Report',
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
