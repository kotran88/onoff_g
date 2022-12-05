import { Component,NgZone } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
/**
 * Generated class for the AgasiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agasi',
  templateUrl: 'agasi.html',
})
export class AgasiPage {
  mainlist:any = [];
  activeclass='1';
  booleanValue:any = false;
  showplus=false;
  id:any;
  firemain = firebase.database().ref();
  year:any="";
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
  team:any;
  constructor(public zone:NgZone,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.id=localStorage.getItem("id");

    var date = new Date();

    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();

    var fulldate = this.year+"-"+this.month+"-"+this.day;
    this.firemain.child("users").child(this.id).child("attendance").child(fulldate).once('value').then((snap)=>{


      if(snap.val()!=undefined){
        console.log(snap.val())
      if(snap.val().currentStatus!=undefined){
        if(snap.val().currentStatus=="attend"){
          this.booleanValue=true;
        }else{
          this.booleanValue=false;
        }
      }
      }


    });
  }
  myChange(v){
    console.log(v);
    var fulldate = this.year+"-"+this.month+"-"+this.day;
    console.log(this.booleanValue)
    if(this.booleanValue){

      this.firemain.child("users").child(this.id).child("attendance").child(fulldate).update({"currentStatus":"attend"})
      this.firemain.child("users").child(this.id).child("attendance").child(fulldate).child("attend").update({ "team":this.team,"name":this.id, "flag":"attend","time":this.hour+":"+this.min})
    this.firemain.child("attendance").child(fulldate).child(this.id).child("attend").update({ "team":this.team,"name":this.id,"flag":"attend","time":this.hour+":"+this.min})
    }else{

      this.firemain.child("users").child(this.id).child("attendance").child(fulldate).update({"currentStatus":"noattend"})
      this.firemain.child("users").child(this.id).child("attendance").child(fulldate).child("noattend").update({ "flag":"noattend","time":this.hour+":"+this.min})
    this.firemain.child("attendance").child(fulldate).child(this.id).child("noattend").update({ "team":this.team,"name":this.id, "flag":"noattend","time":this.hour+":"+this.min})
      }

  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.goToday();

    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }

    document.getElementById("ion-label-area-1").style.display = "";
    // this.zone.run(()=>{
    //   this.activeclass='2'
    // })

    this.firemain.child("users").child(this.id).once('value').then((snap)=>{
      console.log(snap.val());
      this.team = snap.val().jopan;
      console.log("team is "+this.team);
    });
    this.firemain.child('rooms').once('value').then((snap)=>{
      console.log(snap.val())
      for(var a in snap.val()){
        console.log("mmmm")
        for(var b in snap.val()[a]){
          console.log(snap.val()[a][b]);
          this.mainlist.push(snap.val()[a][b]);
        }
      }
    });
  }
    /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
  screenSwitch(e : any) : void {
    if(e.value==3){

      setTimeout(()=>{
        for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{
          this.activeclass=e.value;
          console.log(this.activeclass)
        })
      },500)
    }else{
      for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
      document.getElementById("ion-label-area-" + e.value).style.display = "";
      this.zone.run(()=>{

        this.activeclass=e.value;
        console.log(this.activeclass)
      })
    }

  }

  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(EditingroomPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");
    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    console.log("ad room come");
    let modal = this.modal.create(InfomodalPage,{"room":room});
    modal.onDidDismiss(url => {
      console.log("dismiss!");
    });

    modal.present();
  }


  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  getDaysOfMonth() {
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    // this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentMonth =this.date.getMonth()+1;
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  goToday(){
    this.today = new Date();
    this.date=new Date(this.today.getFullYear(),this.today.getMonth()+1,0);
    this.getDaysOfMonth();
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })

  }

  goToNextMonth() {
    console.log("gotonextmonth")
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }
}
