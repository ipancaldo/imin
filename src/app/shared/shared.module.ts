import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  exports: [MatSnackBarModule],
})
export class SharedModule {}
