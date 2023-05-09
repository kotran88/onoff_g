import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController,ModalController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
import { Choicemodal3Page } from '../choicemodal3/choicemodal3';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  selected:any=1;
  inputtext:any="";
  numofstandby:any=0;
  numberofIn:any=0;
  jopanjjinglist2:any=[];
  jopanlist:any=[];       
  jopanjjinglist:any=[];
  agasijungsan:any = [];
  mainlistfromcompany:any=[];
  mainlist:any = [];
  mainlist_no:any = [];
  nickname:any="";
  firemain = firebase.database().ref();
  selectedday:any=0;
  activeclass='1';
  totalin:any=0;
  totalout:any=0;
  year:any="";
  newlist:any=[];
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
  totalagasi:any=[];
  currentstartday:any="";
  currentstart:any="";
  agasijungsantotal:any=[];
  company:any="";
  constructor(public util:UtilsProvider, public zone:NgZone,public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();
    this.nickname=localStorage.getItem("nickname");
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    this.selectedday=this.currentstartday
    //console.log(this.currentstartday);
  }
  editing(a){
    if(a.team=="미지정"){
      //console.log("editing...")
    //console.log(a);

    let modal = this.modal.create(Choicemodal2Page,{"agasi":a,"flag":"attend","currentstartday":this.currentstartday});
    modal.onDidDismiss(url => {
      //console.log(url);
      this.generating();

    });
    modal.present();
    }else{
      window.alert("미지정만 출근처리 가능합니다");
    }
    
  }
  attending(){
    //console.log("attending??");

    let modal = this.modal.create(Choicemodal3Page,{ "a":this.mainlist });
    modal.onDidDismiss(url => {
        //console.log(url);
        if(url==undefined){
          this.generating();
        }else if(url.result=="cancel"){

        }else{

      this.generating();
        }
      // this.generating();


      // this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();

  }
  searching(){
    //console.log(this.inputtext)
    //console.log(this.selected)


    this.mainlist=[];
    this.mainlist_no=[];
    this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
      //console.log(snap.val())

      for(var a in snap.val()){
        //console.log(a)
        //console.log(snap.val()[a])
        if(a==this.currentstartday){
          //console.log("mmmm")
          for(var b in snap.val()[a]){
            //console.log(snap.val()[a][b]);
            if(this.selected==1){
              if(snap.val()[a][b].attend.name.trim()==this.inputtext.trim()){
                //console.log(snap.val()[a][b].attend.flag);
              if(snap.val()[a][b].attend!=undefined){
                this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              }
              if(snap.val()[a][b].noattend!=undefined){
                this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
              }
              }else{
  
              }
            }else{
              if(snap.val()[a][b].attend.team.trim().toUpperCase()==this.inputtext.trim().toUpperCase()){
                //console.log(snap.val()[a][b].attend.flag);
              if(snap.val()[a][b].attend!=undefined){
                this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              }
              if(snap.val()[a][b].noattend!=undefined){
                this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
              }
              }else{
  
              }
            }
           
            

          }
        }

      }
    });

  }
  generateaatendance(){

    //console.log("ionViewWillEnter");
    //console.log(this.company);
   

    this.totalagasi=[];
    this.mainlist=[];
    this.mainlist_no=[];
    this.totalin=0;
    this.agasijungsan=[];
    this.agasijungsantotal=[];
    this.jopanjjinglist = [];
    this.jopanjjinglist2 = [];

    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
     
      if(snap.val()!=undefined){
        for(var a in snap.val()){
  
          for(var b in snap.val()[a].roomhistory){
            for(var c in snap.val()[a].roomhistory[b]){
                if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                  var mainlist=snap.val()[a].roomhistory[b][c];
  
          for(var d in mainlist.agasi){
                 
            if(mainlist.agasi[d].findate!=undefined){
              //종료된 아가씨. 

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
              this.agasijungsantotal.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
            this.agasijungsan.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
            //console.log("is  having findate so this agasi is in bang")
            //console.log(mainlist.agasi[d].name);
              this.mainlistfromcompany.push({"name":mainlist.agasi[d].name,"wantee":Math.floor(mainlist.agasi[d].tc), "tc":mainlist.agasi[d].tc,"bantee":mainlist.agasi[d].bantee,"money":mainlist.agasi[d].money})
            }
          }

        }
    }
  }
}
//console.log("for loop finfin")

//console.log(this.agasijungsan);
this.numberofIn=this.agasijungsan.length;
//console.log(this.mainlistfromcompany);
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
//console.log(newvaluearray);
this.mainlistfromcompany=newvaluearray;
this.mainlist=[];
this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  //console.log("attendance check...");
  for(var a in snap.val()){
    if(a==this.currentstartday){
      //console.log("mmmm")
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          //console.log(snap.val()[a][b].attend)
          this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
       
          for(var abba in this.mainlistfromcompany){
            if(this.mainlistfromcompany[abba].name == snap.val()[a][b].attend.name){
              //console.log(snap.val()[a][b].attend);
              //console.log(this.mainlistfromcompany[abba])

              // this.agasijungsantotal.push({"bantee":this.mainlistfromcompany[abba].bantee,"chasam":0,"name":this.mainlistfromcompany[abba].name,"date":snap.val()[a].roomhistory[aa][b][c].date,"incharge":snap.val()[a].roomhistory[aa][b][c].incharge,"money":snap.val()[a].roomhistory[aa][b][c].money,"tc":snap.val()[a].roomhistory[aa][b][c].tc,"wantee":Math.floor(snap.val()[a].roomhistory[aa][b][c].tc)});
              for(var abw in this.mainlist){
                //remove this.mainlist[abw]  if name is same as snap.val()[a][b].attend.name
                if(this.mainlist[abw].name == snap.val()[a][b].attend.name){
                  this.mainlist.splice(abw,1);
                }
                
              }
              this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":this.mainlistfromcompany[abba].tc,"wantee":this.mainlistfromcompany[abba].wantee,"money":this.mainlistfromcompany[abba].money,"bantee":this.mainlistfromcompany[abba].bantee});
         
                }
          }
          
          this.totalin++;
        }
        if(snap.val()[a][b].noattend!=undefined){
          this.totalout++;
          this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
        }

      }
    }

  }
  //console.log(this.mainlist)
  //console.log(this.mainlistfromcompany)
  
 
  //console.log("okdoneeeee")
  //console.log(this.agasijungsan);
  //console.log(this.agasijungsantotal);
  // this.util.dismissLoading();

