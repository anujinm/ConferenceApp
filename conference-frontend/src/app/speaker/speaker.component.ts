import { Component, OnInit } from '@angular/core';
import { SpeakerService } from './../speaker/speaker.service';
import {ProfileService} from './../profile/profile.service';

import {environment} from '../../environments/environment';
import {ProfileModel} from './../profile/profile.model';
import {SpeakerModel} from './speaker.model';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  backendUrl = environment.backendUrl;
  speakerCount;
  count = 0;
  eventId = '';
  speakers;
  profile: ProfileModel;

  constructor(
    private speakerService: SpeakerService,
    private profileService: ProfileService
) { }
  hasSlides(id) {
    if (this.speakers.speaker[id].speakerSlides !== '') {
      return false;
    } else {
      return true;
    }
  }
  ngOnInit() {
    this.profileService.getMyProfile().then((profile) => {
      this.profile = profile;
      this.eventId = JSON.stringify(this.profile.eventId);
      console.log(this.profile.eventId);
      this.speakerService.getAllSpeakers(this.eventId).then(res => {
        this.speakers = res;
        console.log(this.speakers.speaker[0]);
        this.count = Object.keys(this.speakers.speaker).length;
        // @ts-ignore
        this.speakerCount = Array(this.count).fill().map((x, i) => i);
      }).catch((err)  => {
        console.log(err);
      });
    }).catch((err)  => {
      console.log(err);
    });
  }

}
