import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../common/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { StartComponent } from './start-page/start-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersComponent } from '../users-page/users-page.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from '../users-page/create-user-page/create-user-page.component';
import { ViewUserComponent } from '../users-page/view-user-page/view-user-page.component';
import { ArticlePageComponent } from '../article-page/article-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    StartComponent,
    NavbarComponent,
    UsersComponent,
    ReportsComponent,
    CreateUserComponent,
    ViewUserComponent,
    ArticlePageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
