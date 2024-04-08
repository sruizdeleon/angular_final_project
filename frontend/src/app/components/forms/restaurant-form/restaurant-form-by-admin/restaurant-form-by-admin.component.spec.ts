import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormByAdminComponent } from './restaurant-form-by-admin.component';

describe('RestaurantFormByAdminComponent', () => {
  let component: RestaurantFormByAdminComponent;
  let fixture: ComponentFixture<RestaurantFormByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFormByAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFormByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
