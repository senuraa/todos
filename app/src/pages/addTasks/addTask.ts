import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { Contacts } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-addTask',
  templateUrl: 'addTask.html',
  providers: [Contacts]
})
export class AddTask {
  myform: FormGroup;
  user: any;
  status = ["Pending", "Close", "Open"];

  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController,private datePipe:DatePipe, private contacts: Contacts) {
  
    this.myform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      assigned_to: new FormControl('', Validators.required),
      status: new FormControl('Pending', Validators.required),
      date: new FormControl('')
    });

    // this.contacts.find(["*"], {filter: "", multiple: true, hasPhoneNumber:true})
    // .then((data) => {
    //   console.log("here" +data);
    // }, err => {
    //   console.log("here" +err);
    // });

    this.user = window.localStorage.getItem("todos_phone_number");
  }

  showDateTimePicker(event) {
    console.log(event)
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        if (date != undefined) {
          this.myform.value.date= this.datePipe.transform(date,'short');
          event.target.value = this.myform.value.date;
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
