import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../../home/event.service';
import { ProfileService } from '../../profile/profile.service';
import { ProfileModel } from '../../profile/profile.model';
import { AuthService } from '../../auth/auth.service';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  private authStateListenerSubs: Subscription;
  private authLevelListenerSubs: Subscription;
  events;
  eventMap;
  eventAgenda;
  eventId = '';
  profile: ProfileModel;
  userIsAuthenticated = false;
  userLevel = 0;


  @Output() sidenavClose = new EventEmitter();
  constructor(
    private authService: AuthService,
    private eventService: HomeService,
    private profileService: ProfileService) { }
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userLevel = this.authService.getLevel();
    this.authStateListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.authLevelListenerSubs = this.authService.getAuthLevelListener().subscribe(
      level => {
        this.userLevel = level;
      });

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
  ngOnDestroy(){
    this.authStateListenerSubs.unsubscribe();
    this.authLevelListenerSubs.unsubscribe();
  }
}

