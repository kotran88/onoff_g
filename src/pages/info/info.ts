import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  mainlist:any = [];
  firemain = firebase.database().ref();
  constructor(public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.firemain.child('rooms').once('value').then((snap)=>{
      console.log(snap.val())
      for(var a in snap.val()){
        console.log("mmmm")
        for(var b in snap.val()[a]){
          console.log(snap.val()[a][b]);
          this.mainlist.push(snap.val()[a][b]);
        }
      }
    });
  }
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(EditingroomPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");
    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    console.log("ad room come");
    let modal = this.modal.create(InfomodalPage,{"room":room});
    modal.onDidDismiss(url => {
      console.log("dismiss!");
    });

    modal.present();
  }
}
