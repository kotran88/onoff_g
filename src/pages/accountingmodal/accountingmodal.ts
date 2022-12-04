import { Component } from '@angular/core';
import { IonicPage, ViewController,NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AccountingmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountingmodal',
  templateUrl: 'accountingmodal.html',
})
export class AccountingmodalPage {

  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  //return the current time in milliseconds
  getNow() {
    return new Date().getTime();
  }
  // return the current time in millise
  getTheCurrentTime() {
    return this.getNow().toString();
    //return new Date(this.getTheCurrentTime()).toString();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountingmodalPage');
  }
  cancel(){

    this.view.dismiss();
  }
}
