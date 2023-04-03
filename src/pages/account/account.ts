import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController,ViewController, ModalController,NavParams } from 'ionic-angular';
import { AccountingmodalPage } from '../accountingmodal/accountingmodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { MenuController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
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
  login_data:any = {};
  company:any="";
  tomoney:any=0;
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

  firstflag=false;
  constructor(public util:UtilsProvider, public menuCtrl:MenuController,public view:ViewController,public modal:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.login_data = JSON.parse(localStorage.getItem("login_data"));
    this.company = localStorage.getItem("company");
    this.currentstartday=localStorage.getItem("startDate");
    this.firstflag = this.navParams.get("flag");
    this.get_team_list();

    this.goToday();



  }
  confirm(){
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.selectedDate)
    console.log(this.selectedName)


    //refreshing date by above info 
    let modal = this.modal.create(AccountingmodalPage,{"year":this.currentYear,"month":this.currentMonth,"day":this.selectedDate,"selected":this.selectedName});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");


      this.generatedata(this.selectedName.id);
      
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
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(v);
    console.log(this.currentDate);
    this.selectedDate=v;
    console.log(this.selectedDate)
    console.log(this.selectedName)







    var bujangid=this.selectedName.id;
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log(newdate);
    console.log(this.currentstartday)
    this.generatedata(bujangid);


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
    console.log(team);
    this.option_title_ch = 1;
    this.firemain.child('users').orderByChild("young").equalTo(team).once('value').then((snap)=>{
      console.log(snap.val());
      this.view_list = [];
      for(var i in snap.val())
      {
        if(snap.val()[i].type=="director"){

          this.view_list.push(snap.val()[i]);
        }
      }
      this.sort_temp_list = [];
      for(var j = 0; j < (this.view_list.length % 3); j++)
      {
        this.sort_temp_list.push(0)
      }
    })
  }

  get_money_data(name)
  {
    console.log("get_money_data"+name);
    this.selectedName=name;
    var bujangid=name.id;
    this.option_title_ch = 2;
    console.log(name);
    console.log("name was..");
    console.log(name.name);
    this.generatedata(bujangid);
  }
  checkEvent(day){
    return false;
  }
  generatedata(bujangid){
    this.accountmessage=[];
    this.detailarray=[];
    this.orderlist=[];
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    this.firemain.child("users").child(bujangid).once('value').then((snap)=>{
      console.log(snap.val());
      console.log(snap.val().incentive);
      console.log(snap.val().accounting);
      console.log(this.currentstartday);
      if(snap.val().accounting==undefined){
      }else{
        console.log(snap.val().accounting[this.currentstartday]);
      this.todaymoney=0;
      for(var a in snap.val().accounting){
        console.log(a);
        if(a==this.currentstartday){
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
          console.log(this.selectedDate)
          console.log(this.currentYear+"-"+Number(this.currentMonth)+"-"+this.selectedDate)
          if(snap.val().accounting[a][c].year==this.currentYear+"-"+Number(this.currentMonth)+"-"+this.selectedDate){
            this.accountmessage.push({"time":snap.val().accounting[a][c].time,"card":Number(snap.val().accounting[a][c].card),"cash":Number(snap.val().accounting[a][c].cash),"date":a,"name":snap.val().accounting[a][c].name});

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
              if(context[b]==undefined){
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


    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      console.log(snap.val().roomhistory)
      console.log("IN!")
      if(snap.val()!=undefined){
        for(var a in snap.val()){
          for(var b in snap.val()[a].roomhistory){
            for(var c in snap.val()[a].roomhistory[b]){
              if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
                if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                  console.log(snap.val()[a].roomhistory[b][c].incharge);
                  console.log(this.name);
                  if(snap.val()[a].roomhistory[b][c].incharge.trim()==this.selectedName.name.trim()){
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
                  this.yeonti=snap.val()[a].roomhistory[b][c].yeonti;
                    console.log(snap.val()[a].roomhistory[b][c]);
                    console.log(snap.val()[a].roomhistory[b][c].orderlist);
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.roomno);
                  var orderl=[];
                  var orderprice=0;
                  var tp=0;
                  for(var d in snap.val()[a].roomhistory[b][c].orderlist.orderlist){
                    orderprice+= (Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")) );
                    console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d]);
                    orderl.push(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d])
                    console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price);
                    console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num)
                    tp += snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num;
                    console.log(snap.val()[a].roomhistory[b][c].orderlist);
                    console.log(snap.val()[a].roomhistory[b][c].orderlist.orderDate);
                  }
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
                    this.orderlist.push({"tp":tp, "totalprice":orderprice,"tc":totaltc,"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].orderlist.wt,"date":snap.val()[a].roomhistory[b][c].orderlist.orderDate,"roomno":snap.val()[a].roomhistory[b][c].orderlist.roomno, "value":orderl});
                  }
                  
                }
               
                
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
        totalmoney+=Number(this.orderlist[c].money)+Number(this.orderlist[c].tp);
      }
      console.log(totalmoney)
      totalmoney=totalmoney;
      this.tomoney = totalmoney;
    });
  }
  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
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
    this.selectedDate = new Date().getDate();
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
