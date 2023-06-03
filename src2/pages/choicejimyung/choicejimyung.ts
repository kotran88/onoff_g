import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import  firebase from 'firebase';
/**
 * Generated class for the ChoicejimyungPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicejimyung',
  templateUrl: 'choicejimyung.html',
})
export class ChoicejimyungPage {
  room:any="";
  incharge:any="";
  company:any="";
  firemain = firebase.database().ref();
  agasi:any="";
  currentstartday:any;
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");
    console.log(this.company);

    this.currentstartday=localStorage.getItem("startDate");
    console.log("jimyung come...");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicejimyungPage');
  }
  confirm(){
    console.log("confirm jimyung...")
    console.log(this.room);
    console.log(this.incharge);
    console.log(this.agasi);

    var key = this.firemain.child("company").child(this.company).push().key;
    console.log(key);
    var counting=0;
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).once('value').then((snap)=>{
      

      for(var a in snap.val()){
        console.log(snap.val()[a]);
        console.log("looping...")
        counting++;
        console.log("looping count : "+counting);
        this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(key).update({"v":counting, "room":this.room,"key":key, "incharge":this.incharge,"agasi":this.agasi}).then(()=>{
          console.log("ok");
        }).catch((e)=>{
          console.log(e);
        })
      }

     
    });
    console.log("counting...value : "+counting);
    if(counting==0){
      this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(key).update({"v":1, "room":this.room,"key":key, "incharge":this.incharge,"agasi":this.agasi}).then(()=>{
        console.log("ok");
      }).catch((e)=>{
        console.log(e);
      })
    }
    
    this.view.dismiss();
  }
  cancel(){
    this.view.dismiss();
  }
}
