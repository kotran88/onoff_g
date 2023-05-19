import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,ModalController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the Choicemodal3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicemodal3',
  templateUrl: 'choicemodal3.html',
})
export class Choicemodal3Page {

  newlist=[];
  @ViewChild('input')  myInput ;
  @ViewChild('input2') myInput2 ;
  @ViewChild('input3') myInput3 ;
  @ViewChild('input4') myInput4 ;
  @ViewChild('input5') myInput5 ;
  @ViewChild('input6') myInput6 ;
  @ViewChild('input7')  myInput7 ;
  @ViewChild('input8') myInput8 ;
  @ViewChild('input9') myInput9 ;
  nickname:any="";
  subscribedList=[];
  company:any = "";
  agasilist=[];
  originalList=[];
  text:any="";
  text2:any="";
  text3:any="";
  name:any="";
  text4:any="";
  text5:any="";
  currentstartday:any="";
  text6:any="";
  text7:any="";
  text8:any="";

  writer:any="";
  writer2:any="";
  writer3:any="";
  writer4:any="";
  writer5:any="";
  writer6:any="";
  writer7:any="";
  writer8:any="";
  writer9:any="";
  text9:any="";
  a:any=[];
  firemain = firebase.database().ref();
  constructor(public util:UtilsProvider, public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.company = localStorage.getItem("company");
    this.currentstartday=localStorage.getItem("startDate");
    this.a=this.navParams.get("a");
    //console.log(this.a);
    this.nickname= localStorage.getItem("nickname");
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Choicemodal3Page');
  }

