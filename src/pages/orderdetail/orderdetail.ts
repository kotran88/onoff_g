import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';

import  firebase from 'firebase';
/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  unique=[];
  selectedList=[];
  uniqueanju=[];
  uniquedrink=[];
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
    this.name = localStorage.getItem("name");
    console.log(this.a);
    this.flag=this.navParams.get("flag");
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    if(this.flag=="more"){
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
              this.selectedList.push({num:snap.val()[a][b].num,"name":snap.val()[a][b].name,"price":snap.val()[a][b].price,"category":snap.val()[a][b].category,"subcategory":snap.val()[a][b].subcategory});
              }
            }
          }
        });
        console.log(this.selectedList);
    }
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
  completed(){
    console.log(this.selectedList);
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    console.log(this.company+"/"+this.a.name+"/"+this.currentstartday+"/"+this.a.key+"/"+hour+":"+min+":"+sec);
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("orderlist").update({"roomno":this.a.name,"wt":this.name, "orderlist":this.selectedList,orderDate:year+"-"+month+"-"+day+" "+hour+":"+min});

    window.alert("주문이 완료되었습니다.");
    this.navCtrl.pop();
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
    if(flag){
      this.selectedList.push({num:num,"name":b.name,"price":b.price,"category":b.category,"subcategory":b.subcategory});
    }else{
      this.selectedList.push({num:num,"name":b.name,"price":b.price,"category":b.category,"subcategory":b.subcategory});
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
          if(snap.val()[a].category=="술"){
            
        this.obj.push(snap.val()[a].subcategory);
            this.sullist.push(snap.val()[a]);
          }
          if(snap.val()[a].category=="안주"){
            this.obj2.push(snap.val()[a].subcategory);
            this.anjulist.push(snap.val()[a]);
            
          }
          if(snap.val()[a].category=="음료"){
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
    });

  }

}
