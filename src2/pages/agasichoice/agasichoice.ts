import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AgasichoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agasichoice',
  templateUrl: 'agasichoice.html',
})
export class AgasichoicePage {
  b:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
    this.b.push("aaa")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgasichoicePage');
  }

}
