import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormByInfluencerComponent } from './restaurant-form-by-influencer.component';

describe('RestaurantFormByInfluencerComponent', () => {
  let component: RestaurantFormByInfluencerComponent;
  let fixture: ComponentFixture<RestaurantFormByInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantFormByInfluencerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestaurantFormByInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
