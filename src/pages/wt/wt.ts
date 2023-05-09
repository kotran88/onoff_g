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
  noflaglist=[];
  information=[];
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
    var newitem=[];
    var mychildren=[];
    mychildren.push({"name":"academypizza"})
    newitem.push({"name":"action", 
  "children":
    mychildren
})
    this.information.push({"name":"bb","open":false})
    this.information.push({"name":"cc","open":false})
    //////console.log(this.information);
    // this.code = JSON.parse(login).code;
    //////console.log(login);

    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;

    //////console.log(login);
    //////console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
  }
  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  togglesection(i){
    //////console.log(i)
    //////console.log(this.orderlist);
    //////console.log(this.orderlist[i]);
    this.orderlist[i].open = !this.orderlist[i].open;
    //////console.log(this.orderlist[i]);
  }
  gotolink(value){
    if(value == 0){
      this.navCtrl.push(OrdermainPage,{flag:true}).then(() => {
        this.navCtrl.getActive().onDidDismiss(data => {
          //////console.log("refresh...");
      
        });
      });
    }else if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true}).then(() => {
        //////console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          this.menuCtrl.open();
          setTimeout(()=>{
            this.menuCtrl.close();
            this.generate();
          },10)
      // this.firemain.child("company").child(this.company).child("roomlist").off();
      // this.generate();
          // this.generate();
        })
      });
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
        //////console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          //////console.log("off...")
      // this.firemain.child("company").child(this.company).child("roomlist").off();
      // this.generate();
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
    //////console.log("open and cloe");
    this.menuCtrl.open();
    
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
onrefresh(){
  this.generate();
}
generate(){
  this.noflaglist=[];
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){
        console.log(snap.val()[a]);
              if(snap.val()[a].date==this.currentstartday){
                if(snap.val()[a].wt!=this.nickname){
                  continue;
                }

                console.log(snap.val()[a]);
      console.log(snap.val()[a].name);
                var numofangel =0;
                //////console.log(snap.val()[a]);
                var mainlist=snap.val()[a];
                //////console.log("mainlist...");
                //////console.log(mainlist);
       console.log(snap.val()[a]);


      var newtc=0;
      var tcarray = [];
      var tcarraywithoutagasi = [];
      var tarray=[];
      var chasamarray=[];
      var chasamtotal=0;
      var tctotal=0;
      var yeontireason="";
      console.log(snap.val()[a].roomno);
      var numofpeople = snap.val()[a].numofpeople;
      var logic = snap.val()[a].logic;
      var inagasi = 0;
      var totaltc=0;
      var totalmoney=0;
      console.log(mainlist);
      if(mainlist.agasi!=undefined){
        console.log(mainlist.agasi);
        console.log("numofagasi : "+mainlist.agasi.length);
      }
      for(var cccc in mainlist.agasi){
        console.log("looping each agasi");

        if(mainlist.agasi[cccc].findate!=undefined){
          totaltc+=Number(mainlist.agasi[cccc].tc);
          totalmoney+=Number(mainlist.agasi[cccc].money);
        }else{
          var totalmoney=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[0]);
          // if(mainlist.agasi[cccc].tc!=undefined){

          // }
          var tctotal=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[1]);
          var bantee=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[2]);
          mainlist.agasi[cccc].totalmoney=totalmoney;
          totaltc+=tctotal;
          totalmoney+=Number(totalmoney);
          mainlist.agasi[cccc].tc=tctotal;
          mainlist.agasi[cccc].bantee=bantee;
          //////console.log(mainlist.agasi[cccc]);
          if(mainlist.agasi[cccc].angel){
            numofangel++;
          }
        }

        inagasi++;
        newtc += Math.floor(mainlist.agasi[cccc].tc)
        if(mainlist.agasi[cccc].angel==true||mainlist.agasi[cccc].angel=="true"){

        }else{
          tcarraywithoutagasi.push(Math.floor(mainlist.agasi[cccc].tc));
        }
        tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
        tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
        console.log("tc add: "+Math.floor(mainlist.agasi[cccc].tc) );
        tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
        chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
        chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
      
      }
      chasamtotal=Number(chasamtotal.toFixed(2));
      console.log("chasamtotal:"+chasamtotal);
      var newchasamtotal=chasamtotal.toString();
      //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
      newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
      newchasamtotal = ""+newchasamtotal;
      if(chasamtotal==0){
        newchasamtotal="0";
      }
      // newchasamtotal
      console.log(numofpeople+"newtc"+newtc+",,,,"+newchasamtotal);
      tctotal=newtc;
      //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
      // 나머지 완티의 갯수를 고려해서 계산.  
      //////console.log(snap.val()[a].orderlist);
      var orderl=[];
      var orderprice=0;
      var tp=0;
      var tbottle=0;
      

                if(snap.val()[a].orderlist==undefined){

                }else{
                  for(var d in snap.val()[a].orderlist.orderlist){

                    if(snap.val()[a].orderlist.orderlist[d].category=="주류"){
                      tbottle+=Number(snap.val()[a].orderlist.orderlist[d].num);
                    }
                    orderprice+= (Number(snap.val()[a].orderlist.orderlist[d].price) );
                    orderl.push(snap.val()[a].orderlist.orderlist[d])
                    tp += snap.val()[a].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].orderlist.orderlist[d].num;
                  }
                }
               
               
                //console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
                var firstsumofv=0;
                var totalsum=0;
                var allzero=false;
                if(logic){
                  tbottle=tbottle-1;
                  yeontireason+=" 술병 차감 -1 , "
                }
                if(tcarraywithoutagasi.length>numofpeople){

                  yeontireason="";
                  firstsumofv=0;
                  console.log("날개 제외 아가씨 수가 사람수보다 많다면....")

                  console.log(tarray);
                  tarray.sort(function(a,b){
                    //////console.log(a.date+",,,"+b.date)
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
                  var stop=0;
                  for(var abab in tarray){
                    cvalue++;
                    console.log(cvalue+"????"+numofpeople);
                    if(cvalue<numofpeople){
                      console.log(tarray[abab]);
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함."
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+""
                   
                        }
                      }
                      // firstsumofv+=tarray[abab].tc
                      // yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+"개를 더함??"
                    }
                    if(cvalue>=numofpeople){

                      console.log(tarray[abab]);
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함!!!"
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+"."
                   
                        }
                      }
                    }
                    totalsum+=tcarray[abab];
                  }
                    // yeontireason+=","+firstsumofv+"에서 술병"+tbottle*numofpeople+"를 뺌. ";
                    for(var ii=0; ii<numofpeople; ii++){

                      // firstsumofv= firstsumofv - tbottle;
                    }
                }else if (tcarraywithoutagasi.length==numofpeople){
                  console.log("날개 제외 아가씨 수가 사람수와 같다면....");
                  console.log(tarray);
                  console.log(tcarraywithoutagasi);
                for(var abab in tarray){
                  totalsum+=tarray[abab].tc;

                  if(tarray[abab].angel!=true){
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함.."
                  }else if(tarray[abab].angel){
                    console.log("angel!!!");
                    console.log(tarray[abab].tc);
                    console.log(tbottle);
                    if(tarray[abab].tc - tbottle>=0){
                       console.log("in")
                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+"."
               
                    }else{
                      yeontireason+=tarray[abab].tc+"-"+tbottle+"=0 ,연티:0"
                    }
                  }

                }
                firstsumofv= numofpeople*tbottle-totalsum
                console.log(firstsumofv);
                if(firstsumofv>0){
                  firstsumofv=0;
                }
                yeontireason += "인원*병-완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
              }else if(tcarraywithoutagasi.length<numofpeople){
                console.log("날개 제외 아가씨 수가 사람수보다 작다면....");
                for(var abab in tcarray){
                  totalsum+=tcarray[abab];
                }
                  firstsumofv=0;
                  var newnumofpeople=tcarray.length;
                  firstsumofv= newnumofpeople*tbottle-totalsum
                  if(firstsumofv>0){
                    firstsumofv=0;
                  }
                   yeontireason = ""+tcarray.length+"로조정."+" 인원*병-완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
                }
               
                var yeonti=firstsumofv;
                if(yeonti<=0){
                  yeonti=Math.abs(yeonti)
                }
                if(tbottle==0){
                  yeonti=0;
                  yeontireason+="술이 0병이므로 연티 0"
                }
                console.log("yeontiiiii : "+yeonti);
              console.log(yeontireason)
                console.log("total bottle : "+tbottle);
                  console.log(mainlist)
                  console.log(tp);
                  console.log("totalmoney....")
                  totalmoney=totalmoney*10000;

                  console.log(totalmoney);
                  this.todaymoney += tp+totalmoney+Number(yeonti*10000);
                  console.log(this.todaymoney);
                  var orderdate="";
                  var roomno="";
                  if(snap.val()[a].orderlist!=undefined){
                    orderdate = snap.val()[a].orderlist.orderDate
                    roomno=snap.val()[a].orderlist.roomno;
                  }else{
                    orderdate = "-"
                    roomno="-"
                  }


                  var enddate="";
                  if(snap.val()[a].end_date_full!=undefined){
                   
                    enddate=snap.val()[a].end_date_full
                  }else{
                    orderdate = "";
                  }
                  if(snap.val()[a].noflag){
                    this.noflaglist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  }else{
                    this.orderlist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  }
                     }
             
              
            
           
      }
    }
    // this.orderlist.
    //sort if orderlist's enddate is empty or not 
    console.log(this.noflaglist);
    this.orderlist.sort(function(a,b){
      if(a.enddate==""){
        return -1;
      }else if(b.enddate==""){
        return 1;
      }else{
        return 0;
      }
    })
    
    console.log(this.orderlist);
    for(var aeq in this.noflaglist){
      this.orderlist.push({
        "open":false,"status":this.noflaglist[aeq].status,"noflag":this.noflaglist[aeq].noflag,  "enddate":enddate,"key":this.noflaglist[aeq].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":this.noflaglist[aeq].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":this.noflaglist[aeq].wt,"date":orderdate,"roomno":this.noflaglist[aeq].roomno, "value":orderl
      })
    }
    console.log(this.orderlist);
    //////console.log("end!");
  });
}

