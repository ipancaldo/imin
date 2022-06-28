import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private matSnackBar: MatSnackBar) {}

  openSnackBar(message, action) {
    let snackBarRef = this.matSnackBar.open(message, action);

    snackBarRef.afterDismissed().subscribe(() => {});
    snackBarRef.onAction().subscribe(() => {});
  }
}
