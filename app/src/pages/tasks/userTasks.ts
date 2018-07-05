import { Component } from '@angular/core';
import { NavController,IonicPage, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
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
order:string = 'title'
filter:any = {
  assigned_user:''
}
sortName:String = 'Due Date'
unique:any;
  constructor(public navCtrl: NavController, private taskService: TasksService, private datePipe:DatePipe, public actionSheetCtrl:ActionSheetController, public alertCtrl:AlertController, public modalCtrl:ModalController) {

  }
  viewTask(task){
    let taskModal = this.modalCtrl.create('CModal',task);
    taskModal.present();
    //console.log(JSON.stringify(task))
  }
  showActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title:'Sort by',
      buttons:[
        {
          text:'Due Date',
          icon:'clock',
          handler:()=>{
            //console.log('Tasks sorted by Time');
            this.sortName = 'Due Date'
            this.filter = {
              assigned_user:''
            }
            this.order='due_date'
          }
        },
        {
          text:'Project',
          icon:'briefcase',
          handler:()=>{
            this.sortName = 'Project Name'
            this.filter = {
              assigned_user:''
            }
            this.order='project'
          }
        },
        {
          text:'Assigned to me',
          icon:'contact',
          handler:()=>{
            this.sortName = 'Assigned to self'
            this.filter = {
              
              assigned_user:window.localStorage.getItem('todos_phone_number')
              // assignedUsers : {
              //   firstName:'Senura'
              // }
            }
          }
        },
        {
          text:'Assigned to others',
          icon:'contacts',
          handler:()=>{
            this.sortName = 'Assigned to others'
            let filterAlert = this.alertCtrl.create();
            filterAlert.setTitle('Select User')
            var newArr = this.removeDuplicates(this.allTasks,'assigned_user')
            //this.unique = [...new Set(this.allTasks.map(item => item.Group))];
            for(var i=0;i<newArr.length;i++){
              
              if(newArr[i].assigned_user!=window.localStorage.getItem("todos_phone_number")){
                if(newArr[i].assignedUsers!=null){
                  filterAlert.addInput({
                    type:'radio',
                    label:newArr[i].assignedUsers.firstname+' '+newArr[i].assignedUsers.lastname,
                    value:newArr[i].assigned_user
                  })
                }else{
                  filterAlert.addInput({
                    type:'radio',
                    label:newArr[i].assigned_user,
                    value:newArr[i].assigned_user
                  })
                }
                
              }
            }
            filterAlert.addButton({
              text:'Ok',
              handler:(data:any)=>{
                this.filter = {
                  assigned_user:data
                }
              }
            })
            filterAlert.present();
          }

        }
      ]
    })
    actionSheet.present();
  }
  removeDuplicates( arr, prop ) {
    let obj = {};
    return Object.keys(arr.reduce((prev, next) => {
      if(!obj[next[prop]]) obj[next[prop]] = next; 
      return obj;
    }, obj)).map((i) => obj[i]);
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
