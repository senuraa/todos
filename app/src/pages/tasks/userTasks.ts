import { Component } from '@angular/core';
import { NavController,IonicPage } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-userTasks',
  templateUrl: 'userTasks.html'
})
export class UserTaskPage {
allTasks: any;
user:any = {};
  constructor(public navCtrl: NavController, private taskService: TasksService, private datePipe:DatePipe) {

  }

  deleteTask(index, task){
    let data = {
      phone_number : this.user.phone_number,
      taskId : task._id,
      status : "Deleted"
    }
    this.taskService.deleteTask(data).then((response) => {
      if(response){
        this.allTasks.splice(index,1);
      }
    })
  }

  ionViewDidEnter(){
    this.user.phone_number = window.localStorage.getItem("todos_phone_number");
    this.taskService.taskOfuser(this.user).then((response) => {
      this.allTasks = response;
      for (var i = 0; i < this.allTasks.length; i++) {
        this.allTasks[i].due_date = this.datePipe.transform(this.allTasks[i].due_date,'short')
    }
    })
  }

}
