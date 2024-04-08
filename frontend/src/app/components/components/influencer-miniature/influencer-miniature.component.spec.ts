import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerMiniatureComponent } from './influencer-miniature.component';

describe('InfluencerMiniatureComponent', () => {
  let component: InfluencerMiniatureComponent;
  let fixture: ComponentFixture<InfluencerMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerMiniatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfluencerMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
