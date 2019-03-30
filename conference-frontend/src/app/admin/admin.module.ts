import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AdminComponent } from './admin.component';
import {AdminMaterialModule} from './admin-material.module';
import {AdminRoutingModule} from './admin-routing.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AdminMaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {}
