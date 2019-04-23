import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {SpeakerModel} from './speaker.model';
import {HttpClient} from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + '/speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSpeakers(id: string) {
    return this.http
      .get<SpeakerModel>(BACKEND_URL + '/speakers/'  + id)
      .toPromise();
  }
}
