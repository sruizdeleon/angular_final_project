import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const influencerProtectGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);
  if (cookies.get('role') === 'influencer') {
    return true;
  } else {
    return false;
  }
};
