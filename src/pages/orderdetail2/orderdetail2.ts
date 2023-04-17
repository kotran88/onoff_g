import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
import { OrdermainPage } from '../ordermain/ordermain';
/**
 * Generated class for the Orderdetail2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orderdetail2',
  templateUrl: 'orderdetail2.html',
})
export class Orderdetail2Page {
  unique=[];
  selectedList=[];
  uniqueanju=[];
  uniquedrink=[];
  obj22={};
  obj33={};
  obj44={};
  firemain = firebase.database().ref();
  company:any="";
  currentstartday:any="";
  name:any="";
  currentstart:any="";
  newarray=[];
  sullist=[];
  obj = [];
  obj2 = [];
  a:any;
  obj3 = [];
  anjulist=[];
  drinklist=[];
  flag:any;
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.a=this.navParams.get("a");
    console.log("a is...");
      console.log(this.a);
    this.name = localStorage.getItem("name");
    console.log(this.a);
    this.flag=this.navParams.get("flag");
    console.log(this.flag);
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
      console.log("추가주문");
      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("orderlist").once("value",snap=>{
        for(var a in snap.val()){
          console.log(snap.val()[a]);
            for(var b in snap.val()[a]){
              console.log(b);
              console.log(snap.val()[a][b]);
              console.log(snap.val()[a][b].num);
              console.log(snap.val()[a][b].name);
              console.log(snap.val()[a][b].price);
              if(snap.val()[a][b].category!=undefined){

                
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
              this.selectedList.push({num:snap.val()[a][b].num,"name":snap.val()[a][b].name,"price":snap.val()[a][b].price,"category":snap.val()[a][b].category,"subcategory":snap.val()[a][b].subcategory,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});
              }
            }
          }
        });
        console.log(this.selectedList);
    if(this.flag=="cancel"){
      console.log("cancel 주문");
    }
    if(this.flag=="new"){
      console.log("new 주문");
    }
   
  }
  close(){
    console.log("close gongji")
    // this.menuCtrl.open();
    this.view.dismiss();
}
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  minus(a,selectedList){
    console.log("minus");
    console.log(a)
    console.log(selectedList)
    console.log(this.selectedList);
    for(var aa in this.selectedList){
      console.log(this.selectedList[aa])
      console.log(a.name);
      console.log("mmm")
      if(this.selectedList[aa].name==a.name){
        this.selectedList[aa].num=Number(this.selectedList[aa].num)-1;
      }
    }
  }
  delete(a,selectedList){
    console.log("plus");
    console.log(a)
    console.log(selectedList)
    console.log(this.selectedList);
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("orderlist").child("orderlist").child(a.num).remove();
    window.alert("삭제 되었습니다.")
    this.view.dismiss();
    // for(var aa in this.selectedList){
    //   console.log(this.selectedList[aa])
    //   console.log(a.name);
    //   console.log("mmm")
    //   if(this.selectedList[aa].name==a.name){
    //     this.selectedList[aa].num=Number(this.selectedList[aa].num)+1;
    //   }
    // }
  }
  completed(){
    console.log("completed...");
    console.log(this.selectedList);
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    console.log(this.company+"/"+this.a.name+"/"+this.currentstartday+"/"+this.a.key+"/"+hour+":"+min+":"+sec);
    console.log(this.a);
    console.log("1111");
    
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("orderlist").update({"roomno":this.a.name,"wt":this.name,"incharge":this.a.incharge, "orderlist":this.selectedList,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});
    console.log("2222");
    this.firemain.child("users").child(this.a.directorId).child("incentive").child(this.currentstartday).child(this.a.key).child("ordertype").update({"bu":this.a.bu, "type":"order", "roomno":this.a.name,"wt":this.name,"incharge":this.a.incharge, "orderlist":this.selectedList,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});
    window.alert("주문이 완료되었습니다.");
    this.view.dismiss({"result":true})
  }
  clicked(b){
    console.log(b);
    b.selected=true;
    if(b.num==undefined){
      b.num=1;
    }
    var flag=false;
    var num=1;
    for(var a in this.selectedList){
      if(this.selectedList[a].name==b.name){
        console.log("a is "+a);
        console.log(this.selectedList[a])
        this.selectedList[a].num=this.selectedList[a].num+1;
        console.log(this.selectedList[a].num)
        console.log(this.selectedList)
        num = this.selectedList[a].num;
        this.selectedList.splice(Number(a),1)
        flag=true;
      }
    }
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
     

    if(flag){
      this.selectedList.push({num:num,"name":b.name,"price":b.price,"category":b.category,"subcategory":b.subcategory,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});
    }else{
      this.selectedList.push({num:num,"name":b.name,"price":b.price,"category":b.category,"subcategory":b.subcategory,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});
    }
    console.log(this.selectedList);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderdetailPage');

    this.firemain.child("company").child(this.company).child("menulist").once('value').then((snap)=>{
      console.log(snap.val());
      if(snap.val()!=null){

        for(var a in snap.val()){
          console.log(snap.val()[a]);
          if(snap.val()[a].category=="주류"){
            
        this.obj.push(snap.val()[a].subcategory);
        console.log(a);
        console.log(snap.val()[a].subcategory)
            this.sullist.push(snap.val()[a]);
          }
          if(snap.val()[a].category=="안주"){
            this.obj2.push(snap.val()[a].subcategory);
            this.anjulist.push(snap.val()[a]);
            
          }
          if(snap.val()[a].category=="음료/사입"){
            this.obj3.push(snap.val()[a].subcategory);
            this.drinklist.push(snap.val()[a]);
            
          }
        }
        this.unique = this.obj.filter(this.onlyUnique);

        this.uniqueanju = this.obj2.filter(this.onlyUnique);
        this.uniquedrink = this.obj3.filter(this.onlyUnique);

// for(var a in unique){
//   console.log(a)
//   for(var b in this.sullist){
//     console.log(this.sullist[b].subcategory)
//     if(this.sullist[b].subcategory==unique[a]){
//       console.log("같다")
//       console.log(this.sullist[b])
//       // this.newarray.push({"1":this.sullist[b]})
//     }
//   }
//   // console.log(unique[a]);
//   // this.newarray.push({a:unique[a]})
// }
console.log(this.newarray)
        console.log(this.obj);
        console.log(this.sullist)
        console.log(this.anjulist)
        console.log(this.drinklist)

        console.log("mmmm");
        console.log(this.unique);
        console.log(this.uniqueanju);
        console.log(this.uniquedrink)
      }

      console.log("sull : ");
      console.log(this.sullist)
      //re arrange sullist that with key of subcategory 
      this.sullist.sort(function(a,b){
        if(a.subcategory>b.subcategory){
          return 1;
        }else if(a.subcategory<b.subcategory){
          return -1;
        }else{
          return 0;
        }
      })
      console.log(this.sullist)
      //make it hashkey style array with sullist that with key of name
      this.obj22={};
      for(var aaa in this.unique){
        this.obj22[this.unique[aaa]]=[];
      }
      for(var aaa in this.uniqueanju){
        this.obj33[this.uniqueanju[aaa]]=[];
      }
      for(var aaa in this.uniquedrink){
        this.obj44[this.uniquedrink[aaa]]=[];
      }
      console.log(this.obj22)
      for(var a in this.anjulist){
        this.obj33[this.anjulist[a].subcategory].push({"name":this.anjulist[a].name,"category":this.anjulist[a].category,"subcategory":this.anjulist[a].subcategory,"price":Number(this.anjulist[a].price).toLocaleString()});
      }
      for(var a in this.sullist){
        this.obj22[this.sullist[a].subcategory].push({"name":this.sullist[a].name,"category":this.sullist[a].category,"subcategory":this.sullist[a].subcategory,"price":Number(this.sullist[a].price).toLocaleString()});
      }
      console.log(this.drinklist)
      for(var a in this.drinklist){
        this.obj44[this.drinklist[a].subcategory].push({"name":this.drinklist[a].name,"category":this.drinklist[a].category,"subcategory":this.drinklist[a].subcategory,"price":Number(this.drinklist[a].price).toLocaleString()});
      }
      console.log(this.obj22);
      console.log(this.obj33);
      console.log(this.obj44);

     console.log(this.sullist);
    });

  }
}
