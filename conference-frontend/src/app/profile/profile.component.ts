import { Component, OnInit } from '@angular/core';
import {ProfileService} from './profile.service';
import {ImageSnippet, ProfileModel} from './profile.model';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material";
import {Router} from "@angular/router";

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
  userId = 0;
  accountInfoForm: FormGroup;
  updatePasswordForm: FormGroup;
  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router
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
  updateUserInfo(id: number) {
    this.userId = id;
    const a_info = this.accountInfoForm.value;
    if (a_info['firstName'] === '') {
      a_info['firstName'] = this.profile.firstName;
    }
    if (a_info['lasttName'] === '') {
      a_info['lastName'] = this.profile.lastName;
    }
    if (a_info['personalEmail'] === '') {
      a_info['personalEmail'] = this.profile.personalEmail;
    }
    if (a_info['phoneNumber'] === '') {
      a_info['phoneNumber'] = this.profile.phoneNumber;
    }
    if (a_info['schoolDistrict'] === '') {
      a_info['schoolDistrict'] = this.profile.schoolDistrict;
    }
    if (a_info['roleAtDistrict'] === '') {
      a_info['roleAtDistrict'] = this.profile.roleAtDistrict;
    }
    if (a_info['bio'] === '') {
      a_info['bio'] = this.profile.bio;
    }
    if (a_info['social1'] === '') {
      a_info['social1'] = this.profile.social1;
    }
    if (a_info['social2'] === '') {
      a_info['social2'] = this.profile.social2;
    }
    if (a_info['social3'] === '') {
      a_info['social3'] = this.profile.social3;
    }

    const body = {
      firstName: a_info['firstName'],
      lastName: a_info['lastName'],
      personalEmail: a_info['personalEmail'],
      phoneNumber: a_info['phoneNumber'],
      schoolDistrict: a_info['schoolDistrict'],
      roleAtDistrict: a_info['roleAtDistrict'],
      bio: a_info['bio'],
      social1: a_info['social1'],
      social2: a_info['social2'],
      social3: a_info['social3'],
    };
    this.accountInfoForm.patchValue({'firstName': this.profile.firstName});
    this.profileService.updateUserInformation(body).then((res) => {
      // this.profile.firstName = res['firstName'];
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  }
  updateProfilePic() {
    this.profileService.changeProfilePicture(this.profilePictureFile.file).then((res) => {
      // this.onImageUploadSuccess();
      this.profile.profilePic = res['profilePic'];
    }).catch((err) => {
      // this.onImageUploadError();
      console.log(err);
    });
  }
  resetPassword() {
    const p_info = this.updatePasswordForm.value;
    const oldP = p_info['oldPassword'];
    const newP = p_info['newPassword'];
    const confP = p_info['confirmNewPassword'];
    const body = {
      oldPassword: oldP,
      newPassword: newP
    };
    if (newP === confP) {
      this.profileService.updatePassword(body).then((res) => {
        if (res['message'] === 'Password successfully updated!') {
          this.snackBar.open('Password has been updated', 'Done', {
            duration: 3000
          });
          this.router.navigate(['/profile']);
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.snackBar.open('Passwords do not match', 'Try again', {
        duration: 3000
      });
    }
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
    this.accountInfoForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      personalEmail: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      schoolDistrict: ['', [Validators.required]],
      roleAtDistrict: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      social1: ['', [Validators.required]],
      social2: ['', [Validators.required]],
      social3: ['', [Validators.required]]
    });
    this.updatePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
    });
  }

}
