import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ProfileMaterialModule} from './profile-material.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ProfileMaterialModule,
    FlexLayoutModule,
  ]
})
export class ProfileModule {}
