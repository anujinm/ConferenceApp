import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventModel } from './event.model';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/event';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getEventMap(id:string) {
    return this.http.get<EventModel>(BACKEND_URL + '/event/' + id).toPromise();
  }
}
