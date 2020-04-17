import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;


  constructor() { }

  ngOnInit() {}

}
