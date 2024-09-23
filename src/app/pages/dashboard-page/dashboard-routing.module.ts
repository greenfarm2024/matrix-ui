import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StartComponent } from './start-page/start-page.component';
import { UsersComponent } from '../users-page/users-page.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateUserComponent } from '../users-page/create-user-page/create-user-page.component';
import { ViewUserComponent } from '../users-page/view-user-page/view-user-page.component';
import { usersGuard } from '../../users.guard';
import { ArticlePageComponent } from '../article-page/article-page.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: StartComponent, canActivate: [usersGuard] },
      { path: 'users', component: UsersComponent, canActivate: [usersGuard] },
      { path: 'article', component: ArticlePageComponent, canActivate: [usersGuard] },
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
