import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
import { ParkingPage } from '../parking/parking';
import { E } from '@angular/core/src/render3';
/**
 * Generated class for the ParkingdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parkingdetail',
  templateUrl: 'parkingdetail.html',
})
export class ParkingdetailPage {
  price:any="1000";
  carnum:any="";
  incharge:any="";
  room:any="";
  destination:any="";
  firemain = firebase.database().ref();
  year:any="";
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
   newdate:any;
  type:any="";
  newtype:any="";
  id:any="";
  title:any="발렛";
  flag:any="insert";
  key:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();
    this.type = this.navParams.get("type");
    this.id=localStorage.getItem("name");
    this.price=localStorage.getItem("price");
    var content = this.navParams.get("content");
    console.log(content);
    if(content==undefined){

    }else{
    this.flag="modify";
    this.key=content.key;
    this.room=content.room;
    this.incharge=content.incharge;
    this.destination=content.destination;
    this.price=content.price;
    this.carnum=content.carnum;
    this.newtype=content.type;
    this.newdate=content.date;
    if(this.newtype=='발렛'){
      this.type=1;
    }else{
      this.type=2;
    }
    }
    console.log(this.type);
    console.log(this.newtype);
    console.log(content);
    if(this.type==1){
      this.title="발렛";
    }else if(this.type==2){
      this.title="대리";
    }else if(this.type==3){
      this.title="픽업";
    }else if(this.type==4){
      this.title="발렛";
    }else if(this.type==5){
      this.title="발렛";
    }
    console.log(date);
    console.log(date.getFullYear());
    console.log(date.getMonth()+1);
    console.log(date.getDate());
    console.log(date.getHours());
    console.log(date.getMinutes());
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkingdetailPage');
  }
  saving(v){
    console.log(v);
    console.log(this.key);
    console.log(this.incharge);
    console.log(this.room);
    console.log(this.carnum);
    console.log(this.price);
    var fulldate = this.year+"-"+this.month+"-"+this.day;
    if(this.flag=="modify"){
      if(this.type==1){
        this.firemain.child('park').child(this.newdate).child(this.key).update({"key":this.key, "receiver":this.id,"price":this.price,"date":fulldate, "time":this.hour+":"+this.min,"type":this.title,"incharge":this.incharge,"room":this.room,"carnum":this.carnum})
      }else if(this.type==2||this.type==3){
        this.firemain.child('park').child(this.newdate).child(this.key).update({"key":this.key, "receiver":this.id,"price":this.price,"date":fulldate, "time":this.hour+":"+this.min,"type":this.title,"incharge":this.incharge,"room":this.room,"destination":this.destination})
      }
      this.navCtrl.setRoot(ParkingPage)
    }else{

    var key = this.firemain.child('park').child(fulldate).push().key;
    if(this.type==1){
      this.firemain.child('park').child(fulldate).child(key).update({"key":key, "receiver":this.id,"price":this.price,"date":fulldate, "time":this.hour+":"+this.min,"type":this.title,"incharge":this.incharge,"room":this.room,"carnum":this.carnum})
    }else if(this.type==2||this.type==3){
      this.firemain.child('park').child(fulldate).child(key).update({"key":key, "receiver":this.id,"price":this.price,"date":fulldate, "time":this.hour+":"+this.min,"type":this.title,"incharge":this.incharge,"room":this.room,"destination":this.destination})
    }
    this.navCtrl.setRoot(ParkingPage)
    }
    
  }

}
