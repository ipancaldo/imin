import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  selectedUserId: number;
  users: IUser[];
  errorMessage: string;

  fillSelectedUserId(id: number) {
    this.selectedUserId = id;
    console.log(this.selectedUserId);
  }

  createNewUser() {
    this.router.navigateByUrl('/signup');
  }

  imIn(id: number): void {
    if (id == null) {
      console.log("Error: id coulnd't be null");
    } else {
      this.router.navigate(['/whosgoing']);
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
      error: (err) => (this.errorMessage = err),
    });
  }
}