ionViewDidLeave(){

  //////console.log(" ionViewDidLeave!!!");
  clearInterval(this.interval)
  // this.firemain.child("company").child(this.company).child("roomlist").off();

}
ionViewWillEnter(){
  //////console.log("will enter!!!");
  

}
refreshoneroom(mainlist){
  //////console.log("refreshoneroom ");
  ////console.log(mainlist);
  if(mainlist==undefined){
    this.generate();
    return;
  }
  var newtc=0;
  var tcarray = [];
  var tcarraywithoutagasi = [];
  var tarray=[];
  var chasamarray=[];
  var chasamtotal=0;
  var tctotal=0;
  var yeontireason="";
  console.log(mainlist.roomno);
  var numofpeople = mainlist.numofpeople;
  var logic = mainlist.logic;
  var inagasi = 0;
  var totaltc=0;
  var totalmoney=0;
  var numofangel =0;
  console.log(mainlist);
  if(mainlist.agasi!=undefined){
    console.log(mainlist.agasi);
    console.log("numofagasi : "+mainlist.agasi.length);
  }
  for(var cccc in mainlist.agasi){
    console.log("looping each agasi");

    if(mainlist.agasi[cccc].findate!=undefined){
      totaltc+=Number(mainlist.agasi[cccc].tc);
      totalmoney+=Number(mainlist.agasi[cccc].money);
    }else{
      var totalmoney=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[0]);
      // if(mainlist.agasi[cccc].tc!=undefined){

      // }
      var tctotal=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[1]);
      var bantee=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[2]);
      mainlist.agasi[cccc].totalmoney=totalmoney;
      totaltc+=tctotal;
      totalmoney+=Number(totalmoney);
      mainlist.agasi[cccc].tc=tctotal;
      mainlist.agasi[cccc].bantee=bantee;
      //////console.log(mainlist.agasi[cccc]);
      if(mainlist.agasi[cccc].angel){
        numofangel++;
      }
    }

    inagasi++;
    newtc += Math.floor(mainlist.agasi[cccc].tc)
    if(mainlist.agasi[cccc].angel==true||mainlist.agasi[cccc].angel=="true"){

    }else{
      tcarraywithoutagasi.push(Math.floor(mainlist.agasi[cccc].tc));
    }
    tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
    tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
    console.log("tc add: "+Math.floor(mainlist.agasi[cccc].tc) );
    tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
    chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
    chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
  
  }
  chasamtotal=Number(chasamtotal.toFixed(2));
  console.log("chasamtotal:"+chasamtotal);
  var newchasamtotal=chasamtotal.toString();
  //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
  newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
  newchasamtotal = ""+newchasamtotal;
  if(chasamtotal==0){
    newchasamtotal="0";
  }
  // newchasamtotal
  console.log(numofpeople+"newtc"+newtc+",,,,"+newchasamtotal);
  tctotal=newtc;
  //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
  // 나머지 완티의 갯수를 고려해서 계산.  
  //////console.log(mainlist.orderlist);
  var orderl=[];
  var orderprice=0;
  var tp=0;
  var tbottle=0;
  

            if(mainlist.orderlist==undefined){

            }else{
              for(var d in mainlist.orderlist.orderlist){

                if(mainlist.orderlist.orderlist[d].category=="주류"){
                  tbottle+=Number(mainlist.orderlist.orderlist[d].num);
                }
                orderprice+= (Number(mainlist.orderlist.orderlist[d].price) );
                orderl.push(mainlist.orderlist.orderlist[d])
                tp += mainlist.orderlist.orderlist[d].price.replace(",","")* mainlist.orderlist.orderlist[d].num;
              }
            }
           
           
            //console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
            var firstsumofv=0;
            var totalsum=0;
            var allzero=false;
            if(logic){
              tbottle=tbottle-1;
              yeontireason+=" 술병 차감 -1 , "
            }
            if(tcarraywithoutagasi.length>numofpeople){

              yeontireason="";
              firstsumofv=0;
              console.log("아가씨 수가 사람수보다 많다면....")

              console.log(tarray);
              tarray.sort(function(a,b){
                //////console.log(a.date+",,,"+b.date)
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
              var stop=0;
              for(var abab in tarray){
                cvalue++;
                console.log(cvalue+"????"+numofpeople);
                if(cvalue<numofpeople){
                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함."
                  }else if(tarray[abab].angel){
                    if(tarray[abab].tc - tbottle>=0){

                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
               
                    }
                  }
                  firstsumofv+=tarray[abab].tc
                  yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+"개를 더함."
                }
                if(cvalue>=numofpeople){
                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함."
                  }else if(tarray[abab].angel){
                    if(tarray[abab].tc - tbottle>=0){

                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
               
                    }
                  }
                }
                totalsum+=tcarray[abab];
              }
                yeontireason+=","+firstsumofv+"에서 술병"+tbottle*numofpeople+"를 뺌.. ";
                for(var ii=0; ii<numofpeople; ii++){

                  firstsumofv= firstsumofv - tbottle;
                }
            }else if (tcarraywithoutagasi.length==numofpeople){
            for(var abab in tcarray){
              totalsum+=tcarray[abab];
            }
            firstsumofv= numofpeople*tbottle-totalsum
            console.log(firstsumofv);
            if(firstsumofv>0){
              firstsumofv=0;
            }
            yeontireason = "사람수 * 술병 - 전체 완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
          }else if(tcarraywithoutagasi.length<numofpeople){
            for(var abab in tcarray){
              totalsum+=tcarray[abab];
            }
              firstsumofv=0;
              var newnumofpeople=tcarray.length;
              firstsumofv= newnumofpeople*tbottle-totalsum
              if(firstsumofv>0){
                firstsumofv=0;
              }
               yeontireason = "인원수를"+tcarray.length+"명으로 조정후 계산."+" 사람수 * 술병 - 전체 완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
            }
           
            var yeonti=firstsumofv;
            if(yeonti<=0){
              yeonti=Math.abs(yeonti)
            }
            if(tbottle==0){
              yeonti=0;
              yeontireason+="술이 0병이므로 연티 0"
            }
            console.log("yeontiiiii : "+this.yeonti);
          console.log(yeontireason)
            console.log("total bottle : "+tbottle);
              console.log(mainlist)
              console.log(tp);
              console.log("totalmoney....")
              totalmoney=totalmoney*10000;

              console.log(totalmoney);
              this.todaymoney += tp+totalmoney+Number(yeonti*10000);
              console.log(this.todaymoney);
              var orderdate="";
              var roomno="";
              if(mainlist.orderlist!=undefined){
                orderdate = mainlist.orderlist.orderDate
                roomno=mainlist.orderlist.roomno;
              }else{
                orderdate = "-"
                roomno="-"
              }


              var enddate="";
              if(mainlist.end_date_full!=undefined){
               
                enddate=mainlist.end_date_full
              }else{
                orderdate = "";
              }
              var flagging =false;
              for(var sd in this.orderlist){
                if(this.orderlist[sd].key == mainlist.key){
                  flagging = true;
                  //////console.log(this.orderlist[sd])
                  this.orderlist[sd].numofpeople = mainlist.numofpeople;
                  this.orderlist[sd].tctotal = tctotal;
                  this.orderlist[sd].chasam = newchasamtotal;
                  this.orderlist[sd].logic = logic;
                  this.orderlist[sd].reason = yeontireason;
                  this.orderlist[sd].tcarray = tcarray;
                  this.orderlist[sd].chasamarray = chasamarray;
                  this.orderlist[sd].tbottle = tbottle;
                  this.orderlist[sd].yeonti = yeonti;
                  this.orderlist[sd].tp = tp;
                  this.orderlist[sd].totalprice = orderprice;
                  this.orderlist[sd].tc = totaltc.toFixed(1);
                  this.orderlist[sd].money = totalmoney;
                  this.orderlist[sd].value = orderl;
                  //////console.log(this.orderlist);
                  //////console.log("modify...")
                  // this.orderlist[sd].push({"open":false, "enddate":enddate, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].roomhistory[b][c].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
          
                }
              }
              if(!flagging){
                this.orderlist.push({"open":false, "enddate":enddate,"status":mainlist.status,  "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":mainlist.incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":mainlist.wt,"date":orderdate,"roomno":mainlist.name, "value":orderl});
              }
              //////console.log(this.orderlist);
}
  ionViewDidLoad() {
    //////console.log('ionViewDidLoad wt page');

      //  "child_added", "child_changed", "child_removed", or "child_moved."
      this.firemain.child("company").child(this.company).child("roomlist").on('child_removed', function(snap, prevChildKey) {
        //////console.log("child_removedchild_removedchild_removedchild_removed");
        //////console.log(snap.val());
        //////console.log(prevChildKey);
        // this.firemain.child("compan
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("company").child(this.company).child("roomlist").on('child_moved', function(snap, prevChildKey) {
        //////console.log("child_movedchild_movedchild_movedchild_moved");
        //////console.log(snap.val());
        //////console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("company").child(this.company).child("roomlist").on('child_added', function(snap, prevChildKey) {
        //////console.log("child_addedchild_addedchild_addedchild_added");
        //////console.log(snap.val());
        //////console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
        this.firemain.child("company").child(this.company).child("roomlist").on('child_changed', (snap, prevChildKey) =>{
          //////console.log("child_changedchild_changedchild_changedchild_changedchild_changed");
          //////console.log(snap.val());
          for(var date in snap.val().roomhistory){
            if(date==this.currentstartday){
              // for(var sdate in snap.val().roomhistory[date]){
              //   this.refreshoneroom(snap.val().roomhistory[date][sdate]);
              // }
              var flagging=false;
              for(var room in this.orderlist){
                for(var sdate in snap.val().roomhistory[date]){
                  //////console.log(this.orderlist[room].roomno);
                  //////console.log(snap.val().roomhistory[date][sdate]);
                if(this.orderlist[room].key == snap.val().roomhistory[date][sdate].key){
                  flagging=true;
                  //////console.log("match!!!");
                  this.refreshoneroom(snap.val().roomhistory[date][sdate]);
                    }
                }
              }
              if(!flagging){
                this.refreshoneroom(snap.val().roomhistory[date][sdate]);
              }
            }
          }
          // this.refreshChoice2();
          // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
        });

        this.util.presentLoading();
    this.generate();
  
    this.util.dismissLoading();
    this.interval = setInterval(()=>{
      //////console.log("setinterval...")
      // this.util.presentLoading();
      // this.generate();
      // this.util.dismissLoading();
    },1000*60)
  


  }

}
