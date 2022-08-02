import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { getDatabase, ref, set, remove, onValue } from "firebase/database";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: string
  token: string
  itemRef: AngularFireList<any>

  constructor(public auth: Auth, private router: Router, private firestore: Firestore, public angularFirestore: AngularFirestore) { }

  register(email: string, password: string) {

    createUserWithEmailAndPassword(this.auth, email, password).then((response) => {
      console.log(response.user);
    }).catch((err) => {
      // console.log({ err });

      if (err.message.indexOf('email - already -in -use')) {
        this.error = 'This email is already exists. please try another.'
      }
    })
  }

  logIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password).then((response) => {
      console.log(response.user);

      const user = response.user;

      user.getIdTokenResult().then(t => {
        this.token = t.token


        // // ! Add token to firestore

        // const dbInstance = collection(this.firestore, 'token')
        // const token = t.token
        // addDoc(dbInstance, { token }).then(() => {
        //   console.log('token added to firestore');

        // }).catch((err) => {
        //   alert(err.message)
        // })

        // // ! ends

        //  ! add token to realtime

        const db = getDatabase()
        set(ref(db, 'token/'), this.token)


        // ! Add token to local storages
        // if (!localStorage.getItem('user-token')) {
        //   // localStorage.setItem('user-token', JSON.stringify(this.token))
        // }
        // this.loggedIn()
        this.router.navigate(['/home'])
      });
    }).catch((err) => {
      // console.log({ err });

      if (err.message.indexOf('user-not-found')) {
        this.error = 'This email is not registerd.'
      }

      if (err.message.indexOf('wrong - password')) {
        this.error = 'The password is incorrect.'
      }
    })
  }

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

  // loggedIn() {
  //   // return !!localStorage.getItem('user-token')
  //   if (localStorage.getItem('user-token')) {
  //     return true
  //   } else {
  //     return false
  //   }

  //   // const dbInstance = collection(this.firestore, 'heroes')

  //   // onSnapshot(dbInstance, (snapshot) => {
  //   //   let heroes: any[] = []
  //   //   snapshot.docs.forEach((doc) => {
  //   //     heroes.push({ ...doc.data(), id: doc.id })
  //   //   })
  //   // })
  // }

  loggedIn() {
    // const db = getDatabase()
    // set(ref(db, 'token/'), token)

    // return this.angularFirestore
    //   .collection('token')
    //   .snapshotChanges();

    const db = getDatabase()
    const logRef = ref(db, 'token/')
    const isLogin = onValue(logRef, (snapshot) => snapshot.val()
    )

    console.log(!!isLogin);


    // return !!isLogin
  }

  logout() {
    // localStorage.removeItem('user-token')
    // this.itemRef.remove(this.token)

    const db = getDatabase()
    remove(ref(db, 'token/'))
  }
}
