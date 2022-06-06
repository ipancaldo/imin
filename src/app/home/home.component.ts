import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService) {}
  selectedUserId: number;
  users: IUser[];
  errorMessage: string;

  fillSelectedUserId(id: number) {
    this.selectedUserId = id;
    console.log(this.selectedUserId);
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => (this.errorMessage = err),
    });
  }
}
