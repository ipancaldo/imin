import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LogingService } from 'src/app/services/loging.service';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alert: AlertService,
    private _loader: LoadingService,
    private _dialogRef: MatDialog,
    private _logingService: LogingService
  ) {}
  selectedUserId: number;
  users: User[] = [];
  errorMessage: string;
  loading$ = this._loader.loading$;

  fillSelectedUserId(id: number) {
    this.selectedUserId = id;
    console.log(this.selectedUserId);
  }

  imIn(id: number): void {
    // if (id == null) {
    //   this._alert.openSnackBar('An user must be selected', 'Ok');
    // } else {
    this._router.navigate(['/whosgoing']);
    // }
  }

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((user) => {
      this.users = Object.values(user);
    });

    var welcomeBack = document.getElementById('welcomeBack');
    var usernameWelcome = document.getElementById('usernameWelcome');

    this._logingService.logout$.subscribe((isLogedOut) => {
      if (isLogedOut == false) {
        this._logingService.username$.subscribe((message) => {
          if (message != '') {
            document.getElementById('imNewButton').style.display = 'none';
            document.getElementById('logInButton').style.display = 'none';
            document.getElementById('logOutButton').style.display = 'block';

            welcomeBack.innerHTML = 'Welcome back, ';
            usernameWelcome.innerHTML = `${message}!`;

            welcomeBack.style.display = 'block';
            usernameWelcome.style.display = 'block';
          }
        });
      } else {
        document.getElementById('imNewButton').style.display = 'block';
        document.getElementById('logInButton').style.display = 'block';
        document.getElementById('logOutButton').style.display = 'none';

        welcomeBack.innerHTML = '';
        usernameWelcome.innerHTML = '';
      }
    });
  }

  refreshView(): void {
    window.location.reload();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
