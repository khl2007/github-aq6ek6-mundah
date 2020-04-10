import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyprofilePage } from './myprofile.page';

const routes: Routes = [
  {
    path: '',
    component: MyprofilePage
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyprofilePageRoutingModule {}
