import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController ,LoadingController} from 'ionic-angular';
import firebase from 'firebase'
import { GongjiwritePage } from '../gongjiwrite/gongjiwrite';

/**
 * Generated class for the GongjiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gongji',
  templateUrl: 'gongji.html',
})
export class GongjiPage {

  list=[];
  company:any;
  firemain = firebase.database().ref();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.company = localStorage.getItem("company");

    this.firemain.child("company").child(this.company).child("gongji").once('value').then((snap)=>{
      console.log(snap.val());
      for(var a in snap.val()){
        console.log(snap.val()[a]);
        this.list.push(snap.val()[a]);
      }
    });
  }
  gotogongji(){
    this.navCtrl.push(GongjiwritePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongjiPage');
  }

}
