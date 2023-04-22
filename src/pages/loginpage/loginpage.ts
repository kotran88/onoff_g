import { Component } from '@angular/core';
import { IonicPage, LoadingController,AlertController,NavController, NavParams } from 'ionic-angular';

import {IamportCordova} from '@ionic-native/iamport-cordova'
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase';
import * as $ from "jquery";


import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http/';
import { HttpClientModule,HttpHeaders } from '@angular/common/http/';
import { HttpModule } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { ParkingPage } from '../parking/parking';
import { UtilsProvider } from '../../providers/utils/utils';
import { DirectorpagePage } from '../directorpage/directorpage';
import { AccountPage } from '../account/account';
import { InfoPage } from '../info/info';
import { OrderPage } from '../order/order';
import { AgasiPage } from '../agasi/agasi';
import { ChoicePage } from '../choice/choice';
import { AttendancePage } from '../attendance/attendance';
import { BandPage } from '../band/band';
import { WtPage } from '../wt/wt';
import { GongjiPage } from '../gongji/gongji';
import { OrdermainPage } from '../ordermain/ordermain';
/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {
  directorList:any=[];
  ValidateFlag:any=false;
  nickname:any="";
  id:any = "";
  password:any = "";
  check=false;
  version='20230417 v2.92';
  name:any;
  loading:any;
  firemain = firebase.database().ref();
  // async getData() {
  //   try {
  //     const url = 'https://api.iamport.kr/users/getToken';
  //     const params = {"imp_key":"0040765620267739","imp_secret": "lLzW9IKeK9htRMa6RpJza8uJ08Q6Nbf9XP57xQlh0DLRqVXhlHRwPlgQu7Whjcqh2woznKRonDgNyd5U"};
  //     var headers = {};
  //     this.http.get(url, params,headers).subscribe((e)=>{
  //     const response = await this.http.get(url, params,headers);

  //     console.log(response.subscribe((e)=>{
  //       console.log(e);
  //     }));
  //   }catch (error) {
  //     console.error(error.status);
  //     console.error(error.error); // Error message as string
  //     console.error(error.headers);
  //   }
  // }
  // }
  constructor(public httpClient: HttpClient,public h:HttpModule, public http:HttpClientModule,public util : UtilsProvider,public firebaseAuth:AngularFireAuth,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    var flag = localStorage.getItem("loginflag");
    this.directorList=this.navParams.get("director");
    console.log(this.directorList)
    console.log(flag);
    this.check = (flag === 'true');
    console.log("login flag : "+this.check);

            var headers = new HttpHeaders();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
        
    setTimeout(()=>{
      // var abc = this.httpClient.get('https://wad.herokuapp.com/test2',{headers:headers} );
      // abc.subscribe(data => {
      //   console.log(data);
      // });
      
      if(this.check==true){
        $("#checked").prop('checked', true);
        this.id = localStorage.getItem("id");
        this.password = localStorage.getItem("password");
        this.name = localStorage.getItem("name");
        this.login();
      }else{
        $("#checked").prop('checked', false);
      }
      // this.http.get('https://wad.herokuapp.com/test').subscribe(data => {
      //   console.log(data);
      //   this.ValidateFlag=true;
      // }, error => {
      //   console.log(error);
      //   this.ValidateFlag=false;
      // }
      // );


    },1000)
    // this.version='7.6';
    localStorage.setItem('version',this.version)

    console.log(localStorage.getItem("loginflag"));

    //   for(var i in snap.val()){
    //     if(i==='admin'){}
    //     else{
    //       this.firemain.child('user').child(i).update({flag:"approved"})
    //     }
    //   }
    // })
    // this.firebaseAuth.auth.creat eUserWithEmailAndPassword("황지성82@naver.com", "000000").then( (data)=> {})
  }
  find_admin(){
    // this.navCtrl.push(FindAccountPage);
  }
  signup(){
    var approved = localStorage.getItem("approved");
    var id = localStorage.getItem("id");
    console.log(approved);
    console.log(id);
    this.navCtrl.push(SignupPage,{"approved":approved,"id":id}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("ondiddismiss....");
        console.log(data);
        if(data==undefined){

        }else{
          if(data.result=="success"){
            this.navCtrl.push(SignupPage);
          }
        }
        

      })
    });
  }
  login_flag_update(){
    // this.firemain.child('users').child(this.id).update({'login_flag':String(this.check)})
  }
  pressed(){
    console.log("pressed");
  }
  active(){
    console.log("active");
  }
  released(){
    console.log("released...")
  }
  login(){


    if(this.id.length==0||this.id==undefined||this.password==undefined){

      window.alert("아이디비번을 입력해주세요")
    }else{
      this.util.presentLoading();
      console.log(this.id);
      console.log(this.password);
      console.log(this.check)

      if(this.id.split('@')[0]==='admin'&&this.password==='adminadmin'){
        localStorage.setItem('id',this.id.split('@')[0]);
        localStorage.setItem('password',this.password);
        localStorage.setItem("loginflag", String(this.check));
        this.login_flag_update();
        this.login_success();
      }
      else{
        console.log(this.id);
        console.log(this.id.length);
       
        this.firemain.child("users").once("value",(snap)=>{
          var flag=false;
          for(var aa in snap.val()){
            if(snap.val()[aa].id==this.id){
              console.log(snap.val()[aa])
              flag=true;
              console.log(snap.val()[aa]["name"])
              this.nickname=snap.val()[aa]["nickname"];
              localStorage.setItem("login_data",JSON.stringify(snap.val()[aa]))
              localStorage.setItem("name",this.name);
              localStorage.setItem("nickname",this.nickname);
              var approved=snap.val()[aa]["approved"];
              var type = snap.val()[aa]["type"];
              var payment=snap.val()[aa]["payment"];
              console.log(type+"?????"+approved+",,"+payment)

          
          // if(approved==false||approved==undefined){
          //   window.alert("승인대기중입니다. 관리자에게 문의하세요")
          //   this.util.dismissLoading();
          //   return;
          // }else{
          // }
          if(approved==false||approved==undefined){
            window.alert("관리자가 승인해야 이용가능합니다.");
            this.util.dismissLoading();
            return;
          }
          if(payment==false||payment==undefined){
            window.alert("아직 결제하지 않았기때문에 조회만 가능합니다.")
            this.util.dismissLoading();
            this.navCtrl.push(InfoPage,{"user":this.directorList});
            return;
          }else{
          }

          localStorage.setItem('id',this.id.split('@')[0]);
          localStorage.setItem('name',this.name);
          localStorage.setItem('password',this.password);
          localStorage.setItem('company',snap.val()[aa].company);

          localStorage.setItem("loginflag", String($('#checked' ).is(":checked")) )
          localStorage.setItem("type",snap.val()[aa].type);
          console.log(snap.numChildren());
          var length=snap.numChildren();
          this.util.dismissLoading();
          this.firemain.child("company").child(snap.val()[aa].company).once("value",(snap2)=>{
            console.log(snap2.val())
            console.log(snap.val())
            this.firemain.child("company").child(snap.val()[aa].company).child('openandclose').once('value').then((snap3)=>{
              
              console.log(snap3.val())
              
              localStorage.setItem("flag",snap3.val().flag);
              if(snap3.val().flag==true){
                localStorage.setItem("startDate",snap3.val().startDate)
                localStorage.setItem("start",snap3.val().start);

                this.login_flag_update();
                console.log(snap.val()[aa])
                var price = snap2.val().price;
                console.log(price);
                localStorage.setItem("price",price)
                console.log("gogo type is : "+type);
                if(type == "park")
                {
                  //주차
                  this.navCtrl.push(ParkingPage).then(() => {
                    this.navCtrl.getActive().onDidDismiss(data => {
                      console.log("login ondiddismiss...")
                      this.check=false;
                      localStorage.setItem("loginflag","false")
                    });
                  });
                }
                else if(type == "director")
                {
                  //부장 
                  this.navCtrl.push(DirectorpagePage,{"user":this.directorList});
                }else if(type == "account"){
                  //경리 
                this.navCtrl.push(AccountPage);
                }else if(type=="info"){
                  //인포  
                  this.navCtrl.push(InfoPage,{"user":this.directorList})
                }else if(type=="agasi"){
                  //아가씨 
                  this.navCtrl.push(AgasiPage)
                }else if(type=="band"){
                  //band 
                  this.navCtrl.push(BandPage)
                }else if(type=="wt"){
                  //wt 
                  this.navCtrl.push(WtPage)
                }else if(type=="kyungri"){
                  this.navCtrl.push(InfoPage,{"user":this.directorList})
                }
              }else{
                window.alert("업장 개시하지 않았습니다 매니저에게 문의하세요")
              }
            });
          });




            }
          }
          console.log("rrr")
          if(!flag){
            window.alert("아이디가 존재하지 않습니다.")
            this.util.dismissLoading();
            return;
          }
          // if(snap.val().type=="kyungri"){
          //   this.loading.dismiss();
          //   return;
          // }
          
        }).catch((e)=>{
          console.log(e);
        })
      }
    }


    // var data = {
    //   pay_method: 'card',
    //   merchant_uid: 'mid_' + new Date().getTime(),
    //   name: 'WAD 앱 사용',
    //   amount: "20000",
    //   app_scheme: 'ionickcp',
    //   buyer_email: '',
    //   buyer_tel: '010-1234-5678',
    //   buyer_addr: '서울특별시 강남구 삼성동',
    //   buyer_postcode: '123-456',
    //   customer_uid: 'cid_' + new Date().getTime()
    // };

    // var PaymentObject = {
    //   userCode: "imp58611631",
    //   data: data,
    //   callback: (response) => {
    //     console.log(response);
    //     if (response.imp_success == "true") {

    //     }
    //   }
    // }
    // IamportCordova.payment(PaymentObject)
    // .then((response) => {
    //  console.log(response);

    // })
    // .catch((err) => {
    //   window.alert('error : '+err)
     
      
    // });
  }

  login_success(){
    console.log('login success')
    this.loading.dismiss();
    // window.alert($('#checked' ).is(":checked"))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

  checkbox_click(){
    this.check=!this.check;
    window.alert(this.check);
    localStorage.setItem("loginflag", String(this.check));
  }
}
