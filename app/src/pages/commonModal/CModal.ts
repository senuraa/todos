import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController, NavParams } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { Contacts } from '@ionic-native/contacts';

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
  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController,private datePipe:DatePipe, public navParams:NavParams) {
    //console.log(navParams.get('title'))
    //this.taskData = navParams.get('myform')
    this.myform = new FormGroup({
      title: new FormControl(navParams.get('title'), Validators.required),
      description: new FormControl(navParams.get('description'), Validators.required),
      project: new FormControl(navParams.get('project'), Validators.required),
      assigned_to: new FormControl(navParams.get('assigned_user'), Validators.required),
      status: new FormControl(navParams.get('status'), Validators.required),
      date: new FormControl(navParams.get('date')),
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
    console.log('Date-->'+this.navParams.get('due_date'))
    this.myform = new FormGroup({
      title: new FormControl(this.navParams.get('title'), Validators.required),
      description: new FormControl(this.navParams.get('description'), Validators.required),
      project: new FormControl(this.navParams.get('project'), Validators.required),
      assigned_to: new FormControl(this.navParams.get('assigned_user'), Validators.required),
      status: new FormControl(this.navParams.get('status'), Validators.required),
      date: new FormControl(this.navParams.get('due_date')),
      //self: new FormControl(navParams.get('self'))
    });
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
