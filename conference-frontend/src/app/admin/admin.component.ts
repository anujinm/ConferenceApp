import { Component, OnInit } from '@angular/core';
import {ImageSnippet} from '../profile/profile.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  styles: [ '.wideScreen { width: 75vw;}']
})
export class AdminComponent implements OnInit {
  userOptions = 'profile';
  profilePictureFile: ImageSnippet;
  isUploadButtonDisabled = true;
  // wideScreen: ' .wideScreen { width: 70vw;}';

  constructor() { }
  navigateProfile(options: string) {
    this.userOptions = options;
  }
  ngOnInit() {
  }

}
