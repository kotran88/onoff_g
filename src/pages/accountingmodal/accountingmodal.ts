import { Component } from '@angular/core';
import { IonicPage, ViewController,NavController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
/**
 * Generated class for the AccountingmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountingmodal',
  templateUrl: 'accountingmodal.html',
})
export class AccountingmodalPage {
  inputname:any="";
  inputcard:any="";
  inputcash:any="";
  accumulus:any=0;
  year:any="";
  month:any="";
  day:any="";
  selected:any="";
  firemain = firebase.database().ref();
  company:any="";
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    console.log("accountmodal come...")
    
    this.year=this.navParams.get("year")
    this.month=this.navParams.get("month")
    this.day=this.navParams.get("day")
    this.selected=this.navParams.get("selected")
    this.company=  localStorage.getItem("company");
    console.log(this.year)
    console.log(this.month)
    console.log(this.day)
    console.log(this.selected)
    console.log(this.selected.name)
    console.log(this.company);
    this.firemain.child("users").child(this.selected.nickname).child("accounting").once("value",snap=>{
      console.log(snap.val());
      if(snap.val()!=null){
        this.accumulus=snap.val().incoming;
        if(this.accumulus==undefined){
          this.accumulus=0;
        }
      }else{
        this.accumulus=0;
      }
     
    }
    )
  }
  //return the current time in milliseconds
  getNow() {
    return new Date().getTime();
  }
  // return the current time in millise
  getTheCurrentTime() {
    return this.getNow().toString();
    //return new Date(this.getTheCurrentTime()).toString();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountingmodalPage');
  }
  confirm(){

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    console.log("confirm");
    console.log(this.inputcard)
    console.log(this.inputcash)
    console.log(this.inputname)
    console.log(this.accumulus)
    console.log(this.selected.nickname);
    console.log(this.year+"-"+this.month+"-"+this.day)
    this.firemain.child("users").child(this.selected.nickname).child("accounting").update({"incoming":this.accumulus+Number(this.inputcard)+Number(this.inputcash) })
    this.firemain.child("users").child(this.selected.nickname).child("accounting").child(this.year+"-"+this.month+"-"+this.day).push({"name":this.inputname,"card":this.inputcard,"cash":this.inputcash,"year":this.year+"-"+this.month+"-"+this.day,"time":endtime}).then(()=>{
      this.view.dismiss();
    });
  }
  cancel(){

    this.view.dismiss();
  }
}
