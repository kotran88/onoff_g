import { IonicPage,ModalController,ViewController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ParkingPage } from '../parking/parking';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
import { E } from '@angular/core/src/render3';
import { SignupPage } from '../signup/signup';
import { AccountPage } from '../account/account';
import { OrderPage } from '../order/order';
import { OrdermainPage } from '../ordermain/ordermain';
import { UtilsProvider } from '../../providers/utils/utils';
import { WaitingPage } from '../waiting/waiting';
/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  searchon:any=false;
  selected:any=1;
  @ViewChild('targetElement', { read: ElementRef }) targetElementRef: ElementRef;
  startX: number = 0;
  startY: number = 0;
  isDragging: boolean = false;
  totalMovement: number = 0;
  threshold: number = 100; // Adjust this value to set your desired threshold

  mainlist:any = [];
  selectedIncharge:any;
  selectedKey:any;
  selectedAvec:any;
  selectedLogic:any;
  selectedNumber:any;
  noagasi:any=0;
  agasinum:any=0;
  inputtext:any="";
  mainlist_finished:any=[];
  currentstartday:any="";
  selectedday:any=0;
  currentstart:any="";
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
  
  onTouchStart(event: TouchEvent) {
    // Get the starting X position
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;

    this.totalMovement = 0;
    this.isDragging = false;
  }

  onTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      // Calculate the horizontal and vertical movement distances
      const deltaX = event.touches[0].clientX - this.startX;
      const deltaY = event.touches[0].clientY - this.startY;

      if (deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        // User is swiping to the right
        console.log('Swipe to the right detected');
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
        console.log('Started dragging to the right');
        this.view.dismiss();
        // Add any initial logic when the user starts dragging to the right
      }
    }

  }

  onTouchEnd(event: TouchEvent) {
    if (this.isDragging) {
      console.log('Touch and drag to the right ended');
      // Add any final logic when the user stops dragging to the right
    }
    this.isDragging = false;
  }

  gotowaiting(){
    this.navCtrl.push(WaitingPage,{flag:true}).then(() => {
      console.log("WaitingPage back")
      this.navCtrl.getActive().onDidDismiss(data => {
        console.log("off...")
        console.log(data);
        if(data==undefined){
          return;
        }
        if(data.result=="waiting"){
          window.alert("방을 선택하세요.");
          console.log(data.data);
          console.log(data.data.incharge);
          this.selectedKey = data.data.key;
          this.selectedIncharge=data.data.incharge;
          this.selectedAvec = data.data.avec;
          this.selectedLogic = data.data.logic;
          this.selectedNumber = data.data.numofpeople;
          console.log(data.data.avec);
          console.log(data.data.logic);
        }
    // this.firemain.child("company").child(this.company).child("roomlist").off();
      })
    });
  }
  searchstart(){
    console.log("search start...");
    this.searchon= !this.searchon;
    
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

  this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
    for(var a in snap.val()){
      //console.log("searching mmmm")
      //console.log(snap.val()[a]);
      //console.log(snap.val()[a].flag);
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
        if(snap.val()[a].roomhistory!=undefined){
          //console.log(snap.val()[a].roomhistory[this.currentstartday])
          for(var b in snap.val()[a].roomhistory[this.currentstartday]){
            //console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
            if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
              if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].flag){
                  if(this.selected==1){
                    //console.log(snap.val()[a].roomhistory[this.currentstartday][b].incharge)
                    //console.log(this.inputtext)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].incharge==this.inputtext){
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else if(this.selected==2){
                    //console.log(snap.val()[a].roomhistory[this.currentstartday][b].name)
                    //console.log(this.inputtext)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].name==this.inputtext){
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else if(this.selected==3){
                    //console.log(snap.val()[a].roomhistory[this.currentstartday][b].wt)
                    //console.log(this.inputtext)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].wt==this.inputtext){
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else{
                    this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
                
                }
                }else{
                  if(this.selected==1){
                    if(snap.val()[a].roomhistory[this.currentstartday][b].incharge==this.inputtext){
                     this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else if(this.selected==2){
                    //console.log(snap.val()[a].roomhistory[this.currentstartday][b].name)
                    //console.log(this.inputtext)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].name==this.inputtext){
                      this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else if(this.selected==3){
                    //console.log(snap.val()[a].roomhistory[this.currentstartday][b].wt)
                    //console.log(this.inputtext)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].wt==this.inputtext){
                      this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }else{
                    this.mainlist_finished.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }
                }
            }
            
          }
        }
    
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
         console.log(name+"is:"+flag+"and cat : "+cat);
        this.allroom.push({"name":name,"category":cat,"flag":flag});
        if(cat=="소"){

          if(flag){
            console.log(flag+"small not add")
          }else{
            console.log(name);
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
            console.log(flag+"mid not add")
          }else{
            console.log(name);
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
            console.log(flag+"big not add")
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

       
      }
        
      }
  
      console.log(this.smallroom);
      console.log(this.midroom);
      console.log(this.bigroom);
      console.log(this.allroom)
    });
  }
  buchange(){
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
    //console.log("generate come");
    this.mainlist=[];
    this.mainlist_finished=[];
    this.noagasi=0;
    this.agasinum=0;
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").once('value').then((snap)=>{
      for(var a in snap.val()){
        var flag = snap.val()[a].flag;
        // for(var b in snap.val()[a].roomhistory){
        //   if(b==this.currentstartday){

        //     //console.log(snap.val()[a].roomhistory[b])
        //     //console.log(snap.val()[a].roomhistory[b].flag)
        //   }
        // }
        console.log(snap.val()[a])
            for(var b in snap.val()[a]){
              console.log(snap.val()[a][b]);
              if(snap.val()[a][b].date!=undefined){
                if(snap.val()[a][b].end_date==undefined){
                  if(snap.val()[a][b].flag){
                    if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                      
                    }else{

                    this.mainlist.push(snap.val()[a][b]);
                    }
                  }
                  }else{
                    //console.log("this is finished room");
                    //console.log(snap.val()[a][b]);
                    if(snap.val()[a][b].agasi==undefined&&snap.val()[a][b].orderlist==undefined){
                      //이방은 OB처리해야함. 
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should be ob ++ ");
                      this.noagasi++;
                    }else{
                      
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should not be ob ++ ");
                      this.agasinum++;
                    }
                    //iterate through snap.val()[a][b] 
                    //and push to mainlist_finished
                    // this.mainlist_finished.push(snap.val()[a][b]);
                    var agasi = [];
                    if(snap.val()[a][b].agasi==undefined){
                      agasi = [];
                    }else{
                      agasi = snap.val()[a][b].agasi;
                    }
                    //console.log("agasi length : "+agasi.length);
                    //console.log(agasi);
                    if(agasi.length==0){
                      
                    }else{
                    }
                    var orderlist = [];
                    if(snap.val()[a][b].orderlist==undefined){
                      orderlist = [];
                    }else{
                      orderlist = snap.val()[a][b].orderlist;
                    }
                    //console.log(agasi);
                    //console.log(orderlist);
                    if(snap.val()[a][b].firstflag){

                    }else{
                      this.mainlist_finished.push({
                        "v":snap.val()[a][b].v, "agasi":agasi,
                            "date":snap.val()[a][b].date,
                          "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                      "insert_date_full":snap.val()[a][b].insert_date_full,
                              "key":snap.val()[a][b].key,
                            "name":snap.val()[a][b].name,
                            "avec":snap.val()[a][b].avec,
                            "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                            "lastupdated":snap.val()[a][b].lastupdated,
                            "directorId":snap.val()[a][b].directorId,
                          "numofpeople":snap.val()[a][b].numofpeople,
                          "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt
                      })
                    }
                    
                    // this.mainlist_finished.push(snap.val()[a][b]);
                  }
              }
              
            }
      
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

      console.log("after sorting...")
      console.log(this.mainlist)
      this.mainlist.sort(function(a, b) {
        if (a.noflag === false && b.noflag !== false) {
          return -1; // a should come after b
        } else if (a.noflag !== false && b.noflag === false) {
          return 1; // a should come before b
        } else {
          return 0; // no change in order
        }
      });

      this.mainlist_finished.sort(function(a, b) {
        //console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });

    });

    this.generateroomcategory()
    //console.log(this.mainlist);
  }
  editing(a){
   
    console.log("editing...")
    console.log(a);
    console.log(a.name);
    let modal = this.modal.create(EditingroomPage,{"user":this.directorList, "mainlist":this.mainlist,"mainlist_finished":this.mainlist_finished, "a":a,"allroom":this.allroom,"bu":this.bu});
    modal.onDidDismiss(url => {
      console.log("EditingroomPageEditingroomPageEditingroomPageEditingroomPageEditingroomPage");
      console.log(url);
      if(url!=undefined){
        if(url.result){
          
        console.log("do nothing1");
        }else{

        console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
          },500)
        }
      }else{
        console.log("do nothing");
      }
    });

    modal.present();
  }
  logout(){
      localStorage.setItem("loginflag", "false" )
      
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    //console.log("ad room come");
    //console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room,"bu":this.bu,"selectedKey":this.selectedKey, "selectedIncharge":this.selectedIncharge,"selectedAvec":this.selectedAvec,"selectedLogic":this.selectedLogic , "selectedNumber":this.selectedNumber});
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
