import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-whosgoing',
  templateUrl: './whosgoing.component.html',
  styleUrls: ['./whosgoing.component.css'],
})
export class WhosgoingComponent implements OnInit {
  constructor(private userService: UserService) {}
  goingToGo: boolean;
  userGoingCounter: number;
  errorMessage: string;

  public users: IUser[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (user) => (this.users = user),
      error: (err) => (this.errorMessage = err),
    });
    this.users = [
      {
        id: 0,
        userName: 'Ignacio Pancaldo',
        goingToGo: true,
        assistantNumber: 1,
      },
      {
        id: 0,
        userName: 'Ignacio Pancaldo',
        goingToGo: true,
        assistantNumber: 1,
      },
      {
        id: 0,
        userName: 'Ignacio Pancaldo',
        goingToGo: true,
        assistantNumber: 1,
      },
    ];

    //This is not used
    this.userGoingCounter = this.users.filter(
      (u) => u.goingToGo == true
    ).length;
  }
}
