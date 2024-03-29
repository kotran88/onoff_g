import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
import { HTTP } from '@ionic-native/http/ngx';
/**
 * Generated class for the EditingroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editingroom',
  templateUrl: 'editingroom.html',
})
export class EditingroomPage {
  token:any;
  a:any;
  jopan:any;
  id:any;
  room:any;
  incharge:any;
  team:any="";
  insert_date:any;
  midroom:any=[];
  smallroom:any=[];
  bigroom:any=[];
  allroom:any=[];
  thisisarray:any=[];
  newarray:any=[];
  newarrayfin:any=[];
  status:any;
  wt:any;
  key:any;
  numofpeople:any="";
  currentstartday:any="";
  currentstart:any="";
  end_date:any="";
  bu:any="";
  name:any;
  date:any;
  firemain = firebase.database().ref();
  company:any;
  avec:any;
  logic:any=0;
  directorList:any=[];
  mainlist_finished=[];
  mainlist=[];
  booleanValue3:any=false;
  nomemo:any="";
  rnumber=0;
  firststatus:any=false;
  nickname:any;
  constructor(public util:UtilsProvider, public http:HTTP,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
     console.log("a is : ");
     this.token = localStorage.getItem("token");
    this.nickname= localStorage.getItem("nickname");
     console.log(this.a);
     this.mainlist= this.navParams.get("mainlist");
      this.mainlist_finished= this.navParams.get("mainlist_finished");

      var orderedQuery = this.firemain.child("users").orderByChild("type");
      orderedQuery.once("value", (snapshot) => {
       snapshot.forEach((childSnapshot) => {
         var childData = childSnapshot.val();
          this.directorList.push(childData);
       })
  
      });

    //  this.directorList=JSON.parse(localStorage.getItem("director"))

     console.log(this.directorList);
     this.company = localStorage.getItem("company");
     this.name = localStorage.getItem("nickname");
     this.currentstart=localStorage.getItem("start");
     this.currentstartday=localStorage.getItem("startDate");
      this.allroom = this.navParams.get("allroom");
      if(this.a.noflag==undefined){

      this.booleanValue3=false;
      }else{

      this.booleanValue3=this.a.noflag;
      }
      this.firststatus = this.booleanValue3;
      this.nomemo=this.a.nomemo;
    console.log(this.a);
    console.log(this.firststatus);
    console.log("was firststatus");
    this.room = this.a.name
    this.rnumber=this.room;
    this.bu=this.a.bu;
    this.avec = this.a.avec;
    this.logic = this.a.logic;



    
    this.key=this.a.key;
    this.status = this.a.status;
    this.date=this.a.date;
    this.numofpeople = this.a.numofpeople;
    // this.end_date=this.a.end_date;
    this.incharge=this.a.incharge;
    this.wt=this.a.wt;
    this.insert_date=this.a.insert_date;

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditingroomPage');
  }
  clickforlogic(v){

    //console.log("v is "+v);
    if(v==0){
      this.logic=1;
    }
    if(v==1){
      this.logic=2;
    }
    if(v==2){
      this.logic=0;
    }
  }
  clicking2(v){
    console.log("clicking2")
    if(this.booleanValue3){
      window.alert("변경불가");
      return;
    }
    console.log(v);
    console.log(v.avec);
    console.log(this.avec);
    if(this.avec==1){
      console.log("make it false")
      this.avec=0;
    }else{
      this.avec=1;
    }
  }
  clicking(v){
    if(this.booleanValue3){
      window.alert("변경불가");
      return;
    }
    if(v==2){
      //입실일때 누름. 
      this.status="reserved";
    }
    if(v==3){
      //예약일때 누름. 
      this.status="fin";
    }
    if(v==4){
      //종료일때 누름. 
      this.status="entered";
    }
  }

  clicking3(v){

    //console.log("clicking3..."+v)
    if(v==0){
      this.bu=1;
    }
    if(v==1){
      this.bu=2;
    }
    if(v==2){
      this.bu=0;
    }
  }
    myChange3(v){
    console.log(v.checked);
    this.booleanValue3=v.checked;
    console.log(this.booleanValue3)
    if(this.booleanValue3){

    }else{
      this.nomemo="";
    }
  }

  cancel(){

    this.view.dismiss({"result":true});
  }
  addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }
  confirm(){
    console.log(this.mainlist);
    console.log("confirm....");
    var occupylist=[];
    console.log(this.room); //realtime 
    console.log(this.a);
    console.log(this.a.name);
    var occupied=false;
      var alreadyin=false;
      for(var ii in this.allroom){
        //check if the room is already reserved
        if(this.allroom[ii].name==this.room){
          occupied=true;
        }
      }
      
      if(!occupied){
        window.alert("존재하지 않는 방 번호입니다. 다시 입력해주세요.")
        this.util.dismissLoading();
        return;
      }
      var vacancy=false;
      for(var iii in this.directorList){
        //compare the name of the person who is in charge of the room
        if(this.directorList[iii].nickname!=undefined){
          if(this.directorList[iii].nickname.trim()==this.incharge.trim()){
            vacancy=true;
          }
        }
        
      }
      
  
      if(!vacancy){
        window.alert("존재하지 않는 담당자입니다. 다시 입력해주세요.")
        this.util.dismissLoading();
        return;
      }

      console.log(this.room);
      console.log(this.a.name);
    if(this.room!=this.a.name){
      console.log(" change room name");
      //방번호를 변경했을경우...활성화된방인지 검증. 
      for(var aa in this.mainlist){
          if(this.mainlist[aa].name==this.room){
            window.alert("이미 활성화된 방이므로 바꿀수없습니다.");
            this.view.dismiss();
            return;

          }
      }

    }else{
      //방번호 변경 안했을경우
      console.log("no change room name");
      
     
    }
    if(this.status=="fin"){
      this.http.patch("https://captainq.wadteam.com/captainq/apis/currentroom",{"room_name": this.room,"idx":this.a.key,"cmd":"fin","finished_by":this.nickname,"updated_by":this.nickname},{"token":this.token}).then(data => {
        console.log(data);
        var a = JSON.parse(data.data)
        console.log(a);
        console.log(a.rst_content);
        console.log(a.rst_content.toString());
        if(a.rst_content.toString()=="수정 완료"){
          // window.alert("수정 완료");
        }


        
      });
    }else if(this.status=="entered"){
      this.http.patch("https://captainq.wadteam.com/captainq/apis/currentroom",{"room_name": this.room,"idx":this.a.key,"cmd":"entered","updated_by":this.nickname},{"token":this.token}).then(data => {
        console.log(data);
        var a = JSON.parse(data.data)
        console.log(a);
        console.log(a.rst_content);
        console.log(a.rst_content.toString());
        if(a.rst_content.toString()=="수정 완료"){
          // window.alert("수정 완료");
        }
      });
    }else if(this.status=="reserved"){
      this.http.patch("https://captainq.wadteam.com/captainq/apis/currentroom",{"room_name": this.room,"idx":this.a.key,"cmd":"reserved","updated_by":this.nickname},{"token":this.token}).then(data => {
        console.log(data);
        var a = JSON.parse(data.data)
        console.log(a);
        console.log(a.rst_content);
        console.log(a.rst_content.toString());
        if(a.rst_content.toString()=="수정 완료"){
          // window.alert("수정 완료");
        }
      });
    }else{
      window.alert("else...");
    }

    this.view.dismiss();


  //   this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
  //     console.log(snap.val());
  //     this.util.presentLoading();
  //     var dte = new Date();
  //     //console.log(this.mainlist);
  //     //console.log(this.mainlist_finished);
  //     var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
      
      
  //     if(this.firststatus){
  //       //사용불가방일경우...
  //       if(!this.booleanValue3){
  //         this.firemain.child("company").child(this.company).child("roomlist").child(this.room).update({"flag":false})
  //       }else{
  //         this.firemain.child("company").child(this.company).child("roomlist").child(this.room).update({"flag":true})
  //       }
        
  //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.room).child(this.a.key).update({
  //         "nomemo":this.nomemo,
  //         "noflag":this.booleanValue3
  //     }).then(()=>{
      
      
  //     })
  //     this.view.dismiss({"result":false});
      
  //     return;
  //     }else{
  //     }
      
  //     //console.log(this.end_date);
  //     if(this.end_date==undefined){
        
  //     }
  //     this.end_date = new Date();
  //     //console.log(this.end_date);
  //     var end_date_full =  new Date();
  //     var a = this.addHours(9,end_date_full);
  //     //console.log(a)
  //     //console.log(this.status);
  //     // end_date_full = this.end_date.setHours(this.end_date.getHours()+9);
  //     // //console.log(this.end_date);
  
  
  
      
  //     if(this.status=="fin"){
  //      console.log("this is fin...");
  //       this.firemain.child("company").child(this.company).child("roomlist").child(this.room).update({"flag":false})
  //       //완료처리...!
  //      console.log("1111.");
  //       var countingvalue=0;
  //       var fin_countingvalue=0;
  //       console.log(this.key);
  //       console.log(this.a.name);
  //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.key).once('value').then((snap)=>{
          
  //      console.log("2222.");
  
  //      //finish all agasi...
  //      console.log(snap.val());
  //      for(var aa in snap.val().agasi){
  //       console.log("snap.val().agasi : ");
  //       console.log(snap.val().agasi[aa]);
  //         var totalmoney=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[0]);
  //         var tctotal=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[1]);
  //         var bantee=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[2]);
  
  //         this.firemain.child("users").child(snap.val().agasi[aa].name).child("current").remove();
  //         var dte = new Date();
  
  //         var date = new Date();
  //         var year=date.getFullYear();
  //         var month=date.getMonth()+1;
  //         var day = date.getDate();
  //         var hour = date.getHours();
  //         var min = date.getMinutes();
  //         this.firemain.child("users").child(snap.val().agasi[aa].name).child("current").remove();
  //   // this.firemain.child("users").child(this.id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update({"name":snap.val().agasi[aa].name,  "date":snap.val().agasi[aa].date,"incharge":this.a.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
  //         this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").child(aa).update({"roomno":this.a.name, "incharge":this.a.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
  
  
  
  
  //         this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("message").push({"tc":tctotal,"agasi":"", "bantee":bantee,"totalmoney":totalmoney,"date":endtime,"contents":"방 종료 ","type":"roomfin", "uploader":this.name, "name":"system"})
  
  //     }
  //     console.log("snap.val() : ");
  //     console.log(snap.val());
  
  
  //                       console.log("key:::"+this.a.key);
  //                         if(this.a.key == snap.val().key){
  
  //                           console.log("result....333")
  //                           console.log("this should be deleted and pulled in a row")
  //                           console.log("v")
  //                           console.log(snap.val().key)
  //                           console.log(this.a.key)
  //                           this.newarrayfin.push({"bu":this.bu,
  //                           "date":snap.val().date,
  //                           "flag":snap.val().flag,
  //                           "incharge":snap.val().incharge,
  //                           "incharge_date_full":snap.val().incharge_date_full,
  //                           "key":snap.val().key,
  //                           "last_updated":snap.val().last_updated,
  //                           "lastupdated":snap.val().lastupdated,
  //                           "lastupdatedperson":snap.val().lastupdatedperson,
  //                           "name":snap.val().name,
  //                           "numofpeople":snap.val().numofpeople,
  //                           "status":snap.val().status,
  //                           "wt":snap.val().wt,
  //                           "v":snap.val().v})
  //                         }else{
                            
  //                           console.log("resulttttt....222")
  //                         if(snap.val().end_date_full!=undefined){
  //                           this.newarrayfin.push({"bu":this.bu,
  //                           "date":snap.val().date,
  //                           "flag":snap.val().flag,
  //                           "avec":this.avec,
  //                           "incharge":snap.val().incharge,
  //                           "incharge_date_full":snap.val().incharge_date_full,
  //                           "key":snap.val().key,
  //                           "last_updated":snap.val().last_updated,
  //                           "lastupdated":snap.val().lastupdated,
  //                           "lastupdatedperson":snap.val().lastupdatedperson,
  //                           "name":snap.val().name,
  //                           "numofpeople":snap.val().numofpeople,
  //                           "status":snap.val().status,
  //                           "wt":snap.val().wt,
  //                           "v":snap.val().v})
  //                         }else{
  //                           console.log("result....333")
  //                           this.newarray.push({"bu":this.bu,
  //                           "date":snap.val().date,
  //                           "flag":snap.val().flag,
      
  //                           "avec":this.avec,
  //                           "incharge":snap.val().incharge,
  //                           "incharge_date_full":snap.val().incharge_date_full,
  //                           "key":snap.val().key,
  //                           "last_updated":snap.val().last_updated,
  //                           "lastupdated":snap.val().lastupdated,
  //                           "lastupdatedperson":snap.val().lastupdatedperson,
  //                           "name":snap.val().name,
  //                           "numofpeople":snap.val().numofpeople,
  //                           "status":snap.val().status,
  //                           "wt":snap.val().wt,
  //                           "v":snap.val().v})
  //                         }
                           
  //                         }
                     
                      
                    
  
  
  //         console.log("this.newarray initialized")
  //         console.log(this.newarray);
  //         console.log(this.newarrayfin);
  //         for(var i=0; i<this.newarrayfin.length; i++){
  //           //console.log(this.newarrayfin[i].v);
  //           this.newarrayfin[i].v=(i+1);
  //         }
  //         var countingvalue=0;
  //         //console.log(this.newarray.length)
  //         for(var i=0; i<this.newarray.length; i++){
  //           //console.log(this.newarray[i].v);
  //           this.newarray[i].v=(i+1);
  //         }
  //         this.newarrayfin.sort(function(a, b) {
  //           return a.v - b.v;
  //         });
  //         this.newarray.sort(function(a, b) {
  //           return a.v - b.v;
  //         });
  //         console.log("this.newarray")
  //         console.log(this.newarray)
  //         for(var i=0; i<this.newarray.length; i++){
  //           //console.log(this.newarray[i].v);
  //           this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.newarray[i].name).child(this.newarray[i].key).update({"v":this.newarray[i].v})
  //         }
  //         for(var i=0; i<this.newarrayfin.length; i++){
  //           //console.log(this.newarrayfin[i].v);
  //           this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.newarrayfin[i].name).child(this.newarrayfin[i].key).update({"v":this.newarrayfin[i].v})
  //         }
          
  //       });
  //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({"flag":false})
  //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).once("value",snap=>{
  //           this.firemain.child("users").child(this.incharge).once("value",snap2=>{
  
  //                 console.log(snap2.val());
  //                 this.team = snap2.val().young
  //                 this.jopan = snap2.val().jopan;
  //                 this.id=snap2.val().nickname;
  //               if(snap2.val().type=="agasi"){
  //                 for(var aa in snap.val().agasi){
  //                   console.log("snap.val().agasi : ");
  //                   console.log(snap.val().agasi[aa]);
  //                     var totalmoney=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[0]);
  //                     var tctotal=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[1]);
  //                     var bantee=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[2]);
  
  //                     this.firemain.child("users").child(snap2.val().id).child("current").remove();
  //                     var dte = new Date();
  
  //                     var date = new Date();
  //                     var year=date.getFullYear();
  //                     var month=date.getMonth()+1;
  //                     var day = date.getDate();
  //                     var hour = date.getHours();
  //                     var min = date.getMinutes();
  //                     this.firemain.child("users").child(snap.val().agasi[aa].name).child("current").remove();
  //               this.firemain.child("users").child(this.id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update({"name":snap.val().agasi[aa].name,  "date":snap.val().agasi[aa].date,"incharge":this.a.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
  //                     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").child(aa).update({"roomno":this.a.name, "incharge":this.a.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
  
  
  
  
  //                     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("message").push({"tc":tctotal,"agasi":snap2.val().name, "bantee":bantee,"totalmoney":totalmoney,"date":endtime,"contents":"방 종료 ","type":"roomfin", "uploader":this.name, "name":"system"})
  
  //                 }
  //               }
  
  //           });
  
  
  //       });
        
  //     }else{
  //       ///not fin
  //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({"flag":true})
  //     }
  
  //     this.firemain.child("users").child(this.incharge).once("value",snap2=>{
  //         //console.log(snap2.val()[b]);
  //         this.team = snap2.val().young
  //         if(snap2.val().jopan==undefined){
  //           this.jopan = "팀없음";
  //         }else{
  //           this.jopan=snap2.val().jopan;
  //         }
          
  //         this.id=snap2.val().nickname;
  //     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).once("value",snap=>{
  //       //console.log(snap.val());
  //       var agasi=[];
  //         var ss =false
  //       if(snap.val().ss==undefined){
         
  //       }else{
  //         ss=snap.val().ss;
  //       }
  //       if(snap.val().agasi==undefined){
         
  //       }else{
  //         agasi=snap.val().agasi;
  //       }
  
  //       console.log(snap.val());
  //       console.log("agasi is:"+agasi);
  //       console.log(agasi);
       
  //       //console.log("ss is:"+ss);
       
  //           //console.log(snap.val().logic);
  //           var orderlist=[];
  //           if(snap.val().orderlist==undefined){
  //           }else{
  //             orderlist=snap.val().orderlist;
  //           }
    
  //           if(this.status=="fin"){
  //             if(agasi.length!=0){
  //               for(var aga in agasi){
  //                 console.log(agasi[aga].name);
  //                 this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(agasi[aga].name).child("attend").update({"flag":"standby"});
  //               }
  //             }
  //             this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({
  //               "name":this.room,
  //               "bu":this.bu,
  //               "avec":this.avec,
  //               "wt":this.wt,
  //               "insert_date":this.insert_date,
  //               "end_date":this.end_date.getHours()+":"+this.end_date.getMinutes(),
  //               "end_date_full":end_date_full,
  //               "status":this.status,
  //               "logic":this.logic,
  //               "orderlist":orderlist,
  //               "numofpeople":this.numofpeople,
  //               "incharge":this.incharge,
  //               "bujangjopan":this.jopan,
  //                 "bujangyoung":this.team,
  //                 "directorId":this.id,
  //             })
  //             this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //               "name":this.room,
  //               "bu":this.bu,
  //               "avec":this.avec,
  //               "wt":this.wt,
  //               "insert_date":this.insert_date,
  //               "end_date":this.end_date.getHours()+":"+this.end_date.getMinutes(),
  //               "end_date_full":end_date_full,
  //               "status":this.status,
  //               "logic":this.logic,
  //               "orderlist":orderlist,
  //               "numofpeople":this.numofpeople,
  //               "incharge":this.incharge,
  //               "bujangjopan":this.jopan,
  //                 "bujangyoung":this.team,
  //                 "directorId":this.id,
  //             })
  //             this.firemain.child("users").child(this.id).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //               "name":this.room,
  //               "bu":this.bu,
  //               "avec":this.avec,
  //               "wt":this.wt,
  //               "insert_date":this.insert_date,
  //               "end_date":this.end_date.getHours()+":"+this.end_date.getMinutes(),
  //               "end_date_full":end_date_full,
  //               "status":this.status,
  //               "logic":this.logic,
  //               "orderlist":orderlist,
  //               "numofpeople":this.numofpeople,
  //               "incharge":this.incharge,
  //               "bujangjopan":this.jopan,
  //                 "bujangyoung":this.team,
  //                 "directorId":this.id,
  //             })
  //           }else{
  //             if(this.a.name==this.room){
  //               //방번호는 안바꿈. 
  //               console.log("no chnge room!")
  //               console.log(this.a.name);
  //               console.log(this.a.key);
  //               console.log(this.a);
  //               console.log(agasi);
  //               console.log(this.logic);
  //             if(agasi.length==0){
  //               this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({
  //                 "bujangjopan":this.jopan,
  //                 "bujangyoung":this.team,
  //                 "directorId":this.id,
  //                 "bu":this.bu,
  //                 "ss":ss,
  //                 "insert_date":snap.val().insert_date,
  //                 "date":snap.val().date,
  //                 "flag":snap.val().flag,
  //                 "logic":this.logic,
  //                 "avec":this.avec,
  //                 "incharge":this.incharge,
  //                 "key":snap.val().key,
  //                 "last_updated":snap.val().last_updated,
  //                 "orderlist":orderlist,
  //                 "lastupdated":snap.val().lastupdated,
  //                 "lastupdatedperson":snap.val().lastupdatedperson,
  //                 "name":this.room,
  //                 "numofpeople":this.numofpeople,
  //                 "status":this.status,
  //                 "wt":this.wt,
  //                 "v":snap.val().v
  //             })
  //           }else{
  //             this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.room).child(this.a.key).update({
  //               "agasi":snap.val().agasi,
  //               "bujangjopan":this.jopan,
  //               "bujangyoung":this.team,
  //               "directorId":this.id,
  //               "bu":this.bu,

  //               "logic":this.logic,
  //               "ss":ss,
  //               "insert_date":snap.val().insert_date,
  //               "date":snap.val().date,
  //               "flag":snap.val().flag,
  //               "orderlist":orderlist,
  //               "avec":this.avec,
  //               "incharge":this.incharge,
  //               "key":snap.val().key,
  //               "last_updated":snap.val().last_updated,
  //               "lastupdated":snap.val().lastupdated,
  //               "lastupdatedperson":snap.val().lastupdatedperson,
  //               "name":this.room,
  //               "numofpeople":this.numofpeople,
  //               "status":this.status,
  //               "wt":this.wt,
  //               "v":snap.val().v
  //           })
  //           }
  //             }else{
  //               console.log("change room!!!!")
  //               console.log(this.a);
  //               console.log(this.company);
  //               console.log(this.currentstartday)
  //               console.log(this.a.name);
  //               console.log(this.a.key);
  //               this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).update({"flag":false})
  //               this.firemain.child("company").child(this.company).child("roomlist").child(this.room).update({"flag":true})
  //               this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).remove().then(()=>{
                  
  //               });
  
  //               if(agasi.length==0){
  //                 this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.room).child(this.a.key).update({
  //                   "bujangjopan":this.jopan,
  //                   "bujangyoung":this.team,
  //                   "directorId":this.id,
  //                   "bu":this.bu,
  //                   "ss":ss,
  //                   "insert_date":snap.val().insert_date,
  //                   "date":snap.val().date,
  //                   "flag":snap.val().flag,
  //                   "logic":this.logic,
  //                   "avec":this.avec,
  //                   "incharge":this.incharge,
  //                   "key":snap.val().key,
  //                   "last_updated":snap.val().last_updated,
  //                   "orderlist":orderlist,
  //                   "lastupdated":snap.val().lastupdated,
  //                   "lastupdatedperson":snap.val().lastupdatedperson,
  //                   "name":this.room,
  //                   "numofpeople":this.numofpeople,
  //                   "status":this.status,
  //                   "wt":this.wt,
  //                   "v":snap.val().v
  //               })
  //             }else{
                
  //               this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.room).child(this.a.key).update({
  //                 "agasi":snap.val().agasi,
  //                 "bujangjopan":this.jopan,
  //                 "bujangyoung":this.team,
  //                 "directorId":this.id,
  //                 "bu":this.bu,
  //                 "logic":this.logic,
  //                 "ss":ss,
  //                 "insert_date":snap.val().insert_date,
  //                 "date":snap.val().date,
  //                 "flag":snap.val().flag,
  //                 "orderlist":orderlist,
  //                 "avec":this.avec,
  //                 "incharge":this.incharge,
  //                 "key":snap.val().key,
  //                 "last_updated":snap.val().last_updated,
  //                 "lastupdated":snap.val().lastupdated,
  //                 "lastupdatedperson":snap.val().lastupdatedperson,
  //                 "name":this.room,
  //                 "numofpeople":this.numofpeople,
  //                 "status":this.status,
  //                 "wt":this.wt,
  //                 "v":snap.val().v
  //             })
  //             }
  //             }
             
  //             if(agasi.length==0){
                            
  //                         this.firemain.child("users").child(this.id).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //                           "bujangjopan":this.jopan,
  //                           "bujangyoung":this.team,
  //                           "directorId":this.id,
  //                           "bu":this.bu,
  //                           "ss":ss,
  //                           "insert_date":snap.val().insert_date,
  //                           "date":snap.val().date,
  //                           "flag":snap.val().flag,
  //                           "logic":this.logic,
  //                           "avec":this.avec,
  //                           "incharge":this.incharge,
  //                           "key":snap.val().key,
  //                           "last_updated":snap.val().last_updated,
  //                           "orderlist":orderlist,
  //                           "lastupdated":snap.val().lastupdated,
  //                           "lastupdatedperson":snap.val().lastupdatedperson,
  //                           "name":this.room,
  //                           "numofpeople":this.numofpeople,
  //                           "status":this.status,
  //                           "wt":this.wt,
  //                           "v":snap.val().v
  //                       })
  //                       this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //                         "bujangjopan":this.jopan,
  //                         "bujangyoung":this.team,
  //                         "directorId":this.id,
  //                         "bu":this.bu,
  //                         "ss":ss,
  //                         "insert_date":snap.val().insert_date,
  //                         "date":snap.val().date,
  //                         "flag":snap.val().flag,
  //                         "logic":this.logic,
  //                         "avec":this.avec,
  //                         "incharge":this.incharge,
  //                         "key":snap.val().key,
  //                         "last_updated":snap.val().last_updated,
  //                         "orderlist":orderlist,
  //                         "lastupdated":snap.val().lastupdated,
  //                         "lastupdatedperson":snap.val().lastupdatedperson,
  //                         "name":this.room,
  //                         "numofpeople":this.numofpeople,
  //                         "status":this.status,
  //                         "wt":this.wt,
  //                         "v":snap.val().v
  //                     })
  //             }else{
                         
  
  //                       this.firemain.child("users").child(this.incharge).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //                         "agasi":snap.val().agasi,
  //                         "bujangjopan":this.jopan,
  //                         "bujangyoung":this.team,
  //                         "directorId":this.id,
  //                         "bu":this.bu,
  //                         "logic":this.logic,
  //                         "ss":ss,
  //                         "insert_date":snap.val().insert_date,
  //                         "date":snap.val().date,
  //                         "flag":snap.val().flag,
  //                         "orderlist":orderlist,
  //                         "avec":this.avec,
  //                         "incharge":this.incharge,
  //                         "key":snap.val().key,
  //                         "last_updated":snap.val().last_updated,
  //                         "lastupdated":snap.val().lastupdated,
  //                         "lastupdatedperson":snap.val().lastupdatedperson,
  //                         "name":this.room,
  //                         "numofpeople":this.numofpeople,
  //                         "status":this.status,
  //                         "wt":this.wt,
  //                         "v":snap.val().v
  //                     })
  
  //                     this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
  //                       "agasi":snap.val().agasi,
  //                       "bujangjopan":this.jopan,
  //                       "bujangyoung":this.team,
  //                       "directorId":this.id,
  //                       "bu":this.bu,
  //                       "logic":this.logic,
  //                       "ss":ss,
  //                       "insert_date":snap.val().insert_date,
  //                       "date":snap.val().date,
  //                       "flag":snap.val().flag,
  //                       "orderlist":orderlist,
  //                       "avec":this.avec,
  //                       "incharge":this.incharge,
  //                       "key":snap.val().key,
  //                       "last_updated":snap.val().last_updated,
  //                       "lastupdated":snap.val().lastupdated,
  //                       "lastupdatedperson":snap.val().lastupdatedperson,
  //                       "name":this.room,
  //                       "numofpeople":this.numofpeople,
  //                       "status":this.status,
  //                       "wt":this.wt,
  //                       "v":snap.val().v
  //                   })
  //             }
            
  //           }
  //       });
  // console.log("edit room finished!!!");
  //   });
     
     
      
        
  //     this.view.dismiss({"result":false});
  //   });

    // }


  }

}
