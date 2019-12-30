import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookEntryComponent } from './book-entry/book-entry.component';
import { BookSuppliersEntryComponent } from './book-suppliers-entry/book-suppliers-entry.component';
import { BookIssueComponent } from './book-issue/book-issue.component';
import { BookReturnComponent } from './book-return/book-return.component';
import { LibraryManagementComponent } from './library-management.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LibraryManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'book_entry',
        pathMatch: 'full'
      },
      {
        path: 'book_entry',
        component: BookEntryComponent
      },
      {
        path: 'book_supplier_entry',
        component: BookSuppliersEntryComponent
      },
      {
        path: 'book_issue',
        component: BookIssueComponent
      },
      {
        path: 'book_return',
        component: BookReturnComponent
      }
    ]
  }
];

@NgModule({
  declarations: [BookEntryComponent, BookSuppliersEntryComponent, BookIssueComponent, BookReturnComponent, LibraryManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LibraryManagementModule { }
