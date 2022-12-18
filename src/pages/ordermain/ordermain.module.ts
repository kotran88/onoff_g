import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdermainPage } from './ordermain';

@NgModule({
  declarations: [
    OrdermainPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdermainPage),
  ],
})
export class OrdermainPageModule {}
