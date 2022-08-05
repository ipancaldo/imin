import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observer } from 'rxjs';
import { LogingService } from './services/loging.service';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private _dialogRef: MatDialog,
    private _logingService: LogingService
  ) {}
  title = 'imin-app';
  basketballImage = '../assets/img/basketball.png';

  createNewUser(): void {
    this._dialogRef.open(SignupComponent);
  }

  logIn(): void {
    this._dialogRef.open(LoginComponent);
  }

  logOut(): void {
    this._logingService.sendLogout(true);
  }
}
