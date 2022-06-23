import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-whosgoing',
  templateUrl: './whosgoing.component.html',
  styleUrls: ['./whosgoing.component.css'],
})
export class WhosgoingComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  // goingToGo: boolean;
  userGoingCounter: number;
  errorMessage: string;

  users2: User[] = [
    new User(
      'Ignacio',
      'Pancaldo',
      'ipancaldo',
      'ipancaldo@ip.com',
      '1234567890',
      true,
      1
    ),
    new User(
      'Anabella',
      'Meluzzi',
      'ameluzzi',
      'amel@ip.com',
      '1234567890',
      false
    ),
    new User(
      'Mateo',
      'Pancaldo',
      'mpancaldo',
      'mpancaldo@ip.com',
      '1234567890',
      true,
      2
    ),
  ];
  public users: IUser[];

  backButton(): void {
    this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (user) => (this.users = user),
      error: (err) => (this.errorMessage = err),
    });
    this.users = [
      {
        id: 0,
        username: 'Ignacio Pancaldo',
        email: '',
        goingToGo: true,
        assistantNumber: 1,
        password: '',
      },
      {
        id: 0,
        username: 'Ignacio Pancaldo',
        email: '',
        goingToGo: true,
        assistantNumber: 1,
        password: '',
      },
      {
        id: 0,
        username: 'Ignacio Pancaldo',
        email: '',
        goingToGo: true,
        assistantNumber: 1,
        password: '',
      },
    ];

    //This is not used
    this.userGoingCounter = this.users.filter(
      (u) => u.goingToGo == true
    ).length;
  }
}
