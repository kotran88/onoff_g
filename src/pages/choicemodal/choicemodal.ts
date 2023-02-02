import { Component ,ViewChild} from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
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
  @ViewChild('input')  myInput7 ;
  @ViewChild('input2') myInput8 ;
  @ViewChild('input3') myInput9 ;
  @ViewChild('input4') myInput10 ;
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
  text2:any="";
  name:any="";
  text3:any="";
  text4:any="";
  text5:any="";
  currentstartday:any="";
  currentstart:any="";
  text6:any="";
  text7:any="";
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
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
    // if(event.value.length==3){
    //   if(v==1){
    //     if(this.text.length==3){
    //       this.myInput2.setFocus();
    //     }
    //   }
    //   if(v==2){
    //     if(this.text2.length==3){
    //       this.myInput3.setFocus();
    //     }
    //   }
    // }else{
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
      }
    
    
    
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
      
    this.agasilist.push({  "name":this.text,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
      
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
    console.log(this.a);
    console.log(this.name);

    var key=this.firemain.child("list").push().key;
    console.log(this.agasilist)
    var clean = this.agasilist.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.name === arr.name)))
    console.log(clean)
    this.agasilist=clean;
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        console.log(b);
        if(snap.val()[b].type=="agasi"){

          for(var a in this.agasilist){
            console.log(this.agasilist[a].name);
            console.log(this.agasilist[a].date);
            if(this.agasilist[a].name.trim() == snap.val()[b].name.trim()){
              console.log("match"+snap.val()[b].name.trim());
              var dte = new Date();
              // console.log(dte.getHours());
              dte.setHours(dte.getHours()+9);
              console.log("dte : "+dte);
              console.log(this.agasilist[a].date);
              var agasidate = new Date(this.agasilist[a].date);
              agasidate.setHours(agasidate.getHours()+9);
              console.log(agasidate);
              this.firemain.child("users").child(snap.val()[b].id).child("current").update({"room":this.a.name,"enter_date":agasidate})
              console.log(this.a.name);
              console.log(this.currentstartday)
              console.log(this.a.key);
              console.log(this.a);
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update(this.a);
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(this.a.name).child(this.currentstartday).child(this.a.key).update({"enter_date_full":agasidate})
            }else{
              console.log("no match");
            }
          }
        }
      }
    
  });
  console.log("agasilist to put in company node");
  console.log(this.agasilist);
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").update(this.agasilist);
   this.view.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicemodalPage');
  }

}
