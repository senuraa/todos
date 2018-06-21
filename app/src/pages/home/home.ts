import { Component } from '@angular/core';
import { NavController,IonicPage,ModalController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
upcommingTasks : any;
user: any;
response:any = [];
todayDate = new Date();
  constructor(public navCtrl: NavController, public taskService: TasksService, public modalCtrl: ModalController, private datePipe:DatePipe) {
    // this.user = window.localStorage.getItem("phone_number");
    // let data = {
    //   phone_number : this.user,
    //   status : "Pending"
    // }
    // this.taskService.upcommingTasks(data).then((resp) => {
    //   this.response = resp;
    //   for (var i = 0; i < this.response.length; i++) {
    //     if (this.todayDate < new Date(this.response[i].due_date)) {
    //       this.response[i].condition = 'upcoming'
    //     } else {
    //       this.response[i].condition = 'overdue'
    //     }
    // }
    //   this.upcommingTasks = this.response;
    //   console.log(this.response)
    // })
  }

  changeStatus(index,task){
    task.status = "Close";
    this.taskService.changeStatus(task).then((res) => {
      if(res){
        this.upcommingTasks.splice(index,1);
      }
    })
  }

  addNewTask(){
      const modal = this.modalCtrl.create('AddTask', { user: this.user });
      modal.present();
      modal.onDidDismiss(closedata => {
        let data = {
          phone_number : this.user,
          status : "Pending"
        }
        this.taskService.upcommingTasks(data).then((resp) => {
          this.response = resp;
          for (var i = 0; i < this.response.length; i++) {
            if (this.todayDate < new Date(this.response[i].due_date)) {
              this.response[i].condition = 'upcoming'
            } else {
              this.response[i].condition = 'overdue'
            }
            this.response[i].due_date = this.datePipe.transform(this.response[i].due_date,'short')
        }
          this.upcommingTasks = this.response;
        })
      });
  }

  ionViewDidEnter(){
    this.user = window.localStorage.getItem("todos_phone_number");
    let data = {
      phone_number : this.user,
      status : "Pending"
    }
    this.taskService.upcommingTasks(data).then((resp) => {
      this.response = resp;
      for (var i = 0; i < this.response.length; i++) {
        if (this.todayDate < new Date(this.response[i].due_date)) {
          this.response[i].condition = 'upcoming'
        } else {
          this.response[i].condition = 'overdue'
        }
        this.response[i].due_date = this.datePipe.transform(this.response[i].due_date,'short')
    }
      this.upcommingTasks = this.response;
    })
  }

}
