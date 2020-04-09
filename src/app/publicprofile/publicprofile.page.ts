import { Component, OnInit } from '@angular/core';

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
  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
If (this.route.snapshot.params['buserid']){

this.userid = this.route.snapshot.params['buserid'];

console.log(this.userid);

} 
    

//getUserInfo

  }

}
