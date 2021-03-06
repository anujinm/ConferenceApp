import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { FooterComponent } from './navigation/footer/footer.component';
// import { LoginComponent } from './auth/login/login.component';
// import { RegisterComponent } from './auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpeakerComponent } from './speaker/speaker.component';
// import { AdminComponent } from './admin/admin.component';
import {MatTabsModule} from '@angular/material';
import { SlideshowComponent } from './slideshow/slideshow.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { AttendeeComponent } from './attendee/attendee.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SpokaneInfoComponent } from './spokane-info/spokane-info.component';
import { HomeCustomComponent } from './home-custom/home-custom.component';


// import { ProfileComponent } from './profile/profile.component';

// import { environment } from '../environments/environment';
// import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SpeakerComponent,
    // AdminComponent,
    SlideshowComponent,
    AttendeeComponent,
    SidenavListComponent,
    SpokaneInfoComponent,
    HomeCustomComponent
    // ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    SlideshowModule,
    ReactiveFormsModule,
    ScrollingModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
