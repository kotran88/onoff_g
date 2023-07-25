import { Component, ViewChild } from '@angular/core';
import { Platform ,ViewController,App,AlertController, Nav, MenuClose, Modal, ModalController, NavController, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginpagePage } from '../pages/loginpage/loginpage';
import firebase from 'firebase/app';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { SlidetestPage } from '../pages/slidetest/slidetest';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = HomePage;
  // rootPage:any=MypagePage;
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Modal) modal: Modal;
  rootPage:any=SplashscreenPage;
  app:any;
  id:any;
  user:any;

  lastBack:any;

  allowClose:any;
  firemain=firebase.database().ref();

  pages:Array<{title:string,component:any}>;
  constructor(app : App,public alertCtrl:AlertController,public toastCtrl:ToastController,public statusBar: StatusBar, public platform: Platform) {
    this.app=app;
    this.platform.ready().then(() => {

    platform.registerBackButtonAction(() => { 
      const av = this.nav.getActive();
      const activePage = av ? av.instance : null;
      console.log(activePage);
      console.log("go back!");
      if (activePage) {
        console.log("activePage.constructor.nameactivePage.constructor.name");
        console.log(activePage.constructor.name);
        if(activePage.constructor.name=="SlidetestPage"){
          console.log("INNNNNN");

          const overlay = this.app._appRoot._overlayPortal.getActive();
          const nav = this.app.getActiveNav();
          const closeDelay = 3000;
          const spamDelay = 500;

          if(overlay && overlay.dismiss) {
            overlay.dismiss();
          } else if(nav.canGoBack()){
            nav.pop();
          } else if( !this.allowClose) {
            this.allowClose = true;
            let toast = this.toastCtrl.create({
              message: "한번 더 누르면 종료됩니다.",
              duration: closeDelay,
              dismissOnPageChange: true
            });
            toast.onDidDismiss(() => {
              this.allowClose = false;
            });
            toast.present();
          } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
            platform.exitApp();
          }
          this.lastBack = Date.now();
          
        }else if(activePage.constructor.name == "ChoicedetailPage"){
          console.log("do nothing");
          const nav = this.app.getActiveNav();
          console.log(nav.canGoBack());
          if(nav.canGoBack()){

          nav.pop();
          }else{
            // console.log("false so refresh...");
            // this.nav.setRoot(SlidetestPage);
          }

        }else{
          console.log("go back but not slide page");
          const nav = this.app.getActiveNav();
          console.log(nav.canGoBack());
          this.nav.setRoot(SlidetestPage);
        }
      }
      
      // let navv = app.getActiveNav();
      // let navv2=this.app.getActiveNav();
      // let activeView = navv.getActive();
      // console.log(navv2);
      // console.log(activeView);
      // console.log(navv);
      // console.log(navv.getActive().component.name)
          //  if (navv.getActive().component.name == "SlidetestPage") {

          //   const overlay = this.app._appRoot._overlayPortal.getActive();
          //   const nav = this.app.getActiveNav();
          //   const closeDelay = 2000;
          //   const spamDelay = 500;

          //   if(overlay && overlay.dismiss) {
          //     overlay.dismiss();
          //   } else if(nav.canGoBack()){
          //     nav.pop();
          //   } else if( !this.allowClose) {
          //     this.allowClose = true;
          //     let toast = this.toastCtrl.create({
          //       message: "한번 더 누르면 종료됩니다.",
          //       duration: closeDelay,
          //       dismissOnPageChange: true
          //     });
          //     toast.onDidDismiss(() => {
          //       this.allowClose = false;
          //     });
          //     toast.present();
          //   } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
          //     platform.exitApp();
          //   }
          //   this.lastBack = Date.now();

          // }else{
          //   if(navv.canGoBack){
          //     navv.pop();
          //   }else{
          //     navv.pop();
          //     setTimeout(()=>{
          //       navv.pop();
          //     },300)
          //   }
          // }

    });
      if(this.platform.is('android') ) {
        this.statusBar.styleBlackOpaque();
      };
    });

    var loginflag=localStorage.getItem('loginflag');

    console.log("login flag is : "+loginflag);
    if(loginflag===''||loginflag==='false'||loginflag===undefined||loginflag===null){
    }
    else{
      this.id=localStorage.getItem('id');

    }

    this.platform.registerBackButtonAction(() => { 
      
      window.alert("back");  // 여기 부분 ?
      let navv = app.getActiveNav();
      let activeView = navv.getActive();
      window.alert(navv.getActive().component.name)
           if (navv.getActive().component.name == "SlidetestPage") {

            const overlay = this.app._appRoot._overlayPortal.getActive();
            const nav = this.app.getActiveNav();
            const closeDelay = 2000;
            const spamDelay = 500;

            if(overlay && overlay.dismiss) {
              overlay.dismiss();
            } else if(nav.canGoBack()){
              nav.pop();
            } else if( !this.allowClose) {
              this.allowClose = true;
              let toast = this.toastCtrl.create({
                message: "한번 더 누르면 종료됩니다.",
                duration: closeDelay,
                dismissOnPageChange: true
              });
              toast.onDidDismiss(() => {
                this.allowClose = false;
              });
              toast.present();
            } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
              this.platform.exitApp();
            }
            this.lastBack = Date.now();

          }else{
            if(navv.canGoBack){
              navv.pop();
            }else{
              navv.pop();
              setTimeout(()=>{
                navv.pop();
              },300)
            }
          }
    });

  }

  openPage(page){

    if(page.component==='logout'){
      this.logout();
    }
    else {
      this.nav.push(page.component,{user:this.user})
    }
  }

  gosetting(){
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: '로그아웃 하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '확인',
          handler: data => {
            localStorage.setItem("loginflag", "false");
            localStorage.setItem("id", "");
            window.alert("로그아웃 되었습니다.")
            location.reload();
            // this.confirmAlert2("로그아웃 되었습니다.");
          }
        }
      ]
    });
    alert.present();
  }
}

