import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUser } from '../interfaces/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private dataService: DataService // private formBuilder: FormBuilder
  ) {}
  // user: IUser;
  form = new FormGroup({
    username: new FormControl(
      '',
      Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.required,
      ])
    ),
  });

  submitNewUser(): void {
    let username: string = this.form.get('username').value;
    let user: IUser = {
      id: 1,
      username: username,
      goingToGo: false,
      assistantNumber: 1,
    };
    // this.user.username = this.form.get('username').value;
    console.log(user);
    this.dataService.saveUser(user);
  }

  ngOnInit(): void {}
}
