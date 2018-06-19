import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import {CountryPickerService} from 'ngx-country-picker'
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage)
  ],
  providers:[
    // CountryPickerService
  ]
})
export class LoginPageModule { }
