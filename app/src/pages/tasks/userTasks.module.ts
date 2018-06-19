import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTaskPage } from './userTasks';

@NgModule({
  declarations: [
    UserTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTaskPage),
    // CountryPickerModule.forRoot()
  ],
  exports:[
      UserTaskPage
  ]
})
export class HomePageModule {}
