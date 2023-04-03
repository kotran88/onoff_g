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
  newarray:any=[];
  newarrayfin:any=[];
  status:any;
  wt:any;
  key:any;
  numofpeople:any="";
  currentstartday:any="";
  currentstart:any="";
  end_date:any="";
  name:any;
  date:any;
  firemain = firebase.database().ref();
  company:any;
  avec:any;
  constructor(public util:UtilsProvider, public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
     this.a = this.navParams.get("a");
     this.company = localStorage.getItem("company");
     this.name = localStorage.getItem("name");
     this.currentstart=localStorage.getItem("start");
     this.currentstartday=localStorage.getItem("startDate");
    console.log(this.a);
    this.room = this.a.name
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
  cancel(){

    this.view.dismiss();
  }
  addHours(numOfHours, date = new Date()) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
  }
  confirm(){
    console.log(this.end_date);
    if(this.end_date==undefined){
      
    }
    this.end_date = new Date();
    console.log(this.end_date);
    var end_date_full =  new Date();
    var a = this.addHours(9,end_date_full);
    console.log(a)
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
                      console.log("this should be deleted and pulled in a row")
                      console.log("v")
                      console.log(snap.val()[a].roomhistory[this.currentstartday][b].key)
                      console.log(this.a.key)
                      this.newarrayfin.push({"bu":snap.val()[a].roomhistory[this.currentstartday][b].bu,
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
                      
                    if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full!=undefined){
                      this.newarrayfin.push({"bu":snap.val()[a].roomhistory[this.currentstartday][b].bu,
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
                      this.newarray.push({"bu":snap.val()[a].roomhistory[this.currentstartday][b].bu,
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
    if(this.status=="fin"){
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
        "name":this.room,
        
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
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({
        "name":this.room,
        
        "avec":this.avec,
        "wt":this.wt,
        "insert_date":this.insert_date,
        "status":this.status,
        "numofpeople":this.numofpeople,
        "incharge":this.incharge,
      })
    }
    
    var dte = new Date();

    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    
      
    this.view.dismiss();
  }

}
