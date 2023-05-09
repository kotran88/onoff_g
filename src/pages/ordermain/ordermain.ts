import { Component } from '@angular/core';
import { IonicPage,ModalController,ViewController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import  firebase from 'firebase';
import { EditingroomPage } from '../editingroom/editingroom';
import { OrderPage } from '../order/order';
import { OrderdetailPage } from '../orderdetail/orderdetail';
/**
 * Generated class for the OrdermainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordermain',
  templateUrl: 'ordermain.html',
})
export class OrdermainPage {
  mainlist:any = [];
  inputtext:any="";
  contents:any="";
  mainlist_no_order:any=[];
  selected:any=1;
  smallroom=[];
  currentstartday:any="";
  currentstart:any="";
  midroom=[];
  bigroom=[];
  company:any="";
  nickname:any="";
  name:any="";
  firemain = firebase.database().ref();
  constructor(public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.name= localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.currentstartday=localStorage.getItem("startDate");
  }
  selecting(a){
    console.log("selecting...")
    console.log(a);
    console.log(this.selected);
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  close(){
    console.log("close gongji")
    // this.menuCtrl.open();
    try{

      this.view.dismiss();
    }catch(e){
      console.log(e);
    }
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log(snap.val());
      console.log(snap.val().category)
      for(var a in snap.val()){
       var cat =  snap.val()[a].category;
       var name = snap.val()[a].name;
       console.log(cat);
       if(cat=="소"){
         this.smallroom.push({"name":name,"category":cat});
       }
       if(cat=="중"){
        this.midroom.push({"name":name,"category":cat});
      }
      if(cat=="대"){
        this.bigroom.push({"name":name,"category":cat});
      }


      console.log("mmmm")
      console.log(snap.val()[a]);
      console.log(snap.val()[a].roomhistory)
      if(snap.val()[a].roomhistory!=undefined){
        console.log(snap.val()[a].roomhistory[this.currentstartday])
        for(var b in snap.val()[a].roomhistory[this.currentstartday]){
          console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
          if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
            console.log("ok")
            if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b].orderlist)
              if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                //주문내역이 없음
                console.log("insert to mainlist_no_order");
                if(snap.val()[a].roomhistory[this.currentstartday][b].noflag==true){

                }else{
                   this.mainlist_no_order.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
                
              }else{
                console.log("insert to mainlist");
                if(snap.val()[a].roomhistory[this.currentstartday][b].noflag==true){

                }else{
                  this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                }
              }
              
            }
           
          }
        }
      }

      }
      console.log(this.smallroom);
    });
    console.log(this.company)

      console.log(this.mainlist)
      this.mainlist.sort(function(a, b) {
          console.log(a.insert_date);
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      console.log("after sorting...")
      console.log(this.mainlist)

      console.log(this.mainlist_no_order)
      this.mainlist_no_order.sort(function(a, b) {
          console.log(a.insert_date);
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      console.log("after sorting...")
      console.log(this.mainlist_no_order)


      
      console.log(this.mainlist_no_order)
  }
  searching(){
    console.log("searching...");
    console.log(this.inputtext)
    console.log(this.selected);

    this.mainlist=[];
    this.mainlist_no_order=[];

    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      for(var a in snap.val()){
        console.log("mmmm")
        console.log(snap.val()[a]);
        console.log(snap.val()[a].roomhistory)
        if(snap.val()[a].roomhistory!=undefined){
          console.log(snap.val()[a].roomhistory[this.currentstartday])
          for(var b in snap.val()[a].roomhistory[this.currentstartday]){
            console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
            if(this.selected==2){
              if(snap.val()[a].roomhistory[this.currentstartday][b].wt==this.inputtext){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].orderlist)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                      //주문내역이 없음
                      console.log("insert to mainlist_no_order");
                      this.mainlist_no_order.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }else{
                      console.log("insert to mainlist");
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                    
                  }
                 
                }
              }
            }else if(this.selected==1){
              if(snap.val()[a].roomhistory[this.currentstartday][b].incharge==this.inputtext){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                    console.log(snap.val()[a].roomhistory[this.currentstartday][b].orderlist)
                    if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                      //주문내역이 없음
                      console.log("insert to mainlist_no_order");
                      this.mainlist_no_order.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }else{
                      console.log("insert to mainlist");
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                    
                  }
                 
                }
              }
            }
            
            
          }
        }
      }
      console.log(this.mainlist)
      console.log(this.mainlist_no_order)
    });
  }
  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(OrderPage,{"a":a});
  //   this.navCtrl.push(OrderPage,{"a":a}).then(() => {
  //     this.navCtrl.getActive().onDidDismiss(url => {

  //     console.log("dismiss second!");
  //     this.mainlist=[];
  //     this.mainlist_no_order=[];

  //     this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
  //       for(var a in snap.val()){
  //         console.log("mmmm")
  //         console.log(snap.val()[a]);
  //         console.log(snap.val()[a].roomhistory)
  //         if(snap.val()[a].roomhistory!=undefined){
  //           console.log(snap.val()[a].roomhistory[this.currentstartday])
  //           for(var b in snap.val()[a].roomhistory[this.currentstartday]){
  //             console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
  //             if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
  //               if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
  //                 console.log(snap.val()[a].roomhistory[this.currentstartday][b].orderlist)
  //                 if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
  //                   //주문내역이 없음
  //                   console.log("insert to mainlist_no_order");
  //                   this.mainlist_no_order.push(snap.val()[a].roomhistory[this.currentstartday][b]);
  //                 }else{
  //                   console.log("insert to mainlist");
  //                   this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
  //                 }
                  
  //               }
               
  //             }
  //           }
  //         }
  //       }
  //       console.log(this.mainlist)
  //       console.log(this.mainlist_no_order)
  //     });
  //   });

  // });

  this.navCtrl.push(OrderdetailPage,{"a":a,"flag":"more"}).then(() => {
    this.navCtrl.getActive().onDidDismiss(data => {
     
      console.log("dismiss second!");
      this.mainlist=[];
      this.mainlist_no_order=[];

      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        for(var a in snap.val()){
          console.log("mmmm")
          console.log(snap.val()[a]);
          console.log(snap.val()[a].roomhistory)
          if(snap.val()[a].roomhistory!=undefined){
            console.log(snap.val()[a].roomhistory[this.currentstartday])
            for(var b in snap.val()[a].roomhistory[this.currentstartday]){
              console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
              if(snap.val()[a].roomhistory[this.currentstartday][b].end_date==undefined){
                if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                  console.log(snap.val()[a].roomhistory[this.currentstartday][b].orderlist)
                  if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
                    //주문내역이 없음
                    console.log("insert to mainlist_no_order");
                    this.mainlist_no_order.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                  }else{
                    console.log("insert to mainlist");
                    if(snap.val()[a].roomhistory[this.currentstartday][b].noflag==true){

                    }else{
                      this.mainlist.push(snap.val()[a].roomhistory[this.currentstartday][b]);
                    }
                  }
                  
                }
               
              }
            }
          }
        }
        console.log(this.mainlist)
        console.log(this.mainlist_no_order)
      });
      

    })
  });
  
}
  logout(){
      localStorage.setItem("loginflag", "false" )
      this.navCtrl.setRoot(LoginpagePage)
  }
  addRoom(room){
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room});
    modal.onDidDismiss(url => {
      console.log("dismiss!");
    });

    modal.present();
  }
}
