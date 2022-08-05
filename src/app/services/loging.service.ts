import { Injectable } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogingService {
  private username = new BehaviorSubject<string>('');
  public username$ = this.username.asObservable();

  public logout = new BehaviorSubject<boolean>(false);
  public logout$ = this.logout.asObservable();

  constructor() {}

  public sendUsernameToLogin(message: string) {
    this.username.next(message);
  }

  public sendLogout(isLogingOut: boolean) {
    this.logout.next(isLogingOut);
  }
}
