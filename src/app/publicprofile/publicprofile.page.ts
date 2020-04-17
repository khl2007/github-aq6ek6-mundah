import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Blogitem } from "../services/blogitem";

import { User } from "../services/user";

import { flatMap, map } from "rxjs/operators";

import { FirebaseService } from "../services/firebase.service";
//import { Animation, AnimationController } from '@ionic/angular';
import { FollowService } from "../services/follow.service";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-publicprofile",
  templateUrl: "./publicprofile.page.html",
  styleUrls: ["./publicprofile.page.scss"]
})
export class PublicprofilePage implements OnInit {
  userid: string;
  showToolbar = false;
  userData: User = new User();
	isFollowing: boolean;
  postfeed: any;
  ismyprofile = false;
  public like_btn = {
    color: "primary",
    icon_name: "heart-outline"
  };

  public tap: number = 0;

  constructor(
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private followserv: FollowService,
    private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    const curentuserid = this.firebaseService.getUserId();
    if (this.route.snapshot.params["buserid"]) {
      this.userid = this.route.snapshot.params["buserid"];
			  if (this.userid === curentuserid) {
				this.ismyprofile = true;
				
			  } else {
				//this.router.navigate(["/login"]);
			  }
      console.log(this.followserv.isFollowing(this.userid,curentuserid));
	  //this.isFollowing = this.followserv.isFollowing(this.userid,curentuserid);
		
      this.getuserdata(this.userid);

      this.getBlogPosts(this.userid);
    } else {
        //this.router.navigate(["/login"]);
		this.userid = curentuserid;
		 this.ismyprofile = true;
		 this.getuserdata(this.userid);

      this.getBlogPosts(this.userid);
      }

    //getUserInfo
  }
  onScroll($event) {
if ($event && $event.detail && $event.detail.scrollTop) {
const scrollTop = $event.detail.scrollTop;
this.showToolbar = scrollTop >= 225;
}
} 

  getuserdata(userid) {
    this.firebaseService.getUserInfo(userid).subscribe((result: User) => {
      this.userData = result;
    });

    console.log(this.userData);
  }

  follow(profileuid) {
    this.followserv.follow(profileuid);
  }

  getBlogPosts(userid) {
    this.firebaseService.sellectUserNews(userid).subscribe(res => {
      console.log(res);
      this.postfeed = res;
    });
    //console.log(this.blogPost);
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
      //this.goMessages();
    }
  }

  scrollToTop() {
    //this.content.scrollToTop();
  }
}
