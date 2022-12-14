import { Component } from '@angular/core';
import { IonicPage, LoadingController,AlertController,NavController, NavParams } from 'ionic-angular';

import {IamportCordova} from '@ionic-native/iamport-cordova'
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase';
import * as $ from "jquery";

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

  ValidateFlag:any=false;
  id:any = "";
  password:any = "";
  check=false;
  version='20230109 v1.1';
  name:any;
  loading:any;
  firemain = firebase.database().ref();
  constructor(public firebaseAuth:AngularFireAuth,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    var flag = localStorage.getItem("loginflag");
    console.log(flag);
    this.check = (flag === 'true');
    console.log("login flag : "+this.check);

    setTimeout(()=>{
      if(this.check==true){
        $("#checked").prop('checked', true);
        this.id = localStorage.getItem("id");
        this.password = localStorage.getItem("password");
        this.name = localStorage.getItem("name");
        this.login();
      }else{
        $("#checked").prop('checked', false);
      }
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
    // this.firebaseAuth.auth.creat eUserWithEmailAndPassword("?????????82@naver.com", "000000").then( (data)=> {})
  }
  find_admin(){
    // this.navCtrl.push(FindAccountPage);
  }
  signup(){
    var approved = localStorage.getItem("approved");
    var id = localStorage.getItem("id");
    console.log(approved);
    console.log(id);
    this.navCtrl.push(SignupPage,{"approved":approved,"id":id});
  }
  login_flag_update(){
    this.firemain.child('users').child(this.id).update({'login_flag':String(this.check)})
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
    if(this.id==undefined||this.password==undefined){

      window.alert("?????????????????? ??????????????????")
    }else{
      this.loading = this.loadingCtrl.create({
        content: 'loading....'
      });
      this.loading.present();
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
        this.firemain.child("users").child(this.id).once("value",(snap)=>{
          console.log("rrr")
          if(snap.val()==null){
            window.alert("???????????? ???????????? ????????????.")

          this.loading.dismiss();
            return;
          }
          console.log(snap.val()["name"])
          this.name=snap.val()["name"];

          localStorage.setItem("login_data",JSON.stringify(snap.val()))

          var approved=snap.val()["approved"];

          var payment=snap.val()["payment"];
          console.log(approved+",,"+payment)
          if(approved==false||approved==undefined){
            window.alert("????????????????????????. ??????????????? ???????????????")

          this.loading.dismiss();
            return;
          }else{
          }
          if(payment==false||payment==undefined){
            window.alert("?????? ???????????? ???????????????. ????????????????????? ?????? ????????? ????????????.")

          this.loading.dismiss();
            return;
          }else{
          }
          console.log(snap.numChildren());
          var length=snap.numChildren();
          console.log(snap.val()==null)

          this.loading.dismiss();
          if(length==1){
            //loginflag ?????? ????????? ???????????? ???????????? ????????????.
            window.alert("????????? ??? ??????????????? ??????????????????")
          }
          // else if(snap.val().flag!='approved'){
          //   window.alert("?????? ??????????????? ????????? ???????????????")
          //   return;
          // }
          else{
            if(snap.val()==null){
              window.alert("????????? ??? ??????????????? ??????????????????")
            }
            else{
              this.firemain.child("company").child(snap.val().company).once("value",(snap2)=>{
                console.log(snap2.val())
                console.log(snap.val())
                localStorage.setItem('id',this.id.split('@')[0]);
                localStorage.setItem('name',this.name);
                localStorage.setItem('password',this.password);
                localStorage.setItem('company',snap.val().company);

                localStorage.setItem("loginflag", String($('#checked' ).is(":checked")) )
                localStorage.setItem("type",snap.val().type);
               
                this.firemain.child("company").child(snap.val().company).child('openandclose').once('value').then((snap3)=>{
                  console.log(snap3.val().start)
                  
                  localStorage.setItem("flag",snap3.val().flag);
                  if(snap3.val().flag==true){
                    localStorage.setItem("startDate",snap3.val().startDate)
                    localStorage.setItem("start",snap3.val().start);

                    this.login_flag_update();
                    var type = snap.val().type;
                    var price = snap2.val().price;
                    localStorage.setItem("price",price)
                    console.log("gogo type is : "+type);
                    if(type == "park")
                    {
                      //??????
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
                      //?????? 
                      this.navCtrl.push(DirectorpagePage);
                    }else if(type == "account"){
                      //?????? 
                    this.navCtrl.push(AccountPage);
                    }else if(type=="info"){
                      //??????  
                      this.navCtrl.push(InfoPage)
                    }else if(type=="agasi"){
                      //????????? 
                      this.navCtrl.push(AgasiPage)
                    }else if(type=="band"){
                      //band 
                      this.navCtrl.push(BandPage)
                    }else if(type=="wt"){
                      //wt 
                      this.navCtrl.push(WtPage)
                    }
                  }else{
                    window.alert("?????? ???????????? ??????????????? ??????????????? ???????????????")
                  }
                });
              });

              // console.log("rr")

              // this.fire.auth.signInWithEmailAndPassword(this.id+"@naver.com", this.password).then( (data)=> {
              //   console.log(data);
              //   localStorage.setItem("loginflag", String($('#checked' ).is(":checked")) )
              //   this.login_success();
              // }).catch( (error)=> {
              //   console.log("error")
              //   console.log(error);
              //   if(error.code=="auth/user-not-found"||error.code=="auth/wrong-password"){
              //     alert("????????? ????????? ?????? ??????????????? ??????????????????.")
              //     return;
              //   }else if(error.code=="auth/too-many-requests"){

              //     var user=this.fire.auth.currentUser;
              //     // window.alert(user);
              //     console.log(user);
              //     localStorage.setItem("loginflag", String($('#checked' ).is(":checked")));
              //     this.login_success();

              //     // user.delete().then(()=>{

              //     // });

              //   }else{
              //     window.alert(error.code);
              //   }
              // });
            }
          }
        }).catch((e)=>{
          console.log(e);
        })
      }
    }

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
