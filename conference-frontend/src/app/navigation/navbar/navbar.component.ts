import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

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

  constructor(
    private authService: AuthService,
  ) { }
  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStateListenerSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      }
    );
  }
}
