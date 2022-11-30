import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';

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

  option_title_ch = 0;
  option_title = ["팀을 선택해주세요.", "담당자를 선택해주세요."];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.login_data = JSON.parse(localStorage.getItem("login_data"));

    this.get_team_list();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
