import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../users/user.service';
import { RestaurantAdminData } from '../../interfaces/dto/restaurant-admin-data';
import { RestaurantInfluencerData } from '../../interfaces/dto/restaurant-influencer-data';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  baseUrl: string = 'http://localhost:3000/api/restaurants';
  visibilityRestaurantForm: boolean = false;

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private userService: UserService
  ) {}

  // Visibilidad del formulario

  setVisibilityRestaurantForm(status: boolean) {
    this.visibilityRestaurantForm = status;
  }

  getVisibilityRestaurantForm() {
    return this.visibilityRestaurantForm;
  }

  // Estructura de datos

  restuarantAdminData: RestaurantAdminData = {
    _id: '',
    name: '',
    phoneNumber: 0,
    images: {
      frontPage: '',
      miniature: '',
    },
    address: {
      street: '',
      postalCode: 0,
      population: '',
      province: '',
    },
    price: {
      minPrice: 0,
      maxPrice: 0,
    },
    influencerScores: {
      foodTaste: 0,
      decoration: 0,
      service: 0,
      priceQuality: 0,
    },
    usersScores: {
      average: 0,
      reviews: 0,
    },
    influencerId: '',
  };

  editRestaurantAdminData(restuarant: RestaurantAdminData) {
    this.restuarantAdminData = restuarant;
  }

  clearRestaurantAdminData() {
    this.restuarantAdminData = {
      _id: '',
      name: '',
      phoneNumber: 0,
      images: {
        frontPage: '',
        miniature: '',
      },
      address: {
        street: '',
        postalCode: 0,
        population: '',
        province: '',
      },
      price: {
        minPrice: 0,
        maxPrice: 0,
      },
      influencerScores: {
        foodTaste: 0,
        decoration: 0,
        service: 0,
        priceQuality: 0,
      },
      usersScores: {
        average: 0,
        reviews: 0,
      },
      influencerId: '',
    };
  }

  // Conexión a BBDD

  getRestaurants() {
    const token = this.userService.getToken();
    return this.http.get(`${this.baseUrl}?token=${token}`);
  }

  getRestaurantsById(id: string) {
    const token = this.userService.getToken();
    return this.http.get(`${this.baseUrl}/${id}?token=${token}`);
  }

  postRestaurantByAdmin(restaurant: RestaurantAdminData) {
    const token = this.userService.getToken();
    return this.http.post(`${this.baseUrl}/admin?token=${token}`, restaurant);
  }

  postRestaurantByInfluencer(restaurant: RestaurantAdminData) {
    const restaurantTransformated: RestaurantInfluencerData = restaurant;
    const token = this.userService.getToken();
    return this.http.post(
      `${this.baseUrl}?token=${token}`,
      restaurantTransformated
    );
  }

  patchRestaurantByAdmin(restaurant: RestaurantAdminData, id: string) {
    const token = this.userService.getToken();
    return this.http.patch(`${this.baseUrl}/admin/${id}?token=${token}`, restaurant);
  }

  patchRestaurantByInfluencer(restaurant: RestaurantAdminData, id: string) {
    const restaurantTransformated: RestaurantInfluencerData = restaurant;
    const token = this.userService.getToken();
    return this.http.patch(
      `${this.baseUrl}/${id}?token=${token}`,
      restaurantTransformated
    );
  }

  deleteRestaurantsById(id: string) {
    const token = this.userService.getToken();
    const role = this.userService.getRole();
    if (role === 'admin') {
      return this.http.delete(`${this.baseUrl}/admin/${id}?token=${token}`);
    } else {
      return this.http.delete(`${this.baseUrl}/${id}?token=${token}`);
    }
  }
}
