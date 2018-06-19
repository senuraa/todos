import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  subTitle: string = 'Create a Todos account and add your team members'
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  onInitButtonClick() {
    
  }
}
