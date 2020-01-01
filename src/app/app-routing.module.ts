// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';
const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
			},
			{
				path: 'mail',
				loadChildren: () => import('./views/pages/apps/mail/mail.module').then(m => m.MailModule),
			},
			{
				path: 'ecommerce',
				loadChildren: () => import('./views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
			},
			{
				path: 'ngbootstrap',
				loadChildren: () => import('./views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule),
			},
			{
				path: 'material',
				loadChildren: () => import('./views/pages/material/material.module').then(m => m.MaterialModule),
			},
			{
				path: 'user-management',
				loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule),
			},
			{
				path: 'wizard',
				loadChildren: () => import('./views/pages/wizard/wizard.module').then(m => m.WizardModule),
			},
			{
				path: 'builder',
				loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule),
			},
			{
				path: 'academic',
				loadChildren: () => import('./views/pages/academice/academice.module').then(m => m.AcademiceModule)
			},
			{
				path: 'student_management',
				loadChildren: () => import('./views/pages/student-management/student-management.module').then(m => m.StudentManagementModule)
			},
			{
				path: 'accounts_management',
				loadChildren: () => import('./views/pages/accounts-management/accounts-management.module').then(m => m.AccountsManagementModule)
			},
			{
				path: 'general_setup',
				loadChildren: () => import('./views/pages/general-setup/general-setup.module').then(m => m.GeneralSetupModule)
			},
			{
				path: 'exam_management',
				loadChildren: () => import('./views/pages/examination-setup/examination-setup.module').then(m => m.ExaminationSetupModule)
			},
			{
				path: 'library_management',
				loadChildren: () => import('./views/pages/library-management/library-management.module').then(m => m.LibraryManagementModule)
			},
			{
				path: 'transport_management',
				loadChildren: () => import('./views/pages/transport-management/transport-management.module').then(m => m.TransportManagementModule)
			},
			{
				path: 'hr_management',
				loadChildren: () => import('./views/pages/hr-management/hr-management.module').then(m => m.HRManagementModule)
			},
			{
				path: 'event_management',
				loadChildren: () => import('./views/pages/event-management/event-management.module').then(m => m.EventManagementModule)
			},
			{
				path: 'hostel_management',
				loadChildren: () => import('./views/pages/hostel-management/hostel-management.module').then(m => m.HostelManagementModule)
			},
			{
				path: 'home_work_management',
				loadChildren: () => import('./views/pages/home-work/home-work.module').then(m => m.HomeWorkModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator',
				},
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
		],
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
