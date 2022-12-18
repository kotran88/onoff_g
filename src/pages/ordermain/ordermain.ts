import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
/**
 * Generated class for the OrdermainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordermain',
  templateUrl: 'ordermain.html',
})
export class OrdermainPage {
  mainlist:any = [];
  smallroom=[];
  midroom=[];
  bigroom=[];
  company:any="";
  firemain = firebase.database().ref();
  constructor(public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log(snap.val());
      console.log(snap.val().category)
      for(var a in snap.val()){
       var cat =  snap.val()[a].category;
       var name = snap.val()[a].name;
       console.log(cat);
       if(cat=="소"){
         this.smallroom.push({"name":name,"category":cat});
       }
       if(cat=="중"){
        this.midroom.push({"name":name,"category":cat});
      }
      if(cat=="대"){
        this.bigroom.push({"name":name,"category":cat});
      }
      }
      console.log(this.smallroom);
    });
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a].roomhistory)
        for(var b in snap.val()[a].roomhistory){
          console.log(snap.val()[a].roomhistory[b]);
          this.mainlist.push(snap.val()[a].roomhistory[b]);
        }
        // for(var b in snap.val()[a]){
        //   console.log(snap.val()[a][b]);
        //   this.mainlist.push(snap.val()[a][b]);
        // }
      }
      console.log(this.mainlist)
    });
  }
  
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(EditingroomPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");
      this.mainlist=[];
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        for(var a in snap.val()){
          console.log("mmmm")
          console.log(snap.val()[a].roomhistory)
          for(var b in snap.val()[a].roomhistory){
            console.log(snap.val()[a].roomhistory[b]);
            this.mainlist.push(snap.val()[a].roomhistory[b]);
          }
          // for(var b in snap.val()[a]){
          //   console.log(snap.val()[a][b]);
          //   this.mainlist.push(snap.val()[a][b]);
          // }
        }
        console.log(this.mainlist)
      });

    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room});
    modal.onDidDismiss(url => {
      console.log("dismiss!");
    });

    modal.present();
  }
}
