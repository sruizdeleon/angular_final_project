import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantInfluencerData } from '../../interfaces/dto/restaurant-influencer-data';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  url: string = 'http://localhost:3000/api/films';

  findAll(){
    return this.http.get(`${this.url}?token=${this.cookies.get('token')}`)
  }

  insert(data: RestaurantInfluencerData){
    return this.http.post(`${this.url}?token=${this.cookies.get('token')}`, data);
  }

  deleteOne(_id: string){
    return this.http.delete(`${this.url}/${_id}?token=${this.cookies.get('token')}`);
  }
}
