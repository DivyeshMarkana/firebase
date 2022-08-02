import { Component, OnInit } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public firestore: Firestore, private authService: AuthService) { }

  ngOnInit(): void {
    // this.getHeroes()
    // this.authService.loggedIn()
  }


  // heroCount: number
  // heroes: any[] = []

  // login: boolean = this.authService.loggedIn()
  login: boolean = true

  // getHeroes() {
  //   const dbInstance = collection(this.firestore, 'heroes')
  //   onSnapshot(dbInstance, (snapshot) => {
  //     let heroes: any[] = []
  //     snapshot.docs.forEach((doc) => {
  //       heroes.push({ ...doc.data() })
  //       this.heroes = heroes

  //       this.heroCount = this.heroes.length
  //     })
  //     // console.log(this.heroes);
  //   })
  // }

  logout() {
    console.log(this.authService.loggedIn());
    this.authService.logout()
    console.log(this.authService.loggedIn());
    // this.login = this.authService.loggedIn()

  }

}
