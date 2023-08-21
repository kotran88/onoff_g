import { Component } from '@angular/core';
import { IonicPage,ModalController,ViewController, NavController, NavParams,MenuController } from 'ionic-angular';
import { InfomodalPage } from '../infomodal/infomodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { HTTP } from '@ionic-native/http/ngx';
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

@Component({
  selector: 'page-ordermain',
  templateUrl: 'ordermain.html',
})
export class OrdermainPage {
  mainlist:any = [];
  inputtext:any="";
  contents:any="";
  mainlist_order:any=[];
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
  token:any="";
  
  //https://captainq.wadteam.com/captainq/apis/item
  firemain = firebase.database().ref();
  constructor(public http:HTTP,public view:ViewController,public modal:ModalController,public menuCtrl: MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.name= localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.currentstartday=localStorage.getItem("startDate");
    this.token = this.navParams.get("token");
    this.mainlist = this.navParams.get("roomlist");
    this.http.get("https://captainq.wadteam.com/captainq/apis/item",{},{"token":this.token}).then(data => {
      console.log("get item result...");
      console.log(data);
      var a = JSON.parse(data.data)
      var result = JSON.parse(a.rst_content);
      console.log(result);
  });
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
    this.generate();
  }
  async getitemresult(key,name,value) {
    this.http.get("https://captainq.wadteam.com/captainq/apis/currentorderitem?idx="+key,{},{"token":this.token}).then(data => {
      console.log(name+",,,"+key+"get item result...");
      console.log(data);
      var a = JSON.parse(data.data)
      var result = JSON.parse(a.rst_content);
      console.log(result);
      if(result.length==0){
        console.log("is 0 ")
        console.log(this.mainlist[value])

        this.mainlist_no_order.push({"name":this.mainlist[value].name,"key":this.mainlist[value].key,"incharge":this.mainlist[value].incharge,"created_at":this.mainlist[value].created_at,"wt":this.mainlist[value].wt,"max_people_count":this.mainlist[value].max_people_count});
      }else{
        this.mainlist_order.push({"name":this.mainlist[value].name,"key":this.mainlist[value].key,"incharge":this.mainlist[value].incharge,"created_at":this.mainlist[value].created_at,"wt":this.mainlist[value].wt,"max_people_count":this.mainlist[value].max_people_count});
      }

    });
  }
  async generate(){

    console.log(this.mainlist);
    this.mainlist_order=[];
    this.mainlist_no_order=[];
    console.log("generate in ordermain.ts");
    for(var value in this.mainlist){
      console.log(this.mainlist[value]);
      console.log(this.mainlist[value].key);
      await this.getitemresult(this.mainlist[value].key,this.mainlist[value].name,value);
    
      
    }
    // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).once('value').then((snap)=>{
    //   console.log(snap.val());
    //   console.log(snap.val().category)
    //   for(var a in snap.val()){
    //     console.log("bang name : "+a);
    //     for(var b in snap.val()[a]){
    //       console.log("key is : "+b);
    //       if(snap.val()[a][b].end_date==undefined){
    //         console.log("ok")
    //         if(snap.val()[a][b].date!=undefined){
    //           console.log(snap.val()[a][b].orderlist)
    //           if(snap.val()[a][b].orderlist==undefined){
    //             //주문내역이 없음
    //             console.log("insert to mainlist_no_order");
    //             if(snap.val()[a][b].firstflag==true){

    //             }else{
    //                this.mainlist_no_order.push(snap.val()[a][b]);
    //             }
                
    //           }else{
    //             console.log("insert to mainlist");
    //             if(snap.val()[a][b].firstflag==true){

    //             }else{
    //               this.mainlist.push(snap.val()[a][b]);
    //             }
    //           }
              
    //         }
           
    //       }
    //     }

     

    //   }
    //   console.log(this.smallroom);
    // });
    // console.log(this.company)

    //   console.log(this.mainlist)
    //   this.mainlist.sort(function(a, b) {
    //       console.log(a.insert_date);
    //       // Compare dates
         
    //       var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
    //       var timeB = b.insert_date.split(":");
    //       return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
    //   });

    //   console.log("after sorting...")
    //   console.log(this.mainlist)

    //   console.log(this.mainlist_no_order)
    //   this.mainlist_no_order.sort(function(a, b) {
    //       console.log(a.insert_date);
    //       // Compare dates
         
    //       var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
    //       var timeB = b.insert_date.split(":");
    //       return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
    //   });

    //   console.log("after sorting...")
    //   console.log(this.mainlist_no_order)


      
    //   console.log(this.mainlist_no_order)
  }
  searching(){
    console.log("searching...");
    console.log(this.inputtext)
    console.log(this.selected);

    // this.mainlist=[];
    // this.mainlist_no_order=[];

    // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).once('value').then((snap)=>{
    //   for(var a in snap.val()){
    //     console.log("mmmm")
    //     for(var b in snap.val()[a]){
    //       for(var b in snap.val()[a]){
    //         console.log(snap.val()[a][b]);
    //         if(this.selected==2){
    //           if(snap.val()[a][b].wt==this.inputtext){
    //             if(snap.val()[a][b].end_date==undefined){
    //               if(snap.val()[a][b].date!=undefined){
    //                 console.log(snap.val()[a][b].orderlist)
    //                 if(snap.val()[a][b].orderlist==undefined){
    //                   //주문내역이 없음
    //                   console.log("insert to mainlist_no_order");
    //                   this.mainlist_no_order.push(snap.val()[a][b]);
    //                 }else{
    //                   console.log("insert to mainlist");
    //                   this.mainlist.push(snap.val()[a][b]);
    //                 }
                    
    //               }
                 
    //             }
    //           }
    //         }else if(this.selected==1){
    //           if(snap.val()[a][b].incharge==this.inputtext){
    //             if(snap.val()[a][b].end_date==undefined){
    //               if(snap.val()[a][b].date!=undefined){
    //                 console.log(snap.val()[a][b].orderlist)
    //                 if(snap.val()[a][b].orderlist==undefined){
    //                   //주문내역이 없음
    //                   console.log("insert to mainlist_no_order");
    //                   this.mainlist_no_order.push(snap.val()[a][b]);
    //                 }else{
    //                   console.log("insert to mainlist");
    //                   this.mainlist.push(snap.val()[a][b]);
    //                 }
                    
    //               }
                 
    //             }
    //           }
    //         }
    //       }
    //     }
          
    //   }
    //   console.log(this.mainlist)
    //   console.log(this.mainlist_no_order)
    // });
  }
  editing(a){
    console.log("editing...")
    console.log(a);
  this.navCtrl.push(OrderdetailPage,{"a":a,"flag":"more","token":this.token}).then(() => {
    this.navCtrl.getActive().onDidDismiss(data => {
     
      console.log("dismiss second!");
      this.generate();
      

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
