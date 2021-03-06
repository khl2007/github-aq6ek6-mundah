 import { Component, OnInit , ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular"; 
import { Router, ActivatedRoute } from "@angular/router";

import { ModalController } from '@ionic/angular';
import { CommentsComponent } from '../comments/comments.component';

//import { Animation, AnimationController } from '@ionic/angular';

import { IonInfiniteScroll } from '@ionic/angular';

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import { IonRouterOutlet } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";
import { Blogitem } from "../services/blogitem";

import { User } from "../services/user";
 
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  //@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

items: Array<any>;
  crtusertest: Observable<User>;
  blogs: any;
  postfeed :any;
  crtuser: Observable<User>;
  someuser: any;
  public like_btn = {
    color: "secondary",
    icon_name: "heart-outline"
  };

  public tap: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    public moCtrl: ModalController,
    private routerOutlet: IonRouterOutlet
  ) {




    }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
    //this.getBlogs();
    //this.getCrtusertest();
    //this.getCrtusertestt();
    //this.postfeed= this.firebaseService.sellectAllNews();
   

  }

async presentcommtsModal() {
  const modal = await this.moCtrl.create({
    component: CommentsComponent,
    swipeToClose: true,
    presentingElement: this.routerOutlet.nativeEl
  });
  return await modal.present();
}


  async getData() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    this.presentLoading(loading);
      this.firebaseService.sellectAllNews().subscribe(res => {
  // console.log(res);
    loading.dismiss();
   this.postfeed = res;
   });
   
  }
  getCrtusertest() {
   // this.crtuser = this.firebaseService.getUserInfo().valueChanges();
  }

  

  getBlogs() {
    this.firebaseService
      .getBlogs()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      )
      .subscribe(blogs => {
        this.blogs = blogs;
      });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  likeButton() {
    if (this.like_btn.icon_name === "heart-outline") {
      this.like_btn.icon_name = "heart";
      this.like_btn.color = "danger";
      // Do some API job in here for real!
    } else {
      this.like_btn.icon_name = "heart-outline";
      this.like_btn.color = "black";
    }
  }

/*getLikes(pid) {
    this.likeService.getLikes(pid).subscribe(likes => {
      this.likes = likes;
      this.likeLen = likes.length;
      this.auth.getAuthState().subscribe(
        user => {
          if (user) {
            this.currentuser = user;
            this.likes.forEach(like => {
              if (like.uid === user.uid) {
                this.isLiked = true;
                this.likeStyle = 'fa fa-thumbs-up post-liked';
              }
            });
          }
        });
    });
  }*/

  tapPhotoLike(times) {
    // If we click double times, it will trigger like the post
    this.tap++;
    if (this.tap % 2 === 0) {
      this.likeButton();
    }
  }

  swipePage(event) {
    if (event.direction === 1) {
      // Swipe Left
      console.log("Swap Camera");
    }

    if (event.direction === 2) {
      // Swipe Right
      //this.goMessages();
    }
  }

  scrollToTop() {
    //this.content.scrollToTop();
  }

  logout() {
    this.authService.doLogout().then(
      res => {
        this.router.navigate(["/login"]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
