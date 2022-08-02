import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getDatabase, ref, set } from "firebase/database";
// import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public angularFirestore: AngularFirestore) { }

  get windowRef() {
    return window
  }

  // addToRealtimeDatabase(hero: any) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.angularFirestore.collection('heroes').add(hero).then((result) => {
  //       console.log(result);
  //     }).catch(err => {
  //       alert(err.message)
  //     })
  //   })
  // }

  addToRealtimeDatabase(hero: any) {
    const db = getDatabase()
    set(ref(db, 'heroes/' + hero.id), {
      name: hero.heroName,
      id: hero.heroId,
      power: hero.heroPower
    })

    console.log('new hero added');

  }


  getHeroesList() {
    return this.angularFirestore
      .collection('heroes')
      .snapshotChanges();
  }
}
