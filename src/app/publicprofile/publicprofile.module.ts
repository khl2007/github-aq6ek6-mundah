import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicprofilePageRoutingModule } from './publicprofile-routing.module';

import { PublicprofilePage } from './publicprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicprofilePageRoutingModule
  ],
  declarations: [PublicprofilePage]
})
export class PublicprofilePageModule {}
