import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantsComponent } from './pages/restaurants/restaurants.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    },
    {
    path: 'login',
    component: LoginComponent,
    },
    {
    path: 'register',
    component: RegisterComponent,
    },
    {
    path: 'restaurants',
    component: RestaurantsComponent,
    },
];
