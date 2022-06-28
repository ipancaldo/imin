import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { IUser } from 'src/app/interfaces/user';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-whosgoing',
  templateUrl: './whosgoing.component.html',
  styleUrls: ['./whosgoing.component.css'],
})
export class WhosgoingComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _loader: LoadingService
  ) {}
  loading$ = this._loader.loading$;
  userGoingCounter: number;
  errorMessage: string;
  users: User[];

  backButton(): void {
    this._router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    this._userService
      .getAllUsers()
      .subscribe((user) => (this.users = Object.values(user)));
  }
}
