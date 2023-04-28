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
import { SignupPage } from '../signup/signup';
import { ServinghistoryPage } from '../servinghistory/servinghistory';
import { HistoryPage } from '../history/history';
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
  id:any="";
  code:any="";
  nickname:any="";
  tc:any=0;
  paymentflag:any=false;
  constructor(public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname= localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");
    this.tc=localStorage.getItem("tc");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    var login=localStorage.getItem("login_data");

    // this.code = JSON.parse(login).code;
    console.log(login);

    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;

    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
  }
  gotopayment(){
    this.navCtrl.push(SignupPage);
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
      this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
        console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("off...")
      this.firemain.child("company").child(this.company).child("roomlist").off();
      this.generate();
          // this.generate();
        })
      });
    }else if(value==5){
      this.navCtrl.push(GongjiPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(ServinghistoryPage);
    }else if(value==8){
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
generate(){
  console.log("generate...");
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
    console.log(snap.val());
    if(snap.val()!=undefined){
      for(var a in snap.val()){
        console.log(snap.val()[a]);
        for(var b in snap.val()[a].roomhistory){
          for(var c in snap.val()[a].roomhistory[b]){
              if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                console.log(snap.val()[a].roomhistory[b][c]);
                if(snap.val()[a].roomhistory[b][c].wt!=this.nickname){
                  console.log("wt name diff");
                  continue;
                }
                var numofangel =0;
                console.log(snap.val()[a].roomhistory[b][c]);
                var mainlist=snap.val()[a].roomhistory[b][c];

                console.log("is mainlist...")

                console.log(mainlist);
        for(var d in mainlist.agasi){
          console.log(mainlist.agasi[d]);
            if(mainlist.agasi[d].findate!=undefined){
  
            }else{
              var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
              var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
              mainlist.agasi[d].totalmoney=totalmoney;
              mainlist.agasi[d].tc=tctotal;
              mainlist.agasi[d].bantee=bantee;
              console.log(mainlist.agasi[d]);
              if(mainlist.agasi[d].angel){
                numofangel++;
              }
            }
        }
      console.log(mainlist);
      var newtc=0;
      var tcarray = [];
      var tarray=[];
      var chasamarray=[];
      var chasamtotal=0;
      var tctotal=0;
      var yeontireason="";
      console.log("room number"+mainlist.name);
      console.log(numofangel);
      var numofpeople = snap.val()[a].roomhistory[b][c].numofpeople;
      var logic = snap.val()[a].roomhistory[b][c].logic;
      var inagasi = 0;
      for(var cccc in mainlist.agasi){
        inagasi++;
        console.log(mainlist.agasi[cccc].tc)
        newtc += Math.floor(mainlist.agasi[cccc].tc)

        tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
        tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
        tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
        chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
        console.log("add chasam...");
        console.log(Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) ));
        chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
      
      }
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
      //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
      // 나머지 완티의 갯수를 고려해서 계산. 
      console.log(snap.val()[a].roomhistory[b][c].orderlist);
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
                    orderl.push(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d])
                    tp += snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num;
                  }
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

                  yeontireason="";
                  firstsumofv=0;
                  console.log("아가씨 수가 사람수보다 많다면....")

                  console.log(tarray);
                  tarray.sort(function(a,b){
                    console.log(a.date+",,,"+b.date)
                    if (a.date < b.date) {
                      return -1;
                    }
                    if (a.date > b.date) {
                      return 1;
                    }
                    return 0;
                  });
                  console.log(tarray);
                  var cvalue=-1;
                  for(var abab in tarray){
                    cvalue++;
                    console.log(cvalue+"????"+numofpeople);
                    if(cvalue<numofpeople){
                      console.log("아래 값에다가 ")
                      console.log(tarray[abab].tc+","+tarray[abab].date+","+tarray[abab].name+",,,"+tbottle)
                      firstsumofv+=tarray[abab].tc
                      yeontireason+="///"+tarray[abab].name+"의 tc:"+tarray[abab].tc+"개를 더함."
                      console.log("firstsumofv : "+firstsumofv);
                    }
                    if(cvalue>=numofpeople){
                      console.log("아래아가씨의 정보를 가지고와서 위의 아가씨 tc에 더해야함")
                      if(tarray[abab].angel!=true){
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="///"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함."
                        console.log(tarray[abab].tc+","+tarray[abab].date+","+tarray[abab].name+",,,"+tbottle)
                      console.log("firstsumofv222 : "+firstsumofv);
                      }else if(tarray[abab].angel){
                        // console.log("아래 아가씨는 angel이므로 따로 계산하자. ")
                        // console.log(tarray[abab].tc+","+tarray[abab].date+","+tarray[abab].name+",,,"+tbottle)
                        
                        firstsumofv+= tarray[abab].tc - tbottle;
                        yeontireason+="///날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
                      }
                    }
                    totalsum+=tcarray[abab];
                  }
                    console.log("firstsumofv3: "+firstsumofv);
                    firstsumofv= firstsumofv - tbottle;
                    yeontireason+="///"+firstsumofv+"에서 술병"+tbottle+"를 뺌. ";
                    console.log("firstsumofv4: "+firstsumofv);
                  // var minVal = Math.min.apply(null, tcarray);
                  // console.log("minvalue : "+minVal);
                  // var maxVal = Math.max.apply(null, tcarray);
                  // console.log("maxvalue : "+maxVal);
                  // firstsumofv=minVal+maxVal-tbottle
                  // yeontireason += "인원수<아가씨, 가장큰 tc"+maxVal+"+가장작은 tc"+minVal+"에서 총술병"+tbottle+"를 뺀값."
                }else if (tcarray.length==numofpeople){
                  console.log("아가씨 수가 사람수와 같다면....")
                for(var abab in tcarray){
                  console.log(tcarray[abab]+",,,"+tbottle)
                  totalsum+=tcarray[abab];
                }
                firstsumofv= numofpeople*tbottle-totalsum
                if(firstsumofv<0){
                  firstsumofv=0;
                }
                yeontireason = "사람수 * 술병 - 전체 완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
              }else if(tcarray.length<numofpeople){
                  console.log("아가씨 수가 사람수보다 적다면....")
                  firstsumofv=0;
                  var newnumofpeople=tcarray.length;
                  firstsumofv= newnumofpeople*tbottle-totalsum
                  if(firstsumofv<0){
                    firstsumofv=0;
                  }
                   yeontireason = "인원수를"+tcarray.length+"명으로 조정후 계산."+" 사람수 * 술병 - 전체 완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
                }
                console.log("numofpeople"+numofpeople);
                var agasiover=false;
                for(var abab in tcarray){
                  console.log(tcarray[abab]+",,,"+tbottle)
                  // totalsum+=tcarray[abab];
                  
                  if(tcarray[abab]>tbottle){ //아가씨 각각의 tc가 술병수보다 많다면, 
                    var v = tcarray[abab]-tbottle;
                    console.log(v);
                    // firstsumofv+=v;
                    agasiover=true;
                  }if(tcarray[abab]==tbottle){
                    // firstsumofv+=0;
                  }else{
                    // firstsumofv+=0;
                  }
                }
                if(agasiover){
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
                  var orderdate="";
                  var roomno="";
                  if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
                    orderdate = snap.val()[a].roomhistory[b][c].orderlist.orderDate
                    roomno=snap.val()[a].roomhistory[b][c].orderlist.roomno;
                  }else{
                    orderdate = "-"
                    roomno="-"
                  }
                  this.orderlist.push({"tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].roomhistory[b][c].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
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
    console.log('ionViewDidLoad wt page');

    this.generate();
    this.interval = setInterval(()=>{
      console.log("setinterval...")
      this.generate();
    },1000*60)


  }

}
