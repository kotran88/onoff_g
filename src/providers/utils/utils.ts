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
  tc:any=0;
  newnumber:any=0;
  constructor(public loading:LoadingController) {
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
    console.log("ddddddismissLoading ");
    console.log(this.lloading);
    if(this.lloading!=undefined){
      this.lloading.dismiss();
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
    console.log("loading show");
    this.lloading =  this.loading.create({
      spinner: 'hide',
      content: `<img src="assets/img/wadloading.gif" />`
    });
    this.lloading.present();
    console.log(this.lloading);
  }
  // getMoneyFromTC(tc){

  //   if(tc==0.3){
  //     return 3;
  //   }else if(tc==0.6){
  //     return 6;
  //   }else if(tc==1){
  //     return 13;
  //   }else if(tc==1.3){
  //     return 16;
  //   }else if(tc==1.6){
  //     return 19;
  //   }else if(tc==2){
  //     return 26;
  //   }else if(tc==2.3){
  //     return 29;
  //   }else if(tc==2.6){
  //     return 32;
  //   }else if(tc==3){
  //     return 39;
  //   }else if(tc==3.3){
  //     return 42;
  //   }else if(tc==3.6){
  //     return 45;
  //   }else if(tc==4){
  //     return 52;
  //   }else if(tc==4.3){
  //     return 55;
  //   }else if(tc==4.6){
  //     return 58;
  //   }else if(tc==5){
  //     return 65;
  //   }else if(tc==5.3){
  //     return 68;
  //   }else if(tc==5.6){

  //     return 71;
  //   }else if(tc==6){
  //     return 78;
  //   }else if(tc==6.3){
  //     return 81;
  //   }else if(tc==6.6){
  //     return 84;
  //   }else if(tc==7){
  //     return 91;
  //   }else if(tc==7.3){
  //     return 94;
  //   }else if(tc==7.6){
  //     return 97;
  //   }else if(tc==8){
  //     return 104;
  //   }else if(tc==8.3){
  //     return 107;
  //   }else if(tc==8.6){
  //     return 110;
  //   }else if(tc==9){
  //     return 117;
  //   }else if(tc==9.3){
  //     return 120;
  //   }else if(tc==9.6){
  //     return 123;
  //   }else if(tc==10){
  //     return 130;
  //   }else if(tc==10.3){
  //     return 133;
  //   }else if(tc==10.6){
  //     return 136;
  //   }else if(tc==11){
  //     return 143;
  //   }else if(tc==11.3){
  //     return 146;
  //   }else if(tc==11.6){
  //     return 149;
  //   }else if(tc==12){
  //     return 156;
  //     }
  // }

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
