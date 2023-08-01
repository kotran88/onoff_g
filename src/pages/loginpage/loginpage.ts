import { Component } from '@angular/core';
import { IonicPage, LoadingController,AlertController,NavController, NavParams } from 'ionic-angular';

import {IamportCordova} from '@ionic-native/iamport-cordova'
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase';
import * as $ from "jquery";

import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http/';
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
import { SlidetestPage } from '../slidetest/slidetest';
import { WebsocketProvider } from '../../providers/websocket/websocket';
// import { StompClient } from '../services/stomp.client';
import { StompClient } from '../../providers/websocket/stomp.client';
import { Observable } from 'rxjs/Observable';

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
  version='20230717 v4.48';
  name:any;
  loading:any;
  firemain = firebase.database().ref();

  constructor(private websocketProvider: WebsocketProvider ,private soc : StompClient, public httpClient: HttpClient,public http:HTTP, public util : UtilsProvider,public firebaseAuth:AngularFireAuth,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
   
      console.log(localStorage.getItem("loginflag"));
      if(localStorage.getItem("loginflag")==null){
        $("#checked").prop('checked', false);
      }else if((localStorage.getItem("loginflag").toString()=="true" )){
        $("#checked").prop('checked', true);
        this.id = localStorage.getItem("id");
        this.password = localStorage.getItem("password");
        this.name = localStorage.getItem("name");
        this.login();
      }else{
        $("#checked").prop('checked', false);
      }
    localStorage.setItem('version',this.version)
      setTimeout(()=>{
        console.log("settimeout!");
        this.requestLogin("wt3","ananan");
      },1000);
      }
      private subscribeToWebSocket() {

        let roomList: Observable<any> = this.soc.subscribe('/topic/info', {});
        roomList.subscribe(response => {
            console.log("list", response);
        });

      }
  requestLogin(id,pass){
    var apiUrl = "https://captainq.wadteam.com/captainq/apis/login";
    this.http.get(apiUrl, {"userid":"wt3","userpw":"ananan"}, {}).then(data => {
      console.log("data is...");
      var a = JSON.parse(data.data)
      console.log(a.rst_code);
      var result = JSON.parse(a.rst_content);
      console.log(result);
      console.log(result.idx);
      console.log(result.userid);





      this.nickname=result.nickname;
      localStorage.setItem("login_data",JSON.stringify(result) );
      localStorage.setItem("name",result.name);
      localStorage.setItem("nickname",result.nickname);
      // localStorage.setItem("jopan",result.jopan);
      var approved=result.approved;
      var type = result.mtype;
      var young = result.young
      var payment=result.payment;

  
  // if(approved==false||approved==undefined){
  //   window.alert("승인대기중입니다. 관리자에게 문의하세요")
  //   this.util.dismissLoading();
  //   return;
  // }else{
  // }

  localStorage.setItem('id',this.id.split('@')[0]);
  localStorage.setItem('name',result.name);
  localStorage.setItem('password',this.password);
  localStorage.setItem('company',result.company);

  localStorage.setItem("type",result.mytype);
  if(approved!=1||approved==undefined){
    // window.alert("관리자가 승인해야 이용가능합니다.");
    // this.util.dismissLoading();
    // return;
  }
  if(young!=undefined&&young.length==1){
     
      window.alert("코드번호가 부여되지않아서 조회만 가능합니다. ")
      this.util.dismissLoading();
      // this.navCtrl.setRoot(InfoPage,{"user":this.directorList});
      return;
   
  }else{
  }

  this.util.dismissLoading();
  this.firemain.child("company").child(result.company).once("value",(snap2)=>{
    console.log(snap2.val())
    var tc=0;
    if(snap2.val().tc==undefined){
      window.alert("tc설정이 안되있으므로 기본값 13으로 설정됩니다.")
      tc=13;
    }else{
      tc=snap2.val().tc;
    }

    localStorage.setItem("tc",snap2.val().tc);
    localStorage.setItem("auto",snap2.val().autoflag);
    localStorage.setItem("flag",snap2.val().openandclose.flag);

    this.login_flag_update();
    var price = snap2.val().price;
    console.log(price);
    localStorage.setItem("price",price)
    console.log("gogo type is : "+type);
    if(snap2.val().openandclose.flag==true){
      localStorage.setItem("startDate",snap2.val().openandclose.startDate);
      localStorage.setItem("start",snap2.val().openandclose.start);

    }else{
      window.alert("업장 개시하지 않았습니다 매니저에게 문의하세요")
      return;
    }
    this.navCtrl.push(SlidetestPage);
  });














    });

  }
  find_admin(){
  }
  signup(){
    var approved = localStorage.getItem("approved");
    var id = localStorage.getItem("id");
    console.log(approved);
    console.log(id);
    if(approved==null||id.length==0){

      this.navCtrl.push(SignupPage);
      return;
    }
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
  functiontogotopage(nickname){
    console.log(nickname);
    this.firemain.child("users").child(nickname).once("value",(snap)=>{
          console.log("users...");
          console.log(snap.val());
          var flag=false;
              console.log(snap.val())
              flag=true;
              console.log(snap.val()["name"])
              this.nickname=snap.val()["nickname"];
              localStorage.setItem("login_data",JSON.stringify(snap.val()))
              localStorage.setItem("name",this.name);
              localStorage.setItem("nickname",this.nickname);
              localStorage.setItem("jopan",snap.val()["jopan"]);
              var approved=snap.val()["approved"];
              var type = snap.val()["type"];
              var young = snap.val()["young"];
              var payment=snap.val()["payment"];
              console.log(type+"?????"+approved+",,"+payment)

          
          // if(approved==false||approved==undefined){
          //   window.alert("승인대기중입니다. 관리자에게 문의하세요")
          //   this.util.dismissLoading();
          //   return;
          // }else{
          // }

          localStorage.setItem('id',this.id.split('@')[0]);
          localStorage.setItem('name',this.name);
          localStorage.setItem('password',this.password);
          localStorage.setItem('company',snap.val().company);

          localStorage.setItem("type",snap.val().type);
          if(approved==false||approved==undefined){
            // window.alert("관리자가 승인해야 이용가능합니다.");
            // this.util.dismissLoading();
            // return;
          }
          if(young!=undefined&&young.length==1){
             
              window.alert("코드번호가 부여되지않아서 조회만 가능합니다. ")
              this.util.dismissLoading();
              // this.navCtrl.setRoot(InfoPage,{"user":this.directorList});
              return;
           
          }else{
          }

          console.log(snap.numChildren());
          var length=snap.numChildren();
          this.util.dismissLoading();
          this.firemain.child("company").child(snap.val().company).once("value",(snap2)=>{
            console.log(snap2.val())
            console.log(snap.val())
            var tc=0;
            if(snap2.val().tc==undefined){
              window.alert("tc설정이 안되있으므로 기본값 13으로 설정됩니다.")
              tc=13;
            }else{
              tc=snap2.val().tc;
            }

            localStorage.setItem("tc",snap2.val().tc);
            localStorage.setItem("auto",snap2.val().autoflag);
            localStorage.setItem("flag",snap2.val().openandclose.flag);

            this.login_flag_update();
            console.log(snap.val())
            var price = snap2.val().price;
            console.log(price);
            localStorage.setItem("price",price)
            console.log("gogo type is : "+type);
            if(snap2.val().openandclose.flag==true){
              localStorage.setItem("startDate",snap2.val().openandclose.startDate);
              localStorage.setItem("start",snap2.val().openandclose.start);

            }else{
              window.alert("업장 개시하지 않았습니다 매니저에게 문의하세요")
              return;
            }
            this.navCtrl.push(SlidetestPage);
          });




          console.log("rrr")
          if(!flag){
            window.alert("아이디혹은 비밀번호정보 오류 ")
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
  login(){


    this.util.presentLoading();
    if(this.id.length==0||this.id==undefined||this.password==undefined){

      window.alert("아이디비번을 입력해주세요")
      this.util.dismissLoading();
    }else{
      console.log(this.id);
      console.log(this.password);
      console.log(this.check)

      if(this.id.split('@')[0]==='admin'&&this.password==='adminadmin'){
        localStorage.setItem('id',this.id.split('@')[0]);
        localStorage.setItem('password',this.password);
        // localStorage.setItem("loginflag", String(this.check));
        this.login_flag_update();
        this.login_success();
      }
      else{
        console.log("else...")
        this.requestLogin(this.id,this.password);
      //  var a = this.id;
      //  var b = this.password;
      //  var c = this;
      //  this.firemain.child("users").orderByChild("id").equalTo(a).once("value", snap => {
      //   console.log(snap.val());
      //   snap.forEach((childSnapshot)=> {
      //     var childData = childSnapshot.val();
      //         console.log(childData);
      //              if(childData!=undefined&&childData.id!=undefined&&childData.nickname!=undefined){
      //       if((childData.id==a&&childData.pass==b)){
      //         c.functiontogotopage(childData.nickname)
      //         return;
      //       }else{
      //       }
      //     }
      //   });
      //  });
      }
    }


  }

  login_success(){
    console.log('login success')
    this.loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

  checkbox_click(){
    this.check=!this.check;
    console.log("checkbox clicked ..."+this.check);
    localStorage.setItem("loginflag", String(this.check));
  }

}
