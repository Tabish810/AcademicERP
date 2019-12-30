import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { ExamGradeComponent } from './exam-grade/exam-grade.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { MarksReportComponent } from './marks-report/marks-report.component';
import { MarksSetupComponent } from './marks-setup/marks-setup.component';

import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ExaminationSetupComponent } from './examination-setup.component';

const routes: Routes = [
  {
    path: '',
    component: ExaminationSetupComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'exam_setup',
        pathMatch: 'full'
      },
      {
        path: 'exam_setup',
        component: ExamComponent
      },
      {
        path: 'exam_grade',
        component: ExamGradeComponent
      },
      {
        path: 'exam_reports',
        component: MarksReportComponent
      },
      {
        path: 'exam_schedule',
        component: ExamScheduleComponent
      },
      {
        path: 'marks_setup',
        component: MarksSetupComponent
      }
    ]
  }
];

@NgModule({
  declarations: [ExamComponent, ExamGradeComponent, ExamScheduleComponent, MarksReportComponent, MarksSetupComponent, ExaminationSetupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ExaminationSetupModule { }
