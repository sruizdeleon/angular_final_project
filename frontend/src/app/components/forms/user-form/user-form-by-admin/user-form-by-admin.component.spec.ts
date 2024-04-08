import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormByAdminComponent } from './user-form-by-admin.component';

describe('UserFormByAdminComponent', () => {
  let component: UserFormByAdminComponent;
  let fixture: ComponentFixture<UserFormByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormByAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
