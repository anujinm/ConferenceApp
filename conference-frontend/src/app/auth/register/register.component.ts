//imports

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {TitleService} from '../../services/title.service';
import {AuthRegisterModel} from '../auth-data.model';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  accountInfo: FormGroup;
  constructor(
    private fb: FormBuilder,
    // private titleService: TitleService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    // this.titleService.setTitle('Register');
    this.accountInfo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // Additional info that has to be sent to the database. Default values
  submitForm() {
    const a_info = this.accountInfo.value;
    this.isLoading = true;
    const user: AuthRegisterModel = {
      email: a_info['email'],
      password: a_info['password'],
      level: 0,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      bio: '',
      profilePic: '',
      schoolDistrict: '',
      roleAtDistrict: '',
      social1: '',
      social2: '',
      social3: '',
      eventId: 0
    };

    //Confirm password logic
    const password = a_info['password']
    const confirmpassword = a_info['confirmpassword']
    if (confirmpassword === password) {
      this.authService.createUser(user).then((res) => {
        this.isLoading = false;
        if (res['message'] === 'User created!') {
          this.snackBar.open('User Created!', 'Done', {
            duration: 3000
          });
          this.router.navigate(['/auth/login']);
        }

      }).catch(() => {
        this.authService.setAuthListener(false);
        this.authService.setLevelListener(0);
        this.isLoading = false;
      });
    } else {
      this.snackBar.open('Passwords do not match', 'Done', { duration: 3000 });
    }

 
  }

  //getters
  get email() {
    return this.accountInfo.get('email');
  }

  get password() {
    return this.accountInfo.get('password');
  }

  get confirmpassword() {
    return this.accountInfo.get('confirmpassword');
  }
}
