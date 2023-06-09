import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtSvc: JwtService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const jwtToken = this.jwtSvc.getToken();
    headers['authorization'] = `Token ${jwtToken}`;
    const reqClone = req.clone({ setHeaders: headers });
    return next.handle(reqClone);
  }
}
