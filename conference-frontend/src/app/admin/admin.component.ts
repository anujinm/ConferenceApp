import { Component, OnInit } from '@angular/core';
import {AdminService} from './admin.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {ImageSnippet} from '../profile/profile.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  styles: [ '.wideScreen { width: 75vw;}']
})
export class AdminComponent implements OnInit {
  backendUrl = environment.backendUrl;

  userOptions = 'profile';
  // wideScreen: ' .wideScreen { width: 70vw;}';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
  ) { }
  navigateProfile(options: string) {
    this.userOptions = options;
  }
  ngOnInit() {
  }

}
