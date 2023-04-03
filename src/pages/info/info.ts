import { Component } from '@angular/core';
import { IonicPage,ModalController,ViewController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { ParkingPage } from '../parking/parking';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
import { E } from '@angular/core/src/render3';
import { generate } from 'rxjs';
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
  mainlist_finished:any=[];
  currentstartday:any="";
  currentstart:any="";
  smallroom=[];
  totalactiveroom:any=0;
  midroom=[];
  bigroom=[];
  firstflag=false;
  company:any="";
  bu:any=0;
  name:any="";
  nowtime:any=""
  interval:any;
  firemain = firebase.database().ref();
  constructor(public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.name = localStorage.getItem("name");
    this.firstflag = this.navParams.get("flag");
    var type = localStorage.getItem("type");

    this.interval=setInterval(()=>{
      var now = new Date();
      var hour = now.getHours();
      var min = now.getMinutes();
      if(min<10){
        this.nowtime=hour+":0"+min;
      }else{
        this.nowtime=hour+":"+min;
      }
    }
    ,1000)
  }
  openclose(){
    console.log("open and cloe");
    try{
      this.menuCtrl.open();
    }catch(e){
      console.log(e);
    }
  }
  close(){

    // this.menuCtrl.open();
    this.view.dismiss();
}
  gotolink(value){
    if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true});
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          this.generate();
        })
      });
    }else if(value==5){
      this.navCtrl.push(GongjiPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(InfoPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(InfoPage,{flag:true});
    }
  }
  generateroomcategory(){
    this.smallroom=[];
    this.midroom=[];
    this.bigroom=[];
    var roomin=[];
    this.firemain.child("company").child(this.company).once('value').then((snap2)=>{
      console.log(snap2.val().bu)
      if(snap2.val().bu==undefined){

        this.bu=0;
      }else{

        this.bu=snap2.val().bu;
      }
    });
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log(snap.val());
      if(snap.val()==null){

      }else{
        console.log(snap.val().category)
        for(var a in snap.val()){
          console.log(snap.val()[a])
         var cat =  snap.val()[a].category;
         var name = snap.val()[a].name;
         var flag = snap.val()[a].flag;
         console.log(flag+"/"+name+"/"+cat);
         
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            console.log("today's flag is "+flag);
            for(var c in snap.val()[a].roomhistory[b]){
              if(c!="lastupdated"&&c!="flag"){
                console.log(snap.val()[a].roomhistory[b]);
              console.log(snap.val()[a].roomhistory[b][c]);
              console.log(snap.val()[a].roomhistory[b][c].flag);
              if(snap.val()[a].roomhistory[b][c].flag){
                roomin.push(snap.val()[a].roomhistory[b][c].name);
              }
              
              }
              
              //flase 는 종료 
              
            }
          }
        }
        console.log(roomin);
         if(cat=="소"){
          if(flag){
            console.log(flag+"small not add")
          }else{


            this.smallroom.push({"name":name,"category":cat,"flag":flag});
console.log(name);
console.log(roomin);
for(var cc in roomin){
  console.log(roomin[cc]);
  if(name==roomin[cc]){
   console.log(name+"name and roomin match so delete");
   console.log(this.smallroom);
   var count=0;
   for(var a in this.smallroom){
    count++;
      console.log(this.midroom[a]);
      if(this.smallroom[a].name==name){
        console.log("delete this.smallroom["+count+"]");
        this.smallroom.splice(count-1,count);
      }
   }
  }else{
    console.log("this.smallroom push "+name+","+cat+","+flag);
   
  }
}
          
          }
           console.log(this.smallroom);
         }
         if(cat=="중"){
          if(flag){
            
          }else{
            this.midroom.push({"name":name,"category":cat,"flag":flag});
console.log(name);
console.log(roomin);
for(var cc in roomin){
  console.log(roomin[cc]);
  if(name==roomin[cc]){
   console.log(name+"name and roomin match so delete");
   console.log(this.midroom);
   var count=0;
   for(var a in this.midroom){
    count++;
      console.log(this.midroom[a]);
      if(this.midroom[a].name==name){
        console.log("delete this.midroom["+count+"]");
        this.midroom.splice(count-1,count);
      }
   }
  }else{
    console.log("this.midroom push "+name+","+cat+","+flag);
   
  }
}
          
          }
        }
        if(cat=="대"){
          if(flag){
            
          }else{




            this.bigroom.push({"name":name,"category":cat,"flag":flag});
console.log(name);
console.log(roomin);
for(var cc in roomin){
  console.log(roomin[cc]);
  if(name==roomin[cc]){
   console.log(name+"name and roomin match so delete");
   console.log(this.bigroom);
   var count=0;
   for(var a in this.bigroom){
    count++;
      console.log(this.midroom[a]);
      if(this.bigroom[a].name==name){
        console.log("delete this.bigroom["+count+"]");
        this.bigroom.splice(count-1,count);
      }
   }
  }else{
    console.log("this.bigroom push "+name+","+cat+","+flag);
   
  }
}

          }
          
        }
        }
        console.log(this.smallroom);
        console.log(this.midroom);
        console.log(this.bigroom);
      }
  
    });
  }
  buchange(){
    console.log("buchnage"+this.bu)
    if(this.bu==0){
      this.bu=1
    }else if(this.bu==1){
      this.bu=2;
    }else{
      this.bu=0;
    }

    this.firemain.child("company").child(this.company).update({"bu":this.bu});

  }
  ionViewDidLeave(){
    clearInterval(this.interval)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');

    this.generate();
  }
  generate(){
    this.generateroomcategory()
    this.mainlist=[];
    this.mainlist_finished=[];
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a]);
        console.log(snap.val()[a].flag);
        var flag = snap.val()[a].flag;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
          }
        }
          console.log(snap.val()[a].roomhistory)
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].flag){
                    this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
                  
                  }else{
                    this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
              }
              
            }
          }
      
      }
      console.log(this.mainlist)
      this.mainlist.sort(function(a, b) {
          console.log(a.insert_date);
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      console.log("after sorting...")
      console.log(this.mainlist)


      this.mainlist_finished.sort(function(a, b) {
        console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });
    });
  }
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(EditingroomPage,{"a":a});
    modal.onDidDismiss(url => {
      this.generate();
    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room,"bu":this.bu});
    modal.onDidDismiss(url => {
      this.generate();

    });

    modal.present();
  }
}
