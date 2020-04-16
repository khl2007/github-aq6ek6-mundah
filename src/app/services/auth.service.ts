import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, combineLatest } from "rxjs";

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private authState: Observable<firebase.User>;

  constructor(
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ){

this.authState = this.afAuth.authState;

}

getAuthState() {
    return this.afAuth.authState;
  }

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
		  return this.updateUserem(value)
		  
	 },
       err => reject(err))
   })
  }
  
  updateUserem(user: any) {
    const newUser: any = {
      email: user.email,
      displayName: user.username
    };
	 return new Promise<any>((resolve, reject) => {
      let currentUser = this.afAuth.auth.currentUser.uid;
      this.afs.collection('users').doc(currentUser).set(newUser)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }


  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        //this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }
}
