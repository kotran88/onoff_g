import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController,ModalController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
import { Choicemodal3Page } from '../choicemodal3/choicemodal3';
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

  jopanjjinglist:any=[];
  agasijungsan:any = [];
  mainlist:any = [];
  mainlist_no:any = [];
  firemain = firebase.database().ref();
  selectedday:any=0;
  activeclass='1';
  totalin:any=0;
  totalout:any=0;
  year:any="";
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
  totalagasi:any=[];
  currentstartday:any="";
  currentstart:any="";
  agasijungsantotal:any=[];
  company:any="";
  constructor(public zone:NgZone,public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    this.selectedday=this.currentstartday
    console.log(this.currentstartday);
  }

  attending(){
    console.log("attending??");

    let modal = this.modal.create(Choicemodal3Page,{});
    modal.onDidDismiss(url => {

      this.generating();
      // this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.goToday();

    this.generating();
    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-1").style.display = "";
        this.zone.run(()=>{

          this.activeclass='1'
        })
  }
  generating(){
    this.totalagasi=[];
    this.mainlist=[];
    this.mainlist_no=[];
    this.totalin=0;
    this.agasijungsan=[];
    this.agasijungsantotal=[];
    this.jopanjjinglist = [];
    this.firemain.child("company").child(this.company).child("jopanjjing").once("value", (snap) => {
      
      for(var a in snap.val()){
        console.log(snap.val()[a][this.selectedday])
        for(var b in snap.val()[a][this.selectedday]){
          console.log(snap.val()[a][this.selectedday][b])


          var jopanjjing = snap.val()[a][this.selectedday][b].values;
          var date = snap.val()[a][this.selectedday][b].date;
          var agasi = snap.val()[a][this.selectedday][b].agasi;
          var incharge = snap.val()[a][this.selectedday][b].incharge;
          var team = snap.val()[a][this.selectedday][b].jopan;
          this.jopanjjinglist.push({"team":team,"date":date,"agasi":agasi,"incharge":incharge,"jopanjjing":jopanjjing})
        }
      }
    });
    this.firemain.child('users').once('value').then((snap)=>{
      for(var a in snap.val()){
        if(snap.val()[a].name!=undefined){
          if(snap.val()[a].type=="agasi"){
            if(this.company == snap.val()[a].company){
              this.totalagasi.push({"name":snap.val()[a].name,"id":a});


              if(snap.val()[a].roomhistory!=undefined){
                console.log("room history");
                console.log(snap.val()[a].roomhistory)
                for(var aa in snap.val()[a].roomhistory){
                  console.log("a is : "+aa); //방번호?
                  for(var b in snap.val()[a].roomhistory[aa]){
                    console.log("b is : "+b);
                    if(b == this.selectedday){
                      console.log(snap.val()[a].roomhistory[aa][b]);
                      for(var c in snap.val()[a].roomhistory[aa][b]){
                        console.log(snap.val()[a].roomhistory[aa][b][c]);
                        // var end = snap.val()[a].roomhistory[a][b][c].end_date_full
                        // var start = snap.val()[a].roomhistory[a][b][c].date;
                        // console.log(end);
                        // console.log(start);
                        this.agasijungsan.push(snap.val()[a].roomhistory[aa][b][c]);
                      }
                    }
                    if((b=="end_date")||(b=="end_date_full") ){
                      
                    }else{
                      console.log("b is : "+b +"so pass")
                      for(var c in snap.val()[a].roomhistory[aa][b]){
                        console.log(snap.val()[a].roomhistory[aa][b][c]);
                        if(snap.val()[a].roomhistory[aa][b][c].incharge!=undefined){
                          this.agasijungsantotal.push(snap.val()[a].roomhistory[aa][b][c]);
                        }
                        // var end = snap.val()[a].roomhistory[a][b][c].end_date_full
                        // var start = snap.val()[a].roomhistory[a][b][c].date;
                        // console.log(end);
                        // console.log(start);
                       
                      }
                    }
                    
                   
                    
                  }
                }
              };

            }
          }
        }
      }

      console.log(this.agasijungsan);
      console.log(this.agasijungsantotal);
    });
    this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
      console.log(snap.val())

      for(var a in snap.val()){
        console.log(a)
        console.log(snap.val()[a])
        if(a==this.currentstartday){
          console.log("mmmm")
          for(var b in snap.val()[a]){
            console.log(snap.val()[a][b]);
            console.log(snap.val()[a][b].attend.flag);
            if(snap.val()[a][b].attend!=undefined){
              this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              this.totalin++;
            }
            if(snap.val()[a][b].noattend!=undefined){
              this.totalout++;
              this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
            }

          }
        }

      }
      console.log(this.mainlist)
    });
  }
  openclose(){
    console.log("open and cloe");
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
            console.log(this.activeclass)
          })
        },500)
      }else{
        for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{

          this.activeclass=e.value;
          console.log(this.activeclass)
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
  gotocalendardetail(day){
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.currentDate);
    console.log("clicked"+day);
    this.selectedday=this.currentYear+"-"+this.currentMonth+"-"+day;
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
}
