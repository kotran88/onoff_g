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
import { ChoicedetailPage } from '../choicedetail/choicedetail';
import { ChoicejimyungPage } from '../choicejimyung/choicejimyung';
import { UtilsProvider } from '../../providers/utils/utils';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {
  choicesentence:any="ㄴㄱ초이스";
  start:any;
  booleanValue:any=false;
  items:any=[];
  mainlist_angel:any=[];
  mainlisttest:any=[];
  jimyung:any=[];
  currentstartday:any="";
  currentstart:any="";
  mainlist_finished_status:any = [];
  mainlist_finished:any = [];
  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  company:any="";
  name:any = "";
  lack:any=0;
  constructor(public util:UtilsProvider, public menuCtrl: MenuController ,public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.name = localStorage.getItem("name");
    console.log("1 min  passed");
    for(var c in this.mainlist){
      console.log(this.mainlist[c].agasi)
      for(var d in this.mainlist[c].agasi){
        console.log(this.mainlist[c].agasi[d].name)
          console.log(this.mainlist[c].agasi[d]);
          console.log(this.mainlist[c].agasi[d].findate);
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{

            var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
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
          var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
          console.log(totalmoney);
          console.log(tctotal);
          this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
          this.mainlist_finished[c].agasi[d].tc=tctotal;
          console.log(this.mainlist_finished[c].agasi[d])
        }
      }
    }

  }
  write(){
    
    let modal = this.modal.create(ChoicejimyungPage,{});
    modal.onDidDismiss(url => {
      this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();
  }

  myChange(v){
    console.log(v);
    console.log(this.booleanValue)
    if(this.booleanValue){

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
    this.refreshChoice2();

    document.getElementById("ion-label-area-2").style.display = "none";
    document.getElementById("ion-label-area-3").style.display = "none";
   
  }
  refreshChoice2(){
    console.log("refresh choice2 come...");
    var countingvalue=0;
    this.mainlist=[];
    this.jimyung=[];

    this.mainlist_finished=[];
    this.mainlist_finished_status=[];
    this.mainlist_angel=[];
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log(snap.val());
      console.log("mainlist init");
      this.mainlist=[];
      this.mainlisttest=[];
      console.log(this.mainlist);
      for(var a in snap.val()){
          if(snap.val()[a].roomhistory!=undefined){
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              console.log("this is to abvove untill here")
              // if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi)
                  var inagasi = 0;
                  var totalagasi = 0;
              if(snap.val()[a].roomhistory[this.currentstartday][b].agasi!=undefined){
                console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi.length);

                for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate)
                  totalagasi++;
                  if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                  var orderlist="";
                  if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=snap.val()[a].roomhistory[this.currentstartday][b].orderlist;
                  }
                console.log(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
                if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }
                console.log("inagasi and totalagasi");
                console.log(inagasi);
                console.log(totalagasi);
                console.log(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+","+inagasi)
                
                  if(snap.val()[a].roomhistory[this.currentstartday][b].ss||!snap.val()[a].roomhistory[this.currentstartday][b].flag){
                    console.log("ss is true and flag is not true....");
                    console.log("rr:")
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                    if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
                      this.mainlist_finished_status.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                      "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                    "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                        "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                      "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                      "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                      "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                      "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                    "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                    "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
            
                    }else if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){
                    
                      this.mainlist_angel.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                      "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                    "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                        "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                      "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                      "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                      "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                      "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                    "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                    "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople<=inagasi});
                 

                    }else{
                              this.mainlist_finished.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                              "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                            "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                          "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                        "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                                "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                              "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                              "orderlist":orderlist,
                              "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                              "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                              "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                              "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                            "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                            "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                          "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                    
                        this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                    }
                    }else{
                      console.log("else...flag ")
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
                      var orderlist="";
                      if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=snap.val()[a].roomhistory[this.currentstartday][b].orderlist;
                      }
                      console.log("numofagasi:"+inagasi);
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                    console.log("deciding..."+snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
                    if(snap.val()[a].roomhistory[this.currentstartday][b].flag){
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople);
                      console.log(inagasi);
                      if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople<=inagasi){
                        console.log("this is to mainlist_finished");
                        if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){
                          this.mainlist_angel.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                          "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                        "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                      "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                    "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                            "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                          "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                          "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                          "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                          "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                        "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                        "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                        }else{
                          this.mainlist_finished.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                          "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                        "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                      "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                    "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                            "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                          "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                          "orderlist":orderlist,"totalagasi":totalagasi,
                          "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                          "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                          "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                          "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                        "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                        "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                    "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                        }
                      

                      }else if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){
                        this.mainlist_angel.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                        "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                    "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                          "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                        "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                        "orderlist":orderlist,
                        "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                        "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                        "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                        "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                    "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      }else{
                        console.log(this.mainlist);
                        console.log("this isss to mmainlistmainlist");
                        console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                        console.log(snap.val()[a].roomhistory[this.currentstartday][b].v+",,,"+snap.val()[a].roomhistory[this.currentstartday][b].name)
                        console.log(this.mainlist.length);
                        console.log(this.mainlist);
                        console.log(this.mainlisttest);
                        for(var cabc in this.mainlist){
                          console.log(this.mainlist[cabc])
                        }
                        this.mainlisttest.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v,"name":snap.val()[a].roomhistory[this.currentstartday][b].name, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                        "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                    "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                          "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                          "orderlist":orderlist,
                          "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                          "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                          "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                          "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                        "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                        "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi},
                          );
                        this.mainlist.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                        "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                    "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                          "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                        "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                        "orderlist":orderlist,
                        "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
                        "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                        "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                        "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                    "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                  console.log(this.mainlist);
                  console.log("this.mainlist...?");
                      }
                    
                    }
                  //   if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi){
                  //     console.log("rr:")
                  //     console.log(snap.val()[a].roomhistory[this.currentstartday][b])

                  //     if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
                  //       this.mainlist_finished_status.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                  //       "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                  //     "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  //   "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  // "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                  //         "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                  //       "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                  //       "orderlist":orderlist,
                  //       "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                  //       "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                  //       "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                  //     "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                  //     "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  //   "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,"totalagasi":totalagasi,
                  // "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
              
                  //     }else{

                  //               this.mainlist_finished.push({"v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
                  //               "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                  //             "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                  //           "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
                  //         "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
                  //                 "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                  //               "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                  //               "orderlist":orderlist,"totalagasi":totalagasi,
                  //               "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                  //               "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                  //               "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
                  //             "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                  //             "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                  //           "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                  //         "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                      
                  //     }
                  //   }else{
                  //     console.log("agasi and numofpeople not same");
                  //     console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                    
                      
                  //   }





                    this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
                  }
                  console.log(this.mainlist)
                  var counting=0;
                 
                  this.mainlist.sort((a, b) => a.v - b.v);
                  console.log(this.mainlist)
                  counting=0;
                 

                  this.mainlist.sort((a, b) => a.v - b.v);
                  console.log(this.mainlist)

                  counting=0;
                  for(var aaa in  this.mainlisttest){
                    counting++;
                    console.log(this.mainlisttest[aaa].v);
                  }
                  this.mainlist.sort((a, b) => a.v - b.v);


                   counting=0;
                  for(var aaa in  this.mainlist_finished){
                    counting++;
                    console.log(this.mainlist_finished[aaa].v);
                    this.mainlist_finished[aaa].v = counting;
                  }
                  this.mainlist_finished.sort((a, b) => a.v - b.v);

                   counting=0;
                  for(var aaa in  this.mainlist_finished_status){
                    counting++;
                    console.log(this.mainlist_finished_status[aaa].v);
                    this.mainlist_finished_status[aaa].v = counting;
                  }

                  this.mainlist_finished_status.sort((a, b) => a.v - b.v);




                   counting=0;
                   console.log(this.jimyung);
                   console.log(this.jimyung.length);
                  for(var aaaa in this.jimyung){
                    counting++;
                    console.log("c : "+counting)
                    console.log(this.jimyung[aaaa].v);
                    this.jimyung[aaaa].v = counting;
                  }

                  this.jimyung.sort((a, b) => {
                    console.log(a.v);
                    console.log(b.v);
                    console.log("sorting...?")
                    return a.v - b.v
                  });
                  console.log("this.jimyung");
                  console.log(this.jimyung);
                  console.log(this.mainlisttest)
                  console.log("test was")
                  console.log(this.mainlist)
                  console.log("this.mainlist_finished");
                  console.log(this.mainlist_finished);
                  console.log("this.mainlist_finished_status");
                  console.log(this.mainlist_finished_status);
                  console.log("this.mainlist_angel");
                  console.log(this.mainlist_angel);
                  this.mainlist_finished.sort(function(a,b){
                    console.log(a.status+",,,"+b.status)
                    if (a.status < b.status) {
                      return -1;
                    }
                    if (a.status > b.status) {
                      return 1;
                    }
                    return 0;

                  
                });
                console.log(this.mainlist_finished);
              }
              
            }
          }
       
        
      }
      // for(var c in this.mainlist){
      //   console.log(this.mainlist[c].agasi)
      //   for(var d in this.mainlist[c].agasi){
      //     console.log(this.mainlist[c].agasi[d].name)
      //     if(this.mainlist[c].agasi[d].findate!=undefined){

      //     }else{
      //       var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
      //       var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
      //       console.log(totalmoney);
      //       console.log(tctotal);
      //       this.mainlist[c].agasi[d].totalmoney=totalmoney;
      //       this.mainlist[c].agasi[d].tc=tctotal;
      //       console.log(this.mainlist[c].agasi[d])
      //     }
      //   }
      // }


      // console.log(this.mainlist_finished)
      // for(var c in this.mainlist_finished){
      //   console.log(this.mainlist_finished[c].agasi)
      //   for(var d in this.mainlist_finished[c].agasi){
      //     console.log(this.mainlist_finished[c].agasi[d].name)
      //     if(this.mainlist_finished[c].agasi[d].findate!=undefined){

      //     }else{
      //       var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
      //       var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
      //       console.log(totalmoney);
      //       console.log(tctotal);
      //       this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
      //       this.mainlist_finished[c].agasi[d].tc=tctotal;
      //       console.log(this.mainlist_finished[c].agasi[d])
      //     }
      //   }
      // }


      console.log(this.mainlist)
      console.log(this.mainlist_finished);
      console.log(this.mainlist_finished_status)
      for(var aaa in  this.mainlist){
        counting++;
        console.log(this.mainlist[aaa].v);

        console.log("countingggg...."+counting);
        console.log(this.mainlist[aaa])

        this.mainlist[aaa].v = counting;
        // console.log("after counting...."+counting);
        // console.log(this.mainlist[aaa])
      }
      console.log("all finisehd");
    });

    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).once("value",snap=>{
      console.log(snap.val());
      for(var abc in snap.val()){
        console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
      console.log("jimyung : ");
      console.log(this.jimyung);
      console.log(this.jimyung.length);
      var counting=0;
      for(var aq in this.jimyung){
        counting++;
        console.log(this.jimyung[aq]);
        // this.jimyung[aq].v = counting;
      }

      console.log(this.jimyung);
                   console.log(this.jimyung.length);
                 
                  this.jimyung.sort((a, b) => {
                    console.log(a.v);
                    console.log(b.v);
                    console.log("sorting...?")
                    return a.v - b.v
                  });
                  console.log("this.jimyung");
                  console.log(this.jimyung);

    });
    console.log(this.mainlist)
  }
  deleting(main){
    console.log(main.key);
    
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(main.key).remove();
    var counting=0;
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).once("value",snap=>{
      console.log(snap.val());

      this.jimyung=[];
      for(var abc in snap.val()){
        console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
      console.log("jimyung : ");
      console.log(this.jimyung);
      console.log(this.jimyung.length);
      var counting=0;
      for(var aq in this.jimyung){
        counting++;
        console.log(this.jimyung[aq]);
        this.jimyung[aq].v = counting;
      }

      console.log(this.jimyung);
      for(var qa in this.jimyung){
        this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[qa].key).update({v:this.jimyung[qa].v});
      }
                  
                  console.log("this.jimyung");
                  console.log(this.jimyung);

    });

    
    // this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[aaaa].key).update({v:counting});
   


    
    this.refreshChoice2();
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
    // this.navCtrl.setRoot(InfoPage,{flag:true}).then(() => {
    //   this.navCtrl.getActive().onDidDismiss(data => {

    //   })
    // });
  }
  gotomorepage(a,v){
    console.log("gotomore");
    console.log(a);
    this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("ondiddismiss....");
      this.refreshChoice2();
      })
    });

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
      this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();
  };

  reorderItems2(indexes){
    console.log("reorderItems2 item...");
    console.log(indexes);
    console.log(indexes.from);
    console.log(indexes.to);
    let element = this.jimyung[indexes.from];
    this.jimyung[indexes.from].v=(indexes.to+1);
    this.jimyung[indexes.to].v=(indexes.from+1);
    console.log(element)
    this.jimyung.splice(indexes.from, 1);
    this.jimyung.splice(indexes.to, 0, element);
    console.log(this.jimyung);
    for(var a in this.jimyung){
      console.log(this.jimyung[a]);
      this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[a].key).update({"v":this.jimyung[a].v})
    }
    console.log("reorder item end")
  };
  reorderItems(indexes){
    console.log("reorder item...");
    console.log(indexes);
    console.log(indexes.from);
    console.log(indexes.to);
    let element = this.mainlist[indexes.from];
    this.mainlist[indexes.from].v=(indexes.to+1);
    this.mainlist[indexes.to].v=(indexes.from+1);
    console.log(element)
    this.mainlist.splice(indexes.from, 1);
    this.mainlist.splice(indexes.to, 0, element);
    console.log(this.mainlist);
    for(var a in this.mainlist){
      console.log(this.mainlist[a]);
      this.firemain.child("company").child(this.company).child("roomlist").child(this.mainlist[a].name).child("roomhistory").child(this.currentstartday).child(this.mainlist[a].key).update({"v":this.mainlist[a].v})
    }
    console.log("reorder item end")
    this.refreshChoice2();
  };
  
  async getIdOfagaci (d,name,totalmoney,room,key,number,tctotal,wt,incharge,mainlist,bantee){
    console.log(mainlist);
    this.firemain.child("users").once("value",snap=>{
      var returnvalue="";
      var selectedjopan
      var agasiname=name;
      var ddate="";
          for(var b in snap.val()){

            if(snap.val()[b].name==name){
              returnvalue=b;
              selectedjopan=snap.val()[b].jopan;
              date = snap.val()[b].date;
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

          var jjing=Math.round(tctotal);
          if(Math.round(tctotal)>=1){
            console.log(snap.val()[b]);
            console.log(selectedjopan)
            this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":name, "room":mainlist.name,"jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          if(bantee>=1){
            this.firemain.child("users").child(mainlist.directorId).child("incentive").child(this.currentstartday).child(mainlist.key).child("bantee").update({"values":bantee,"type":"bantee","room":mainlist.name, "agasi":name, "jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
          if(mainlist.numofpeople>=5){

          }else{
            console.log(mainlist.orderlist)
            if(mainlist.orderlist!=undefined){
              var totalnum=0;
              for(var a in mainlist.orderlist.orderlist){
                //iterate through and calculate cumulative num 
                if(mainlist.orderlist.orderlist[a].category="주류"){
                  totalnum+=mainlist.orderlist.orderlist[a].num;
                }
                console.log(mainlist.orderlist.orderlist[a])
              }
              console.log("total bottle : "+totalnum);
              var totaltc=0;
              for(var b in mainlist.agasi){
                console.log(mainlist.agasi[b])
                console.log(mainlist.agasi[b])
                totaltc+=mainlist.agasi[b].tc;
              }
              var yeonti=0;
              var yeonti_reason="";
              if(totaltc>mainlist.numofpeople*totalnum){
                yeonti = mainlist.numofpeople * totalnum -totaltc;
                yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+totaltc;
                console.log(mainlist.numofpeople+"*"+totalnum+"-"+totaltc);
              }else{
                yeonti=totalnum;
                yeonti_reason="totaltc is so great so just count totalnum";
                console.log("totaltc is so great so just count totalnum");
              }
              
              console.log("this room's yeonti is : "+yeonti);
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"yeonti":yeonti,"yeonti_reason":yeonti_reason})
            }
        }

          this.firemain.child("users").child(returnvalue).child("roomhistory").child(room).child(this.currentstartday).child(key).update({"date":d,"end_date":hour+":"+min,"end_date_full":dte})
            
          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).child("agasi").child(number).update({"roomno":room,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":wt,"incharge":incharge})


  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).update({"end_date":hour+":"+min,"end_date_full":dte})
  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday+"").update({"flag":false,"lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
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
    console.log("s2s")
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":false})

    this.refreshChoice2();
    this.view.dismiss();
  }
  endall(c,room,mainlist) {

    console.log(c);
    console.log(room);
    console.log(mainlist);
    console.log("----------endall----------");


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
            totalmoney=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[0]);
            var tctotal=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[1]);
            var bantee=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[2]);
            console.log("totalmoney : "+totalmoney)
             this.getIdOfagaci(snap2.val().agasi[f].date,c.agasi[d].name,totalmoney,room,c.key,f,tctotal,mainlist.wt,mainlist.incharge,mainlist,bantee)+"";
            

          }
         
        }
       
      }
      this.refreshChoice2();
    });
    

  var fulldate = year+"-"+month+"-"+day;
  var dte = new Date();
  dte.setHours(dte.getHours()+9);
  }
  refreshChoice(){
  // console.log("----------------refreshChoice----------------");
  // this.mainlist=[];
  // this.mainlist_finished=[];
  // this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
  //   for(var a in snap.val()){
  //     console.log("mmmm")
  //     console.log(snap.val()[a].roomhistory)
  //     if(snap.val()[a].roomhistory!=undefined){
  //       for(var b in snap.val()[a].roomhistory[this.currentstartday]){
  //         console.log(b);

  //           if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
  //             console.log(snap.val()[a].roomhistory[this.currentstartday][b])
  //             console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi)
  //             var inagasi = 0;
  //             if(snap.val()[a].roomhistory[this.currentstartday][b].agasi!=undefined){
  //               console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi.length);

  //               for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
  //                 console.log(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate)
  //                 if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
  //                   //종료됨. 
  //                 }else{
  //                   inagasi++;
  //                   //종료 안됨. 들어가있는 상황 . 
  //                 }
  //               }
  //             }else{
  //               //agasi가 없는 경우.
  //             }
  //             console.log("ssss:");
  //             console.log(snap.val()[a].roomhistory[this.currentstartday][b].ss);
  //             if(snap.val()[a].roomhistory[this.currentstartday][b].ss){

  //               console.log("false so goto second tab");
  //               console.log(snap.val()[a].roomhistory[this.currentstartday][b])
  //               console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                
  //               if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
  //                 this.mainlist_finished_status.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
  //                 "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
  //               "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
  //             "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
  //           "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
  //                   "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
  //                   "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
  //                   "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
  //               "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
  //               "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
  //             "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
  //           "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
        
  //               }else{

  //                         this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
  //                         "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
  //                       "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
  //                     "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
  //                   "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
  //                           "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
  //                         "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
  //                         "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
  //                         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
  //                       "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
  //                     "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
  //                   "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                
  //                   this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
  //               }

  //               }else{
  //                 var orderlist="";
  //                 if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
  //                   orderlist="no"
  //                 }else{
  //                   orderlist=snap.val()[a].roomhistory[this.currentstartday][b].orderlist;
  //                 }
  //                 console.log("false so goto first tab");
  //                 console.log(snap.val()[a].roomhistory[this.currentstartday][b])
  //               console.log(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople+",,,"+inagasi);
  //               this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
  //               "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
  //             "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
  //           "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
  //         "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
  //                 "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
  //                 "orderlist":orderlist,
  //                 "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
  //               "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
  //             "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
  //             "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
  //           "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
  //         "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
       
  //               if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople==inagasi){
  //                 console.log("rr:")
  //                 console.log(snap.val()[a].roomhistory[this.currentstartday][b])
  //                  if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
  //                     this.mainlist_finished_status.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
  //                     "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
  //                   "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
  //                 "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
  //               "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
  //               "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
  //               "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
  //                     "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
  //                   "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
  //                   "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
  //                 "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
  //               "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
            
  //                   }else{

  //                   }
  //               }else{
  //                 console.log("agasi and numofpeople not same");
  //                 console.log(snap.val()[a].roomhistory[this.currentstartday][b])
                 
  //               }
  //               this.lack = snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi;
  //             }
              
  //           }
  //       }
  //     }
      
  //   }
  //   console.log(this.mainlist)
  //     for(var c in this.mainlist){
  //       console.log(this.mainlist[c].agasi)
  //       for(var d in this.mainlist[c].agasi){
  //         console.log(this.mainlist[c].agasi[d].name)
  //         if(this.mainlist[c].agasi[d].findate!=undefined){

  //         }else{
  //           var totalmoney=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
  //           var tctotal=Number(this.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
  //           console.log(totalmoney);
  //           console.log(tctotal);
  //           this.mainlist[c].agasi[d].totalmoney=totalmoney;
  //           this.mainlist[c].agasi[d].tc=tctotal;
  //           console.log(this.mainlist[c].agasi[d])
  //         }
  //       }
  //     }


  //     console.log(this.mainlist_finished)
  //     for(var c in this.mainlist_finished){
  //       console.log(this.mainlist_finished[c].agasi)
  //       for(var d in this.mainlist_finished[c].agasi){
  //         console.log(this.mainlist_finished[c].agasi[d].name)
  //         if(this.mainlist_finished[c].agasi[d].findate!=undefined){

  //         }else{
  //           var totalmoney=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
  //           var tctotal=Number(this.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
  //           console.log(totalmoney);
  //           console.log(tctotal);
  //           this.mainlist_finished[c].agasi[d].totalmoney=totalmoney;
  //           this.mainlist_finished[c].agasi[d].tc=tctotal;
  //           console.log(this.mainlist_finished[c].agasi[d])
  //         }
  //       }
  //     }
    
  // });

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
    console.log("-------------------------end-------------------------");
    console.log(c);
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
    var alreadyexist=false;
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        if(snap.val()[b].type=="agasi"){
            console.log(c.name+",,,,,"+snap.val()[b].name);
            if(c.name == snap.val()[b].name){
              alreadyexist=true;
              console.log("matched one : ");
              console.log(c);
              console.log(snap.val()[b]);
              selectedid=snap.val()[b].id;
              var selectedjopan=snap.val()[b].jopan;
              console.log(selectedid);
              console.log("mmmm")
              // this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{
                for(var d in snap2.val().agasi){
                  console.log("ddd is : "+d);
                  if(snap2.val().agasi[d].name==c.name){

                    console.log(snap.val()[b])
                  console.log(snap2.val().agasi[d])
                  console.log(c);
                    var totalmoney=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[0]);
                    var tctotal=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[1]);
                    var bantee=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[2]);
                    
                    console.log(totalmoney);
                    console.log(tctotal);
                    console.log(selectedid)
                    console.log(room);
                    console.log(snap2.val().agasi[d])
                    var jjing=Math.round(tctotal);
                    if(Math.round(tctotal)>=1){
                      console.log(snap.val()[b]);
                      console.log(selectedjopan)
                      console.log(c);
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":snap2.val().agasi[d].name,"room":mainlist.name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    if(bantee>=1){
                      this.firemain.child("users").child(mainlist.directorId).child("incentive").child(this.currentstartday).child(mainlist.key).child("bantee").update({"values":bantee,"key":mainlist.key,"room":mainlist.name, "type":"bantee", "agasi":snap2.val().agasi[d].name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    this.firemain.child("users").child(selectedid).child("current").remove();

                    //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
                    if(mainlist.numofpeople>=5){

                    }else{
                      console.log(mainlist.orderlist)
                      if(mainlist.orderlist!=undefined){
                        var totalnum=0;
                        for(var a in mainlist.orderlist.orderlist){
                          //iterate through and calculate cumulative num 
                          if(mainlist.orderlist.orderlist[a].category="주류"){
                            totalnum+=mainlist.orderlist.orderlist[a].num;
                          }
                          console.log(mainlist.orderlist.orderlist[a])
                        }
                        console.log("total bottle : "+totalnum);
                        var totaltc=0;
                        for(var b in mainlist.agasi){
                          console.log(mainlist.agasi[b])
                          console.log(mainlist.agasi[b])
                          totaltc+=mainlist.agasi[b].tc;
                        }
                        var yeonti=0;
                        var yeonti_reason="";
                        if(totaltc>mainlist.numofpeople*totalnum){
                          yeonti = mainlist.numofpeople * totalnum -totaltc;
                          yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+totaltc;
                          console.log(mainlist.numofpeople+"*"+totalnum+"-"+totaltc);
                        }else{
                          yeonti=totalnum;
                          yeonti_reason="totaltc is so great so just count totalnum";
                          console.log("totaltc is so great so just count totalnum");
                        }
                        
                        console.log("this room's yeonti is : "+yeonti);
                        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"yeonti":yeonti,"yeonti_reason":yeonti_reason})
                      }
                  }
                    this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":snap2.val().agasi[d].name,  "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt,"lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                  }
                }
                console.log(snap.val().agasi)
              });
              console.log("loop finisehd");
  
            }
          }
          if(!alreadyexist){
            console.log("새로 등록된 아이임.")
          }
      }

      if(f==2){
        console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
      }
    this.refreshChoice2();
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
        console.log("screenSwitch");
        console.log(e._value);
        // if(e.value==3){
         
        //   setTimeout(()=>{
        //     for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        //     document.getElementById("ion-label-area-" + e.value).style.display = "";
        //     this.zone.run(()=>{
        //       this.activeclass=e.value;
        //       console.log(this.activeclass)
        //     })
        //   },500)
        // }else{
        //   for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        //   document.getElementById("ion-label-area-" + e.value).style.display = "";
        //   this.zone.run(()=>{
      
        //     this.activeclass=e.value;
        //     console.log(this.activeclass)
        //   })
        // }
        if(e.value==4){
   
          setTimeout(()=>{
            for (let i = 1; i <= 3; i++) { 
              document.getElementById("ion-label-area-" + i).style.display = "none"; }
              document.getElementById("ion-label-area-" + e.value).style.display = "";
              this.zone.run(()=>{
                this.activeclass=e.value;
                console.log(this.activeclass)
              })
          },500)
        }else{
          for (let i = 1; i <= 3; i++) { 
            console.log("i to none"+i);
            console.log("ion-label-area-" + i)
            console.log(document.getElementById("ion-label-area-"+i))
            document.getElementById("ion-label-area-"+i).style.display = "none"; 
          }
          console.log("e.value")
          console.log(e._value);
          console.log(document.getElementById("ion-label-area-" + e._value))
          document.getElementById("ion-label-area-" + e._value).style.display = "";
          this.zone.run(()=>{
      
            this.activeclass=e._value;
            console.log(this.activeclass)
          })
        }
        
      }
}
