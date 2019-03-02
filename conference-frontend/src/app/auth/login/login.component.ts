import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private authStatusSub: Subscription;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
        if (authStatus) {
          this.snackbar.open('Logged In!', 'Done', {
            duration: 3000
          });
        }
      }
    );
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ]
    });
  }
  onSubmit() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    this.isLoading = true;
    this.authService.login(email, password);
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minlength') ? 'Minimum of 2 characters' : '';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
