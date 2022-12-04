import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the InfomodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-infomodal',
  templateUrl: 'infomodal.html',
})
export class InfomodalPage {
  wt:any="";
  incharge:any="";
  in:any="";
  room:any;
  firemain = firebase.database().ref();
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
   this.room= this.navParams.get("room");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfomodalPage');
  }

  cancel(){

    this.view.dismiss();
  }
  confirm(){

    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    var fulldate = year+"-"+month+"-"+day;
    var key = this.firemain.child('rooms').child(fulldate).push().key;
    this.firemain.child("rooms").child(fulldate).child(key).update({"status":"reserved", "incharge":this.incharge,"in":this.in,"wt":this.wt,"room":this.room,"insert_date":hour+":"+min,"key":key,"date":fulldate})
    this.view.dismiss();
  }
}
