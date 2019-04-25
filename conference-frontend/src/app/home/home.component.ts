import { Component, OnInit } from '@angular/core';
import { EventModel } from './event.model';
import { HomeService } from './event.service';

import { ProfileService } from '../profile/profile.service';
import { ProfileModel } from '../profile/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events;
  eventMap;
  eventAgenda;
  eventId = '';
  profile: ProfileModel;

  constructor(
    private eventService: HomeService,
    private profileService: ProfileService) { }

  ngOnInit() {
    console.log("we here1");

    this.profileService.getMyProfile().then((profile) => {
      this.profile = profile;
      this.eventId = JSON.stringify(this.profile.eventId);
      console.log(this.profile.eventId);

      this.eventService.getEventInfo(this.eventId).then((res) => {
        this.events = res;
        console.log(this.events);
        this.eventMap = this.events.event.eventMap;
        this.eventAgenda = this.events.event.eventAgenda;
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}
