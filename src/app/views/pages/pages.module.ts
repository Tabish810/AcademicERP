// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { MailModule } from './apps/mail/mail.module';

import { AdvanceSearchModule } from "./advance-search/advance-search.module";
import { ECommerceModule } from './apps/e-commerce/e-commerce.module';
import { UserManagementModule } from './user-management/user-management.module';
import { MyPageComponent } from './my-page/my-page.component';
import { AcademiceModule } from './academice/academice.module';
import { StudentManagementModule } from './student-management/student-management.module';
import { AccountsManagementModule } from './accounts-management/accounts-management.module';
import { GeneralSetupModule } from './general-setup/general-setup.module';
import { ExaminationSetupModule } from './examination-setup/examination-setup.module';
import { LibraryManagementModule } from './library-management/library-management.module';
import { TransportManagementModule } from './transport-management/transport-management.module';
import { HRManagementModule } from './hr-management/hr-management.module';
import { EventManagementModule } from './event-management/event-management.module';
import { HostelManagementModule } from './hostel-management/hostel-management.module';
import { HomeWorkModule } from './home-work/home-work.module';
@NgModule({
	declarations: [MyPageComponent],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		UserManagementModule,
		AcademiceModule,
		StudentManagementModule,
		AccountsManagementModule,
		GeneralSetupModule,
		ExaminationSetupModule,
		LibraryManagementModule,
		TransportManagementModule,
		HRManagementModule,
		EventManagementModule,
		AdvanceSearchModule,
		HostelManagementModule,
		HomeWorkModule
	],
	providers: []
})
export class PagesModule {
}
