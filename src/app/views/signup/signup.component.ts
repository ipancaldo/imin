import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/classes/user';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private router: Router,
    private alert: AlertService
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
    repeatedPassword: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
  });

  submitNewUser(form): void {
    if (!this.comparePasswords())
      return this.alert.openSnackBar("The passwords aren't the same", 'Ok');
    if (!this.form.valid)
      return this.alert.openSnackBar(
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
    if (this.userService.checkIfUserExists(user))
      return this.alert.openSnackBar(
        'Username or Email already registered.',
        'Ok'
      );

    this.dataService.saveUser(user);
  }

  backButton(): void {
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {}

  //Validations
  validator(val: string): string {
    let v: string = this.form.get(val).value;
    return v == ''
      ? ''
      : v.length < 2
      ? 'Too short'
      : v.length > 20
      ? 'Too long'
      : '';
  }

  comparePasswords(): boolean {
    let password1 = this.form.get('password').value;
    let password2 = this.form.get('repeatedPassword').value;
    return password1 == password2;
  }
}
