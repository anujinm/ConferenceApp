import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../home/event.model';
import {Observable, Subscription} from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HomeComponent } from '../../home/home.component';
import { HomeService } from '../../home/event.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProfileService } from '../../profile/profile.service';
import { ProfileModel } from '../../profile/profile.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private authStateListenerSubs: Subscription;
  private authLevelListenerSubs: Subscription;
  userLevel = 0;
  userIsAuthenticated = false;
  events;
  eventMap;
  eventId = '';
  profile: ProfileModel;

  constructor(
    private authService: AuthService,
    private eventService: HomeService,
    private profileService: ProfileService
  ) { }
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

      this.eventService.getEventMap(this.eventId).then((res) => {
        this.events = res;
        console.log(this.events);
        this.eventMap = this.events.event.eventMap;
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  ngOnDestroy(){
        this.authStateListenerSubs.unsubscribe();
    this.authLevelListenerSubs.unsubscribe();
  }
}
