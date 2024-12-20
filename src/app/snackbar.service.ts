
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarOptions } from './snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(options: SnackbarOptions) {
    this.snackBar.open(options.message, options.action || 'Close', {
      duration: 3000,
      horizontalPosition: 'start',  
      verticalPosition: 'bottom',   
    });
  }
}
