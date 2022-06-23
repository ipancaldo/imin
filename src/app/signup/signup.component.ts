import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private router: Router
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
    if (!this.comparePasswords()) return alert("The passwords aren't the same");
    if (!this.form.valid) {
      alert('The form is not correct. Please check the hints');
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
      ? 'Too short.'
      : v.length > 20
      ? 'Too long.'
      : '';
  }

  comparePasswords(): boolean {
    let password1 = this.form.get('password').value;
    let password2 = this.form.get('repeatedPassword').value;
    return password1 == password2;
  }
}
