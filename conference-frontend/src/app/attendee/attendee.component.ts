import { Component, OnInit } from '@angular/core';
import {ImageSnippet, ProfileModel} from './../profile/profile.model';
import {ProfileService} from './../profile/profile.service';
import {environment} from '../../environments/environment';
import {stringify} from 'querystring';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss']
})
export class AttendeeComponent implements OnInit {
  backendUrl = environment.backendUrl;
  attendeeCount;
  eventId = '';
  count = 0;
  attendees;
  profile: ProfileModel;
  profilePic;

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.profileService.getMyProfile().then((profile) => {
      this.profile = profile;
      this.eventId = JSON.stringify(this.profile.eventId);
      console.log(this.profile.eventId);
      this.profileService.getAllAttendees(this.eventId).then(res => {
        this.attendees = res;
        // this.profile.firstName = this.attendees.map(attendee => attendee.firstName);
        this.count = Object.keys(this.attendees).length;
        // @ts-ignore
        this.attendeeCount = Array(this.count).fill().map((x, i) => i);
        // this.isLoading = false;
      }).catch((err) => {
        // this.isLoading = false;
        console.log(err);
      });
    }).catch((err) => {
      // this.isLoading = false;
      console.log(err);
    });
  }

}
