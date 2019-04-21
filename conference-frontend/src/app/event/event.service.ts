import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EventModel} from './event.model';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getAllEvents() {
    return this.http.get<EventModel>(BACKEND_URL + '/events').toPromise();
  }
  updateEvent(id: string, body) {
    console.log('hereee' + id, body);
    return this.http.put<EventModel>(BACKEND_URL + '/event/' + id, body).toPromise();
  }
}
