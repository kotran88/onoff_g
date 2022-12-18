import { Component,NgZone,NgModule } from '@angular/core';
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

  currentstartday:any="";
  currentstart:any="";
  totaltcofday:any =0;
  diffMin:any;
  current: number = 27;
  currentStart:any;
  max: number = 50;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#45ccce';
  background: string = '#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  rate:number;
  currentRoom:any;
  mainlist:any = [];
  activeclass='1';
  booleanValue:any = false;
  showplus=false;
  id:any;
  firemain = firebase.database().ref();
  year:any="";
  month:any="";
  attendance:any=[];
  company:any;
  day:any="";
  hour:any="";
  min:any="";
  name:any;
  team:any;
  tctotal:any=0;
  
  constructor(public zone:NgZone,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.id=localStorage.getItem("id");
    this.name = localStorage.getItem("name");
    this.company = localStorage.getItem("company");
    var date = new Date();

    
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();

    this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).once('value').then((snap)=>{


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
      console.log(this.booleanValue)


    });
  }
  myChange(v){
    console.log(v);
    console.log(this.booleanValue)
    if(this.booleanValue){

      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).child("attend").update({ "team":this.team,"name":this.id,"date":this.currentstartday, "flag":"attend","time":this.hour+":"+this.min})
    this.firemain.child("attendance").child(this.currentstartday).child(this.id).child("attend").update({ "team":this.team,"name":this.id,"flag":"attend","date":this.currentstartday, "time":this.hour+":"+this.min})
    }else{

      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).update({"currentStatus":"noattend"})
      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).child("noattend").update({ "flag":"noattend","date":this.currentstartday,"time":this.hour+":"+this.min})
    this.firemain.child("attendance").child(this.currentstartday).child(this.id).child("noattend").update({ "team":this.team,"name":this.id,"date":this.currentstartday, "flag":"noattend","time":this.hour+":"+this.min})
      }

  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  checkEvent(day){
    for(var a in this.attendance){
     
      if(this.attendance[a].day!=undefined){
      if(day == this.attendance[a].day.split("-")[2]){
        return true;
      }
      }
      
    }
  }

  checkEvent2(day){
    for(var a in this.attendance){
     
      if(this.attendance[a].day!=undefined){
      if(day == this.attendance[a].day.split("-")[2]){
        return true;
      }
      }
      
    }
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AgasiPage');
    this.goToday();

    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }

    document.getElementById("ion-label-area-1").style.display = "";
    this.zone.run(()=>{
      this.activeclass='1'
    })
    setTimeout(()=>{


//       document.documentElement.style.setProperty('--dynamic-colour', 180+"");
    },5000)
    this.firemain.child("users").child(this.id).once('value').then((snap)=>{
      console.log(snap.val());

      this.team = snap.val().jopan;
      for(var a in snap.val().attendance){
        this.attendance.push({day:snap.val().attendance[a].attend.date});
      }
      console.log(snap.val().current)
      if(snap.val().current!=undefined){
      
        this.currentRoom=snap.val().current.room;
        console.log(snap.val().current.enter_date)
        var now = new Date();
        var diffend = new Date(snap.val().current.enter_date);
        diffend.setHours(diffend.getHours() - 9);
        this.currentStart = diffend.getHours()+":"+diffend.getMinutes();
       
        console.log(diffend);
        console.log(now);
        console.log("now hour and min");
        console.log(now.getHours());
  
        console.log(now.getMinutes());
  
        console.log("current enter date " );
        console.log(diffend.getHours());
        console.log(diffend.getMinutes());
        var diff = now.getTime() - diffend.getTime();
        console.log(diff);
        console.log(now.getTime());
        console.log(diffend.getTime());
        this.diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
        console.log(this.diffMin)
        this.tctotal = this.diffMin/60;
        this.tctotal = this.tctotal.toFixed(2);


      var RADIUS = 54;
      var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
      //50/60*100
      var value = this.diffMin/60*100;
      var progress = value / 100;
      var dashoffset = CIRCUMFERENCE * (1 - progress);
      console.log(dashoffset)
      setTimeout(()=>{
        if(document.getElementById("bar")!=undefined){
          document.getElementById("bar").style.strokeDashoffset = dashoffset+"";
        }
      },1000)
     
      }
      
     

      for(var a in snap.val().roomhistory){
        var end = snap.val().roomhistory[a].end_date_full
        var start = snap.val().roomhistory[a].insert_date_full;
        var enddate = new Date(end);
        var startdate = new Date(start);
        var tctotal=0;
        var totalmoney=0;
        if(end==undefined){

        }else{

        console.log(end);
        console.log("enddate"+enddate);
        var diff = enddate.getTime() - startdate.getTime();
        console.log(diff);
        var diffDays = Math.ceil(diff / (1000) / 3600 * 60 );
        console.log(enddate);
        console.log(startdate);
        console.log(diffDays)


        tctotal = diffDays/60;
        console.log(tctotal);
        console.log(Math.floor(tctotal))
        var mok = Math.floor(tctotal);
        var nameoji = tctotal -Math.floor(tctotal);
        console.log(nameoji)
        // 10분 -> 0.17 
        // 15분 -> 0.25
        // 20분 -> 0.33 - 3만원
        //30분 - > 0.5
        // 40분 -> 0.67 - 6만원
        // 1시간 -> 1 - 13만원 
        
        // 1시간 30분 -> 1.5
        // 2시간 -> 2 - 26만원
        // 2시간 20분 -> 26만원 + 3만원 = 29만원
        var moneyvalue = mok*13;
        var restofmoney=0;
        //if 2.5 
        if(nameoji<=0.17){
          //nothing
        }else if(nameoji>0.17 &&nameoji<=0.33){
          //3마ㄴ원
          restofmoney = 3;
        }else if(nameoji>0.33 &&nameoji<=0.67){
          //6만원
          restofmoney = 6;
        }else{
          //13만원 

          restofmoney = 13;
        }
       totalmoney = Number(moneyvalue)+Number(restofmoney);
        this.totaltcofday += Number(totalmoney);
        }
        this.mainlist.push({"end_date_full":snap.val().roomhistory[a].end_date_full,"enter_date_full":snap.val().roomhistory[a].enter_date_full,"name":snap.val().roomhistory[a].name,"room":snap.val().roomhistory[a].room,"start_date_full":snap.val().roomhistory[a].start_date_full,"incharge":snap.val().roomhistory[a].incharge,"tctotal":tctotal.toFixed(2),"money":totalmoney})
        
        // this.tctotal = this.tctotal.toFixed(2);
        
      }
      this.totaltcofday = this.totaltcofday*10000
      console.log(this.attendance)
      console.log("team is "+this.team);
      console.log(this.mainlist);

    });
    console.log(this.company)
    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log(snap.val()[a])
        if(snap.val()[a].roomhistory!=undefined){
          for(var b in snap.val()[a].roomhistory){
            if(snap.val()[a].roomhistory[b]!=undefined){
              console.log(snap.val()[a].roomhistory[b])
              for(var c in snap.val()[a].roomhistory[b]){
                console.log(snap.val()[a].roomhistory[b][c].agasi)
                // if(snap.val()[a].roomhistory[b].agasi[c])
              }
              // this.attendance.push({day:snap.val()[a].roomhistory[b].date});
            }
          }
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
