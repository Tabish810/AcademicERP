import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentManagementComponent } from './student-management.component';
import { Routes, RouterModule } from '@angular/router';
import { StudentInfoComponent } from './student-info/student-info.component';
import { AssignClassComponent } from './assign-class/assign-class.component';
import { ParentInfoComponent } from './parent-info/parent-info.component';
import { StudentContactInfoComponent } from './student-contact-info/student-contact-info.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgxImageCompressService } from 'ngx-image-compress';
import {PartialsModule} from '../../partials/partials.module';
const routes: Routes = [
  {
    path: '',
    component: StudentManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'student_info',
        pathMatch: 'full'
      },
      {
        path: 'student_info',
        component: StudentInfoComponent
      },
      {
        path: 'assign_class',
        component: AssignClassComponent
      },
      {
        path: 'parent_info',
        component: ParentInfoComponent
      },
      {
        path: 'student_contact_info',
        component: StudentContactInfoComponent
      }
    ]
  }
];


@NgModule({
  declarations: [StudentManagementComponent, StudentInfoComponent, AssignClassComponent, ParentInfoComponent, StudentContactInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    PartialsModule,
    RouterModule.forChild(routes),
  ],
  providers: [NgxImageCompressService],

})
export class StudentManagementModule {




}
