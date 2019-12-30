import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeesSubmitComponent } from './fees-submit/fees-submit.component';
import { FeesDiscountComponent } from './fees-discount/fees-discount.component';
import { FeesTypeComponent } from './fees-type/fees-type.component';
import { FeesTemplateComponent } from './fees-template/fees-template.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AccountsManagementComponent } from './accounts-management.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AccountsManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'submit_fees',
        pathMatch: 'full'
      },
      {
        path: 'submit_fees',
        component: FeesSubmitComponent
      },
      {
        path: 'fees_discount',
        component: FeesDiscountComponent
      },
      {
        path: 'fees_type',
        component: FeesTypeComponent
      },
      {
        path: 'fees_template',
        component: FeesTemplateComponent
      },
      {
        path: 'employee_salary',
        component: EmployeeSalaryComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AccountsManagementComponent, FeesSubmitComponent, FeesDiscountComponent, FeesTypeComponent, FeesTemplateComponent, EmployeeSalaryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]

})
export class AccountsManagementModule { }
