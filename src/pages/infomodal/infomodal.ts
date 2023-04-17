import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the InfomodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-infomodal',
  templateUrl: 'infomodal.html',
})
export class InfomodalPage {
  wt:any="";
  incharge:any="";
  numofpeople:any="";
  booleanValue:any=false;
  booleanValue2:any=false;
  lloading:any;
  currentstartday:any="";
  currentstart:any="";
  room:any;
  company:any;
  bu:any=0;
  name:any;
  bujangyoung:any=""
  bujangid :any="noname";
  bujangjopan:any="";
  directorList:any=[];
  firemain = firebase.database().ref();
  constructor(public navCtrl: NavController,public loading:LoadingController,public view:ViewController, public navParams: NavParams) {
   this.room= this.navParams.get("room");
    this.bu= this.navParams.get("bu");
    this.directorList =  localStorage.getItem("director");
    console.log(this.directorList)
    this.directorList= JSON.parse(this.directorList);
    for(var a in this.directorList){
      console.log(this.directorList[a])
    }
   this.company = localStorage.getItem("company");
   this.currentstart=localStorage.getItem("start");
   this.name = localStorage.getItem("name");
   this.currentstartday=localStorage.getItem("startDate");
   console.log(this.currentstart);
   console.log(this.currentstartday);
   console.log("room",this.room);
   console.log(this.company)
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfomodalPage');
    console.log(this.directorList);

  }
   containsOnlyNumbers(input) {
    // Create a regular expression that matches only numbers
    var regex = /^[0-9]+$/;
  
    // Test the input against the regular expression
    return regex.test(input);
  }
  cancel(){

    this.view.dismiss();
  }
  myChange(v){
    console.log(this.booleanValue)
  }
  myChange2(v){
    console.log(this.booleanValue2)
  }
  confirm(){
    
    for(var abab in this.directorList){
      console.log(this.directorList[abab].name+",,,"+this.incharge);
      if(this.directorList[abab].name.trim()==this.incharge){
        console.log("matched...");


          this.bujangid=this.directorList[abab].id;
          this.bujangjopan = this.directorList[abab].jopan;
          this.bujangyoung = this.directorList[abab].young;
          if(this.directorList[abab].young==undefined){
            this.bujangyoung=this.directorList[abab].uniqueid.substring(0,1);
          }
          if(this.directorList[abab].jopan==undefined){
            this.bujangjopan="no";
          }
        
      }
      
    }
          if(this.bujangid=="noname"){
        window.alert("없는담당자입니다. 담당자명을 확인하세요.")

        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }
    this.view.dismiss();
        return;
      }


      this.lloading = this.loading.create({
        content: '방 개설중...'
      });
      this.lloading.present();
  var countingvalue=0;
  var fin_countingvalue=0;
      var flag = this.containsOnlyNumbers(this.numofpeople);
      if(!flag){
        window.alert("인원은 숫자만 입력해주세요")

        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }

        return;
      }
      this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
        for(var a in snap.val()){
            if(snap.val()[a].roomhistory!=undefined){
              for(var b in snap.val()[a].roomhistory[this.currentstartday]){
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                    if(snap.val()[a].roomhistory[this.currentstartday][b].angel!=true){
                     countingvalue++;
                    }
                  }
                }
                if(snap.val()[a].roomhistory[this.currentstartday][b].end_date_full==undefined){
                  if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
                    fin_countingvalue++;
                  }
                }
                }
              }
            }
  
  
  
            var date = new Date();
  
      var year=date.getFullYear();
      var month=date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
  
      var dte = new Date();
      var fulldate = this.currentstartday;
      var key = this.firemain.child('rooms').child(fulldate).push().key;
        if(countingvalue==undefined){
          countingvalue=1;
        }
      this.firemain.child("company").child(this.company).child("roomlist").child(this.room.name).child("roomhistory").child(this.currentstartday+"").child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
      
      if(this.lloading!=undefined){
        this.lloading.dismiss()
      }
      this.view.dismiss();
  
  
  
          });
      








   

  }
}
