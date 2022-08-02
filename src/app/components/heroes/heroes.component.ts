import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: any[]
  time = Date.now()

  constructor(public firestore: Firestore,) { }

  ngOnInit(): void {

    this.getHeroes()
  }

  // ! Form for add data to firestore

  hero_form = new FormGroup({
    name: new FormControl(null, Validators.required),
    power: new FormControl(null, Validators.required),
    id: new FormControl(null, Validators.required)
  })

  // ! Add Data to the firestore

  addHero() {
    let heroData = {
      heroName: this.hero_form.value.name,
      heroPower: this.hero_form.value.power,
      heroId: this.hero_form.value.id,
      time: this.time
    }

    const dbInstance = collection(this.firestore, 'heroes')

    addDoc(dbInstance, heroData).then(() => {
      // alert('data sent successfully')
      console.log(this.time);

    }).catch((err) => {
      alert(err.message)
    })

    this.hero_form.reset()
  }

  // ! Get heroes from firestore database

  getHeroes() {
    const dbInstance = collection(this.firestore, 'heroes')

    // getDocs(dbInstance).then((response) => {
    //   console.log(
    //     this.heroes = [...response.docs.map(item => {
    //       return { ...item.data(), id: item.id }
    //     })]
    //   );
    // }).catch((err) => {
    //   alert(err.message)
    // })

    onSnapshot(dbInstance, (snapshot) => {
      let heroes: any[] = []
      snapshot.docs.forEach((doc) => {
        heroes.push({ ...doc.data(), id: doc.id })
        this.heroes = heroes
      })
    })
  }

  // ! Update hero

  updateHero(id: string) {
    const dataToUpdate = doc(this.firestore, 'heroes', id)
    updateDoc(dataToUpdate, {
      heroPower: 'Spider web'
    }).then(response => {
      // alert('data updated')
      this.getHeroes()
    }).catch((err) => {
      alert(err.message)
    })
  }

  // ! Delete hero

  deleteHero(id: string) {
    const dataToDelete = doc(this.firestore, 'heroes', id)
    deleteDoc(dataToDelete).then(() => {
      // alert('data deleted')
      this.getHeroes()
    }).catch((err) => {
      alert(err.message)
    })
  }

}
