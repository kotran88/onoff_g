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
  numofpeople:any="";
  currentstartday:any="";
  currentstart:any="";
  room:any;
  company:any;
  firemain = firebase.database().ref();
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
   this.room= this.navParams.get("room");
   this.company = localStorage.getItem("company");
   this.currentstart=localStorage.getItem("start");
   this.currentstartday=localStorage.getItem("startDate");
   console.log(this.currentstart);
   console.log(this.currentstartday);
   console.log("room",this.room);
   console.log(this.company)
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

    var dte = new Date();
    dte.setHours(dte.getHours()+9);
    var fulldate = year+"-"+month+"-"+day;
    var key = this.firemain.child('rooms').child(fulldate).push().key;
    // this.firemain.child("rooms").child(fulldate).child(key).update({"status":"reserved", "incharge":this.incharge,"in":this.in,"wt":this.wt,"room":this.room,"insert_date":hour+":"+min,"key":key,"date":fulldate})
    this.firemain.child("company").child(this.company).child("roomlist").child(this.room.name).child("roomhistory").child(this.currentstartday).child(key).update({"name":this.room.name,"status":"reserved", "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte, "key":key,"date":fulldate})
    
    
    // this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
    //   console.log(snap.val());
    //   for(var a in snap.val()){
    //     console.log(snap.val()[a].name);
    //     console.log(this.room.name);
    //     if(snap.val()[a].name == this.room.name){
    //       console.log("같다");
    //       console.log(this.room.name);
    //       console.log(snap.val()[a].name);
    //          }
    //   }
    // });
   
    this.view.dismiss();
  }
}
