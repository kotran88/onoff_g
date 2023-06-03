
import { IonicPage,ViewController,Content,ModalController, NavController, NavParams } from 'ionic-angular';
import { Component ,NgZone,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

 import * as $ from "jquery";
 import  firebase from 'firebase';
import { AgasichoicePage } from '../agasichoice/agasichoice';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
import { ChoicedetailPage } from '../choicedetail/choicedetail';
import { ChoicejimyungPage } from '../choicejimyung/choicejimyung';
import { UtilsProvider } from '../../providers/utils/utils';
import { Conditional } from '@angular/compiler';
import { SearchchoicePage } from '../searchchoice/searchchoice';
import { E, T } from '@angular/core/src/render3';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  @ViewChild(Content) content: Content;
  @ViewChild('contentElement', { read: ElementRef }) contentElementRef: ElementRef;
  @ViewChild('targetElement', { read: ElementRef }) targetElementRef: ElementRef;
  startX: number = 0;
  startY: number = 0;
  swipeDirection: 'none' | 'right' | 'left' = 'none';

  isDragging: boolean = false;
  totalMovement: number = 0;
  threshold: number = 100; // Adjust this value to set your desired threshold


  ffflag:any=false;
  jimyungnumber:any=0;
  mainlist_mine=[];
  mainlist2_mine=[];
  original_mainlist=[];
  type:any="";
  angelnumber:any=0;
  inputtext:any="";
  selected:any="1";
  searchon:any = false;
  choicesentence:any="ㄴㄱ초이스";
  start:any;
  nickname:any="";
  tab1clicked:any=false;
  tab2clicked:any=false;
  mainlist_attend:any=[];
  abc:any="22";
  paymentflag:any=false;
  booleanValue:any=false;
  items:any=[];
  mainlist_angel:any=[];
  mainlisttest:any=[];
  agasijungsan:any=[];
  standby:any=0;
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

  ionViewWillLeave(){
    //console.log("choice ionViewWillLeave")
  }
  abcd(aa){
    //main.lastupdated.split(" ")[1]
    //console.log();
    const timeString = aa;
    var hours = timeString.split(':')[0];
    var minutes = timeString.split(':')[1];
    const meridiem = Number(hours) < 12 ? '오전' : '오후';
    const hours12 = ((Number(hours) + 11) % 12 + 1);
    const formattedTime = `${meridiem} ${hours12}시${minutes}분`;
    return formattedTime;
  }
  constructor(public util:UtilsProvider, public menuCtrl: MenuController ,public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");

    var login=localStorage.getItem("login_data");
    //console.log(login);
    this.paymentflag=JSON.parse(login).payment;
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.name = localStorage.getItem("name");
    this.nickname = localStorage.getItem("nickname");
    this.booleanValue= localStorage.getItem("auto");

    this.type = localStorage.getItem("type");

// this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
//   //console.log("attendance check...");
//   for(var a in snap.val()){
//     if(a==this.currentstartday){
//       //console.log("mmmm")
//       for(var b in snap.val()[a]){
//         if(snap.val()[a][b].attend!=undefined){
//           //console.log(snap.val()[a][b].attend)
//           this.mainlist_attend.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
       
//         }
//       }
//     }
//   }
// });
   

  }
  write(){
    
    let modal = this.modal.create(ChoicejimyungPage,{});
    modal.onDidDismiss(url => {
      this.refreshChoiceonlyjimyung();
    });

    modal.present();
  }

  myChange(v){
    //console.log(v);
    //console.log(this.booleanValue)
    if(this.booleanValue){
      this.firemain.child("company").child(this.company).update({"autoflag":true})
      localStorage.setItem("auto","true");
      this.reordering();
    }else{

      this.firemain.child("company").child(this.company).update({"autoflag":false})
      localStorage.setItem("auto","false");
    }
  }
  searching(){
    console.log("searching come");
    
    console.log(this.original_mainlist);
    var input = this.inputtext;
    console.log(input);
    if(this.selected=="1"){
      var filteredList = this.original_mainlist.filter(function(item) {
        return item.name.includes(input);
      });
      //console.log(filteredList);
      this.mainlist=filteredList;
    }else if(this.selected=="2"){
      
      var filteredList2 = this.original_mainlist.filter(function(item) {
        //console.log(item.incharge.includes(inputtext));
        return item.incharge.includes(input);
      });

      //console.log(filteredList);
      this.mainlist=filteredList2;
    }else if(this.selected=="3"){
      
      var filteredList3 = this.mainlist.filter(function(item) {
        var flag=false;
        for(var aa in item.agasi){
          //console.log(item.agasi[aa]);
          //console.log(item.agasi[aa].name.includes(inputtext));
          if(item.agasi[aa].name.includes(input)){
            flag= true;
          }else{
          }
        }
        //console.log("return flag " +flag);
        return flag;
        
      });

      //console.log(filteredList);
      this.mainlist=filteredList;
    }else if(this.selected=="4"){

      this.mainlist=[];
      this.mainlist=this.original_mainlist;
    }


  }
  ionViewWillEnter(){

    // this.util.presentLoading();

    //  });
    console.log("ionwillenter")
    

  }
  searchstart(){
    //console.log(this.mainlist);
    // let modal = this.modal.create(SearchchoicePage);
    // modal.onDidDismiss(url => {
    //   //console.log(url);

    //   if(url!=undefined&&url.result=="cancel"){
    //     var inputtext=url.inputtext;
    //     var selected=url.selected;
    //     //console.log(inputtext);
    //     //console.log(selected);
        

    //     if(selected=="1"){
    //       var filteredList = this.mainlist_finished.filter(function(item) {
    //         return item.name.includes(inputtext);
    //       });
    //       //console.log(filteredList);
    //       this.mainlist_finished=filteredList;
    //     }else if(selected=="2"){
          
    //       var filteredList = this.mainlist_finished.filter(function(item) {
    //         //console.log(item.incharge.includes(inputtext));
    //         return item.incharge.includes(inputtext);
    //       });

    //       //console.log(filteredList);
    //       this.mainlist_finished=filteredList;
    //     }else if(selected=="3"){
          
    //       var filteredList = this.mainlist_finished.filter(function(item) {
    //         var flag=false;
    //         for(var aa in item.agasi){
    //           //console.log(item.agasi[aa]);
    //           //console.log(item.agasi[aa].name.includes(inputtext));
    //           if(item.agasi[aa].name.includes(inputtext)){
    //             flag= true;
    //           }else{
    //           }
    //         }
    //         //console.log("return flag " +flag);
    //         return flag;
            
    //       });

    //       //console.log(filteredList);
    //       this.mainlist_finished=filteredList;
    //     }else if(selected=="4"){
    //       this.refreshChoice2();
    //     }
    //   }
    // });

    // modal.present();
    this.searchon = !this.searchon;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
    this.ffflag = false;
    this.refreshChoiceonlyjimyung();
      // this.refreshChoice2();
    document.getElementById("ion-label-area-2").style.display = "none";
    document.getElementById("ion-label-area-3").style.display = "none";
    //console.log("this.company:"+this.company);
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_removed', function(snap, prevChildKey) {
      //console.log("on on on on on child_removed.....")
      // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
    });
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_moved', function(snap, prevChildKey) {
      //console.log("on on on on on child_moved.....")
      // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
    });
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_added', (snap, prevChildKey) =>{
      // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      
      if(!this.ffflag){
        this.ffflag=true;
        console.log("added again...");

      this.refreshChoice2();
      }
    });
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").on('child_changed', (snap, prevChildKey) =>{
        console.log("on on on on on child_changed.....")

      //console.log("change4444");
        console.log(snap.val());
        //console.log(prevChildKey);
        //console.log(this.mainlist)
          for(var date in snap.val()){
              for(var room in this.mainlist){
                if(this.mainlist[room].key == snap.val()[date].key){
                  this.refreshoneroom(snap.val()[date]);
                  //console.log(this.mainlist[room]);
                    }
              }
              for(var room in this.mainlist_finished){
                if(this.mainlist_finished[room].key == snap.val()[date].key){
                  //console.log(this.mainlist_finished[room]);
                  this.refreshoneroom2(snap.val()[date]);
                  // this.refreshoneroom(snap.val().roomhistory[date][sdate]);
                    }
              }
          }
      
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
    
  }
  refreshChoiceonlyjimyung(){
    //console.log(this.company);

    this.jimyungnumber=0;
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).on("value",snap=>{
      //console.log(snap.val());
      this.jimyung=[];
      //console.log("jimyung...")
      for(var abc in snap.val()){
        this.jimyungnumber++;
        //console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
    

    });
  }
  refreshoneroom(mainlist){
    console.log("refreshoneroomrefreshoneroomrefreshoneroomrefreshoneroom ");
    console.log(this.mainlist);
    console.log(mainlist);
    for(var v in this.mainlist){
      //console.log(this.mainlist[v].key);
      if(this.mainlist[v].key == mainlist.key){
        //console.log("match!!!");
        //console.log(this.mainlist[v]);
        //console.log("Change to "+mainlist.numofpeople);
        var inagasi=0;
        if(mainlist.agasi!=undefined){
          for(var ccaacc in mainlist.agasi){
            if(mainlist.agasi[ccaacc].findate==undefined){
              inagasi++;
            }
          }
        }
        console.log("inagasi : "+inagasi);
        this.mainlist[v].directorId = mainlist.directorId;
        this.mainlist[v].agasi = mainlist.agasi;
        this.mainlist[v].avec = mainlist.avec;
        this.mainlist[v].date = mainlist.date;
        this.mainlist[v].incharge = mainlist.incharge;
        this.mainlist[v].insert_date = mainlist.insert_date;
        this.mainlist[v].insert_date_full = mainlist.insert_date_full;
        this.mainlist[v].key = mainlist.key;
        this.mainlist[v].totalagasi = mainlist.totalagasi;
        this.mainlist[v].numofpeople = mainlist.numofpeople;
        this.mainlist[v].name = mainlist.name;
        this.mainlist[v].lack = mainlist.numofpeople - inagasi;
        this.mainlist[v].orderlist = mainlist.orderlist;
        this.mainlist[v].status = mainlist.status;
        this.mainlist[v].memo = mainlist.memo;
      }
    }
    //console.log(this.mainlist);

  }
  refreshoneroom2(mainlist){
    console.log("refreshoneroom ");
    console.log(this.mainlist_finished);
    console.log(mainlist);
    for(var v in this.mainlist_finished){
      console.log(this.mainlist_finished[v].key);
      if(this.mainlist_finished[v].key == mainlist.key){
        var inagasi=0;
        if(mainlist.agasi!=undefined){
          for(var ccaacc in mainlist.agasi){
            if(mainlist.agasi[ccaacc].findate==undefined){
              inagasi++;
            }
          }
        }
        console.log("match!!!");
        console.log(this.mainlist_finished[v]);
        console.log("Change to "+mainlist.numofpeople);
        this.mainlist_finished[v].directorId = mainlist.directorId;
        this.mainlist_finished[v].agasi = mainlist.agasi;
        this.mainlist_finished[v].avec = mainlist.avec;
        this.mainlist_finished[v].date = mainlist.date;
        this.mainlist_finished[v].incharge = mainlist.incharge;
        this.mainlist_finished[v].insert_date = mainlist.insert_date;
        this.mainlist_finished[v].insert_date_full = mainlist.insert_date_full;
        this.mainlist_finished[v].key = mainlist.key;
        this.mainlist_finished[v].numofpeople = mainlist.numofpeople;
        this.mainlist_finished[v].lack = mainlist.numofpeople - inagasi;
        this.mainlist_finished[v].name = mainlist.name;
        this.mainlist_finished[v].orderlist = mainlist.orderlist;
        this.mainlist_finished[v].status = mainlist.status;
        this.mainlist_finished[v].memo = mainlist.memo;
      }
    }
    //console.log(this.mainlist);

  }
  refreshChoice2(){
    console.log("refresh choice2 in choice.ts come...");
    var countingvalue=0;
    this.mainlist=[];
    this.mainlist_finished=[];
    this.mainlist_finished_status=[];
    this.mainlist_angel=[];
    this.agasijungsan=[];
    //.on("value", function(snap) {
      // .on('child_changed', function(snap, prevChildKey) {
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").once('value').then((snap)=>{
      console.log(snap.val());
      this.mainlisttest=[];
      this.mainlist=[];
      this.mainlist_mine=[];
      this.mainlist2_mine=[];

      this.mainlist_finished=[];
      this.mainlist_finished_status=[];
      this.mainlist_angel=[];

      this.mainlist_finished=[];
      this.mainlist_finished_status=[];
      this.mainlist_angel=[];
      for(var a in snap.val()){
            for(var b in snap.val()[a]){
              // if(snap.snap.val()[a][b].end_date_full==undefined){
                if(snap.val()[a][b].date!=undefined){
                  var inagasi = 0;
                  var totalagasi = 0;
              if(snap.val()[a][b].agasi!=undefined){

                for(var c in snap.val()[a][b].agasi){
                  totalagasi++;
                  if(snap.val()[a][b].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  var orderlist="";
                  if(snap.val()[a][b].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=snap.val()[a][b].orderlist;
                  }
                if(snap.val()[a][b].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }


            var memo = "";
            console.log(snap.val()[a][b])
            memo = snap.val()[a][b].memo;

                console.log(snap.val()[a][b].name);
                console.log(snap.val()[a][b].key);
                console.log(snap.val()[a][b].noflag+" ,,,,  "+snap.val()[a][b].firstflag);
                //console.log(inagasi);
                //console.log(totalagasi);
                
                if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true||snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                  continue;
                }
                  if(snap.val()[a][b].ss){
                    if(snap.val()[a][b].status=="fin"){
                      this.mainlist_finished_status.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "memo":memo,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
            
                    }else if(snap.val()[a][b].angel==true){
                      //날개방임.
                    
                      this.mainlist_angel.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                  "memo":memo,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                 

                    }else{
                      //ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.
                      console.log("ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.")
                              this.mainlist_finished.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "memo":memo,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                    
                        this.lack = snap.val()[a][b].numofpeople-inagasi;
                    }
                    }else{
                      console.log(" ss not true")
                      //초이스톡 방임.
                      console.log("total agasi "+totalagasi);
                      console.log(inagasi);
                      console.log(snap.val()[a][b].numofpeople);
                      console.log(snap.val()[a][b].ss);
                      var orderlist="";
                      if(snap.val()[a][b].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=snap.val()[a][b].orderlist;
                      }
                      console.log(snap.val()[a][b].ss);
                        console.log("ss is false")
                        //ㅅㅅ한 결과물임. 

                        if(snap.val()[a][b].status=="fin"){
                          console.log("is fin!");
                          this.mainlist_finished_status.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "memo":memo,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else if(snap.val()[a][b].angel==true){
                          //날개방임.
                        
                          console.log("is angel!");
                          this.mainlist_angel.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                      "insert_date":snap.val()[a][b].insert_date,
                      "memo":memo,
                    "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                      "wt":snap.val()[a][b].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                     
    
                        }else if(snap.val()[a][b].ss==false||snap.val()[a][b].ss==undefined){
                          console.log("ap.val()[a][b].ss is undefined....")
                          if(snap.val()[a][b].numofpeople<=inagasi){

                            console.log("but match so move to finished");
                              this.mainlist_finished.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            }else{
  
                              console.log("not match so remain");
                              this.mainlist.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                            "insert_date":snap.val()[a][b].insert_date,
                            "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                            "wt":snap.val()[a][b].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            
                            }

                        }else if(snap.val()[a][b].numofpeople<inagasi){

                          console.log("snap.val()[a][b].numofpeople<=totalagasi");
       this.mainlist_finished.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
       "date":snap.val()[a][b].date,
     "incharge":snap.val()[a][b].incharge,
   "insert_date":snap.val()[a][b].insert_date,
 "insert_date_full":snap.val()[a][b].insert_date_full,
         "key":snap.val()[a][b].key,
         "memo":memo,
       "name":snap.val()[a][b].name,
       "orderlist":orderlist,"totalagasi":totalagasi,
       "avec":snap.val()[a][b].avec,
       "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
       "lastupdated":snap.val()[a][b].lastupdated,
       "directorId":snap.val()[a][b].directorId,
     "numofpeople":snap.val()[a][b].numofpeople,
     "status":snap.val()[a][b].status,
   "wt":snap.val()[a][b].wt,
 "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else {

                          
                          console.log("is else...");


      this.mainlist.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
      "date":snap.val()[a][b].date,
    "incharge":snap.val()[a][b].incharge,
    "insert_date":snap.val()[a][b].insert_date,
    "insert_date_full":snap.val()[a][b].insert_date_full,
        "key":snap.val()[a][b].key,
        "memo":memo,
      "name":snap.val()[a][b].name,
      "orderlist":orderlist,
      "showflag":true,
      "avec":snap.val()[a][b].avec,
      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
      "lastupdated":snap.val()[a][b].lastupdated,
      "directorId":snap.val()[a][b].directorId,
    "numofpeople":snap.val()[a][b].numofpeople,
    "status":snap.val()[a][b].status,
    "wt":snap.val()[a][b].wt,
    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }                   

                      
                    this.lack = snap.val()[a][b].numofpeople-inagasi;
                  }
                  var counting=0;
                 
                  this.mainlist.sort((a, b) => a.v - b.v);
                  counting=0;
                 

                  this.mainlist.sort((a, b) => a.v - b.v);

                  counting=0;
                  for(var aaa in  this.mainlisttest){
                    counting++;
                  }
                  this.mainlist.sort((a, b) => a.v - b.v);


                   counting=0;
                  for(var aaa in  this.mainlist_finished){
                    counting++;
                    this.mainlist_finished[aaa].v = counting;
                  }
                  this.mainlist_finished.sort((a, b) => a.v - b.v);

                   counting=0;
                  for(var aaa in  this.mainlist_finished_status){
                    counting++;
                    this.mainlist_finished_status[aaa].v = counting;
                  }

                  this.mainlist_finished_status.sort((a, b) => a.v - b.v);




                   counting=0;
              
                  //console.log(this.mainlisttest)
                  //console.log("test was")
                  //console.log(this.mainlist)
                  //console.log("this.mainlist_finished");
                  //console.log(this.mainlist_finished);
                  //console.log("this.mainlist_finished_status");
                  //console.log(this.mainlist_finished_status);
                  //console.log("this.mainlist_angel");
                  //console.log(this.mainlist_angel);
                  this.mainlist_finished.sort(function(a,b){
                    if (a.status < b.status) {
                      return -1;
                    }
                    if (a.status > b.status) {
                      return 1;
                    }
                    return 0;

                  
                });
              }
              
            }
       
        
      }


      //console.log(this.mainlist);
      //console.log(this.mainlist_finished);
      //console.log(this.mainlist_finished_status);
      console.log(this.mainlist_angel);
      this.angelnumber=this.mainlist_angel.length;
      this.agasijungsan=[];
      for(var c in this.mainlist){
        for(var d in this.mainlist[c].agasi){
            if(this.mainlist[c].agasi[d].findate!=undefined){
  
            }else{
              this.agasijungsan.push({"name":this.mainlist[c].agasi[d].name})
            }
           
        }
      }
      for(var c in this.mainlist_finished){
        for(var d in this.mainlist_finished[c].agasi){
            if(this.mainlist_finished[c].agasi[d].findate!=undefined){
  
            }else{
  
              this.agasijungsan.push({"name":this.mainlist_finished[c].agasi[d].name})
            }
        }
      }
      //console.log(this.agasijungsan);
console.log(this.mainlist);
console.log(this.name);

for(var main in this.mainlist_finished){
  if(this.type=="wt"){
    if(this.mainlist_finished[main].wt == this.nickname){
      console.log("mainlist_main added");
        this.mainlist2_mine.push({
          "v":this.mainlist_finished[main].v, "agasi":this.mainlist_finished[main].agasi,
            "date":this.mainlist_finished[main].date,
          "incharge":this.mainlist_finished[main].incharge,
          "insert_date":this.mainlist_finished[main].insert_date,
          "insert_date_full":this.mainlist_finished[main].insert_date_full,
              "key":this.mainlist_finished[main].key,
              "memo":memo,
            "name":this.mainlist_finished[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_finished[main].avec,
            "lastupdatedperson":this.mainlist_finished[main].lastupdatedperson,
            "lastupdated":this.mainlist_finished[main].lastupdated,
            "directorId":this.mainlist_finished[main].directorId,
          "numofpeople":this.mainlist_finished[main].numofpeople,
          "status":this.mainlist_finished[main].status,
          "wt":this.mainlist_finished[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_finished[main].numofpeople-inagasi
        })
  }
  }else if(this.type=="director"||this.type=="info"){

    if(this.mainlist_finished[main].incharge == this.nickname){
      console.log("mainlist_main added");
        this.mainlist2_mine.push({
          "v":this.mainlist_finished[main].v, "agasi":this.mainlist_finished[main].agasi,
            "date":this.mainlist_finished[main].date,
          "incharge":this.mainlist_finished[main].incharge,
          "insert_date":this.mainlist_finished[main].insert_date,
          "insert_date_full":this.mainlist_finished[main].insert_date_full,
              "key":this.mainlist_finished[main].key,
              "memo":memo,
            "name":this.mainlist_finished[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_finished[main].avec,
            "lastupdatedperson":this.mainlist_finished[main].lastupdatedperson,
            "lastupdated":this.mainlist_finished[main].lastupdated,
            "directorId":this.mainlist_finished[main].directorId,
          "numofpeople":this.mainlist_finished[main].numofpeople,
          "status":this.mainlist_finished[main].status,
          "wt":this.mainlist_finished[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_finished[main].numofpeople-inagasi
        })
  }

  }
  
}
for(var main in this.mainlist){
  if(this.type=="wt"){
    if(this.mainlist[main].wt == this.nickname){
      console.log("mainlist_main added");
        this.mainlist_mine.push({
          "v":this.mainlist[main].v, "agasi":this.mainlist[main].agasi,
            "date":this.mainlist[main].date,
          "incharge":this.mainlist[main].incharge,
          "insert_date":this.mainlist[main].insert_date,
          "insert_date_full":this.mainlist[main].insert_date_full,
              "key":this.mainlist[main].key,
              "memo":memo,
            "name":this.mainlist[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist[main].avec,
            "lastupdatedperson":this.mainlist[main].lastupdatedperson,
            "lastupdated":this.mainlist[main].lastupdated,
            "directorId":this.mainlist[main].directorId,
          "numofpeople":this.mainlist[main].numofpeople,
          "status":this.mainlist[main].status,
          "wt":this.mainlist[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist[main].numofpeople-inagasi
        })
  }
  }else if(this.type=="director"||this.type=="info"){

    if(this.mainlist[main].incharge == this.nickname){
      console.log("mainlist_main added");
        this.mainlist_mine.push({
          "v":this.mainlist[main].v, "agasi":this.mainlist[main].agasi,
            "date":this.mainlist[main].date,
          "incharge":this.mainlist[main].incharge,
          "insert_date":this.mainlist[main].insert_date,
          "insert_date_full":this.mainlist[main].insert_date_full,
              "key":this.mainlist[main].key,
              "memo":memo,
            "name":this.mainlist[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist[main].avec,
            "lastupdatedperson":this.mainlist[main].lastupdatedperson,
            "lastupdated":this.mainlist[main].lastupdated,
            "directorId":this.mainlist[main].directorId,
          "numofpeople":this.mainlist[main].numofpeople,
          "status":this.mainlist[main].status,
          "wt":this.mainlist[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist[main].numofpeople-inagasi
        })
  }

  }
  
}
this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  this.mainlist_attend=[];
  for(var a in snap.val()){
    if(a==this.currentstartday){
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          this.mainlist_attend.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
              
        }
      }
    }
  }

  console.log(this.mainlist);
  console.log(this.mainlist_finished);
  console.log(this.mainlist_attend);
  console.log(this.agasijungsan);
          this.standby=this.mainlist_attend.length-this.agasijungsan.length;
     
});

    
      counting=0;
      for(var aaa in  this.mainlist){
        counting++;
        this.mainlist[aaa].v=counting;
      }
      this.mainlist.sort((a, b) => a.v - b.v);

      this.original_mainlist=this.mainlist;
  //console.log(this.mainlist)
  //console.log("snap fin...");
  this.ffflag=false;
        });
        //console.log("refresh choice finished");
  }
  reordering(){
    var counting =0;
    //console.log(this.mainlist)
    //console.log(this.mainlist_finished);
    //console.log(this.mainlist_finished_status)
    var main_bbang=[];
    var main_shin=[];
    var new_main =[];
    this.agasijungsan=[];


    // this.mainlist=[];
    // this.mainlist_finished=[];
    // this.mainlist_finished_status=[];
    // this.mainlist_angel=[];
    // this.agasijungsan=[];

    for(var aaa in  this.mainlist){
      
    if(Number(aaa)!=0){
      //console.log(this.mainlist[Number(aaa)-1]);
      if(this.mainlist[Number(aaa)-1].totalagasi!=0&&this.mainlist[Number(aaa)].totalagasi==0&&this.mainlist[Number(aaa)].lack==1){
        //console.log("match...");
        this.mainlist[Number(aaa)].up=this.mainlist[Number(aaa)-1].name;
      //console.log(this.mainlist[Number(aaa)]);

      }
    }

    if(this.mainlist[Number(aaa)].totalagasi!=0){
      //빵꾸임 . 
      main_bbang.push(this.mainlist[aaa]);

    }else{
      //새로운거임
      main_shin.push(this.mainlist[aaa]);
    }

      //console.log(this.mainlist[aaa].name+","+this.mainlist[aaa].totalagasi)
    //   this.mainlist[aaa].v = counting;
    }
    //console.log("all finisehd");
    for(var abab in main_bbang){
      new_main.push(main_bbang[abab]);
    }
    for(var bababa in main_shin){
      new_main.push(main_shin[bababa]);
    }
    //console.log(new_main)
    for(var ababb in new_main){
      if(new_main[ababb].up!=undefined){
        //console.log(new_main[ababb].up);
        //change array's number if new_main[ababb].up is 104 then new_main[ababb] should be located at 104's index
        var upindex=0;
        for(var ababab in new_main){
          if(new_main[ababab].name==new_main[ababb].up){
            upindex=Number(ababab);
          }
        }
        //console.log("upindex is "+upindex);
        //console.log("chage position...!")
        //console.log(new_main[upindex]);
        //console.log(new_main[upindex+1]);
        var temp=new_main[upindex+1];
        new_main[upindex+1]=new_main[ababb];
        new_main[ababb]=temp;
        //console.log(new_main[upindex+1]);
        //console.log(new_main[ababb]);


      }
    }


    //console.log("new_main : ");
    //console.log(new_main);
    if(this.booleanValue){
    counting=0;
    for(var ababb in new_main){
      counting++;
      new_main[ababb].v = counting;
    this.firemain.child("company").child(this.company).child("roomlist").child(new_main[ababb].name).child("roomhistory").child(this.currentstartday).child(new_main[ababb].key).update({"v":counting})
    }

    this.mainlist=new_main;
    //console.log(this.mainlist);
    }
    //대기 관련 코드 임시주석처리. 
    // for(var bbbaaa in this.mainlist){
    //   if(this.mainlist[bbbaaa].showflag==false){
    //     //eliminate this.mainlist[bbbaaa]
    //     this.mainlist.splice(bbbaaa,1);

    //   }
    // }
    for(var c in this.mainlist){
      for(var d in this.mainlist[c].agasi){
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            this.agasijungsan.push({"name":this.mainlist[c].agasi[d].name})
          }
         
      }
    }
    for(var c in this.mainlist_finished){
      for(var d in this.mainlist_finished[c].agasi){
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){

          }else{

            this.agasijungsan.push({"name":this.mainlist_finished[c].agasi[d].name})
          }
      }
    }
    //console.log(this.mainlist);
    //console.log(this.mainlist_finished);
    //console.log(this.mainlist_attend);
    //console.log(this.agasijungsan);
    this.standby=this.mainlist_attend.length-this.agasijungsan.length;
   

  }
  deleting(main){
    //console.log(main.key);
    
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(main.key).remove();
    var counting=0;
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).once("value",snap=>{
      //console.log(snap.val());

      this.jimyung=[];
      for(var abc in snap.val()){
        //console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
      //console.log("jimyung : ");
      //console.log(this.jimyung);
      //console.log(this.jimyung.length);
      var counting=0;
      for(var aq in this.jimyung){
        counting++;
        //console.log(this.jimyung[aq]);
        this.jimyung[aq].v = counting;
      }

      //console.log(this.jimyung);
      for(var qa in this.jimyung){
        this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[qa].key).update({v:this.jimyung[qa].v});
      }
                  
                  //console.log("this.jimyung");
                  //console.log(this.jimyung);

    });

    
    // this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[aaaa].key).update({v:counting});
   


    
    this.refreshChoiceonlyjimyung();
  }
  openclose(){
    //console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
    // this.navCtrl.setRoot(InfoPage,{flag:true}).then(() => {
    //   this.navCtrl.getActive().onDidDismiss(data => {

    //   })
    // });
  }
  godetail(a,v){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {

        console.log("ChoicedetailPage ondiddismiss....");
        console.log(data);
      this.refreshChoice2();

        setTimeout(()=>{
          this.screenSwitch(1);
        },10)
   

      })
    });
  }
  gotomorepage(a,v){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {

        console.log("ChoicedetailPage ondiddismiss....");
        console.log(data);
      this.refreshChoice2();

        setTimeout(()=>{
          this.screenSwitch(1);
        },10)
   

      })
    });

  }
  gotodetail(a){
    //console.log("gotodetail...")
    //console.log(a);
    if(a.agasi==undefined){
      a.agasi=[];
    }
    //console.log(a)
    let modal = this.modal.create(ChoicemodalPage,{"a":a});
    modal.onDidDismiss(url => {
      //console.log(url);
      this.util.dismissLoading();
      // this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();
  };

  reorderItems2(indexes){
    //console.log("reorderItems2 item...");
    //console.log(indexes);
    //console.log(indexes.from);
    //console.log(indexes.to);
    let element = this.jimyung[indexes.from];
    this.jimyung[indexes.from].v=(indexes.to+1);
    this.jimyung[indexes.to].v=(indexes.from+1);
    //console.log(element)
    this.jimyung.splice(indexes.from, 1);
    this.jimyung.splice(indexes.to, 0, element);
    //console.log(this.jimyung);
    for(var a in this.jimyung){
      //console.log(this.jimyung[a]);
      this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).child(this.jimyung[a].key).update({"v":this.jimyung[a].v})
    }
    //console.log("reorder item end")
  };
  tabclicked(v){
    console.log("tab clicked : "+v);
    if(v==1){

      if(this.tab1clicked){
        this.tab1clicked=false;
      }else{
        this.tab1clicked=true;
      }
      console.log("current : "+this.tab1clicked);
      if(this.tab1clicked){
        console.log("ta1 is true so go to false'");
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', false);
      }else{

        console.log("go to true'");
      $("#tab1").prop('checked', true);
      }
    }
    if(v==2){
      this.tab2clicked= !this.tab2clicked;
      if(this.tab2clicked){
        console.log("tab2 clicked : "+v);
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', true);
      }else{

      $("#tab2").prop('checked', false);
      }
    }
  }
  reorderItems(indexes){
    //console.log("reorder item...");
    //console.log(indexes);
    //console.log(indexes.from);
    //console.log(indexes.to);
    //console.log(this.mainlist[indexes.from]);
    let element = this.mainlist[indexes.from];
    this.mainlist[indexes.from].v=(indexes.to+1);
    this.mainlist[indexes.to].v=(indexes.from+1);
    //console.log(element)
    this.mainlist.splice(indexes.from, 1);
    this.mainlist.splice(indexes.to, 0, element);
    //console.log(this.mainlist);
    for(var a in this.mainlist){
      console.log(this.mainlist[a]);
      if(this.mainlist[a].up==undefined){
        console.log("up is not exist");
        // break;
      }
      var up = this.mainlist[a].up;
      
      if(up!=undefined){

        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[a].name).child(this.mainlist[a].key).update({"v":this.mainlist[a].v,"up":up})
      }else{

      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[a].name).child(this.mainlist[a].key).update({"v":this.mainlist[a].v})
      }
    }
    //console.log("for loop finished");
    var counting=0;
    //console.log(this.mainlist);
    for(var ababb in this.mainlist){
      counting++;
      //console.log(this.mainlist[ababb])
      this.mainlist[ababb].v = counting;
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[ababb].name).child(this.mainlist[ababb].key).update({"v":counting})
    }
    //console.log(this.mainlist);

  };
  
  async getIdOfagaci (d,name,totalmoney,room,key,number,tctotal,wt,incharge,mainlist,bantee){
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
          //console.log(name+"' id : "+returnvalue + totalmoney+",,,,"+number);

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
            this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":name, "room":mainlist.name,"jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          if(bantee>=1){
            this.firemain.child("users").child(mainlist.directorId).child("incentive").child(this.currentstartday).child(mainlist.key).child("bantee").update({"values":bantee,"type":"bantee","room":mainlist.name, "agasi":name, "jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
          if(mainlist.numofpeople>=5){

          }else{
            //console.log(mainlist.orderlist)
            if(mainlist.orderlist!=undefined){
              var totalnum=0;
              for(var a in mainlist.orderlist.orderlist){
                //iterate through and calculate cumulative num 
                if(mainlist.orderlist.orderlist[a].category="주류"){
                  totalnum+=mainlist.orderlist.orderlist[a].num;
                }
                //console.log(mainlist.orderlist.orderlist[a])
              }
              //console.log("total bottle : "+totalnum);
              var totaltc=0;
              for(var b in mainlist.agasi){
                totaltc+=mainlist.agasi[b].tc;
              }
              var yeonti=0;
              var yeonti_reason="";
              if(totaltc>mainlist.numofpeople*totalnum){
                yeonti = mainlist.numofpeople * totalnum -totaltc;
                yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+totaltc;
                //console.log(mainlist.numofpeople+"*"+totalnum+"-"+totaltc);
              }else{
                yeonti=totalnum;
                yeonti_reason="totaltc is so great so just count totalnum";
                //console.log("totaltc is so great so just count totalnum");
              }
              
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"yeonti":yeonti,"yeonti_reason":yeonti_reason})
            }
        }

            
          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).child("agasi").child(number).update({"roomno":room,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":wt,"incharge":incharge})


  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).update({"date":d,"end_date":hour+":"+min,"end_date_full":dte})
  // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday+"").update({"flag":false,"lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
    });
  }
  ss(c,room,mainlist) {
    //console.log("ss")
    //console.log(c);
    //console.log(room);
    //console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})

    // this.refreshChoice2();
  }

  //초이스 탭으로 이동시키기.
  ss2(c,room,mainlist) {
    //console.log("s2s")
    //console.log(c);
    //console.log(room);
    //console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":false})

    // this.refreshChoice2();
    this.view.dismiss();
  }
  endall(c,room,mainlist) {

    //console.log(c);
    //console.log(room);
    //console.log(mainlist);
    //console.log("----------endall----------");


    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    dte.setHours(dte.getHours()+9);

    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{

      for(var f in snap2.val().agasi){



        for(var d in c.agasi){
          if(snap2.val().agasi[f].name==c.agasi[d].name){
            var totalmoney=0;
            var id="";
            totalmoney=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[0]);
            var tctotal=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[1]);
            var bantee=Number(this.util.getTC(snap2.val().agasi[f],0).split(",")[2]);
             this.getIdOfagaci(snap2.val().agasi[f].date,c.agasi[d].name,totalmoney,room,c.key,f,tctotal,mainlist.wt,mainlist.incharge,mainlist,bantee)+"";
            

          }
         
        }
       
      }
      // this.refreshChoice2();
    });
  }
  reinit(c,room,mainlist, f){
    //console.log("reinit come");
    //console.log(c);
    var pausetime=c.pausetime;
    //console.log(mainlist)
    //console.log(f);
    //console.log(room);
    for(var a in mainlist.agasi){
      //console.log(mainlist.agasi[a].name+", "+c.name)
      if(mainlist.agasi[a].name==c.name){

        var num = a;
        var date = new Date();
        var findate = new Date(c.findate);
        //get minutes betweetn c.findate and date
        var diff = date.getTime() - findate.getTime();
        var minutes = Math.floor(diff / 1000 / 60);
        //console.log(pausetime);
        if(pausetime==undefined){
          pausetime=0;
        }
        //console.log(minutes);
        pausetime+=Number(minutes);
        //console.log(pausetime);
        //console.log(this.company+","+room+",,"+this.currentstartday+","+mainlist.key+","+num+",,,"+pausetime);
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
          //console.log("find user");
          var user = snapp.val()[b].id;
          //console.log("user:"+user);
          //console.log("room:"+room+",,,"+this.currentstartday+","+mainlist.key+","+num);
          this.firemain.child("users").child(user).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update(postData);
        }
      }
    });
        //console.log(postData)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").remove();
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").update(postData)
        if(f==2){

          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
        }
      }
    }
    // this.refreshChoice2();
  }
  end(c,room,mainlist, f){
    //console.log("-------------------------end-------------------------");
    //console.log(c);
    //console.log(mainlist)
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
            //console.log(c.name+",,,,,"+snap.val()[b].name);
            if(c.name == snap.val()[b].name){
              alreadyexist=true;
              //console.log(c);
              //console.log(snap.val()[b]);
              selectedid=snap.val()[b].id;
              var selectedjopan=snap.val()[b].jopan;
              //console.log(selectedid);
              // this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{
                for(var d in snap2.val().agasi){
                  if(snap2.val().agasi[d].name==c.name){

                    var totalmoney=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[0]);
                    var tctotal=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[1]);
                    var bantee=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[2]);
                    
                    //console.log(totalmoney);
                    //console.log(tctotal);
                    //console.log(selectedid)
                    //console.log(room);
                    var jjing=Math.round(tctotal);
                    if(Math.round(tctotal)>=1){
                      //console.log(snap.val()[b]);
                      //console.log(selectedjopan)
                      //console.log(c);
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":snap2.val().agasi[d].name,"room":mainlist.name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    if(bantee>=1){
                      this.firemain.child("users").child(mainlist.directorId).child("incentive").child(this.currentstartday).child(mainlist.key).child("bantee").update({"values":bantee,"key":mainlist.key,"room":mainlist.name, "type":"bantee", "agasi":snap2.val().agasi[d].name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    this.firemain.child("users").child(selectedid).child("current").remove();

                    //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
                    if(mainlist.numofpeople>=5){

                    }else{
                      //console.log(mainlist.orderlist)
                      if(mainlist.orderlist!=undefined){
                        var totalnum=0;
                        for(var a in mainlist.orderlist.orderlist){
                          //iterate through and calculate cumulative num 
                          if(mainlist.orderlist.orderlist[a].category="주류"){
                            totalnum+=mainlist.orderlist.orderlist[a].num;
                          }
                        }
                        //console.log("total bottle : "+totalnum);
                        var totaltc=0;
                        for(var b in mainlist.agasi){
                          totaltc+=mainlist.agasi[b].tc;
                        }
                        var yeonti=0;
                        var yeonti_reason="";
                        if(totaltc>mainlist.numofpeople*totalnum){
                          yeonti = mainlist.numofpeople * totalnum -totaltc;
                          yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+totaltc;
                          //console.log(mainlist.numofpeople+"*"+totalnum+"-"+totaltc);
                        }else{
                          yeonti=totalnum;
                          yeonti_reason="totaltc is so great so just count totalnum";
                          //console.log("totaltc is so great so just count totalnum");
                        }
                        
                        //console.log("this room's yeonti is : "+yeonti);
                        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"yeonti":yeonti,"yeonti_reason":yeonti_reason})
                      }
                  }
                    this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":snap2.val().agasi[d].name,  "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt,"lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                  }
                }
                //console.log(snap.val().agasi)
              });
              //console.log("loop finisehd");
  
            }
          }
          if(!alreadyexist){
            //console.log("새로 등록된 아이임.")
          }
      }

      if(f==2){
        //console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
      }
    // this.refreshChoice2();
  });
  }

  gotolink(value){
    //console.log("gotolink "+value);
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
    //console.log("editing...")
    //console.log(a);
    let modal = this.modal.create(AgasichoicePage,{"a":a});
    modal.onDidDismiss(url => {
      //console.log("dismiss !");
     
    });

    modal.present();
  }

  onTouchStart(event: TouchEvent) {
    // Get the starting X position
    console.log("onTouchStartonTouchStartonTouchStart");
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isDragging = false;
    this.swipeDirection = 'none';
  }

  onTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      // Calculate the horizontal and vertical movement distances
      const deltaX = event.touches[0].clientX - this.startX;
      const deltaY = event.touches[0].clientY - this.startY;

      if (deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        // User is swiping to the right
        if (this.swipeDirection !== 'right') {
          this.swipeDirection = 'right';
          console.log('Swipe direction changed to right');
        }
        console.log('Swipe to the right detected');
        // Add your desired logic here
      } else if (deltaX < 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        // User is swiping to the left
        if (this.swipeDirection !== 'left') {
          this.swipeDirection = 'left';
          console.log('Swipe direction changed to left');
        }
        console.log('Swipe to the left detected');
        // Add your desired logic here
      }
    } else {
      // Check if the user has started dragging to the right
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        this.isDragging = true;
        this.swipeDirection = 'right';
        console.log('Started dragging to the right');
        this.view.dismiss();
        // Add any initial logic when the user starts dragging to the right
      } else if (deltaX < 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        this.isDragging = true;
        this.swipeDirection = 'left';
        console.log('Started dragging to the left');

        // this.navCtrl.push(InfoPage)
        // Add any initial logic when the user starts dragging to the left
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (this.isDragging) {
      console.log('Touch and drag ended');
      // Add any final logic when the user stops dragging to the right
    }
    this.isDragging = false;
  }

  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.view.dismiss();
  }
      /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
      screenSwitch(values) : void {
        console.log("screenSwitch"+values);
       
          for (let i = 1; i <= 3; i++) { 
            document.getElementById("ion-label-area-"+i).style.display = "none"; 
          }
          document.getElementById("ion-label-area-" + values).style.display = "";
          this.zone.run(()=>{
      
            this.activeclass=values;
          })
      }
}
