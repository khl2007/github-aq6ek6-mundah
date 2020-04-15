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

import { Userfriends } from "./userfriends";

import { Feed } from "./postfeed";


import { flatMap, map } from "rxjs/operators";

import { User } from "./user";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private snapshotChangesSubscription: any;

  blogsRef: AngularFirestoreCollection<Blogitem>;
  chatref: AngularFirestoreCollection<any>;
  userfriends: Observable<Userfriends[]>;
  chatfriref : AngularFirestoreCollection<any>;

  userchats: Observable<any[]>;

  feedItem: Observable<Feed[]>;
  feeditems: any[];

  private userDoc: AngularFirestoreDocument<User>;
  private userDocc: AngularFirestoreCollection<User>;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    //this.userDocc = this.afs.collection("/users");
    //this.getChats();
    // this.blogsRef = this.afs.collection("/blogs");
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

  collectionInitialization(userid) {
    if (userid) {
      this.blogsRef = this.afs.collection("blogs", ref =>
        ref
          .orderBy("crtd", "desc")
          .limit(100)
          .where("byuser", "==", userid)
      );
    } else {
      this.blogsRef = this.afs.collection("blogs", ref =>
        ref.orderBy("crtd", "desc").limit(100)
      );
    }

    this.feedItem = this.blogsRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          // this.lastVisible = c[0].payload.doc;
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
    let x = null;

    this.collectionInitialization(x);

    /*this.feedItem.forEach(value => {
  console.log(value);
  
});*/
    //console.log(this.feedItem);
    // return result;
    return this.feedItem;
  }

  sellectUserNews(userid) {
    this.collectionInitialization(userid);
    return this.feedItem;
  }

  getUserId() {
    return firebase.auth().currentUser.uid;
  }
  getTimeSamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getUserInfo(userid: string): Observable<User> {
    //let currentUser = firebase.auth().currentUser;

    const userDetails = this.afs.doc<User>("users/" + userid).valueChanges();
    return userDetails;
  }

  getUserBlogs(userid: string): Observable<Blogitem[]> {
    const blogs = this.afs
      .collection<Blogitem>("blogs", ref => ref.orderBy("crtd", "desc"))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(c => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data()
          }));
        })
      );
    return blogs;
  }
  getChats(receverid) {
    //get the loged in user id
    let currentUser = firebase.auth().currentUser.uid;
    //this.afs.collection("people").doc(currentUser.uid).collection("tasks").snapshotChanges();
    let chats: any;
    //let receverid = "qjrcTo4JIXX9j8X7541rSBlowu73";
    this.chatref = this.afs
      .collection("chats")
      .doc(currentUser)
      .collection("friends")
      .doc(receverid)
      .collection('msgs' , ref => ref.orderBy('createdat', 'desc'));
    this.userchats = this.chatref.valueChanges();
    return this.userchats;
  }

getChatsFri() {
    //get the loged in user id
    let currentUser = firebase.auth().currentUser.uid;
    //this.afs.collection("people").doc(currentUser.uid).collection("tasks").snapshotChanges();
    let chats: any;
    //let receverid = "qjrcTo4JIXX9j8X7541rSBlowu73";
    this.chatfriref = this.afs
      .collection("chats")
      .doc(currentUser)
      .collection("friends");
    this.userfriends  = this.chatfriref.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          // this.lastVisible = c[0].payload.doc;
          const data = c.payload.doc.data();
          const userid = c.payload.doc.id;
          console.log('hi',data);
          return this.afs
            .doc("users/" + userid)
            .valueChanges()
            .pipe(
              map((userData: User) => {
                return Object.assign({
                  fuserid: userid,
                  user: userData.displayName,
                  useravtar: userData.avatar
                 
                });
              })
            );
        });
      }),
      flatMap(userfeeds => combineLatest(userfeeds))
    );

   
  }

InitChatfri(){
this.getChatsFri();

return this.userfriends;


}
  
  addChat(msg, receverid) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser.uid;
      let data = {
        msg: msg,
        sender: currentUser,
        createdat: this.getTimeSamp()
      };

      this.afs
        .collection("chats")
        .doc(currentUser)
        .collection("friends")
        .doc(receverid)
        .collection("msgs")
        .add(data)
        .then(res => resolve(res), err => reject(err));

      this.afs
        .collection("chats")
        .doc(receverid)
        .collection("friends")
        .doc(currentUser)
        .collection("msgs")
        .add(data)
        .then(res => resolve(res), err => reject(err));
    });
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
