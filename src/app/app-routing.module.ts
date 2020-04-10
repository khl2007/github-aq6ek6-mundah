import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  {
    path: "details/:blogrefid",
    loadChildren: "./details/details.module#DetailsPageModule"
  },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "new-task",
    loadChildren: "./new-task/new-task.module#NewTaskPageModule"
  },
  {
    path: "publicprofile/:buserid",
    loadChildren: "./publicprofile/publicprofile.module#PublicprofilePageModule"
  },
  {
    path: "profile",
    loadChildren: "./profile/profile.module#ProfilePageModule"
  },
  {
    path: "chats",
    loadChildren: "./chats/chats.module#ChatsPageModule"
  },
  {
    path: "course",
    loadChildren: "./course/course.module#CoursePageModule"
  },
 {
    path: "welcome",
    loadChildren: "./welcome/welcome.module#WelcomePageModule"
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  // { path: 'new-task-modal', loadChildren: './new-task-modal/new-task-modal.module#NewTaskModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
