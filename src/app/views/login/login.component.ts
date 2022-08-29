import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { LogingService } from 'src/app/services/loging.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _dialogRef: MatDialog,
    private _userService: UserService,
    private _logingService: LogingService,
    private _alert: AlertService
  ) {}

  form = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
  });

  async logIn(form: Form) {
    var result = await this._userService.userLoging(
      this.form.get('username').value,
      this.form.get('password').value
    );
    if (result == 'User or password is invalid.') {
      this._alert.openSnackBar(result, 'Ok');
      return;
    }
    if (result != null) {
      this._logingService.sendUsernameToLogin(result);
      await this.delay(300);
      this._dialogRef.closeAll();
    }
  }

  validateUsername(val: string): string {
    let v: string = this.form.get(val).value;
    return v == ''
      ? ''
      : v.length < 2
      ? 'Too short'
      : v.length > 20
      ? 'Too long'
      : '';
  }

  validatePassword(val: string): string {
    let v: string = this.form.get(val).value;
    return v == ''
      ? ''
      : v.length < 2
      ? 'Too short'
      : v.length > 40
      ? 'Too long'
      : '';
  }

  backButton(): void {
    this._dialogRef.closeAll();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit(): void {}
}
