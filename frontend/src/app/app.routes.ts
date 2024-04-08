import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';
import { InfluencersComponent } from './pages/influencers/influencers.component';
import { InfluencerComponent } from './pages/influencer/influencer.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { AdminSettingsComponent } from './pages/settings/admin-settings/admin-settings.component';
import { userProtectGuard } from './guards/user-protect.guard';
import { adminProtectGuard } from './guards/admin-protect.guard';
import { influencerProtectGuard } from './guards/influencer-protect.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
  },
  {
    path: 'restaurants/:id',
    component: RestaurantComponent
  },
  {
    path: 'influencers',
    component: InfluencersComponent
  },
  {
    path: 'influencers/:id',
    component: InfluencerComponent
  },
  {
    path: 'settings-admin',
    component: AdminSettingsComponent
  },
];
