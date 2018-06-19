import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';

@IonicPage()
@Component({
  selector: 'page-addTask',
  templateUrl: 'addTask.html'
})
export class AddTask {
  myform: FormGroup;
  user: any;
  status = ["Pending", "Close", "Open"];
  
  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController) {
    this.myform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      assigned_to: new FormControl('', Validators.required),
      status: new FormControl('Pending', Validators.required),
      date: new FormControl('')
    });

    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
    this.user = window.localStorage.getItem("phone_number");
  }

  addNewTask() {
    let data = {
      formValues : this.myform.value,
      phone_number : this.user
    }
    this.taskService.addTasks(data).then((response) => {

    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
