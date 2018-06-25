import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { AlertController } from 'ionic-angular';

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
  contactList: { name: any, phone: any }[] = [];
  contactListFiltered: any;

  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController, private datePipe: DatePipe, private contacts: Contacts, private alertCtrl: AlertController) {

    this.myform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      assigned_to: new FormControl('', Validators.required),
      status: new FormControl('Pending', Validators.required),
      date: new FormControl('')
    });

    this.contacts.find(['displayName', 'phoneNumbers'], { filter: "", multiple: true, hasPhoneNumber: true })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          this.contactList.push({
            name : data[i]['_objectInstance'].name.givenName,
            phone : data[i]['_objectInstance'].phoneNumbers
          })
        }
      }, err => {
        console.log("contact " + err);
      });

    this.user = window.localStorage.getItem("todos_phone_number");
  }

  showDateTimePicker(event) {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        if (date != undefined) {
          event.target.value = this.datePipe.transform(date,'short')
          this.myform.value.date = event.target.value;
        }

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  addNewTask() {

    console.log(JSON.stringify(this.myform.value))
    let data = {
      formValues: this.myform.value,
      phone_number: this.user
    }
    this.taskService.addTasks(data).then((response) => {
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

  onInput(searchTerm) {
    this.contactListFiltered = [];
    if (searchTerm.target.value && searchTerm.target.value.trim() != '') {
      this.contactList.filter((item) => {
        if (item.name.toLowerCase().indexOf(searchTerm.target.value.toLowerCase()) > -1) {
          this.contactListFiltered.push(item);
        }
      });
    }
  }

  fillBox(conFil) {
    if(conFil.phone.length > 1){
      this.showRadioAlert(conFil.phone);
    }else if(conFil.phone.length == 1){
      this.myform.controls["assigned_to"].setValue(conFil.phone[0].value)
    }else{
      console.log("no contacts ")
    }
    // this.myform.value.assigned_to = conFil;
    this.contactListFiltered = null;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showRadioAlert(phoneNumbers) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Phone Number');
    for(var i=0; i < phoneNumbers.length; i++){
      alert.addInput({
        type: 'radio',
        label: phoneNumbers[i].value,
        value: phoneNumbers[i].value,
        checked: false
      });
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.myform.controls["assigned_to"].setValue(data);
      }
    });
    alert.present();
  }


}
