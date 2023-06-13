import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';

import  firebase from 'firebase';
/**
 * Generated class for the SplashscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {

  directorList:any=[];
  firemain = firebase.database().ref();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var a = this.directorList;
    var nav = this.navCtrl;
    // var orderedQuery = this.firemain.child("users").orderByChild("type");
    // orderedQuery.once("value", function(snapshot) {
    //  snapshot.forEach(function(childSnapshot) {
    //    var childData = childSnapshot.val();
    //    console.log(childData)
    //     a.push(childData);
    //  })
    //  console.log(a);
    //  localStorage.setItem("director",JSON.stringify(a))
    //  nav.setRoot(LoginpagePage,{"director":a});

    // });
    this.navCtrl.setRoot(LoginpagePage);
    // this.firemain.child("users").orderByChild("type").once("value",snap=>{
    //   console.log(snap.val())
    //   for(var b in snap.val()){
    //     if(snap.val()[b].nickname==undefined){

    //     }else{
    //         this.directorList.push(snap.val()[b]);
           
            
    //     }
       
    //   }
    //   console.log("user loop finished");
    //   console.log(this.directorList)

    // });
  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashscreenPage');
  }

}
