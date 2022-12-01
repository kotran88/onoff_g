import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  constructor(public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }

}
