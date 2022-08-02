import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: Boolean = false
  error: string = this.authService.error

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  })

  register() {
    let email = this.login_form.value.email
    let password = this.login_form.value.password

    this.authService.register(email, password)
  }

  googleSignIn() {
    this.authService.googleSignIn()
  }

}
