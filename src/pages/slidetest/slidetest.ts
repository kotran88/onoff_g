
/**
 * Generated class for the SlidetestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 import { Component, NgZone,ViewChild } from '@angular/core';
 import { MenuController, ModalController, NavController,ToastController, NavParams, Slides } from 'ionic-angular';
 
 import * as $ from "jquery";
import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
import { LoginpagePage } from '../loginpage/loginpage';
import { InfomodalPage } from '../infomodal/infomodal';
import { EditingroomPage } from '../editingroom/editingroom';
import { ChoicedetailPage } from '../choicedetail/choicedetail';
import { WaitingPage } from '../waiting/waiting';
import { ChoicejimyungPage } from '../choicejimyung/choicejimyung';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { OrdermainPage } from '../ordermain/ordermain';
import { GongjiPage } from '../gongji/gongji';
import { AccountPage } from '../account/account';
import { ServinghistoryPage } from '../servinghistory/servinghistory';
import { HistoryPage } from '../history/history';
import { C } from '@angular/core/src/render3';
import { Choicemodal3Page } from '../choicemodal3/choicemodal3';
import { Editingroom2Page } from '../editingroom2/editingroom2';
@Component({
  selector: 'page-slidetest',
  templateUrl: 'slidetest.html',
})
export class SlidetestPage {
  jimyung:any=[];
  code:any="";
  activeclass='1';
  activeclass_att='1';
  inroom:any=[];
  directorList:any=[];
  name:any="";
  mainlist=[];
  bu:any=0;
  yeonti:any="";
  allmainlist=[];
  taptriggered:any=false;
  cc:any=0;
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
  loadfinished:any=false;
  currentstart:any="";
  company:any;
  id:any="";
  nowtime:any=""
  nickname:any="";
  tc:any=0;
  paymentflag:any=false;
  public images: any;
  @ViewChild('slider') slider: Slides;
  page = 0;

  inputtext:any="";



  noagasi_info:any=0;
  agasinum_info:any=0;
  mainlist_info:any=[];
  mainlist_finished_info:any=[];
  smallroom=[];
  smallroom2=[];
  allroom=[];
  midroom=[];
  bigroom=[];
  midroom2=[];
  bigroom2=[];
  paginatedArray: any[] = [];
  pageSize = 15;
  currentPage = 1;

  selectedIncharge:any;
  selectedKey:any;
  selectedAvec:any;
  selectedLogic:any;
  selectedNumber:any;



  //choice
  agasijungsan=[];
  type:any="";
  standby:any=0;
  angelnumber_choice:any;
  searchon:any=false;
  searchon_att:any=false;
  mainlist_mine:any=[];
  searchResult:any=[];
  mainlist_choice:any=[];
  mainlist2_mine:any=[];
  mainlist_finished_choice:any=[];
  mainlist_finished_status_choice:any=[];
  mainlist_angel_choice:any=[];
  agasijungsan_choice:any=[];
  mainlisttest:any=[];
  mainlist_attend:any=[];
  original_mainlist:any=[];
  jimyungnumber:any=0;
  angelnumber:any=0;

  tab1clicked:any=false;
  tab2clicked:any=false;


  //attendance 

  selectedMonth:any=0;
  selectedYear:any=0;
  selectedday:any=0;
  selectedDay:any=0;
  numofstandby_att:any=0;
  numberofIn:any=0;
  totalagasi_att=[];
  mainlist_att=[];
  mainlist_att_no=[];
  totalin_att=0;
  totalout_att=0;
  agasijungsan_att=[];
  agasijungsantotal_att=[];


  jopanlist_att:any=[];       

  jopanjjinglist_att = [];
  jopanjjinglist2_att = [];
  mainlistfromcompany=[];
  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  newlist_att:any=[];
  todayatt:any=[];
  constructor(public zone:NgZone, public toastCtrl:ToastController , public modal: ModalController,public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname= localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");
    this.tc=localStorage.getItem("tc");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    var login=localStorage.getItem("login_data");
    
    this.selectedYear = this.currentstartday.split("-")[0];
    this.selectedMonth = this.currentstartday.split("-")[1];
    this.selectedDay = this.currentstartday.split("-")[2];

    this.selectedday = this.currentstartday;
    this.code = JSON.parse(login).young;
    this.type = localStorage.getItem("type");
this.interval=setInterval(()=>{
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  if(min<10){
    this.nowtime=hour+":0"+min;
  }else{
    this.nowtime=hour+":"+min;
  }
}
,1000)
    //console.log(login);
    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;
    //console.log(login);
    //console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
  }
  openmodal(day,month,year){
    console.log(day);

    this.selectedday = year+"-"+month+"-"+day;

    this.selectedYear = year;
    this.selectedMonth = month;
    this.selectedDay = day;
    console.log(this.currentstartday)
    console.log(this.currentYear+","+this.currentMonth+","+this.currentDate+",,,"+this.selectedDay)
    this.generating_attendance();
  }
  deleting(main){
    //console.log(main.key);
    var a = confirm("삭제하시겠습니까?")
    if(a!=true){
      return;
    }
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(main.key).remove();
    var counting=0;
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).once("value",snap=>{
      //console.log(snap.val());

      this.jimyung=[];
      for(var abc in snap.val()){
        //console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
      //console.log("jimyung : ");
      //console.log(this.jimyung);
      //console.log(this.jimyung.length);
      var counting=0;
      for(var aq in this.jimyung){
        counting++;
        //console.log(this.jimyung[aq]);
        this.jimyung[aq].v = counting;
      }

      //console.log(this.jimyung);
      for(var qa in this.jimyung){
        this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[qa].key).update({v:this.jimyung[qa].v});
      }
                  
                  //console.log("this.jimyung");
                  //console.log(this.jimyung);

    });

    
    // this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[aaaa].key).update({v:counting});
   


    
    this.refreshChoiceonlyjimyung();
  }

  refreshChoiceonlyjimyung(){
    //console.log(this.company);

    this.jimyungnumber=0;

    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).on("value",snap=>{
      //console.log(snap.val());
      this.jimyung=[];
      //console.log("jimyung...")
      for(var abc in snap.val()){
        this.jimyungnumber++;
        //console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
    

    });
  }
  write(){
    this.tabclicked(2);
    let modal = this.modal.create(ChoicejimyungPage,{});
    modal.onDidDismiss(url => {
      this.refreshChoiceonlyjimyung();
    });

    modal.present();
  }
    buchange(){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    if(this.type=="info"){
      if(this.bu==0){
        this.bu=1
      }else if(this.bu==1){
        this.bu=2;
      }else{
        this.bu=0;
      }
  
      this.firemain.child("company").child(this.company).update({"bu":this.bu});
    }
    

  }

  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);
    this.inputtext=val;
    this.searching();
  }


  searching(){
    console.log(this.mainlist_choice);
    this.searchResult=[];
    console.log("searching come");
    console.log(this.inputtext);
    console.log(this.mainlist_finished_choice);
     this.mainlist_choice.filter((item)=> {

      console.log("Incharge..."+item.incharge)

      if(item.incharge.includes(this.inputtext)){
        console.log("match4444!!!!");
        console.log(item);
        this.searchResult.push({"item":item,"no":1});
      }else{
      }

      var flag=false;
      for(var aa in item.agasi){
        console.log(item.agasi[aa]);
        //console.log(item.agasi[aa].name.includes(inputtext));
        if(isNaN(this.inputtext)){
          if(item.agasi[aa].name.includes(this.inputtext)){
            console.log("match4444!!!!");
            console.log(item);
            this.searchResult.push({"item":item,"no":1});
          }else{
          }
      
        }else{
          //숫자라면. 
          if(item.agasi[aa].roomno.includes(this.inputtext)){
            console.log("match3333!!!!");
            console.log(item);
            this.searchResult.push({"item":item,"no":1});
          }else{
          }
        }
        
      }
      //console.log("return flag " +flag);
      return flag;
    });

    this.mainlist_finished_choice.filter((item)=> {

      if(item.incharge.includes(this.inputtext)){
        console.log("match4444!!!!");
        console.log(item);
        this.searchResult.push({"item":item,"no":2});
      }else{
      }
      var flag=false;
      for(var aa in item.agasi){
        console.log(item.agasi[aa]);
        //console.log(item.agasi[aa].name.includes(inputtext));
        if(isNaN(this.inputtext)){
          if(item.agasi[aa].name.includes(this.inputtext)){
            console.log("match11111!!!!");
            console.log(item);
            this.searchResult.push({"item":item,"no":2});
          }else{
          }
          // if(item.agasi[aa].incharge.includes(this.inputtext)){
          //   console.log("match11111!!!!");
          //   console.log(item);
          //   this.searchResult.push({"item":item,"no":2});
          // }else{
          // }
        }else{
          if(item.agasi[aa].roomno.includes(this.inputtext)){
            console.log("match2222!!!!");
            console.log(item);
            this.searchResult.push({"item":item,"no":2});
          }else{
          }
        }
      }
      //console.log("return flag " +flag);
      return flag;
    });
    
    this.mainlist_finished_status_choice.filter((item)=> {
      var flag=false;
      for(var aa in item.agasi){
        //console.log(item.agasi[aa]);
        //console.log(item.agasi[aa].name.includes(inputtext));
        if(item.agasi[aa].name.includes(this.inputtext)){
          console.log("match!!!!");
          console.log(item);
          this.searchResult.push(item);
        }else{
        }
      }
      //console.log("return flag " +flag);
      return flag;
    });
    var filteredArray = this.searchResult.filter(function(item, index, array) {
      return !array.slice(index + 1).some(function(otherItem) {
        return item.item === otherItem.item && item.no === otherItem.no;
      });
    });
    console.log(filteredArray);
    this.searchResult=filteredArray;
    // console.log(this.original_mainlist);
    // var input = this.inputtext;
    // console.log(input);
    // if(this.selected=="1"){
    //   var filteredList = this.original_mainlist.filter(function(item) {
    //     return item.name.includes(input);
    //   });
    //   //console.log(filteredList);
    //   this.mainlist=filteredList;
    // }else if(this.selected=="2"){
      
    //   var filteredList2 = this.original_mainlist.filter(function(item) {
    //     //console.log(item.incharge.includes(inputtext));
    //     return item.incharge.includes(input);
    //   });

    //   //console.log(filteredList);
    //   this.mainlist=filteredList2;
    // }else if(this.selected=="3"){
      
    //   var filteredList3 = this.mainlist.filter(function(item) {
    //     var flag=false;
    //     for(var aa in item.agasi){
    //       //console.log(item.agasi[aa]);
    //       //console.log(item.agasi[aa].name.includes(inputtext));
    //       if(item.agasi[aa].name.includes(input)){
    //         flag= true;
    //       }else{
    //       }
    //     }
    //     //console.log("return flag " +flag);
    //     return flag;
        
    //   });

    //   //console.log(filteredList);
    //   this.mainlist=filteredList;
    // }else if(this.selected=="4"){

    //   this.mainlist=[];
    //   this.mainlist=this.original_mainlist;
    // }


  }

  slideChanged(){
    console.log("changed...");
    console.log(this.slider.getActiveIndex())
    this.page = this.slider.getActiveIndex();
    console.log(this.page)
    if(this.page==3){
      setTimeout(()=>{
        console.log("page 3...")


        this.generateaatendance();
      },1000)
    }
  }
  selectedTab(index) {
    console.log("tab selected");
    this.slider.slideTo(index);
  }
  goToSlide(index) {
    console.log("gotoslide : "+index);
    this.slider.slideTo(index);
    if(index==3){

    }
  }
  gotolink(value){
    if(value == 0){
      this.navCtrl.push(OrdermainPage,{flag:true}).then(() => {
        // this.navCtrl.getActive().onDidDismiss(data => {
        //   //console.log("refresh...");
        //   this.generate();
      
        // });
      });
    }else if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true}).then(() => {
        //console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          // this.menuCtrl.open();
          // setTimeout(()=>{
          //   this.menuCtrl.close();
          //   this.generate();
          // },10)
      // this.firemain.child("company").child(this.company).child("roomlist").off();
      // this.generate();
          // this.generate();
        })
      });
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true}).then(() => {
        //console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("off...")


    console.log("1111");
    console.log("11112");
    console.log("11113");
  
    this.generate_info();
    console.log("11114");

      // this.firemain.child("company").child(this.company).child("roomlist").off();
      // this.generate();
          // this.generate();
        })
      });
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
        //console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("off...")
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
    console.log("open and cloe");
    this.menuCtrl.open();
    
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}

togglesection(i){
  //console.log(i)
  //console.log(this.orderlist);
  //console.log(this.orderlist[i]);
  this.orderlist[i].open = !this.orderlist[i].open;
  //console.log(this.orderlist[i]);
}

reorderItems(indexes){
  var clonemain = [];
  clonemain = this.mainlist_choice;
  console.log("at first:");
  console.log(clonemain);
  console.log("reorder item...");
  console.log(indexes.from); //2
  console.log(indexes.to);  //3

  console.log(this.mainlist_choice);
  console.log(this.mainlist_choice[indexes.from]);
  console.log(this.mainlist_choice[indexes.to]);
  console.log("위 두개 위치를 변경한다");
  var to = clonemain[indexes.to].v;
  var from = clonemain[indexes.from].v;
  clonemain[indexes.from].v= to;
  clonemain[indexes.to].v= from;
  console.log("onmiddle");
  console.log(clonemain);
  console.log(this.mainlist_choice);
  this.mainlist_choice = clonemain;
  // clonemain[indexes.to].v=clonemain[indexes.from].v
  // console.log(clonemain);
  // console.log(clonemain);
  // console.log("before");
  // console.log(this.mainlist_choice);
  // console.log( this.mainlist_choice[indexes.from].v+"를 변경 : "+clonemain[indexes.to].v)
  // console.log( this.mainlist_choice[indexes.to].v+"를 변경 : "+clonemain[indexes.from].v)
  // clonemain[indexes.from].v=clonemain[indexes.to].v
  // console.log("onmiddle");
  // console.log(this.mainlist_choice);
  // clonemain[indexes.to].v=clonemain[indexes.from].v
  // //console.log(element)
  // console.log("result....:")
  // console.log(this.mainlist_choice);
  // console.log(clonemain);
  var count=0;

  for(var a in clonemain){
    console.log(clonemain[a].name+"를 : "+clonemain[a].v)
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(clonemain[a].name).child(clonemain[a].key).update({"v":clonemain[a].v})

  }
  this.generate_info();
  // for(var a in this.mainlist_choice){
  //   count++;
  //   console.log(this.mainlist_choice[a].name+",,,,"+this.mainlist_choice[a].v);
  //   // if(this.mainlist_choice[a].up==undefined){
  //   //   console.log("up is not exist");
  //   //   // break;
  //   // }
  //   // var up = this.mainlist_choice[a].up;
    
  //   // if(up!=undefined){

  //   //   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[a].name).child(this.mainlist_choice[a].key).update({"v":this.mainlist_choice[a].v,"up":up})
  //   // }else{

  //   console.log(this.mainlist_choice[a].name+"를 : "+this.mainlist_choice[a].v);
  //   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[a].name).child(this.mainlist_choice[a].key).update({"v":this.mainlist_choice[a].v})
  //   // }
  // }

  console.log(this.mainlist_choice);
  return;

  console.log("for loop finished");
  var counting=0;
  console.log(this.mainlist_choice);
  //reorder rest of item. 
  for(var ababb in this.mainlist_choice){
    counting++;
    //console.log(this.mainlist[ababb])
    this.mainlist_choice[ababb].v = counting;
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[ababb].name).child(this.mainlist_choice[ababb].key).update({"v":counting})
  }
  console.log(this.mainlist_choice);

};
gotowaiting(){
  this.navCtrl.push(WaitingPage,{flag:true}).then(() => {
    console.log("WaitingPage back")
    this.navCtrl.getActive().onDidDismiss(data => {
      console.log("off...")
      console.log(data);
      if(data==undefined){
        return;
      }
      if(data.result=="waiting"){
        window.alert("방을 선택하세요.");
        console.log(data.data);
        console.log(data.data.incharge);
        this.selectedKey = data.data.key;
        this.selectedIncharge=data.data.incharge;
        this.selectedAvec = data.data.avec;
        this.selectedLogic = data.data.logic;
        this.selectedNumber = data.data.numofpeople;
        console.log(data.data.avec);
        console.log(data.data.logic);
      }
  // this.firemain.child("company").child(this.company).child("roomlist").off();
    })
  });
}
godetail(a,v){
  if(!this.paymentflag){
    window.alert("결제전 이용 불가합니다.")
    return;
  }
  this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
    this.navCtrl.getActive().onDidDismiss(data => {

      console.log("ChoicedetailPage ondiddismiss....");
      console.log(data);
 
        this.generate();
      this.generate_info();

        setTimeout(()=>{
          this.screenSwitch(1);
          this.screenSwitch_att(1);
        },10)

    })
  });
}


generateaatendance(){

  this.util.presentLoading();
  console.log("ionViewWillEnter");
  console.log(this.company);

  this.totalagasi_att=[];
  this.mainlist_att=[];
  this.mainlist_att_no=[];
  this.totalin_att=0;
  this.agasijungsan_att=[];
  this.agasijungsantotal_att=[];
  this.jopanjjinglist_att = [];
  this.jopanjjinglist2_att = [];
  this.mainlistfromcompany=[];

  this.generating_attendance();
  this.firemain.child("company").child(this.company).child('madelist').child(this.selectedday).once('value').then((snap)=>{
   
    if(snap.val()!=undefined){
      console.log(snap.val())
      for(var a in snap.val()){

          for(var b in snap.val()[a]){
            console.log(b);
            console.log(snap.val()[a][b]);
                var mainlist=snap.val()[a][b];
console.log(mainlist);
        for(var d in mainlist.agasi){
               
          if(mainlist.agasi[d].findate!=undefined){
            //종료 된 아가씨. 
            console.log("종료된 아가씨");
            console.log(mainlist.agasi[d])

            // var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
            // var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
            // var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
            // mainlist.agasi[d].money=totalmoney;
            // mainlist.agasi[d].tc=tctotal;
            // mainlist.agasi[d].bantee=bantee;
            this.mainlistfromcompany.push({"name":mainlist.agasi[d].name,"wantee":Math.floor(mainlist.agasi[d].tc), "tc":mainlist.agasi[d].tc,"bantee":mainlist.agasi[d].bantee,"money":mainlist.agasi[d].money})
        
          }else{

            var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
            var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
            mainlist.agasi[d].money=totalmoney;
            mainlist.agasi[d].tc=tctotal;
            mainlist.agasi[d].bantee=bantee;
            this.agasijungsantotal_att.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
          this.agasijungsan_att.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
          console.log("is  having findate so this agasi is in bang")
          console.log(mainlist.agasi[d].name);
            this.mainlistfromcompany.push({"name":mainlist.agasi[d].name,"wantee":Math.floor(mainlist.agasi[d].tc), "tc":mainlist.agasi[d].tc,"bantee":mainlist.agasi[d].bantee,"money":mainlist.agasi[d].money})
          }
        }

}
}

this.numberofIn=this.agasijungsan_att.length;
this.agasijungsan_att.push({"name":"","tc":"","wantee":"","bantee":"","chasam":"","money":"","incharge":""})

this.agasijungsan_att.push({"name":"","tc":"","wantee":"","bantee":"","chasam":"","money":"","incharge":""})
console.log("for loop finfin")

console.log(this.mainlistfromcompany);
var newvaluearray=[];
for(var a in this.mainlistfromcompany){
var check=0;
for(var b in newvaluearray){
  if(this.mainlistfromcompany[a].name==newvaluearray[b].name){
    check=1;
    var aa = Number(newvaluearray[b].tc) + Number(this.mainlistfromcompany[a].tc);
    newvaluearray[b].tc = aa;
    newvaluearray[b].money += this.mainlistfromcompany[a].money;
    newvaluearray[b].bantee += this.mainlistfromcompany[a].bantee;
    newvaluearray[b].wantee += this.mainlistfromcompany[a].wantee;
  }
}
if(check==0){
  if(this.mainlistfromcompany[a].tc==undefined){
    newvaluearray.push({"name":this.mainlistfromcompany[a].name,"tc":0,"money":0,"bantee":0,"wantee":0});

  }else{
    newvaluearray.push({"name":this.mainlistfromcompany[a].name,"tc":Number(this.mainlistfromcompany[a].tc),"money":this.mainlistfromcompany[a].money,"bantee":this.mainlistfromcompany[a].bantee,"wantee":this.mainlistfromcompany[a].wantee});

  }
    }
}
console.log(newvaluearray);
this.mainlistfromcompany=newvaluearray;
this.mainlist=[];
this.firemain.child('attendance').child(this.company).child(this.currentstartday).once('value').then((snap)=>{
console.log("attendance check...");
    console.log("mmmm")
    console.log(snap.val())
    for(var b in snap.val()){
      if(snap.val()[b].attend!=undefined){
        console.log(snap.val()[b].attend)
        this.original_mainlist.push({"name":snap.val()[b].attend.name,"time": snap.val()[b].attend.time, "status":snap.val()[b].attend.flag,"team":snap.val()[b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
     
        this.mainlist_att.push({"name":snap.val()[b].attend.name,"time": snap.val()[b].attend.time, "status":snap.val()[b].attend.flag,"team":snap.val()[b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
     
        for(var abba in this.mainlistfromcompany){
          if(this.mainlistfromcompany[abba].name == snap.val()[b].attend.name){
            console.log(snap.val()[b].attend);
            console.log(this.mainlistfromcompany[abba])

            // this.agasijungsantotal.push({"bantee":this.mainlistfromcompany[abba].bantee,"chasam":0,"name":this.mainlistfromcompany[abba].name,"date":snap.val()[a].roomhistory[aa][b][c].date,"incharge":snap.val()[a].roomhistory[aa][b][c].incharge,"money":snap.val()[a].roomhistory[aa][b][c].money,"tc":snap.val()[a].roomhistory[aa][b][c].tc,"wantee":Math.floor(snap.val()[a].roomhistory[aa][b][c].tc)});
            for(var abww in this.mainlist_att){
              //remove this.mainlist[abw]  if name is same as snap.val()[b].attend.name
              if(this.mainlist_att[abww].name == snap.val()[b].attend.name){
                this.mainlist_att.splice(Number(abww),1);
              }
              
            }
            this.original_mainlist.push({"name":snap.val()[b].attend.name,"time": snap.val()[b].attend.time, "status":snap.val()[b].attend.flag,"team":snap.val()[b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
     
            this.mainlist_att.push({"name":snap.val()[b].attend.name,"time": snap.val()[b].attend.time,"status":snap.val()[b].attend.flag,"team":snap.val()[b].attend.team,"tc":this.mainlistfromcompany[abba].tc.toFixed(1),"wantee":this.mainlistfromcompany[abba].wantee,"money":this.mainlistfromcompany[abba].money,"bantee":this.mainlistfromcompany[abba].bantee});
       
              }
        }
        
        this.totalin_att++;
      }
      if(snap.val()[b].noattend!=undefined){
        this.totalout_att++;
        this.mainlist_att_no.push({"name":snap.val()[b].attend.name,"time": snap.val()[b].attend.time, "status":snap.val()[b].noattend.flag,"team":snap.val()[b].noattend.team});
      }

    }
this.mainlist.sort(function(a, b) {
  var timeA = a.time.split(":"); // split time string into hours and minutes
  var timeB = b.time.split(":");
  if (timeA[0] === timeB[0]) { // if hours are equal, compare minutes
    return timeA[1] - timeB[1];
  } else { // otherwise, compare hours
    return timeA[0] - timeB[0];
  }
});
console.log(this.mainlist)
console.log(this.mainlistfromcompany)


console.log("okdoneeeee")
console.log(this.agasijungsan_att);
console.log(this.agasijungsantotal_att);
// this.util.dismissLoading();

this.numofstandby_att=this.mainlist_att.length - this.numberofIn;
this.util.dismissLoading();
});

    }else{
      console.log("no data!");

this.util.dismissLoading();
    }
  });
}

generate(){
  console.log("generategenerategenerategenerate");
  this.noflaglist=[];
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){

              if(snap.val()[a].date==this.currentstartday){
                if(this.type=="wt"){
                  if(snap.val()[a].wt!=this.nickname){
                    continue;
                  }
                }else if(this.type=="director"||this.type=="info"){
                  if(snap.val()[a].incharge!=this.nickname){
                    continue;
                  }
                }
                

      //           console.log(snap.val()[a]);
      // console.log(snap.val()[a].name);
                var numofangel =0;
                var mainlist=snap.val()[a];
                //console.log("mainlist...");
                //console.log(mainlist);


      var newtc=0;
      var tcarray = [];
      var tcarraywithoutagasi = [];
      var tarray=[];
      var chasamarray=[];
      var chasamtotal=0;
      var tctotal=0;
      var yeontireason="";
      // console.log(snap.val()[a].name);
      // console.log(snap.val()[a]);
      var numofpeople = snap.val()[a].numofpeople;
      var logic = snap.val()[a].logic;
      var inagasi = 0;
      var totaltc=0;
      // console.log(mainlist);
      // if(mainlist.agasi!=undefined){
      //   console.log(mainlist.agasi);
      //   console.log("numofagasi : "+mainlist.agasi.length);
      // }
      // // console.log("agasi info");
      // console.log(mainlist.agasi);

      var totalmoney=0;
      for(var cccc in mainlist.agasi){
        // console.log("looping each agasi");
        // console.log(mainlist.agasi[cccc].findate);
        if(mainlist.agasi[cccc].findate!=undefined){
          // console.log("not undefined...so it is fin.")
          totaltc+=Number(mainlist.agasi[cccc].tc);
          // console.log("plus : "+mainlist.agasi[cccc].money);
          totalmoney+=Number(mainlist.agasi[cccc].money);
        }else{

          // console.log("is undefined!!!!so it is not fin....")
          var tm=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[0]);
          // if(mainlist.agasi[cccc].tc!=undefined){
          //   console.log(mainlist.agasi[cccc].name);
          // console.log("totalmoney : "+tm);
          // }
          var tctotal=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[1]);
          var bantee=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[2]);
          mainlist.agasi[cccc].totalmoney=tm;
          totaltc+=tctotal;
          totalmoney+=Number(tm);
          mainlist.agasi[cccc].tc=tctotal;
          mainlist.agasi[cccc].bantee=bantee;
          //console.log(mainlist.agasi[cccc]);
          if(mainlist.agasi[cccc].angel){
            numofangel++;
          }
        }

        inagasi++;
        newtc += Math.floor(mainlist.agasi[cccc].tc)
        if(mainlist.agasi[cccc].angel==true||mainlist.agasi[cccc].angel=="true"){

        }else{
          if(Math.floor(mainlist.agasi[cccc].tc)!=0){
            tcarraywithoutagasi.push(Math.floor(mainlist.agasi[cccc].tc));
          }
        }
        tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
        tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
        tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
        chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
        chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
      
      }
      // console.log("totalmoney : "+totalmoney);
      chasamtotal=Number(chasamtotal.toFixed(2));
      // console.log("chasamtotal:"+chasamtotal);
      var newchasamtotal=chasamtotal.toString();
      //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
      newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
      newchasamtotal = ""+newchasamtotal;
      if(chasamtotal==0){
        newchasamtotal="0";
      }
      // newchasamtotal
      // console.log(numofpeople+"newtc"+newtc+",,,,"+newchasamtotal);
      tctotal=newtc;
      //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
      // 나머지 완티의 갯수를 고려해서 계산.  
      //console.log(snap.val()[a].orderlist);
      var orderl=[];
      var orderprice=0;
      var tp=0;
      var tbottle=0;
      

                if(snap.val()[a].orderlist==undefined){

                }else{
                  for(var d in snap.val()[a].orderlist.orderlist){

                    console.log("snap.val()[a].orderlist.orderlist[d]snap.val()[a].orderlist.orderlist[d]");
                    console.log(snap.val()[a].orderlist.orderlist[d]);
                    if(snap.val()[a].orderlist.orderlist[d].category=="주류"){
                      tbottle+=Number(snap.val()[a].orderlist.orderlist[d].num);
                    }
                    orderprice+= (Number(snap.val()[a].orderlist.orderlist[d].price) );
                    orderl.push({"category":snap.val()[a].orderlist.orderlist[d].category, "name":snap.val()[a].orderlist.orderlist[d].name,"num":snap.val()[a].orderlist.orderlist[d].num,"orderDate":snap.val()[a].orderlist.orderlist[d].orderDate,"price":Number(snap.val()[a].orderlist.orderlist[d].price.replaceAll(",","")) *  snap.val()[a].orderlist.orderlist[d].num,"subcategory":snap.val()[a].orderlist.orderlist[d]
                })
                    tp += snap.val()[a].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].orderlist.orderlist[d].num;
                  }
                }
               console.log(orderl);
               
                console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
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
                  tarray.sort(function(a,b){
                    if (a.date < b.date) {
                      return -1;
                    }
                    if (a.date > b.date) {
                      return 1;
                    }
                    return 0;
                  });
                  var cvalue=-1;
                  var stop=0;
                  for(var abab in tarray){
                    cvalue++;
                    if(cvalue<numofpeople){
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc-tbottle
                        yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"더하고 뺌"+tbottle+""
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+" = "+(tarray[abab].tc-tbottle)+"개.발생.";
                   
                        }
                      }
                      // firstsumofv+=tarray[abab].tc
                      // yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+"개를 더함??"
                    }
                    if(cvalue>=numofpeople){

                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="/"+tarray[abab].name+"의tc"+tarray[abab].tc+"를 더함.!!!"
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"tc"+tarray[abab].tc+"-"+tbottle+"병,="+(tarray[abab].tc-tbottle)+"개.발생";
                   
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
                  // console.log("날개 제외 아가씨 수가 사람수와 같다면....");
                  // console.log(tarray);
                  // console.log(tcarraywithoutagasi);
                for(var abab in tarray){

                  if(tarray[abab].angel!=true){

                  totalsum+=tarray[abab].tc;
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함.."
                  }else if(tarray[abab].angel){
                    // console.log("angel!!!");
                    // console.log(tarray[abab].tc);
                    // console.log(tbottle);
                    if(tarray[abab].tc - tbottle>=0){
                      //  console.log("in")
                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+"="+(tarray[abab].tc-tbottle)+"개 발생";
               
                    }else{
                      yeontireason+=tarray[abab].tc+"-"+tbottle+"=0 ,연티:0"
                    }
                  }

                }
                firstsumofv= numofpeople*tbottle-totalsum
                // console.log(firstsumofv);
                if(firstsumofv>0){
                  firstsumofv=0;
                }
                yeontireason += "인원*병-완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
              }else if(tcarraywithoutagasi.length<numofpeople){
                // console.log(tcarraywithoutagasi+",,,"+numofpeople);
                // console.log("날개 제외 아가씨 수가 사람수보다 작다면....");
                // console.log(tcarray);
                for(var abab in tcarray){
                  totalsum+=tcarray[abab];
                }
                var filteredArr = tcarray.filter(function(element) {
                  return element !== 0;
                });
                var length = filteredArr.length;
                
                  firstsumofv=0;
                  var newnumofpeople=length
                  firstsumofv= newnumofpeople*tbottle-totalsum
                  if(firstsumofv>0){
                    firstsumofv=0;
                  }
                   yeontireason = ""+length+"로조정."+" 인원*병-완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
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
              //   console.log("yeontiiiii : "+yeonti);
              // console.log(yeontireason)
              //   console.log("total bottle : "+tbottle);
              //     console.log(mainlist)
              //     console.log(tp);
              //     console.log("totalmoney....")
                  totalmoney=totalmoney*10000;

                  // console.log("calcuu");
                  // console.log(this.todaymoney )
                  // console.log(tp);
                  // console.log(yeonti);
                  // console.log(totalmoney);
                  this.todaymoney += tp+totalmoney+Number(yeonti*10000);
                  // console.log(this.todaymoney);
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
                    this.orderlist.push({"flag":false, "open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  // }
                     }
             
              
            
           
      }
      this.orderlist.push({"flag":"nono"});
               
    }
    // console.log("generate....this.orderlist");
    // console.log(this.orderlist);
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
    
    // console.log(this.orderlist);
    // console.log(this.orderlist);
    console.log("waiter end!");
  });
}

ionViewDidLeave(){
  clearInterval(this.interval)
}
ionViewWillEnter(){
  //console.log("will enter!!!");
  

}
refreshoneroom2(mainlist){
  console.log("refreshoneroom22222 ");
  console.log(this.mainlist_finished_choice);
  console.log(mainlist);

  for(var v in this.mainlist_info){
    if(this.mainlist_info[v].key == mainlist.key){

      var inagasi=0;
      if(mainlist.agasi!=undefined){
        for(var ccaacc in mainlist.agasi){
          if(mainlist.agasi[ccaacc].findate==undefined){
            inagasi++;
          }
        }
      }
      console.log("match!!!");
      console.log(this.mainlist_info[v]);
      console.log("Change to "+mainlist.numofpeople);
      this.mainlist_info[v].directorId = mainlist.directorId;
      this.mainlist_info[v].agasi = mainlist.agasi;
      this.mainlist_info[v].avec = mainlist.avec;
      this.mainlist_info[v].ss = mainlist.ss;
      this.mainlist_info[v].date = mainlist.date;
      this.mainlist_info[v].incharge = mainlist.incharge;
      this.mainlist_info[v].insert_date = mainlist.insert_date;
      this.mainlist_info[v].insert_date_full = mainlist.insert_date_full;
      this.mainlist_info[v].key = mainlist.key;
      this.mainlist_info[v].numofpeople = mainlist.numofpeople;
      this.mainlist_info[v].lack = mainlist.numofpeople - inagasi;
      this.mainlist_info[v].name = mainlist.name;
      this.mainlist_info[v].orderlist = mainlist.orderlist;
      this.mainlist_info[v].status = mainlist.status;
      this.mainlist_info[v].memo = mainlist.memo;

    }
  }
  for(var v in this.mainlist_finished_choice){
    console.log(this.mainlist_finished_choice[v].key);
    if(this.mainlist_finished_choice[v].key == mainlist.key){
      var inagasi=0;
      if(mainlist.agasi!=undefined){
        for(var ccaacc in mainlist.agasi){
          if(mainlist.agasi[ccaacc].findate==undefined){
            inagasi++;
          }
        }
      }
      console.log("match!!!");
      console.log(this.mainlist_finished_choice[v]);
      console.log("Change to "+mainlist.numofpeople);
      this.mainlist_finished_choice[v].directorId = mainlist.directorId;
      this.mainlist_finished_choice[v].agasi = mainlist.agasi;
      this.mainlist_finished_choice[v].avec = mainlist.avec;
      this.mainlist_finished_choice[v].ss = mainlist.ss;
      this.mainlist_finished_choice[v].date = mainlist.date;
      this.mainlist_finished_choice[v].incharge = mainlist.incharge;
      this.mainlist_finished_choice[v].insert_date = mainlist.insert_date;
      this.mainlist_finished_choice[v].insert_date_full = mainlist.insert_date_full;
      this.mainlist_finished_choice[v].key = mainlist.key;
      this.mainlist_finished_choice[v].numofpeople = mainlist.numofpeople;
      this.mainlist_finished_choice[v].lack = mainlist.numofpeople - inagasi;
      this.mainlist_finished_choice[v].name = mainlist.name;
      this.mainlist_finished_choice[v].orderlist = mainlist.orderlist;
      this.mainlist_finished_choice[v].status = mainlist.status;
      this.mainlist_finished_choice[v].memo = mainlist.memo;


    }
  }
  //console.log(this.mainlist);

}
refreshoneroom(mainlist){

  console.log("refreshoneroom ");
  console.log(this.mainlist_choice);
  console.log(mainlist);


  for(var v in this.mainlist_info){
    if(this.mainlist_info[v].key == mainlist.key){

      var inagasi=0;
      if(mainlist.agasi!=undefined){
        for(var ccaacc in mainlist.agasi){
          if(mainlist.agasi[ccaacc].findate==undefined){
            inagasi++;
          }
        }
      }
      console.log("match!!!");
      console.log(this.mainlist_info[v]);
      console.log("Change to "+mainlist.numofpeople);
      this.mainlist_info[v].directorId = mainlist.directorId;
      this.mainlist_info[v].agasi = mainlist.agasi;
      this.mainlist_info[v].avec = mainlist.avec;
      this.mainlist_info[v].ss = mainlist.ss;
      this.mainlist_info[v].date = mainlist.date;
      this.mainlist_info[v].incharge = mainlist.incharge;
      this.mainlist_info[v].insert_date = mainlist.insert_date;
      this.mainlist_info[v].insert_date_full = mainlist.insert_date_full;
      this.mainlist_info[v].key = mainlist.key;
      this.mainlist_info[v].numofpeople = mainlist.numofpeople;
      this.mainlist_info[v].lack = mainlist.numofpeople - inagasi;
      this.mainlist_info[v].name = mainlist.name;
      this.mainlist_info[v].orderlist = mainlist.orderlist;
      this.mainlist_info[v].status = mainlist.status;
      this.mainlist_info[v].memo = mainlist.memo;

    }
  }
  
  for(var v in this.mainlist_choice){
    console.log(this.mainlist_choice[v].key);
    if(this.mainlist_choice[v].key == mainlist.key){
      var inagasi=0;
      if(mainlist.agasi!=undefined){
        for(var ccaacc in mainlist.agasi){
          if(mainlist.agasi[ccaacc].findate==undefined){
            inagasi++;
          }
        }
      }
      console.log("match!!!");
      console.log(this.mainlist_choice[v]);
      console.log("Change to "+mainlist.numofpeople);
      this.mainlist_choice[v].directorId = mainlist.directorId;
      this.mainlist_choice[v].agasi = mainlist.agasi;
      this.mainlist_choice[v].avec = mainlist.avec;
      this.mainlist_choice[v].date = mainlist.date;
      this.mainlist_choice[v].ss = mainlist.ss;
      this.mainlist_choice[v].incharge = mainlist.incharge;
      this.mainlist_choice[v].insert_date = mainlist.insert_date;
      this.mainlist_choice[v].insert_date_full = mainlist.insert_date_full;
      this.mainlist_choice[v].key = mainlist.key;
      this.mainlist_choice[v].numofpeople = mainlist.numofpeople;
      this.mainlist_choice[v].lack = mainlist.numofpeople - inagasi;
      this.mainlist_choice[v].name = mainlist.name;
      this.mainlist_choice[v].orderlist = mainlist.orderlist;
      this.mainlist_choice[v].status = mainlist.status;
      this.mainlist_choice[v].memo = mainlist.memo;
    }
  }

  console.log(this.mainlist_choice);
}
refreshoneroom3(mainlist){
  console.log("refreshoneroom ");
  console.log(mainlist);
  this.todaymoney=0;
  // if(mainlist==undefined){
  //   this.generate();
  //   return;
  // }
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
      //console.log(mainlist.agasi[cccc]);
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
  //console.log(mainlist.orderlist);
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
           
           
            console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
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
                //console.log(a.date+",,,"+b.date)
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
                  console.log("cvalue<numofpeople");

                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=(tarray[abab].tc-tbottle)
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+",,"+tbottle+"뺌."
                  }else if(tarray[abab].angel){
                    if(tarray[abab].tc - tbottle>=0){

                       firstsumofv+= tarray[abab].tc - tbottle;

                       yeontireason+="//날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
               
                    }
                  }
                  firstsumofv+=tarray[abab].tc-tbottle
                  yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+","+tbottle+"뺌."
                }
                if(cvalue>=numofpeople){
                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함?."
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
              console.log("calcu");

              console.log(this.todaymoney )
              console.log(tp);
              console.log(yeonti);
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
                  //console.log(this.orderlist[sd])
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
                  //console.log(this.orderlist);
                  //console.log("modify...")
                  // this.orderlist[sd].push({"open":false, "enddate":enddate, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].roomhistory[b][c].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
          
                }
              }
              if(!flagging){
                this.orderlist.push({"open":false, "enddate":enddate,"status":mainlist.status,  "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":mainlist.incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":mainlist.wt,"date":orderdate,"roomno":mainlist.name, "value":orderl});
              }
              //console.log(this.orderlist);
}
refreshon(){
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_removed', function(snap, prevChildKey) {
    //console.log("child_removedchild_removedchild_removedchild_removed");
    //console.log(snap.val());
    //console.log(prevChildKey);
    // this.firemain.child("compan
    // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
  });
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_moved', function(snap, prevChildKey) {
    //console.log("child_movedchild_movedchild_movedchild_moved");
    //console.log(snap.val());
    //console.log(prevChildKey);
    // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
  });
  this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_added', (snap, prevChildKey) => {

    if(this.loadfinished){
      console.log("cccccccccccccccccchild_addedchild_addedchild_addedchild_added");
      console.log(snap.val());
      console.log(prevChildKey);
      setTimeout(()=>{
  
        this.generate_info();
        this.generate();
      },1000)
console.log("refreshon 11113");

    }
    // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
  });
  this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_changed', (snap, prevChildKey) =>{
    console.log("again... child_changed.....")

  //console.log("change4444");
    console.log(snap.val());
    //console.log(prevChildKey);
    //console.log(this.mainlist)
      for(var date in snap.val()){
          for(var room in this.mainlist_choice){
            if(this.mainlist_choice[room].key == snap.val()[date].key){
              this.refreshoneroom(snap.val()[date]);
              //console.log(this.mainlist[room]);
                }
          }
          for(var room in this.mainlist_finished_choice){
            if(this.mainlist_finished_choice[room].key == snap.val()[date].key){
              //console.log(this.mainlist_finished[room]);
              this.refreshoneroom2(snap.val()[date]);
              // this.refreshoneroom(snap.val().roomhistory[date][sdate]);
                }
          }
      }
  
    // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
  });

  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_changed', (snap, prevChildKey) =>{
      console.log("child_changedchild_changedchild_changedchild_changedchild_changed");
      console.log(snap.val());
      // this.generate();
      // for(var date in snap.val()){
      //   console.log("date:"+date);
      //     // for(var sdate in snap.val().roomhistory[date]){
      //     //   this.refreshoneroom(snap.val().roomhistory[date][sdate]);
      //     // }
      //     var flagging=false;
      //     for(var room in this.orderlist){
      //         console.log(this.orderlist[room].key);
      //         console.log(snap.val().key);
              
      //       if(this.orderlist[room].key == snap.val().key){
      //         //console.log("match!!!");
      //         flagging=true;
            
      //           }
      //     }
      //     if(!flagging){
      //       this.refreshoneroom(snap.val());
      //     }
      // }
      // this.refreshChoice2();
      // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
    });
}
generateuid(){
  return "aaaaaa";
}
  ionViewDidLoad() {



    // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).remove();
    // this.firemain.child("users").orderByChild("type").equalTo("agasi").once('value').then((snap2)=>{
      
    // });
    // this.firemain.child("users").orderByChild("type").equalTo("director").once('value').then((snap2)=>{

    // });


    // var newkey = this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).key;
    // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(newkey).update({"a":"b"})
  
    this.loadfinished=false;
    this.firemain.child("company").child(this.company).child("choice").on('child_changed', (snap, prevChildKey) =>{
      console.log("changed...");
      console.log(snap.val());
      console.log(snap.val().name);
      console.log(this.mainlist_choice);
      console.log(this.mainlist_finished_choice);
      console.log(this.mainlist_finished_status_choice);
      if(snap.val().status=="start"){
        for(var val in this.mainlist_choice){
          if(this.mainlist_choice[val].key == snap.val().key){
            this.mainlist_choice[val].onStatus = true;
          }
        }
      }else if(snap.val().status=="end"){
        for(var val in this.mainlist_choice){
          if(this.mainlist_choice[val].key == snap.val().key){
            this.mainlist_choice[val].onStatus = false;
          }
        }
      }

      console.log(this.mainlist_choice)
    });
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_removed', function(snap, prevChildKey) {
      });
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_moved', function(snap, prevChildKey) {
      });
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_added', (snap, prevChildKey)=> {
        console.log("on.");
        if(this.loadfinished){
    console.log("child_adde loadfinished");
    this.generate_info();
    setTimeout(()=>{

      this.generate();
    },1000)
        }
      });
      // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").off();
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_changed', (snap, prevChildKey) =>{
        console.log("child change");
        console.group(prevChildKey);
        console.log(snap.val());

        this.cc++;
        if(this.cc%2==0){
          for(var date in snap.val()){
            for(var room in this.mainlist_choice){
              if(this.mainlist_choice[room].key == snap.val()[date].key){
                this.refreshoneroom(snap.val()[date]);
                //console.log(this.mainlist[room]);
                  }
            }
            for(var room in this.mainlist_finished_choice){
              if(this.mainlist_finished_choice[room].key == snap.val()[date].key){
                //console.log(this.mainlist_finished[room]);
                this.refreshoneroom2(snap.val()[date]);
                // this.refreshoneroom(snap.val().roomhistory[date][sdate]);
                  }
            }
        }
        console.log("generate info...");
        this.generate_info();
        this.cc=0;
        }else{
          console.log(this.mainlist_info)
          for(var date in snap.val()){
            for(var room in this.mainlist_choice){
              if(this.mainlist_choice[room].key == snap.val()[date].key){
                this.refreshoneroom(snap.val()[date]);
                  }
            }
            for(var room in this.mainlist_finished_choice){
              if(this.mainlist_finished_choice[room].key == snap.val()[date].key){
                this.refreshoneroom2(snap.val()[date]);
                  }
            }
        }
        }
        console.log(snap.val());
      });

      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_changed', (snap, prevChildKey) =>{
          console.log("child_changedchild_changedchild_changedchild_changedchild_changed");
          console.log(snap.val());
        });


        this.firemain.child("company").child(this.company).once('value').then((snap2)=>{
          console.log(snap2.val().bu)
          if(snap2.val().bu==undefined){
      
            this.bu=0;
          }else{
      
            this.bu=snap2.val().bu;
          }
        });



    console.log("page start from here");
    this.goToday();

    //waiter 화면
    this.generate();
    //인포 및 초이스 
    this.generate_info();
    //지명 불러오기
    this.refreshChoiceonlyjimyung();
    //방 카테고리 .
    this.generateroomcategory()
    
    setTimeout(()=>{
      this.screenSwitch(1);
      this.screenSwitch_att(1);
    },1000)
  }
  get totalPages() {
    return Math.ceil(this.mainlist_info.length / this.pageSize);
  }
  get pageNumbers() {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }



  paginateArray() {
    console.log("paginateArraypaginateArraypaginateArraypaginateArray");
    console.log(this.mainlist_info);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArray = this.mainlist_info.slice(startIndex, endIndex);
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateArray();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateArray();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateArray();
    }
  }
  generate_info(){
    console.log("generate_infogenerate_infogenerate_infogenerate_infogenerate_info come");
    this.mainlist_info=[];
    this.mainlist_finished_info=[];
    this.noagasi_info=0;
    this.agasinum_info=0;


    this.agasijungsan=[];
    this.mainlisttest=[];
    this.mainlist=[];
    this.mainlist_mine=[];
    this.mainlist2_mine=[];

    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];

    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];

    this.mainlist_choice=[];
    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];
    this.agasijungsan_choice=[];
    console.log(this.mainlist_info);
    console.log(this.mainlist_finished_info);

    var orderedQuery = this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"")
    orderedQuery.once("value", (snapshot) =>{
     snapshot.forEach((childSnapshot) => {
       var childData = childSnapshot.val();

      for(var a in childSnapshot.val()){
              



              if(childSnapshot.val()[a].date!=undefined){
                if(childSnapshot.val()[a].end_date==undefined){
                  console.log(childSnapshot.val()[a].flag);
                  if(childSnapshot.val()[a].flag){
                    if(!childSnapshot.val()[a].noflag&&childSnapshot.val()[a].firstflag==true){
                      
                    }else{

                    this.mainlist_info.push(childSnapshot.val()[a]);
                    }
                  }
                  }else{
                    //console.log("this is finished room");
                    //console.log(snap.val()[a][b]);
                    if(childSnapshot.val()[a].agasi==undefined&&childSnapshot.val()[a].orderlist==undefined){
                      //이방은 OB처리해야함. 
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should be ob ++ ");
                      this.noagasi_info++;
                    }else{
                      
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should not be ob ++ ");
                      this.agasinum_info++;
                    }
                    //iterate through snap.val()[a][b] 
                    //and push to mainlist_finished
                    // this.mainlist_finished.push(snap.val()[a][b]);
                    var agasi = [];
                    if(childSnapshot.val()[a].agasi==undefined){
                      agasi = [];
                    }else{
                      agasi = childSnapshot.val()[a].agasi;
                    }
                    //console.log("agasi length : "+agasi.length);
                    //console.log(agasi);
                    if(agasi.length==0){
                      
                    }else{
                    }




                    if(childSnapshot.val()[a].firstflag){

                    }else{
                      this.mainlist_finished_info.push({
                        "v":childSnapshot.val()[a].v, "agasi":agasi,
                            "date":childSnapshot.val()[a].date,
                          "incharge":childSnapshot.val()[a].incharge,
                        "insert_date":childSnapshot.val()[a].insert_date,
                      "insert_date_full":childSnapshot.val()[a].insert_date_full,
                              "key":childSnapshot.val()[a].key,
                            "name":childSnapshot.val()[a].name,
                            "avec":childSnapshot.val()[a].avec,
                            "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                            "lastupdated":childSnapshot.val()[a].lastupdated,
                            "directorId":childSnapshot.val()[a].directorId,
                          "numofpeople":childSnapshot.val()[a].numofpeople,
                          "status":childSnapshot.val()[a].status,
                        "wt":childSnapshot.val()[a].wt
                      })
                    }
                    
                    // this.mainlist_finished.push(childSnapshot.val()[a]);
                  }
              }
              
              // if(snap.childSnapshot.val()[a].end_date_full==undefined){
                if(childSnapshot.val()[a].date!=undefined){
                  var inagasi = 0;
                  var totalagasi = 0;
              if(childSnapshot.val()[a].agasi!=undefined){

                for(var c in childSnapshot.val()[a].agasi){
                  totalagasi++;
                  if(childSnapshot.val()[a].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  var orderlist="";
                  if(childSnapshot.val()[a].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=childSnapshot.val()[a].orderlist;
                  }
                if(childSnapshot.val()[a].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }


            var memo = "";
            memo = childSnapshot.val()[a].memo;


                //console.log(inagasi);
                //console.log(totalagasi);
                
                if(!childSnapshot.val()[a].noflag&&childSnapshot.val()[a].firstflag==true||childSnapshot.val()[a].noflag&&childSnapshot.val()[a].firstflag==true){
                  continue;
                }
                  if(childSnapshot.val()[a].ss){
                    if(childSnapshot.val()[a].status=="fin"){
                      this.mainlist_finished_status_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                      "date":childSnapshot.val()[a].date,
                    "incharge":childSnapshot.val()[a].incharge,
                  "insert_date":childSnapshot.val()[a].insert_date,
                "insert_date_full":childSnapshot.val()[a].insert_date_full,
                        "key":childSnapshot.val()[a].key,
                      "name":childSnapshot.val()[a].name,
                      "orderlist":orderlist,
                      "avec":childSnapshot.val()[a].avec,
                      "memo":memo,
                      "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                      "lastupdated":childSnapshot.val()[a].lastupdated,
                      "directorId":childSnapshot.val()[a].directorId,
                    "numofpeople":childSnapshot.val()[a].numofpeople,
                    "status":childSnapshot.val()[a].status,
                  "wt":childSnapshot.val()[a].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
            
                    }else if(childSnapshot.val()[a].angel==true){
                      //날개방임.
                    
                      this.mainlist_angel_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                      "date":childSnapshot.val()[a].date,
                    "incharge":childSnapshot.val()[a].incharge,
                  "insert_date":childSnapshot.val()[a].insert_date,
                  "memo":memo,
                "insert_date_full":childSnapshot.val()[a].insert_date_full,
                        "key":childSnapshot.val()[a].key,
                      "name":childSnapshot.val()[a].name,
                      "orderlist":orderlist,
                      "avec":childSnapshot.val()[a].avec,
                      "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                      "lastupdated":childSnapshot.val()[a].lastupdated,
                      "directorId":childSnapshot.val()[a].directorId,
                    "numofpeople":childSnapshot.val()[a].numofpeople,
                    "status":childSnapshot.val()[a].status,
                  "wt":childSnapshot.val()[a].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople<=inagasi});
                this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                "date":childSnapshot.val()[a].date,
              "incharge":childSnapshot.val()[a].incharge,
            "insert_date":childSnapshot.val()[a].insert_date,
          "insert_date_full":childSnapshot.val()[a].insert_date_full,
                  "key":childSnapshot.val()[a].key,
                "name":childSnapshot.val()[a].name,
                "orderlist":orderlist,
                "memo":memo,
                "avec":childSnapshot.val()[a].avec,
                "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                "lastupdated":childSnapshot.val()[a].lastupdated,
                "directorId":childSnapshot.val()[a].directorId,
              "numofpeople":childSnapshot.val()[a].numofpeople,
              "status":childSnapshot.val()[a].status,
            "wt":childSnapshot.val()[a].wt,"totalagasi":totalagasi,
          "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
      

                    }else{
                      //ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.
                              this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                              "date":childSnapshot.val()[a].date,
                            "incharge":childSnapshot.val()[a].incharge,
                          "insert_date":childSnapshot.val()[a].insert_date,
                        "insert_date_full":childSnapshot.val()[a].insert_date_full,
                                "key":childSnapshot.val()[a].key,
                              "name":childSnapshot.val()[a].name,
                              "orderlist":orderlist,
                              "memo":memo,
                              "avec":childSnapshot.val()[a].avec,
                              "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                              "lastupdated":childSnapshot.val()[a].lastupdated,
                              "directorId":childSnapshot.val()[a].directorId,
                            "numofpeople":childSnapshot.val()[a].numofpeople,
                            "status":childSnapshot.val()[a].status,
                          "wt":childSnapshot.val()[a].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                    
                    }
                    }else{
                      console.log("ss not true...");
                      console.log(childSnapshot.val()[a].name);
                      console.log(childSnapshot.val()[a]);
                      //초이스톡 방임.
                      var orderlist="";
                      if(childSnapshot.val()[a].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=childSnapshot.val()[a].orderlist;
                      }
                        //ㅅㅅ한 결과물임. 

                        if(childSnapshot.val()[a].status=="fin"){
                          console.log("is fin!");
                          this.mainlist_finished_status_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                          "date":childSnapshot.val()[a].date,
                        "incharge":childSnapshot.val()[a].incharge,
                        "insert_date":childSnapshot.val()[a].insert_date,
                        "insert_date_full":childSnapshot.val()[a].insert_date_full,
                            "key":childSnapshot.val()[a].key,
                          "name":childSnapshot.val()[a].name,
                          "orderlist":orderlist,
                          "avec":childSnapshot.val()[a].avec,
                          "memo":memo,
                          "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                          "lastupdated":childSnapshot.val()[a].lastupdated,
                          "directorId":childSnapshot.val()[a].directorId,
                        "numofpeople":childSnapshot.val()[a].numofpeople,
                        "status":childSnapshot.val()[a].status,
                        "wt":childSnapshot.val()[a].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                        }
                        else if(childSnapshot.val()[a].angel==true){
                          //날개방임.
                        
                          this.mainlist_angel_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                          "date":childSnapshot.val()[a].date,
                        "incharge":childSnapshot.val()[a].incharge,
                      "insert_date":childSnapshot.val()[a].insert_date,
                      "memo":memo,
                    "insert_date_full":childSnapshot.val()[a].insert_date_full,
                            "key":childSnapshot.val()[a].key,
                          "name":childSnapshot.val()[a].name,
                          "orderlist":orderlist,
                          "avec":childSnapshot.val()[a].avec,
                          "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                          "lastupdated":childSnapshot.val()[a].lastupdated,
                          "directorId":childSnapshot.val()[a].directorId,
                        "numofpeople":childSnapshot.val()[a].numofpeople,
                        "status":childSnapshot.val()[a].status,
                      "wt":childSnapshot.val()[a].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople<=inagasi});
                    if(childSnapshot.val()[a].ss==false||childSnapshot.val()[a].ss==undefined){
                      if(childSnapshot.val()[a].numofpeople<=inagasi){

                        console.log("진행중인방으로...");
                          this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                          "date":childSnapshot.val()[a].date,
                        "incharge":childSnapshot.val()[a].incharge,
                      "insert_date":childSnapshot.val()[a].insert_date,
                    "insert_date_full":childSnapshot.val()[a].insert_date_full,
                            "key":childSnapshot.val()[a].key,
                            "memo":memo,
                          "name":childSnapshot.val()[a].name,
                          "orderlist":orderlist,"totalagasi":totalagasi,
                          "avec":childSnapshot.val()[a].avec,
                          "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                          "lastupdated":childSnapshot.val()[a].lastupdated,
                          "directorId":childSnapshot.val()[a].directorId,
                        "numofpeople":childSnapshot.val()[a].numofpeople,
                        "status":childSnapshot.val()[a].status,
                      "wt":childSnapshot.val()[a].wt,
                    "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                        }else{

                          console.log("초이스방...");
                          this.mainlist_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                          "date":childSnapshot.val()[a].date,
                        "incharge":childSnapshot.val()[a].incharge,
                        "insert_date":childSnapshot.val()[a].insert_date,
                        "insert_date_full":childSnapshot.val()[a].insert_date_full,
                            "key":childSnapshot.val()[a].key,
                            "memo":memo,
                          "name":childSnapshot.val()[a].name,
                          "orderlist":orderlist,
                          "showflag":true,
                          "avec":childSnapshot.val()[a].avec,
                          "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                          "lastupdated":childSnapshot.val()[a].lastupdated,
                          "directorId":childSnapshot.val()[a].directorId,
                        "numofpeople":childSnapshot.val()[a].numofpeople,
                        "status":childSnapshot.val()[a].status,
                        "wt":childSnapshot.val()[a].wt,
                        "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                        
                        }

                    }
                        }
                        else if(childSnapshot.val()[a].ss==false){
                          console.log("not angle but 재초 clicked..?")
                          console.log(childSnapshot.val()[a].numofpeople);
                          console.log(inagasi);
                          if(childSnapshot.val()[a].numofpeople<=inagasi){

                            console.log("진행중인방으로...");
                              this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                              "date":childSnapshot.val()[a].date,
                            "incharge":childSnapshot.val()[a].incharge,
                          "insert_date":childSnapshot.val()[a].insert_date,
                        "insert_date_full":childSnapshot.val()[a].insert_date_full,
                                "key":childSnapshot.val()[a].key,
                                "memo":memo,
                              "name":childSnapshot.val()[a].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":childSnapshot.val()[a].avec,
                              "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                              "lastupdated":childSnapshot.val()[a].lastupdated,
                              "directorId":childSnapshot.val()[a].directorId,
                            "numofpeople":childSnapshot.val()[a].numofpeople,
                            "status":childSnapshot.val()[a].status,
                          "wt":childSnapshot.val()[a].wt,
                        "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                            }else{
  
                              console.log("초이스방...");
                              this.mainlist_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                              "date":childSnapshot.val()[a].date,
                            "incharge":childSnapshot.val()[a].incharge,
                            "insert_date":childSnapshot.val()[a].insert_date,
                            "insert_date_full":childSnapshot.val()[a].insert_date_full,
                                "key":childSnapshot.val()[a].key,
                                "memo":memo,
                              "name":childSnapshot.val()[a].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":childSnapshot.val()[a].avec,
                              "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                              "lastupdated":childSnapshot.val()[a].lastupdated,
                              "directorId":childSnapshot.val()[a].directorId,
                            "numofpeople":childSnapshot.val()[a].numofpeople,
                            "status":childSnapshot.val()[a].status,
                            "wt":childSnapshot.val()[a].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                            
                            }

                        }else if(childSnapshot.val()[a].ss==undefined){
                            if(childSnapshot.val()[a].numofpeople<=inagasi){

                            console.log("진행중인방으로...");
                              this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                              "date":childSnapshot.val()[a].date,
                            "incharge":childSnapshot.val()[a].incharge,
                          "insert_date":childSnapshot.val()[a].insert_date,
                        "insert_date_full":childSnapshot.val()[a].insert_date_full,
                                "key":childSnapshot.val()[a].key,
                                "memo":memo,
                              "name":childSnapshot.val()[a].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":childSnapshot.val()[a].avec,
                              "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                              "lastupdated":childSnapshot.val()[a].lastupdated,
                              "directorId":childSnapshot.val()[a].directorId,
                            "numofpeople":childSnapshot.val()[a].numofpeople,
                            "status":childSnapshot.val()[a].status,
                          "wt":childSnapshot.val()[a].wt,
                        "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                            }else{
                              console.log("초이스방.w..");
                              this.mainlist_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
                              "date":childSnapshot.val()[a].date,
                            "incharge":childSnapshot.val()[a].incharge,
                            "insert_date":childSnapshot.val()[a].insert_date,
                            "insert_date_full":childSnapshot.val()[a].insert_date_full,
                                "key":childSnapshot.val()[a].key,
                                "memo":memo,
                              "name":childSnapshot.val()[a].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":childSnapshot.val()[a].avec,
                              "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
                              "lastupdated":childSnapshot.val()[a].lastupdated,
                              "directorId":childSnapshot.val()[a].directorId,
                            "numofpeople":childSnapshot.val()[a].numofpeople,
                            "status":childSnapshot.val()[a].status,
                            "wt":childSnapshot.val()[a].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                            
                            }
                        }else if(childSnapshot.val()[a].numofpeople<inagasi){

       this.mainlist_finished_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
       "date":childSnapshot.val()[a].date,
     "incharge":childSnapshot.val()[a].incharge,
   "insert_date":childSnapshot.val()[a].insert_date,
 "insert_date_full":childSnapshot.val()[a].insert_date_full,
         "key":childSnapshot.val()[a].key,
         "memo":memo,
       "name":childSnapshot.val()[a].name,
       "orderlist":orderlist,"totalagasi":totalagasi,
       "avec":childSnapshot.val()[a].avec,
       "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
       "lastupdated":childSnapshot.val()[a].lastupdated,
       "directorId":childSnapshot.val()[a].directorId,
     "numofpeople":childSnapshot.val()[a].numofpeople,
     "status":childSnapshot.val()[a].status,
   "wt":childSnapshot.val()[a].wt,
 "numofagasi":inagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                        }else {

                          

      this.mainlist_choice.push({"v":childSnapshot.val()[a].v, "agasi":childSnapshot.val()[a].agasi,
      "date":childSnapshot.val()[a].date,
    "incharge":childSnapshot.val()[a].incharge,
    "insert_date":childSnapshot.val()[a].insert_date,
    "insert_date_full":childSnapshot.val()[a].insert_date_full,
        "key":childSnapshot.val()[a].key,
        "memo":memo,
      "name":childSnapshot.val()[a].name,
      "orderlist":orderlist,
      "showflag":true,
      "avec":childSnapshot.val()[a].avec,
      "lastupdatedperson":childSnapshot.val()[a].lastupdatedperson,
      "lastupdated":childSnapshot.val()[a].lastupdated,
      "directorId":childSnapshot.val()[a].directorId,
    "numofpeople":childSnapshot.val()[a].numofpeople,
    "status":childSnapshot.val()[a].status,
    "wt":childSnapshot.val()[a].wt,
    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":childSnapshot.val()[a].numofpeople-inagasi});
                        }                   

                      
                  }
                 


              
                  //console.log(this.mainlisttest)
                  //console.log("test was")
                 
              }


            }



    })
    if(this.mainlist_finished_info.length!=0){
      // this.mainlist_finished_info.push({
      //   "flag":"nono"
      // })
    }

    this.mainlist_info.sort(function(a, b) {
      // Compare dates
     
      var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
      var timeB = b.insert_date.split(":");
      return timeA[0]-timeB[0] || timeA[1]-timeB[1];
      
  });
    this.mainlist_info.sort(function(a, b) {
      if (a.noflag === false && b.noflag !== false) {
        return -1; // a should come after b
      } else if (a.noflag !== false && b.noflag === false) {
        return 1; // a should come before b
      } else {
        return 0; // no change in order
      }
    });

  // console.log(this.mainlist_finished_info);
  //   this.mainlist_finished_info.sort(function(a, b) {
  //     console.log(a.insert_date);
  //     // Compare dates
     
  //     var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
  //     var timeB = b.insert_date.split(":");
  //     return timeA[0]-timeB[0] || timeA[1]-timeB[1];
      
  // });
  
    // console.log(this.mainlist_info)
    // console.log("this.mainlist_info sorted...");
    // console.log(this.mainlist_finished_choice);
    // console.log("this.mainlist_finished_status");
    // console.log(this.mainlist_finished_status_choice);
    // console.log("this.mainlist_angel");
    // console.log(this.mainlist_angel_choice);

    this.angelnumber_choice=this.mainlist_angel_choice.length;
    this.agasijungsan=[];
    for(var c in this.mainlist_choice){
      for(var d in this.mainlist_choice[c].agasi){
          if(this.mainlist_choice[c].agasi[d].findate!=undefined){

          }else{
            this.agasijungsan.push({"name":this.mainlist_choice[c].agasi[d].name})
          }
         
      }
    }
    for(var c in this.mainlist_finished_choice){
      for(var d in this.mainlist_finished_choice[c].agasi){
          if(this.mainlist_finished_choice[c].agasi[d].findate!=undefined){

          }else{

            this.agasijungsan.push({"name":this.mainlist_finished_choice[c].agasi[d].name})
          }
      }
    }
    var counting=0;
                 

    counting=0;
    this.mainlist_choice.sort((a, b) => a.v - b.v);
    console.log("loolllll");
    var arrayll = [];

    console.log(this.mainlist_choice);
    for(var aaa in  this.mainlist_choice){
      counting++;
      this.mainlist_choice[aaa].v=counting;
      arrayll.push(this.mainlist_choice[aaa].name+": "+this.mainlist_choice[aaa].v+"\r\n");
      console.log(this.mainlist_choice[aaa].name+": "+this.mainlist_choice[aaa].v);
    }
    console.log('doo');


     counting=0;
    for(var aaa in  this.mainlist_finished_choice){
      counting++;
      this.mainlist_finished_choice[aaa].v = counting;
    }
    this.mainlist_finished_choice.sort((a, b) => a.v - b.v);

     counting=0;
    for(var aaa in  this.mainlist_finished_status_choice){
      counting++;
      this.mainlist_finished_status_choice[aaa].v = counting;
    }

    counting=0;
    this.mainlist_finished_status_choice.sort((a, b) => a.v - b.v);

    counting=0;

    this.mainlist_finished_choice.sort(function(a,b){
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;

    
  });
    for(var main in this.mainlist_choice){
      if(this.type=="wt"){
        if(this.mainlist_choice[main]!=undefined&&this.mainlist_choice[main].wt == this.nickname){
            this.mainlist_mine.push({
              "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
                "date":this.mainlist_choice[main].date,
              "incharge":this.mainlist_choice[main].incharge,
              "insert_date":this.mainlist_choice[main].insert_date,
              "insert_date_full":this.mainlist_choice[main].insert_date_full,
                  "key":this.mainlist_choice[main].key,
                  "memo":this.mainlist_choice[main].memo,
                "name":this.mainlist_choice[main].name,
                "orderlist":this.mainlist_choice[main].orderlist,
                "showflag":true,
                "avec":this.mainlist_choice[main].avec,
                "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
                "lastupdated":this.mainlist_choice[main].lastupdated,
                "directorId":this.mainlist_choice[main].directorId,
              "numofpeople":this.mainlist_choice[main].numofpeople,
              "status":this.mainlist_choice[main].status,
              "wt":this.mainlist_choice[main].wt,
              "numofagasi":this.mainlist_choice[main].inagasi,"totalagasi":this.mainlist_choice[main].totalagasi,"lack":this.mainlist_choice[main].numofpeople-this.mainlist_choice[main].inagasi
            })
      }
      }else if(this.type=="director"||this.type=="info"){
        if(this.mainlist_choice[main].incharge == this.nickname){
          console.log("mainlist_main added");
            this.mainlist_mine.push({
              "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
                "date":this.mainlist_choice[main].date,
              "incharge":this.mainlist_choice[main].incharge,
              "insert_date":this.mainlist_choice[main].insert_date,
              "insert_date_full":this.mainlist_choice[main].insert_date_full,
                  "key":this.mainlist_choice[main].key,
                  "memo":this.mainlist_choice[main].memo,
                "name":this.mainlist_choice[main].name,
                "orderlist":this.mainlist_choice[main].orderlist,
                "showflag":true,
                "avec":this.mainlist_choice[main].avec,
                "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
                "lastupdated":this.mainlist_choice[main].lastupdated,
                "directorId":this.mainlist_choice[main].directorId,
              "numofpeople":this.mainlist_choice[main].numofpeople,
              "status":this.mainlist_choice[main].status,
              "wt":this.mainlist_choice[main].wt,
              "numofagasi":this.mainlist_choice[main].inagasi,"totalagasi":this.mainlist_choice[main].totalagasi,"lack":this.mainlist_choice[main].numofpeople-this.mainlist_choice[main].inagasi
            })
      }
    
      }
    }

    for(var main in this.mainlist_finished_choice){
      if(this.type=="wt"){
        if(this.mainlist_finished_choice[main].wt == this.nickname){
          console.log("mainlist_main added");
            this.mainlist2_mine.push({
              "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
                "date":this.mainlist_finished_choice[main].date,
              "incharge":this.mainlist_finished_choice[main].incharge,
              "insert_date":this.mainlist_finished_choice[main].insert_date,
              "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
                  "key":this.mainlist_finished_choice[main].key,
                  "memo":this.mainlist_finished_choice[main].memo,
                "name":this.mainlist_finished_choice[main].name,
                "orderlist":this.mainlist_finished_choice[main].orderlist,
                "showflag":true,
                "avec":this.mainlist_finished_choice[main].avec,
                "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
                "lastupdated":this.mainlist_finished_choice[main].lastupdated,
                "directorId":this.mainlist_finished_choice[main].directorId,
              "numofpeople":this.mainlist_finished_choice[main].numofpeople,
              "status":this.mainlist_finished_choice[main].status,
              "wt":this.mainlist_finished_choice[main].wt,
              "numofagasi":this.mainlist_finished_choice[main].inagasi,"totalagasi":this.mainlist_finished_choice[main].totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-this.mainlist_finished_choice[main].inagasi
            })
      }
      }else if(this.type=="director"||this.type=="info"){
        console.log("this is director!")
        console.log(this.mainlist2_mine);
        if(this.mainlist_finished_choice[main].incharge == this.nickname){
          console.log("mainlist_main added");
            this.mainlist2_mine.push({
              "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
                "date":this.mainlist_finished_choice[main].date,
              "incharge":this.mainlist_finished_choice[main].incharge,
              "insert_date":this.mainlist_finished_choice[main].insert_date,
              "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
                  "key":this.mainlist_finished_choice[main].key,
                  "memo":this.mainlist_finished_choice[main].memo,
                "name":this.mainlist_finished_choice[main].name,
                "orderlist":this.mainlist_finished_choice[main].orderlist,
                "showflag":true,
                "avec":this.mainlist_finished_choice[main].avec,
                "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
                "lastupdated":this.mainlist_finished_choice[main].lastupdated,
                "directorId":this.mainlist_finished_choice[main].directorId,
              "numofpeople":this.mainlist_finished_choice[main].numofpeople,
              "status":this.mainlist_finished_choice[main].status,
              "wt":this.mainlist_finished_choice[main].wt,
              "numofagasi":this.mainlist_finished_choice[main].inagasi,"totalagasi":this.mainlist_finished_choice[main].totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-this.mainlist_finished_choice[main].inagasi
            })
      }
    
      }
    }


this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  this.mainlist_attend=[];
  for(var a in snap.val()){
    if(a==this.currentstartday){
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          this.mainlist_attend.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
              
        }
      }
    }
  }

  // this.mainlist_choice.push({

  //   "v":"", "agasi":"",
  //   "date":"",
  // "incharge":"",
  // "insert_date":"",
  // "insert_date_full":"",
  //     "key":"",
  //     "memo":"",
  //   "name":"",
  //   "orderlist":"",
  //   "showflag":"",
  //   "avec":"",
  //   "lastupdatedperson":"",
  //   "lastupdated":"",
  //   "directorId":"",
  // "numofpeople":"",
  // "status":"",
  // "wt":"",
  // "numofagasi":"","totalagasi":"","lack":""

  // })
  this.mainlist_finished_choice.push({

    "v":"", "agasi":"",
    "date":"",
  "incharge":"",
  "insert_date":"",
  "insert_date_full":"",
      "key":"",
      "memo":"",
    "name":"",
    "orderlist":"",
    "showflag":"",
    "avec":"",
    "lastupdatedperson":"",
    "lastupdated":"",
    "directorId":"",
  "numofpeople":"",
  "status":"",
  "wt":"",
  "numofagasi":"","totalagasi":"","lack":""

  })

  console.log(this.mainlist_choice);
  console.log(this.mainlist_finished_choice);
  console.log(this.mainlist_finished_status_choice)
  console.log(this.mainlist_attend);
  console.log(this.agasijungsan);
          this.standby=this.mainlist_attend.length-this.agasijungsan.length;
});

this.paginateArray();
  })
}





  generateroomcategory(){
    this.util.presentLoading();
    console.log("generateroomcategory")
    var orderedQuery =  this.firemain.child("company").child(this.company).child("roomlist")
    orderedQuery.on("value", (snapshot)=> {

    this.smallroom=[];
    this.smallroom2=[];
    this.midroom=[];
    this.midroom2=[];
    this.bigroom=[];
    this.bigroom2=[];
    this.allroom=[];
    var roomin=[];
    this.inroom=[];
     snapshot.forEach((childSnapshot) => {
       var childData = childSnapshot.val();
       console.log("foreach");
       console.log(childData)
       console.log(childData.category)

       var cat =  childData.category;
       var name = childData.name;
       var flag = childData.flag;
       if(flag==undefined){
        flag=false;
       }
       console.log(name+"is:"+flag+"and cat : "+cat);
      this.allroom.push({"name":name,"category":cat,"flag":flag});
      if(cat=="소"){

        if(flag){
        }else{
          //console.log(name.substring(0,1));
          if(name.substring(0,1)==1){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.smallroom.push({"name":name,"category":cat,"flag":flag});
          }
          if(name.substring(0,1)==2){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.smallroom2.push({"name":name,"category":cat,"flag":flag});
          }
        
        }
      }else if(cat=="중"){
        if(flag){
        }else{
          if(name.substring(0,1)==1){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.midroom.push({"name":name,"category":cat,"flag":flag});
          }
          if(name.substring(0,1)==2){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.midroom2.push({"name":name,"category":cat,"flag":flag});
          }
          // this.midroom.push({"name":name,"category":cat,"flag":flag});
        }
      }else if(cat=="대"){
        if(flag){
        }else{
          if(name.substring(0,1)==1){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.bigroom.push({"name":name,"category":cat,"flag":flag});
          }
          if(name.substring(0,1)==2){
            //console.log("name : "+name);
            this.inroom.push(name);
            this.bigroom2.push({"name":name,"category":cat,"flag":flag});
          }
          // this.bigroom.push({"name":name,"category":cat,"flag":flag});
        }
      }

     })

     this.loadfinished=true;
     console.log("finish room category");
     this.util.dismissLoading();
    //  let toast = this.toastCtrl.create({
    //   message: "로딩 완료",
    //   duration: 1000,
    //   dismissOnPageChange: true
    // });
    // toast.onDidDismiss(() => {
    // });
    // toast.present();
    });
    // this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
    //   console.log("roomlist iterate...");
    //   if(snap.val()==null){

    //   }else{
    //     for(var a in snap.val()){
       
    //   }
        
    //   }
  
    //   console.log(this.smallroom);
    //   console.log(this.midroom);
    //   console.log(this.bigroom);
    //   console.log(this.allroom)
    // });

    
  }
  attending(){
    console.log("attending??");

    let modal = this.modal.create(Choicemodal3Page,{ "a":this.mainlist_att });
    modal.onDidDismiss(url => {
      console.log("ondismiss Choicemodal3Page")
        console.log(url);
        if(url==undefined){

    this.generate_info();
        }else if(url.result=="cancel"){

        }else{
          this.generateaatendance();
          this.generate_info();
        }
      // this.generating();


      // this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();

  }

  editing2(a){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("editing222222222...")
    console.log(a);
    console.log(a.name);
    let modal = this.modal.create(Editingroom2Page,{"user":this.directorList, "mainlist":this.mainlist,"mainlist_finished":this.mainlist_finished_info, "a":a,"allroom":this.allroom,"bu":this.bu});
    modal.onDidDismiss(url => {
      console.log("EditingroomPageEditingroomPageEditingroomPageEditingroomPageEditingroomPage");
      console.log(url);
      if(url!=undefined){
        if(url.result){
          
        console.log("do nothing1");

        this.generate_info();
    this.generate();
  

        }else{

    // this.refreshChoice2();
console.log("else...........")
          this.generateaatendance();
        }
      }else{
        console.log("do nothing");


        this.generate_info();
    this.generate();
  

    // this.refreshChoiceonlyjimyung();
    // this.refreshChoice2();
    // this.screenSwitch(1);

      }
    });

    modal.present();
  }
  editing(a){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("editing...")
    console.log(a);
    console.log(a.name);
    let modal = this.modal.create(EditingroomPage,{"user":this.directorList, "mainlist":this.mainlist,"mainlist_finished":this.mainlist_finished_info, "a":a,"allroom":this.allroom,"bu":this.bu});
    modal.onDidDismiss(url => {
      console.log("EditingroomPageEditingroomPageEditingroomPageEditingroomPageEditingroomPage");
      console.log(url);
      if(url!=undefined){
        if(url.result){
          
        console.log("do nothing1");

        this.generate_info();
    this.generate();
  

        }else{

    // this.refreshChoice2();
console.log("else...........")

    this.generate_info();

setTimeout(()=>{

  this.generate();
  this.refreshon();
  this.util.dismissLoading();
},500)
        }
      }else{
        console.log("do nothing");


        this.generate_info();
    this.generate();
  

    // this.refreshChoiceonlyjimyung();
    // this.refreshChoice2();
    // this.screenSwitch(1);

      }
    });

    modal.present();
  }
  addRoom(room){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room, "bu":this.bu,"selectedKey":this.selectedKey, "selectedIncharge":this.selectedIncharge,"selectedAvec":this.selectedAvec,"selectedLogic":this.selectedLogic , "selectedNumber":this.selectedNumber});
    modal.onDidDismiss(url => {
      console.log(url);
      if(url!=undefined){
        if(url.result){
          
        //console.log("do nothing1");
        }else{
        //console.log("do refresh");
    
            this.generate();
            this.generate_info();
            if(url.category=="소"){
              if(url.roomname.substring(0,1)==1){
                //console.log("name : "+name);

                //looping throuh smalroom array and if name is equal then remove it from array 
                for(var a in this.smallroom){
                  if(this.smallroom[a].name==url.roomname){
                    this.smallroom.splice(Number(a),1);
                  }
                }
              }
              if(url.roomname.substring(0,1)==2){
                //console.log("name : "+name);

                for(var a in this.smallroom2){
                  if(this.smallroom2[a].name==url.roomname){
                    this.smallroom2.splice(Number(a),1);
                  }
                }

              }
            }

            if(url.category=="중"){
              if(url.roomname.substring(0,1)==1){
                //console.log("name : "+name);

                //looping throuh smalroom array and if name is equal then remove it from array 
                for(var a in this.midroom){
                  if(this.midroom[a].name==url.roomname){
                    this.midroom.splice(Number(a),1);
                  }
                }
              }
              if(url.roomname.substring(0,1)==2){
                //console.log("name : "+name);

                for(var a in this.midroom2){
                  if(this.midroom2[a].name==url.roomname){
                    this.midroom2.splice(Number(a),1);
                  }
                }

              }
            }

            if(url.category=="대"){
              if(url.roomname.substring(0,1)==1){
                //console.log("name : "+name);

                //looping throuh smalroom array and if name is equal then remove it from array 
                for(var a in this.bigroom){
                  if(this.bigroom[a].name==url.roomname){
                    this.bigroom.splice(Number(a),1);
                  }
                }
              }
              if(url.roomname.substring(0,1)==2){
                //console.log("name : "+name);

                for(var a in this.bigroom2){
                  if(this.bigroom2[a].name==url.roomname){
                    this.bigroom2.splice(Number(a),1);
                  }
                }

              }
            }
        }
      }else{
        //console.log("do nothing");
      }
    

    });

    modal.present();
  }



  //choice come


  refreshChoice2(){
    console.log("refresh choice2 in choice.ts come...");
    var countingvalue=0;
    this.mainlist_choice=[];
    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];
    this.agasijungsan_choice=[];
    this.agasijungsan=[];
    //.on("value", function(snap) {
      // .on('child_changed', function(snap, prevChildKey) {
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").once('value').then((snap)=>{
    
      this.mainlisttest=[];
      this.mainlist=[];
      this.mainlist_mine=[];
      this.mainlist2_mine=[];

      this.mainlist_finished_choice=[];
      this.mainlist_finished_status_choice=[];
      this.mainlist_angel_choice=[];

      this.mainlist_finished_choice=[];
      this.mainlist_finished_status_choice=[];
      this.mainlist_angel_choice=[];
      for(var a in snap.val()){
            for(var b in snap.val()[a]){
              // if(snap.snap.val()[a][b].end_date_full==undefined){
                if(snap.val()[a][b].date!=undefined){
                  var inagasi = 0;
                  var totalagasi = 0;
              if(snap.val()[a][b].agasi!=undefined){

                for(var c in snap.val()[a][b].agasi){
                  totalagasi++;
                  if(snap.val()[a][b].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  var orderlist="";
                  if(snap.val()[a][b].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=snap.val()[a][b].orderlist;
                  }
                if(snap.val()[a][b].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }


            var memo = "";
            console.log(snap.val()[a][b])
            memo = snap.val()[a][b].memo;

                console.log(snap.val()[a][b].name);
                console.log(snap.val()[a][b].key);
                console.log(snap.val()[a][b].noflag+" ,,,,  "+snap.val()[a][b].firstflag);
                //console.log(inagasi);
                //console.log(totalagasi);
                
                if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true||snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                  continue;
                }
                  if(snap.val()[a][b].ss){
                    if(snap.val()[a][b].status=="fin"){
                      this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "memo":memo,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
            
                    }else if(snap.val()[a][b].angel==true){
                      //날개방임.
                    
                      this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                  "memo":memo,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                "date":snap.val()[a][b].date,
              "incharge":snap.val()[a][b].incharge,
            "insert_date":snap.val()[a][b].insert_date,
          "insert_date_full":snap.val()[a][b].insert_date_full,
                  "key":snap.val()[a][b].key,
                "name":snap.val()[a][b].name,
                "orderlist":orderlist,
                "memo":memo,
                "avec":snap.val()[a][b].avec,
                "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                "lastupdated":snap.val()[a][b].lastupdated,
                "directorId":snap.val()[a][b].directorId,
              "numofpeople":snap.val()[a][b].numofpeople,
              "status":snap.val()[a][b].status,
            "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
          "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});

                    }else{
                      //ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.
                      console.log("ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.")
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "memo":memo,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                    
                    }
                    }else{
                      console.log(" ss not true")
                      //초이스톡 방임.
                      console.log("total agasi "+totalagasi);
                      console.log(inagasi);
                      console.log(snap.val()[a][b].numofpeople);
                      console.log(snap.val()[a][b].ss);
                      var orderlist="";
                      if(snap.val()[a][b].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=snap.val()[a][b].orderlist;
                      }
                      console.log(snap.val()[a][b].ss);
                        console.log("ss is false")
                        //ㅅㅅ한 결과물임. 

                        if(snap.val()[a][b].status=="fin"){
                          console.log("is fin!");
                          this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "memo":memo,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else if(snap.val()[a][b].angel==true){
                          //날개방임.
                        
                          console.log("is angel!");
                          this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                      "insert_date":snap.val()[a][b].insert_date,
                      "memo":memo,
                    "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                      "wt":snap.val()[a][b].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                     
                    this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                    "date":snap.val()[a][b].date,
                  "incharge":snap.val()[a][b].incharge,
                "insert_date":snap.val()[a][b].insert_date,
              "insert_date_full":snap.val()[a][b].insert_date_full,
                      "key":snap.val()[a][b].key,
                      "memo":memo,
                    "name":snap.val()[a][b].name,
                    "orderlist":orderlist,"totalagasi":totalagasi,
                    "avec":snap.val()[a][b].avec,
                    "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                    "lastupdated":snap.val()[a][b].lastupdated,
                    "directorId":snap.val()[a][b].directorId,
                  "numofpeople":snap.val()[a][b].numofpeople,
                  "status":snap.val()[a][b].status,
                "wt":snap.val()[a][b].wt,
              "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else if(snap.val()[a][b].ss==false||snap.val()[a][b].ss==undefined){
                          console.log("ap.val()[a][b].ss is undefined....")
                          if(snap.val()[a][b].numofpeople<=inagasi){

                            console.log("but match so move to finished");
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            }else{
  
                              console.log("not match so remain");
                              this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                            "insert_date":snap.val()[a][b].insert_date,
                            "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                            "wt":snap.val()[a][b].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            
                            }

                        }else if(snap.val()[a][b].numofpeople<inagasi){

                          console.log("snap.val()[a][b].numofpeople<=totalagasi");
       this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
       "date":snap.val()[a][b].date,
     "incharge":snap.val()[a][b].incharge,
   "insert_date":snap.val()[a][b].insert_date,
 "insert_date_full":snap.val()[a][b].insert_date_full,
         "key":snap.val()[a][b].key,
         "memo":memo,
       "name":snap.val()[a][b].name,
       "orderlist":orderlist,"totalagasi":totalagasi,
       "avec":snap.val()[a][b].avec,
       "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
       "lastupdated":snap.val()[a][b].lastupdated,
       "directorId":snap.val()[a][b].directorId,
     "numofpeople":snap.val()[a][b].numofpeople,
     "status":snap.val()[a][b].status,
   "wt":snap.val()[a][b].wt,
 "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else {

                          
                          console.log("is else...");


      this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
      "date":snap.val()[a][b].date,
    "incharge":snap.val()[a][b].incharge,
    "insert_date":snap.val()[a][b].insert_date,
    "insert_date_full":snap.val()[a][b].insert_date_full,
        "key":snap.val()[a][b].key,
        "memo":memo,
      "name":snap.val()[a][b].name,
      "orderlist":orderlist,
      "showflag":true,
      "avec":snap.val()[a][b].avec,
      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
      "lastupdated":snap.val()[a][b].lastupdated,
      "directorId":snap.val()[a][b].directorId,
    "numofpeople":snap.val()[a][b].numofpeople,
    "status":snap.val()[a][b].status,
    "wt":snap.val()[a][b].wt,
    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }                   

                      
                  }

              }
              
            }
       
        
      }





      console.log(this.mainlist_choice)
      console.log("this.mainlist_finished");
      console.log(this.mainlist_finished_choice);
      console.log("this.mainlist_finished_status");
      console.log(this.mainlist_finished_status_choice);
      console.log("this.mainlist_angel");
      console.log(this.mainlist_angel_choice);
  
      this.angelnumber_choice=this.mainlist_angel_choice.length;
      this.agasijungsan=[];
      for(var c in this.mainlist_choice){
        for(var d in this.mainlist_choice[c].agasi){
            if(this.mainlist_choice[c].agasi[d].findate!=undefined){
  
            }else{
              this.agasijungsan.push({"name":this.mainlist_choice[c].agasi[d].name})
            }
           
        }
      }
      for(var c in this.mainlist_finished_choice){
        for(var d in this.mainlist_finished_choice[c].agasi){
            if(this.mainlist_finished_choice[c].agasi[d].findate!=undefined){
  
            }else{
  
              this.agasijungsan.push({"name":this.mainlist_finished_choice[c].agasi[d].name})
            }
        }
      }
      var counting=0;
                   
  
      counting=0;
      this.mainlist_choice.sort((a, b) => a.v - b.v);
      for(var aaa in  this.mainlist_choice){
        counting++;
        this.mainlist_choice[aaa].v=counting;
      }
  
  
       counting=0;
      for(var aaa in  this.mainlist_finished_choice){
        counting++;
        this.mainlist_finished_choice[aaa].v = counting;
      }
      this.mainlist_finished_choice.sort((a, b) => a.v - b.v);
  
       counting=0;
      for(var aaa in  this.mainlist_finished_status_choice){
        counting++;
        this.mainlist_finished_status_choice[aaa].v = counting;
      }
  
      counting=0;
      this.mainlist_finished_status_choice.sort((a, b) => a.v - b.v);
  
      counting=0;
  
      this.mainlist_finished_choice.sort(function(a,b){
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
  
      
    });
      for(var main in this.mainlist_choice){
        if(this.type=="wt"){
          if(this.mainlist_choice[main]!=undefined&& this.mainlist_choice[main].wt == this.nickname){
            console.log("mainlist_main added");
              this.mainlist_mine.push({
                "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
                  "date":this.mainlist_choice[main].date,
                "incharge":this.mainlist_choice[main].incharge,
                "insert_date":this.mainlist_choice[main].insert_date,
                "insert_date_full":this.mainlist_choice[main].insert_date_full,
                    "key":this.mainlist_choice[main].key,
                    "memo":this.mainlist_choice[main].memo,
                  "name":this.mainlist_choice[main].name,
                  "orderlist":this.mainlist_choice[main].orderlist,
                  "showflag":true,
                  "avec":this.mainlist_choice[main].avec,
                  "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
                  "lastupdated":this.mainlist_choice[main].lastupdated,
                  "directorId":this.mainlist_choice[main].directorId,
                "numofpeople":this.mainlist_choice[main].numofpeople,
                "status":this.mainlist_choice[main].status,
                "wt":this.mainlist_choice[main].wt,
                "numofagasi":this.mainlist_choice[main].inagasi,"totalagasi":this.mainlist_choice[main].totalagasi,"lack":this.mainlist_choice[main].numofpeople-this.mainlist_choice[main].inagasi
              })
        }
        }else if(this.type=="director"||this.type=="info"){
      
          if(this.mainlist_choice[main]!=undefined&&this.mainlist_choice[main].incharge == this.nickname){
            console.log("mainlist_main added");
              this.mainlist_mine.push({
                "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
                  "date":this.mainlist_choice[main].date,
                "incharge":this.mainlist_choice[main].incharge,
                "insert_date":this.mainlist_choice[main].insert_date,
                "insert_date_full":this.mainlist_choice[main].insert_date_full,
                    "key":this.mainlist_choice[main].key,
                    "memo":this.mainlist_choice[main].memo,
                  "name":this.mainlist_choice[main].name,
                  "orderlist":this.mainlist_choice[main].orderlist,
                  "showflag":true,
                  "avec":this.mainlist_choice[main].avec,
                  "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
                  "lastupdated":this.mainlist_choice[main].lastupdated,
                  "directorId":this.mainlist_choice[main].directorId,
                "numofpeople":this.mainlist_choice[main].numofpeople,
                "status":this.mainlist_choice[main].status,
                "wt":this.mainlist_choice[main].wt,
                "numofagasi":this.mainlist_choice[main].inagasi,"totalagasi":this.mainlist_choice[main].totalagasi,"lack":this.mainlist_choice[main].numofpeople-this.mainlist_choice[main].inagasi
              })
        }
      
        }
      }
  
      for(var main in this.mainlist_finished_choice){
        if(this.type=="wt"){
          if(this.mainlist_finished_choice[main]!=undefined&& this.mainlist_finished_choice[main].wt == this.nickname){
            console.log("mainlist_main added");
              this.mainlist2_mine.push({
                "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
                  "date":this.mainlist_finished_choice[main].date,
                "incharge":this.mainlist_finished_choice[main].incharge,
                "insert_date":this.mainlist_finished_choice[main].insert_date,
                "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
                    "key":this.mainlist_finished_choice[main].key,
                    "memo":this.mainlist_finished_choice[main].memo,
                  "name":this.mainlist_finished_choice[main].name,
                  "orderlist":this.mainlist_finished_choice[main].orderlist,
                  "showflag":true,
                  "avec":this.mainlist_finished_choice[main].avec,
                  "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
                  "lastupdated":this.mainlist_finished_choice[main].lastupdated,
                  "directorId":this.mainlist_finished_choice[main].directorId,
                "numofpeople":this.mainlist_finished_choice[main].numofpeople,
                "status":this.mainlist_finished_choice[main].status,
                "wt":this.mainlist_finished_choice[main].wt,
                "numofagasi":this.mainlist_finished_choice[main].inagasi,"totalagasi":this.mainlist_finished_choice[main].totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-this.mainlist_finished_choice[main].inagasi
              })
        }
        }else if(this.type=="director"||this.type=="info"){
      
          if(this.mainlist2_mine[main]!=undefined&&this.mainlist2_mine[main].incharge == this.nickname){
            console.log("mainlist_main added");
              this.mainlist2_mine.push({
                "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
                  "date":this.mainlist_finished_choice[main].date,
                "incharge":this.mainlist_finished_choice[main].incharge,
                "insert_date":this.mainlist_finished_choice[main].insert_date,
                "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
                    "key":this.mainlist_finished_choice[main].key,
                    "memo":this.mainlist_finished_choice[main].memo,
                  "name":this.mainlist_finished_choice[main].name,
                  "orderlist":this.mainlist_finished_choice[main].orderlist,
                  "showflag":true,
                  "avec":this.mainlist_finished_choice[main].avec,
                  "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
                  "lastupdated":this.mainlist_finished_choice[main].lastupdated,
                  "directorId":this.mainlist_finished_choice[main].directorId,
                "numofpeople":this.mainlist_finished_choice[main].numofpeople,
                "status":this.mainlist_finished_choice[main].status,
                "wt":this.mainlist_finished_choice[main].wt,
                "numofagasi":this.mainlist_finished_choice[main].inagasi,"totalagasi":this.mainlist_finished_choice[main].totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-this.mainlist_finished_choice[main].inagasi
              })
        }
      
        }
      }
this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  this.mainlist_attend=[];
  for(var a in snap.val()){
    if(a==this.currentstartday){
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          this.mainlist_attend.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
              
        }
      }
    }
  }

  console.log(this.mainlist_choice);
  this.mainlist_finished_choice.push({

    "v":"", "agasi":"",
    "date":"",
  "incharge":"",
  "insert_date":"",
  "insert_date_full":"",
      "key":"",
      "memo":"",
    "name":"",
    "orderlist":"",
    "showflag":"",
    "avec":"",
    "lastupdatedperson":"",
    "lastupdated":"",
    "directorId":"",
  "numofpeople":"",
  "status":"",
  "wt":"",
  "numofagasi":"","totalagasi":"","lack":""

  })

  console.log(this.mainlist_finished_choice);
  console.log(this.mainlist_attend);
  console.log(this.agasijungsan);
          this.standby=this.mainlist_attend.length-this.agasijungsan.length;
     
});



        });
        //console.log("refresh choice finished");
  }



  
  tabclicked(v){
    console.log("tab clicked : "+v);
    const checkbox = document.getElementById('tab2');
    const div = document.getElementById('custom-div');
    const div2 = document.getElementById('custom-div2');
    console.log(div);
    console.log(div2);
    console.log("tabclicked....");
    checkbox.addEventListener('change', function() {
     console.log(this);
    });
    if(v==1){
      //날개
      if(this.tab1clicked){
        this.tab1clicked=false;
      }else{
        this.tab1clicked=true;
      }
      //tab2 remove
      div.classList.remove('custom-transform');
        div.style.maxHeight="0px";
        div.style.transform = 'translateY(0%)';



      this.tab2clicked=false;
      console.log("current : "+this.tab1clicked);
      if(this.tab1clicked){
        console.log("ta1 is true so go to false'");
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', false);

      div2.style.maxHeight="0px";
      div2.style.transform = 'translateY(-50%)';
      div2.style.maxHeight="200px";
      div2.classList.add('custom-transform2');
      }else{

        div2.classList.remove('custom-transform2');
        div2.style.maxHeight="0px";
        div2.style.transform = 'translateY(0%)';
        console.log("go to true'");
      $("#tab1").prop('checked', true);
      }
    }
    if(v==2){

      //tab2 remove
      div2.classList.remove('custom-transform2');
        div2.style.maxHeight="0px";
        div2.style.transform = 'translateY(0%)';
      //지명 
      this.tab2clicked= !this.tab2clicked;
      this.tab1clicked=false;
      if(this.tab2clicked){
        console.log("2 on");
        console.log("tab2 clicked : "+v);
        div.classList.add('custom-transform');
        div.style.maxHeight="0px";
        div.style.transform = 'translateY(-50%)';
        div.style.maxHeight="200px";
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', true);
      }else{
        console.log("2 off");
        div.classList.remove('custom-transform');
        div.style.maxHeight="0px";
        div.style.transform = 'translateY(0%)';
      $("#tab2").prop('checked', false);
      }
    }
  }
    gotomorepage(a,v){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    if(a.v.length==0){

      window.alert("error...");
      return;
    }
    this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {

        console.log("CccccchoicedetailPage ondiddismiss....");
        console.log(data);
      //   this.generate();
      // this.generate_info();

      //   setTimeout(()=>{
      //     this.screenSwitch(1);
      //     this.screenSwitch_att(1);
      //   },10)
   

      })
    });

  }
  screenSwitch_att(values) : void {
    console.log("screenSwitch"+values);
    for (let i = 1; i <= 3; i++) { 
      document.getElementById("ion-label-area_att-"+i).style.display = "none"; 
    }
    document.getElementById("ion-label-area_att-" + values).style.display = "";
      this.zone.run(()=>{
  
        this.activeclass_att=values;
      })
  }
  screenSwitch(values) : void {
    console.log("screenSwitch"+values);
   
      for (let i = 1; i <= 3; i++) { 
        document.getElementById("ion-label-area-"+i).style.display = "none"; 
      }
      document.getElementById("ion-label-area-" + values).style.display = "";
      this.zone.run(()=>{
  
        this.activeclass=values;
      })
  }

  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

  checkEvent(day){
    return false;
  }
  gotocalendardetail(day,flag){
    console.log("gotocalendardetail");
    console.log(flag);
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.currentDate);
    console.log("clicked"+day);
    // this.selectedday=this.currentYear+"-"+this.currentMonth+"-"+day;

    this.generateaatendance();
  }
  generating_attendance(){
    console.log("gggggenerating...");
    this.mainlist_att=[];
    this.mainlist_att_no=[];
    this.newlist_att=[];
    this.jopanlist_att=[];
    this.jopanjjinglist2_att=[];
    this.jopanjjinglist_att=[];
    this.mainlistfromcompany=[];
    this.agasijungsan_att=[];
    this.agasijungsantotal_att=[];
    this.firemain.child("company").child(this.company).child("jopanjjing").once("value", (snap) => {
      console.log("jopanjjing come")
      for(var a in snap.val()){
        console.log(snap.val()[a][this.selectedday])
        if(snap.val()[a][this.selectedday]!=undefined){
          for(var b in snap.val()[a][this.selectedday]){
            console.log(b);
            console.log(this.selectedday);
            console.log(snap.val()[a][this.selectedday])
            console.log(snap.val()[a][this.selectedday][b])
  
  
            var jopanjjing = snap.val()[a][this.selectedday][b].values;
            var date = snap.val()[a][this.selectedday][b].date;
            var agasi = snap.val()[a][this.selectedday][b].agasi;
            var incharge = snap.val()[a][this.selectedday][b].incharge;
            var type = snap.val()[a][this.selectedday][b].type;
            var team = snap.val()[a][this.selectedday][b].jopan;
            // //make key with team and make value with incharge and agasi
            if(this.jopanjjinglist_att[team]==undefined){
              this.jopanjjinglist_att[team]=[];
              this.jopanjjinglist2_att[team]=[];
            }
            var totaljjing = 0;
            var wanteejjing=0;
            var banteejjing=0;
            this.jopanjjinglist_att[team].push({"type":type, "agasi":agasi,"incharge":incharge,"date":date,"jopan":team,"values":jopanjjing});
            this.jopanjjinglist2_att[team].push({"dummy":0});
            console.log("jopanjjinglist_att[team]jopanjjinglist_att[team]jopanjjinglist_att[team]");
            console.log(this.jopanjjinglist_att[team])
            for(var aa in this.jopanjjinglist_att[team]){
              console.log(this.jopanjjinglist_att[team][aa]);
              console.log(this.jopanjjinglist_att[team][aa].type);
              if(this.jopanjjinglist_att[team][aa].type=="wantee"){
               wanteejjing +=parseInt(this.jopanjjinglist_att[team][aa].values);
              }else if(this.jopanjjinglist_att[team][aa].type=="bantee"){
                banteejjing +=parseInt(this.jopanjjinglist_att[team][aa].values);
               }
              totaljjing+=parseInt(this.jopanjjinglist_att[team][aa].values);
              this.jopanjjinglist2_att[team].wanteejjing = wanteejjing;
              this.jopanjjinglist2_att[team].banteejjing = banteejjing;
              this.jopanjjinglist2_att[team].totaljjing = totaljjing;
              this.jopanjjinglist2_att[team].teamname = team;
              this.jopanlist_att.push({"team":team,"value":totaljjing});
            }
          }
        }
        
      }

      console.log("jopanjjinglist_attjopanjjinglist_attjopanjjinglist_att")
        console.log(this.jopanjjinglist_att);
        for(var abc in this.jopanjjinglist_att){
          console.log(abc);
          console.log(this.jopanjjinglist_att[abc])
        }
        console.log(this.jopanjjinglist2_att);
        for(var abdc in this.jopanjjinglist2_att){
          console.log(abdc);
          this.newlist_att.push({"teamname":this.jopanjjinglist2_att[abdc].teamname,"wantee":this.jopanjjinglist2_att[abdc].wanteejjing,"bantee":this.jopanjjinglist2_att[abdc].banteejjing, "jjing":this.jopanjjinglist2_att[abdc].totaljjing})
          console.log(this.jopanjjinglist2_att[abdc].totaljjing)
          console.log(this.jopanjjinglist2_att[abdc].teamname)
        }
        if(this.selectedday == this.currentstartday){
          this.todayatt = this.newlist_att;
        }
        console.log(this.newlist_att);



    });
    console.log(this.agasijungsan_att);
    console.log(this.agasijungsantotal_att);
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
    console.log(this.date.getFullYear()+",,,,"+this.date.getMonth()+2, 0);
    console.log(this.date);
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }

  
}