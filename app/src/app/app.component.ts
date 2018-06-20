import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();

      splashScreen.hide();
      this.checkPreviousAuth();
    });
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
