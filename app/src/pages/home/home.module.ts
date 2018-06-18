import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    // CountryPickerModule.forRoot()
  ],
  exports:[
      HomePage
  ]
})
export class HomePageModule {}
