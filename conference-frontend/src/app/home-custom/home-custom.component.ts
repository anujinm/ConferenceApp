import { Component, OnInit } from '@angular/core';
import { EventModel } from '../home/event.model';
import { HomeService } from '../home/event.service';
import { environment } from '../../environments/environment';
import { ProfileService } from '../profile/profile.service';
import { ProfileModel } from '../profile/profile.model';
import {Router} from "@angular/router";

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
  notRegistered = false;
  constructor(
    private eventService: HomeService,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit() {
    this.profileService.getMyProfile().then((profile) => {
      this.profile = profile;
      this.eventId = JSON.stringify(this.profile.eventId);
      console.log(this.profile.eventId);
      if (this.profile.eventId === 0) {
        this.notRegistered = true;
        this.router.navigate(['/']);
      }
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
