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

  company:any;
  constructor(public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.company=localStorage.getItem("company");

  }
  
  gotolink(value){
    if(value == 1){
    this.navCtrl.push(ParkingPage);
    }else if(value==2){
      this.navCtrl.push(InfoPage);
    }else if(value==3){
      this.navCtrl.push(AttendancePage);
    }else if(value==4){
      this.navCtrl.push(ChoicePage);
    }else if(value==5){
      this.navCtrl.push(GongjiPage);
    }else if(value==6){
      this.navCtrl.push(InfoPage);
    }else if(value==7){
      this.navCtrl.push(InfoPage);
    }
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  logout(){
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



    this.firemain.child('park').once('value').then((snap)=>{
        console.log(snap.val())
      for(var a in snap.val()){
        console.log("a is :"+a);
        var todaylist=[];
        var countingvalue=0;
        var countingprice =0;
        for(var b in snap.val()[a]){
          console.log(snap.val()[a][b]);
          todaylist.push(snap.val()[a][b]);
          countingvalue++;
          countingprice+=Number(snap.val()[a][b].price);
          if(year+"-"+month+"-"+day==snap.val()[a][b].date){
            this.mainlist.push(snap.val()[a][b]);
          }

          // this.allmainlist.push(snap.val()[a][b]);
          
        }
        this.obj[a] = todaylist

        this.allmainlist.push({a:todaylist,"count":countingvalue,"price":countingprice})


      }

      console.log("allmainlist");
      console.log(this.obj);
      console.log(this.allmainlist)
      // this.obj.foreach(element =>{

      //   this.allmainlist.push(element);
      
      // });
      
    });

  }

}
