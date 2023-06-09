import { NgModule } from '@angular/core';
import {
  ApiService,
  AuthGuardService,
  DashboardService,
  UserService,
} from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    DashboardService,
    UserService,
    ApiService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
  ],
})
export class CoreModule {}
