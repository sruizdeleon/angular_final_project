import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerFormByAdminComponent } from './influencer-form-by-admin.component';

describe('InfluencerFormByAdminComponent', () => {
  let component: InfluencerFormByAdminComponent;
  let fixture: ComponentFixture<InfluencerFormByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerFormByAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfluencerFormByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
