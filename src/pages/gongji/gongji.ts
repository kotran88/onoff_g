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

@Component({
  selector: 'page-gongji',
  templateUrl: 'gongji.html',
})
export class GongjiPage {

  list=[];
  company:any;
  firemain = firebase.database().ref();
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    
    this.company = localStorage.getItem("company");

    this.firemain.child("company").child(this.company).child("gongji").once('value').then((snap)=>{
      console.log(snap.val());
      for(var a in snap.val()){
        console.log(snap.val()[a]);
        this.list.push(snap.val()[a]);
      }
      console.log(this.list);
       this.list.sort((a, b) => {
        console.log(a.date);
        console.log(b.date);
        return a.date - b.date;
      });
      this.list.reverse();
      console.log(this.list);
    });
  }
  close(){
    console.log("close gongji")
    // this.menuCtrl.open();
    this.view.dismiss();
}
  gotogongji(){
    this.navCtrl.push(GongjiwritePage).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        this.list=[];
        this.firemain.child("company").child(this.company).child("gongji").once('value').then((snap)=>{
          console.log(snap.val());
          for(var a in snap.val()){
            console.log(snap.val()[a]);
            this.list.push(snap.val()[a]);
          }
        });
      });
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GongjiPage');
  }

}
