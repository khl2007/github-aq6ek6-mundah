import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomeResolver } from './home.resolver';

import { CommentsComponent } from '../comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      data: HomeResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [CommentsComponent],
  declarations: [HomePage , CommentsComponent],
  entryComponents: [CommentsComponent],
  providers: [
    HomeResolver
  ]
})
export class HomePageModule {}
