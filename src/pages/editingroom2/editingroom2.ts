import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the Editingroom2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editingroom2',
  templateUrl: 'editingroom2.html',
})
export class Editingroom2Page {
  a:any;
  jopan:any;
  agasiname:any="";
  id:any;
  room:any;
  incharge:any;
  team:any="";
  insert_date:any;
  midroom:any=[];
  smallroom:any=[];
  bigroom:any=[];
  allroom:any=[];
  thisisarray:any=[];
  newarray:any=[];
  newarrayfin:any=[];
  status:any="entered"
  wt:any;
  key:any;
  numofpeople:any="";
  currentstartday:any="";
  currentstart:any="";
  end_date:any="";
  bu:any="";
  name:any;
  date:any;
  firemain = firebase.database().ref();
  company:any;
  avec:any;
  logic:any=0;
  directorList:any=[];
  mainlist_finished=[];
  mainlist=[];
  booleanValue3:any=false;
  nomemo:any="";
  rnumber=0;
  firststatus:any=false;
  constructor(public util:UtilsProvider, public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
    
     this.mainlist= this.navParams.get("mainlist");
      this.mainlist_finished= this.navParams.get("mainlist_finished");

      var orderedQuery = this.firemain.child("users").orderByChild("type");
      orderedQuery.once("value", (snapshot) => {
       snapshot.forEach((childSnapshot) => {
         var childData = childSnapshot.val();
          this.directorList.push(childData);
       })
  
      });

    //  this.directorList=JSON.parse(localStorage.getItem("director"))

     console.log(this.directorList);
     this.company = localStorage.getItem("company");
     this.name = localStorage.getItem("name");
     this.currentstart=localStorage.getItem("start");
     this.currentstartday=localStorage.getItem("startDate");
      this.allroom = this.navParams.get("allroom");
      if(this.a.noflag==undefined){

      this.booleanValue3=false;
      }else{

      this.booleanValue3=this.a.noflag;
      }
      this.firststatus = this.booleanValue3;
      this.nomemo=this.a.nomemo;
    console.log(this.a);
    this.agasiname = this.a.name;

    console.log(this.firststatus);
    this.room = this.a.name
    this.rnumber=this.room;
    this.bu=this.a.bu;
    this.avec = this.a.avec;
    this.logic = this.a.logic;
    this.key=this.a.key;
    this.status = this.a.status;
    window.alert(this.status);
    this.date=this.a.date;
    this.numofpeople = this.a.numofpeople;
    // this.end_date=this.a.end_date;
    this.incharge=this.a.incharge;
    this.wt=this.a.wt;
    this.insert_date=this.a.insert_date;

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditingroomPage');
  }
  clickforlogic(v){

    //console.log("v is "+v);
    if(v==0){
      this.logic=1;
    }
    if(v==1){
      this.logic=2;
    }
    if(v==2){
      this.logic=0;
    }
  }
  clicking2(v){
    if(this.booleanValue3){
      window.alert("변경불가");
      return;
    }
    //console.log(v);
    //console.log(v.avec);
    //console.log(this.avec);
    if(v.avec==true){
      //console.log("make it false")
      this.avec=!this.avec;
    }else{
      this.avec=!this.avec;
    }
  }
  clicking(v){
    if(this.booleanValue3){
      window.alert("변경불가");
      return;
    }
    if(v==1){
      this.status="standby";
    }
    if(v==2){
      this.status="gotohome";
    }
    if(v==3){
      this.status="attend";
    }
  }

  clicking3(v){

    //console.log("clicking3..."+v)
    if(v==0){
      this.bu=1;
    }
    if(v==1){
      this.bu=2;
    }
    if(v==2){
      this.bu=0;
    }
  }
    myChange3(v){
    console.log(v.checked);
    this.booleanValue3=v.checked;
    console.log(this.booleanValue3)
    if(this.booleanValue3){

    }else{
      this.nomemo="";
    }
  }

  cancel(){

    this.view.dismiss({"result":true});
  }
  addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }
  confirm(){
    console.log(this.a);
   
    this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.a.name).child("attend").update({"flag":this.status})
      

    this.view.dismiss({"result":false});
  }

}