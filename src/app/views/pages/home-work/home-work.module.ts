import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignHomeWorkComponent } from './assign-home-work/assign-home-work.component';
import { HomeWorkStatusComponent } from './home-work-status/home-work-status.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeWorkComponent } from './home-work.component';
import { HomeWorksComponent } from './home-works/home-works.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeWorkComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'home_work',
        pathMatch: 'full'
      },
      {
        path: 'home_work',
        component: HomeWorksComponent
      },
      {
        path: 'status',
        component: HomeWorkStatusComponent
      },
      {
        path: 'assign',
        component: AssignHomeWorkComponent
      }
    
    ]
  }
];

@NgModule({
  declarations: [HomeWorkComponent, AssignHomeWorkComponent, HomeWorkStatusComponent,HomeWorksComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeWorkModule { }
