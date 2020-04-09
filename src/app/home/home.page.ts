import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

import { IonInfiniteScroll } from '@ionic/angular';

import { Observable } from "rxjs";

import { map } from "rxjs/operators";

import { FirebaseService } from "../services/firebase.service";
import { Blogitem } from "../services/blogitem";

import { User } from "../services/user";
 
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

items: Array<any>;
  crtusertest: Observable<User>;
  blogs: any;
  postfeed :any;
  crtuser: Observable<User>;
  someuser: any;
  public like_btn = {
    color: "black",
    icon_name: "heart-outline"
  };

  public tap: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
    }
    //this.getBlogs();
    this.getCrtusertest();
    this.getCrtusertestt();
    //this.postfeed= this.firebaseService.sellectAllNews();
    this.firebaseService.sellectAllNews().subscribe(res => {
   console.log(res);
   this.postfeed = res;
});

  }

infinitload(event){

setTimeout(() => {
      console.log('Done');
      event.target.complete();

this.firebaseService.loadnextvals();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
     /* if (data.length == 1000) {
        event.target.disabled = true;
      }*/
    }, 500);


}

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    this.presentLoading(loading);

    this.route.data.subscribe(routeData => {
      routeData["data"].subscribe(data => {
        loading.dismiss();
        this.items = data;
      });
    });
  }
  getCrtusertest() {
    this.crtuser = this.firebaseService.getUserInfo().valueChanges();
  }

  getCrtusertestt() {
    this.firebaseService.getUserInfoo().subscribe(resdata => {
      let data = resdata["data"];
     
    });

    /*this.crtuser.subscribe(data => {
      this.someuser = data;
      console.log("thetestuserservice: ", this.someuser.email);
      console.log("data: ", data);
    });*/
   // console.log("thetestuserservice: ", this.someuser);
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
      this.goMessages();
    }
  }

  scrollToTop() {
    this.content.scrollToTop();
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
