import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  exports: [AlertComponent, MatSnackBarModule, AlertComponent],
})
export class SharedModule {}
