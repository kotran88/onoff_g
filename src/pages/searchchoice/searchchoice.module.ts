import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchchoicePage } from './searchchoice';

@NgModule({
  declarations: [
    SearchchoicePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchchoicePage),
  ],
})
export class SearchchoicePageModule {}
