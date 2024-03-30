import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterData } from '../../interfaces/dto/user-register-data';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginData } from '../../interfaces/dto/user-login-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/api/users';
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(data: UserLoginData) {
    return this.http.post(`${this.url}/login`, data);
  }

  register(data: UserRegisterData) {
    return this.http.post(`${this.url}/register`, data);
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  logOut() {
    this.cookies.delete('token');
  }
}
