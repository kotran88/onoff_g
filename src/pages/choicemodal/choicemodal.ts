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
  text3:any="";
  text4:any="";
  text5:any="";
  text6:any="";
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
   this.a =  this.navParams.get("a");
    console.log(this.a);
    this.company = localStorage.getItem("company");

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
      
    this.agasilist.push({ "name":this.text,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
      
    this.agasilist.push({ "name":this.text2,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text3.length>=2){
      
    this.agasilist.push({ "name":this.text3,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text4.length>=2){
      
    this.agasilist.push({ "name":this.text4,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text5.length>=2){
      
    this.agasilist.push({ "name":this.text5,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text6.length>=2){
      
    this.agasilist.push({ "name":this.text6,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.a.key).child("agasi").update(this.agasilist);
   this.view.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicemodalPage');
  }

}
