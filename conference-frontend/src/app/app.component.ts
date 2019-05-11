import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {ProfileModel} from './profile/profile.model';
import {ProfileService} from "./profile/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private authStateListenerSubs: Subscription;
  private authLevelListenerSubs: Subscription;
  userLevel = 0;
  userIsAuthenticated = false;
  profile: ProfileModel;
  title = 'conference-frontend';
  loadingRouteConfig: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) { }

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
    // Auto login
    this.authService.autoAuthUser();

    // Router loading
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }
}
