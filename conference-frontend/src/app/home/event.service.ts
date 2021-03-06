import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EventModel } from './event.model';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/event';

// backend requests

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getEventInfo(id: string) {
    return this.http.get<EventModel>(BACKEND_URL + '/event/' + id).toPromise();
  }

  getAllEvents() {
    return this.http.get<EventModel>(BACKEND_URL + '/events').toPromise();
  }
}
