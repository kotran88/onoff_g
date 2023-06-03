import { Component,NgZone,NgModule } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { ParkingPage } from '../parking/parking';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
import { InfoPage } from '../info/info';
import { SignupPage } from '../signup/signup';
import { UtilsProvider } from '../../providers/utils/utils';
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
  todaymoney:any;
  attendcount:any = 0;
  currentstartday:any="";
  currentstart:any="";
  totaltcofday:any =0;
  diffMin:any;
  current: number = 27;
  currentStart:any;
  max: number = 50;
  stroke: number = 15;
  thismonthmainlist=[];
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
  tcday=[];
  realCurrent: number = 0;
  rate:number;
  currentRoom:any;
  mainlist:any = [];
  activeclass='1';
  booleanValue:any = false;
  showplus=false;
  mainlist2=[];
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
  
  paymentflag:any=false;
  constructor(public util:UtilsProvider, public zone:NgZone,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.id=localStorage.getItem("id");
    this.name = localStorage.getItem("name");
    this.company = localStorage.getItem("company");
    var date = new Date();

    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
    
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    //:290000,"2022-12-25":310000
    // this.tcday.push({"date": "2022-12-4","day":4, "value": 90000});
    // this.tcday.push({"date": "2022-12-5","day":5, "value": 110000});
    // this.tcday.push({"date": "2022-12-16","day":16, "value": 310000});
    console.log("id is : "+this.id);
    this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).once('value').then((snap)=>{
      console.log("inside id");

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

  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  gotolink(value){
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
  myChange(v){
    console.log(v);
    console.log(this.booleanValue)
    if(this.booleanValue){
      console.log(this.id);
      console.log(this.currentstartday)
      console.log("team"+this.team+"name"+this.id+"date"+this.currentstartday+ "flag"+"attend"+"time"+this.hour+":"+this.min);
      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
      this.firemain.child("users").child(this.id).child("attendance").child(this.currentstartday).child("attend").update({ "team":this.team,"name":this.name,"date":this.currentstartday, "flag":"attend","time":this.hour+":"+this.min})
    this.firemain.child("attendance").child(this.currentstartday).child(this.id).child("attend").update({ "team":this.team,"name":this.name,"flag":"attend","date":this.currentstartday, "time":this.hour+":"+this.min})
      //calendar refresh...

  
      this.generatecal();
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
      if(day == this.attendance[a].day.split("-")[2] && this.currentMonth == this.attendance[a].day.split("-")[1]){
        
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
  generatecal(){
    console.log("generate cal come");
    this.attendcount=0;
    this.totaltcofday=0;
    this.attendance=[];
    this.attendcount=0;
    this.tctotal=0;
    this.totaltcofday=0;
    this.todaymoney=0;
    this.thismonthmainlist=[];
    this.mainlist=[];
    this.mainlist2=[];
    this.mainlist=[];
    this.todaymoney=0;
    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      if(snap.val()!=undefined){
        for(var a in snap.val()){
  
          for(var b in snap.val()[a].roomhistory){
            for(var c in snap.val()[a].roomhistory[b]){
                if(snap.val()[a].roomhistory[b][c].date!=undefined&&snap.val()[a].roomhistory[b][c].date.split(" ")[0]==this.currentstartday){
                  //오늘만...
                  console.log(snap.val()[a].roomhistory[b][c]);
                  var mainlist=snap.val()[a].roomhistory[b][c];
  
                  console.log("is mainlist...")
  
                  console.log(mainlist);
          for(var d in mainlist.agasi){
            if(mainlist.agasi[d].name==this.name){
              var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
              var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
              mainlist.agasi[d].totalmoney=totalmoney;
              mainlist.agasi[d].tc=tctotal;
              mainlist.agasi[d].bantee=bantee;

              console.log(mainlist.agasi[d]);
              console.log(mainlist.agasi[d].tc);
              this.todaymoney+=mainlist.agasi[d].tc;
              if(mainlist.agasi[d].findate!=undefined){ this.thismonthmainlist.push({"date":mainlist.agasi[d].date.split(" ")[0], "end_date_full":mainlist.agasi[d].findate,"enter_date_full":mainlist.agasi[d].date.split(" ")[0],"name":mainlist.agasi[d].name,"room":mainlist.agasi[d].roomno,"incharge":mainlist.agasi[d].incharge,"tctotal":mainlist.agasi[d].tc,"money":mainlist.agasi[d].totalmoney})
         
                this.mainlist.push({"incharge":mainlist.agasi[d].incharge,"enter_date_full":mainlist.agasi[d].date,  "end_date_full":mainlist.agasi[d].findate,"room":mainlist.agasi[d].roomno,"name":mainlist.agasi[d].name,"tctotal":mainlist.agasi[d].tc,"money":mainlist.agasi[d].totalmoney})
              }else{
                this.currentRoom = mainlist.agasi[d].roomno;
                this.tctotal = mainlist.agasi[d].tc;
                var now = new Date();
                var diffend = new Date(mainlist.agasi[d].date);
                console.log(diffend);
                var diff = now.getTime() - diffend.getTime();
                console.log(diff);
                console.log(now.getTime());
                console.log(diffend.getTime());
                this.diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
                console.log("diffmin..."+this.diffMin);
               
              }




                     

            }
               
          }

        }else{
          //오늘 아닌날. 

          var mainlist=snap.val()[a].roomhistory[b][c];
  
                  console.log("is mainlist...")
  
                  console.log(mainlist);
          for(var d in mainlist.agasi){
            if(mainlist.agasi[d].name==this.name){
              var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
              var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
              mainlist.agasi[d].totalmoney=totalmoney;
              mainlist.agasi[d].tc=tctotal;
              mainlist.agasi[d].bantee=bantee;

              console.log(mainlist.agasi[d]);
              console.log(mainlist.agasi[d].tc);
              this.todaymoney+=mainlist.agasi[d].tc;
              if(mainlist.agasi[d].findate!=undefined){
                
                this.thismonthmainlist.push({"date":mainlist.agasi[d].date.split(" ")[0], "end_date_full":mainlist.agasi[d].findate,"enter_date_full":mainlist.agasi[d].date.split(" ")[0],"name":mainlist.agasi[d].name,"room":mainlist.agasi[d].roomno,"incharge":mainlist.agasi[d].incharge,"tctotal":mainlist.agasi[d].tc,"money":(mainlist.agasi[d].totalmoney*10000).toLocaleString()})
         
                // this.mainlist.push({"incharge":mainlist.agasi[d].incharge,"enter_date_full":mainlist.agasi[d].date,  "end_date_full":mainlist.agasi[d].findate,"room":mainlist.agasi[d].roomno,"name":mainlist.agasi[d].name,"tctotal":mainlist.agasi[d].tc,"money":mainlist.agasi[d].totalmoney})
              }else{
                // this.currentRoom = mainlist.agasi[d].roomno;
                // this.tctotal = mainlist.agasi[d].tc;
                var now = new Date();
                var diffend = new Date(mainlist.agasi[d].date);
                console.log(diffend);
                var diff = now.getTime() - diffend.getTime();
                console.log(diff);
                console.log(now.getTime());
                console.log(diffend.getTime());
                // this.diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
                console.log("diffmin..."+this.diffMin);
         

              }
            }

        }
      }
    }
  }
}
      }
});
    this.firemain.child("users").child(this.id).once('value').then((snap)=>{
      console.log(snap.val());

      this.team = snap.val().jopan;
      for(var a in snap.val().attendance){
        console.log(snap.val().attendance[a])

      
        this.attendance.push({day:snap.val().attendance[a].attend.date});
      }
      console.log(this.attendance);
      for(var a in this.attendance){
     
        if(this.attendance[a].day!=undefined){
          for(var b in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])
        if(b == this.attendance[a].day.split("-")[2]){
          console.log(this.currentMonth+"////"+ this.attendance[a].day.split("-")[1]);
          if(this.currentMonth == this.attendance[a].day.split("-")[1]){
            this.attendcount++;
          }
         
        }
        }
        
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
        // this.diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
        // console.log(this.diffMin)
        // this.tctotal = this.diffMin/60;
        // this.tctotal = this.tctotal.toFixed(2);
        // var tctotal=0;
        var diffMin = 0;
        var chasam=0;
    if(diffMin<=10){
      tctotal =0;
      chasam=0;
    }else if(diffMin>=11&&diffMin<=20){
      tctotal = 0.3;

      chasam=3;
    }else if(diffMin>=21&&diffMin<=40){
      tctotal = 0.6;

      chasam=6;
    }else if(diffMin>=41&&diffMin<=60){
      tctotal = 1;

      chasam=13;
    }else if(diffMin>=61&&diffMin<=80){
      tctotal = 1.3;
      if(diffMin>=61&&diffMin<=66){
        chasam=14;
      }else if(diffMin>=67&&diffMin<=80){
        chasam=16;
      }
    }else if(diffMin>=81&&diffMin<=100){
      tctotal = 1.6;
      chasam=19;
    }else if(diffMin>=101&&diffMin<=120){
      tctotal = 2;
      chasam=26;
    }else if(diffMin>=121&&diffMin<=140){
      tctotal = 2.3;
      if(diffMin>=121&&diffMin<=126){
        chasam=27;
      }else if(diffMin>=126&&diffMin<=140){
        chasam=29;
      }
    }else if(diffMin>=141&&diffMin<=160){
      tctotal = 2.6;
      chasam=32;
    }else if(diffMin>=161&&diffMin<=180){
      tctotal = 3;
      chasam=39;
    }else if(diffMin>=181&&diffMin<=200){
      tctotal = 3.3;
      if(diffMin>=181&&diffMin<=186){
        chasam=40;
      }else if(diffMin>=186&&diffMin<=180){
        chasam=42;
      }
    }else if(diffMin>=201&&diffMin<=220){
      tctotal = 3.6;
      chasam=43;
    }else if(diffMin>=221&&diffMin<=240){
      tctotal = 4;
      chasam=52;
    }else if(diffMin>=241&&diffMin<=260){
      tctotal = 4.3;
    }else if(diffMin>=261&&diffMin<=280){
      tctotal = 4.6;
    }else if(diffMin>=281&&diffMin<=300){
      tctotal = 5;
    }else if(diffMin>=301&&diffMin<=320){
      tctotal = 5.3;
    }else if(diffMin>=321&&diffMin<=340){
      tctotal = 5.6;
    }else if(diffMin>=341&&diffMin<=360){
      tctotal = 6;
    }else if(diffMin>=361&&diffMin<=380){
      tctotal = 6.3;
    }else if(diffMin>=381&&diffMin<=400){
      tctotal = 6.6;
    }else if(diffMin>=401&&diffMin<=420){
      tctotal = 7;
    }else if(diffMin>=421&&diffMin<=440){
      tctotal = 7.3;
    }else if(diffMin>=441&&diffMin<=460){
      tctotal = 7.6;
    }else if(diffMin>=461&&diffMin<=480){
      tctotal = 8;
    }else if(diffMin>=481&&diffMin<=500){
      tctotal = 8.3;
    }else if(diffMin>=501&&diffMin<=520){
      tctotal = 8.6;
    }else if(diffMin>=521&&diffMin<=540){
      tctotal = 9;
    }else if(diffMin>=541&&diffMin<=560){
      tctotal = 9.3;
    }else if(diffMin>=561&&diffMin<=580){
      tctotal = 9.6;
    }else if(diffMin>=581&&diffMin<=600){
      tctotal = 10;
    }
    this.tctotal=tctotal;

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
      
     

      console.log(snap.val().roomhistory)
      if(snap.val().roomhistory!=undefined){
        for(var a in snap.val().roomhistory){

          console.log(a)
          var roomno=a;
          console.log(snap.val().roomhistory[a])
  
          for(var b in snap.val().roomhistory[a]){
            console.log("b is : "+b);
            if((b=="end_date")||(b=="end_date_full") ){
              console.log("b is : "+b +"so pass")
            }else{
              console.log(b);
              console.log(snap.val().roomhistory[a][b])
  
              for(var c in snap.val().roomhistory[a][b]){
                console.log(snap.val().roomhistory[a][b][c]);
                var end = snap.val().roomhistory[a][b][c].end_date_full
                var start = snap.val().roomhistory[a][b][c].date;
                console.log(end);
                console.log(start);
  
                var enddate = new Date(end);
                enddate.setHours(enddate.getHours() - 9);
                var startdate = new Date(start);
                console.log(enddate);
                console.log(enddate.getMonth())
                console.log(startdate);
                console.log(this.currentMonth+"????"+(Number(enddate.getMonth())+1)+"/"+(Number(startdate.getMonth())+1) +"start end");
                if(Number(enddate.getMonth())+1==this.currentMonth||Number(startdate.getMonth())+1==this.currentMonth){
                  console.log("ok");
                  var tctotal=0;
                var totalmoney=0;
                console.log(snap.val().roomhistory[a])
                console.log(end);
                      if(end==undefined){
  
                      }else{
                        var fullyear=snap.val().roomhistory[a][b][c].end_date_full.split("T")[0];
                        fullyear = fullyear.split("-")[0]+"-"+Number(fullyear.split("-")[1])+"-"+Number(fullyear.split("-")[2]);
                        console.log("290")
                        console.log(fullyear)
                        console.log(snap.val().roomhistory[a][b][c]);
                        console.log(snap.val().roomhistory[a][b][c].date)
                        console.log(this.currentstartday)
                        if(snap.val().roomhistory[a][b][c].date!=undefined){
                          console.log(snap.val().roomhistory[a][b][c].date.split(" ")[0])
                        
                          if(snap.val().roomhistory[a][b][c].date.split(" ")[0].trim()==this.currentstartday){
                            //영업일 오늘의 TC
                          console.log("match today")
    
    
                            console.log(end);
                            console.log("enddate"+enddate);
                            console.log(startdate)
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
                          console.log(snap.val().roomhistory[a][b][c])
                            // this.tcday.push({"date":start.split("T")[0],"day":start.split("T")[0].split("-")[2],"value":32000})
                              // this.mainlist.push({"incharge":snap.val().roomhistory[a][b][c].incharge, "end_date_full":snap.val().roomhistory[a][b][c].end_date_full,"enter_date_full":snap.val().roomhistory[a][b][c].date,"name":roomno,"room":snap.val().roomhistory[a][b][c].room,"tctotal":snap.val().roomhistory[a][b][c].tc,"money":snap.val().roomhistory[a][b][c].money})
                          console.log("today total : "+totalmoney);
                          console.log(this.mainlist)
                          }else{
                            //오늘이 아닌것의 값을 저장하도록. 
    
    
                            console.log(snap.val().roomhistory[a][b][c])
                            var end = snap.val().roomhistory[a][b][c].end_date_full
                            var start = snap.val().roomhistory[a][b][c].date;
                    
                            var enddate = new Date(end);
                            var startdate = new Date(start);
                            var diff = enddate.getTime() - startdate.getTime();
                            var diffDays = Math.ceil(diff / (1000) / 3600 * 60 );
                            console.log("diff calc");
                            console.log(enddate);
                            console.log(startdate);
                            console.log(diffDays)
    
    
                            tctotal = diffDays/60;
                            console.log(tctotal);
                            console.log(Math.floor(tctotal))
                            var mok = Math.floor(tctotal);
                            var nameoji = tctotal -Math.floor(tctotal);
                            console.log(nameoji)
                            //구 모델
                            // 10분 -> 0.17 
                            // 15분 -> 0.25
                            // 20분 -> 0.33 - 3만원
                            //30분 - > 0.5
                            // 40분 -> 0.67 - 6만원
                            // 1시간 -> 1 - 13만원 

                            //신모델 
                            //40분~65분까지 - 완티 -tc 갯수 1개
                            // 70분이라고하며. 1.1이 됨. 
                            //20분 전에끝나면 차비삼만원 0.3

                            //1분~10분까지는 0
                            //11분~20분까지는 0.3개 차비3만원
                            //21분~40분까지 0.6개 
                            //41분~60분까지 완티 1개

                            //연장시 . 
                            //6~10분까지가 차비 1만원 
                            
                            //80분이라고하면 1.3
                            //90분이면 1.6
                            //100분까지는 1.6개
                            //101분이면 2개
                            
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
                            console.log("diff calc:"+totalmoney);
                          }
                        }
                        if(snap.val().roomhistory[a][b][c].date!=undefined){
                          // this.thismonthmainlist.push({"date":snap.val().roomhistory[a][b][c].date, "end_date_full":snap.val().roomhistory[a][b][c].end_date_full,"enter_date_full":snap.val().roomhistory[a][b][c].enter_date_full,"name":snap.val().roomhistory[a][b][c].name,"room":snap.val().roomhistory[a][b][c].room,"start_date_full":snap.val().roomhistory[a][b][c].enter_date_full,"incharge":snap.val().roomhistory[a][b][c].incharge,"tctotal":tctotal.toFixed(2),"money":totalmoney*10000})
                        }
                        console.log(this.thismonthmainlist);
                      }
            }
          }
        }
          }
        }
      }
console.log(this.totaltcofday)
      if(this.totaltcofday==NaN||this.totaltcofday=="NaN"){
        this.totaltcofday=0;
      }
      this.totaltcofday = this.totaltcofday*10000
      console.log(this.attendance)
      console.log("team is "+this.team);
      console.log(this.mainlist);
      console.log(this.thismonthmainlist)
      for(var b in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]){
        var tc=0;
        b = ""+(Number(b)+1);
        var dayy="";
        for(var ab in this.thismonthmainlist){
          console.log(this.thismonthmainlist[ab]);
          console.log(this.thismonthmainlist[ab].date.split("T")[0]);
          var day = this.thismonthmainlist[ab].date.split("T")[0].split(" ")[0].split("-")[2];
          console.log("day and b : "+day+"/"+b);
          if(Number(b)==Number(day)){
            tc+=Number(this.thismonthmainlist[ab].money);
            console.log("tc is "+tc);
            if(this.thismonthmainlist[ab].date.indexOf(" ")!=-1){
              dayy=this.thismonthmainlist[ab].date.split(" ")[0];
            }else{
              dayy=this.thismonthmainlist[ab].date;
            }
            
         
         
          }
         
          //      }
      }
      console.log(this.currentYear+"-"+this.currentMonth+"-"+b);
      console.log(this.currentstartday)
      console.log("545...");
      if(this.currentYear+"-"+this.currentMonth+"-"+b==this.currentstartday){
        
        console.log(tc);
      //  this.todaymoney=tc;

console.log(b+",,,"+this.currentstartday);
console.log(this.tctotal);
// this.todaymoney+=Number(this.tctotal);
console.log("totaltcofday:"+this.totaltcofday)
console.log(tc);
      }
      this.tcday.push({"date":dayy,"day":b,"value":tc});

    }
    console.log(this.tcday);



    for(var ab in this.thismonthmainlist){
      console.log(this.thismonthmainlist[ab]);
      if(this.thismonthmainlist[ab].money!=NaN){

      console.log("add is "+this.thismonthmainlist[ab].money);
      this.totaltcofday+=Number(this.thismonthmainlist[ab].money);
      }
    };
    console.log("mainlist...");
    console.log(this.mainlist)
      });
      
      console.log(this.tcday);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AgasiPage');
    this.goToday();

    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }

    document.getElementById("ion-label-area-1").style.display = "";
    this.zone.run(()=>{
      this.activeclass='1'
    })
    this.generatecal();
    console.log(this.company)
    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      for(var a in snap.val()){

        console.log("mmmm")
        var flag = false;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            if(snap.val()[a].roomhistory!=undefined){
              console.log(snap.val()[a].roomhistory[this.currentstartday])
              for(var b in snap.val()[a].roomhistory[this.currentstartday]){
                console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
                console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                    this.mainlist2.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
                  
                }else{
  
                  // if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  //   this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  // this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  // }
                  
                }
                
              }
            }
          }
        }
      }
      console.log(this.mainlist)
      console.log(this.mainlist2)
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
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
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
    console.log("setmonth : "+num);
    this.zone.run(()=>{

    this.date.setMonth(num-1);
    this.getDaysOfMonth();

    this.date.setMonth(num-1);
    this.getDaysOfMonth();

    this.generatecal();
    });
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
