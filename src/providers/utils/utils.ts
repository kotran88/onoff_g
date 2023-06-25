import { Injectable } from '@angular/core';

import { IonicPage, ViewController,LoadingController,ModalController,NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {
  lloading:any;
  loading;
  tc:any=0;
  newnumber:any=0;
  constructor(public _loadingCtrl:LoadingController) {
    console.log('Hello UtilsProvider Provider');
  }
  testing(){
    return "haha";
  }

  commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
  }

   dismissLoading() {
    if(this.loading){
      this.loading.dismiss();
      this.loading = null;
  }
  }

  loadingnew() {
    console.log("loading show");
    this.lloading =  this.loading.create({
      spinner: 'hide',
      content:"loading...!!!"

    });
    this.lloading.present();
    console.log(this.lloading);
  }
   presentLoading() {
    if(!this.loading){
      this.loading = this._loadingCtrl.create({
          content: 'Please Wait...'
      });
      this.loading.present();
  }

    // console.log("loading show");
    // this.lloading =  this.loading.create({
    //   spinner: 'hide',
    //   content: `<img src="assets/img/wadloading.gif" />`
    // });
    // this.lloading.present();
    // console.log(this.lloading);
  }
  

  getTCfromtc(tc){

    this.tc = localStorage.getItem("tc");
    var totaltc= 1000;
    if(tc==0){
      totaltc=0;
    }else if(tc==0.3){
      totaltc=3;
    }else if(tc==0.6){
      totaltc=6;
    }else if(tc==1){
      totaltc=this.tc*tc;
    }else if(tc==1.1){
      totaltc=14;
    }else if(tc==1.3){
      totaltc=16;
    }else if(tc==1.6){
      totaltc=19;
    }else if(tc==2){
      totaltc=this.tc*tc;
    }else if(tc==2.1){
      totaltc=27;
    }else if(tc==2.3){
      totaltc=30;
    }else if(tc==2.6){
      totaltc=32;
    }else if(tc==3){
      totaltc=this.tc*tc;
    }else if(tc==3.1){
      totaltc=40;
    }else if(tc==3.3){
      totaltc=42;
    }else if(tc==3.6){
      totaltc=43;
    }else if(tc==4){
      totaltc=this.tc*tc;
    }else if(tc==4.1){
      totaltc=53;
    }else if(tc==4.3){
      totaltc=55;
    }else if(tc==4.6){
      totaltc=56;
    }else if(tc==5){
      totaltc=this.tc*tc;
    }else if(tc==5.1){
      totaltc=66;
    }else if(tc==5.3){
      totaltc=68;
    }else if(tc==5.6){
      totaltc=69;
    }else if(tc==6){
      totaltc=this.tc*tc;
    }else if(tc==6.1){
      totaltc=79;
    }else if(tc==6.3){
      totaltc=81;
    }else if(tc==6.6){
      totaltc=82;
    }else if(tc==7){
      totaltc=this.tc*tc;
    }else if(tc==7.1){
      totaltc=92;
    }else if(tc==7.3){
      totaltc=94;
    }else if(tc==7.6){
      totaltc=95;
    }else if(tc==8){
      totaltc=this.tc*tc;
    }else if(tc==8.1){
      totaltc=105;
    }else if(tc==8.3){
      totaltc=107;
    }else if(tc==8.6){
      totaltc=108;
    }else if(tc==9){
      totaltc=this.tc*tc;
    }else if(tc==9.1){
      totaltc=118;
    }else if(tc==9.3){
      totaltc=120;
    }else if(tc==9.6){
      totaltc=121;
    }else if(tc==10){
      totaltc=this.tc*tc;
    }else if(tc==10.1){
      totaltc=131;
    }else if(tc==10.3){
      totaltc=133;
    }else if(tc==10.6){
      totaltc=134;
    }else if(tc==11){
      totaltc=this.tc*tc;
    }else if(tc==11.1){
      totaltc=144;
    }else if(tc==11.3){
      totaltc=146;
    }else if(tc==11.6){
      totaltc=147;
    }else if(tc==12){
      totaltc=this.tc*tc;
    }else if(tc==12.1){
      totaltc=157;
    }else if(tc==12.3){
      totaltc=159;
    }else if(tc==12.6){
      totaltc=160;
    }else if(tc==13){
      totaltc=this.tc*tc;
    }else if(tc==13.1){
      totaltc=170;
    }else if(tc==13.3){
      totaltc=172;
    }else if(tc==13.6){
      totaltc=173;
    }else if(tc==14){
      totaltc=this.tc*tc;
    }else if(tc==14.1){
      totaltc=183;
    }else if(tc==14.3){
      totaltc=185;
    }else if(tc==14.6){
      totaltc=186;
    }else if(tc==15){
      totaltc=this.tc*tc;
    }else if(tc==15.1){
      totaltc=196;
    }else if(tc==15.3){
      totaltc=198;
    }else if(tc==15.6){
      totaltc=199;
    }else if(tc==16){
      totaltc=this.tc*tc;
    }else if(tc==16.1){
      totaltc=209;
    }else if(tc==16.3){
      totaltc=211;
    }else if(tc==16.6){
      totaltc=212;
    }else if(tc==17){
      totaltc=this.tc*tc;
    }else if(tc==17.1){
      totaltc=222;
    }else if(tc==17.3){
      totaltc=224;
    }else if(tc==17.6){
      totaltc=225;
    }else if(tc==18){
      totaltc=this.tc*tc;
    }else if(tc==18.1){
      totaltc=235;
    }else if(tc==18.3){
      totaltc=237;
    }else if(tc==18.6){
      totaltc=238;
    }else if(tc==19){
      totaltc=this.tc*tc;
    }else if(tc==19.1){
      totaltc=248;
    }else if(tc==19.3){
      totaltc=250;
    }else if(tc==19.6){
      totaltc=251;
    }else if(tc==20){
      totaltc=this.tc*tc;
    }else if(tc==20.1){ 
      totaltc=261;
    }else if(tc==20.3){
      totaltc=263;
    }else if(tc==20.6){
      totaltc=264;
    }else if(tc==21){
      totaltc=this.tc*tc;
    }else if(tc==21.1){
      totaltc=274;
    }else if(tc==21.3){
      totaltc=276;
    }else if(tc==21.6){
      totaltc=277;
    }else if(tc==22){
      totaltc=this.tc*tc;
    }else if(tc==22.1){
      totaltc=287;
    }else if(tc==22.3){
      totaltc=289;
    }else if(tc==22.6){
      totaltc=290;
    }else if(tc==23){
      totaltc=this.tc*tc;
    }else if(tc==23.1){
      totaltc=300;
    }else if(tc==23.3){
      totaltc=302;
    }else if(tc==23.6){
      totaltc=303;
    }else if(tc==24){
      totaltc=this.tc*tc;
    }



    console.log(totaltc)
    return totaltc
  }
  getTC(startdate,pauseTime){

    this.tc = localStorage.getItem("tc");
    if(pauseTime==undefined){
      pauseTime=0;
    }
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
    diffMin=diffMin-pauseTime;
    var tctotal=0;
    var chasam=0;
    var bantee=0;
//1분~10분까지는 0
//11분~20분까지는 0.3개 차삼 3만원 추가.
//21분~40분까지 0.6개 차삼 3만원 추가. 총 차삼 6만원  추가. 이때 반티가 올라가는 찡이하나 올라가는거고  총 찡 1개 
//41분~60분까지 tc 1개(완티) 13만원. 차삼 9만원 추가.  완티하나발생해서  총찡 1개. 
//61분~80분까지 tc 1.3개 13만원 + 차삼 12만원 = 25만원  총 찡 1개
//81분~100분까지 tc 1.6개 13만원 + 차삼 15만원 = 28만원  반티가 발생하니까 찡이 하나  총 찡 2개
//101분~120분까지 tc 2개 13만원 + 차삼 18만원 = 31만원 완티가 발생하니까 찡이 하나 더올라가고.  총 찡 2개
var cha3=0;
//조판찡이,
    if(diffMin<=10){
      tctotal =0;
      chasam=0;
    }else if(diffMin>=11&&diffMin<=20){
      tctotal = 0.3;
      cha3=3;
      chasam=3;
    }else if(diffMin>=21&&diffMin<=40){
      tctotal = 0.6;
      bantee=1;
      chasam=6;
      cha3=3;
    }else if(diffMin>=41&&diffMin<=60){
      tctotal = 1;
      bantee=0;
      chasam=this.tc*1;
      cha3=3;
    }else if(diffMin>=61&&diffMin<=80){
      bantee=0;
      cha3=3;
      if(diffMin>=61&&diffMin<=66){

      tctotal = 1.1;
        chasam=14;
      }else if(diffMin>=67&&diffMin<=80){

      tctotal = 1.3;
        chasam=16;
      }
    }else if(diffMin>=81&&diffMin<=100){
      tctotal = 1.6;
      bantee=1;
      cha3=3;
      chasam=19;
    }else if(diffMin>=101&&diffMin<=120){
      tctotal = 2;
      bantee=0;
      chasam=this.tc*2;
    }else if(diffMin>=121&&diffMin<=140){
      bantee=0;
      if(diffMin>=121&&diffMin<=126){
        tctotal = 2.1;
        chasam=27;
      }else if(diffMin>=126&&diffMin<=140){

      tctotal = 2.3;
        chasam=29;
      }
    }else if(diffMin>=141&&diffMin<=160){
      tctotal = 2.6;
      bantee=1;
      chasam=32;
    }else if(diffMin>=161&&diffMin<=180){
      tctotal = 3;
      bantee=0;
      chasam=this.tc*3;
    }else if(diffMin>=181&&diffMin<=200){
      bantee=0;
      if(diffMin>=181&&diffMin<=186){
        tctotal = 3.1;
      chasam=40;
      }else if(diffMin>=186&&diffMin<=200){
        tctotal = 3.3;
      chasam=42;
      }
  }else if(diffMin>=201&&diffMin<=220){
      tctotal = 3.6;
      bantee=1;
      chasam=43;
  }else if(diffMin>=221&&diffMin<=240){
      tctotal = 4;
      bantee=0;
      chasam=this.tc*4;
  }else if(diffMin>=241&&diffMin<=260){
      bantee=0;
      if(diffMin>=241&&diffMin<=246){
        tctotal = 4.1;
      chasam=53;
      }else if(diffMin>=246&&diffMin<=260){
        tctotal = 4.3;
      chasam=55;
      }
    }else if(diffMin>=261&&diffMin<=280){
      tctotal = 4.6;
      bantee=1;
    }else if(diffMin>=281&&diffMin<=300){
      tctotal = 5;
      chasam=this.tc*5;
      bantee=0;
    }else if(diffMin>=301&&diffMin<=320){
      bantee=0;
      if(diffMin>=301&&diffMin<=306){
        tctotal = 5.1;
        chasam=66;
        }else if(diffMin>=306&&diffMin<=320){
          tctotal = 5.3;
        chasam=68;
        }
    }else if(diffMin>=321&&diffMin<=340){
      tctotal = 5.6;
      chasam=71;
      bantee=6;
    }else if(diffMin>=341&&diffMin<=360){
      tctotal = 6;
      bantee=0;
      chasam=this.tc*6;
    }else if(diffMin>=361&&diffMin<=380){
      bantee=0;
      if(diffMin>=361&&diffMin<=366){
        tctotal = 6.1;
        chasam=69;
        }else if(diffMin>=366&&diffMin<=380){
          tctotal = 6.3;
        chasam=81;
        }
    }else if(diffMin>=381&&diffMin<=400){
      tctotal = 6.6;
      bantee=1;
      chasam=84;
    }else if(diffMin>=401&&diffMin<=420){
      tctotal = 7;
      chasam=this.tc*7;
      bantee=0;
    }else if(diffMin>=421&&diffMin<=440){
      bantee=0;
      if(diffMin>=421&&diffMin<=426){
        tctotal = 7.1;
        chasam=92;
      }else if(diffMin>=426&&diffMin<=440){
        tctotal = 7.3;
        chasam=94;
      }

    }else if(diffMin>=441&&diffMin<=460){
      tctotal = 7.6;
      bantee=1;
      chasam = 97;
    }else if(diffMin>=461&&diffMin<=480){
      tctotal = 8;
      chasam=this.tc*8
      bantee=0;
    }else if(diffMin>=481&&diffMin<=500){
      bantee=0;
      if(diffMin>=481&&diffMin<=486){
        tctotal = 8.1;
        chasam=105
      }else if(diffMin>=486&&diffMin<=500){
        tctotal = 8.3;
        chasam=107
      }
    }else if(diffMin>=501&&diffMin<=520){
      tctotal = 8.6;
      bantee=1;
      chasam=110;
    }else if(diffMin>=521&&diffMin<=540){
      tctotal = 9;
      chasam=this.tc*9;
      bantee=0;
    }else if(diffMin>=541&&diffMin<=560){
      bantee=0;
      if(diffMin>=541&&diffMin<=546){
        tctotal = 9.1;
        chasam=118;
      }else if(diffMin>=546&&diffMin<=560){
        tctotal = 9.3;
        chasam=120;
      }

    }else if(diffMin>=561&&diffMin<=580){
      tctotal = 9.6;
      bantee=1;
      chasam=123;
    }else if(diffMin>=581&&diffMin<=600){
      tctotal = 10;
      bantee=0;
      chasam=this.tc*10;
    }else if(diffMin>=601&&diffMin<=620){
      bantee=0;
      if(diffMin>=601&&diffMin<=606){
        tctotal = 10.1;
        chasam=131;
      }else if(diffMin>=606&&diffMin<=620){
        tctotal = 10.3;
        chasam=133;
      }
    }else if(diffMin>=621&&diffMin<=640){
      tctotal = 10.6;
      chasam=136;
      bantee=1;
    }else if(diffMin>=641&&diffMin<=660){
      tctotal = 11;
      bantee=0;
      chasam=this.tc*11;
    }else if(diffMin>=661&&diffMin<=680){
      bantee=0;
      if(diffMin>=661&&diffMin<=666){
        tctotal = 11.1;
        chasam=144;
      }else if(diffMin>=666&&diffMin<=680){
        tctotal = 11.3;
        chasam=146;
      }
    }else if(diffMin>=681&&diffMin<=700){
      tctotal = 11.6;
      bantee=12;
      chasam=149;
    }else if(diffMin>=701&&diffMin<=720){
      tctotal = 12;
      chasam=this.tc*12;
      bantee=0;
    }else if(diffMin>=721&&diffMin<=740){
      bantee=0;
      if(diffMin>=721&&diffMin<=726){
        tctotal = 12.1;
        chasam=157;
      }else if(diffMin>=726&&diffMin<=740){
        tctotal = 12.3;
        chasam=159;
      }
    }else if(diffMin>=741&&diffMin<=760){
      tctotal = 12.6;
      bantee=1;
      chasam=162;
    }else if(diffMin>=761&&diffMin<=780){
      tctotal = 13;
      bantee=0;
      chasam=this.tc*13;
    }else if(diffMin>=781&&diffMin<=800){
      bantee=0;
      if(diffMin>=781&&diffMin<=786){
        tctotal = 13.1;
        chasam=170;
      }else if(diffMin>=786&&diffMin<=800){
        tctotal = 13.3;
        chasam=172;
      }
    }else if(diffMin>=801&&diffMin<=820){
      tctotal = 13.6;
      bantee=1;
      chasam=175;
    }else if(diffMin>=821&&diffMin<=840){
      tctotal = 14;
      chasam=this.tc*14;
      bantee=0;
    }else if(diffMin>=841&&diffMin<=860){
      bantee=0;
      if(diffMin>=841&&diffMin<=846){
        tctotal = 14.1;
        chasam=183;
      }else if(diffMin>=846&&diffMin<=860){
        tctotal = 14.3;
        chasam=185;
      }
    }else if(diffMin>=861&&diffMin<=880){
      tctotal = 14.6;
      bantee=1;
      chasam=188;
    }else if(diffMin>=881&&diffMin<=900){
      tctotal = 15;
      bantee=0;
      chasam=this.tc*15;
    }else if(diffMin>=901&&diffMin<=920){
      bantee=0;
      if(diffMin>=901&&diffMin<=906){
        tctotal = 15.1;
        chasam=196;
      }else if(diffMin>=906&&diffMin<=920){
        tctotal = 15.3;
        chasam=198;
      }
    }else if(diffMin>=921&&diffMin<=940){
      tctotal = 15.6;
      bantee=1;
      chasam=201;
    }else if(diffMin>=941&&diffMin<=960){
      tctotal = 16;
      chasam=this.tc*16;
      bantee=0;
    }else if(diffMin>=961&&diffMin<=980){
      bantee=0;
      if(diffMin>=961&&diffMin<=966){
        tctotal = 16.1;
        chasam=209;
      }else if(diffMin>=966&&diffMin<=980){
        tctotal = 16.3;
        chasam=211;
      }
    }else if(diffMin>=981&&diffMin<=1000){
      tctotal = 16.6;
      bantee=1;
      chasam=214;
    }else if(diffMin>=1001&&diffMin<=1020){
      tctotal = 17;
      bantee=0;
      chasam=this.tc*17;
    }else if(diffMin>=1021&&diffMin<=1040){
      bantee=0;
      if(diffMin>=1021&&diffMin<=1026){
        tctotal = 17.1;
        chasam=222;
      }else if(diffMin>=1026&&diffMin<=1040){
        tctotal = 17.3;
        chasam=224;
      }
    }else if(diffMin>=1041&&diffMin<=1060){
      tctotal = 17.6;
      bantee=1;
      chasam=227;
    }else if(diffMin>=1061&&diffMin<=1080){
      tctotal = 18;
      chasam=this.tc*18;
      bantee=0;
      
    }else if(diffMin>=1081&&diffMin<=1100){
      bantee=0;
      if(diffMin>=1081&&diffMin<=1086){
        tctotal = 18.1;
        chasam=235;
      }else if(diffMin>=1086&&diffMin<=1100){
        tctotal = 18.3;
        chasam=237;
      }
    }else if(diffMin>=1101&&diffMin<=1120){
      tctotal = 18.6;
      bantee=1;
      chasam=240;
    }else if(diffMin>=1121&&diffMin<=1140){
      tctotal = 19;
      bantee=0;
      chasam=this.tc*19;
    }else if(diffMin>=1141&&diffMin<=1160){
      bantee=0;
      if(diffMin>=1141&&diffMin<=1146){
        tctotal = 19.1;
        chasam=248;
      }else if(diffMin>=1146&&diffMin<=1160){
        tctotal = 19.3;
        chasam=250;
      }
    }else if(diffMin>=1161&&diffMin<=1180){
      tctotal = 19.6;
      bantee=1;
      chasam=253;
    }else if(diffMin>=1181&&diffMin<=1200){
      tctotal = 20;
      chasam=this.tc*20;
      bantee=0;
    }else if(diffMin>=1201&&diffMin<=1220){
      bantee=0;
      if(diffMin>=1201&&diffMin<=1206){
        tctotal = 20.1;
        chasam=261;
      }else if(diffMin>=1206&&diffMin<=1220){
        tctotal = 20.3;
        chasam=263;
      }
    }else if(diffMin>=1221&&diffMin<=1240){
      tctotal = 20.6;
      bantee=1;
      chasam=266;
    }else if(diffMin>=1241&&diffMin<=1260){
      tctotal = 21;
      bantee=0;
      chasam=this.tc*21;
    }else if(diffMin>=1261&&diffMin<=1280){
      bantee=0;
      if(diffMin>=1261&&diffMin<=1266){
        tctotal = 21.1;
        chasam=274;
      }else if(diffMin>=1266&&diffMin<=1280){
        tctotal = 21.3;
        chasam=276;
      }
    }else if(diffMin>=1281&&diffMin<=1300){
      tctotal = 21.6;
      bantee=1;
      chasam=279;
    }else if(diffMin>=1301&&diffMin<=1320){
      tctotal = 22;
      chasam=this.tc*22;
      bantee=0;
    }else if(diffMin>=1321&&diffMin<=1340){
      bantee=0;
      if(diffMin>=1321&&diffMin<=1326){
        tctotal = 22.1;
        chasam=287;
      }else if(diffMin>=1326&&diffMin<=1340){
        tctotal = 22.3;
        chasam=289;
      }
    }else if(diffMin>=1341&&diffMin<=1360){
      tctotal = 22.6;
      bantee=1;
      chasam=292;
    }else if(diffMin>=1361&&diffMin<=1380){
      tctotal = 23;
      bantee=0;
      chasam=this.tc*23;
    }else if(diffMin>=1381&&diffMin<=1400){
      bantee=0;
      if(diffMin>=1381&&diffMin<=1386){
        tctotal = 23.1;
        chasam=300;
      }else if(diffMin>=1386&&diffMin<=1400){
        tctotal = 23.3;
        chasam=302;
      }
    }else if(diffMin>=1401&&diffMin<=1420){
      tctotal = 23.6;
      bantee=1;
      chasam=305;
    }else if(diffMin>=1421&&diffMin<=1440){
      tctotal = 24;
      chasam=this.tc*24;
      bantee=0;
    }

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
                            
    return chasam+","+tctotal+","+bantee;




  }

}
