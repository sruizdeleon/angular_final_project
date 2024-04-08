import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantMiniatureComponent } from './restaurant-miniature.component';

describe('RestaurantMiniatureComponent', () => {
  let component: RestaurantMiniatureComponent;
  let fixture: ComponentFixture<RestaurantMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMiniatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
