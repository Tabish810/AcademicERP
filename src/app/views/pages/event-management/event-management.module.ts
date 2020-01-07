import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventManagementComponent } from './event-management.component';
import { EventInfoComponent } from './event-info/event-info.component';
import { EventScheduleComponent } from './event-schedule/event-schedule.component';
import { EventAwardsComponent } from './event-awards/event-awards.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
const routes: Routes = [
  {
    path: '',
    component: EventManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'event_info',
        pathMatch: 'full'
      },
      {
        path: 'event_info',
        component: EventInfoComponent
      },
      {
        path: 'event_schedule',
        component: EventScheduleComponent
      },
      {
        path: 'event_awards',
        component: EventAwardsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [EventManagementComponent, EventInfoComponent, EventAwardsComponent, EventScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwlNativeDateTimeModule,
    OwlDateTimeModule,
    RouterModule.forChild(routes),
  ]
})
export class EventManagementModule { }
