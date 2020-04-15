import { Component, OnInit , ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

import { Animation, AnimationController } from '@ionic/angular';

import { IonInfiniteScroll } from '@ionic/angular';

import { Observable } from "rxjs";

import { map } from "rxjs/operators";

import { FirebaseService } from "../services/firebase.service";
import { Blogitem } from "../services/blogitem";

import { User } from "../services/user";
import { Userfriends } from "../services/userfriends";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

friends: any;

  constructor(public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private animationCtrl: AnimationController) {
 this.initUsers();
     }

  ngOnInit() {

   
  }
 initUsers(){
 this.firebaseService.InitChatfri().subscribe(res => {
      console.log('hi',res);
    this.friends= res;
    }); 

 }
 
}
