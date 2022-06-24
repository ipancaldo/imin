import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/classes/user';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar // private alert: AlertComponent
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
      return this.openSnackBar("The passwords aren't the same", 'Ok');
    if (!this.form.valid) {
      return this.openSnackBar(
        'The form is not correct. Please check the hints',
        'Ok'
      );
    } else {
      let user = new User(
        form.name,
        form.surname,
        form.username,
        form.email,
        form.password
      );
      this.dataService.saveUser(user);
    }
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

  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action);

    snackBarRef.afterDismissed().subscribe(() => {});
    snackBarRef.onAction().subscribe(() => {});
  }
}
