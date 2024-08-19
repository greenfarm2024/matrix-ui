import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StartComponent } from './start/start.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { usersGuard } from '../../users.guard';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: StartComponent, canActivate: [usersGuard] },
      { path: 'users', component: UsersComponent, canActivate: [usersGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [usersGuard] },
      { path: 'create-user', component: CreateUserComponent, canActivate: [usersGuard] },
      { path: 'view-user', component: ViewUserComponent, canActivate: [usersGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
