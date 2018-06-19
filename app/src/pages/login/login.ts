import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryPickerService, ICountry } from 'ngx-country-picker'
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public countryPickerService: CountryPickerService) {
    this.countryPickerService.getCountries().subscribe((countries: ICountry[]) => //get all country
      this.countries = countries);  // store it in countries
    this.loginForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      country:['94']
    })
  }

  login(user){
    console.log(user)
    this.navCtrl.push('VerifyPage',user)
  }
  onInitButtonClick() {
    this.loginInit = false
    this.loginDetEnter = true
    this.subTitle = 'Let\'s get started'
  }
}
