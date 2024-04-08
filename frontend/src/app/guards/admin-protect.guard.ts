import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const adminProtectGuard: CanActivateFn = (route, state) => {
  const cookies = inject (CookieService);
  const role = cookies.get('role');
  if(role ==='admin'){
    console.log("Ruta correcta")
    return true;
  } else {
    return false;
  }
};
