import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {ProfileModel} from './profile.model';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getMyProfile() {
    return this.http.get<ProfileModel>(BACKEND_URL + '/profile').toPromise();
  }

  getUserProfile(id: string) {
    return this.http.get<ProfileModel>(BACKEND_URL + '/profile/' + id).toPromise();
  }

  changeProfilePicture(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.put(BACKEND_URL + '/profilePic', formData).toPromise();
  }

}
