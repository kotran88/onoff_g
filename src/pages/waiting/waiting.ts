import { Component } from '@angular/core';
import { IonicPage,ModalController,ViewController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { ParkingPage } from '../parking/parking';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
import { E } from '@angular/core/src/render3';
import { generate } from 'rxjs';
import { SignupPage } from '../signup/signup';
import { AccountPage } from '../account/account';
import { OrderPage } from '../order/order';
import { OrdermainPage } from '../ordermain/ordermain';
import { UtilsProvider } from '../../providers/utils/utils';
import { InfoPage } from '../info/info';
import { WaitingmodalPage } from '../waitingmodal/waitingmodal';
/**
 * Generated class for the WaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-waiting',
  templateUrl: 'waiting.html',
})
export class WaitingPage {
  mainlist:any = [];
  noagasi:any=0;
  avec:any="";
  numofpeople:any="";
  incharge:any="";
  agasinum:any=0;
  inputtext:any="";
  mainlist_finished:any=[];
  currentstartday:any="";
  selectedday:any=0;
  currentstart:any="";
  selected:any=1;
  smallroom=[];
  smallroom2=[];
  allroom=[];
  totalactiveroom:any=0;
  midroom=[];
  bigroom=[];
  midroom2=[];
  bigroom2=[];
  firstflag=false;
  company:any="";
  bu:any=0;
  name:any="";
  nowtime:any=""
  paymentflag:any=false;
  interval:any;
  directorList:any=[];
  code:any="";
  nickname:any="";
  id:any="";
  type:any="";
  firemain = firebase.database().ref();
  constructor(public util:UtilsProvider, public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.directorList = this.navParams.get("user");
    this.currentstartday=localStorage.getItem("startDate");
    this.nickname = localStorage.getItem("nickname");
    this.name = localStorage.getItem("name");
    this.firstflag = this.navParams.get("flag");
    this.type = localStorage.getItem("type");
    var login=localStorage.getItem("login_data");
    // this.code = JSON.parse(login).code;
    //console.log(login);

    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;
    //console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
    this.interval=setInterval(()=>{
      var now = new Date();
      var hour = now.getHours();
      var min = now.getMinutes();
      if(min<10){
        this.nowtime=hour+":0"+min;
      }else{
        this.nowtime=hour+":"+min;
      }
    }
    ,1000)

  }
  ionViewWillLeave(){
    // this.firemain.child("company").child(this.company).child("roomlist").off();
  }
  openclose(){
    //console.log("open and cloe");
    try{
      this.menuCtrl.open();
    }catch(e){
      //console.log(e);
    }
  }
  close(){

    // this.menuCtrl.open();
    this.view.dismiss();
}
searching(){

  //console.log(this.inputtext)
  //console.log(this.selected)


  this.mainlist=[];
  this.mainlist_finished=[];

  this.firemain.child("company").child(this.company).child("waiting").once('value').then((snap)=>{
    for(var a in snap.val()){
      //console.log("searching mmmm")
      //console.log(snap.val()[a]);
      //console.log(snap.val()[a].flag);
      this.mainlist.push(snap.val()[a]);
      var flag = snap.val()[a].flag;
      for(var b in snap.val()[a].roomhistory){
        //console.log(b)
        //console.log(this.currentstartday);
        if(b==this.currentstartday){

          //console.log(snap.val()[a].roomhistory[b])
          //console.log(snap.val()[a].roomhistory[b].flag)
        }
      }
        //console.log(snap.val()[a].roomhistory)
        // if(snap.val()[a].roomhistory!=undefined){
        //   //console.log(snap.val()[a].roomhistory[this.currentstartday])
        //   for(var b in snap.val()[a].roomhistory[this.currentstartday]){
        //     //console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
        //     if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
        //       if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
        //         if(snap.val()[a].roomhistory[this.currentstartday][b].flag){
        //           if(this.selected==1){
        //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b].incharge)
        //             //console.log(this.inputtext)
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].incharge==this.inputtext){
        //               this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else if(this.selected==2){
        //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b].name)
        //             //console.log(this.inputtext)
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].name==this.inputtext){
        //               this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else if(this.selected==3){
        //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b].wt)
        //             //console.log(this.inputtext)
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].wt==this.inputtext){
        //               this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else{
        //             this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //           }
                
        //         }
        //         }else{
        //           if(this.selected==1){
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].incharge==this.inputtext){
        //              this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else if(this.selected==2){
        //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b].name)
        //             //console.log(this.inputtext)
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].name==this.inputtext){
        //               this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else if(this.selected==3){
        //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b].wt)
        //             //console.log(this.inputtext)
        //             if(snap.val()[a].roomhistory[this.currentstartday][b].wt==this.inputtext){
        //               this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //             }
        //           }else{
        //             this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
        //           }
        //         }
        //     }
            
        //   }
        // }
    
    }
    //console.log(this.mainlist)
    this.mainlist.sort(function(a, b) {
        //console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });

    //console.log("after sorting...")
    //console.log(this.mainlist)


    this.mainlist_finished.sort(function(a, b) {
      //console.log(a.insert_date);
      // Compare dates
     
      var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
      var timeB = b.insert_date.split(":");
      return timeA[0]-timeB[0] || timeA[1]-timeB[1];
      
  });
  });

}
gotopayment(){
  this.firemain.child("users").child(this.nickname).update({"payment":true})
  window.alert("임시 결제 완료 ")
  this.navCtrl.setRoot(LoginpagePage);
}
  gotolink(value){
    if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true});
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
        //console.log("choice back")
        this.navCtrl.getActive().onDidDismiss(data => {
          //console.log("off...")
      // this.firemain.child("company").child(this.company).child("roomlist").off();
        })
      });
    }else if(value==5){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(OrdermainPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(InfoPage,{flag:true});
    }
  }
  generateroomcategory(){
    //console.log("generateroomcategory")
    this.smallroom=[];
    this.smallroom2=[];
    this.midroom=[];
    this.midroom2=[];
    this.bigroom=[];
    this.bigroom2=[];
    this.allroom=[];
    var roomin=[];
    this.firemain.child("company").child(this.company).once('value').then((snap2)=>{
      //console.log(snap2.val().bu)
      if(snap2.val().bu==undefined){

        this.bu=0;
      }else{

        this.bu=snap2.val().bu;
      }
    });
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      if(snap.val()==null){

      }else{
        for(var a in snap.val()){
         var cat =  snap.val()[a].category;
         var name = snap.val()[a].name;
         var flag = snap.val()[a].flag;
         if(flag==undefined){
          flag=false;
         }
        this.allroom.push({"name":name,"category":cat,"flag":flag});
        if(cat=="소"){
          if(flag){
            //console.log(flag+"small not add")
          }else{
            //console.log(name);
            //console.log(name.substring(0,1));
            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.smallroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.smallroom2.push({"name":name,"category":cat,"flag":flag});
            }
          
          }
        }else if(cat=="중"){
          if(flag){
            //console.log(flag+"mid not add")
          }else{

            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.midroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.midroom2.push({"name":name,"category":cat,"flag":flag});
            }
            // this.midroom.push({"name":name,"category":cat,"flag":flag});
          }
        }else if(cat=="대"){
          if(flag){
            //console.log(flag+"big not add")
          }else{
            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.bigroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.bigroom2.push({"name":name,"category":cat,"flag":flag});
            }
            // this.bigroom.push({"name":name,"category":cat,"flag":flag});
          }
        }

        for(var b in snap.val()[a].roomhistory){
          if(b==this.currentstartday){
            for(var c in snap.val()[a].roomhistory[b]){
              if(c!="lastupdated"&&c!="flag"){
                //console.log(snap.val()[a].roomhistory[b][c])
                if(snap.val()[a].roomhistory[b][c].end_date_full!=undefined){
                  //완료된방
                }else{

                roomin.push(snap.val()[a].roomhistory[b][c].name);
                }
              }
              //flase 는 종료 
              
            }
          }
        }
      }
        //console.log("roomin");
        //console.log(roomin);
        
      }
  
      //if smallroom have value of roomin then delete
      
      for(var bba in roomin){
        for(var aba in this.smallroom){
          if(this.smallroom[aba].name==roomin[bba]){
            //console.log("smallroom delete")
            this.smallroom.splice(Number(aba),1);
          }
        }
        for(var aba in this.smallroom2){
          if(this.smallroom2[aba].name==roomin[bba]){
            //console.log("smallroom2222 delete")
            this.smallroom2.splice(Number(aba),1);
          }
        }
        for(var aba in this.midroom){
          if(this.midroom[aba].name==roomin[bba]){
            //console.log("midroom delete")
            this.midroom.splice(Number(aba),1);
          }
        }
        for(var aba in this.bigroom){
          if(this.bigroom[aba].name==roomin[bba]){
            //console.log("bigroom delete")
            this.bigroom.splice(Number(aba),1);
          }
        }


        for(var aba in this.midroom2){
          if(this.midroom2[aba].name==roomin[bba]){
            //console.log("midroom2 delete")
            this.midroom2.splice(Number(aba),1);
          }
        }
        for(var aba in this.bigroom2){
          if(this.bigroom2[aba].name==roomin[bba]){
            //console.log("bigroom2 delete")
            this.bigroom2.splice(Number(aba),1);
          }
        }
      }
      //console.log(this.midroom);
      //console.log(this.bigroom);
      //console.log(this.allroom)
    });
  }
  buchange(){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    //console.log("buchnage"+this.bu)
    if(this.bu==0){
      this.bu=1
    }else if(this.bu==1){
      this.bu=2;
    }else{
      this.bu=0;
    }

    this.firemain.child("company").child(this.company).update({"bu":this.bu});

  }
  ionViewDidLeave(){
    clearInterval(this.interval)
  }
  ionViewWillEnter(){
    //console.log("ionViewWillEnter");
    
  }
  ionViewDidLoad() {
    setTimeout(()=>{

    this.generate();
    },100)
    // this.util.presentLoading();
    // this.generate();
    // this.util.dismissLoading();
  }
  generate(){
    console.log("generate come");
    this.generateroomcategory()
    this.mainlist=[];
    this.mainlist_finished=[];
    this.noagasi=0;
    this.agasinum=0;
    this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday).once('value').then((snap)=>{
      for(var a in snap.val()){
        var flag = snap.val()[a].flag;

      this.mainlist.push(snap.val()[a]);
        // for(var b in snap.val()[a].roomhistory){
        //   if(b==this.currentstartday){

        //     //console.log(snap.val()[a].roomhistory[b])
        //     //console.log(snap.val()[a].roomhistory[b].flag)
        //   }
        // }
          // if(snap.val()[a].roomhistory!=undefined){
          //   for(var b in snap.val()[a].roomhistory[this.currentstartday]){
          //     if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
          //       if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
          //         if(snap.val()[a].roomhistory[this.currentstartday][b].flag){
          //           this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          //         }
          //         }else{
          //           //console.log("this is finished room");
          //           //console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          //           if(snap.val()[a].roomhistory[this.currentstartday][b].agasi==undefined&&snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
          //             //이방은 OB처리해야함. 
          //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          //             //console.log("this bang should be ob ++ ");
          //             this.noagasi++;
          //           }else{
                      
          //             //console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          //             //console.log("this bang should not be ob ++ ");
          //             this.agasinum++;
          //           }
          //           //iterate through snap.val()[a].roomhistory[this.currentstartday][b] 
          //           //and push to mainlist_finished
          //           // this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          //           var agasi = [];
          //           if(snap.val()[a].roomhistory[this.currentstartday][b].agasi==undefined){
          //             agasi = [];
          //           }else{
          //             agasi = snap.val()[a].roomhistory[this.currentstartday][b].agasi;
          //           }
          //           //console.log("agasi length : "+agasi.length);
          //           //console.log(agasi);
          //           if(agasi.length==0){
                      
          //           }else{
          //           }
          //           var orderlist = [];
          //           if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
          //             orderlist = [];
          //           }else{
          //             orderlist = snap.val()[a].roomhistory[this.currentstartday][b].orderlist;
          //           }
          //           //console.log(agasi);
          //           //console.log(orderlist);
                   
          //           this.mainlist_finished.push({
          //             "v":snap.val()[a].roomhistory[this.currentstartday][b].v, "agasi":agasi,
          //                 "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
          //               "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
          //             "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
          //           "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
          //                   "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
          //                 "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
          //                 "avec":snap.val()[a].roomhistory[this.currentstartday][b].avec,
          //                 "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
          //                 "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
          //                 "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
          //               "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
          //               "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
          //             "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt
          //           })
          //           // this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
          //         }
          //     }
              
          //   }
          // }
      
      }

      //console.log("this is finished room result")
      //console.log(this.noagasi);
      //console.log(this.agasinum);
      this.mainlist.sort(function(a, b) {
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      //console.log("after sorting...")
      //console.log(this.mainlist)


      this.mainlist_finished.sort(function(a, b) {
        //console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });
    });
    //console.log(this.mainlist);
  }
  editing(a){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    //console.log("editing...")
    //console.log(a);
    let modal = this.modal.create(EditingroomPage,{"user":this.directorList, "mainlist":this.mainlist,"mainlist_finished":this.mainlist_finished, "a":a,"allroom":this.allroom,"bu":this.bu});
    modal.onDidDismiss(url => {
      //console.log("EditingroomPageEditingroomPageEditingroomPageEditingroomPageEditingroomPage");
      //console.log(url);
      if(url!=undefined){
        if(url.result){
          
        //console.log("do nothing1");
        }else{

        //console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
          },1500)
        }
      }else{
        //console.log("do nothing");
      }
    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      
      this.navCtrl.setRoot(LoginpagePage)
  }
  confirmwaiting(){
    console.log("confirmwaiting");
    console.log(this.incharge);
    console.log(this.avec);
    console.log(this.numofpeople);
    if(this.incharge.length==0){
      window.alert("담당자를 선택해주세요");
      return;
    }
    if(this.avec.length==0){
      window.alert("동반자 여부를 선택해주세요");
      return;
    }
    if(this.numofpeople.length==0){
      window.alert("인원을 선택해주세요");
      return;
    }
    var date = new Date();
  
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    var dte = new Date();
    var fulldate = this.currentstartday;
    var key =  this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").push().key ;
    if(this.avec.trim()=="Y"){
      this.avec=true;
    }else{
      this.avec=false;
    }
    this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").child(key).update({"avec":this.avec, "incharge":this.incharge,"numofpeople":this.numofpeople,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
    
  }
  addRoom(room){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(WaitingmodalPage,{"room":room,"bu":this.bu});
    modal.onDidDismiss(url => {
      if(url!=undefined){
        if(url.result){
          
        //console.log("do nothing1");
        }else{

        //console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
          },300)
        }
      }else{
        //console.log("do nothing");
      }
    

    });

    modal.present();
  }
}
