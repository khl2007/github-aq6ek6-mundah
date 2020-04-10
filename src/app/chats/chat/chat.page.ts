import { Component, OnInit , ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

import { Animation, AnimationController } from '@ionic/angular';

import { IonInfiniteScroll } from '@ionic/angular';

import { Observable } from "rxjs";

import { map } from "rxjs/operators";


import { FirebaseService } from "../../services/firebase.service";
import { Blogitem } from "../../services/blogitem";

import { User } from "../../services/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

chats: any;
userid : any;
  constructor(public loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private animationCtrl: AnimationController) { }

  ngOnInit() {

     if(this.route.snapshot.params['userid']){

       this.userid = this.route.snapshot.params['userid'];

        console.log(this.userid);
        this.getuserdata(this.userid);

         this.firebaseService.getChats().subscribe(res => {
         console.log(res);
         this.chats = res;
          }); 

           }


    
  }

initChat() {
   
  }

 
}
