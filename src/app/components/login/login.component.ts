import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string = this.authService.error
  errorMessages = this._errService.errorMessages

  constructor(private _errService: ErrorService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login_form = new FormGroup({
    email: new FormControl('mac@d.co', [Validators.required, Validators.email]),
    password: new FormControl('qwerty12345', Validators.required)
  })

  logIn() {
    let email = this.login_form.value.email
    let password = this.login_form.value.password
    this.authService.logIn(email, password)
  }

  googleSignIn() {
    this.authService.googleSignIn()
  }

}