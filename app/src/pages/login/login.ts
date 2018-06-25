import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryPickerService, ICountry } from 'ngx-country-picker';
import { AuthService } from '../../providers/auth.service'
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
  loginInit: boolean = true
  loginDetEnter: boolean = false
  loginForm: FormGroup;
  subTitle: string = 'Create a Todos account and add your team members'
  country: any;
  countries: ICountry[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public countryPickerService: CountryPickerService, public authService: AuthService, public loadingCtrl:LoadingController) {
    this.countryPickerService.getCountries().subscribe((countries: ICountry[]) => //get all country
      this.countries = countries);  // store it in countries
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      country_code: ['94']
    })
  }

  login(user) {
    console.log(user)
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    //this.navCtrl.push('VerifyPage', user)
    this.authService.receiveSMS(user).then((response)=>{
      console.log(response)
      this.navCtrl.push('VerifyPage', user)
      loading.dismiss();
    },(err)=>{
      console.log(err)
      loading.dismiss();
    }
  )
    
  }
  onInitButtonClick() {
    this.loginInit = false
    this.loginDetEnter = true
    this.subTitle = 'Let\'s get started'
  }
}
