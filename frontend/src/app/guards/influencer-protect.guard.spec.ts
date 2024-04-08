import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { influencerProtectGuard } from './influencer-protect.guard';

describe('influencerProtectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => influencerProtectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