this.numofstandby=this.mainlist.length - this.numberofIn;
});

      }
    });
  }
  ionViewWillEnter(){

  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad AttendancePage');
    this.util.presentLoading();
    this.goToday();
    setTimeout(()=>{

    this.generating();
    this.util.dismissLoading();
    }
    ,50)
    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-1").style.display = "";
        this.zone.run(()=>{

          this.activeclass='1'
        })
  }

  generating(){
    //console.log("gggggenerating...");
    
    this.generateaatendance();
    this.firemain.child("company").child(this.company).child("jopanjjing").once("value", (snap) => {
      //console.log("jopanjjing come")
      for(var a in snap.val()){
        //console.log(snap.val()[a][this.selectedday])
        if(snap.val()[a][this.selectedday]!=undefined){
          for(var b in snap.val()[a][this.selectedday]){
            //console.log(b);
            //console.log(this.selectedday);
            //console.log(snap.val()[a][this.selectedday])
            //console.log(snap.val()[a][this.selectedday][b])
  
  
            var jopanjjing = snap.val()[a][this.selectedday][b].values;
            var date = snap.val()[a][this.selectedday][b].date;
            var agasi = snap.val()[a][this.selectedday][b].agasi;
            var incharge = snap.val()[a][this.selectedday][b].incharge;
            var team = snap.val()[a][this.selectedday][b].jopan;
            // //make key with team and make value with incharge and agasi
            if(this.jopanjjinglist[team]==undefined){
              this.jopanjjinglist[team]=[];
              this.jopanjjinglist2[team]=[];
            }
            var totaljjing = 0;
            this.jopanjjinglist[team].push({"agasi":agasi,"incharge":incharge,"date":date,"jopan":team,"values":jopanjjing});
            this.jopanjjinglist2[team].push({"dummy":0});
            for(var aa in this.jopanjjinglist[team]){
              //console.log(this.jopanjjinglist[team][aa]);
              
              totaljjing+=parseInt(this.jopanjjinglist[team][aa].values);
              this.jopanjjinglist2[team].totaljjing = totaljjing;
              this.jopanjjinglist2[team].teamname = team;
              this.jopanlist.push({"team":team,"value":totaljjing});
            }
          }
        }
        
      }

        //console.log(this.jopanjjinglist);
        for(var abc in this.jopanjjinglist){
          //console.log(abc);
          //console.log(this.jopanjjinglist[abc])
        }
        //console.log(this.jopanjjinglist2);
        this.newlist=[];
        for(var abdc in this.jopanjjinglist2){
          //console.log(abdc);
          this.newlist.push({"teamname":this.jopanjjinglist2[abdc].teamname,"jjing":this.jopanjjinglist2[abdc].totaljjing})
          //console.log(this.jopanjjinglist2[abdc].totaljjing)
          //console.log(this.jopanjjinglist2[abdc].teamname)
        }
        //console.log(this.newlist);



    });
    //console.log(this.agasijungsan);
    //console.log(this.agasijungsantotal);
  }
  openclose(){
    //console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
  }
    /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
    screenSwitch(e : any) : void {
      if(e.value==3){

        setTimeout(()=>{
          for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
            this.activeclass=e.value;
            //console.log(this.activeclass)
          })
        },500)
      }else{
        for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{

          this.activeclass=e.value;
          //console.log(this.activeclass)
        })
      }

    }


  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

  checkEvent(day){
    return false;
  }
  gotocalendardetail(day,flag){
    //console.log("gotocalendardetail");
    //console.log(flag);
    //console.log(this.currentYear);
    //console.log(this.currentMonth);
    //console.log(this.currentDate);
    //console.log("clicked"+day);
    this.selectedday=this.currentYear+"-"+this.currentMonth+"-"+day;

      this.generating();
  }
  getDaysOfMonth() {
    //console.log("getDaysofMonth...")
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
    //console.log("gotonextmonth")
    //console.log(this.date.getFullYear()+",,,,"+this.date.getMonth()+2, 0);
    //console.log(this.date);
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }
}
