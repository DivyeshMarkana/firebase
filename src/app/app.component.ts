import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { addDoc, getDocs, Firestore, collection, doc, updateDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { AppService } from './services/app.service';
import { Database } from '@angular/fire/database'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'firebase'
  errorMsg: Boolean = false


  gAuth = getAuth()
  windowRef: any
  heroCount: number

  googleSignIn() {
    const gAuth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(gAuth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user
      console.log(token);

      console.log(user);

      console.log('Successed');

    }).catch((err) => {
      alert(err.message)
    })
  }

  ngOnInit(): void {
    // this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha_container', {
    //   size : 'normal',
    // },
    // this.windowRef.recaptchaVerifier.render());
    // this.getHeroes()
  }



  constructor(public auth: Auth,
    public firestore: Firestore,
    private appService: AppService,
    private db: Database,
  ) {
    // this.getHeroes()
    // console.log(this.time);
    // setInterval(() => {
    //   console.log(this.date.getTime());
    // },1000)

    this.windowRef = appService.windowRef
  }

  // ! Form for Login and Register user

  // login_form = new FormGroup({
  //   email: new FormControl('mac@d.co', [Validators.required, Validators.email]),
  //   password: new FormControl('qwerty12345', Validators.required)
  // })

  // ! Form for Phone number Authentication

  phone_form = new FormGroup({
    phone: new FormControl(null, Validators.required)
  })


  // ! Register account with email and password

  // register() {
  //   let email = this.login_form.value.email
  //   let password = this.login_form.value.password

  //   createUserWithEmailAndPassword(this.auth, email, password).then((response) => {
  //     console.log(response.user);
  //   }).catch((err) => {
  //     // alert(err.message)
  //     this.errorMsg = true
  //   })
  // }

  // ! Login with email and password

  // logIn() {
  //   let email = this.login_form.value.email
  //   let password = this.login_form.value.password

  //   signInWithEmailAndPassword(this.auth, email, password).then((response) => {
  //     // alert(response.user.email);
  //     // console.log(response.user);
  //     console.log(response);

  //     // for (const key in response.user) {
  //     //   console.log(`${key} : ${response.user[key]}`);

  //     // }

  //   }).catch((err) => {
  //     alert(err.message)
  //   })
  // }





  // ! add hero with realtime database

  // addToRealtimeDatabase() {
  //   // console.log(this.hero_form.value.name);

  //   let heroData = {
  //     heroName: this.hero_form.value.name,
  //     heroPower: this.hero_form.value.power,
  //     heroId: this.hero_form.value.id,
  //     time: this.time
  //   }
  //   this.appService.addToRealtimeDatabase(heroData)
  // }

  // getHeroesList() {
  //   this.appService.getHeroesList().subscribe((response) => {
  //     this.heroes = response.map((e) => {
  //       return {
  //         id: e.payload.doc.id,
  //         ...(e.payload.doc.data() as any)
  //       }
  //     })
  //   })
  // }

  getOtp() {
    // console.log(this.phone_form.value.phone);

    const phoneNumber = this.phone_form.value.phone
    // const appVerifier = window.recaptchaVerifier
  }
}
