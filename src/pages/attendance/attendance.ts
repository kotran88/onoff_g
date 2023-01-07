import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  mainlist:any = [];
  mainlist_no:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  totalin:any=0;
  totalout:any=0;
  year:any="";
  month:any="";
  day:any="";
  hour:any="";
  min:any="";

  currentstartday:any="";
  currentstart:any="";
  constructor(public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.goToday();

    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-1").style.display = "";
        this.zone.run(()=>{

          this.activeclass='1'
        })
    this.firemain.child('attendance').once('value').then((snap)=>{
      console.log(snap.val())

      for(var a in snap.val()){
        console.log(a)
        console.log(snap.val()[a])
        if(a==this.currentstartday){
          console.log("mmmm")
          for(var b in snap.val()[a]){
            console.log(snap.val()[a][b]);
            console.log(snap.val()[a][b].attend.flag);
            if(snap.val()[a][b].attend!=undefined){
              this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              this.totalin++;
            }
            if(snap.val()[a][b].noattend!=undefined){
              this.totalout++;
              this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
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


  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

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
