import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../home/event.model';
import {Observable, Subscription} from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HomeComponent } from '../../home/home.component';
import { HomeService } from '../../home/event.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  constructor(
    private authService: AuthService,
    private eventService: HomeService,
    private http:HttpClient
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
      }
    );
    this.authLevelListenerSubs = this.authService.getAuthLevelListener().subscribe(
      level => {
        this.userLevel = level;
      }
    );


    this.eventService.getEventMap('3').then((res) => {
      this.events = res;
      console.log(this.events);
      this.eventMap = this.events.event[3].eventMap;

    }).catch((err) => {
      console.log(err);
    });
  }
  ngOnDestroy() {
    this.authStateListenerSubs.unsubscribe();
    this.authLevelListenerSubs.unsubscribe();
  }
}
