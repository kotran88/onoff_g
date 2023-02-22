import { Component ,ViewChild} from '@angular/core';
import { IonicPage,ViewController,ModalController, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
/**
 * Generated class for the ChoicemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicemodal',
  templateUrl: 'choicemodal.html',
})
export class ChoicemodalPage {
  @ViewChild('input')  myInput ;
  @ViewChild('input2') myInput2 ;
  @ViewChild('input3') myInput3 ;
  @ViewChild('input4') myInput4 ;
  @ViewChild('input5') myInput5 ;
  @ViewChild('input6') myInput6 ;
  @ViewChild('input7')  myInput7 ;
  @ViewChild('input8') myInput8 ;
  @ViewChild('input9') myInput9 ;
  @ViewChild('input10') myInput10 ;
  @ViewChild('input11')  myInput11 ;
  @ViewChild('input12') myInput12 ;
  @ViewChild('input13') myInput13 ;
  @ViewChild('input14') myInput14 ;
  @ViewChild('input15') myInput15 ;
  @ViewChild('input16') myInput16 ;
  @ViewChild('input17')  myInput17 ;
  @ViewChild('input18') myInput18 ;
  @ViewChild('input19') myInput19 ;
  @ViewChild('input20') myInput20 ;
  a:any;
  firemain = firebase.database().ref();
  text:any="";
  company:any = "";
  agasilist=[];
  originalList=[];
  text2:any="";
  name:any="";
  text3:any="";
  subscribedList=[];
  text4:any="";
  text5:any="";
  currentstartday:any="";
  currentstart:any="";
  text6:any="";
  text7:any="";
  text8:any="";
  text9:any="";
  constructor(public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
   this.a =  this.navParams.get("a");
    console.log(this.a);
    this.company = localStorage.getItem("company");
    this.name = localStorage.getItem("name");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    var agasi = this.a.agasi;
    for(var a in agasi){
      console.log(agasi[a].name)
      if(agasi[a].findate==undefined){
        this.agasilist.push({ "name":agasi[a].name,
     
      "date":agasi[a].date,
    })
      }else{
        this.agasilist.push({ "name":agasi[a].name,
      "findate":agasi[a].findate,
      "date":agasi[a].date,
      "money":agasi[a].money,
      "roomno":agasi[a].roomno,
      "wt":agasi[a].wt,
      "tc":agasi[a].tc})
      }
      
      if(this.agasilist.length==1){
        this.text=this.agasilist[0].name;
      }
      if(this.agasilist.length==2){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
      }
      if(this.agasilist.length==3){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
      }
      if(this.agasilist.length==4){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
      }
      if(this.agasilist.length==5){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
      }
      if(this.agasilist.length==6){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
        this.text6=this.agasilist[5].name;
      }
      if(this.agasilist.length==7){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
        this.text6=this.agasilist[5].name;
        this.text7=this.agasilist[6].name;
      }

      if(this.agasilist.length==8){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
        this.text6=this.agasilist[5].name;
        this.text7=this.agasilist[6].name;
        this.text5=this.agasilist[7].name;
      }

      if(this.agasilist.length==9){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
        this.text6=this.agasilist[5].name;
        this.text7=this.agasilist[6].name;
        this.text5=this.agasilist[7].name;
        this.text6=this.agasilist[8].name;
      }

      if(this.agasilist.length==10){
        this.text=this.agasilist[0].name;
        this.text2=this.agasilist[1].name;
        this.text3=this.agasilist[2].name;
        this.text4=this.agasilist[3].name;
        this.text5=this.agasilist[4].name;
        this.text6=this.agasilist[5].name;
        this.text7=this.agasilist[6].name;
        this.text5=this.agasilist[7].name;
        this.text6=this.agasilist[8].name;
        this.text7=this.agasilist[9].name;
      }

    }

    console.log("current agasi : ");
    console.log(this.agasilist);
  }
  onKeyPressed(event){
    console.log(event.key) ;
    console.log(event.keyCode);
  };
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
      this.myInput10.setFocus();
  }
    
      }
    
    
    
  }
  cancel(){
    this.view.dismiss();
  }
  confirm(){
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    console.log("confirm");
    if(this.text.length>=2){
      console.log("agasilist input text");
    this.agasilist.push({  "name":this.text,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
      
      console.log("agasilist input text2");
    this.agasilist.push({ "name":this.text2,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text3.length>=2){
      
    this.agasilist.push({ "name":this.text3,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text4.length>=2){
      
    this.agasilist.push({ "name":this.text4,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text5.length>=2){
      
    this.agasilist.push({ "name":this.text5,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text6.length>=2){
      
    this.agasilist.push({ "name":this.text6,
    "date": this.currentstartday +" "+hour+":"+min})
    }




    if(this.text7.length>=2){
      
      this.agasilist.push({ "name":this.text7,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text8.length>=2){
        
      this.agasilist.push({ "name":this.text8,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text9.length>=2){
        
      this.agasilist.push({ "name":this.text9,
      "date": this.currentstartday +" "+hour+":"+min})
      }

    console.log(this.text);
    console.log(this.text2);
    console.log(this.text3);
    console.log(this.text4);
    console.log(this.text5);
    console.log(this.text6);
    console.log(this.text7);
    console.log(this.text8);
    console.log(this.text9);
    
    console.log(this.a);
    console.log(this.name);

    var key=this.firemain.child("list").push().key;
    console.log(this.agasilist)
    var clean = this.agasilist.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.name === arr.name)))
    console.log(clean)
    this.agasilist=clean;
    for(var a in this.agasilist){
      this.originalList.push(this.agasilist[a]);
    }
    // this.originalList=this.agasilist;
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
              this.firemain.child("users").child(snap.val()[b].id).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
              this.firemain.child("users").child(snap.val()[b].id).child("attendance").child(this.currentstartday).child("attend").update({"team":snap.val()[b].jopan,"name":snap.val()[b].name,"date":this.currentstartday,"flag":"attend","time":hour+":"+min})
              this.firemain.child("users").child(snap.val()[b].id).child("current").update({"room":this.a.name,"enter_date":agasidate})
              this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[a].name).child("attend").update({ "team":snap.val()[b].jopan,"name":this.agasilist[a].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
   
              console.log(this.a.name);
              console.log("snap.val()[b].name : "+snap.val()[b].name);
              this.subscribedList.push({"id":snap.val()[b].id,"name":snap.val()[b].name});
              console.log(this.currentstartday)
              console.log(this.a.key);
              console.log(this.a);
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
      console.log(this.originalList.length);
      console.log(this.agasilist.length);
      console.log(this.subscribedList.length);
     
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
      if(this.originalList.length!=this.subscribedList.length){
        console.log("추가등록할것...");
        console.log(this.agasilist);
        console.log(this.originalList);


        console.log("modal open");

        let modal = this.modal.create(Choicemodal2Page,{"agasi":this.agasilist,"subscribedList":this.subscribedList,"room":this.a,"currentstartday":this.currentstartday,"hour":hour,"min":min});
        modal.onDidDismiss(url => {
          console.log(url);
          if(url.result==undefined){

          }else if(url.result=="ok"){
            window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
            console.log(this.originalList);
            this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").update(this.originalList);
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
        this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").update(this.originalList);
        this.view.dismiss();
      }
     
      if(this.agasilist.length!=0){
      }else{

      }

      console.log("snap end agasilist");
      console.log(this.agasilist);
  });
  console.log("agasilist to put in company node");
   }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicemodalPage');
  }

}
