import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarksheetComponent } from './marksheet/marksheet.component';
import { Routes, RouterModule } from '@angular/router';
import { AdvanceSearchComponent } from './advance-search.component';
import { SharedModule } from '../../../shared/shared.module';

const routes : Routes  = [
  {
    path : '',
    component : AdvanceSearchComponent,
    children : [
      {
        path: '',
        redirectTo : 'marksheet',
        pathMatch : 'full'
      },
      {
        path: 'marksheet',
        component: MarksheetComponent,
      }
    ]
  }
]
@NgModule({
  declarations: [MarksheetComponent,AdvanceSearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdvanceSearchModule { }
