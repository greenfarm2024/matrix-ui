import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StartComponent } from './start/start.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: StartComponent },
      { path: 'users', component: UsersComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
