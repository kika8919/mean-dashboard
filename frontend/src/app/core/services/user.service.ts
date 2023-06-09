import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../models';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  authBaseUrl: string = `${environment.api_url}${environment.auth_endpoint}`;
  constructor(private apiSvc: ApiService, private jwtSvc: JwtService) {}

  attemptAuth(authType: string, credentials: any): Observable<any> {
    const url =
      authType === 'register'
        ? `${this.authBaseUrl}${environment.register}`
        : `${this.authBaseUrl}${environment.attempt_auth}`;
    return this.apiSvc.post(url, { user: credentials }).pipe(
      map((data) => {
        if (authType === 'login') {
          this.setAuth(data.user);
          return data.user;
        }
        return data;
      })
    );
  }

  setAuth(user: User) {
    this.jwtSvc.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtSvc.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  hasToken() {
    return !!this.jwtSvc.getToken();
  }
}
