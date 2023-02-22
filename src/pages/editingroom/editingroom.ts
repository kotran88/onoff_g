import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
/**
 * Generated class for the EditingroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editingroom',
  templateUrl: 'editingroom.html',
})
export class EditingroomPage {
  a:any;
  room:any;
  incharge:any;
  insert_date:any;
  status:any;
  wt:any;
  key:any;
  numofpeople:any="";
  currentstartday:any="";
  currentstart:any="";
  end_date:any="";
  date:any;
  firemain = firebase.database().ref();
  company:any;
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
     this.company = localStorage.getItem("company");

     this.currentstart=localStorage.getItem("start");
     this.currentstartday=localStorage.getItem("startDate");
    console.log(this.a);
    this.room = this.a.name
    this.key=this.a.key;
    this.status = this.a.status;
    this.date=this.a.date;
    this.numofpeople = this.a.numofpeople;
    // this.end_date=this.a.end_date;
    this.incharge=this.a.incharge;
    this.wt=this.a.wt;
    this.insert_date=this.a.insert_date;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditingroomPage');
  }
  clicking(v){
    if(v==1){
      this.status="entered";
    }
    if(v==2){
      this.status="clean";
    }
    if(v==3){
      this.status="fin";
    }
    if(v==4){
      this.status="reserved";
    }

  }
  cancel(){

    this.view.dismiss();
  }
  addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }
  confirm(){
    console.log(this.end_date);
    if(this.end_date==undefined){
      
    }
    this.end_date = new Date();
    console.log(this.end_date);
    var end_date_full =  new Date();
    var a = this.addHours(9,end_date_full);
    console.log(a)
    // end_date_full = this.end_date.setHours(this.end_date.getHours()+9);
    // console.log(this.end_date);
    if(this.status=="fin"){
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"flag":false})
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).once("value",snap=>{
          console.log(snap.val());
          this.firemain.child("users").once("value",snap2=>{
            for(var b in snap2.val()){
            //   console.log(b);
              if(snap2.val()[b].type=="agasi"){
                for(var aa in snap.val().agasi){
                  if(snap2.val()[b].name == snap.val().agasi[aa].name){
                    console.log("100...");
                    console.log(snap2.val()[b]);
                    console.log(snap2.val()[b].name);


                    console.log(snap.val().agasi[aa]);
                    var totalmoney=Number(this.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[0]);
                    var tctotal=Number(this.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[1]);
                    console.log(totalmoney);
                    console.log(tctotal);

                    this.firemain.child("users").child(snap2.val()[b].id).child("current").remove();
                    var dte = new Date();

                    var date = new Date();
                    var year=date.getFullYear();
                    var month=date.getMonth()+1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var min = date.getMinutes();
    dte.setHours(dte.getHours()+9);
              this.firemain.child("users").child(snap2.val()[b].id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update({"name":snap.val().agasi[aa].name,  "date":snap.val().agasi[aa].date,"incharge":this.a.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
                    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(aa).update({"roomno":this.a.name,"incharge":this.a.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
                  }
                }
               

              }
            }
          });
      });
    
    }else{
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"flag":true})
    }
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
      "name":this.room,
      "wt":this.wt,
      "insert_date":this.insert_date,
      // "end_date":this.end_date.getHours()+":"+this.end_date.getMinutes(),
      // "end_date_full":end_date_full,
      "status":this.status,
      "numofpeople":this.numofpeople,
      "incharge":this.incharge,
    })
    this.view.dismiss();
  }
  getTC(startdate,pauseTime){
    if(pauseTime==undefined){
      pauseTime=0;
    }
    console.log(pauseTime);
    console.log("GETTC");
    console.log(startdate);
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();


    var now = new Date();

    var diffend = new Date(startdate.date);
    diffend.setHours(diffend.getHours());
    var start = diffend.getHours()+":"+diffend.getMinutes();
   
    var diff = now.getTime() - diffend.getTime();
    var diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
    console.log(diffMin)
    console.log("is diffmin");
    diffMin=diffMin-pauseTime;
    console.log("new diffmin"+diffMin);
    var tctotal=0;
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
    var newtctotal = Number(diffMin)/60;
    newtctotal = Number(tctotal.toFixed(2));
    var mok = Math.floor(newtctotal);
    var nameoji = newtctotal -Math.floor(newtctotal);
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
//11분~20분까지는 0.3개 차삼 3만원 추가.
//21분~40분까지 0.6개 차삼 3만원 추가. 총 차삼 6만원  추가. 이때 반티가 올라가는 찡이하나 올라가는거고  총 찡 1개 
//41분~60분까지 tc 1개(완티) 13만원. 차삼 9만원 추가.  완티하나발생해서  총찡 1개. 
//61분~80분까지 tc 1.3개 13만원 + 차삼 12만원 = 25만원  총 찡 1개
//81분~100분까지 tc 1.6개 13만원 + 차삼 15만원 = 28만원  반티가 발생하니까 찡이 하나  총 찡 2개
//101분~120분까지 tc 2개 13만원 + 차삼 18만원 = 31만원 완티가 발생하니까 찡이 하나 더올라가고.  총 찡 2개  
//이상 조판찡 출근부 정산 들어가서 날짜위에는 다 날려버려함.  날짜를 클릭했을때, 아래에 조판찡내역을 볼수있는 페이지가 하나 있어야함.  ///
//완티 한개마다 부장에게 5천원이 적립. 부장찡에 대해서는 금액을 정할수있어야함. 
//이상 부장찡 , 이건 웹페이지에서 경리에서 인센티브 탭을 클릭했을때 나와야함.

// 관리자페이지에서 부장인센티브, 조판찡에관해서 날짜 클릭시 해당날짜의 인센티브, 조판찡 과 누적정보가 나와야함. 





//완티 2개로 끝났으면, 찡은 2개 


                            //연장시 . 
                            //6~10분까지가 차비 1만원 
                            
                            //80분이라고하면 1.3
                            //90분이면 1.6
                            //100분까지는 1.6개
                            //101분이면 2개
                            
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

    var totalmoney = Number(moneyvalue);
    console.log(totalmoney);
    console.log(startdate.name)
    console.log("chasam is : "+chasam);
    return chasam+","+tctotal




  }
}
