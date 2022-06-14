import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  saveUser(user: IUser) {
    this.httpClient
      .post('https://imin-fdb21-default-rtdb.firebaseio.com/data.json', user)
      .subscribe(
        (response) => console.log('User saved ' + response),
        (err) => console.log('Error: ', err)
      );
  }
}
