import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import "firebase/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, combineLatest } from "rxjs";

import { AuthService } from "./auth.service";
import { flatMap, map } from "rxjs/operators";
import { User } from "./user";



@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    
  ) { }

  isFollowing(profileuid, currentuid) {
    return this.afs.collection<any>('/users/' + profileuid + '/followers', ref => ref.where('uid', '==', currentuid)).valueChanges();
  }

  follow(profileuid) {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          const currentuid = user.uid;
          let data = {
            uid: profileuid
          };
          this.afs.collection<any>('/users/' + currentuid + '/following').doc(profileuid).set(data);
          data = {
            uid: currentuid
          };
          this.afs.collection<any>('/users/' + profileuid + '/followers').doc(currentuid).set(data);
        }
      });
  }

  unfollow(profileuid) {
    this.auth.getAuthState().subscribe(
      user => {
        if (user) {
          const currentuid = user.uid;
          this.afs.collection<any>('/users/' + currentuid + '/following').doc(profileuid).delete();
          this.afs.collection<any>('/users/' + profileuid + '/followers').doc(currentuid).delete();
        }
    });
  }

  getFollowing(uid) {
    return this.afs.collection<any>('/users/' + uid + '/following').valueChanges();
  }

  getFollowers(uid) {
    return this.afs.collection<any>('/users/' + uid + '/followers').valueChanges();
  }

}
