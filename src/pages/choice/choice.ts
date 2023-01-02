import { Component,NgZone } from '@angular/core';
import { IonicPage,ViewController,ModalController, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { GongjiPage } from '../gongji/gongji';
/**
 * Generated class for the ChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
import { AgasichoicePage } from '../agasichoice/agasichoice';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  currentstartday:any="";
  currentstart:any="";
  mainlist_finished:any = [];
  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  company:any="";
  constructor(public menuCtrl: MenuController ,public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');

    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        if(snap.val()[a].roomhistory!=undefined){
          console.log(snap.val()[a].roomhistory[this.currentstartday])
          for(var b in snap.val()[a].roomhistory[this.currentstartday]){
            console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
            console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
            if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
              this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
            }else{
              this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
            }
            
          }
        }
        
      }
      console.log(this.mainlist)
    });
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
  }
  gotodetail(a){
    console.log("gotodetail...")
    console.log(a);
    let modal = this.modal.create(ChoicemodalPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
      this.mainlist=[];
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        console.log(snap.val())
        for(var a in snap.val()){
          console.log("mmmm")
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory);
            console.log(snap.val()[a].roomhistory[this.currentstartday]);
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
              if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              }else{
                this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              }
              
            }
          }
          
        }
        console.log(this.mainlist)
      });
      //regenerate  
    });

    modal.present();
  };

  endall(c,room){

    console.log(c);
    console.log(room);



    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    dte.setHours(dte.getHours()+9);
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        console.log(b);
        if(snap.val()[b].type=="agasi"){

            console.log("mmmm")
            for(var d in c.agasi){
              console.log(c.agasi[d].name);
              if(c.agasi[d].name.trim() == snap.val()[b].name.trim()){
                this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
                this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).child(this.currentstartday).child(c.key).update({"end_date":hour+":"+min,"end_date_full":dte})
                
              }
            }
            
          }
      }
    
  });
  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(c.key).update({"end_date":hour+":"+min,"end_date_full":dte})
  this.firemain.child("company").child(this.company).child("roomlist").child(room).update({"flag":false,"lastupdated":dte});

  //refresh 
  this.mainlist=[];
  this.mainlist_finished=[];
  this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
    for(var a in snap.val()){
      console.log("mmmm")
      console.log(snap.val()[a].roomhistory)
      if(snap.val()[a].roomhistory!=undefined){
        for(var b in snap.val()[a].roomhistory[this.currentstartday]){
          console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
          if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
            this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          }else{
            this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
            this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          }
          
        }
      }
      
    }
    console.log(this.mainlist)
  });
  }
  end(c,room){

    console.log(c.name);
    console.log(c.date);

    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    dte.setHours(dte.getHours()+9);
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        console.log(b);
        if(snap.val()[b].type=="agasi"){

            console.log("mmmm")
            if(c.name == snap.val()[b].name){
              this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
              this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
            }
          }
      }
    
  });
  }

  gotolink(value){
    console.log("gotolink "+value);
    if(value == 1){
    this.navCtrl.push(ParkingPage);
    }else if(value==2){
      this.navCtrl.push(InfoPage);
    }else if(value==3){
      this.navCtrl.push(AttendancePage);
    }else if(value==4){
      this.navCtrl.push(ChoicePage);
    }else if(value==5){
      this.navCtrl.push(GongjiPage);
    }else if(value==6){
      this.navCtrl.push(InfoPage);
    }else if(value==7){
      this.navCtrl.push(InfoPage);
    }
  }
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(AgasichoicePage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
     
    });

    modal.present();
  }
  logout(){
    this.view.dismiss();
  }
      /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
      screenSwitch(e : any) : void {
        if(e.value==3){
         
          setTimeout(()=>{
            for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
            document.getElementById("ion-label-area-" + e.value).style.display = "";
            this.zone.run(()=>{
              this.activeclass=e.value;
              console.log(this.activeclass)
            })
          },500)
        }else{
          for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
      
            this.activeclass=e.value;
            console.log(this.activeclass)
          })
        }
        
      }
}
