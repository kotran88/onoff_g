import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the InfomodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the WaitingmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-waitingmodal',
  templateUrl: 'waitingmodal.html',
})
export class WaitingmodalPage {
  wt:any="";
  nomemo:any="";
  incharge:any="";
  numofpeople:any="";
  booleanValue:any=false;
  booleanValue2:any=false;
  booleanValue3:any=false;
  lloading:any;
  currentstartday:any="";
  currentstart:any="";
  room:any;
  company:any;
  bu:any=0;
  name:any;
  bujangyoung:any=""
  nickname:any="";
  bujangid :any="noname";
  bujangjopan:any="";
  directorList:any=[];
  firemain = firebase.database().ref();
  constructor(public util:UtilsProvider, public navCtrl: NavController,public loading:LoadingController,public view:ViewController, public navParams: NavParams) {
   this.room= this.navParams.get("room");
    this.bu= this.navParams.get("bu");
    var orderedQuery = this.firemain.child("users").orderByChild("type");
    orderedQuery.once("value", (snapshot) => {
     snapshot.forEach((childSnapshot) => {
       var childData = childSnapshot.val();
        this.directorList.push(childData);
     })

    });

  //  this.directorList=JSON.parse(localStorage.getItem("director"))

   console.log(this.directorList);
   
    this.nickname=localStorage.getItem("nickname");
    //console.log(this.directorList)
    
   this.company = localStorage.getItem("company");
   this.currentstart=localStorage.getItem("start");
   this.name = localStorage.getItem("name");
   this.currentstartday=localStorage.getItem("startDate");
   //console.log(this.currentstartday);
   //console.log("room",this.room);
   //console.log(this.company)
     }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad InfomodalPage');
    //console.log(this.directorList);

  }
   containsOnlyNumbers(input) {
    // Create a regular expression that matches only numbers
    var regex = /^[0-9]+$/;
  
    // Test the input against the regular expression
    return regex.test(input);
  }
  cancel(){

    this.view.dismiss({"result":true});
  }
  myChange(v){
    //console.log(this.booleanValue)
  }
  myChange2(v){
    //console.log(this.booleanValue2)
  }
  myChange3(v){
    console.log(v.checked);
    this.booleanValue3=v.checked;
    console.log(this.booleanValue3)
    if(this.booleanValue3){

    }
  }
  confirm(){
    this.util.presentLoading();
    for(var abab in this.directorList){
      if(this.directorList[abab].nickname.trim()==this.incharge){


          this.bujangid=this.directorList[abab].nickname;
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
    //console.log(this.bujangid);
    //console.log(this.bujangjopan);
    //console.log(this.bujangyoung);
    if(this.bujangid=="noname"){
      window.alert("없는담당자입니다. 담당자명을 확인하세요.")

      this.util.dismissLoading();
  this.view.dismiss({"result":true});
      return;
    }
    if(this.wt.trim().length==0){
      window.alert("웨이터는 필수입니다..")

      this.util.dismissLoading();
  this.view.dismiss({"result":true});
      return;
    }
    if(this.bujangyoung.length==0||this.bujangyoung.length==1){
        window.alert(this.bujangyoung+",팀코드 부여가 안된 담당자. 다른 이름을 입력해주세요.");
        this.util.dismissLoading();
        return; 
    }
      

  var countingvalue=0;
  var fin_countingvalue=0;
      var flag = this.containsOnlyNumbers(this.numofpeople);
      if(this.booleanValue3){

      }else{
        if(!flag){
          window.alert("인원은 숫자만 입력해주세요")
          this.util.dismissLoading();
         
  
          return;
        }
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
        if(this.booleanValue3){

        }else{

        }
       
      this.firemain.child("company").child(this.company).child("roomlist").child(this.room.name).child("roomhistory").child(this.currentstartday+"").child(key).update({"logic":this.booleanValue,"nomemo":this.nomemo,"noflag":this.booleanValue3, "avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
      this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "nomemo":this.nomemo,"noflag":this.booleanValue3,"name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
      
      this.firemain.child("users").child(this.incharge).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"nomemo":this.nomemo,"noflag":this.booleanValue3, "wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
      
      
      this.util.dismissLoading();
      this.view.dismiss({"result":false});
  
  
  
          });
      








   

  }
}
