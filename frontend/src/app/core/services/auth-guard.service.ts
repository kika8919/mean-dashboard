import { Injectable, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userSvc: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuthenticated = false;
    this.userSvc.isAuthenticated.pipe(first()).subscribe(
      (data) => {
        isAuthenticated = data;
      },
      (error) => {
        isAuthenticated = false;
      }
    );
    if (isAuthenticated) {
      return true;
    }
    if (!isAuthenticated && this.userSvc.hasToken()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

// const canActivateGuard = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): CanActivateFn => {
//   let isAuthenticated = false;
//   const userSvc = inject(UserService);
//   const router = inject(Router);
//   userSvc.isAuthenticated.pipe(first()).subscribe(
//           (data) => {
//             isAuthenticated = data;
//           },
//           (error) => {
//             isAuthenticated = false;
//           }
//         );
//   return (
//     isAuthenticated ||
//     (!isAuthenticated && userSvc.hasToken()) ||
//     router.createUrlTree(['/login'])
//   );
// };
