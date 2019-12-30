import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from './class/class.component';
import { AcademiceComponent } from './academice.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SectionComponent } from './section/section.component';
import { SubjectComponent } from './subject/subject.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { PromoteStudentComponent } from './promote-student/promote-student.component';
import { AssignClassTeacherComponent } from './assign-class-teacher/assign-class-teacher.component';
import { AssignSubjectComponent } from './assign-subject/assign-subject.component';


const routes: Routes = [
  {
    path: '',
    component: AcademiceComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'class',
        pathMatch: 'full'
      },
      {
        path: 'class',
        component: ClassComponent
      },
      {
        path: 'section',
        component: SectionComponent
      },
      {
        path: 'subject',
        component: SubjectComponent
      },
      {
        path: 'time_table',
        component: TimeTableComponent
      },
      {
        path: 'promote_student',
        component: PromoteStudentComponent
      }
    ]
  }
];


@NgModule({
  declarations: [AcademiceComponent, ClassComponent, SectionComponent, SubjectComponent, TimeTableComponent, PromoteStudentComponent, AssignClassTeacherComponent, AssignSubjectComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AcademiceModule { }
