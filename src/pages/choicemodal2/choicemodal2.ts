import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
import { writeToNodes } from 'ionic-angular/umd/components/virtual-scroll/virtual-util';
import { HTTP } from '@ionic-native/http/ngx';
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
  token:any;
  jopanteam0:any;
  jopanteam1:any;
  successcount:any=0;
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
  a:any="";
  newnum:any=0;
  nickname:any="";
  constructor(public http:HTTP,public util:UtilsProvider, public loading:LoadingController,public view:ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.token = localStorage.getItem("token");
    var aaa=this.navParams.get("agasi");
    console.log(aaa);
    console.log(this.agasilist);
    var name = localStorage.getItem("name");
    this.flag = this.navParams.get("flag");
    this.a = this.navParams.get("room");
    this.nickname = localStorage.getItem("nickname");

    this.newnum = this.navParams.get("newnum");
    console.log(this.a);
    console.log(this.flag);
    console.log("was a and flag");
    if(this.flag=="attend"){
      this.agasilist=[];
      for(var eee in aaa){
        console.log(aaa[eee])
        this.agasilist.push({"name":aaa[eee].name,"writer":this.nickname})
      }
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
    var newcount=0;

    console.log(newcount);
    console.log(this.newnum);
    for(var cc in this.agasilist){
     
      count++;
      newcount++;
      if(this.agasilist[cc].angel==undefined){
        this.agasilist[cc].angel=false;
      }
    console.log(this.agasilist[cc])
    console.log("value1=" + count);
    console.log(this.agasilist[cc].name);
    console.log(this.quelist[count]);
     
      var dte = new Date();
      console.log(this.flag);
      console.log(this.a);
      console.log(this.agasilist[cc])
      console.log(this.a);
      if(this.flag==undefined){
        //초이스일경우,
        // this.firemain.child("users").child(this.agasilist[cc].name).child("current").update({"room":this.a.name,"enter_date":dte,"date":this.currentstartday})
     
      }else{
        //출퇴근일경우 
        // this.firemain.child("users").child(this.agasilist[cc].name).child("current").update({"room":this.a,"enter_date":dte,"date":this.currentstartday})
      }
      
      // this.firemain.child("users").child(this.agasilist[cc].name).child("current").update({"room":this.a.name,"enter_date":dte})
      if(this.flag=="attend"){
        this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).child("attend").update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name});
        this.firemain.child("users").child(this.agasilist[cc].name).update({"jopan":this.quelist[count],"status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name,"nickname":this.agasilist[cc].name })
        this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":this.quelist[count],"name":this.agasilist[cc].name,"flag":"justcome","date":this.currentstartday, "time":hour+":"+min})
      }else{

        var json  = [];
        json.push({"userid":this.agasilist[cc].name,"userpw":"notyet","name":this.agasilist[cc].name,"nickname":this.agasilist[cc].name, "ph":"0100000000","company":"유앤미","mtype":"agasi","salesteam":"no","jopanteam":this.quelist[count],"created_by":this.nickname});
        console.log("json : ");
        console.log(json);
    this.http.post("https://captainq.wadteam.com/captainq/apis/joinus", {"userid":this.agasilist[cc].name,"userpw":"no","name":this.agasilist[cc].name,"nickname":this.agasilist[cc].name, "ph":"0100000000","company":"유앤미","mtype":"agasi","salesteam":"no","jopanteam":this.quelist[count],"created_by":this.nickname}, {"token":this.token}).then(data => {
       
      console.log(data);
      console.log(data.data);
      var a = JSON.parse(data.data)
      var result = a.rst_code;

      console.log("add member...");
      console.log(result);
      console.log("content....");
      var content = JSON.parse(a.rst_content) ;
      console.log("content....  ");
      console.log(content);
      console.log(content[0]);
      console.log(content[0].idx);
      var angel = 0;
      var json2  = [];
      json2.push({"room_idx":this.a.key,"member_idx":content[0].idx,"angel":angel,"incharge":this.a.incharge,"enter_dt":this.util.getCurrentFormattedDateTime(),"created_by":this.nickname});
      console.log("json2222 : ");
      console.log(json2);
  this.http.post("https://captainq.wadteam.com/captainq/apis/roomdetail", {"room_idx":this.a.key,"member_idx":content[0].idx,"angel":angel,"incharge":this.a.incharge,"enter_dt":this.util.getCurrentFormattedDateTime(),"created_by":this.nickname}, {"token":this.token}).then(data => {
     
        console.log("data from roomdetail");
        console.log(data);

        var a = JSON.parse(data.data)
      var result = a.rst_code;

      console.log("get roomdetail member...");
      console.log(result);
      console.log("content....");
      var content = JSON.parse(a.rst_content) ;
      console.log("content....  ");
      console.log(content);

      });
      if(result=="SUCCESS"){
       this.successcount++;
       console.log(this.successcount);
      }
       
      });
        console.log(this.a.wt+"에 추가 +"+this.currentstartday+",,,,"+this.a.key);
        // this.firemain.child("users").child(this.a.wt).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(this.newnum).update({ "angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        // this.firemain.child("users").child(this.a.directorId).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(this.newnum).update({"angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
            
        // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({"lastupdatedperson":this.nickname, "lastupdated":year+"-"+month+"-"+day +" "+hour+":"+min+""})
        // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").child(this.newnum+"").update({"num":this.newnum, "angel": this.agasilist[cc].angel, "roomno":this.a.name, "name":this.agasilist[cc].name,"incharge":this.a.incharge, "writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min});
        // this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("message").push({"date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드..","agasi":this.agasilist[cc].name,"uploader":this.nickname,"type":"assigned", "name":"system"})

        // this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":this.quelist[count],"name":this.agasilist[cc].name,"flag":"justcome","date":this.currentstartday, "time":hour+":"+min})
        // this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).update({"currentStatus":"justcome"})
        // this.firemain.child("users").child(this.agasilist[cc].name).update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name,"nickname":this.agasilist[cc].name ,"writer":this.agasilist[cc].writer})
        // this.firemain.child("users").child(this.agasilist[cc].name).child("attendance").child(this.currentstartday).child("attend").update({"jopan":this.quelist[count], "status":false, "type":"agasi","company":this.company,"id":this.agasilist[cc].name,"name":this.agasilist[cc].name});
        // this.newnum++;
      }
      
    }
    if(this.successcount == this.agasilist.length){
    }else{
    }
    this.util.dismissLoading();
    this.view.dismiss({"result":"ok"})
    console.log("confirm...");
  }
  cancel(){
    this.view.dismiss({"result":false});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Choicemodal2Page');
  }

}
