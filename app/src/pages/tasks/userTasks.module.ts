import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTaskPage } from './userTasks';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
@NgModule({
  declarations: [
    UserTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(UserTaskPage),
    OrderModule,
    FilterPipeModule
    // CountryPickerModule.forRoot()
  ],
  exports: [
    UserTaskPage
  ]
})
export class HomePageModule { }
