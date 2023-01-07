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

  start:any;
  currentstartday:any="";
  currentstart:any="";
  mainlist_finished:any = [];
  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  company:any="";
  constructor(public menuCtrl: MenuController ,public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");

    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

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
              if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
                
              }else{
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
                
              }
              
            }
          }
        }
       
        
      }
      console.log(this.mainlist)
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
    let modal = this.modal.create(ChoicemodalPage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
      this.mainlist=[];
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        console.log(snap.val())
        for(var a in snap.val()){
          console.log("mmmm")
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory);
            console.log(snap.val()[a].roomhistory[this.currentstartday]);
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
              if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
               
              }else{
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
                
              }
              
            }
          }
          
        }
        console.log(this.mainlist)
      });
      //regenerate  
    });

    modal.present();
  };
  getTC(startdate){
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
   
    console.log(diffend);
    console.log(now);
    console.log("now hour and min");
    console.log(now.getHours());

    console.log(now.getMinutes());

    console.log("current enter date " );
    console.log(diffend.getHours());
    console.log(diffend.getMinutes());
    var diff = now.getTime() - diffend.getTime();
    console.log(diff);
    console.log(now.getTime());
    console.log(diffend.getTime());
    var diffMin = Math.ceil(diff / (1000) / 3600 * 60 );
    console.log(diffMin)
    var tctotal = Number(diffMin)/60;
    tctotal = Number(tctotal.toFixed(2));
    var mok = Math.floor(tctotal);
    var nameoji = tctotal -Math.floor(tctotal);
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
  async getIdOfagaci (name,totalmoney,room,key,number,tctotal){
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
          this.firemain.child("users").child(returnvalue).child("roomhistory").child(room).child(this.currentstartday).child(key).update({"end_date":hour+":"+min,"end_date_full":dte})
            
          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).child("agasi").child(number).update({"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney})


  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).update({"end_date":hour+":"+min,"end_date_full":dte})
  this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday+"").update({"flag":false,"lastupdated":dte});
    });
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
            totalmoney=Number(this.getTC(snap2.val().agasi[f]).split(",")[0]);
            var tctotal=Number(this.getTC(snap2.val().agasi[f]).split(",")[1]);
            console.log("totalmoney : "+totalmoney)
             this.getIdOfagaci(c.agasi[d].name,totalmoney,room,c.key,f,tctotal)+"";
            

          }
         
        }
       
      }
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
          console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          console.log(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full)
          if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
              if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
              }
            
          }else{
            if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
            this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
            this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
            }
          }
          
        }
      }
      
    }
    console.log(this.mainlist)
  });
  }
  end(c,room,mainlist){
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
                    var totalmoney=Number(this.getTC(snap2.val().agasi[d]).split(",")[0]);
                    var tctotal=Number(this.getTC(snap2.val().agasi[d]).split(",")[1]);
                    console.log(totalmoney);
                    console.log(tctotal);
     this.firemain.child("users").child(selectedid).child("current").remove();
     console.log(mainlist.key)
              this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"end_date":hour+":"+min,"end_date_full":dte})
                    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney})
                  }
                }
                console.log(snap.val().agasi)
              });
  
            }
          }
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
