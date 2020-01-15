import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostelsComponent } from './hostels/hostels.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { RoomsComponent } from './rooms/rooms.component';
import { HostelManagementComponent } from './hostel-management.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { AssignHostelComponent } from './assign-hostel/assign-hostel.component';
import { ManageAssignHostelComponent } from './manage-assign-hostel/manage-assign-hostel.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: '',
    component: HostelManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'hostels',
        pathMatch: 'full'
      },
      {
        path: 'hostels',
        component: HostelsComponent
      },
      {
        path: 'room_type',
        component: RoomTypeComponent
      },
      {
        path: 'assign_hostel',
        component: AssignHostelComponent,
      },
      {
        path: 'manage_assign_hostel',
        component: ManageAssignHostelComponent,
      },
      {
        path: 'rooms',
        component: RoomsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HostelManagementComponent, HostelsComponent, RoomTypeComponent, RoomsComponent, AssignHostelComponent, ManageAssignHostelComponent],
  imports: [
    CommonModule,
    SharedModule,
    OwlDateTimeModule,
		OwlNativeDateTimeModule,
    RouterModule.forChild(routes),
  ]
})
export class HostelManagementModule { }
