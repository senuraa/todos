import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from './constants'
/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: HttpClient) {
      
  }

  receiveSMS(contact) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_REGISTER, contact)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  verifyToken(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_VERIFY, userData)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  
}
