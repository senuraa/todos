import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTask } from './addTask';

@NgModule({
  declarations: [
    AddTask,
  ],
  imports: [
    IonicPageModule.forChild(AddTask),
    // CountryPickerModule.forRoot()
  ],
  exports:[
    AddTask
  ]
})
export class AddTaskPageModule {}
