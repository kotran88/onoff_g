import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
/**
 * Generated class for the EditingroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editingroom',
  templateUrl: 'editingroom.html',
})
export class EditingroomPage {
  a:any;
  room:any;
  incharge:any;
  insert_date:any;
  status:any;
  wt:any;
  key:any;
  numofpeople:any;
  end_date:any;
  date:any;
  firemain = firebase.database().ref();
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
    console.log(this.a+"///"+this.a.room);
    this.room = this.a.room
    this.key=this.a.key;
    this.status = this.a.status;
    this.date=this.a.date;
    this.incharge=this.a.incharge;
    this.wt=this.a.wt;
    this.insert_date=this.a.insert_date;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditingroomPage');
  }
  cancel(){

    this.view.dismiss();
  }
  confirm(){
    this.firemain.child("rooms").child(this.date).child(this.key).update({
      "room":this.room,
      "wt":this.wt,
      "insert_date":this.insert_date,
      "end_date":this.end_date,
      "status":this.status,
      "numofpeople":this.numofpeople,
      "incharge":this.incharge,
    })
    this.view.dismiss();
  }
}
