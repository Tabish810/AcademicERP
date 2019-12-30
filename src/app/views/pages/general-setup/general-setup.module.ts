import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { GeneralSetupComponent } from './general-setup.component';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';
import { InstitutesComponent } from './institutes/institutes.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralSetupComponent,
    // canActivate: [ModuleGuard],
    // data: { moduleName: 'ecommerce' },
    children: [
      {
        path: '',
        redirectTo: 'city',
        pathMatch: 'full'
      },
      {
        path: 'city',
        component: CityComponent
      },
      {
        path: 'state',
        component: StateComponent
      },
      {
        path: 'country',
        component: CountryComponent
      },
      {
        path: 'institutes',
        component: InstitutesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [InstitutesComponent, CountryComponent, StateComponent, CityComponent, GeneralSetupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralSetupModule { }
