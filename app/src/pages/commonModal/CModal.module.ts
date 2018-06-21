import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CModal } from './CModal';

@NgModule({
  declarations: [
    CModal,
  ],
  imports: [
    IonicPageModule.forChild(CModal),
    // CountryPickerModule.forRoot()
  ],
  exports:[
    CModal
  ]
})
export class CModalPageModule {}
