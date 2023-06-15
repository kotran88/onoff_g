import { ChoicemodalPage } from '../choicemodal/choicemodal';

import { IonicPage,ViewController,Content,LoadingController,ModalController, NavController,AlertController, NavParams } from 'ionic-angular';
import { Component ,NgZone,ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UtilsProvider } from '../../providers/utils/utils';
import  firebase from 'firebase';
import { ChoicePage } from '../choice/choice';
import { E, T } from '@angular/core/src/render3';
/**
 * Generated class for the ChoicedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicedetail',
  templateUrl: 'choicedetail.html',
})
export class ChoicedetailPage {

  @ViewChild(Content) content: Content;
  @ViewChild('contentElement', { read: ElementRef }) contentElementRef: ElementRef;
  @ViewChild('targetElement', { read: ElementRef }) targetElementRef: ElementRef;
  startX: number = 0;
  startY: number = 0;
  swipeDirection: 'none' | 'right' | 'left' = 'none';

  isDragging: boolean = false;
  totalMovement: number = 0;
  threshold: number = 100; // Adjust this value to set your desired threshold


   a :any ;
   newname:any="";
   numofpeople:any=0;
   inagasi:any=0;
   angelcount:any=0;
   v:any;
   moneyvalue:any=[];
   currentstartday:any="";
   mainlist_angel:any=[];
   currentstart:any="";
   activeclass='1';
   company:any="";
   modifyflag:any=false;
   name:any = "";
   nickname:any="";
  interval:any;
  mainlist_finished_status:any = [];
  mainlist_finished:any = [];
  mainlist_finished_clone:any = [];
  mainlist_finished_origin:any = [];
  mainlist_origin:any=[];
  mainlist:any = [];
  tempmainlist:any=[];
  firemain = firebase.database().ref();
  key:any;
  roomno:any;
  constructor(public alertCtrl:AlertController, public util:UtilsProvider,public view:ViewController,public loading:LoadingController,public modal:ModalController,public zone:NgZone, public navCtrl: NavController, public navParams: NavParams) {
    console.log("choice detail come...");
    this.a=this.navParams.get("a");
    this.v=this.navParams.get("v");
    this.nickname=localStorage.getItem("nickname");
    console.log(this.a);
    console.log(this.v);
    if(this.v==undefined){
      this.activeclass='1';
    }else if(this.v==1||this.v=="1"){
      this.activeclass='1';
    }else if (this.v==2||this.v=="2"){
      this.activeclass='2';
    }else if (this.v==3||this.v=="3"){
      this.activeclass='3';
    }else{
      this.activeclass='4';
    }
    console.log(this.a);
    this.company = localStorage.getItem("company");
   
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

    this.name = localStorage.getItem("name");
// this.presentLoading();
    // this.interval =setInterval(()=>{
    //   console.log("come minutes..")
    //   this.refreshforeverymin();
    //   // this.util.dismissLoading();
    //   // this.dismissLoading();
    // },1000*60)

  }
  ionViewWillLeave(){
    clearInterval(this.interval)
  }
  ionViewDidLeave(){

  }
  refresheverymin(){
    console.log("refresheveryminrefresheveryminrefresheverymin");
    console.log(this.mainlist);
    console.log(this.mainlist_finished);
    for(var c in this.mainlist){
      for(var d in this.mainlist[c].agasi){
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            var newtctotal = Math.floor(tctotal);
            var bantee=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[2]);
            this.mainlist[c].agasi[d].money=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            this.mainlist[c].agasi[d].bantee=bantee;
            console.log(this.mainlist[c].agasi[d]);
            console.log(this.mainlist[c].agasi[d].tc);
            console.log(this.mainlist[c].agasi[d].money);
            console.log(this.mainlist[c].agasi[d].bantee);
            console.log(this.mainlist[c].agasi[d].pausetime);
            console.log(this.mainlist[c].agasi[d].name);
          }
         
      }
    }

    for(var c in this.mainlist_finished){
      for(var d in this.mainlist_finished[c].agasi){
        if(this.mainlist_finished[c].agasi[d].findate!=undefined){

        }else{
          var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
          this.mainlist_finished[c].agasi[d].money=totalmoney;
          this.mainlist_finished[c].agasi[d].tc=tctotal;
          this.mainlist_finished[c].agasi[d].wantee=Math.floor(this.mainlist_finished[c].agasi[d].tc);
          this.mainlist_finished[c].agasi[d].chasam=Number((this.mainlist_finished[c].agasi[d].tc-Math.floor(this.mainlist_finished[c].agasi[d].tc)).toFixed(1) )
          console.log(this.mainlist_finished[c].agasi[d]);

        }
      }
    }

    for(var c in this.mainlist_angel){
      for(var d in this.mainlist_angel[c].agasi){
        if(this.mainlist_angel[c].agasi[d].findate!=undefined){

        }else{
          var totalmoney=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[1]);
          this.mainlist_angel[c].agasi[d].money=totalmoney;
          this.mainlist_angel[c].agasi[d].tc=tctotal;
        }
      }
    }
    console.log(this.mainlist);
    console.log(this.mainlist_finished);
    console.log(this.mainlist_finished_status)
    console.log(this.mainlist_angel);

  }
  justrefresh(){

    for(var c in this.mainlist){
      for(var d in this.mainlist[c].agasi){
          if(this.mainlist[c].agasi[d].findate!=undefined){

          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
            var newtctotal = Math.floor(tctotal);
            var bantee=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[2]);
            this.mainlist[c].agasi[d].money=totalmoney;
            this.mainlist[c].agasi[d].tc=tctotal;
            this.mainlist[c].agasi[d].bantee=bantee;
          }
         
      }
    }

    for(var c in this.mainlist_finished){
      for(var d in this.mainlist_finished[c].agasi){
        if(this.mainlist_finished[c].agasi[d].findate!=undefined){

        }else{
          var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
          this.mainlist_finished[c].agasi[d].money=totalmoney;
          this.mainlist_finished[c].agasi[d].tc=tctotal;
        }
      }
    }

    for(var c in this.mainlist_angel){
      for(var d in this.mainlist_angel[c].agasi){
        if(this.mainlist_angel[c].agasi[d].findate!=undefined){

        }else{
          var totalmoney=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[0]);
          var tctotal=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[1]);
          this.mainlist_angel[c].agasi[d].money=totalmoney;
          this.mainlist_angel[c].agasi[d].tc=tctotal;
        }
      }
    }
    console.log(this.mainlist);
    console.log(this.mainlist_finished);
    console.log(this.mainlist_finished_status)
    console.log(this.mainlist_angel);

  }
  refreshforeverymin(){

    this.interval = setInterval(()=>{
      console.log("refreshforeveryminrefreshforeveryminrefreshforeveryminrefreshforeveryminrefreshforeveryminrefreshforeverymin");

      for(var c in this.mainlist){
        for(var d in this.mainlist[c].agasi){
            if(this.mainlist[c].agasi[d].findate!=undefined){
  
            }else{
              var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
              var newtctotal = Math.floor(tctotal);
              var bantee=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[2]);
              this.mainlist[c].agasi[d].money=totalmoney;
              this.mainlist[c].agasi[d].tc=tctotal;
              this.mainlist[c].agasi[d].bantee=bantee;
            }
           
        }
      }
  
      for(var c in this.mainlist_finished){
        for(var d in this.mainlist_finished[c].agasi){
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){
  
          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
            this.mainlist_finished[c].agasi[d].money=totalmoney;
            this.mainlist_finished[c].agasi[d].tc=tctotal;
          }
        }
      }

      for(var c in this.mainlist_angel){
        for(var d in this.mainlist_angel[c].agasi){
          if(this.mainlist_angel[c].agasi[d].findate!=undefined){
  
          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[1]);
            this.mainlist_angel[c].agasi[d].money=totalmoney;
            this.mainlist_angel[c].agasi[d].tc=tctotal;
          }
        }
      }
      console.log(this.mainlist);
      console.log(this.mainlist_finished);
      console.log(this.mainlist_finished_status)
      console.log(this.mainlist_angel);

    },1000*60)
    
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
    // this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
    //   this.navCtrl.getActive().onDidDismiss(data => {

    //   })
    // });
  }
  choicestart(){
    console.log("gotodetail...")
    console.log(this.a);
    if(this.a.agasi==undefined){
      this.a.agasi=[];
    }
    console.log(this.a)
    console.log(this.mainlist[0])
    if(this.mainlist[0]!=undefined){

      this.a.agasi=this.mainlist[0].agasi;
    }
    console.log("r is....");
    console.log(this.a);
    this.firemain.child("company").child(this.company).child("choice").child(this.a.key).update({"status":"start","key":this.a.key, "name":this.a.name, "startdate":new Date()});
    let modal = this.modal.create(ChoicemodalPage,{"a":this.a,"numofpeople":this.numofpeople,"inagasi":this.inagasi,"angelcount":this.angelcount})
    modal.onDidDismiss(url => {
      this.firemain.child("company").child(this.company).child("choice").child(this.a.key).update({"status":"end","name":this.a.name, "enddate":new Date()});
    
      console.log(url);
      if(url==undefined){
        this.view.dismiss();
      }else if(url.result==true){
        this.refreshChoice2();
      }else if(url.result==false){
        console.log("do nothing....")
      }else if(url.result=="nono"){
        console.log("do nothing....")
        this.view.dismiss();
      }
      //this should refresh a....
      // this.refreshChoice2();
     

    });

    modal.present();
  }
/** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
screenSwitch(values) : void {
  console.log("screenSwitch");
  console.log(values);
 
    for (let i = 1; i <= 3; i++) { 
      console.log("i to none"+i);
      console.log("ion-label-area-" + i)
      console.log(document.getElementById("ion-label-area-"+i))
      document.getElementById("ion-label-area-"+i).style.display = "none"; 
    }
    console.log(document.getElementById("ion-label-area-" + values))
    document.getElementById("ion-label-area-" + values).style.display = "";
    this.zone.run(()=>{

      this.activeclass=values;
      console.log(this.activeclass)
    })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicedetailPage');
    // this.refreshforeverymin();

      // //  "child_added", "child_changed", "child_removed", or "child_moved."
      // this.firemain.child("company").child(this.company).child("roomlist").on('child_removed', function(snap, prevChildKey) {
      //   console.log("on on on on on child_removed.....")
      //   console.log(snap.val());
      //   console.log(prevChildKey);
      //   // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      // });
      // this.firemain.child("company").child(this.company).child("roomlist").on('child_moved', function(snap, prevChildKey) {
      //   console.log("on on on on on child_moved.....")
      //   console.log(snap.val());
      //   console.log(prevChildKey);
      //   // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      // });
      // this.firemain.child("company").child(this.company).child("roomlist").on('child_added', function(snap, prevChildKey) {
      //   console.log("on on on on on child_added.....")
      //   console.log(snap.val());
      //   // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      // });
      //   this.firemain.child("company").child(this.company).child("roomlist").on('child_changed', (snap, prevChildKey) =>{
      //     console.log("on on on on on child_changed.....")
      //     console.log(snap.val());
      //     console.log(prevChildKey);
      //     // this.refreshChoice2();
      //     // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      //   });
        
    this.refreshChoice2();
  }
  endall(c,room,mainlist,num) {
    console.group(num);
    console.log(this.mainlist_finished);
    this.util.presentLoading();
    
    console.log(c);
    console.log(room);
    console.log(mainlist);
    console.log(mainlist.agasi);
    if(num==2){
      mainlist.agasi = this.mainlist_finished[0].agasi;
    }else if (num==1){
      mainlist.agasi = this.mainlist[0].agasi;
    }
    console.log("----------endall----------");

    console.log(mainlist.agasi);
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{

      console.log("snap2 come...")
      // console.log(snap2.val())
      var totalsumtc="";
      for(var f in mainlist.agasi){
        console.log(mainlist.agasi[f])
        if(mainlist.agasi[f].findate==undefined){
          var tctotal=0;
         
            console.log(mainlist.agasi[f].name)
              var totalmoney=0;
              console.log(mainlist.agasi[f]);
              var id="";
              totalmoney=Number(this.util.getTC(mainlist.agasi[f],mainlist.agasi[f].pausetime).split(",")[0]);
             tctotal=(Number(this.util.getTC(mainlist.agasi[f],mainlist.agasi[f].pausetime).split(",")[1]) );
             console.log(totalsumtc+"tctotal::::"+tctotal);
             totalsumtc+=mainlist.agasi[f].name+":"+tctotal+" "
              var bantee=Number(this.util.getTC(mainlist.agasi[f],0).split(",")[2]);
              console.log("totalmoney : "+totalmoney)
              console.log(tctotal);
               this.getIdOfagaci(this.currentstartday,mainlist.agasi[f].name,totalmoney,room,c.key,f,tctotal,mainlist.wt,mainlist.incharge,mainlist,bantee)+"";
            
        }else{

        }
      }

      console.log("totalsumtc:"+totalsumtc);
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":totalsumtc,"date":endtime,"contents":"전체종료 ","type":"fin", "uploader":this.nickname, "name":"system"})
      console.log(this.currentstartday+",,,"+room+"////"+mainlist.key);
      if(num==2){
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true}).then(()=>{
        }).catch((e)=>{
          window.alert(e);
        })
      }
     
      // this.refreshChoice2();

      
    // this.activeclass="2";
      console.log("this is end all this is end all this is end all this is end all this is end all this is end all this is end all ")
    setTimeout(()=>{
      this.util.dismissLoading();
      
      this.refreshChoice2();
    },1000)
    // });
  }
  reinit(c,room,mainlist, f){

    
this.util.presentLoading();
    console.log("reinit come");
    console.log(c);
    var agasiname="";
    var pausetime=c.pausetime;
    console.log(mainlist)
    console.log(f);
    console.log(room);
    if(f==2){
      mainlist = this.mainlist_finished_origin;
    }else if(f==1){
      console.log(this.mainlist_origin);
    mainlist = this.mainlist_origin;
    }
    this.firemain.child("users").child(c.name).once("value",snapp=>{
      console.log(snapp.val());
      console.log(snapp.val().current);
          for(var a in mainlist.agasi){
            console.log(mainlist.agasi[a]);
            console.log(mainlist.agasi[a].name+", "+c.name)
            if(mainlist.agasi[a].name==c.name){
              agasiname+=c.name;
              var num = mainlist.agasi[a].num;
              console.log(c.name+"d is...at first : "+num);
              console.log("find");
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
              console.log(c);
              var angel = false;
              if(c.angel!=undefined){
                angel=c.angel;
              }
              var postData = {
                date: c.date,
                money: c.money,
                name: c.name,
                roomno: c.roomno,
                tc: c.tc,
                angel:angel,
                num:num,
                pausetime:pausetime,
                wt:mainlist.wt,
                writer:c.writer,
              };
              console.log(postData)
                console.log("find user");
                var user = snapp.val().id;
                var jopan = snapp.val().jopan;
                console.log(snapp.val().current)
                if(snapp.val().current!=undefined){
                  window.alert("이미 "+snapp.val().name+" 유저가 들어가있는 방이 존재하므로, 재진행할수없습니다.");
                  this.util.dismissLoading();
                  return;
                }
                console.log("user:"+user);
                console.log("room:"+room+",,,"+this.currentstartday+","+mainlist.key+","+num);
                console.log("jopan : "+jopan);
                var dte = new Date();
              dte.setHours(dte.getHours()+9);
                this.firemain.child("users").child(c.name).child("current").update({"room":c.roomno,"enter_date":dte,"date":this.currentstartday})
                // this.firemain.child("users").child(user).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update(postData);
                this.firemain.child("company").child(this.company).child("jopanjjing").child(jopan).child(this.currentstartday).once("value",snap=>{
                  for(var aaa in snap.val()){
                    if(snap.val()[aaa].key==mainlist.key){
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(jopan).child(this.currentstartday).child(aaa).remove();
                    }
                  }
                });
                console.log(postData)
                var dte = new Date();

              this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num+"").remove();
              this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num+"").update(postData)
              if(f==2){
                var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
                this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
                this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,"contents":"재진행:"+agasiname,"type":"reinit", "uploader":this.nickname, "name":"system"})
              }else{
                console.log(this.name);
                console.log(room);
                console.log(mainlist.key);
                var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
                this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
                this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,"contents":"재진행:"+agasiname,"type":"reinit", "uploader":this.nickname, "name":"system"})
              }

              
            }
          }

    console.log("loop finish in reinit")
    // this.refreshChoice2();
    console.log("refreshchoice2 fin");
  console.log("end fin");

  setTimeout(()=>{

    this.refreshChoice2();

this.util.dismissLoading();
  },500)
    });
        

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
  end(c,room,mainlist, f){

    console.log("-------------------------end-------------------------");
    console.log(c);
    console.log(mainlist)
    console.log(this.mainlist_finished_clone);
    this.util.presentLoading();
    var date = new Date();
    
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var selectedid ="";
    var  totalmoney=0;
    var bantee=0;
    var tctotal=0;
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    var alreadyexist=false;
    console.log("c name : "+c.name);
    this.firemain.child("users").child(c.name).once("value",snap=>{
      console.log(snap.val());
        if(snap.val()==null){
          return;
        }
        if(snap.val().type=="agasi"){
            console.log(c.name+",,,,"+snap.val().nickname);
              alreadyexist=true;
              console.log("matched one : ");
              console.log(c);
              console.log(snap.val());
              selectedid=snap.val().id;
              var selectedjopan=snap.val().jopan;
              console.log(selectedid);
              console.log("mmmm")
              console.log(mainlist.agasi);
              console.log(this.mainlist_finished_origin);
              if(f==2){
                mainlist = this.mainlist_finished_origin;
              }else if(f==1){
                console.log(this.mainlist_origin);
              mainlist = this.mainlist_origin;
              }
              console.log("mainlist:");
              console.log(mainlist);
              // this.firemain.child("users").child(snap.val().id).child("current").remove();
              // this.firemain.child("users").child(snap.val().id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
                for(var d in mainlist.agasi){
                  if(mainlist.agasi[d].name==c.name){
                    var num = mainlist.agasi[d].num;
                    console.log("d is...at first : "+num);
                    console.log("calculating..."+c.name);
                    window.alert(c.name+"을 종료합니다. 순서 : "+num);
                    //chasam
                     totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
                    
                     tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
                     bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
                    var jjing=Math.round(tctotal);
                    console.log("jjing : "+jjing);
                    if(Math.round(tctotal)>=1){
                      console.log(snap.val());
                      console.log(selectedjopan)
                      console.log(c);
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"wantee","values":jjing,"key":mainlist.key, "agasi":mainlist.agasi[d].name,"room":mainlist.name, "jopan":selectedjopan, "date":mainlist.agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    if(bantee>=1){
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"bantee", "values":bantee,"key":mainlist.key,"room":mainlist.name,  "agasi":mainlist.agasi[d].name, "jopan":selectedjopan, "date":mainlist.agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    
                    //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
                    // if(mainlist.numofpeople>=5){

                    // }else{
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
                          totaltc+=mainlist.agasi[b].tc;
                          
                        }
                        var yeonti=0;
                        var yeonti_reason="";
                        console.log("totalnum : "+totalnum);
                        console.log("tctotal : "+tctotal);

                        if(totaltc>mainlist.numofpeople*totalnum){
                          yeonti = mainlist.numofpeople * totalnum -tctotal;
                          yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+tctotal;
                          console.log(mainlist.numofpeople+"*"+totalnum+"-"+tctotal);
                        }else{
                          yeonti=totalnum;
                          yeonti_reason="totaltc is so great so just count totalnum";
                          console.log("totaltc is so great so just count totalnum");
                        }
                        
                        console.log("this room's yeonti is : "+yeonti+"and yeontireason"+yeonti_reason);
                        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})

                      }else{
                        console.log("no order detected...");
                        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt})
                      }
                      console.log("selectedid : "+selectedid);
                  this.firemain.child("users").child(selectedid).child("current").remove();
                      var angel = false;
                    if(mainlist.agasi[d].angel!=undefined){
                      angel=mainlist.agasi[d].angel;
                    }
                    window.alert(this.currentstartday+","+room+",,"+mainlist.key+",,,"+num+",,,"+angel);
                    // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge,"testvalue":true, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()}).then(()=>{
                    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num).update({"roomno":room,"incharge":mainlist.incharge,"angel":angel, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    
                    this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num).update({"roomno":room,"incharge":mainlist.incharge,"angel":angel, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num).update({"roomno":room,"incharge":mainlist.incharge, "angel":angel,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    

                  }
                }
                console.log(snap.val().agasi)

                this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(c.name).child("attend").update({"flag":"standby"})
                this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":tctotal,"bantee":bantee,"totalmoney":totalmoney, "date":endtime,"contents":"종료 ","type":"fin", "uploader":this.nickname,"agasi":c.name, "name":"system"})
     
                console.log("501!!!")
              console.log("loop finisehd");
  
          }
          if(!alreadyexist){
            console.log("새로 등록된 아이임.")
          }
      if(f==2){
        console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true})
      }
      

      console.log("end fin before");
      setTimeout(()=>{
        this.util.dismissLoading();
        this.refreshChoice2();
      },800)
  });

  }
  refreshChoice2(){
    console.log("refreshchoice222")
    console.log(this.company);
    console.log(this.a);
    this.mainlist=[];
    this.mainlist_angel=[];
    this.mainlist_finished=[];
    this.mainlist_finished_status=[];
    var agasi = [];
    console.log(this.a.agasi);
    // for(var ae in this.a.agasi){
    //   agasi.push(this.a.agasi[ae]);
    // }
    // const sortedArray = agasi.sort((a, b) => b.num - a.num);

    // console.log(sortedArray);
    var sortedArray = [];
    sortedArray = this.a.agasi;
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).once("value", (snap)=>{


        console.log(snap.val().name)
        var agasiarray = snap.val().agasi;
//         if(this.a.agasi!=undefined){
//           agasiarray = this.a.agasi;
// //           console.log("bef sort");
          
// //         console.log(agasiarray);
// //        
// //         agasiarray = agasiarray.sort(function(a, b) {
// //           console.log(a.num+", "+b.num);
// //           return a.num - b.num;
// //         });

// //         console.log("aft sort");
          
// //         console.log(agasiarray);
//       }else{
//         agasiarray=[];
//       }

        console.log(agasiarray);
        console.log(snap.val().logic);
            console.log(snap.val())
            var inagasi = 0;
            var totalagasi=0;
            if(snap.val().agasi!=undefined){
              var count=0;
              for(var c in snap.val().agasi){
                count++;
                totalagasi++;
                console.log(snap.val().agasi[c])
                if(snap.val().agasi[c].angel){
                  this.angelcount++;
                }
                if(snap.val().agasi[c].findate!=undefined){
                  //종료됨. 
                }else{
                  inagasi++;
                  //종료 안됨. 들어가있는 상황 . 
                }
              }
            }else{
              //agasi가 없는 경우.
            }
            this.inagasi=inagasi;
            this.numofpeople = snap.val().numofpeople;
            console.log("inagasi is "+inagasi);
            var memo = "";
              memo = snap.val().memo;
          
            console.log(snap.val().name);
            console.log("memo....: "+memo);
            console.log(memo);
            var messages=[];
            for(var dd in snap.val().message){
              messages.push(snap.val().message[dd]);
            }
            console.log(messages);
            //sort message by date
            messages.sort(function(a, b) {
              var dateA = new Date("2023-" + a.date.replace(/-/g, "/"));
                var dateB = new Date("2023-" + b.date.replace(/-/g, "/"));

                // Compare dates
                if (dateA > dateB) {
                  return -1; // Sort b before a
                } else if (dateA < dateB) {
                  return 1; // Sort a before b
                } else {
                  return 0; // Keep order unchanged
                }
            });
            console.log(snap.val().name)
            console.log(snap.val())
            var findate = "";
            if(snap.val().findate!=undefined){
              findate = snap.val().findate;
            }
            console.log("findate is "+findate);
            console.log(snap.val().ss);
            if(snap.val().ss){
              console.log("snap.val().ss is true")
              if(snap.val().status=="fin"){
                this.mainlist_finished_status.push({"agasi":agasiarray,
                "date":snap.val().date,
              "incharge":snap.val().incharge,
            "insert_date":snap.val().insert_date,
          "insert_date_full":snap.val().insert_date_full,
                  "key":snap.val().key,
                  "message":messages,
                  "memo":memo,
                  "angel":snap.val().angel,
                  "name":snap.val().name,
              "numofpeople":snap.val().numofpeople,
              "status":snap.val().status,
            "wt":snap.val().wt,
          "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
      
               }else if(snap.val().angel==true){

                this.mainlist_angel.push({"agasi":agasiarray,
                "date":snap.val().date,
              "incharge":snap.val().incharge,
            "insert_date":snap.val().insert_date,
          "insert_date_full":snap.val().insert_date_full,
                  "key":snap.val().key,
                  "message":messages,
                  "memo":memo,
                  "angel":snap.val().angel,
                  "name":snap.val().name,
              "numofpeople":snap.val().numofpeople,
              "status":snap.val().status,
            "wt":snap.val().wt,
          "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});

          this.mainlist_finished.push({"agasi":agasiarray,
          "date":snap.val().date,
        "incharge":snap.val().incharge,
      "insert_date":snap.val().insert_date,
    "insert_date_full":snap.val().insert_date_full,
            "key":snap.val().key,
          "name":snap.val().name,
          "message":messages,

          "memo":memo,
      "angel":snap.val().angel,
          "numofpeople":snap.val().numofpeople,
        "status":snap.val().status,
      "wt":snap.val().wt,
      "directorId":snap.val().directorId,
    "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});

              }else{
                console.log("agasiarray::::");
                console.log(agasiarray);
                //초이스 ㅅㅅ 방에다가 날개가아니고 완료도 아닌 경우.
                        this.mainlist_finished.push({"agasi":agasiarray,
                        "date":snap.val().date,
                      "incharge":snap.val().incharge,
                    "insert_date":snap.val().insert_date,
                  "insert_date_full":snap.val().insert_date_full,
                          "key":snap.val().key,
                        "name":snap.val().name,
                        "message":messages,

                        "memo":memo,
                    "angel":snap.val().angel,
                        "numofpeople":snap.val().numofpeople,
                      "status":snap.val().status,
                    "wt":snap.val().wt,
                    "directorId":snap.val().directorId,
                  "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
              
              }
              }else{
                
                console.log(" 초이스 ㅅㅅ  undefined else...flag ")
                var orderlist="";
                if(snap.val().orderlist==undefined){
                  orderlist="no"
                }else{
                  orderlist=snap.val().orderlist;
                }
               
                console.log(snap.val().numofpeople);
                console.log(inagasi);
                console.log(totalagasi);
                  if(snap.val().status=="fin"){
                    console.log("is fin..");
                    this.mainlist_finished_status.push({"agasi":agasiarray,
                    "date":snap.val().date,
                  "incharge":snap.val().incharge,
                "insert_date":snap.val().insert_date,
              "insert_date_full":snap.val().insert_date_full,
              "directorId":snap.val().directorId,
              "key":snap.val().key,
              "message":messages,
              "memo":memo,
              "angel":snap.val().angel,
              "name":snap.val().name,
                  "numofpeople":snap.val().numofpeople,
                  "status":snap.val().status,
                "wt":snap.val().wt,
              "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
          
                  }else if(snap.val().angel==true){

                    this.mainlist_angel.push({"agasi":agasiarray,
                    "date":snap.val().date,
                  "incharge":snap.val().incharge,
                "insert_date":snap.val().insert_date,
              "insert_date_full":snap.val().insert_date_full,
                      "key":snap.val().key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.val().angel,
                      "name":snap.val().name,
                  "numofpeople":snap.val().numofpeople,
                  "status":snap.val().status,
                "wt":snap.val().wt,
              "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
               

                      this.mainlist_finished.push({"agasi":agasiarray,
                      "date":snap.val().date,
                    "incharge":snap.val().incharge,
                  "insert_date":snap.val().insert_date,
                "insert_date_full":snap.val().insert_date_full,
                "directorId":snap.val().directorId,
                "key":snap.val().key,
                "message":messages,
                "memo":memo,
                "angel":snap.val().angel,
                "name":snap.val().name,
                    "numofpeople":snap.val().numofpeople,
                    "status":snap.val().status,
                  "wt":snap.val().wt,
                "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});

    
                  }else if(snap.val().ss==false||snap.val().ss==undefined){
                    console.log("not fin not angle");
                    console.log(snap.val().numofpeople+",,,"+inagasi);
                    if(snap.val().numofpeople<=inagasi){
                      this.mainlist_finished.push({"agasi":agasiarray,
                      "date":snap.val().date,
                    "incharge":snap.val().incharge,
                  "insert_date":snap.val().insert_date,
                "insert_date_full":snap.val().insert_date_full,
                "directorId":snap.val().directorId,
                "key":snap.val().key,
                "message":messages,
                "memo":memo,
                "angel":snap.val().angel,
                "name":snap.val().name,
                    "numofpeople":snap.val().numofpeople,
                    "status":snap.val().status,
                  "wt":snap.val().wt,
                "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
                    }else{
                      console.log(agasiarray);
                      this.mainlist.push({"agasi":agasiarray,
                    "date":snap.val().date,
                  "incharge":snap.val().incharge,
                "insert_date":snap.val().insert_date,
              "insert_date_full":snap.val().insert_date_full,
              "directorId":snap.val().directorId,
              "key":snap.val().key,
              "message":messages,
              "memo":memo,
              "angel":snap.val().angel,
              "name":snap.val().name,
                  "numofpeople":snap.val().numofpeople,
                  "status":snap.val().status,
                "wt":snap.val().wt,
              "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
                    }

                  }else if(snap.val().numofpeople<=inagasi){

                    console.log("snap.val()[a][b].numofpeople<=totalagasi");
                    this.mainlist_finished.push({"agasi":agasiarray,
                    "date":snap.val().date,
                  "incharge":snap.val().incharge,
                "insert_date":snap.val().insert_date,
              "insert_date_full":snap.val().insert_date_full,
              "directorId":snap.val().directorId,
              "key":snap.val().key,
              "message":messages,
              "memo":memo,
              "angel":snap.val().angel,
              "name":snap.val().name,
                  "numofpeople":snap.val().numofpeople,
                  "status":snap.val().status,
                "wt":snap.val().wt,
              "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
                  }else{
                  console.log("is else...");
                            this.mainlist.push({"agasi":agasiarray,
                            "date":snap.val().date,
                          "incharge":snap.val().incharge,
                        "insert_date":snap.val().insert_date,
                      "insert_date_full":snap.val().insert_date_full,
                      "directorId":snap.val().directorId,
                      "key":snap.val().key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.val().angel,
                      "name":snap.val().name,
                          "numofpeople":snap.val().numofpeople,
                          "status":snap.val().status,
                        "wt":snap.val().wt,
                      "numofagasi":inagasi,"lack":snap.val().numofpeople-inagasi});
                  }
                
             console.log("ss false end");
            }

            console.log("ttttthis.mainlist_finished");
            console.log(agasiarray);
            console.log(this.mainlist);
            console.log(this.mainlist_finished);
            console.log(this.mainlist_finished_status);

console.log("this.mainlist_finished_origin");
console.log(this.mainlist_finished_origin);

// var count=-1;
// var newarray=[];
if(this.mainlist[0]!=undefined){

this.mainlist_origin = this.mainlist[0];
//   console.log(this.mainlist[0].agasi);
//   for(var a in agasiarray){
//     count++;
//     newarray.push(agasiarray[a]);
//     console.log(a);
//     console.log(agasiarray[a])
//   }
//   this.mainlist[0].agasi=(newarray);
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[0].name).child(this.mainlist[0].key).child("agasi").remove();
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[0].name).child(this.mainlist[0].key).child("agasi").update(newarray);
}

// var count=-1;
// var newarray=[];
// console.log("before sorted: ");
if(this.mainlist_finished[0]!=undefined){

this.mainlist_finished_origin = this.mainlist_finished[0];
//   console.log(this.mainlist_finished[0].agasi);
//   for(var a in agasiarray){
//     count++;
//     console.log("pull this and add :"+a);
//     console.log(agasiarray)
//     newarray.push(agasiarray[a]);
//     console.log("newarray : ");
//     console.log(newarray);
  }

//   console.log("newarray : ");
//   console.log(newarray);
//   this.mainlist_finished[0].agasi=(newarray);
//   console.log("after sorted:");

// console.log(this.mainlist_finished[0].agasi);
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished[0].name).child(this.mainlist_finished[0].key).child("agasi").remove();
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished[0].name).child(this.mainlist_finished[0].key).child("agasi").update(newarray);
// }

// var count=-1;
// var newarray=[];
// if(this.mainlist_angel[0]!=undefined){
//   console.log(this.mainlist_angel[0].agasi);
//   for(var a in this.mainlist_angel[0].agasi){
//     count++;
//     newarray.push(this.mainlist_angel[0].agasi[a]);
//     console.log(a);
//     console.log(this.mainlist_angel[0].agasi[a])
//   }
//   this.mainlist_angel[0].agasi=(newarray);
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_angel[0].name).child(this.mainlist_angel[0].key).child("agasi").remove();
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_angel[0].name).child(this.mainlist_angel[0].key).child("agasi").update(newarray);
// }

// var count=-1;
// var newarray=[];
// if(this.mainlist_finished_status[0]!=undefined){
//   console.log(this.mainlist_finished_status[0].agasi);
//   for(var a in this.mainlist_finished_status[0].agasi){
//     count++;
//     newarray.push(this.mainlist_finished_status[0].agasi[a]);
//     console.log(a);
//     console.log(this.mainlist_finished_status[0].agasi[a])
//   }
//   this.mainlist_finished_status[0].agasi=(newarray);
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished_status[0].name).child(this.mainlist_finished_status[0].key).child("agasi").remove();
//   this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished_status[0].name).child(this.mainlist_finished_status[0].key).child("agasi").update(newarray);
// }
console.log(this.mainlist);
  console.log(this.mainlist_finished);
  //여기부터 아가씨 순서가이상. 
  this.mainlist_finished_clone=this.mainlist_finished[0];
  console.log(this.mainlist_finished_clone);
  console.log("before sort.....");
  console.log(this.mainlist_finished[0]);
  if(this.mainlist_finished[0]!=undefined){
    // this.mainlist_finished[0].agasi.sort(function(a, b) {
    //   //if each's findate is undefined, it should be at the bottom of array 
    //   if(a.findate==undefined){
    //     return -1;
    //   }
    //   if(b.findate==undefined){
    //     return -1;
    //   }
    //   //if each's findate is defined, it should be sorted by findate
    //   if(a.findate!=undefined&&b.findate!=undefined){
    //     return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
    //   }
  
    // })

    const sortedArray = this.mainlist_finished[0].agasi.sort((a, b) => {
      if (a.findate && !b.findate) {
        return 1; // a has findate, b does not, so a should be placed after b
      }
      if (!a.findate && b.findate) {
        return -1; // b has findate, a does not, so b should be placed after a
      }
      return a.num - b.num; // compare num when findate is either defined or undefined
    }).filter(obj => !obj.findate); // Filter out objects with findate defined

    console.log(sortedArray);
  }

  console.log(this.mainlist_finished_clone);
  console.log("after sort.....");
  console.log(this.mainlist_finished[0]);

  // if(this.mainlist[0]!=undefined){
  //   this.mainlist[0].agasi.sort(function(a, b) {
  //     //if each's findate is undefined, it should be at the bottom of array
  //     if(a.findate==undefined){
  //       return -1;
  //     }
  //     if(b.findate==undefined){
  //       return -1;
  //     }
  //     //if each's findate is defined, it should be sorted by findate
  //     if(a.findate!=undefined&&b.findate!=undefined){
  //       return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
  //     }
  //   })
  // }
  // if(this.mainlist_finished_status[0]!=undefined){
  //   this.mainlist_finished_status[0].agasi.sort(function(a, b) {
  //     //if each's findate is undefined, it should be at the bottom of array
  //     if(a.findate==undefined){
  //       return -1;
  //     }
  //     if(b.findate==undefined){
  //       return -1;
  //     }
  //     //if each's findate is defined, it should be sorted by findate
  //     if(a.findate!=undefined&&b.findate!=undefined){
  //       return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
  //     }
  //   })
  // }
  // if(this.mainlist_angel[0]!=undefined){
  //   this.mainlist_angel[0].agasi.sort(function(a, b) {
  //     //if each's findate is undefined, it should be at the bottom of array
  //     if(a.findate==undefined){
  //       return -1;
  //     }
  //     if(b.findate==undefined){
  //       return -1;
  //     }
  //     //if each's findate is defined, it should be sorted by findate
  //     if(a.findate!=undefined&&b.findate!=undefined){
  //       return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
  //     }
  //   })
  // }
  
  //sorting this.mainlist_finished's agasi node by findate is undefined or not . undefined should be more top and undefined should be bottom 


  console.log(this.mainlist_finished_status)
  
console.log("refresh didloaded")

this.refresheverymin();
    });


  
  }
  abcd(aa){
    //main.lastupdated.split(" ")[1]
    const timeString = aa.trim();
    var hours = timeString.split(' ')[1].split(":")[0];
    var minutes = timeString.split(' ')[1].split(":")[1];
    const meridiem = Number(hours) < 12 ? '오전' : '오후';
    const hours12 = ((Number(hours) + 11) % 12 + 1);
    const formattedTime = `${meridiem} ${hours12}시${minutes}분`;
    return formattedTime;
  }
  async getIdOfagaci (d,name,totalmoney,room,key,number,tctotal,wt,incharge,mainlist,bantee){
    console.log("getIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagaci")
    console.log(d);
    console.log(name);
    console.log(totalmoney);
    console.log(room);
    console.log(key);
    console.log(number);
    console.log(tctotal);
    console.log(wt);
    console.log(incharge)
    console.log(mainlist);
    console.log(bantee)
    var selectedid ="";

    var alreadyexist=false;


    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    await this.firemain.child("users").child(name).once("value",snap=>{
      console.log(snap.val());
      console.log(snap.val().name);
        if(snap.val()==null){
          return;
        }
        if(snap.val().type=="agasi"){
            console.log(name+",,,,"+snap.val().nickname);
              alreadyexist=true;
              console.log("matched one : ");
              console.log(snap.val());
              selectedid=snap.val().id;
              var selectedjopan=snap.val().jopan;
              console.log(selectedid);
              console.log("mmmm")

              // this.firemain.child("users").child(snap.val().id).child("current").remove();
              // this.firemain.child("users").child(snap.val().id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
                for(var d in mainlist.agasi){
                  console.log(mainlist.agasi[d]);
                  console.log("looping...");

                  if(mainlist.agasi[d].name==name){

                this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(name).child("attend").update({"flag":"standby"})
                    console.log("d start is...."+d);
                    console.log(mainlist.agasi[d].name);
                    //chasam
                     totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
                    
                     tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
                     bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
                    var jjing=Math.round(tctotal);
                    console.log("jjing : "+jjing);
                    if(Math.round(tctotal)>=1){
                      console.log(snap.val());
                      console.log(selectedjopan)
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"wantee","values":jjing,"key":mainlist.key, "agasi":mainlist.agasi[d].name,"room":mainlist.name, "jopan":selectedjopan, "date":mainlist.agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    if(bantee>=1){
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"bantee", "values":bantee,"key":mainlist.key,"room":mainlist.name,  "agasi":mainlist.agasi[d].name, "jopan":selectedjopan, "date":mainlist.agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    
                    //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
                    // if(mainlist.numofpeople>=5){

                    // }else{
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
                          totaltc+=mainlist.agasi[b].tc;
                          
                        }
                        var yeonti=0;
                        var yeonti_reason="";
                        console.log("totalnum : "+totalnum);
                        console.log("tctotal : "+tctotal);

                        if(totaltc>mainlist.numofpeople*totalnum){
                          yeonti = mainlist.numofpeople * totalnum -tctotal;
                          yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+tctotal;
                          console.log(mainlist.numofpeople+"*"+totalnum+"-"+tctotal);
                        }else{
                          yeonti=totalnum;
                          yeonti_reason="totaltc is so great so just count totalnum";
                          console.log("totaltc is so great so just count totalnum");
                        }
                        
                        console.log("this room's yeonti is : "+yeonti+"and yeontireason"+yeonti_reason);
                        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})

                      }else{
                        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt})
                      }
                  this.firemain.child("users").child(selectedid).child("current").remove();
                      console.log("d is "+d);
                    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    
                    this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    

                  }
                }
                console.log(snap.val().agasi)

                this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":tctotal,"bantee":bantee,"totalmoney":totalmoney, "date":endtime,"contents":"종료 "+tctotal+"개","type":"fin", "uploader":this.nickname,"agasi":name, "name":"system"})
     
                console.log("501!!!")
              console.log("loop finisehd");
  
          }
          if(!alreadyexist){
            console.log("새로 등록된 아이임.")
          }
      

      console.log("end fin before");
  });

    // this.firemain.child("users").child(name).once("value",snap=>{
    //   var returnvalue="";
    //   var selectedjopan
    //   var agasiname=name;
    //   var ddate="";
    //       // for(var b in snap.val()){

    //       //   if(snap.val()[b].name==name){
    //       //     returnvalue=b;
    //       //     selectedjopan=snap.val()[b].jopan;
    //       //   }
    //       // }
    //       selectedjopan = snap.val().jopan;
    //       console.log(name+"' id : " + totalmoney+",,,,"+number);

    //       var date = new Date();
    //       var year=date.getFullYear();
    //       var month=date.getMonth()+1;
    //       var day = date.getDate();
    //       var hour = date.getHours();
    //       var min = date.getMinutes();
    //       var dte = new Date();
    //       dte.setHours(dte.getHours()+9);
    //       this.firemain.child("users").child(name).child("current").remove();

    //       var jjing=Math.round(tctotal);
    //       if(Math.round(tctotal)>=1){
    //         console.log(selectedjopan)
    //         // this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":name,"key":mainlist.key, "room":mainlist.name,"jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
    //       }
    //       if(bantee>=1){
    //         // this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).child("bantee").update({"values":bantee,"type":"bantee","key":mainlist.key,"room":mainlist.name, "agasi":name, "jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
    //       }
    //       //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
    //       if(mainlist.numofpeople>=5){

    //       }else{
    //         console.log(mainlist.orderlist)
    //         if(mainlist.orderlist!=undefined){
    //           var totalnum=0;
    //           for(var a in mainlist.orderlist.orderlist){
    //             //iterate through and calculate cumulative num 
    //             if(mainlist.orderlist.orderlist[a].category="주류"){
    //               totalnum+=mainlist.orderlist.orderlist[a].num;
    //             }
    //             console.log(mainlist.orderlist.orderlist[a])
    //           }
    //           console.log("total bottle : "+totalnum);
    //           console.log(mainlist);
    //           var newtc=0;
    //           var tcarray = [];
    //           var chasamarray=[];
    //           var yeonti_reason="";
    //           var yeonti=0;
    //           for(var cccc in mainlist.agasi){
    //             console.log(mainlist.agasi[cccc].tc)
    //             newtc += Math.floor(mainlist.agasi[cccc].tc)
    //             tcarray.push(Math.floor(mainlist.agasi[cccc].tc))

    //             chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
              
    //           }
             

    //           if(newtc>mainlist.numofpeople*totalnum){
    //             yeonti = mainlist.numofpeople * totalnum -newtc;
    //             yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+newtc;
    //             console.log(mainlist.numofpeople+"*"+totalnum+"-"+newtc);
    //           }else{
    //             yeonti=totalnum;
    //             yeonti_reason="totaltc is so great so just count totalnum";
    //             console.log("totaltc is so great so just count totalnum");
    //           }
              
    //           console.log("this room's yeonti is : "+yeonti);
    //           this.firemain.child("users").child(name).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room,"name":name,"date":d,"incharge":mainlist.incharge,"end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})
    //           this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"date":d, "lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
    //           // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"date":d, "end_date":hour+":"+min,"end_date_full":dte,"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
    //         }
    //     }

    //     this.firemain.child("users").child(incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
    //                 this.firemain.child("users").child(wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    

    //       this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(key).child("agasi").child(number).update({"bantee":bantee, "roomno":room,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":wt,"incharge":incharge})

    //               console.log("end of getIdOfAgasi....");
    // });
  }
  showPrompt(room,mainlist) {
    console.log(mainlist);
    const prompt = this.alertCtrl.create({
      title: '메모',
      message: "이 방에 대해 메모를 남겨주세요.",
      inputs: [
        {
          name: 'title',
          placeholder: '메모'
        },
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '저장',
          handler: data => {
            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"memo":data.title});
            this.refreshChoice2();
          }
        }
      ]
    });
    prompt.present();
  }
  memo(c,room,mainlist) {
    this.showPrompt(room,mainlist);
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"memo":})
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.name, "name":"system"})
      
  }
  ss_fromangel(c,room,mainlist) {
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true,"angel":false})
    // this.firemain.child("company").child(this.company).child("roomlist").off();
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.nickname, "name":"system"})
      

    this.view.dismiss();
  }
  ss(c,room,mainlist) {
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true})
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.nickname, "name":"system"})
      

    this.view.dismiss();
  }

  //초이스 탭으로 이동시키기.
  ss2(c,room,mainlist) {

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    console.log("재초 넘어가서 초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":false})
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,"contents":"재초이스","type":"ss", "uploader":this.nickname, "name":"system"})
     
    this.view.dismiss();
  }
  //날개방으로 이동시키기.
  ss3(c,room,mainlist) {
    console.log(" 날개초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"angel":true})

   

    this.view.dismiss();
  }
  modify0(c) {
    this.modifyflag=true;
    console.log("modify0modify0modify0modify0 come")
    console.log(c);
    console.log(this.mainlist);
    this.tempmainlist=this.mainlist[0];
    console.log("tempmainlist : ");
    console.log(this.tempmainlist);
  }


  modifycancel0(c,room,mainlist,aga) {
    console.log(aga);
    var falseflag=false;
    this.modifyflag=!this.modifyflag;
    console.log("modifycancel0modifycancel0modifycancel0 come")
    console.log(c.agasi);
    console.log(room);
    console.log(mainlist);
  }
  modifyfin0(c,room,mainlist,aga) {
    console.log(aga);
    var falseflag=false;
    this.modifyflag=false;
    console.log("modifyfin0modifyfin0modifyfin0modifyfin0modifyfin0 come")
    console.log(c.agasi);
    console.log(c);

    console.log(room);
    console.log(mainlist);
    var count=-1;
    var agasi=[];
    var initial = this.mainlist[0];
    console.log(this.mainlist)
    console.log(this.mainlist[0])
    console.log(this.mainlist[0].agasi)
    var v = this.view;
    var key = this.mainlist[0].key;
    var firemain = this.firemain;
    var company = this.company;
    var day = this.currentstartday;
    var countingv=-1;
    var finnum=0;
    console.log(this.mainlist);
    console.log(this.mainlist.length);
    console.log(this.mainlist[0]);
    for(var a in this.mainlist[0].agasi){
      countingv++;
      console.log(this.mainlist[0].agasi[a]);
      console.log(this.tempmainlist.agasi[countingv]);

      if(this.mainlist[0].agasi[a].name!=this.tempmainlist.agasi[countingv].name){

        var flag =  this.getNameChanged(this.tempmainlist.agasi[countingv].name, this.mainlist[0].agasi[a].name,v,c.agasi,room,key,firemain,company,day);
              console.log(flag);
        if(flag==false){
          window.alert("ok! no continue");
          return;
        }

      }
      console.log("compare...");
      if(this.mainlist[0].agasi[a].name!=this.tempmainlist.agasi[countingv].name){
        console.log("not same");
        console.log(this.tempmainlist.agasi[countingv].name);
      }
      count++;
      if(this.mainlist[0].agasi[a].findate==undefined){
        finnum++;
      }
      if(this.mainlist[0].agasi[a].tc==undefined){
        break;
      }
      console.log(this.mainlist[0].agasi[a].tc)
      var newmoney = this.util.getTCfromtc(this.mainlist[0].agasi[a].tc);
      console.log(newmoney);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist[0].agasi[a].money = newmoney;
      agasi.push(this.mainlist[0].agasi[a]);
      console.log("agasiiiiii");
      console.log(agasi);
    }
    if(falseflag){
      window.alert("잘못된 값입니다.");
      this.view.dismiss();
      return;
    }
    // if(finnum>0){
    //   window.alert("종료 전에는 수정할 수 없습니다.")
    //   this.view.dismiss();
    //   return;
    // }
    if(falseflag){
      window.alert("잘못된 값입니다.");
      this.view.dismiss();
      return;
    }
    console.log(this.company);
    console.log(room);
    console.log(this.mainlist[0].key);
    console.log(agasi);
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist[0].key).update({agasi})

    this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(this.mainlist[0].key).update({agasi})
    this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(this.mainlist[0].key).update({agasi})
    setTimeout(()=>{
      this.refreshChoice2();
    },1000)
  }
  modify(c,room,mainlist) {
    this.modifyflag=true;
    console.log("modify come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    this.tempmainlist=this.mainlist_finished[0];

    
  }

  getNameChanged(beforechanged,tochanged,v,bc,room,key,firemain,company,day) {
    var falseflag = false;
    console.log("getNameChanged");
    console.log(beforechanged);
    console.log(tochanged);
    console.log(v);
    console.log(bc);

    var dte = new Date();
    dte.setHours(dte.getHours()+9);
    console.log(room);
    console.log(key);
    if(beforechanged==tochanged){
      console.log("same so return");
      return true;
    }else{
      console.log("diff so check")
      firemain.child("users").child(tochanged).once("value",function(snapshot){
        console.log(snapshot.val());
        if(snapshot.val()!=null&&snapshot.val().current!=undefined&&snapshot.val().current!=null){
          var currentflag = snapshot.val().current;
          window.alert(tochanged+""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[0]+" "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
          this.util.dismissLoading();
          console.log("before change original");
          console.log(bc)
          firemain.child("company").child(company).child("madelist").child(day).child(room).child(key).child("agasi").update(bc)
   
          v.dismiss();
        }else{

          var date = new Date();
  
      
          var hour = date.getHours();
          var min = date.getMinutes();
          console.log(beforechanged+"remove current")
          console.log(tochanged+",,"+room+",,,"+dte+",,,,"+day);
          firemain.child("users").child(beforechanged.trim()).child("current").remove();
          firemain.child("users").child(tochanged.trim()).child("current").remove();

          firemain.child("users").child(tochanged.trim()).child("attendance").child(day).update({"currentStatus":"attend"})
        firemain.child("users").child(tochanged.trim()).child("attendance").child(day).child("attend").update({"team":snapshot.val().jopan,"name":tochanged,"date":day,"flag":"attend","time":hour+":"+min})
        firemain.child("users").child(tochanged.trim()).update({"jopan":snapshot.val().jopan,"name":tochanged,type:"agasi",writer:bc[0].writer,status:false,id:tochanged,company:company})
        firemain.child("attendance").child(company).child(day).child(tochanged).child("attend").update({ "team":snapshot.val().jopan,"name":tochanged,"flag":"attend","date":day, "time":hour+":"+min})


          console.log(tochanged+"not occupied , so start name change process come");
        }

        return false;
      });
    }
    
  }
  modifyfin(c,room,mainlist) {

    console.log("modifyfin come")
    var falseflag=false;
    this.modifyflag=false;
    console.log(c.agasi);

    console.log(room);
    console.log(mainlist);
    var count=-1;
    var agasi=[];
    var initial = this.mainlist_finished[0];
    console.log(this.mainlist_finished)
    console.log(this.mainlist_finished[0])
    console.log(this.mainlist_finished[0].agasi)
    var finnum=0;
    var countingv=-1;
    console.log(this.mainlist_finished_origin);
    console.log("c done");
    var v = this.view;
    var key = this.mainlist_finished[0].key;
    var firemain = this.firemain;
    var company = this.company;
    var day = this.currentstartday;
    for(var a in this.mainlist_finished[0].agasi){
      countingv++;

      if(this.mainlist_finished[0].agasi[a].name!=this.tempmainlist.agasi[countingv].name){

        var flag =  this.getNameChanged(this.tempmainlist.agasi[countingv].name, this.mainlist_finished[0].agasi[a].name,v,c.agasi,room,key,firemain,company,day);
              console.log(flag);
        if(flag==false){
          window.alert("ok! no continue");
          return;
        }

      }
      console.log("compare...");
      if(this.mainlist_finished[0].agasi[a].name!=this.tempmainlist.agasi[countingv].name){
        console.log("not same");
        console.log(this.tempmainlist.agasi[countingv].name);
      }
      count++;
      if(this.mainlist_finished[0].agasi[a].findate==undefined){
        finnum++;
      }
      if(this.mainlist_finished[0].agasi[a].tc==undefined){
        break;
      }
      console.log(this.mainlist_finished[0].agasi[a].tc)
      var newmoney = this.util.getTCfromtc(this.mainlist_finished[0].agasi[a].tc);
      console.log(newmoney);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist_finished[0].agasi[a].money = newmoney;
      agasi.push(this.mainlist_finished[0].agasi[a]);
      console.log("agasiiiiii");
      console.log(agasi);
    }
    if(falseflag){
      window.alert("tc계산이 잘못된 값입니다.(최대 tc : 24)");
      this.view.dismiss();
      return;
    }
    console.log(this.company);
    console.log(room);
    console.log(this.mainlist_finished[0].key);
    console.log(agasi);
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist_finished[0].key).update({agasi})
    
    this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished[0].key).update({agasi})
    this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished[0].key).update({agasi})
    setTimeout(()=>{
      this.refreshChoice2();
    },1000)
  }

  modifycancel(c,room,mainlist) {
    this.modifyflag=!this.modifyflag;
  }

  modifyfin2(c,room,mainlist) {
    var falseflag=false;
    this.modifyflag=false;
    console.log("modifyfin come")
    console.log(c.agasi);

    console.log(room);
    console.log(mainlist);
    var count=-1;
    var agasi=[];
    console.log(this.mainlist_finished_status)
    console.log(this.mainlist_finished_status[0])
    console.log(this.mainlist_finished_status[0].agasi)
    for(var a in this.mainlist_finished_status[0].agasi){
      count++;
      console.log(this.mainlist_finished_status[0].agasi[a].tc)
      if(this.mainlist_finished_status[0].agasi[a].tc==undefined){
        return;
      }
      console.log(this.mainlist_finished_status[0])
      if(this.mainlist_finished_status[0]==undefined){
        return;
      }
      var newmoney = this.util.getTCfromtc(this.mainlist_finished_status[0].agasi[a].tc);
      console.log(newmoney);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist_finished_status[0].agasi[a].money = newmoney;
      agasi.push(this.mainlist_finished_status[0].agasi[a]);
      console.log("agasi");
      console.log(agasi);
      console.log(this.mainlist_finished_status[0].key)
      

    }
    if(falseflag){
      window.alert("잘못된 값입니다.");
      this.view.dismiss();
      return;
    }
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist_finished_status[0].key).update({agasi})
       
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").update(this.mainlist_finished.agasi)

    //tc 수정 

  }
}
