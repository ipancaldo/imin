import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/classes/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _dataService: DataService,
    private _userService: UserService,
    private _alert: AlertService,
    private _dialogRef: MatDialog
  ) {}

  form = new FormGroup({
    name: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
    surname: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
    username: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(50),
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
    repeatedPassword: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
  });
  doUserExist: boolean;

  async submitNewUser(form) {
    if (!this.isSamePassword())
      return this._alert.openSnackBar("The passwords aren't the same", 'Ok');
    if (!this.form.valid)
      return this._alert.openSnackBar(
        'The form is not correct. Please check the hints',
        'Ok'
      );

    let user = new User(
      form.name,
      form.surname,
      form.username,
      form.email,
      form.password
    );

    this.doUserExist = await this._userService.doUserExist(user);
    await this.delay(2000);

    if (this.doUserExist) {
      return this._alert.openSnackBar(
        'Username or Email already registered.',
        'Ok'
      );
    }

    this._dataService.saveUser(user);
    this._alert.openSnackBar(
      `User ${user.username} created successfully`,
      'Ok'
    );
    await this.delay(500);
    this._dialogRef.closeAll();
  }

  backButton(): void {
    this._dialogRef.closeAll();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  ngOnInit(): void {}

  //Validations
  validateNameSurnameUsername(val: string): string {
    let v: string = this.form.get(val).value;
    return v == ''
      ? ''
      : v.length < 2
      ? 'Too short'
      : v.length > 20
      ? 'Too long'
      : '';
  }
  validatePasswordEmail(val: string): string {
    let v: string = this.form.get(val).value;
    return v == ''
      ? ''
      : v.length < 2
      ? 'Too short'
      : v.length > 40
      ? 'Too long'
      : '';
  }

  isSamePassword(): boolean {
    let password1 = this.form.get('password').value;
    let password2 = this.form.get('repeatedPassword').value;
    return password1 == password2;
  }
}
