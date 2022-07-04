import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, find, tap } from 'rxjs/operators';
import { User } from '../classes/user';
import { IUser } from '../interfaces/user';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userUrl = 'api/users/users.json';
  constructor(private http: HttpClient, private dataService: DataService) {}

  users: User[] = [];
  use;
  user: User;
  errorMessage;

  getAllUsers() {
    return this.dataService.getAllUsers();
  }

  async userExists(user: User) {
    this.user = user;

    this.getAllUsers().subscribe((u) => {
      this.users = Object.values(u);
      console.log('Console log 1: ', u);
    });
    // this.getAllUsers().subscribe({
    //   next: (u) => (this.users = Object.values(u)),
    //   error: (err) => (this.errorMessage = err),
    // });
    // this.users = await this.getAllUsers().toPromise();
    // this.use = this.users;
    // this.dataService
    //   .getAllUsers()
    //   .pipe(tap((u) => (this.users = Object.values(u))))
    //   .subscribe((d) => console.log(d));

    console.log('Console log 2: usernameExists: ', this.usernameExists());
    // console.log(this.emailExists());

    // Ver que al parecer es como que sigue el código y no se para a hacer el find
    if (this.usernameExists()) return true;
    // if (this.usernameExists() || this.emailExists()) return true;
    return false;
  }

  // private emailExists(): boolean {
  //   var userFound = this.users?.find((e) => e.email === this.user.email);
  //   console.log('Userfound:', userFound.email);
  //   console.log('Previous user:', this.user.email);
  //   if (userFound == null) return false;
  //   return true;
  // }

  private usernameExists(): boolean {
    console.log('Console log 3: ', this.user.username);
    var userFound = Array.from(this.users).find(
      (e) => e.username === this.user.username
    );
    console.log('Console log 4: ', { userFound });
    if (userFound == null) return false;
    return true;
  }

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
