import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { Contacts } from '@ionic-native/contacts';
import * as moment from 'moment';
@IonicPage()
@Component({
  selector: 'page-CModal',
  templateUrl: 'CModal.html',
  providers: [Contacts]
})
export class CModal {
  myform: FormGroup;
  user: any;
  status = ["Pending", "Close", "Open"];
  taskData:any;
  dDate: any;
  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController,private datePipe:DatePipe, public navParams:NavParams) {
    this.dDate = navParams.get('due_date')

    //var due_date = moment(date).format('YYYY-MM-DD HH:mm:ss')
    //this.taskData = navParams.get('myform')
    this.myform = new FormGroup({
      title: new FormControl(navParams.get('title'), Validators.required),
      description: new FormControl(navParams.get('description'), Validators.required),
      project: new FormControl(navParams.get('project'), Validators.required),
      assigned_to: new FormControl(navParams.get('assigned_user'), Validators.required),
      status: new FormControl(navParams.get('status'), Validators.required),
      date: new FormControl(),
      //self: new FormControl(navParams.get('self'))
    });

    // this.contacts.find(["*"], {filter: "", multiple: true, hasPhoneNumber:true})
    // .then((data) => {
    //   console.log("here" +data);
    // }, err => {
    //   console.log("here" +err);
    // });

    this.user = window.localStorage.getItem("todos_phone_number");
  }
  ionViewDidLoad(){
    this.myform.patchValue({
      date:moment(this.navParams.get('due_date')).format()
    })
  }
  updateTask(){
    let data = {
      formValues:this.myform.value,
      id:this.navParams.get('_id')
    }
    this.taskService.updateTask(data).then((response)=>{
      if(response){
        this.viewCtrl.dismiss();
      }
    })
  }
  showDateTimePicker(event) {
    this.datePicker.show({
      date: new Date(this.navParams.get('due_date')),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        if (date != undefined) {
          event._native.nativeElement.value = this.datePipe.transform(date,'short')
          this.myform.value.date = event._native.nativeElement.value;
        }

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  addNewTask() {
    let data = {
      formValues: this.myform.value,
      phone_number: this.user
    }
    this.taskService.addTasks(data).then((response) => {
      console.log(response);
      if (response) {
        this.viewCtrl.dismiss();
      } else {
        var smsData = {
          phoneNumber: this.myform.value.assigned_to,
          message: 'A task has been assigned to you on Todos. Download the Todos app to see your tasks. http://todos.com'
        }
        this.taskService.sendTaskSMS(smsData).then((res) => {
          this.viewCtrl.dismiss();
        })
        this.viewCtrl.dismiss();
      }
    })
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
