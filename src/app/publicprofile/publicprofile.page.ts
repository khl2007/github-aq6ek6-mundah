import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Blogitem } from "../services/blogitem";

import { User } from "../services/user";

import { flatMap, map } from "rxjs/operators";

import { FirebaseService } from '../services/firebase.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publicprofile',
  templateUrl: './publicprofile.page.html',
  styleUrls: ['./publicprofile.page.scss'],
})
export class PublicprofilePage implements OnInit {
userid : string;

userData: User = new User();

postfeed: any;

public like_btn = {
    color: "black",
    icon_name: "heart-outline"
  };

  public tap: number = 0;


  constructor(private route: ActivatedRoute,private router: Router , private firebaseService: FirebaseService) { }

  ngOnInit() {
if(this.route.snapshot.params['buserid']){

this.userid = this.route.snapshot.params['buserid'];

console.log(this.userid);
this.getuserdata(this.userid);

this.getBlogPosts(this.userid);

}

    

//getUserInfo

  }

   getuserdata(userid){


this.firebaseService.getUserInfo(userid).subscribe(
        (result: User) => {
          this.userData = result;
        }
      );

console.log(this.userData);

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
