import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';

@IonicPage()
@Component({
  selector: 'page-userTasks',
  templateUrl: 'userTasks.html'
})
export class UserTaskPage {
allTasks: any;
user:any = {};
  constructor(public navCtrl: NavController, private taskService: TasksService) {
    this.user.phone_number = window.localStorage.getItem("phone_number");
    this.taskService.taskOfuser(this.user).then((response) => {
      this.allTasks = response;
    })
  }

  deleteTask(index, task){
    this.taskService.deleteTask(this.user).then((response) => {
      if(response){
        this.allTasks.splice(index,1);
      }
    })
  }

}
