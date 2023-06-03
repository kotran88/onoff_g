import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SearchchoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-searchchoice',
  templateUrl: 'searchchoice.html',
})
export class SearchchoicePage {
  selected:any="1";
  inputtext:any="";
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
  }
  searching(){
    console.log(this.selected);
    console.log(this.inputtext);
    this.view.dismiss({"result":"cancel","selected":this.selected,"inputtext":this.inputtext})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchchoicePage');
    
  }
  cancel(){
    this.navCtrl.pop();
  }
}
