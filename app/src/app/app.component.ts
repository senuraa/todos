import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
    

      this.checkPreviousAuth();

      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        if (jsonData.notification.payload.additionalData != null) {
          console.log("Here we access addtional data");
          if (jsonData.notification.payload.additionalData.openURL != null) {
            console.log("Here we access the openURL sent in the notification data");
  
          }
        }
      };
      window["plugins"].OneSignal
      .startInit("eb59933c-df94-4e1c-a3f1-121f8a44a75a","506992130936")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
     
      // if(plt.is('cordova')){
      //   this.oneSignal.startInit("eb59933c-df94-4e1c-a3f1-121f8a44a75a","506992130936")
      //   //.iOSSettings() // only needed if added Optional OneSignal code for iOS above
      //   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)
      //   this.oneSignal.handleNotificationOpened().subscribe(()=>{
  
      //   })
      //   this.oneSignal.endInit();
      //   this.oneSignal.getIds().then((ids)=>{
      //     console.log('ids - '+JSON.stringify(ids))
      //   })
      // }
    });
   

      
    // oneSignal.getIds().then((id)=>{
    //   this.authService.addPlayerId({phone_number:window.localStorage.getItem('todos_phone_number'),player_id:id}).then((response)=>{
    //     console.log(response)
    //   },
    //   (err)=>{
    //     console.log(err)
    //   }
    // )
    // })
  }


  checkPreviousAuth(): void {
    if ((window.localStorage.getItem('todos_phone_number') === "undefined" || window.localStorage.getItem('todos_phone_number') === null) &&
      (window.localStorage.getItem('todos_password') === "undefined" || window.localStorage.getItem('todos_password') === null)) {
      this.rootPage = 'LoginPage';
    } else {
      this.rootPage = "TabsPage";
    }
  }
}
