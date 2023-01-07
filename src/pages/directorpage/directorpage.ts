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
@Component({
  selector: 'page-directorpage',
  templateUrl: 'directorpage.html',
})
export class DirectorpagePage {
  name:any="";
  mainlist=[];
  allmainlist=[];
  obj = [];
  firemain = firebase.database().ref();
  count : number[] = new Array();
  orderlist=[];
  totalcount=0;
  totalprice=0;
  currentstartday:any="";
  currentstart:any="";
  company:any;
  constructor(public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.company=localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
  }
  
  gotolink(value){
    if(value == 1){
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
      window.alert("6")
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorpagePage');

    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      console.log(snap.val())
      console.log(snap.val().roomhistory)
      if(snap.val()!=undefined){
        for(var a in snap.val()){
          console.log(snap.val()[a].roomhistory);

          for(var b in snap.val()[a].roomhistory){
            console.log(snap.val()[a].roomhistory[b]);
            for(var c in snap.val()[a].roomhistory[b]){
              if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
                console.log(date);
                console.log(this.currentstartday);
                console.log(snap.val()[a].roomhistory[b][c].date);
                if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                  console.log(snap.val()[a].roomhistory[b][c].orderlist);
                  console.log(snap.val()[a].roomhistory[b][c].orderlist.roomno);
                  for(var d in snap.val()[a].roomhistory[b][c].orderlist.orderlist){
                    console.log(snap.val()[a].roomhistory[b][c].orderlist);
                    this.orderlist.push({"date":snap.val()[a].roomhistory[b][c].orderDate,"roomno":snap.val()[a].roomhistory[b][c].orderlist.roomno, "value":snap.val()[a].roomhistory[b][c].orderlist.orderlist[d]});
                  }
                }
               
                
              }
             
            }
          }
        }
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

}
