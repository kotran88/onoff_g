import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';

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

  // 팀 리스트
  view_list = [];
  // display: flex;로 정렬된 비율 유지를 위해 빈공간 리스트
  sort_temp_list =[];

  name:any="";
  login_data:any = {};

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.login_data = JSON.parse(localStorage.getItem("login_data"));

    this.get_team_list();

    this.goToday();
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
        this.view_list.push(snap.val()[i]);
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
    this.option_title_ch = 2;
    console.log(name);
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
