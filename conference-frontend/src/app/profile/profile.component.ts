import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import {ImageSnippet, ProfileModel} from './profile.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  profile: ProfileModel;
  updatedProfile: ProfileModel;
  backendUrl = environment.backendUrl;
  userOptions = 'profile';
  profilePictureFile: ImageSnippet;
  isUploadButtonDisabled = true;
  constructor(
    private profileService: ProfileService
  ) { }
  navigateProfile(options: string) {
    this.userOptions = options;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = ((event: any) => {
        this.profilePictureFile = new ImageSnippet(event.target.result, file);
        this.profilePictureFile.pending = true;
        this.isUploadButtonDisabled = false;
      }
    );
    reader.readAsDataURL(file);
  }
  updateProfilePic() {
    this.isUploadButtonDisabled = true;
    this.profileService.changeProfilePicture(this.profilePictureFile.file).then((res) => {
      // this.onImageUploadSuccess();
      this.profile.profilePic = res['profilePic'];

    }).catch((err) => {
      // this.onImageUploadError();
      this.isUploadButtonDisabled = false;
      console.log(err);
    });
  }
  ngOnInit() {
    this.isLoading = true;
    this.profileService.getMyProfile().then((res) => {
      this.profile = res;
      this.updatedProfile = Object.assign({}, this.profile);
      this.isLoading = false;
    }).catch((err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

}
