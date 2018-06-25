import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthService) {

  }
  user: any = {
    firstname: this.navParams.get('firstname'),
    lastname: this.navParams.get('lastname'),
    phone_number: this.navParams.get('phone_number'),
    country_code: this.navParams.get('country_code'),
    token: ''
  }
  verify(){
    this.authService.verifyToken(this.user).then((response)=>{
      console.log(response)
      window.localStorage.setItem('todos_phone_number', this.user.country_code+''+this.user.phone_number);
      this.navCtrl.push('TabsPage');
    },(err)=>{
      console.log(err)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

}
