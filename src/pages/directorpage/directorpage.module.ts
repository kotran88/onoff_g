import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectorpagePage } from './directorpage';

@NgModule({
  declarations: [
    DirectorpagePage,
  ],
  imports: [
    IonicPageModule.forChild(DirectorpagePage),
  ],
})
export class DirectorpagePageModule {}
