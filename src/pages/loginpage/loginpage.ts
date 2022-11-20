import { Component } from '@angular/core';
import { IonicPage, LoadingController,AlertController,NavController, NavParams } from 'ionic-angular';

import {IamportCordova} from '@ionic-native/iamport-cordova'
import { AngularFireAuth } from 'angularfire2/auth';
import  firebase from 'firebase';
import * as $ from "jquery";

import { SignupPage } from '../signup/signup';
import { TspagePage } from '../tspage/tspage';
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
  id:any;
  password:any;
  check=false;
  version='1.0';

  loading:any;
  firemain = firebase.database().ref();
  constructor(public firebaseAuth:AngularFireAuth,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {

    // this.version='7.6';
    localStorage.setItem('version',this.version)
    var a=new Date();
    a.setMonth(1);
    console.log(new Date());
    console.log(a);

    console.log(localStorage.getItem("loginflag"));

    // this.firemain.child('user').once('value').then((snap)=>{
    //   for(var i in snap.val()){
    //     if(i==='admin'){}
    //     else{
    //       this.firemain.child('user').child(i).update({flag:"approved"})
    //     }
    //   }
    // })
    this.firemain.child("test").update({"a":"b"})
    console.log(this.firemain);
    // this.firebaseAuth.auth.creat eUserWithEmailAndPassword("황지성82@naver.com", "000000").then( (data)=> {})
  }

  find_admin(){
    // this.navCtrl.push(FindAccountPage);
  }
  signup(){
    this.navCtrl.push(SignupPage);
  }
  login_flag_update(){
    this.firemain.child('user').child(this.id.split('@')[0]).update({'login_flag':String(this.check)})
  }
  login(){
    if(this.id==undefined||this.password==undefined){

      window.alert("아이디비번을 입력해주세요")
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
        this.firemain.child("user").child(this.id).once("value",(snap)=>{
          console.log("r")
          console.log(snap.numChildren());
          var length=snap.numChildren();
          console.log(snap.val()==null)

          this.loading.dismiss();
          if(length==1){
            //loginflag 밖에 없을때 회원가입 화면으로 이동시킴.
            window.alert("아이디 및 비밀번호를 확인해주세요")
          }else{
            if(snap.val()==null){
              window.alert("아이디 및 비밀번호를 확인해주세요")
            }
            else if(snap.val().flag!='approved'){
              window.alert("승인 대기중으로 진행이 불가합니다")
              return;
            }else{
              console.log(snap.val())
              localStorage.setItem('id',this.id.split('@')[0]);
              localStorage.setItem('password',this.password);
              this.login_flag_update();
              console.log("rr")

              this.fire.auth.signInWithEmailAndPassword(this.id+"@naver.com", this.password).then( (data)=> {
                console.log(data);
                localStorage.setItem("loginflag", String($('#checked' ).is(":checked")) )
                this.login_success();
              }).catch( (error)=> {
                console.log("error")
                console.log(error);
                if(error.code=="auth/user-not-found"||error.code=="auth/wrong-password"){
                  alert("유저의 아이디 혹은 비밀번호가 맞지않습니다.")
                  return;
                }else if(error.code=="auth/too-many-requests"){

                  var user=this.fire.auth.currentUser;
                  // window.alert(user);
                  console.log(user);
                  localStorage.setItem("loginflag", String($('#checked' ).is(":checked")));
                  this.login_success();

                  // user.delete().then(()=>{

                  // });

                }else{
                  window.alert(error.code);
                }
              });
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
    this.navCtrl.setRoot(TspagePage, { "id": this.id });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

  checkbox_click(){
    this.check=!(this.check===true);
  }
}
