import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../common/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { StartComponent } from './start-page/start-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from '../users/users-page.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from '../users/create-user-page/create-user-page.component';
import { ViewUserComponent } from '../users/view-user-page/view-user-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    NavbarComponent,
    UsersComponent,
    ReportsComponent,
    CreateUserComponent,
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
