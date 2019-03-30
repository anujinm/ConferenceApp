import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'conference-frontend';
  loadingRouteConfig: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
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
