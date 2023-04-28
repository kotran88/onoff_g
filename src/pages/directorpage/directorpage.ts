import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { MenuController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import { AccountPage } from '../account/account';
import { HistoryPage } from '../history/history';
import { UtilsProvider } from '../../providers/utils/utils';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-directorpage',
  templateUrl: 'directorpage.html',
})
export class DirectorpagePage {
  name:any="";
  nickname:any="";
  mainlist=[];
  allmainlist=[];
  directorList=[];
  todaymoney=0;
  yeonti:any="";
  obj = [];
  interval:any;
  firemain = firebase.database().ref();
  count : number[] = new Array();
  orderlist=[];
  totalcount=0;
  totalprice=0;
  paymentflag:any=false;
  currentstartday:any="";
  currentstart:any="";
  company:any;
  constructor(public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");
    this.directorList=this.navParams.get("user");
    console.log(this.directorList);
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");


    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;


  }
  
  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  gotolink(value){
    if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true,user:this.directorList});
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true});
    }else if(value==5){
      this.navCtrl.push(GongjiPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(HistoryPage);
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
  this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
    console.log(snap.val())
    console.log("INNNN!")
    if(snap.val()!=undefined){
      console.log(snap.val())
      for(var cca in snap.val()){
        console.log(snap.val()[cca])
      }
      for(var a in snap.val()){
        console.log(snap.val()[a])
        for(var b in snap.val()[a].roomhistory){
          console.log(snap.val()[a].roomhistory[b])
          for(var c in snap.val()[a].roomhistory[b]){
            console.log(snap.val()[a].roomhistory[b][c])
            if(snap.val()[a].roomhistory[b][c].incharge!=this.nickname){
              continue;
            }

              if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                console.log(snap.val()[a].roomhistory[b][c].incharge);
                console.log(this.name);
                console.log(this.nickname);
                console.log(snap.val()[a].roomhistory[b][c].incharge)
                if(snap.val()[a].roomhistory[b][c].incharge.trim()==this.nickname.trim()){
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
          var logic = snap.val()[a].roomhistory[b][c].logic;
          console.log(mainlist);
          var newtc=0;
          var tcarray = [];
          var tctotal=0;
          var chasamarray=[];
          var chasamtotal=0;
      var yeontireason="";
      var inagasi = 0;
          var numofpeople = snap.val()[a].roomhistory[b][c].numofpeople;
          for(var cccc in mainlist.agasi){
            inagasi++;
            console.log(mainlist.agasi[cccc].tc)
            newtc += Math.floor(mainlist.agasi[cccc].tc)
            tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
            console.log("add tc Math.floor(mainlist.agasi[cccc].tc:"+Math.floor(mainlist.agasi[cccc].tc));
            tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
            console.log(tctotal);
            chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
            console.log("add chasam...");
            console.log(Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) ));
            chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
          }
          console.log(tctotal)
          console.log("original chasamtotal : "+chasamtotal);
          chasamtotal=Number(chasamtotal.toFixed(2));
          var newchasamtotal=chasamtotal.toString();
          //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
          newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
          newchasamtotal = ""+newchasamtotal;
          if(chasamtotal==0){
            newchasamtotal="0";
          }
          console.log(newchasamtotal);
          // newchasamtotal
          console.log("chasamtotal"+chasamtotal);
          console.log(numofpeople+"newtc"+newtc);
                var orderl=[];
                var orderprice=0;
                var tp=0;
                var tbottle=0;
                if(snap.val()[a].roomhistory[b][c].orderlist==undefined){

                }else{
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
                var totalsum=0;
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
                // for(var abab in tcarray){
                //   console.log(tcarray[abab])
                //   console.log(tcarray[abab]+",,,"+tbottle)
                //   totalsum+=tcarray[abab];
                //   if(tcarray[abab]>=tbottle){
                //     var v = tcarray[abab]-tbottle;
                //     console.log(v);
                //     firstsumofv+=v;
                //   }
                // }
                // if(firstsumofv==0){
                //   firstsumofv=tbottle*numofpeople-totalsum;
                // }
                console.log("firstsumofv : "+firstsumofv);
                var yeonti=firstsumofv;
                console.log("yeontiiiii : "+yeonti);
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
                  
                  console.log(totalmoney);
                  this.todaymoney += tp+totalmoney+Number(yeonti*10000);
                  console.log(this.todaymoney);

                  var orderdate="";
                  var roomno="";
                  if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
                    orderdate = snap.val()[a].roomhistory[b][c].orderlist.orderDate
                    roomno=snap.val()[a].roomhistory[b][c].orderlist.roomno;
                  }else{
                    orderdate = "-"
                    roomno="-"
                  }

                  this.orderlist.push({"tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "numofpeople":numofpeople,"incharge":snap.val()[a].roomhistory[b][c].incharge,"tbottle":tbottle, "yeonti":yeonti,"reason":yeontireason,"logic":logic, "tcarray":tcarray,"chasamarray":chasamarray,  "tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
              }
                
              }
             
              
           
          }
        }
      }
    }else{
      console.log(snap.val())
    }
    for(var cc in this.orderlist){
      console.log(this.orderlist[cc].value);
    }
    
    console.log(this.orderlist)
  });

  this.firemain.child("company").child(this.company).child('park').once('value').then((snap)=>{
    console.log(snap.val())
    for(var a in snap.val()){
      console.log("a is :"+a);
      var todaylist=[];
      var countingvalue=0;
      var countingprice =0;

      // this.mainlist.push(snap.val()[a]);
      // todaylist.push({"carnum":snap.val()[a].carnum,"date":snap.val()[a].date,"incharge":snap.val()[a].incharge,"key":snap.val()[a].key,"price":snap.val()[a].price,"receiver":snap.val()[a].receiver,"room":snap.val()[a].room,"time":snap.val()[a].time,"type":snap.val()[a].type});
      for(var b in snap.val()[a]){
        console.log(b);
        console.log(snap.val()[a][b]);

        todaylist.push(snap.val()[a][b]);
      countingvalue++;
      countingprice+=Number(snap.val()[a][b].price);
      console.log(this.currentstartday);
      console.log(a);
      console.log(snap.val()[a][b].date);
        if(this.currentstartday==a){
          this.totalcount++;
          this.totalprice+=Number(snap.val()[a][b].price);
          this.mainlist.push(snap.val()[a][b]);

        }

        // this.allmainlist.push(snap.val()[a][b]);
        
      }
    }

    console.log(this.mainlist)
  });
}
  ionViewDidLeave(){
    clearInterval(this.interval)
  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad DirectorpagePage');
  
      this.generating();
      this.interval = setInterval(()=>{
  
        this.generating();
      },1000*60)
  
  
    }
  
}
