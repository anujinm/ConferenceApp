import { Component, OnInit } from '@angular/core';
import { EventModel } from './event.model';
import { HomeService } from './event.service';
import { environment } from '../../environments/environment';
import { ProfileService } from '../profile/profile.service';
import { ProfileModel } from '../profile/profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events;
  events2;
  count;
  eventCount;
  eventMap;
  eventAgenda;
  eventId = '';
  profile: ProfileModel;
  backendUrl = environment.backendUrl;

  constructor(
    private eventService: HomeService,
    private profileService: ProfileService) { }

  registerForEvent(id: number) {
    this.profileService.registerUserForEvent(JSON.stringify(id)).then((profile) => {
      console.log("Registering User");
    }).catch((err) => {
      console.log(err);
    });
  }

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

    this.eventService.getAllEvents().then(res => {
      this.events2 = res;
      console.log(this.events2);
      this.count = Object.keys(this.events2.events).length;
      console.log(this.count);
      // @ts-ignore
      this.eventCount = Array(this.count).fill().map((x, i) => i);
      console.log(this.eventCount);
      this.eventCount.shift();
    }).catch((err) => {
      console.log(err);
    });
  }
}
