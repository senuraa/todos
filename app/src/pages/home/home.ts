import { Component } from '@angular/core';
import { NavController,IonicPage,ModalController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
upcommingTasks : any;
user: any;
  constructor(public navCtrl: NavController, public taskService: TasksService, public modalCtrl: ModalController) {
    this.user = window.localStorage.getItem("phone_number");
    let data = {
      phone_number : this.user,
      status : "Pending"
    }
    this.taskService.upcommingTasks(data).then((response) => {
      this.upcommingTasks = response;
    })
  }

  changeStatus(){
    let status = "completed";
    this.taskService.changeStatus(status).then((response) => {
      this.upcommingTasks = response;
    })
  }

  addNewTask(){
      const modal = this.modalCtrl.create('AddTask', { user: this.user });
      modal.present();
      modal.onDidDismiss(data => {
        console.log(data);
      });
  }



}
