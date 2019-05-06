import { Component, OnInit } from '@angular/core';
import { EventModel } from '../home/event.model';
import { HomeService } from '../home/event.service';
import { environment } from '../../environments/environment';
import { ProfileService } from '../profile/profile.service';
import { ProfileModel } from '../profile/profile.model';

@Component({
  selector: 'app-home-custom',
  templateUrl: './home-custom.component.html',
  styleUrls: ['./home-custom.component.scss']
})
export class HomeCustomComponent implements OnInit {
  events;
  eventMap;
  eventAgenda;
  eventId = '';
  profile: ProfileModel;
  backendUrl = environment.backendUrl;

  constructor(
    private eventService: HomeService,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getMyProfile().then((profile) => {
      this.profile = profile;
      this.eventId = JSON.stringify(this.profile.eventId);
      console.log(this.profile.eventId);

      this.eventService.getEventInfo(this.eventId).then((res) => {
        this.events = res;
        console.log(this.events);

      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}
