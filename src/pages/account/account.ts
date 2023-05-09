import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController,ViewController, ModalController,NavParams } from 'ionic-angular';
import { AccountingmodalPage } from '../accountingmodal/accountingmodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { MenuController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  firemain = firebase.database().ref();
  currentstartday:any="";
  selectedName:any="";
  bu=0;
  accumuls:Number=0;
  accountmessage:any=[];
  todaymoney=0;
  // 팀 리스트
  yeonti:any=0;
  view_list = [];
  // display: flex;로 정렬된 비율 유지를 위해 빈공간 리스트
  sort_temp_list =[];
  orderlist=[];
  detailarray=[];
  incen0:any=0;
  incen1:any=0;
  incen2:any=0;
  selectedDate:any=0;
  name:any="";
  nickname:any="";
  login_data:any = {};
  company:any="";
  tomoney:any=0;
  cumulative:any=0;
  option_title_ch = 0; // 0 팀, 1 담당자, 2 달력
  option_title = ["팀을 선택해주세요.", "담당자를 선택해주세요."];

  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  paymentflag:any=false;
  firstflag=false;
  constructor(public util:UtilsProvider, public menuCtrl:MenuController,public view:ViewController,public modal:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.nickname = localStorage.getItem("nickname");
    this.login_data = JSON.parse(localStorage.getItem("login_data"));
    this.company = localStorage.getItem("company");
    this.currentstartday=localStorage.getItem("startDate");
    this.firstflag = this.navParams.get("flag");
    this.get_team_list();

    this.goToday();

    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;


  }

  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  withdraw(){

    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.selectedDate)
    console.log(this.selectedName)
    //refreshing date by above info 
    let modal = this.modal.create(AccountingmodalPage,{"flag":2, "year":this.currentYear,"month":this.currentMonth,"day":this.selectedDate,"selected":this.selectedName});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");

      var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
      console.log(newdate);
      this.generatedata(this.selectedName.nickname,newdate);
      
    });

    modal.present();
  }
  confirm(){
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.selectedDate)
    console.log(this.selectedName)


    //refreshing date by above info 
    let modal = this.modal.create(AccountingmodalPage,{"flag":1,"year":this.currentYear,"month":this.currentMonth,"day":this.selectedDate,"selected":this.selectedName});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");

      var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
      console.log(newdate);
      this.generatedata(this.selectedName.nickname,newdate);
      
    });

    modal.present();
  }
  close(){
    this.view.dismiss();
}  openclose(){
  console.log("open and cloe");
  this.menuCtrl.open();
}
  openmodal(v){
    this.util.presentLoading();
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(v);
    console.log(this.currentDate);
    this.selectedDate=v;
    console.log(this.selectedDate)
    console.log(this.selectedName)







    var bujangid=this.selectedName.nickname;
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log(newdate);
    console.log(this.currentstartday)
    this.generatedata(bujangid,newdate);


    //refreshing date by above info 
    // let modal = this.modal.create(AccountingmodalPage,{"v":v,"year":this.currentYear,"month":this.currentMonth,"day":v,"selected":this.selectedName});
    // modal.onDidDismiss(url => {
    //   console.log("dismiss second!");
    // });

    // modal.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  get_team_list()
  {
    this.firemain.child('company').child(this.login_data.company).child("younglist").once('value').then((snap)=>{
      console.log(snap.val());
      this.view_list = [];
      for(var i in snap.val())
      {
        this.view_list.push(snap.val()[i]);
      }
      this.sort_temp_list = [];
      for(var j = 0; j < (this.view_list.length % 3); j++)
      {
        this.sort_temp_list.push(0)
      }
    })
  }

  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
  get_charge_person(team)
  {
    this.util.presentLoading();
    console.log(team);
    this.option_title_ch = 1;
    this.firemain.child('users').orderByChild("young").once('value').then((snap)=>{
      this.view_list = [];
      for(var i in snap.val())
      {
        if(snap.val()[i].young!=undefined){
          if(snap.val()[i].young.indexOf(team) > -1){
            this.view_list.push(snap.val()[i]);
          };
        }
          
      }
      this.sort_temp_list = [];
      for(var j = 0; j < (this.view_list.length % 3); j++)
      {
        this.sort_temp_list.push(0)
      }
      console.log(this.view_list);

    this.util.dismissLoading();
    })
  }

  get_money_data(name)
  {
    console.log("getmoneydata")
    this.util.presentLoading();
    console.log("get_money_data"+name);
    this.selectedName=name;
    var bujangid=name.nickname;
    this.option_title_ch = 2;
    console.log(name);
    console.log("name was..");
    console.log(name.name);
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log(newdate);
    this.generatedata(bujangid,newdate);

  }
  checkEvent(day){
    return false;
  }
  generatedata(bujangid,nd){
    console.log("generatedata");
    console.log(bujangid);
    console.log(nd);
    this.accountmessage=[];
    this.detailarray=[];
    this.orderlist=[];
    this.tomoney=0;
    this.todaymoney=0;
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    this.firemain.child("users").child(bujangid).once('value').then((snap)=>{
      console.log(snap.val());
      console.log(snap.val().incentive);
      
      console.log(snap.val().accounting);
      console.log(snap.val().accounting.incoming);
      this.accumuls=snap.val().accounting.incoming;
      console.log(this.currentstartday);
      if(snap.val().accounting==undefined){
      }else{
        console.log(snap.val().accounting[nd]);
      this.todaymoney=0;
      for(var a in snap.val().accounting){
        console.log(a);
        console.log(this.currentstartday);
        console.log("mkmkmk")
        console.log(nd);
        if(a==nd){
          console.log(a);
          console.log(snap.val().accounting[a]);
          for(var c in snap.val().accounting[a]){
            console.log(c);
            console.log(snap.val().accounting[a][c]);
            console.log(snap.val().accounting[a][c].card);
            console.log(snap.val().accounting[a][c].cash);
            this.todaymoney+=Number(Number(snap.val().accounting[a][c].card*0.85).toFixed(0));
            this.todaymoney+=Number(snap.val().accounting[a][c].cash);

          }
        }
        for(var c in snap.val().accounting[a]){
          console.log(snap.val().accounting[a][c])
          console.log(nd);
          console.log(this.selectedDate)
          console.log(this.currentYear+"-"+Number(this.currentMonth)+"-"+this.selectedDate)
          if(snap.val().accounting[a][c].year==nd){
            if(snap.val().accounting[a][c].withdraw!=undefined&&snap.val().accounting[a][c].incoming==undefined){
              this.accountmessage.push({"type":"출금", "time":snap.val().accounting[a][c].time,"card":Number(snap.val().accounting[a][c].card),"cash":Number(snap.val().accounting[a][c].cash),"date":a,"name":snap.val().accounting[a][c].name});

              //출금
            }else if(snap.val().accounting[a][c].incoming!=undefined&&snap.val().accounting[a][c].withdraw==undefined){
              //입금
              this.accountmessage.push({"type":"입금", "time":snap.val().accounting[a][c].time,"card":Number(snap.val().accounting[a][c].card),"cash":Number(snap.val().accounting[a][c].cash),"date":a,"name":snap.val().accounting[a][c].name});

            }
            
          }
        
        }
      
      }
      }
      
      console.log(this.accountmessage);
      console.log(this.todaymoney);

      if(snap.val().incentive==undefined){

      }else{
        for(var a in snap.val().incentive){
          var date = a;
          console.log(date);
          console.log(a);
          console.log(this.currentstartday);
          console.log(newdate)
          if(a==newdate){
            var context = snap.val().incentive[a];
            console.log(context);
            for(var b in context){
              var detail = context[b];
              var aaaa;
              console.log(detail)
              detail.bottle=0;
              if(context[b].ordertype==undefined){
                return;
              }
              var orderlist = context[b].ordertype.orderlist;
              aaaa = detail.ordertype;
              aaaa.bottle=0;
              console.log(orderlist);
              var totalsumprice=0;
              for(var a in orderlist){
                console.log(orderlist[a]);
                if(orderlist[a].category=="주류"){
                  console.log(orderlist[a].price);
                  var price = orderlist[a].price.replace(",","");
                  totalsumprice += Number(price)*Number(orderlist[a].num)
                  console.log(orderlist[a].num)
                  aaaa.bottle+=Number(orderlist[a].num);
                  aaaa.totalsumprice= totalsumprice
                }
              }
              console.log(detail);
              
              console.log("aaaaa");
              console.log(aaaa);
              this.detailarray.push(aaaa);
    
    
    
            }
          }
        
        }
      }
     
      console.log(this.detailarray)
    });


    this.firemain.child("company").child(this.company).once('value').then((snap)=>{
      console.log(snap.val().incen0)
      console.log(snap.val().incen1)
      console.log(snap.val().incen2)
      this.incen0=snap.val().incen0;
      this.incen1=snap.val().incen1;
      this.incen2=snap.val().incen2;

    });


    this.firemain.child("users").child(bujangid).child('roomhistory').child(newdate).once('value').then((snap)=>{
      console.log(snap.val())
      console.log("INININININININININININ!")
      if(snap.val()!=undefined){
        for(var a in snap.val()){
          console.log(a);
          console.log(snap.val()[a]);
          console.log(snap.val()[a].orderlist!)
              if(snap.val()[a].orderlist!=undefined){
                console.log("order is not undefined");
                console.log(snap.val()[a]);
                console.log(nd);
                if(snap.val()[a].date==nd){
                  console.log(snap.val()[a].incharge);
                  console.log(this.name);
                  console.log(this.nickname);
                  console.log(this.selectedName);
                  if(snap.val()[a].incharge.trim()==this.selectedName.nickname.trim()){
                    var mainlist=snap.val()[a];
  
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
                    console.log(snap.val()[a]);
                    console.log(snap.val()[a].orderlist);
                  console.log(snap.val()[a].orderlist.roomno);
                  var orderl=[];
                  var orderprice=0;
                  var yeontireason="";
                  var logic = snap.val()[a].logic;
          
                  var tcarray = [];
                  var tp=0;
                  var tbottle=0;
                  var numofpeople = snap.val()[a].numofpeople;
                  for(var cccc in mainlist.agasi){
                    console.log(mainlist.agasi[cccc].tc)
                    tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
                  }
                  for(var d in snap.val()[a].orderlist.orderlist){
                    if(snap.val()[a].orderlist.orderlist[d].category=="주류"){
                      tbottle+=Number(snap.val()[a].orderlist.orderlist[d].num);
                    }
                    orderprice+= (Number(snap.val()[a].orderlist.orderlist[d].price.replace(",","")) );
                    console.log(snap.val()[a].orderlist.orderlist[d]);
                    orderl.push(snap.val()[a].orderlist.orderlist[d])
                    console.log(snap.val()[a].orderlist.orderlist[d].price);
                    console.log(snap.val()[a].orderlist.orderlist[d].num)
                    tp += snap.val()[a].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].orderlist.orderlist[d].num;
                    console.log(snap.val()[a].orderlist);
                    console.log(snap.val()[a].orderlist.orderDate);
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
                  console.log(snap.val()[a])
                    console.log(snap.val()[a].agasi)
                    var totaltc=0;
                    var totalmoney=0;

                console.log("firstsumofv : "+firstsumofv);
                var yeonti=firstsumofv;
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
                    this.orderlist.push({"tp":tp,"yeonti":yeonti, "totalprice":orderprice,"tc":totaltc,"money":totalmoney, "wt":snap.val()[a].orderlist.wt,"date":snap.val()[a].orderlist.orderDate,"roomno":snap.val()[a].orderlist.roomno, "value":orderl});
                  }
                  
                }
               
                
              }else{
                //order가 없을때. 



                if(snap.val()[a].date==nd){
                  console.log(snap.val()[a].incharge);
                  console.log(this.name);
                  console.log(this.nickname);
                  console.log(this.selectedName);
                  if(snap.val()[a].incharge.trim()==this.selectedName.nickname.trim()){
                    var mainlist=snap.val()[a];
  
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
                    console.log(snap.val()[a]);
                  var orderl=[];
                  var orderprice=0;
                  var yeontireason="";
                  var logic = snap.val()[a].logic;
          
                  var tcarray = [];
                  var tp=0;
                  var tbottle=0;
                  var numofpeople = snap.val()[a].numofpeople;
                  for(var cccc in mainlist.agasi){
                    console.log(mainlist.agasi[cccc].tc)
                    tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
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
                  console.log(snap.val()[a])
                    console.log(snap.val()[a].agasi)
                    var totaltc=0;
                    var totalmoney=0;

                console.log("firstsumofv : "+firstsumofv);
                var yeonti=firstsumofv;
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

                    this.orderlist.push({"tp":tp,"yeonti":yeonti, "totalprice":orderprice,"tc":totaltc,"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":roomno, "value":orderl});
                  }
                  
                }
               

              }
             
        }
      }
      for(var cc in this.orderlist){
        console.log(this.orderlist[cc].value);
      }
      
      console.log(this.orderlist)
      //looping through this.orderlist and get sum of tp and money 
      var totalmoney=0;
      for(var c in this.orderlist){
        console.log("money : "+this.orderlist[c].money+",,,tp : "+this.orderlist[c].tp);
        totalmoney+=Number(this.orderlist[c].money)+Number(this.orderlist[c].tp)+Number(this.orderlist[c].yeonti*10000);
      }
      console.log(totalmoney)
      this.tomoney = totalmoney;

    this.util.dismissLoading();
    });
  }
  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

  getDaysOfMonth() {
    console.log("getDaysofMonth...")
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    this.currentMonth =this.date.getMonth()+1;
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    this.selectedDate = this.currentstartday.split("-")[2];
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
    console.log("daysInThisMonth : "+this.daysInThisMonth);
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
    console.log("gotonextmonthgotonextmonth")
    console.log(this.date.getFullYear()+",,,,"+this.date.getMonth()+2, 0);
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    console.log(this.date);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }
  
}
