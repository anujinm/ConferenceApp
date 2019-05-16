//imports

import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  AuthLoginModel,
  AuthRegisterModel, AuthTokenModel
} from './auth-data.model';
import {
  Subject
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  environment
} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})


  //Log in and out, with extra security functions, and getters
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private authLevelListener = new Subject<number>();
  private tokenTimer: any;
  private userId: number;
  private level: number;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  
  getAuthLevelListener() {
    return this.authLevelListener.asObservable();
  }
  
  getUserId() {
    return this.userId;
  }

  getLevel() {
    return this.level;
  }

  setAuthListener(bool) {
    this.authStatusListener.next(bool);
  }

  setLevelListener(level) {
    this.authLevelListener.next(level);
  }

  createUser(authData: AuthRegisterModel) {
    return this.http.post(BACKEND_URL + '/signup', authData).toPromise();
  }

  loginWithToken(res) {
    this.token = res.token;
    if (this.token) {
      const expiresInDuration = res.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.userId = res.userId;
      this.level = res.level;
      this.authStatusListener.next(true);
      this.authLevelListener.next(this.level);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      this.saveAuthData(this.token, expirationDate, this.userId, this.level);
    }
  }

  login(email: string, password: string) {
    const authData: AuthLoginModel = {
      email,
      password
    };
    this.http.post<AuthTokenModel>(BACKEND_URL + '/login', authData)
      .subscribe((res) => {
        this.loginWithToken(res);
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
        this.authLevelListener.next(0);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.level = authInformation.level;
      this.userId = parseInt(authInformation.userId, 10);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      this.authLevelListener.next(this.level);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    this.authLevelListener.next(0);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: number, level: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('level', level.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
    localStorage.removeItem('level');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const level = localStorage.getItem('level');
    if (!token || !expirationDate || !userId || !level) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      level: parseInt(level, 10)
    };
  }



}
