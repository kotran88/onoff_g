import { Component,NgZone } from '@angular/core';
import { IonicPage,ViewController,ModalController, NavController, NavParams } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { GongjiPage } from '../gongji/gongji';
/**
 * Generated class for the ChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
import { AgasichoicePage } from '../agasichoice/agasichoice';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {
  choicesentence:any="ㄴㄱ초이스";
  start:any;
  currentstartday:any="";
  currentstart:any="";
  mainlist_finished:any = [];
  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  company:any="";
  name:any = "";
  lack:any=0;
  constructor(public menuCtrl: MenuController ,public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

    this.name = localStorage.getItem("name");

    setInterval(()=>{
      console.log("1 min  passed");
    for(var c in this.mainlist){
      console.log(this.mainlist[c].agasi)
      for(var d in this.mainlist[c].agasi){
        console.log(this.mainlist[c].agasi[d].name)
          console.log(this.mainlist[c].agasi[d]);
          console.log(this.mainlist[c].agasi[d].findate);
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{

            var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist[c].agasi[d].totalmoney=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            console.log(this.mainlist[c].agasi[d])
          }
         
      }
    }

    console.log(this.mainlist_finished)
    for(var c in this.mainlist_finished){
      console.log(this.mainlist_finished[c].agasi)
      for(var d in this.mainlist_finished[c].agasi){
        console.log(this.mainlist_finished[c].agasi[d].name)
        if(this.mainlist_finished[c].agasi[d].findate!=undefined){

        }else{
          var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
          console.log(totalmoney);
          console.log(tctotal);
          this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
          this.mainlist_finished[c].agasi[d].tc=tctotal;
          console.log(this.mainlist_finished[c].agasi[d])
        }
      }
    }

    },1000*60)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');

    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("ababab")

        var flag = true;
        for(var b in snap.val()[a].roomhistory){
          console.log(b)
          console.log(this.currentstartday);
          if(b==this.currentstartday){

            console.log(snap.val()[a].roomhistory[b])
            console.log(snap.val()[a].roomhistory[b].flag)
            // flag=snap.val()[a].roomhistory[b].flag
          }
        }
        if(flag==true){

          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
              // if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi)
                  var inagasi = 0;
                  if(snap.val()[a].roomhistory[this.currentstartday][b].agasi==undefined){

                  }else{
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi.length)
                  
                    for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate)
                      if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
                        //종료됨. 
                      }else{
                        inagasi++;
                        //종료 안됨. 들어가있는 상황 . 
                      }
                    }
                  }
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  if(snap.val()[a].roomhistory[this.currentstartday][b].ss){
                    console.log("rr:")
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                    
                    this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                    }else{
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
                    if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi){
                      console.log("rr:")
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                      this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      // window.alert("2:"+snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
                   
                      this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                    }else{
                      console.log("agasi and numofpeople not same");
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                      this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                   
                    }
                    // window.alert("3:"+snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
                    this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                  }
                  // if(snap.val()[a].roomhistory[this.currentstartday][b].ss!=undefined&&snap.val()[a].roomhistory[this.currentstartday][b].ss){
                  //   this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  // }else{

                  // // window.alert(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+","+inagasi+",,"+snap.val()[a].roomhistory[this.currentstartday][b].ss)
                  // if(snap.val()[a].roomhistory[this.currentstartday][b].ss==undefined){
                  //   console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  //   this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                  //         "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                  //       "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  //     "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  //   "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                  //           "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                  //         "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                  //       "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                  //       "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  //     "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  //   "numofagasi":inagasi});
                  // }else if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi||!snap.val()[a].roomhistory[this.currentstartday][b].ss){
                  //     this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  //   }else{
                  //     console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  //     this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                  //           "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                  //         "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  //       "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  //     "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                  //             "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                  //           "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                  //         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                  //         "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  //       "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  //     "numofagasi":inagasi});
                  //   }
                  // }
                  
                }
                
              // }else{
                // if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                //   this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                // this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                // }
                
              // }
              
            }
          }
        }
       
        
      }
      console.log(this.mainlist)
      for(var c in this.mainlist){
        console.log(this.mainlist[c].agasi)
        for(var d in this.mainlist[c].agasi){
          console.log(this.mainlist[c].agasi[d].name)
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist[c].agasi[d].totalmoney=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            console.log(this.mainlist[c].agasi[d])
          }
        }
      }


      console.log(this.mainlist_finished)
      for(var c in this.mainlist_finished){
        console.log(this.mainlist_finished[c].agasi)
        for(var d in this.mainlist_finished[c].agasi){
          console.log(this.mainlist_finished[c].agasi[d].name)
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
            this.mainlist_finished[c].agasi[d].tc=tctotal;
            console.log(this.mainlist_finished[c].agasi[d])
          }
        }
      }
    });
   
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
  }
  gotodetail(a){
    console.log("gotodetail...")
    console.log(a);
    if(a.agasi==undefined){
      a.agasi=[];
    }
    console.log(a)
    let modal = this.modal.create(ChoicemodalPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
      this.mainlist=[];
      this.mainlist_finished=[];
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        console.log(snap.val())
        for(var a in snap.val()){
          console.log("mmmm")
          if(snap.val()[a].roomhistory!=undefined){
            console.log(a);
            console.log(snap.val()[a].roomhistory);
            console.log(snap.val()[a].roomhistory[this.currentstartday]);
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              if(b=="flag"||b=="lastupdated"){

              }else{
    
    
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi)
                  var inagasi = 0;
                  if(snap.val()[a].roomhistory[this.currentstartday][b].agasi==undefined){

                  }else{
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi.length)
                   
                    for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate)
                      if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
                        //종료됨. 
                      }else{
                        inagasi++;
                        //종료 안됨. 들어가있는 상황 . 
                      }
                    }
                  }
                 
                  if(snap.val()[a].roomhistory[this.currentstartday][b].ss){
                    this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                  }else{
                    if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi){
                      this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                    }else{
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                      this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                    }
                  }
                  
                }
              }
            }
          }
          
        }
        console.log(this.mainlist)
        console.log(this.mainlist_finished)
        
        console.log(this.mainlist)
      for(var c in this.mainlist){
        console.log(this.mainlist[c].agasi)
        for(var d in this.mainlist[c].agasi){
          console.log(this.mainlist[c].agasi[d].name)
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist[c].agasi[d].totalmoney=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            console.log(this.mainlist[c].agasi[d])
          }
        }
      }


      console.log(this.mainlist_finished)
      for(var c in this.mainlist_finished){
        console.log(this.mainlist_finished[c].agasi)
        for(var d in this.mainlist_finished[c].agasi){
          console.log(this.mainlist_finished[c].agasi[d].name)
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
            this.mainlist_finished[c].agasi[d].tc=tctotal;
            console.log(this.mainlist_finished[c].agasi[d])
          }
        }
      }

      });
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();
  };
  getTC(startdate,pauseTime){
    if(pauseTime==undefined){
      pauseTime=0;
    }
    console.log(pauseTime);
    console.log("GETTC");
    console.log(startdate);
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();


    var now = new Date();

    var diffend = new Date(startdate.date);
    diffend.setHours(diffend.getHours());
    var start = diffend.getHours()+":"+diffend.getMinutes();
   
    var diff = now.getTime() - diffend.getTime();
    var diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
    console.log(diffMin)
    console.log("is diffmin");
    diffMin=diffMin-pauseTime;
    console.log("new diffmin"+diffMin);
    var tctotal=0;
    if(diffMin<=10){
      tctotal =0;
    }else if(diffMin>=11&&diffMin<=20){
      tctotal = 0.3;
    }else if(diffMin>=21&&diffMin<=40){
      tctotal = 0.6;
    }else if(diffMin>=41&&diffMin<=60){
      tctotal = 1;
    }else if(diffMin>=61&&diffMin<=80){
      tctotal = 1.3;
    }else if(diffMin>=81&&diffMin<=100){
      tctotal = 1.6;
    }else if(diffMin>=101&&diffMin<=120){
      tctotal = 2;
    }else if(diffMin>=121&&diffMin<=140){
      tctotal = 2.3;
    }else if(diffMin>=141&&diffMin<=160){
      tctotal = 2.6;
    }else if(diffMin>=161&&diffMin<=180){
      tctotal = 3;
    }else if(diffMin>=181&&diffMin<=200){
      tctotal = 3.3;
    }else if(diffMin>=201&&diffMin<=220){
      tctotal = 3.6;
    }else if(diffMin>=221&&diffMin<=240){
      tctotal = 4;
    }else if(diffMin>=241&&diffMin<=260){
      tctotal = 4.3;
    }else if(diffMin>=261&&diffMin<=280){
      tctotal = 4.6;
    }else if(diffMin>=281&&diffMin<=300){
      tctotal = 5;
    }else if(diffMin>=301&&diffMin<=320){
      tctotal = 5.3;
    }else if(diffMin>=321&&diffMin<=340){
      tctotal = 5.6;
    }else if(diffMin>=341&&diffMin<=360){
      tctotal = 6;
    }else if(diffMin>=361&&diffMin<=380){
      tctotal = 6.3;
    }else if(diffMin>=381&&diffMin<=400){
      tctotal = 6.6;
    }else if(diffMin>=401&&diffMin<=420){
      tctotal = 7;
    }else if(diffMin>=421&&diffMin<=440){
      tctotal = 7.3;
    }else if(diffMin>=441&&diffMin<=460){
      tctotal = 7.6;
    }else if(diffMin>=461&&diffMin<=480){
      tctotal = 8;
    }else if(diffMin>=481&&diffMin<=500){
      tctotal = 8.3;
    }else if(diffMin>=501&&diffMin<=520){
      tctotal = 8.6;
    }else if(diffMin>=521&&diffMin<=540){
      tctotal = 9;
    }else if(diffMin>=541&&diffMin<=560){
      tctotal = 9.3;
    }else if(diffMin>=561&&diffMin<=580){
      tctotal = 9.6;
    }else if(diffMin>=581&&diffMin<=600){
      tctotal = 10;
    }
    var newtctotal = Number(diffMin)/60;
    newtctotal = Number(tctotal.toFixed(2));
    var mok = Math.floor(newtctotal);
    var nameoji = newtctotal -Math.floor(newtctotal);
    console.log(nameoji)
    // 10분 -> 0.17 
    // 15분 -> 0.25
    // 20분 -> 0.33 - 3만원
    //30분 - > 0.5
    // 40분 -> 0.67 - 6만원
    // 1시간 -> 1 - 13만원 
    
    // 1시간 30분 -> 1.5
    // 2시간 -> 2 - 26만원
    // 2시간 20분 -> 26만원 + 3만원 = 29만원


     //구 모델
                            // 10분 -> 0.17 
                            // 15분 -> 0.25
                            // 20분 -> 0.33 - 3만원
                            //30분 - > 0.5
                            // 40분 -> 0.67 - 6만원
                            // 1시간 -> 1 - 13만원 

                            //신모델 
                            //40분~65분까지 - 완티 -tc 갯수 1개
                            // 70분이라고하며. 1.1이 됨. 
                            //20분 전에끝나면 차비삼만원 0.3

                            //1분~10분까지는 0
                            //11분~20분까지는 0.3개 차비3만원
                            //21분~40분까지 0.6개 
                            //41분~60분까지 완티 1개

                            //연장시 . 
                            //6~10분까지가 차비 1만원 
                            
                            //80분이라고하면 1.3
                            //90분이면 1.6
                            //100분까지는 1.6개
                            //101분이면 2개
                            
    var moneyvalue = mok*13;
    var restofmoney=0;
    //if 2.5 
    if(nameoji<=0.17){
      //nothing
    }else if(nameoji>0.17 &&nameoji<=0.33){
      //3마ㄴ원
      restofmoney = 3;
    }else if(nameoji>0.33 &&nameoji<=0.67){
      //6만원
      restofmoney = 6;
    }else{
      //13만원 

      restofmoney = 13;
    }

    var totalmoney = Number(moneyvalue)+Number(restofmoney);
    console.log(totalmoney);
    console.log(startdate.name)
    return totalmoney+","+tctotal




  }
  async getIdOfagaci (d,name,totalmoney,room,key,number,tctotal,wt,incharge){
    this.firemain.child("users").once("value",snap=>{
      var returnvalue="";
          for(var b in snap.val()){

            if(snap.val()[b].name==name){
              returnvalue=b;
              
            }
          }
          console.log(name+"' id : "+returnvalue + totalmoney+",,,,"+number);

          var date = new Date();
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day = date.getDate();
          var hour = date.getHours();
          var min = date.getMinutes();
          var dte = new Date();
          dte.setHours(dte.getHours()+9);
          this.firemain.child("users").child(returnvalue).child("current").remove();
          this.firemain.child("users").child(returnvalue).child("roomhistory").child(room).child(this.currentstartday).child(key).update({"date":d,"end_date":hour+":"+min,"end_date_full":dte})
            
          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).child("agasi").child(number).update({"roomno":room,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":wt,"incharge":incharge})


  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).update({"end_date":hour+":"+min,"end_date_full":dte})
  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday+"").update({"flag":false,"lastupdated":dte});
    });
  }
  ss(c,room,mainlist) {
    console.log("ss")
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})

    this.refreshChoice();
  }

  //초이스 탭으로 이동시키기.
  ss2(c,room,mainlist) {
    console.log("ss")
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":false})

    this.refreshChoice();
  }
  endall(c,room,mainlist) {

    console.log(c);
    console.log(room);



    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    dte.setHours(dte.getHours()+9);

    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{

      console.log("snap2 come...")
      console.log(snap2.val())
      for(var f in snap2.val().agasi){


        console.log("f is : "+f);

        for(var d in c.agasi){
          console.log(snap2.val().agasi[f].name)
          console.log(c.agasi[d].name)
          if(snap2.val().agasi[f].name==c.agasi[d].name){
            var totalmoney=0;
            console.log("this is the person!"+c.agasi[d].name)
            var id="";
            totalmoney=Number(this.getTC(snap2.val().agasi[f],0).split(",")[0]);
            var tctotal=Number(this.getTC(snap2.val().agasi[f],0).split(",")[1]);
            console.log("totalmoney : "+totalmoney)
             this.getIdOfagaci(snap2.val().agasi[f].date,c.agasi[d].name,totalmoney,room,c.key,f,tctotal,mainlist.wt,mainlist.incharge)+"";
            

          }
         
        }
       
      }
      this.refreshChoice();
    });
    

  var fulldate = year+"-"+month+"-"+day;
  var dte = new Date();
  dte.setHours(dte.getHours()+9);
  }
  refreshChoice(){

  this.mainlist=[];
  this.mainlist_finished=[];
  this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
    for(var a in snap.val()){
      console.log("mmmm")
      console.log(snap.val()[a].roomhistory)
      if(snap.val()[a].roomhistory!=undefined){
        for(var b in snap.val()[a].roomhistory[this.currentstartday]){
          console.log(b);
          if(b=="flag"||b=="lastupdated"){

          }else{


            if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b])
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi)
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi.length)
              var inagasi = 0;
              for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
                console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate)
                if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
                  //종료됨. 
                }else{
                  inagasi++;
                  //종료 안됨. 들어가있는 상황 . 
                }
              }
              if(snap.val()[a].roomhistory[this.currentstartday][b].ss){
                console.log("rrr:1");
                console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                            "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                          "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                              "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                            "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                        "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});

                    this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
              }else{
                if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi){
                  console.log("rrr:2");
                console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
                  this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                  "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
              "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
            "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                    "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                  "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
              "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
            "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                }else{
                  console.log("rrr:3");
                console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                        "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                    "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                          "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                        "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                    "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                }

                this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
              }
              
            }
          }
          
          // if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
              // if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
              //   this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              // }
             
          // }else{
          //   if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
          //   this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          //   this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          //   }
          // }
          
        }
      }
      
    }
    console.log(this.mainlist)
      for(var c in this.mainlist){
        console.log(this.mainlist[c].agasi)
        for(var d in this.mainlist[c].agasi){
          console.log(this.mainlist[c].agasi[d].name)
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist[c].agasi[d].totalmoney=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            console.log(this.mainlist[c].agasi[d])
          }
        }
      }


      console.log(this.mainlist_finished)
      for(var c in this.mainlist_finished){
        console.log(this.mainlist_finished[c].agasi)
        for(var d in this.mainlist_finished[c].agasi){
          console.log(this.mainlist_finished[c].agasi[d].name)
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
            console.log(totalmoney);
            console.log(tctotal);
            this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
            this.mainlist_finished[c].agasi[d].tc=tctotal;
            console.log(this.mainlist_finished[c].agasi[d])
          }
        }
      }
    
  });

  // if(snap.val()[a].roomhistory!=undefined){
  //   console.log(snap.val()[a].roomhistory[this.currentstartday])
  //   for(var b in snap.val()[a].roomhistory[this.currentstartday]){
  //     console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
  //     console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
  //     if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
  //       if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
  //         this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
  //       }
        
  //     }else{
  //       if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
  //         this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
  //       this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
  //       }
        
  //     }
      
  //   }
  // }
  }
  reinit(c,room,mainlist, f){
    console.log("reinit come");
    console.log(c);
    var pausetime=c.pausetime;
    console.log(mainlist)
    console.log(f);
    console.log(room);
    for(var a in mainlist.agasi){
      console.log(mainlist.agasi[a].name+", "+c.name)
      if(mainlist.agasi[a].name==c.name){

        console.log("find");
        var num = a;
        console.log(c.findate);
        var date = new Date();
        var findate = new Date(c.findate);
        console.log(date);
        console.log(findate);
        //get minutes betweetn c.findate and date
        var diff = date.getTime() - findate.getTime();
        console.log(diff);
        var minutes = Math.floor(diff / 1000 / 60);
        console.log(pausetime);
        if(pausetime==undefined){
          pausetime=0;
        }
        console.log(minutes);
        pausetime+=Number(minutes);
        console.log(pausetime);
        console.log(this.company+","+room+",,"+this.currentstartday+","+mainlist.key+","+num+",,,"+pausetime);
        var postData = {
          date: c.date,
          money: c.money,
          name: c.name,
          roomno: c.roomno,
          tc: c.tc,
          pausetime:pausetime,
          wt:c.wt
        };

    this.firemain.child("users").once("value",snapp=>{
      for(var b in snapp.val()){
        if(snapp.val()[b].name==c.name){
          console.log("find user");
          var user = snapp.val()[b].id;
          console.log("user:"+user);
          console.log("room:"+room+",,,"+this.currentstartday+","+mainlist.key+","+num);
          this.firemain.child("users").child(user).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update(postData);
        }
      }
    });
        console.log(postData)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").remove();
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").update(postData)
        if(f==2){

          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
        }
      }
    }
    this.refreshChoice();
  }
  end(c,room,mainlist, f){
    console.log(c);
    console.log(c.name);
    console.log(c.date);
    console.log(mainlist)
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var selectedid ="";
    dte.setHours(dte.getHours()+9);
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        console.log(b);
        if(snap.val()[b].type=="agasi"){
          console.log(c.name+"////"+snap.val()[b].name);
            if(c.name == snap.val()[b].name){
              console.log("id:"+snap.val()[b].id)
              selectedid=snap.val()[b].id;
              console.log("mmmm")
              // this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{
                for(var d in snap2.val().agasi){
                  console.log("d is : "+d);
                  console.log(snap2.val().agasi[d].name)
                  if(snap2.val().agasi[d].name==c.name){
                    console.log(snap2.val().agasi[d]);
                    var totalmoney=Number(this.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[0]);
                    var tctotal=Number(this.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[1]);
                    console.log(totalmoney);
                    console.log(tctotal);
                    console.log(selectedid)
                    console.log(room);
                    console.log(snap2.val().agasi[d])
              this.firemain.child("users").child(selectedid).child("current").remove();
              this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"name":snap2.val().agasi[d].name,  "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                  }
                }
                console.log(snap.val().agasi)
              });
  
            }
          }
      }

      if(f==2){
        console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
      }
    this.refreshChoice();
  });
  }

  gotolink(value){
    console.log("gotolink "+value);
    if(value == 1){
    this.navCtrl.push(ParkingPage);
    }else if(value==2){
      this.navCtrl.push(InfoPage);
    }else if(value==3){
      this.navCtrl.push(AttendancePage);
    }else if(value==4){
      this.navCtrl.push(ChoicePage);
    }else if(value==5){
      this.navCtrl.push(GongjiPage);
    }else if(value==6){
      this.navCtrl.push(InfoPage);
    }else if(value==7){
      this.navCtrl.push(InfoPage);
    }
  }
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(AgasichoicePage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
     
    });

    modal.present();
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.view.dismiss();
  }
      /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
      screenSwitch(e : any) : void {
        if(e.value==3){
         
          setTimeout(()=>{
            for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
            document.getElementById("ion-label-area-" + e.value).style.display = "";
            this.zone.run(()=>{
              this.activeclass=e.value;
              console.log(this.activeclass)
            })
          },500)
        }else{
          for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
      
            this.activeclass=e.value;
            console.log(this.activeclass)
          })
        }
        
      }
}
