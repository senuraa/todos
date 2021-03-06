import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';
import { TasksService } from '../providers/tasks.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { DatePipe } from '@angular/common';
import { CountryPickerModule } from 'ngx-country-picker'
import { Contacts } from '@ionic-native/contacts';
import { OneSignal } from '@ionic-native/onesignal';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {
        tabsPlacement: 'top',
        platforms: {
          ios: {
            tabsPlacement: 'bottom'
          }
        }
      }
    ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CountryPickerModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    TasksService,
    DatePicker,
    DatePipe,
    Contacts,
    OneSignal
  ]
})
export class AppModule { }
