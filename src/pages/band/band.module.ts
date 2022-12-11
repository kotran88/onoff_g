import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BandPage } from './band';

@NgModule({
  declarations: [
    BandPage,
  ],
  imports: [
    IonicPageModule.forChild(BandPage),
  ],
})
export class BandPageModule {}
