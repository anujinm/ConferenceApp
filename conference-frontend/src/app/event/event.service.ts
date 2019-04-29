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
  createEvent(body: EventModel) {
    console.log('hereee', body);
    return this.http.post<EventModel>(BACKEND_URL + '/event', body).toPromise();
  }
  uploadEventPicture(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return this.http.put(BACKEND_URL + '/event/eventPic', formData).toPromise();
  }
  uploadEventAgenda(agenda: File) {
    const formData = new FormData();
    formData.append('agenda', agenda);
    console.log(formData);
    return this.http.put(BACKEND_URL + '/event/eventPic', formData).toPromise();
  }
  removeEvent(id: string) {
    return this.http.delete<EventModel>(BACKEND_URL + '/event/' + id).toPromise();
  }
}
