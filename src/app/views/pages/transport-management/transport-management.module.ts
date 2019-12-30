import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle/vehicle.component';
import { VehicleRouteComponent } from './vehicle-route/vehicle-route.component';
import { VehicleAssignComponent } from './vehicle-assign/vehicle-assign.component';
import { TransportManagementComponent } from './transport-management.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: TransportManagementComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'vehicle',
        pathMatch: 'full'
      },
      {
        path: 'vehicle',
        component: VehicleComponent
      },
      {
        path: 'vehicle_route',
        component: VehicleRouteComponent
      },
      {
        path: 'vehicle_assign',
        component: VehicleAssignComponent
      }
    ]
  }
];


@NgModule({
  declarations: [VehicleComponent, VehicleRouteComponent, VehicleAssignComponent, TransportManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class TransportManagementModule { }
