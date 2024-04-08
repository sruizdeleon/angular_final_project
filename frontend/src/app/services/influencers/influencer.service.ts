import { UserService } from './../users/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfluencerAdminData } from '../../interfaces/dto/influencer-admin-data';

@Injectable({
  providedIn: 'root',
})
export class InfluencerService {
  visibilityInfluencerForm: boolean = false;
  baseUrl: string = 'http://localhost:3000/api/influencers';

  constructor(private http: HttpClient, private userService: UserService) {}

  // Visibilidad del formulario

  setVisibilityInfluencerForm(status: boolean) {
    this.visibilityInfluencerForm = status;
  }

  getVisibilityInfluencerForm() {
    return this.visibilityInfluencerForm;
  }

  // Estructura de datos

  influencerAdminData: InfluencerAdminData = {
    _id: '',
    nickName: '',
    accountIG: '',
    description: '',
    subscribers: 0,
    images: {
      logo: '',
      miniature: '',
      frontPage: '',
    },
    userId: '',
  };

  editInfluencerAdminData(influencer: InfluencerAdminData) {
    this.influencerAdminData = influencer;
  }

  clearInfluencerAdminData() {
    this.influencerAdminData = {
      _id: '',
      nickName: '',
      accountIG: '',
      description: '',
      subscribers: 0,
      images: {
        logo: '',
        miniature: '',
        frontPage: '',
      },
      userId: '',
    };
  }

  // Conexiones a BBDD

  getInfluencers() {
    const token = this.userService.getToken();
    return this.http.get(`${this.baseUrl}?token=${token}`);
  }

  getInfluencerById(id: string) {
    const token = this.userService.getToken();
    return this.http.get(`${this.baseUrl}/${id}?token=${token}`);
  }

  postInfluencerByAdmin(influencer: InfluencerAdminData) {
    const token = this.userService.getToken();
    return this.http.post(`${this.baseUrl}/admin?token=${token}`, influencer);
  }

  patchInfluencerByAdmin(influencer: InfluencerAdminData, id: string) {
    const token = this.userService.getToken();
    return this.http.patch(
      `${this.baseUrl}/admin/${id}?token=${token}`,
      influencer
    );
  }

  deleteInfluencerById(id: string) {
    console.log('entro en el delete');
    const token = this.userService.getToken();
    const role = this.userService.getRole();
    if (role === 'admin') {
      return this.http.delete(`${this.baseUrl}/admin/${id}?token=${token}`);
    } else {
      return this.http.delete(`${this.baseUrl}/${id}?token=${token}`);
    }
  }
}
