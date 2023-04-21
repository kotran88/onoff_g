import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the Choicemodal2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicemodal2',
  templateUrl: 'choicemodal2.html',
})
export class Choicemodal2Page {
  agasilist=[];
  firemain = firebase.database().ref();
  jopanteam:any;
  jopanteam0:any;
  jopanteam1:any;
  jopanlist=[];
  company:any;

  lloading:any;
  currentstartday:any="";
  currentstart:any="";
  quelist=[];
  qtd0 = 'no';

  qtd1 = 'no';
  qtd2 = 'no';
  qtd3 = 'no';
  qtd4 = 'no';
  qtd5 = 'no';
  qtd6 = 'no';
  flag:any="notattend";
  qtd7 = 'no';
  qtd8 = 'no';
  constructor(public util:UtilsProvider, public loading:LoadingController,public view:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    var aaa=this.navParams.get("agasi");
    console.log(aaa);
    console.log(this.agasilist);
    var name = localStorage.getItem("name");
    this.flag = this.navParams.get("flag");
    if(this.flag=="attend"){
      this.agasilist=[];
    this.agasilist.push({"name":aaa.name,"writer":name})
    }else{
      this.agasilist=this.navParams.get("agasi");
    }
    
    console.log("was agasilist2")
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    console.log("agasi modal 2..");
    console.log(this.agasilist);
    this.company = localStorage.getItem("company");
    this.firemain.child("company").child(this.company).once('value').then((snap)=>{
      console.log(snap.val().jopanlist);
      console.log(snap.val().jopanlist.length);
      this.jopanlist=snap.val().jopanlist;
      this.jopanlist.push({"name":"미지정"});
      console.log(this.jopanlist);
    });

    console.log(this.agasilist);
  }
  confirm(){
    this.util.presentLoading();
    console.log(this.agasilist);
    console.log(this.agasilist.length);
    // if(this.agasilist.length==9){
    //   if()
    // }
    if(this.qtd0!="no"){
      this.quelist.push(this.qtd0)
    }
    if(this.qtd1!="no"){
      this.quelist.push(this.qtd1)
    }
    if(this.qtd2!="no"){
      this.quelist.push(this.qtd2)
    }
    if(this.qtd3!="no"){
      this.quelist.push(this.qtd3)
    }
    if(this.qtd4!="no"){
      this.quelist.push(this.qtd4)
    }
    if(this.qtd5!="no"){
      this.quelist.push(this.qtd5)
    }
    if(this.qtd6!="no"){
      this.quelist.push(this.qtd6)
    }
    if(this.qtd7!="no"){
      this.quelist.push(this.qtd7)
    }
    if(this.qtd8!="no"){
      this.quelist.push(this.qtd8)
    }
    
    console.log(this.quelist);
    if(this.quelist.length==this.agasilist.length){

    }else{
      window.alert("조판팀 설정은 필수입니다.")
      this.util.dismissLoading();
      return;
    }
    
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    console.log(this.agasilist);
    console.log("was this.agasilist")

    console.log(this.qtd0);
    console.log(this.qtd1);
    console.log(this.qtd2);
    var count=-1;
    for(var cc in this.agasilist){
      count++;
    console.log(this.agasilist[cc])
    console.log("value1=" + count);
    console.log(this.agasilist[cc].name);
    console.log(this.quelist[count]);
      // this.firemain.child("company").child(this.company).child("agasi").child(this.agasilist[cc].key).update({
      //   qtd:this.agasilist[cc].qtd,
      // });


      var agasidate = new Date(this.agasilist[cc].date);
      agasidate.setHours(agasidate.getHours()+9);
      console.log(agasidate);
     
      if(this.flag=="attend"){
        this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).child("attend").update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name});
        this.firemain.child("users").child(this.agasilist[cc].name).update({"jopan":this.quelist[count]})
        this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":this.quelist[count]});
      }else{
        this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":this.quelist[count],"name":this.agasilist[cc].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
        this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
        this.firemain.child("users").child(this.agasilist[cc].name).update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name ,"writer":this.agasilist[cc].writer})
        this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).child("attend").update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name});
      }
      
      
    }
    this.util.dismissLoading();
    this.view.dismiss({"result":"ok"})
    console.log("confirm...");
  }
  cancel(){
    this.view.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Choicemodal2Page');
  }

}
