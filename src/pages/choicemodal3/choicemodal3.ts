import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController,ModalController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
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

  @ViewChild('input')  myInput ;
  @ViewChild('input2') myInput2 ;
  @ViewChild('input3') myInput3 ;
  @ViewChild('input4') myInput4 ;
  @ViewChild('input5') myInput5 ;
  @ViewChild('input6') myInput6 ;
  @ViewChild('input7')  myInput7 ;
  @ViewChild('input8') myInput8 ;
  @ViewChild('input9') myInput9 ;
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
  firemain = firebase.database().ref();
  constructor(public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.company = localStorage.getItem("company");
    this.currentstartday=localStorage.getItem("startDate");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Choicemodal3Page');
  }

  onChangeTime(event,v){
    console.log(event.value);
    console.log(event.value.length);
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
  confirm(){
    console.log("출근부 출근 처리 시작")
    if(this.writer.length==0){
      this.writer=this.name;
    }
    if(this.writer2.length==0){
      this.writer2=this.name;
    }
    if(this.writer3.length==0){
      this.writer3=this.name;
    }
    if(this.writer4.length==0){
      this.writer4=this.name;
    }
    if(this.writer5.length==0){
      this.writer5=this.name;
    }
    if(this.writer6.length==0){
      this.writer6=this.name;
    }
    if(this.writer7.length==0){
      this.writer7=this.name;
    }
    if(this.writer8.length==0){
      this.writer8=this.name;
    }
    if(this.writer9.length==0){
      this.writer9=this.name;
    }
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    if(this.text.length>=2){
      console.log("agasilist input text");
    this.agasilist.push({  "name":this.text,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min ,"writer":this.writer})
    }
    if(this.text2.length>=2){
      
      console.log("agasilist input text2");
    this.agasilist.push({ "name":this.text2,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min,"writer":this.writer2})
    }
    if(this.text3.length>=2){
      
    this.agasilist.push({ "name":this.text3,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min,"writer":this.writer3})
    }
    if(this.text4.length>=2){
      
    this.agasilist.push({ "name":this.text4,
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer4})
    }
    if(this.text5.length>=2){
      
    this.agasilist.push({ "name":this.text5,
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer5})
    }
    if(this.text6.length>=2){
      
    this.agasilist.push({ "name":this.text6,
    "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer6})
    }




    if(this.text7.length>=2){
      
      this.agasilist.push({ "name":this.text7,
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer7})
      }
      if(this.text8.length>=2){
        
      this.agasilist.push({ "name":this.text8,
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer8})
      }
      if(this.text9.length>=2){
        
      this.agasilist.push({ "name":this.text9,
      "date": this.currentstartday +" "+hour+":"+min,"writer":this.writer9})
      }
    
    
      var clean = this.agasilist.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.name === arr.name)))
      console.log(clean)
      this.agasilist=clean;
      for(var a in this.agasilist){
        this.originalList.push(this.agasilist[a]);
      }
      this.firemain.child("users").once("value",snap=>{
        console.log(this.agasilist);
        console.log(this.originalList);
        for(var b in snap.val()){
        //   console.log(b);
          if(snap.val()[b].type=="agasi"){
            console.log("agasi list is....");
        console.log(this.agasilist);
            for(var a in this.agasilist){
              if(this.agasilist[a].name.trim() == snap.val()[b].name.trim()){
                var dte = new Date();
                dte.setHours(dte.getHours()+9);
                console.log("dte : "+dte);
                console.log(this.agasilist[a].date);
                var agasidate = new Date(this.agasilist[a].date);
                agasidate.setHours(agasidate.getHours()+9);
                console.log(agasidate);
                console.log("users and id "+snap.val()[b].id);
                console.log(snap.val()[b]);
                console.log("jopan : "+snap.val()[b].jopan);
                if(snap.val()[b].jopan==undefined){
  
                }

        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();
                this.firemain.child("users").child(snap.val()[b].id).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
                this.firemain.child("users").child(snap.val()[b].id).child("attendance").child(this.currentstartday).child("attend").update({"team":snap.val()[b].jopan,"name":snap.val()[b].name,"date":this.currentstartday,"flag":"attend","time":hour+":"+min})
                this.firemain.child("users").child(snap.val()[b].id).update({"jopan":snap.val()[b].jopan,"name":this.agasilist[a].name,type:"agasi",writer:this.agasilist[a].writer,status:false,id:snap.val()[b].id,company:this.company})
                this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[a].name).child("attend").update({ "team":snap.val()[b].jopan,"name":this.agasilist[a].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
     
                console.log("snap.val()[b].name : "+snap.val()[b].name);
                this.subscribedList.push({"id":snap.val()[b].id,"name":snap.val()[b].name});
                console.log(this.currentstartday)
              }else{
                console.log(this.agasilist[a].name.trim()+"no matchhh");
                
              }
            }
          }
        }
        console.log("reseting!");
        console.log(this.originalList);
        console.log(this.agasilist);
        console.log(this.subscribedList);

        console.log(this.originalList.length); //0   , 없는 이름  0 
        console.log(this.agasilist.length); //1     ,          1
        console.log(this.subscribedList.length); //1          0
       
        //remove subscribedList value from this.agasilist
        for(var i=0;i<this.agasilist.length;i++){
          for(var j=0;j<this.subscribedList.length;j++){
            console.log("i and j");
            console.log(this.agasilist[i]);
            console.log(this.subscribedList[j]);
            if(this.agasilist[i]!=undefined&&this.subscribedList[j]!=undefined){
              if(this.agasilist[i].name.trim()==this.subscribedList[j].name.trim()){
                console.log("elminate!"+this.agasilist[i].name);
                this.agasilist.splice(i,1);
              }
            }
          }
        }
  
        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();
        console.log(hour+":"+min);
        console.log(this.originalList);
        console.log(this.subscribedList);
        console.log(this.agasilist);
        
      if(this.originalList.length!=this.subscribedList.length){
          console.log("추가등록할것...");
          console.log(this.agasilist);
          console.log(this.originalList);
  
  
          console.log("modal open");
          let modal = this.modal.create(Choicemodal2Page,{"agasi":this.agasilist,"subscribedList":this.subscribedList,"room":"100","currentstartday":this.currentstartday,"hour":hour,"min":min});
          modal.onDidDismiss(url => {
            console.log(url);
            console.log(url.result);
            if(url.result=="ok"){
              window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
              console.log(this.originalList);
              this.navCtrl.pop();
              setTimeout(()=>{
               this.view.dismiss();
              },500)
            }
          });
      modal.present();
        }else{
  
          console.log(this.agasilist);
          console.log(this.originalList);
          this.view.dismiss();
        }
       
        if(this.agasilist.length!=0){
        }else{
  
        }
  
        console.log("snap end agasilist");
        console.log(this.agasilist);
    });
  }
  cancel(){
    this.view.dismiss({"result":"cancel"});
  }

}
