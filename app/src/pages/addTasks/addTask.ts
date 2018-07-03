import { Component } from '@angular/core';
import { NavController, IonicPage, ViewController } from 'ionic-angular';
import { TasksService } from '../../providers/tasks.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

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
 // self:boolean=true;

  constructor(public navCtrl: NavController, public taskService: TasksService, private datePicker: DatePicker, public viewCtrl: ViewController, private datePipe: DatePipe, private contacts: Contacts, private alertCtrl: AlertController, public authService: AuthService) {

    this.myform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      assigned_to: new FormControl('', Validators.required),
      status: new FormControl('Pending', Validators.required),
      date: new FormControl(''),
      self: new FormControl(false)
    });


  }
  ionViewDidLoad() {

    this.contacts.find(['displayName', 'phoneNumbers'], { filter: "", multiple: true, hasPhoneNumber: true })
      .then((data) => {
        //console.log("contact_data - "+data)
        for (var i = 0; i < data.length; i++) {
          // console.log("contact_data - "+JSON.stringify(data[i]))
          this.contactList.push({

            name: data[i]['_objectInstance'].name.givenName,
            phone: data[i]['_objectInstance'].phoneNumbers
          })
        }
      }, err => {
        console.log("contact " + err);
      });

    this.user = window.localStorage.getItem("todos_phone_number");
    console.log(this.user)
  }
  showDateTimePicker(event) {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        if (date != undefined) {
          event.target.value = this.datePipe.transform(date, 'short')
          this.myform.value.date = event.target.value;
        }

      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  addNewTask() {
    if(this.myform.value.self){
      this.myform.value.assigned_to=window.localStorage.getItem('todos_phone_number')
    }else{
      this.myform.value.assigned_to = this.myform.value.assigned_to.replace(/ /g, '').replace(/-/g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "")
    }
    //this.myform.value.assigned_to = this.myform.value.assigned_to.replace(/ /g, '').replace(/-/g, '').replace(/\(/g, "").replace(/\)/g, "").replace(/\+/g, "")
    console.log(JSON.stringify(this.myform.value))
    let data = {
      formValues: this.myform.value,
      phone_number: this.user
    }
    this.taskService.addTasks(data).then((response) => {
      if (response) {
        this.sendNotification(this.myform.value.assigned_to, 'A new task has been added')
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

  onInput(searchTerm: any) {
    this.contactListFiltered = [];
    //console.log('onInput - '+JSON.stringify(this.contactList))

    //console.log('searchTerm - '+JSON.stringify(searchTerm,['message','arguments','type','name']))
    //console.log('Searchterm val = ' + searchTerm.target.value)
    if (searchTerm.target.value && searchTerm.target.value.trim() !== '' && this.contactList.length != 0) {
      this.contactList.filter((item) => {
        //console.log('onInput - ' + JSON.stringify(item))
        if (item.name != undefined) {

          if (item.name.toLowerCase().includes(searchTerm.target.value.toLowerCase())) {
            this.contactListFiltered.push(item);
          }
        }
      });
    }
  }

  fillBox(conFil) {
    if (conFil.phone.length > 1) {
      this.showRadioAlert(conFil.phone);
    } else if (conFil.phone.length == 1) {
      this.myform.controls["assigned_to"].setValue(conFil.phone[0].value.replace(/[^0-9]/ig, ''))
    } else {
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
    for (var i = 0; i < phoneNumbers.length; i++) {
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
  sendNotification(phone_number, msg) {
    var resp;
    var player_ids = [];
    var userData = {
      phone_number: phone_number
    }
    this.authService.getPlayerId(userData).then((response) => {
      resp = response;
      player_ids = resp.player_ids;
      //console.log('player_id ->' + JSON.stringify(player_ids))
      var notificationObj = {
        contents: { en: msg },
        include_player_ids: player_ids
      }
      //console.log('data' + JSON.stringify(notificationObj))
      window["plugins"].OneSignal.postNotification(notificationObj,
        function (successResponse) {
          //console.log("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
          //console.log("Notification Post Failed: ", failedResponse);
          //alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        });
    })

    // console.log('data'+JSON.stringify(notificationObj))
    // window["plugins"].OneSignal.postNotification(notificationObj,
    //   function(successResponse) {
    //     console.log("Notification Post Success:", successResponse);
    //   },
    //   function (failedResponse) {
    //     console.log("Notification Post Failed: ", failedResponse);
    //     alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
    //   }
    // );
  }

}
