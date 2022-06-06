import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

let snackMessage: string;

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  setMessage(message: string) {
    snackMessage = message
  }

  openSnackBar() {

    if (snackMessage!=null)
    {
      this.snackBar.open(snackMessage, 'Ok', {panelClass: ['green-snackbar', 'login-snackbar'], duration: 8000});
    }
    snackMessage != null;
  }
}