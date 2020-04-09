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
const userid : string ;

userData: User = new User();

blogPost: Blogitem[] = [];

  constructor(private route: ActivatedRoute,private router: Router , private firebaseService: FirebaseService) { }

  ngOnInit() {
if(this.route.snapshot.params['buserid']){

this.userid = this.route.snapshot.params['buserid'];

console.log(this.userid);
this.getuserdata(this.userid);

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
    this.firebaseService.getUserBlogs(userid).subscribe(result => {
        this.blogPost = result;
      });

console.log(this.blogPost);

  }


}
