import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AlertService } from 'src/app/services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alert: AlertService,
    private _loader: LoadingService
  ) {}
  selectedUserId: number;
  users: User[] = [];
  errorMessage: string;
  loading$ = this._loader.loading$;

  fillSelectedUserId(id: number) {
    this.selectedUserId = id;
    console.log(this.selectedUserId);
  }

  createNewUser() {
    this._router.navigateByUrl('/signup');
  }

  imIn(id: number): void {
    // if (id == null) {
    //   this._alert.openSnackBar('An user must be selected', 'Ok');
    // } else {
    this._router.navigate(['/whosgoing']);
    // }
  }

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((user) => {
      this.users = Object.values(user);
    });
  }
}
