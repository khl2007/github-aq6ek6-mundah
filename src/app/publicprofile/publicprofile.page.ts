import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

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
userinfo : any;
userposts : any;
  constructor(private route: ActivatedRoute,private router: Router , private firebaseService: FirebaseService) { }

  ngOnInit() {
if(this.route.snapshot.params['buserid']){

this.userid = this.route.snapshot.params['buserid'];

console.log(this.userid);
this.getuserdata();

}

    

//getUserInfo

  }

   getuserdata(userid){

this.firebaseService.getUserInfo(userid).valueChanges().subscribe(res => {
        this.userinfo = res;
      });

console.log(this.userinfo);

   }

}
