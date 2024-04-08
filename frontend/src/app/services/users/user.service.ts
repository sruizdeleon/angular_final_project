import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginData } from '../../interfaces/dto/user-login-data';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserAdminData } from '../../interfaces/dto/user-admin-data';
import { UserData } from '../../interfaces/dto/user-data';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:3000/api/users';

  private roleSubject: Subject<string> = new Subject<string>();
  private tokenSubject: Subject<string> = new Subject<string>();
  private loginTimeSubject: Subject<number> = new Subject<number>();

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) {}

  // Estructura de datos

  userAdminData: UserAdminData = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phoneNumber: 0,
    role: '',
    enabled: true,
  };

  // Conexiones a BBDD

  login(data: UserLoginData) {
    return this.http.post(`${this.url}/login`, data);
  }

  register(data: UserData) {
    return this.http.post(`${this.url}/register`, data);
  }

  registerAdmin(data: UserAdminData) {
    const token = this.getToken();
    return this.http.post(`${this.url}/register-by-admin?token=${token}`, data);
  }

  tokenRenewal(token: string) {
    return this.http.post(`${this.url}/token-renewal`, { token: token });
  }

  // Comprobación de sesión

  sesionExist() {
    Boolean;
    const possibleUser = this.getToken();
    const loginTime = this.getLoginTime();
    const actualTime = this.saveTime();
    const sesionTime = actualTime - loginTime;
    console.log(sesionTime);
    if (possibleUser !== '' && sesionTime < 60 && loginTime !== 0) {
      console.log('Token válido');
      if (sesionTime >= 50 && sesionTime <= 59) {
        Swal.fire({
          title: '¡Atención!',
          text: 'Tu sesión está a punto de caducar.',
          confirmButtonText: 'Seguir conectado',
          showConfirmButton: true,
          denyButtonText: 'Cerrar sesión',
          showDenyButton: true,
          icon: 'warning',
        }).then((result: any) => {
          if (result.isConfirmed) {
            this.tokenRenewal(possibleUser).subscribe({
              next: (res: any) => {
                this.setToken(res.token);
                this.setRole(res.role);
                this.setLoginTime(this.saveTime());
                Swal.fire({
                  title: 'Su sesión continua.',
                  confirmButtonText: 'Cerrar',
                  showConfirmButton: true,
                  icon: 'info',
                }).then(() => {
                  return true;
                });
              },
            });
          } else if (result.isDenied === false) {
            this.logOut();
          }
          return false;
        });
      }
      return true;
    } else {
      console.log('Token no válido');
      this.logOut();
      // this.router.navigate(['/login']);
      return false;
    }
  }

  // Guardado de cookies

  setToken(token: string) {
    this.cookies.set('token', token);
    this.tokenSubject.next(token);
    console.log(this.getToken());
  }

  setLoginTime(time: number) {
    this.cookies.set('loginTime', String(time));
    this.loginTimeSubject.next(time);
    console.log(this.getLoginTime());
  }

  setRole(role: string) {
    this.cookies.set('role', role);
    this.roleSubject.next(role);
    console.log(this.getRole());
  }

  getLoginTimeObservable(): Observable<number> {
    return this.loginTimeSubject.asObservable();
  }

  getLoginTime() {
    return Number(this.cookies.get('loginTime'));
  }

  getTokenObservable(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  getToken() {
    return Object(this.cookies.get('token'));
  }

  getRoleObservable(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  getRole() {
    return this.cookies.get('role');
  }

  logOut() {
    this.cookies.delete('token');
    this.cookies.delete('role');
    this.cookies.delete('loginTime');
    this.router.navigate(['/login']);
  }

  saveTime() {
    const actualDate = new Date();

    const day = actualDate.getDate();
    const month = actualDate.getMonth() + 1;
    const year = actualDate.getFullYear();
    const hour = actualDate.getHours();
    const minute = actualDate.getMinutes();

    const totalMinutes =
      minute +
      hour * 60 +
      day * 24 * 60 +
      month * 30 * 24 * 60 +
      year * 365 * 24 * 60;
    return totalMinutes;
  }
}