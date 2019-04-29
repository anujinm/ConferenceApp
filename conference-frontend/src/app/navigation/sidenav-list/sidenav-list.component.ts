import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../home/event.service';
import { ProfileService } from '../../profile/profile.service';
import { ProfileModel } from '../../profile/profile.model';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  events;
  eventMap;
  eventAgenda;
  eventId = '';
  profile: ProfileModel;

  @Output() sidenavClose = new EventEmitter();
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
        this.eventMap = this.events.event.eventMap;
        this.eventAgenda = this.events.event.eventAgenda;
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
