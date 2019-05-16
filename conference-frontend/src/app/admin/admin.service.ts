
//imports
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MemberModel} from './admin.model';

// const BACKEND_URL = environment.apiUrl + '/members';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  // getAllMembers() {
  //   return this.http.get<MemberModel[]>(BACKEND_URL + '/all').toPromise();
  // }
}
