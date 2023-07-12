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
import { SignupPage } from '../signup/signup';
import { AccountPage } from '../account/account';
import { OrderPage } from '../order/order';
import { OrdermainPage } from '../ordermain/ordermain';
import { UtilsProvider } from '../../providers/utils/utils';
import { InfoPage } from '../info/info';
import { WaitingmodalPage } from '../waitingmodal/waitingmodal';
/**
 * Generated class for the WaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {
  mainlist:any = [];
  noagasi:any=0;
  avec:any=false;
  logic:any=0;
  numofpeople:any="";
  incharge:any="";
  agasinum:any=0;
  inputtext:any="";
  mainlist_finished:any=[];
  currentstartday:any="";
  selectedday:any=0;
  currentstart:any="";
  selected:any=1;
  smallroom=[];
  smallroom2=[];
  allroom=[];
  totalactiveroom:any=0;
  midroom=[];
  bigroom=[];
  midroom2=[];
  bigroom2=[];
  firstflag=false;
  company:any="";
  bu:any=0;
  name:any="";
  nowtime:any=""
  paymentflag:any=false;
  interval:any;
  code:any="";
  nickname:any="";
  id:any="";
  type:any="";
  firemain = firebase.database().ref();
  constructor(public util:UtilsProvider, public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.nickname = localStorage.getItem("nickname");
    this.name = localStorage.getItem("name");
    this.firstflag = this.navParams.get("flag");
    this.type = localStorage.getItem("type");
    var login=localStorage.getItem("login_data");
    // this.code = JSON.parse(login).code;
    //console.log(login);

    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;
    //console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
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
  ionViewWillLeave(){
    // this.firemain.child("company").child(this.company).child("roomlist").off();
  }
  openclose(){
    //console.log("open and cloe");
    try{
      this.menuCtrl.open();
    }catch(e){
      //console.log(e);
    }
  }
  close(){

    // this.menuCtrl.open();
    this.view.dismiss();
}
clicking2(v){
  console.log(v);
    this.avec=!this.avec;
}
clickforlogic(v){
    console.log("v is "+v);
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
gotopayment(){
  this.firemain.child("users").child(this.nickname).update({"payment":true})
  window.alert("임시 결제 완료 ")
  this.navCtrl.setRoot(LoginpagePage);
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
        //console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          //console.log("off...")
      // this.firemain.child("company").child(this.company).child("roomlist").off();
        })
      });
    }else if(value==5){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(OrdermainPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(InfoPage,{flag:true});
    }
  }
  buchange(){
   
    //console.log("buchnage"+this.bu)
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
  ionViewWillEnter(){
    //console.log("ionViewWillEnter");
    
  }
  ionViewDidLoad() {
    setTimeout(()=>{

    this.generate();
    },100)
    // this.util.presentLoading();
    // this.generate();
    // this.util.dismissLoading();
  }
  generate(){
    console.log("generate come");
    this.mainlist=[];
    this.mainlist_finished=[];
    this.noagasi=0;
    this.agasinum=0;
    this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday).once('value').then((snap)=>{
      for(var a in snap.val()){
        var flag = snap.val()[a].flag;

      this.mainlist.push(snap.val()[a]);
      
      }

      //console.log("this is finished room result")
      //console.log(this.noagasi);
      //console.log(this.agasinum);
      this.mainlist.sort(function(a, b) {
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      //console.log("after sorting...")
      //console.log(this.mainlist)


      this.mainlist_finished.sort(function(a, b) {
        //console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });
    });
    //console.log(this.mainlist);
  }
  remove(a){
    console.log(a);
    console.log("remove");
    this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").child(a.key).remove();
    this.generate();
  }
  editing(a){
    
    console.log(a);
    this.view.dismiss({"result":"waiting","data":a});
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      
      this.navCtrl.setRoot(LoginpagePage)
  }
  confirmwaiting(){
    console.log("confirmwaiting");
    console.log(this.incharge);
    console.log(this.avec);
    console.log(this.numofpeople);
    if(this.incharge.length==0){
      window.alert("담당자를 선택해주세요");
      return;
    }
    if(this.numofpeople.length==0){
      window.alert("인원을 선택해주세요");
      return;
    }
    var date = new Date();
  
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    var dte = new Date();
    var fulldate = this.currentstartday;
    var key =  this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").push().key ;
    this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").child(key).update({"avec":this.avec, "logic":this.logic, "incharge":this.incharge,"numofpeople":this.numofpeople,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
    this.generate();
  }
  addRoom(room){
    
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(WaitingmodalPage,{"room":room,"bu":this.bu});
    modal.onDidDismiss(url => {
      if(url!=undefined){
        if(url.result){
          
        //console.log("do nothing1");
        }else{

        //console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
          },300)
        }
      }else{
        //console.log("do nothing");
      }
    

    });

    modal.present();
  }
}
