import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular'
import { UserTaskPage } from '../tasks/userTasks';


@IonicPage()

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'UserTaskPage';

  constructor() {

  }
}