  onChangeTime(event,v){
    //console.log(event.value);
    //console.log(event.value.length);
      if (event.value.includes(' ')) { 
        // Found space 
        if(v==1){
            this.myInput2.setFocus();
        }
        if(v==2){
            this.myInput3.setFocus();
        }
        if(v==3){
            this.myInput4.setFocus();
        }
        if(v==4){
            this.myInput5.setFocus();
        }
        if(v==5){
            this.myInput6.setFocus();
        }
        if(v==6){
          this.myInput7.setFocus();
      }
        if(v==7){
          this.myInput8.setFocus();
      }
      if(v==8){
        this.myInput9.setFocus();
    }
    if(v==9){
  }
    
      }
    
    
    
  }
  filterDuplicates(arr) {
    var seen = {};
    console.log("Filter....");
    var dupflag=false;
    arr.filter(function(obj) {
      if (seen.hasOwnProperty(obj.name)) {
        console.log("is false");
        window.alert(obj.name+"은 이미 입력한 이름입니다."+arr.length);
        dupflag =  true
        return false;
      }else{
          seen[obj.name] = true;
          return true;
      }
    });
    return dupflag;
  }
  getRoomList(v,newlist,subscribedList,currentstartday,modal,length,view,firemain,company){
   
    this.firemain.child("users").child(v.name).once("value",function(snapshot){
      console.log(snapshot.val());
      console.log(v.name);
      var dte = new Date();
                dte.setHours(dte.getHours()+9);
                var agasidate = new Date(v.date);
                agasidate.setHours(agasidate.getHours()+9);

      if(snapshot.val()==null){
        //최초등록
        console.log(v.name+'first so push to newlist')
        newlist.push({ "name":v.name,
        "date": v.date ,"writer":v.writer});
      }else if (snapshot.val().jopan==undefined){

      console.log(snapshot.val().jopan);
        console.log(v.name+"already")
       // 이미등록되었지만 조판팀 설정안되있음. 
      }else{


      console.log(snapshot.val().jopan);
        console.log(v.name+"already real")

        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();

        firemain.child("users").child(v.name.trim()).child("attendance").child(currentstartday).update({"currentStatus":"attend"})
        firemain.child("users").child(v.name.trim()).child("attendance").child(currentstartday).child("attend").update({"team":snapshot.val().jopan,"name":v.name,"date":currentstartday,"flag":"attend","time":hour+":"+min})
        firemain.child("users").child(v.name.trim()).update({"jopan":snapshot.val().jopan,"name":v.name,type:"agasi",writer:v.writer,status:false,id:v.name,company:company})
        firemain.child("attendance").child(company).child(currentstartday).child(v.name).child("attend").update({ "team":snapshot.val().jopan,"name":v.name,"flag":"attend","date":currentstartday, "time":hour+":"+min})

        subscribedList.push({"id":v.name,"name":v.name});

         // 이미등록됨
      }


      var date = new Date();
  
      
      var hour = date.getHours();
      var min = date.getMinutes();

      console.log(newlist);
      console.log(subscribedList);
      console.log(newlist.length);
      console.log(subscribedList.length);
      if(subscribedList.length + newlist.length == length){
        console.log("Fin!!!")
        if(newlist.length==0){
          view.dismiss();
        }else{
          let modal2 = modal.create(Choicemodal2Page,{"agasi":newlist,"flag":"attend",  "subscribedList":subscribedList,"room":"100","currentstartday":currentstartday,"hour":hour,"min":min});
          modal2.onDidDismiss(url => {
            //console.log(url);
            if(url==undefined){
              return;
            }else{
              if(url.result=="ok"){
                window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
                //console.log(this.originalList);
                view.dismiss();
              }
            }
            
          });
      modal2.present();
        }
       
      }
    });  }
  confirm(){
    this.agasilist=[];
    this.util.presentLoading();
    //console.log("출근부 출근 처리 시작")
    if(this.writer.length==0){
      this.writer=this.nickname;
    }
    if(this.writer2.length==0){
      this.writer2=this.nickname;
    }
    if(this.writer3.length==0){
      this.writer3=this.nickname;
    }
    if(this.writer4.length==0){
      this.writer4=this.nickname;
    }
    if(this.writer5.length==0){
      this.writer5=this.nickname;
    }
    if(this.writer6.length==0){
      this.writer6=this.nickname;
    }
    if(this.writer7.length==0){
      this.writer7=this.nickname;
    }
    if(this.writer8.length==0){
      this.writer8=this.nickname;
    }
    if(this.writer9.length==0){
      this.writer9=this.nickname;
    }
    
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    if(this.text.length>=2){
      //console.log("agasilist input text");
    this.agasilist.push({  "name":this.text.trim(),
    "date": year+"-"+month+"-"+day +" "+hour+":"+min ,"writer":this.writer})
    }
    if(this.text2.length>=2){
      
      //console.log("agasilist input text2");
    this.agasilist.push({ "name":this.text2.trim(),
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min,"writer":this.writer2})
    }
    if(this.text3.length>=2){
      
    this.agasilist.push({ "name":this.text3.trim(),
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min,"writer":this.writer3})
    }
    if(this.text4.length>=2){
      
    this.agasilist.push({ "name":this.text4.trim(),
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer4})
    }
    if(this.text5.length>=2){
      
    this.agasilist.push({ "name":this.text5.trim(),
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer5})
    }
    if(this.text6.length>=2){
      
    this.agasilist.push({ "name":this.text6.trim(),
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer6})
    }




    if(this.text7.length>=2){
      
      this.agasilist.push({ "name":this.text7.trim(),
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer7})
      }
      if(this.text8.length>=2){
        
      this.agasilist.push({ "name":this.text8.trim(),
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer8})
      }
      if(this.text9.length>=2){
        
      this.agasilist.push({ "name":this.text9.trim(),
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer9})
      }
    //iterate agasilist and this.a and compare if there is same name
    //if there is same name, then change var dupflag to true 
    //if dupflag is true, then show alert
    //if dupflag is false, then save to firebase
    var dupflag=false;
    var dupname = "";
    for(var a in this.agasilist){
      for(var b in this.a){
        if(this.agasilist[a].name.trim() == this.a[b].name.trim()){
          dupflag=true;
          dupname = this.a[b].name;
        }
      }
    }
    var result= this.filterDuplicates(this.agasilist);
    if(result==true)
    {
      this.util.dismissLoading();
      return;
    }
    if(dupflag==true){
      window.alert(dupname+" :  출근처리된 이름입니다.");
      this.util.dismissLoading();
      return;
    }
    
      var clean = this.agasilist.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.name === arr.name)))
      //console.log(clean)
      this.agasilist=clean;

      console.log(this.agasilist);
      var newlist = [];
      var subscribedList = [];
      var n:any=0;
      for(var a in this.agasilist){
         n=this.getRoomList(this.agasilist[a],newlist,subscribedList,this.currentstartday,this.modal,this.agasilist.length,this.view,this.firemain,this.company);
      }
      this.util.dismissLoading();
      return;
      for(var a in this.agasilist){
        this.originalList.push(this.agasilist[a]);
      }
      this.firemain.child("users").once("value",snap=>{
        //console.log(this.agasilist);
        //console.log(this.originalList);
        for(var b in snap.val()){
        //   //console.log(b);
        
        //console.log(snap.val()[b].nickname);
          if(snap.val()[b].type=="agasi"){
              //console.log(snap.val()[b]);
              //console.log(snap.val()[b].nickname);
              if(snap.val()[b].nickname==undefined){
                continue;
              }
        //console.log(this.agasilist);
            for(var a in this.agasilist){
              if(this.agasilist[a].name.trim() == snap.val()[b].nickname.trim()){
                var dte = new Date();
                dte.setHours(dte.getHours()+9);
                var agasidate = new Date(this.agasilist[a].date);
                agasidate.setHours(agasidate.getHours()+9);
                if(snap.val()[b].jopan==undefined){
  
                }

        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();
                this.firemain.child("users").child(snap.val()[b].id.trim()).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
                this.firemain.child("users").child(snap.val()[b].id.trim()).child("attendance").child(this.currentstartday).child("attend").update({"team":snap.val()[b].jopan,"name":snap.val()[b].name,"date":this.currentstartday,"flag":"attend","time":hour+":"+min})
                this.firemain.child("users").child(snap.val()[b].id.trim()).update({"jopan":snap.val()[b].jopan,"name":this.agasilist[a].name,type:"agasi",writer:this.agasilist[a].writer,status:false,id:snap.val()[b].id,company:this.company})
                this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[a].name).child("attend").update({ "team":snap.val()[b].jopan,"name":this.agasilist[a].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
     
                this.subscribedList.push({"id":snap.val()[b].id,"name":snap.val()[b].nickname});
              }else{
                // //console.log(this.agasilist[a].name.trim()+"no matchhh");
                
              }
            }
          }
        }
        //console.log("reseting!");
        //console.log(this.originalList);
        //console.log(this.agasilist);
        //console.log(this.subscribedList);

        //console.log(this.originalList.length); //0   , 없는 이름  0 
        //console.log(this.agasilist.length); //1     ,          1
        //console.log(this.subscribedList.length); //1          0
        var subscribedListNames = this.subscribedList.map(function(obj) {
          return obj.name;
        });

        this.newlist = this.agasilist.filter(function(obj) {
          return !subscribedListNames.includes(obj.name);
        });
        //console.log("nlist : ");
        //console.log(this.newlist);
        //remove subscribedList value from this.agasilist
        for(var i=0;i<this.agasilist.length;i++){
          for(var j=0;j<this.subscribedList.length;j++){
            if(this.agasilist[i]!=undefined&&this.subscribedList[j]!=undefined){
              if(this.agasilist[i].name.trim()==this.subscribedList[j].name.trim()){
                this.agasilist.splice(i,1);
              }
            }
          }
        }
  
        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();
        //console.log("this is new List...")
        //console.log(this.newlist);

        this.util.dismissLoading();
        if(this.newlist.length!=0){
          //console.log(this.agasilist);
          //console.log(this.originalList);

         // 수정 1개로 만원. 
         //console.log("추가등록할것...");

         let modal = this.modal.create(Choicemodal2Page,{"agasi":this.newlist,"flag":"attend", "subscribedList":this.subscribedList,"room":"100","currentstartday":this.currentstartday,"hour":hour,"min":min});
         modal.onDidDismiss(url => {
           //console.log(url);
           if(url==undefined){
             return;
           }else{
             if(url.result=="ok"){
               window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
               //console.log(this.originalList);
               this.navCtrl.pop();
               setTimeout(()=>{
                this.view.dismiss();
               },500)
             }
           }
           
         });
     modal.present();
        }else{

          //console.log("eeelse...come...");

          this.view.dismiss();
        }
        return;
        //console.log(this.agasilist);
        //console.log(this.originalList);
        //console.log(this.subscribedList);
      if(this.originalList.length!=this.subscribedList.length){
          //console.log("추가등록할것...");
          //console.log(this.agasilist);
          //console.log(this.originalList);
  
  
          //console.log("modal open");
          let modal = this.modal.create(Choicemodal2Page,{"agasi":this.agasilist,"flag":"attend", "subscribedList":this.subscribedList,"room":"100","currentstartday":this.currentstartday,"hour":hour,"min":min});
          modal.onDidDismiss(url => {
            //console.log(url);
            if(url==undefined){
              return;
            }else{
              if(url.result=="ok"){
                window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
                //console.log(this.originalList);
                this.navCtrl.pop();
                setTimeout(()=>{
                 this.view.dismiss();
                },500)
              }
            }
            
          });
      modal.present();
        }else{
  
          //console.log(this.agasilist);
          //console.log(this.originalList);
          this.view.dismiss();
        }
       
        if(this.agasilist.length!=0){
        }else{
  
        }
  
        //console.log("snap end agasilist");
        //console.log(this.agasilist);
    });
  }
  cancel(){
    this.view.dismiss({"result":"cancel"});
  }

}
