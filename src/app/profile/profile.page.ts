import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
currentUsser: any;
  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
	private firebaseService: FirebaseService) { }

  ngOnInit() {
	  //this.currentUsser = this.firebaseService.getcurrentUser();
	 // console.log(this.currentUsser);

  }

}
