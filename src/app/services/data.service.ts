import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers() {
    // let header = new HttpHeaders().set('Type-content', 'application/json)');
    return this.httpClient.get(environment.users);
  }
  saveUser(user: User) {
    this.httpClient.post(environment.users, user).subscribe(
      (response) => console.log('User saved ' + response),
      (err) => console.log('Error: ', err)
    );
  }
}
