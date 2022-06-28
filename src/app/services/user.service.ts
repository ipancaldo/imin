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
  user: User;
  getAllUsers() {
    return this.dataService.getAllUsers();
  }

  checkIfUserExists(user: User): boolean {
    this.user = user;
    this.dataService.getAllUsers().subscribe((u) => {
      this.users = Object.values(u);
    });
    // Ver que al parecer es como que sigue el código y no se para a hacer el find
    if (this.checkIfUsernameExist() || this.checkIfEmailExist) return true;
    return false;
  }

  private checkIfEmailExist(): boolean {
    var userFound = this.users?.find((e) => e.email === this.user.email);
    console.log('Userfound:', userFound.email);
    console.log('Previous user:', this.user.email);
    if (userFound == null) return false;
    return true;
  }

  private checkIfUsernameExist(): boolean {
    var userFound = this.users?.find((e) => e.username === this.user.username);
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
