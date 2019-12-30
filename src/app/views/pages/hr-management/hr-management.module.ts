import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { HRManagementComponent } from './hr-management.component';
import { EmployeeComponent } from './employee/employee.component';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {
    path: '',
    component: HRManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'department',
        pathMatch: 'full'
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HRManagementComponent, DepartmentComponent, DesignationComponent, EmployeeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HRManagementModule { }
