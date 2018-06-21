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
export class TasksService {

  constructor(public http: HttpClient) {

  }

  taskOfuser(contact) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_TASKOFUSER, contact)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  upcommingTasks(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_UPCOMMINGTASK, userData)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  addTasks(taskData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_ADDTASK, taskData)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  changeStatus(task) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_CHANGESTATUS, task)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  sendTaskSMS(smsData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_SENDSMS, smsData)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          })
    })
  }

  deleteTask(task) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_DELETETASK, task)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          })
    })
  }

  updateTask(task) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_UPDATETASK, task)
        .subscribe(data => {
          resolve(data)
        },
          err => {
            reject(err);
          })
    })
  }

}
