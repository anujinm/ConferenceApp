import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {SpeakerComponent} from './speaker/speaker.component';
import { AttendeeComponent } from './attendee/attendee.component';
// import {AdminComponent} from './admin/admin.component';
// import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'speaker', component: SpeakerComponent},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
  { path: 'attendee', component: AttendeeComponent },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard], data: { level: 7 } },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
