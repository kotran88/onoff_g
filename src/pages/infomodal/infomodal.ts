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
import { HTTP } from '@ionic-native/http/ngx';
@Component({
  selector: 'page-infomodal',
  templateUrl: 'infomodal.html',
})
export class InfomodalPage {
  wt:any="";
  nomemo:any="";
  incharge:any="";
  numofpeople:any="";
  booleanValue:any=0;
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
  key:any="";
  firemain = firebase.database().ref();
  constructor(public http:HTTP,public util:UtilsProvider, public navCtrl: NavController,public loading:LoadingController,public view:ViewController, public navParams: NavParams) {
   this.room= this.navParams.get("room");
   console.log(this.room);
   console.log(this.room.name)
    this.bu= this.navParams.get("bu");
    this.nickname=localStorage.getItem("nickname");
    //console.log(this.directorList)
    
   this.company = localStorage.getItem("company");
   this.currentstart=localStorage.getItem("start");
   this.name = localStorage.getItem("name");
   this.currentstartday=localStorage.getItem("startDate");
   var incharge=this.navParams.get("selectedIncharge");
   this.key = this.navParams.get("selectedKey");
   if(incharge!=undefined){
    if(incharge.length>0){
      this.incharge=incharge;
    }
   }
   
   var number=this.navParams.get("selectedNumber");
   if(number!=undefined){
      this.numofpeople=number;
   }
   var logic=this.navParams.get("selectedLogic");
   if(logic!=undefined){
      this.booleanValue=logic;
   }

   var avec=this.navParams.get("selectedAvec");
   if(avec!=undefined){
    if(avec){
      this.booleanValue2=avec;
    }else{
       this.booleanValue2=false;
    }
   }

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
    console.log(this.booleanValue)
    if(v==0){
      console.log("change to 1");
      this.booleanValue=1;
      console.log(this.booleanValue);
    }if(v==1){
      this.booleanValue=2;
    }if(v==2){
      this.booleanValue=0;
    }
  }
  myChange2(v){
    console.log(this.booleanValue2)
  }
  myChange3(v){
    console.log(v.checked);
    this.booleanValue3=v.checked;
    console.log(this.booleanValue3)
    if(this.booleanValue3){

    }
  }
  confirm(){
    
    var date = new Date();
    
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    var dte = new Date();
    var fulldate = this.currentstartday;
    var key = this.firemain.child('rooms').child(fulldate).push().key;
    this.util.presentLoading();
    if(this.incharge.length==0){
      window.alert("담당자를 입력해주세요  ");
      this.util.dismissLoading();
           
     }else{
      this.firemain.child("users").child(this.incharge).once("value",snap=>{
        console.log(snap.val())
        if(snap.numChildren()==0){
          window.alert("없는 담당자입니다.");
        }else{
          this.bujangid=snap.val().nickname;
          this.bujangjopan = snap.val().jopan;
          this.bujangyoung = snap.val().young;
        }
        console.log("user loop finished");
      console.log(this.bujangjopan)
      if(this.bujangjopan==undefined){
        this.bujangjopan="no";
      }
      console.log(this.bujangjopan);
      console.log(this.bujangyoung);
      if(this.booleanValue3){
  
      }else{
        if(this.incharge.trim().length==0){
          window.alert("담당자는 필수입니다..")
    
          return;
        }
      if(this.wt.trim().length==0){
        window.alert("웨이터는 필수입니다..")
  
        this.util.dismissLoading();
        return;
      }
      }
      if(this.bujangyoung.length==0||this.bujangyoung.length==1){
        window.alert("해당 담당자는 팀이 설정되어있지않습니다.")
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
       
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).once('value').then((snap)=>{
          for(var a in snap.val()){
            for(var b in snap.val()[a]){
                  if(snap.val()[a][b].end_date_full==undefined){
                    if(snap.val()[a][b].date!=undefined){
                      if(snap.val()[a][b].angel!=true){
                       countingvalue++;
                      }
                    }
                  }
                  if(snap.val()[a][b].end_date_full==undefined){
                    if(snap.val()[a][b].date!=undefined){
                      fin_countingvalue++;
                    }
                  }
              }
            }
    
    
    
          if(countingvalue==undefined){
            countingvalue=1;
          }
          var room_name = this.room.name;
          var wt_id = this.wt;
          var director_id = this.incharge;
          var max_people_count = this.numofpeople;
          var room_name = this.room.name;
          var created_by = this.nickname;
          var cmd = "entered";
          var num_of_people = 0;

          // console.log({"logic":this.booleanValue,"avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3, "wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()});
          https://captainq.wadteam.com/captainq/apis/currentroom?room_name=152&wt_id=철이&director_id=미애&max_people_count=3&created_by=인포&cmd=entered&num_of_people=3
    // this.http.get(apiUrl, {"userid":"wt3","userpw":"ananan"}, {}).then(data => {
    // });
    this.http.post("https://captainq.wadteam.com/captainq/apis/currentroom", {"room_name":room_name,"wt_id":wt_id,"director_id":director_id,"max_people_count":max_people_count,"created_by":this.nickname,"cmd":"entered","num_of_people":num_of_people}, {"token":"8179e9dc-ec5f-4bdf-b8b6-c951a2fda646"}).then(data => {
          console.log(data);
          console.log("return value come...");


        this.util.dismissLoading();
        this.view.dismiss({"result":false,"roomname":this.room.name,"category":this.room.category});
    
    
        
        });

          return;
          if(this.booleanValue3){
            //사용불가 ON.
            var wt="no";
            var numofpeople=0;
  
            if(this.wt.length==0){
              wt="no";
            }else{
              wt=this.wt;
            }
            if(this.numofpeople.length==0){
              numofpeople=0;
            }else{
              numofpeople=this.numofpeople;
            }
            this.wt=wt;
            this.numofpeople=numofpeople;
            console.log({"logic":this.booleanValue,"avec":this.booleanValue2, "nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3,"name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()});
            this.firemain.child("company").child(this.company).child("roomlist").child(this.room.name).update({"flag":true,"lastupdatedperson":this.nickname,"reason":"bool3true", "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").child(this.room.name).child(key).update({"logic":this.booleanValue,"nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3, "avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            // this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3,"name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            
            // this.firemain.child("users").child(this.incharge).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3, "wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            
          }else{
            this.firemain.child("company").child(this.company).child("roomlist").child(this.room.name).update({"flag":true,"lastupdatedperson":this.nickname,"reason":"bool3false", "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").child(this.room.name).child(key).update({"logic":this.booleanValue,"nomemo":this.nomemo,"firstflag":this.booleanValue3, "noflag":this.booleanValue3, "avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            this.firemain.child("users").child(this.wt).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3,"name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            
            this.firemain.child("users").child(this.incharge).child("roomhistory").child(this.currentstartday).child(key).update({"logic":this.booleanValue,"avec":this.booleanValue2, "name":this.room.name,"status":"entered","bu":this.bu, "incharge":this.incharge,"numofpeople":this.numofpeople,"nomemo":this.nomemo,"firstflag":this.booleanValue3,"noflag":this.booleanValue3, "wt":this.wt,"insert_date":hour+":"+min,"insert_date_full":dte,"last_updated":dte, "key":key,"date":fulldate ,"bujangyoung":this.bujangyoung,"bujangjopan":this.bujangjopan, "v":Number(countingvalue)+1, "directorId":this.bujangid, "flag":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()})
            
          }
          if(this.key!=undefined){
            this.firemain.child("company").child(this.company).child("waiting").child(this.currentstartday+"").child(this.key).remove();
          }
        
        
        this.util.dismissLoading();
        this.view.dismiss({"result":false,"roomname":this.room.name,"category":this.room.category});
    
    
    
            });
  
      });
    }
    

      
      








   

  }
}
