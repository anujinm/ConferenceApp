import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EventModel} from './event.model';
import {HttpClient} from '@angular/common/http';
import {SpeakerModel} from "../speaker/speaker.model";

const BACKEND_URL = environment.apiUrl + '/event';
const BACKEND_URL_SPEAKER = environment.apiUrl + '/speaker';
const BACKEND_URL_USER = environment.apiUrl + '/user';

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
  getAllSpeakers() {
    return this.http.get<EventModel>(BACKEND_URL_SPEAKER + '/speakers').toPromise();
  }
  createEvent(body: EventModel) {
    console.log('hereee', body);
    return this.http.post<EventModel>(BACKEND_URL + '/event', body).toPromise();
  }
  updateEvent(id: string, body) {
    console.log('hereee' + id, body);
    return this.http.put<EventModel>(BACKEND_URL + '/event/' + id, body).toPromise();
  }
  updateEventMap(id: string, body) {
    return this.http.put<EventModel>(BACKEND_URL + '/event/map/' + id, body).toPromise();
  }
  updateEventAgenda(id: string, body) {
    return this.http.put<EventModel>(BACKEND_URL + '/event/agenda/' + id, body).toPromise();
  }
  updateSpeaker(id: string, body) {
    console.log('here' + id, body);
    return this.http.put<SpeakerModel>(BACKEND_URL_SPEAKER + '/speaker/' + id, body).toPromise();
  }
  createSpeaker(body: SpeakerModel) {
    console.log('here speaker request', body);
    return this.http.post<SpeakerModel>(BACKEND_URL_SPEAKER + '/speaker', body).toPromise();
  }
  uploadEventPicture(id: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return this.http.put(BACKEND_URL + '/event/eventPic/' + id, formData).toPromise();
  }
  uploadSpeakerPicture(id: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    return this.http.put(BACKEND_URL + '/event/speakerPic/' + id, formData).toPromise();
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
  removeSpeaker(id: string) {
    return this.http.delete<SpeakerModel>(BACKEND_URL_SPEAKER + '/speaker/' + id).toPromise();
  }
  unregisterAllUsers(id: string) {
    return this.http.put<EventModel>(BACKEND_URL_USER + '/event/unregisterAll/' + id, {}).toPromise();
  }
}
