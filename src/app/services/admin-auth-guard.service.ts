import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
class AdminPermissionsService {

  constructor(private userService: UserService, private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.appUser$
      .pipe(
        map(appUser => appUser!.isAdmin)
      );
  }
}

export const AdminAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AdminPermissionsService).canActivate(route, state);
}
