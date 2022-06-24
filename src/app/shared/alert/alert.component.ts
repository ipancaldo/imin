import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(private snackBar?: MatSnackBar) {}

  ngOnInit(): void {}

  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action);

    snackBarRef.afterDismissed().subscribe(() => {});
    snackBarRef.onAction().subscribe(() => {});
  }
}
