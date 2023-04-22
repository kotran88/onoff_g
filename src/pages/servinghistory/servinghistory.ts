import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { MenuController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import { AccountPage } from '../account/account';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-servinghistory',
  templateUrl: 'servinghistory.html',
})
export class ServinghistoryPage {
  name:any="";
  mainlist=[];
  allmainlist=[];
  todaymoney=0;
  yeonti:any="";
  obj = [];
  firemain = firebase.database().ref();
  count : number[] = new Array();
  orderlist=[];
  totalcount=0;
  totalprice=0;
  currentstartday:any="";
  currentstart:any="";
  company:any;



  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일
  nickname:any="";
  incen2:any=0;
  selectedDay:any=0;
  selectedDate:any=0;
  constructor(public util:UtilsProvider, public view:ViewController,public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

    this.selectedDate=this.currentstartday;
    this.selectedDay = this.currentstartday.split("-")[2];
   
    this.today = new Date();
    this.date=new Date(this.today.getFullYear(),this.today.getMonth()+1,0);
    this.getDaysOfMonth();
    console.log(this.selectedDate)
    console.log(this.currentYear+","+this.currentMonth+","+this.currentDate+",,,"+this.selectedDay)
    console.log(this.today.getFullYear()+",,,"+this.today.getMonth()+1);
    
  }
  openmodal(day){
    console.log(day);
    this.selectedDate =  this.currentYear+"-"+this.currentMonth+"-"+day;

    this.selectedDay = day;
    console.log(this.currentstartday)
    console.log(this.selectedDate)
    console.log(this.currentYear+","+this.currentMonth+","+this.currentDate+",,,"+this.selectedDay)
    this.generating();
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
  checkEvent(day){
    return false;
  }
  
  openclose(){
    console.log("open and cloe");
    this.view.dismiss();
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
generating(){

  this.orderlist=[];
  this.mainlist=[];
  console.log('ionViewDidLoad DirectorpagePage');

  var date = new Date();

  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  console.log("selectedDate : "+this.selectedDate);
  this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
  
    console.log("IN!")
    if(snap.val()!=undefined){
      for(var a in snap.val()){

        for(var b in snap.val()[a].roomhistory){
          console.log(b+",,"+this.selectedDate);
          if(b==this.selectedDate){
            

            for(var c in snap.val()[a].roomhistory[b]){
              console.log(snap.val()[a].roomhistory[b][c]);
                  if(snap.val()[a].roomhistory[b][c].wt.trim()==this.nickname.trim()){
                    var mainlist=snap.val()[a].roomhistory[b][c];
  
                    console.log("is mainlist...")
    
                    console.log(mainlist);
            for(var d in mainlist.agasi){
                if(mainlist.agasi[d].findate!=undefined){
      
                }else{
                  var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
                  var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
                  var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
                  mainlist.agasi[d].totalmoney=totalmoney;
                  mainlist.agasi[d].tc=tctotal;
                  mainlist.agasi[d].bantee=bantee;
                }
            }
            console.log(mainlist);
            var newtc=0;
            var tcarray = [];
            var numofpeople = snap.val()[a].roomhistory[b][c].numofpeople;
            for(var cccc in mainlist.agasi){
              console.log(mainlist.agasi[cccc].tc)
              newtc += Math.floor(mainlist.agasi[cccc].tc)
              tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
            
            }
                    console.log(snap.val()[a].roomhistory[b][c]);
                  var orderl=[];
                  var orderprice=0;
                  var tp=0;
                  var tbottle=0;

              if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){

                console.log(snap.val()[a].roomhistory[b][c].orderlist);
                console.log(snap.val()[a].roomhistory[b][c].orderlist.roomno);
                for(var d in snap.val()[a].roomhistory[b][c].orderlist.orderlist){
                  if(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].category=="주류"){
                    tbottle+=Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num);
                  }
                  orderprice+= (Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price) );
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d]);
                  orderl.push(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d])
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price);
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num)
                  tp += snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num;
                  console.log(snap.val()[a].roomhistory[b][c].orderlist);
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.orderDate);
                }
              }
                 
                  console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
                  var firstsumofv=0;
                  for(var abab in tcarray){
                    console.log(tcarray[abab])
                    if(tcarray[abab]>=tbottle){
                      var v = tcarray[abab]-tbottle;
                      console.log(v);
                      firstsumofv+=v;
                    }
                  }
                  console.log("firstsumofv : "+firstsumofv);
                  this.yeonti=firstsumofv;
                  console.log("yeontiiiii : "+this.yeonti);
                  console.log("total bottle : "+tbottle);
                  console.log(snap.val()[a].roomhistory[b][c])
                    console.log(snap.val()[a].roomhistory[b][c].agasi)
                    var totaltc=0;
                    var totalmoney=0;
                    for(var aga in mainlist.agasi){
                      console.log("aga : ");
                      console.log(mainlist.agasi[aga])
                      console.log("tc:::"+mainlist.agasi[aga].tc);
                      console.log("money:::"+mainlist.agasi[aga].totalmoney);
                      if(mainlist.agasi[aga].tc==undefined){
  
                      }else{
                        totaltc+=Number(mainlist.agasi[aga].tc);
                        if(mainlist.agasi[aga].totalmoney==undefined){
  
                          totalmoney+=Number(mainlist.agasi[aga].money);
                        }else{
  
                          totalmoney+=Number(mainlist.agasi[aga].totalmoney);
                        }
                      }
                    }
                    console.log("tp ...r : "+tp);
                    totalmoney=totalmoney*10000;
                    this.todaymoney += tp+totalmoney
                    var orderdate="";
                    var roomno="";
                    if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
                      orderdate = snap.val()[a].roomhistory[b][c].orderlist.orderDate
                      roomno=snap.val()[a].roomhistory[b][c].orderlist.roomno;
                    }else{
                      orderdate = "-"
                      roomno="-"
                    }
                    this.orderlist.push({"tp":tp, "totalprice":orderprice,"tc":totaltc,"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
                  }
                  
               
                
             
            }

          }else{

          }

          console.log(b);

        console.log(snap.val()[a].roomhistory);
        
        }
      }
    }
    for(var cc in this.orderlist){
      console.log(this.orderlist[cc].value);
    }
    
    console.log(this.orderlist)
  });

  // this.firemain.child("company").child(this.company).child('park').once('value').then((snap)=>{
  //   console.log(snap.val())
  //   for(var a in snap.val()){
  //     console.log("a is :"+a);
  //     var todaylist=[];
  //     var countingvalue=0;
  //     var countingprice =0;

  //     // this.mainlist.push(snap.val()[a]);
  //     // todaylist.push({"carnum":snap.val()[a].carnum,"date":snap.val()[a].date,"incharge":snap.val()[a].incharge,"key":snap.val()[a].key,"price":snap.val()[a].price,"receiver":snap.val()[a].receiver,"room":snap.val()[a].room,"time":snap.val()[a].time,"type":snap.val()[a].type});
  //     for(var b in snap.val()[a]){
  //       console.log(b);
  //       console.log(snap.val()[a][b]);

  //       todaylist.push(snap.val()[a][b]);
  //     countingvalue++;
  //     countingprice+=Number(snap.val()[a][b].price);
  //     console.log(this.currentstartday);
  //     console.log(a);
  //     console.log(snap.val()[a][b].date);
  //       if(this.currentstartday==a){
  //         this.totalcount++;
  //         this.totalprice+=Number(snap.val()[a][b].price);
  //         this.mainlist.push(snap.val()[a][b]);

  //       }

  //       // this.allmainlist.push(snap.val()[a][b]);
        
  //     }
  //   }

  //   console.log(this.mainlist)
  // });
}
  ionViewDidLoad() {
    this.generating();
  }

}
