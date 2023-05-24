import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, NavComponent, SidebarComponent, CardComponent],
  imports: [LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
