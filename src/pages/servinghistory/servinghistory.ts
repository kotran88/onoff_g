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

  selectedMonth:any=0;
  selectedYear:any=0;
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
   

    this.selectedYear = this.currentstartday.split("-")[0];
    this.selectedMonth = this.currentstartday.split("-")[1];
    this.selectedDay = this.currentstartday.split("-")[2];
    this.today = new Date();
    this.date=new Date(this.today.getFullYear(),this.today.getMonth()+1,0);
    this.getDaysOfMonth();
    console.log(this.selectedDate)
    console.log(this.currentYear+","+this.currentMonth+","+this.currentDate+",,,"+this.selectedDay)
    console.log(this.today.getFullYear()+",,,"+this.today.getMonth()+1);
    
  }
  openmodal(day,month,year){
    console.log(day);
    this.selectedDate =  this.currentYear+"-"+this.currentMonth+"-"+day;

    this.selectedYear = year;
    this.selectedMonth = month;
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
  this.todaymoney=0;
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){
        console.log(snap.val()[a]);
              if(snap.val()[a].date==this.currentstartday){
                if(snap.val()[a].wt!=this.nickname){
                  continue;
                }

                //console.log(snap.val()[a]);
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
                if(tbottle==0){

                }else{
                  if(logic==1){
                    tbottle=tbottle-1;
                    yeontireason+=" 술 -1 , "
                  }if(logic==2){
                    tbottle=tbottle-2;
                    yeontireason+=" 술 -2, "
                  }
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
                        firstsumofv+=tarray[abab].tc-tbottle
                        yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"더하고 뺌"+tbottle+""
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

                      console.log("cvalue>=numofpeople"+tarray[abab]);
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="/"+tarray[abab].name+"의tc"+tarray[abab].tc+"를 더함.!!!"
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
               console.log(yeontireason)
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

                  console.log("calcuu");
                  console.log(this.todaymoney )
                  console.log(tp);
                  console.log(yeonti);
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
                  // if(snap.val()[a].noflag||!snap.val()[a].noflag){
                  //   // this.noflaglist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  // }else{
                    this.orderlist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  // }
                     }
             
              
            
           
      }
    }
    // this.orderlist.
    //sort if orderlist's enddate is empty or not 
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
    // for(var aeq in this.noflaglist){
    //   this.orderlist.push({
    //     "open":false,"status":this.noflaglist[aeq].status,"noflag":this.noflaglist[aeq].noflag,  "enddate":enddate,"key":this.noflaglist[aeq].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":this.noflaglist[aeq].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":this.noflaglist[aeq].wt,"date":orderdate,"roomno":this.noflaglist[aeq].roomno, "value":orderl
    //   })
    // }
    console.log(this.orderlist);
    //////console.log("end!");
  });
}
  ionViewDidLoad() {
    this.generating();
  }

}
