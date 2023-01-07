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
  currentstartday:any="";
  currentstart:any="";
  smallroom=[];
  midroom=[];
  bigroom=[];
  firstflag=false;
  company:any="";
  firemain = firebase.database().ref();
  constructor(public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

    this.firstflag = this.navParams.get("flag");
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
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
          console.log("refresh...");




    this.generateroomcategory()

    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a]);
        console.log(snap.val()[a].flag);
        var flag = false;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            flag=snap.val()[a].roomhistory[b].flag
          }
        }
        if(flag==true){
          console.log(snap.val()[a].roomhistory)
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date!=undefined&&snap.val()[a].roomhistory[this.currentstartday][b].end_date.length<1){

                this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
              }
              
            }
          }
        }else{
        
        }

        
       
        // for(var b in snap.val()[a]){
        //   console.log(snap.val()[a][b]);
        //   this.mainlist.push(snap.val()[a][b]);
        // }
      }
      console.log(this.mainlist)
    });

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
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log(snap.val());
      if(snap.val()==null){

      }else{
        console.log(snap.val().category)
        for(var a in snap.val()){
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
            flag=snap.val()[a].roomhistory[b].flag
          }
        }
         if(cat=="소"){
          if(flag){
            console.log(flag+"small not add")
          }else{
            console.log("small add")
            this.smallroom.push({"name":name,"category":cat,"flag":flag});
          }
           
         }
         if(cat=="중"){
          if(flag){
            
          }else{
            this.midroom.push({"name":name,"category":cat,"flag":flag});
          }
        }
        if(cat=="대"){
          if(flag){
            
          }else{
            this.bigroom.push({"name":name,"category":cat,"flag":flag});
          }
          
        }
        }
        console.log(this.smallroom);
        console.log(this.midroom);
        console.log(this.bigroom);
      }
  
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');

    this.generateroomcategory()

    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a]);
        console.log(snap.val()[a].flag);
        var flag = false;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            flag=snap.val()[a].roomhistory[b].flag
          }
        }
        if(flag==true){
          console.log(snap.val()[a].roomhistory)
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){

                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
              }
              
            }
          }
        }else{
        
        }

        
       
        // for(var b in snap.val()[a]){
        //   console.log(snap.val()[a][b]);
        //   this.mainlist.push(snap.val()[a][b]);
        // }
      }
      console.log(this.mainlist)
    });
  }
  
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(EditingroomPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");
      this.mainlist=[];
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        for(var a in snap.val()){
          console.log("mmmm")
          console.log(snap.val()[a].roomhistory)



          var flag = false;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            flag=snap.val()[a].roomhistory[b].flag
          }
        }
        if(flag==true){

        console.log(snap.val()[a].flag);
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
               this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              }
            }
          }
        }
          // for(var b in snap.val()[a]){
          //   console.log(snap.val()[a][b]);
          //   this.mainlist.push(snap.val()[a][b]);
          // }
        }
        console.log(this.mainlist)
      });

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
    let modal = this.modal.create(InfomodalPage,{"room":room});
    modal.onDidDismiss(url => {
      console.log("dismiss!");


      this.mainlist=[];
this.generateroomcategory();
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a].roomhistory)
        var flag = false;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            flag=snap.val()[a].roomhistory[b].flag
          }
        }
        if(flag==true){
          console.log(snap.val()[a].flag);
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);

              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                 this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
              }

            }
          }
        }
       
     
        // for(var b in snap.val()[a]){
        //   console.log(snap.val()[a][b]);
        //   this.mainlist.push(snap.val()[a][b]);
        // }
      }
      console.log(this.mainlist)
    });

    });

    modal.present();
  }
}
