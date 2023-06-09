import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuardService } from '../core';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { pathMatch: 'prefix', path: '', redirectTo: 'login' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'login',
        component: AuthComponent,
      },
      {
        path: 'register',
        component: AuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
