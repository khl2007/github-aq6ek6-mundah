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
import { Blogitem } from "./blogitem";

import { Feed } from "./postfeed";

import { flatMap, map } from "rxjs/operators";

import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private snapshotChangesSubscription: any;

  blogsRef: AngularFirestoreCollection<Blogitem>;
 
  feedItem: Observable<Feed[]>;
  feeditems: any[];
  
  
  private userDoc: AngularFirestoreDocument<User>;
  private userDocc: AngularFirestoreCollection<User>;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.userDocc = this.afs.collection("/users");

    this.blogsRef = this.afs.collection("/blogs");
  }

  getTasks() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs
            .collection("people")
            .doc(currentUser.uid)
            .collection("tasks")
            .snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }
  getBlogs() {
    return this.afs.collection("/blogs");
  }

  collectionInitialization() {
    this.blogsRef = this.afs.collection('blogs', ref => ref.orderBy("crtd", 'desc').limit(10));
    this.feedItem = this.blogsRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          const data = c.payload.doc.data();
          const blogid = c.payload.doc.id;
          const userid = data.byuser;
          const blgbody = data.body;
          const blgimg = data.imgurl;
          const bloglikes = data.likes;
          const blogcrtd = data.crtd;
          //this.startq = c[0].payload.doc;
          return this.afs
            .doc("users/" + userid)
            .valueChanges()
            .pipe(
              map((userData: User) => {
                return Object.assign({
                  blogrefid: blogid,
                  buserid: userid,
                  user: userData.displayName,
                  useravtar: userData.avatar,
                  body: blgbody,
                  bimgurl: blgimg,
                  crtd: blogcrtd,
                  likes: bloglikes
                });
              })
            );
        });
      }),
      flatMap(feeds => combineLatest(feeds))
    );
  }


  sellectAllNews() {
    this.collectionInitialization();

    /*this.feedItem.forEach(value => {
  console.log(value);
  
});*/
    console.log(this.feedItem);
    // return result;
    return this.feedItem;
  }
  getUserId(){
  
  return  firebase.auth().currentUser.uid;

  }
  getTimeSamp(){
   return firebase.firestore.FieldValue.serverTimestamp();
  }
  getUserInfoo() {
    let thetestuser: any;
    let currentUser = firebase.auth().currentUser;
    //return this.afs.doc<User>('users/' + currentUser.uid);
    return this.afs
      .collection("users")
      .doc(currentUser.uid)
      .snapshotChanges();
    console.log("service function caled ");
  }

  getUserInfo() {
    let currentUser = firebase.auth().currentUser;

    this.userDoc = this.afs.doc<User>("users/" + currentUser.uid);
    return this.userDoc;
  }

  getTask(taskId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          this.snapshotChangesSubscription = this.afs
            .doc<any>("blogs/" + taskId)
            .valueChanges()
            .subscribe(
              snapshots => {
                resolve(snapshots);
              },
              err => {
                reject(err);
              }
            );
        }
      });
    });
  }

  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    this.snapshotChangesSubscription.unsubscribe();
  }

  updateTask(taskKey, value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("blogs")
    
        .doc(taskKey)
        .set(value)
        .then(res => resolve(res), err => reject(err));
    });
  }

  deleteTask(taskKey) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("people")
        .doc(currentUser.uid)
        .collection("tasks")
        .doc(taskKey)
        .delete()
        .then(res => resolve(res), err => reject(err));
    });
  }

  createTask(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs
        .collection("blogs")
        .add(value)
        .then(res => resolve(res), err => reject(err));
    });
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function() {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }

  uploadImage(imageURI, randomId) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child("image").child(randomId);
      this.encodeImageUri(imageURI, function(image64) {
        imageRef.putString(image64, "data_url").then(
          snapshot => {
            snapshot.ref.getDownloadURL().then(res => resolve(res));
          },
          err => {
            reject(err);
          }
        );
      });
    });
  }
}
