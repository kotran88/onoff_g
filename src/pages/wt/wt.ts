import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { MenuController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';
import { OrderPage } from '../order/order';
import { OrdermainPage } from '../ordermain/ordermain';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import { AccountPage } from '../account/account';
import { UtilsProvider } from '../../providers/utils/utils';
@Component({
  selector: 'page-wt',
  templateUrl: 'wt.html',
})
export class WtPage {
  name:any="";
  mainlist=[];
  yeonti:any="";
  allmainlist=[];
  interval:any;
  obj = [];
  firemain = firebase.database().ref();
  count : number[] = new Array();
  orderlist=[];
  todaymoney=0;
  totalcount=0;
  totalprice=0;
  currentstartday:any="";
  currentstart:any="";
  company:any;
  constructor(public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.company=localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
  }
  
  gotolink(value){
    if(value == 0){
      this.navCtrl.push(OrdermainPage,{flag:true}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("refresh...");
          this.generate();
        });
      });
    }else if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true});
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true});
    }else if(value==5){
      this.navCtrl.push(GongjiPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(InfoPage);
    }
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
generate(){
  console.log("generate...");
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){

        for(var b in snap.val()[a].roomhistory){
          for(var c in snap.val()[a].roomhistory[b]){
            if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
              if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                console.log(snap.val()[a].roomhistory[b][c]);
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
      var chasamarray=[];
      var yeontireason="";
      var numofpeople = snap.val()[a].roomhistory[b][c].numofpeople;
      var logic = snap.val()[a].roomhistory[b][c].logic;
      var inagasi = 0;
      for(var cccc in mainlist.agasi){
        inagasi++;
        console.log(mainlist.agasi[cccc].tc)
        newtc += Math.floor(mainlist.agasi[cccc].tc)
        tcarray.push(Math.floor(mainlist.agasi[cccc].tc))

        chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
      
      }
      console.log(numofpeople+"newtc"+newtc);
      //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
      // 나머지 완티의 갯수를 고려해서 계산. 
                
                console.log(snap.val()[a].roomhistory[b][c].orderlist);
                console.log(snap.val()[a].roomhistory[b][c].orderlist.roomno);
                var orderl=[];
                var orderprice=0;
                var tp=0;
                var tbottle=0;
                for(var d in snap.val()[a].roomhistory[b][c].orderlist.orderlist){

                  if(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].category=="주류"){
                    tbottle+=Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num);
                  }
                  orderprice+= (Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price) );
                  orderl.push(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d])
                  tp += snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num;
                }
               
                console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
                var firstsumofv=0;
                var totalsum=0;
                var allzero=false;
                console.log(tcarray.length)
                if(logic){
                  tbottle=tbottle-1;
                  yeontireason+="중/대방로직에 따른 술병 차감 -1 , "
                }
                if(tcarray.length>numofpeople){
                  var minVal = Math.min.apply(null, tcarray);
                  console.log("minvalue : "+minVal);
                  var maxVal = Math.max.apply(null, tcarray);
                  console.log("maxvalue : "+maxVal);
                  firstsumofv=minVal+maxVal-tbottle
                  yeontireason += "인원수<아가씨, 가장큰 tc"+maxVal+"+가장작은 tc"+minVal+"에서 총술병"+tbottle+"를 뺀값."
                }
                
                var agasiover=false;
                for(var abab in tcarray){
                  console.log(tcarray[abab]+",,,"+tbottle)
                  totalsum+=tcarray[abab];
                  
                  if(tcarray[abab]>tbottle){ //아가씨 각각의 tc가 술병수보다 많다면, 
                    var v = tcarray[abab]-tbottle;
                    console.log(v);
                    firstsumofv+=v;
                    agasiover=true;
                  }if(tcarray[abab]==tbottle){
                    firstsumofv+=0;
                  }else{
                    firstsumofv+=0;
                  }
                }
                if(agasiover){
                  yeontireason += "각각의 tc에서 술병값을 뺀값"
                }
                console.log(tcarray)
                console.log("firstsumofv : "+firstsumofv);
                var yeonti=firstsumofv;

                console.log("yeontiiiii : "+this.yeonti);
                console.log("total bottle : "+tbottle);
                  console.log(mainlist)
                  var totaltc=0;
                  var totalmoney=0;
                  for(var aga in mainlist.agasi){
                    if(mainlist.agasi[aga].tc==undefined){

                    }else{
                      console.log("mainagasi tc : "+mainlist.agasi[aga].tc);
                      totaltc+=Number(mainlist.agasi[aga].tc);
                      if(mainlist.agasi[aga].totalmoney==undefined){

                        totalmoney+=Number(mainlist.agasi[aga].money);
                      }else{

                        totalmoney+=Number(mainlist.agasi[aga].totalmoney);
                      }
                    }
                  }
                  console.log(tp);
                  console.log("totalmoney....")
                  totalmoney=totalmoney*10000;

                  console.log(totalmoney);
                  this.todaymoney += tp+totalmoney+Number(yeonti*10000);
                  console.log(this.todaymoney);
                  this.orderlist.push({"inagasi":inagasi, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":snap.val()[a].roomhistory[b][c].orderlist.orderDate,"roomno":snap.val()[a].roomhistory[b][c].orderlist.roomno, "value":orderl});
              }
             
              
            }
           
          }
        }
      }
    }
    for(var cc in this.orderlist){
    }
    
    console.log(this.orderlist)
  });

  this.firemain.child("company").child(this.company).child('park').once('value').then((snap)=>{
    for(var a in snap.val()){
      var todaylist=[];
      var countingvalue=0;
      var countingprice =0;

      // this.mainlist.push(snap.val()[a]);
      // todaylist.push({"carnum":snap.val()[a].carnum,"date":snap.val()[a].date,"incharge":snap.val()[a].incharge,"key":snap.val()[a].key,"price":snap.val()[a].price,"receiver":snap.val()[a].receiver,"room":snap.val()[a].room,"time":snap.val()[a].time,"type":snap.val()[a].type});
      for(var b in snap.val()[a]){

        todaylist.push(snap.val()[a][b]);
      countingvalue++;
      countingprice+=Number(snap.val()[a][b].price);
        if(this.currentstartday==a){
          this.totalcount++;
          this.totalprice+=Number(snap.val()[a][b].price);
          this.mainlist.push(snap.val()[a][b]);

        }

        // this.allmainlist.push(snap.val()[a][b]);
        
      }
    }
  });

}

ionViewDidLeave(){
  clearInterval(this.interval)
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorpagePage');

    this.generate();
    this.interval = setInterval(()=>{

      this.generate();
    },1000*60)


  }

}
