import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private _matSnackBar: MatSnackBar) {}

  openSnackBar(message, action) {
    let snackBarRef = this._matSnackBar.open(message, action);

    snackBarRef.afterDismissed().subscribe(() => {});
    snackBarRef.onAction().subscribe(() => {});
  }
}
