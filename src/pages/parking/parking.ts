import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParkingdetailPage } from '../parkingdetail/parkingdetail';
import { ReceiptPage } from './../receipt/receipt';

import  firebase from 'firebase';
/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingPage {
  showplus=false;
  totalcount=0;
  totalprice=0;
  mainlist=[];
  allmainlist=[];
  obj = [];
  activeclass='1';
  firemain = firebase.database().ref();
  count : number[] = new Array();
  constructor(public zone:NgZone,public navCtrl: NavController, public navParams: NavParams) {
    console.log("parking come");
    for (let i = 1; i <= 10; i++) {
      this.count.push(i);
    }
  }
  back(){
    window.alert("back")
  }
  ionViewDidLoad() {
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    this.firemain.child('park').once('value').then((snap)=>{
      
      for(var a in snap.val()){
        console.log("a is :"+a);
        var todaylist=[];
        var countingvalue=0;
        var countingprice =0;
        for(var b in snap.val()[a]){
          console.log(snap.val()[a][b]);
          todaylist.push(snap.val()[a][b]);
          countingvalue++;
          countingprice+=Number(snap.val()[a][b].price);
          if(year+"-"+month+"-"+day==snap.val()[a][b].date){
            this.totalcount++;
            this.totalprice+=Number(snap.val()[a][b].price);
            this.mainlist.push(snap.val()[a][b]);
          }

          // this.allmainlist.push(snap.val()[a][b]);
          
        }
        this.obj[a] = todaylist

        this.allmainlist.push({a:todaylist,"count":countingvalue,"price":countingprice})


      }

      console.log("allmainlist");
      console.log(this.obj);
      console.log(this.allmainlist)
      // this.obj.foreach(element =>{

      //   this.allmainlist.push(element);
      
      // });
      
    });
  }

  /** 주차현황 탭) 리스트 클릭시 메뉴가 아래로 확장된다. */
  extendedAccordion(tar : number, num : number) : void {
    console.log(tar);
    console.log(num);
    console.log("panel-"+tar+"-"+ num)
    let panel = document.getElementById("panel-"+tar+"-"+ num);
    console.log(panel);
    if(panel!=null){

      if (panel.style.display === "block") {
        panel.style.display = "none";
      }
      else {
        panel.style.display = "block";
      }
    }
  }

  /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
  screenSwitch(e : any) : void {
    if(e.value==4){
      this.zone.run(() => { 

        this.showplus=false;
      });
     
      setTimeout(()=>{
        for (let i = 1; i <= 4; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{
          this.activeclass=e.value;
          console.log(this.activeclass)
        })
      },500)
    }else{
      for (let i = 1; i <= 4; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
      document.getElementById("ion-label-area-" + e.value).style.display = "";
      this.zone.run(()=>{
  
        this.activeclass=e.value;
        console.log(this.activeclass)
      })
    }
    
  }

  goToReceiptPage()  {
    console.log("goToReceiptPage")
    this.zone.run(() => { 

      this.showplus=true;
    });
    // this.navCtrl.push(ReceiptPage);
  }
  goToReceiptWrite(value){
    console.log(value);
    this.navCtrl.push(ParkingdetailPage,{"type":value});


  }


}
