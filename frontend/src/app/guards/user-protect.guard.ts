import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const userProtectGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const cookies = inject(CookieService);
  const role = cookies.get('role')
  if (role === 'user' || role === 'influencer' || role === 'admin') {
    return true;
  } else {
    return false;
  }
};
