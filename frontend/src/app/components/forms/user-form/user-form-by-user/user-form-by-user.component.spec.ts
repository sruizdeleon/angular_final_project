import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormByUserComponent } from './user-form-by-user.component';

describe('UserFormByUserComponent', () => {
  let component: UserFormByUserComponent;
  let fixture: ComponentFixture<UserFormByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormByUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
