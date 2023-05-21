import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent],
  imports: [LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
