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
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  submitForm() {
    const a_info = this.accountInfo.value;
    this.isLoading = true;
    const user: AuthRegisterModel = {
      email: a_info['email'],
      password: a_info['password'],
    };

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
      this.isLoading = false;
    });
  }
  get email() {
    return this.accountInfo.get('email');
  }

  get password() {
    return this.accountInfo.get('password');
  }
}
