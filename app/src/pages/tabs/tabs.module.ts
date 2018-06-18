import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    // CountryPickerModule.forRoot()
  ],
  exports:[
      TabsPage
  ]
})
export class TabsPageModule {}
