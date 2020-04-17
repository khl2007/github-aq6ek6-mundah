import { Component, OnInit , Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

comment : any;

  constructor(public moCtrl: ModalController,) { }

  ngOnInit() {}

 dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.moCtrl.dismiss({
      'dismissed': true
    });
  }

}
