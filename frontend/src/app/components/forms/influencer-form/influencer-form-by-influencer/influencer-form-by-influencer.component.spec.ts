import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerFormByInfluencerComponent } from './influencer-form-by-influencer.component';

describe('InfluencerFormByInfluencerComponent', () => {
  let component: InfluencerFormByInfluencerComponent;
  let fixture: ComponentFixture<InfluencerFormByInfluencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerFormByInfluencerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfluencerFormByInfluencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
