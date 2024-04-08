import { InfluencerService } from './../../../services/influencers/influencer.service';
import { Component, OnInit } from '@angular/core';
import { UserFormByAdminComponent } from '../../../components/forms/user-form/user-form-by-admin/user-form-by-admin.component';
import { RestaurantFormByAdminComponent } from '../../../components/forms/restaurant-form/restaurant-form-by-admin/restaurant-form-by-admin.component';
import { InfluencerFormByAdminComponent } from '../../../components/forms/influencer-form/influencer-form-by-admin/influencer-form-by-admin.component';
import { RestaurantService } from '../../../services/restaurants/restaurant.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    UserFormByAdminComponent,
    RestaurantFormByAdminComponent,
    InfluencerFormByAdminComponent,
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent implements OnInit {
  visibilityRestaurantForm?: boolean;
  visibilityInfluencerForm?: boolean;

  constructor(
    private restaurantService: RestaurantService,
    private influencerService: InfluencerService
  ) {}

  ngOnInit(): void {
    this.visibilityRestaurantForm =
      this.restaurantService.getVisibilityRestaurantForm();
    this.visibilityInfluencerForm =
      this.influencerService.getVisibilityInfluencerForm();
  }

  deactiveInfluencerForm() {
    this.visibilityInfluencerForm = false;
    this.influencerService.setVisibilityInfluencerForm(false);
  }

  activeInfluencerForm() {
    this.visibilityInfluencerForm = true;
    this.influencerService.setVisibilityInfluencerForm(true);
    this.visibilityRestaurantForm = false;
    this.restaurantService.setVisibilityRestaurantForm(false);
  }

  deactiveRestaurantForm() {
    this.visibilityRestaurantForm = false;
    this.restaurantService.setVisibilityRestaurantForm(false);
  }

  activeRestaurantForm() {
    this.visibilityRestaurantForm = true;
    this.restaurantService.setVisibilityRestaurantForm(true);
    this.visibilityInfluencerForm = false;
    this.influencerService.setVisibilityInfluencerForm(false);
  }
}
