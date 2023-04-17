import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
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
  a:any;
  room:any;
  incharge:any;
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
  directorList:any=[];
  constructor(public util:UtilsProvider, public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
     this.directorList=JSON.parse(localStorage.getItem("director"))
     console.log(this.directorList);
     this.company = localStorage.getItem("company");
     this.name = localStorage.getItem("name");
     this.currentstart=localStorage.getItem("start");
     this.currentstartday=localStorage.getItem("startDate");
      this.allroom = this.navParams.get("allroom");

    console.log(this.a);
    this.room = this.a.name
    this.bu=this.a.bu;
    this.avec = this.a.avec;
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
    console.log('ionViewDidLoad EditingroomPage');
  }
  clicking2(v){
    console.log("v is "+v);
    console.log(v);
    console.log(v.avec);
    console.log(this.avec);
    if(v.avec==true){
      console.log("make it false")
      this.avec=!this.avec;
    }else{
      this.avec=!this.avec;
    }
  }
  clicking(v){
    if(v==1){
      this.status="entered";
    }
    if(v==2){
      this.status="clean";
    }
    if(v==3){
      this.status="fin";
    }
    if(v==4){
      this.status="reserved";
    }
  }

  clicking3(v){
    console.log("clicking3..."+v)
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
  cancel(){

    this.view.dismiss();
  }
  addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }
  confirm(){
    console.log("confirm...........")
    console.log(this.smallroom);
    console.log(this.midroom);
    console.log(this.bigroom);
    var occupied=false;
    for(var ii in this.allroom){
      //check if the room is already reserved
      if(this.allroom[ii].name==this.room){
        occupied=true;
      }
    }
    
    if(!occupied){
      window.alert("존재하지 않는 방 번호입니다. 다시 입력해주세요.")
      return;
    }
    var vacancy=false;
    for(var iii in this.directorList){
      //compare the name of the person who is in charge of the room
      
      if(this.directorList[iii].name.trim()==this.incharge.trim()){
        vacancy=true;
      }
    }
    

    if(!vacancy){
      window.alert("존재하지 않는 담당자입니다. 다시 입력해주세요.")
      return;
    }
    console.log(this.end_date);
    if(this.end_date==undefined){
      
    }
    this.end_date = new Date();
    console.log(this.end_date);
    var end_date_full =  new Date();
    var a = this.addHours(9,end_date_full);
    console.log(a)
    console.log(this.status);
    // end_date_full = this.end_date.setHours(this.end_date.getHours()+9);
    // console.log(this.end_date);
    if(this.status=="fin"){

      //완료처리...!
      var countingvalue=0;
      var fin_countingvalue=0;
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        
        for(var a in snap.val()){

          if(snap.val()[a].roomhistory!=undefined){
            console.log("mmmm")
            console.log(snap.val()[a].roomhistory)
                  for(var b in snap.val()[a].roomhistory[this.currentstartday]){
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].v)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full!=undefined){
                      // console.log("fin")
                    }
                    if(this.a.key == snap.val()[a].roomhistory[this.currentstartday][b].key){

                      console.log("result....333")
                      console.log("this should be deleted and pulled in a row")
                      console.log("v")
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b].key)
                      console.log(this.a.key)
                      this.newarrayfin.push({"bu":this.bu,
                      "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "flag":snap.val()[a].roomhistory[this.currentstartday][b].flag,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                      "incharge_date_full":snap.val()[a].roomhistory[this.currentstartday][b].incharge_date_full,
                      "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                      "last_updated":snap.val()[a].roomhistory[this.currentstartday][b].last_updated,
                      "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                      "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                      "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "v":snap.val()[a].roomhistory[this.currentstartday][b].v})
                    }else{
                      
                      console.log("result....222")
                    if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full!=undefined){
                      this.newarrayfin.push({"bu":this.bu,
                      "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "flag":snap.val()[a].roomhistory[this.currentstartday][b].flag,
                      "avec":this.avec,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                      "incharge_date_full":snap.val()[a].roomhistory[this.currentstartday][b].incharge_date_full,
                      "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                      "last_updated":snap.val()[a].roomhistory[this.currentstartday][b].last_updated,
                      "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                      "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                      "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "v":snap.val()[a].roomhistory[this.currentstartday][b].v})
                    }else{
                      console.log("result....333")
                      this.newarray.push({"bu":this.bu,
                      "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
                      "flag":snap.val()[a].roomhistory[this.currentstartday][b].flag,

                      "avec":this.avec,
                      "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
                      "incharge_date_full":snap.val()[a].roomhistory[this.currentstartday][b].incharge_date_full,
                      "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
                      "last_updated":snap.val()[a].roomhistory[this.currentstartday][b].last_updated,
                      "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
                      "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
                      "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
                      "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
                      "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
                      "v":snap.val()[a].roomhistory[this.currentstartday][b].v})
                    }
                     
                    }
                    
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                      if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                        countingvalue++;
                      }
                    }
                    if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                      if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                        fin_countingvalue++;
                      }
                    }
                  }
            }
        }


        console.log(this.newarrayfin);
        for(var i=0; i<this.newarrayfin.length; i++){
          console.log(this.newarrayfin[i].v);
          this.newarrayfin[i].v=(i+1);
        }
        console.log(this.newarray);
        var countingvalue=0;
        console.log(this.newarray.length)
        for(var i=0; i<this.newarray.length; i++){
          console.log(this.newarray[i].v);
          this.newarray[i].v=(i+1);
        }
        this.newarrayfin.sort(function(a, b) {
          return a.v - b.v;
        });
        this.newarray.sort(function(a, b) {
          return a.v - b.v;
        });
        console.log("this.newarray")
        console.log(this.newarray)
        for(var i=0; i<this.newarray.length; i++){
          console.log(this.newarray[i].v);
          this.firemain.child("company").child(this.company).child("roomlist").child(this.newarray[i].name).child("roomhistory").child(this.currentstartday).child(this.newarray[i].key).update({"v":this.newarray[i].v})
        }
        for(var i=0; i<this.newarrayfin.length; i++){
          console.log(this.newarrayfin[i].v);
          this.firemain.child("company").child(this.company).child("roomlist").child(this.newarrayfin[i].name).child("roomhistory").child(this.currentstartday).child(this.newarrayfin[i].key).update({"v":this.newarrayfin[i].v})
        }
        
      });
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"flag":false})
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).once("value",snap=>{
        // this.thisisarray.push({"bu":this.bu,
        // "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
        // "flag":snap.val()[a].roomhistory[this.currentstartday][b].flag,
        // "avec":this.avec,
        // "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
        // "incharge_date_full":snap.val()[a].roomhistory[this.currentstartday][b].incharge_date_full,
        // "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
        // "last_updated":snap.val()[a].roomhistory[this.currentstartday][b].last_updated,
        // "lastupdated":snap.val()[a].roomhistory[this.currentstartday][b].lastupdated,
        // "lastupdatedperson":snap.val()[a].roomhistory[this.currentstartday][b].lastupdatedperson,
        // "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
        // "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
        // "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
        // "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
        // "v":snap.val()[a].roomhistory[this.currentstartday][b].v})
          console.log(snap.val());
          this.firemain.child("users").once("value",snap2=>{
            for(var b in snap2.val()){
            //   console.log(b);
              if(snap2.val()[b].type=="agasi"){
                for(var aa in snap.val().agasi){
                  if(snap2.val()[b].name == snap.val().agasi[aa].name){
                    console.log("100...");
                    console.log(snap2.val()[b]);
                    console.log(snap2.val()[b].name);
                    console.log(snap.val().agasi[aa]);
                    var totalmoney=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[0]);
                    var tctotal=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[1]);
                    var bantee=Number(this.util.getTC(snap.val().agasi[aa],snap.val().agasi[aa].pausetime).split(",")[2]);
                    console.log(totalmoney);
                    console.log(tctotal);

                    this.firemain.child("users").child(snap2.val()[b].id).child("current").remove();
                    var dte = new Date();

                    var date = new Date();
                    var year=date.getFullYear();
                    var month=date.getMonth()+1;
                    var day = date.getDate();
                    var hour = date.getHours();
                    var min = date.getMinutes();
    dte.setHours(dte.getHours()+9);
              this.firemain.child("users").child(snap2.val()[b].id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update({"name":snap.val().agasi[aa].name,  "date":snap.val().agasi[aa].date,"incharge":this.a.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})
                    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(aa).update({"roomno":this.a.name,"incharge":this.a.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":this.a.wt})




                    this.firemain.child("company").child(this.company).child("roomlist").child(this.room).child("roomhistory").child(this.currentstartday).child(this.a.key).child("message").push({"tc":tctotal,"agasi":snap2.val()[b].name, "bantee":bantee,"totalmoney":totalmoney,"date":endtime,"contents":"방 종료 ","type":"roomfin", "uploader":this.name, "name":"system"})

                  }
                }
              }
            }
          });


      });
    
    }else{
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"flag":true})
    }
  
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).once("value",snap=>{
    console.log(snap.val());
    var agasi=[];
      var ss =false
    if(snap.val().ss==undefined){
     
    }else{
      ss=snap.val().ss;
    }
    if(snap.val().agasi==undefined){
     
    }else{
      agasi=snap.val().agasi;
    }
    console.log("agasi is:"+agasi);
    console.log("ss is:"+ss);
   
        console.log(snap.val());
        console.log(snap.val().logic);



        if(this.status=="fin"){
          this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
            "name":this.room,
            "bu":this.bu,
            "avec":this.avec,
            "wt":this.wt,
            "insert_date":this.insert_date,
            "end_date":this.end_date.getHours()+":"+this.end_date.getMinutes(),
            "end_date_full":end_date_full,
            "status":this.status,
            "numofpeople":this.numofpeople,
            "incharge":this.incharge,
          })
        }else{
          this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).remove();
          if(agasi.length==0){
            this.firemain.child("company").child(this.company).child("roomlist").child(this.room).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
              "bujangjopan":snap.val().bujangjopan,
              "bujangyoung":snap.val().bujangyoung,
              "directorId":snap.val().directorId,
              "bu":this.bu,
              "logic":snap.val().logic,
              "ss":ss,
              "insert_date":snap.val().insert_date,
              "date":snap.val().date,
              "flag":snap.val().flag,
              "avec":this.avec,
              "incharge":this.incharge,
              "key":snap.val().key,
              "last_updated":snap.val().last_updated,
              "lastupdated":snap.val().lastupdated,
              "lastupdatedperson":snap.val().lastupdatedperson,
              "name":this.room,
              "numofpeople":this.numofpeople,
              "status":this.status,
              "wt":this.wt,
              "v":snap.val().v
          })
          }else{
            this.firemain.child("company").child(this.company).child("roomlist").child(this.room).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
              "agasi":snap.val().agasi,
              "bujangjopan":snap.val().bujangjopan,
              "bujangyoung":snap.val().bujangyoung,
              "directorId":snap.val().directorId,
              "bu":this.bu,
              "logic":snap.val().logic,
              "ss":ss,
              "insert_date":snap.val().insert_date,
              "date":snap.val().date,
              "flag":snap.val().flag,
              "avec":this.avec,
              "incharge":this.incharge,
              "key":snap.val().key,
              "last_updated":snap.val().last_updated,
              "lastupdated":snap.val().lastupdated,
              "lastupdatedperson":snap.val().lastupdatedperson,
              "name":this.room,
              "numofpeople":this.numofpeople,
              "status":this.status,
              "wt":this.wt,
              "v":snap.val().v
          })
          }
        
        }

    });
   
    
    var dte = new Date();

    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    
      
    this.view.dismiss();
  }

}
