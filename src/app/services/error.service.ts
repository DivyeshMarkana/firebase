import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  // errMsg: string

  constructor(private _snackBar: MatSnackBar) { }

  // errorMessages = {
  //   UNKNOWN: 'An unknown error occurred.',
  //   EMAIL_EXISTS: 'This email is already exists. please try another.',
  //   OPERATION_NOT_ALLOWED: 'Password sign in is disabled for this account.',
  //   TOO_MANY_ATTEMPTS_TRY_LATER: 'Many attempts please try again later.',
  //   EMAIL_NOT_FOUND: 'You have not registerd with this email. please register first.',
  //   INVALID_PASSWORD: 'The password is invalid, please enter correct password.',
  //   USER_DISABLED: 'User account has been disabled by admin.'

  // }

  openSnackbar(msg: string) {
    this._snackBar.open(msg, '', {
      data: {
        width: '200px',
        height: '100px'
      }
    })
  }

  errorMessages = {
    'wrong - password': 'The password is incorrect',
    'user-not-found': 'This email is not registerd',
    'email - already -in -use': 'This email is already exists. please try another.'
  }
}
