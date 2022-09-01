import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, find, map, tap } from 'rxjs/operators';
import { User } from '../classes/user';
import { IUser } from '../interfaces/user';
import { CommonService } from './common.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userUrl = 'api/users/users.json';
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private _common: CommonService
  ) {}

  users: User[] = [];
  user: User;
  doUserExists: boolean;
  errorMessage;

  getAllUsers() {
    return this.dataService.getAllUsers();
  }

  async doUserExist(user: User) {
    this.user = user;

    this.getUsers();

    await this._common.delay(1000);
    return this.doUsernameExists() || this.doEmailExists();
  }

  private doUsernameExists(): boolean {
    var userFound = Array.from(this.users).find(
      (e) => e.username === this.user.username
    );
    if (userFound == null) return false;
    return true;
  }

  private doEmailExists(): boolean {
    var userFound = Array.from(this.users).find(
      (e) => e.email === this.user.email
    );
    if (userFound == null) return false;
    return true;
  }

  async userLoging(username: string, password: string) {
    this.user = new User(username, password);

    this.getUsers();
    await this._common.delay(1000);

    var userMatch = this.doUsernameAndPasswordMatch();
    await this._common.delay(1000);

    if (userMatch == null) return 'User or password is invalid.';
    return this.user.username;
  }

  private getUsers() {
    this.getAllUsers().subscribe((u) => {
      this.users = Object.values(u);
    });
  }

  private doUsernameAndPasswordMatch() {
    return Array.from(this.users).find(
      (e) =>
        e.username === this.user.username && e.password === this.user.password
    );
  }

  //In theory, this is the way to check it without the delay
  // public doUserExist(user: User): Observable<boolean> {
  //   this.getAllUsers().pipe(
  //     map((u) => {
  //       return u.some((us) => us.username === user.username);
  //     })
  //   );

  //   console.log('Test doUserExist');
  //   return;
  // }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(console.error(errorMessage));
    return throwError(errorMessage);
  }
}
