import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController,ModalController,ViewController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { ChoicemodalPage } from '../choicemodal/choicemodal';
import { Choicemodal3Page } from '../choicemodal3/choicemodal3';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {
  selected:any=1;
  inputtext:any="";
  numofstandby:any=0;
  numberofIn:any=0;
  jopanjjinglist2:any=[];
  jopanlist:any=[];       
  jopanjjinglist:any=[];
  agasijungsan:any = [];
  mainlistfromcompany:any=[];
  mainlist:any = [];
  mainlist_no:any = [];
  firemain = firebase.database().ref();
  selectedday:any=0;
  activeclass='1';
  totalin:any=0;
  totalout:any=0;
  year:any="";
  newlist:any=[];
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
  totalagasi:any=[];
  currentstartday:any="";
  currentstart:any="";
  agasijungsantotal:any=[];
  company:any="";
  constructor(public util:UtilsProvider, public zone:NgZone,public modal:ModalController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();
    this.company=  localStorage.getItem("company");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
    this.selectedday=this.currentstartday
    console.log(this.currentstartday);
  }
  editing(a){
    if(a.team=="미지정"){
      console.log("editing...")
    console.log(a);

    let modal = this.modal.create(Choicemodal2Page,{"agasi":a,"flag":"attend","currentstartday":this.currentstartday});
    modal.onDidDismiss(url => {
      console.log(url);
      this.generating();

    });
    modal.present();
    }else{
      window.alert("미지정만 출근처리 가능합니다");
    }
    
  }
  attending(){
    console.log("attending??");

    let modal = this.modal.create(Choicemodal3Page,{  });
    modal.onDidDismiss(url => {
        console.log(url);
        if(url==undefined){
          this.generating();
        }else if(url.result=="cancel"){

        }else{

      this.generating();
        }
      // this.generating();


      // this.refreshChoice2();
      //regenerate 
      // this.refreshChoice(); 
    });

    modal.present();

  }
  searching(){
    console.log(this.inputtext)
    console.log(this.selected)


    this.mainlist=[];
    this.mainlist_no=[];
    this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
      console.log(snap.val())

      for(var a in snap.val()){
        console.log(a)
        console.log(snap.val()[a])
        if(a==this.currentstartday){
          console.log("mmmm")
          for(var b in snap.val()[a]){
            console.log(snap.val()[a][b]);
            if(this.selected==1){
              if(snap.val()[a][b].attend.name.trim()==this.inputtext.trim()){
                console.log(snap.val()[a][b].attend.flag);
              if(snap.val()[a][b].attend!=undefined){
                this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              }
              if(snap.val()[a][b].noattend!=undefined){
                this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
              }
              }else{
  
              }
            }else{
              if(snap.val()[a][b].attend.team.trim().toUpperCase()==this.inputtext.trim().toUpperCase()){
                console.log(snap.val()[a][b].attend.flag);
              if(snap.val()[a][b].attend!=undefined){
                this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
              }
              if(snap.val()[a][b].noattend!=undefined){
                this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
              }
              }else{
  
              }
            }
           
            

          }
        }

      }
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');
    this.util.presentLoading();
    this.goToday();

    this.generating();
    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-1").style.display = "";
        this.zone.run(()=>{

          this.activeclass='1'
        })
  }

  generating(){
    console.log("gggggenerating...");
    this.totalagasi=[];
    this.mainlist=[];
    this.mainlist_no=[];
    this.totalin=0;
    this.agasijungsan=[];
    this.agasijungsantotal=[];
    this.jopanjjinglist = [];
    this.jopanjjinglist2 = [];

    this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
      if(snap.val()!=undefined){
        for(var a in snap.val()){
  
          for(var b in snap.val()[a].roomhistory){
            for(var c in snap.val()[a].roomhistory[b]){
                if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
                  var mainlist=snap.val()[a].roomhistory[b][c];
  
          for(var d in mainlist.agasi){
                 
            if(mainlist.agasi[d].findate!=undefined){
              //종료된 아가씨. 

              var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
              var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
              mainlist.agasi[d].money=totalmoney;
              mainlist.agasi[d].tc=tctotal;
              mainlist.agasi[d].bantee=bantee;
              console.log(mainlist.agasi[d])
              console.log(mainlist.agasi[d].name)
              console.log(mainlist.agasi[d].tc)
              console.log(mainlist.agasi[d].money)
              console.log(mainlist.agasi[d].bantee)
              this.mainlistfromcompany.push({"name":mainlist.agasi[d].name,"wantee":Math.floor(mainlist.agasi[d].tc), "tc":mainlist.agasi[d].tc,"bantee":mainlist.agasi[d].bantee,"money":mainlist.agasi[d].money})
          
            }else{

              var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
              var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
              mainlist.agasi[d].money=totalmoney;
              mainlist.agasi[d].tc=tctotal;
              mainlist.agasi[d].bantee=bantee;
              console.log(mainlist.agasi[d])
              console.log(mainlist.agasi[d].name)
              console.log(mainlist.agasi[d].tc)
              console.log(mainlist.agasi[d].money)
              console.log(mainlist.agasi[d].bantee)
              this.agasijungsantotal.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
            this.agasijungsan.push({"bantee":mainlist.agasi[d].bantee,"chasam":0,"name":mainlist.agasi[d].name,"date":mainlist.agasi[d].date,"incharge":mainlist.agasi[d].incharge,"money":mainlist.agasi[d].money,"tc":mainlist.agasi[d].tc,"wantee":Math.floor(mainlist.agasi[d].tc)});
            
              this.mainlistfromcompany.push({"name":mainlist.agasi[d].name,"wantee":Math.floor(mainlist.agasi[d].tc), "tc":mainlist.agasi[d].tc,"bantee":mainlist.agasi[d].bantee,"money":mainlist.agasi[d].money})
            }
          }

          console.log("is mainlist...")
          console.log(mainlist);

          console.log(this.agasijungsan)
        }
    }
  }
}

console.log(this.agasijungsan);
this.numberofIn=this.agasijungsan.length;
console.log(this.mainlistfromcompany);
var newvaluearray=[];
for(var a in this.mainlistfromcompany){
  var check=0;
  for(var b in newvaluearray){
    if(this.mainlistfromcompany[a].name==newvaluearray[b].name){
      console.log(newvaluearray[b]);
      console.log(this.mainlistfromcompany[a])
      check=1;
      console.log(newvaluearray[b].tc)
      console.log(this.mainlistfromcompany[a].tc);
      var aa = Number(newvaluearray[b].tc) + Number(this.mainlistfromcompany[a].tc);
      newvaluearray[b].tc = aa;
      newvaluearray[b].money += this.mainlistfromcompany[a].money;
      newvaluearray[b].bantee += this.mainlistfromcompany[a].bantee;
      newvaluearray[b].wantee += this.mainlistfromcompany[a].wantee;
    }
  }
  if(check==0){
    console.log("add first");
    console.log(this.mainlistfromcompany[a]);
    console.log(this.mainlistfromcompany[a].name);
    if(this.mainlistfromcompany[a].tc==undefined){
      console.log(this.mainlistfromcompany[a].tc.toFixed(1));
      newvaluearray.push({"name":this.mainlistfromcompany[a].name,"tc":0,"money":0,"bantee":0,"wantee":0});
  
    }else{
      console.log(this.mainlistfromcompany[a].tc.toFixed(1));
      newvaluearray.push({"name":this.mainlistfromcompany[a].name,"tc":Number(this.mainlistfromcompany[a].tc),"money":this.mainlistfromcompany[a].money,"bantee":this.mainlistfromcompany[a].bantee,"wantee":this.mainlistfromcompany[a].wantee});
  
    }
      }
}
console.log(newvaluearray);
this.mainlistfromcompany=newvaluearray;
this.mainlist=[];

this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  console.log("attendance check...");
  for(var a in snap.val()){
    if(a==this.currentstartday){
      console.log("mmmm")
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          console.log(snap.val()[a][b].attend)
          this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
       
          for(var abba in this.mainlistfromcompany){
            if(this.mainlistfromcompany[abba].name == snap.val()[a][b].attend.name){
              console.log(snap.val()[a][b].attend);
              console.log(this.mainlistfromcompany[abba])

              // this.agasijungsantotal.push({"bantee":this.mainlistfromcompany[abba].bantee,"chasam":0,"name":this.mainlistfromcompany[abba].name,"date":snap.val()[a].roomhistory[aa][b][c].date,"incharge":snap.val()[a].roomhistory[aa][b][c].incharge,"money":snap.val()[a].roomhistory[aa][b][c].money,"tc":snap.val()[a].roomhistory[aa][b][c].tc,"wantee":Math.floor(snap.val()[a].roomhistory[aa][b][c].tc)});
              for(var abw in this.mainlist){
                //remove this.mainlist[abw]  if name is same as snap.val()[a][b].attend.name
                if(this.mainlist[abw].name == snap.val()[a][b].attend.name){
                  this.mainlist.splice(abw,1);
                }
                
              }
              this.mainlist.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":this.mainlistfromcompany[abba].tc,"wantee":this.mainlistfromcompany[abba].wantee,"money":this.mainlistfromcompany[abba].money,"bantee":this.mainlistfromcompany[abba].bantee});
         
                }
          }
          
          this.totalin++;
        }
        if(snap.val()[a][b].noattend!=undefined){
          this.totalout++;
          this.mainlist_no.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
        }

      }
    }

  }
  console.log(this.mainlist)
  console.log(this.mainlistfromcompany)
  
 
  console.log("okdoneeeee")
  console.log(this.agasijungsan);
  console.log(this.agasijungsantotal);
  this.util.dismissLoading();

this.numofstandby=this.mainlist.length - this.numberofIn;
});

      }
    });
//     this.firemain.child('users').once('value').then((snap)=>{
//       for(var a in snap.val()){
//         if(snap.val()[a].name!=undefined){
//           if(snap.val()[a].type=="agasi"){
//             if(this.company == snap.val()[a].company){
//               console.log(snap.val()[a].name);
//               this.totalagasi.push({"name":snap.val()[a].name,"id":a});


//               if(snap.val()[a].roomhistory!=undefined){
//                 console.log("room history");
//                 console.log(snap.val()[a].roomhistory)
//                 for(var aa in snap.val()[a].roomhistory){
//                   console.log("a is : "+aa); //방번호?
//                   console.log(snap.val()[a].roomhistory[aa])
//                   for(var b in snap.val()[a].roomhistory[aa]){
//                     console.log(b+"and "+this.selectedday)
//                     if(b == this.selectedday){
//                       console.log("b is : "+b);
//                       console.log("selected day is : "+this.selectedday);
//                       console.log(snap.val()[a].roomhistory[aa][b]);
//                       for(var c in snap.val()[a].roomhistory[aa][b]){
//                         console.log(snap.val()[a].roomhistory[aa][b][c]);
//                         if(snap.val()[a].roomhistory[aa][b][c].incharge!=undefined){
//                           var chasam = 0;
//                           var bantee=0;
//                           var tt = 0;
//                           if(diffMin<=10){
//                             chasam=0;
//                           }else if(diffMin>=11&&diffMin<=20){
//                             tt = 0.3;
//                             chasam=3;
//                           }else if(diffMin>=21&&diffMin<=40){
//                             bantee=1;
//                           }else if(diffMin>=41&&diffMin<=60){
//                             bantee=1;
//                             chasam=13;
//                           }else if(diffMin>=61&&diffMin<=80){
//                             bantee=1;
//                             if(diffMin>=61&&diffMin<=66){
//                               chasam=14;
//                             }else if(diffMin>=67&&diffMin<=80){
//                               chasam=16;
//                             }
//                           }else if(diffMin>=81&&diffMin<=100){
//                             bantee=2;
//                           }else if(diffMin>=101&&diffMin<=120){
//                             bantee=2;
//                             chasam=26;
//                           }else if(diffMin>=121&&diffMin<=140){
//                             bantee=2;
//                             if(diffMin>=121&&diffMin<=126){
//                               chasam=27;
//                             }else if(diffMin>=126&&diffMin<=140){
//                               chasam=29;
//                             }
//                           }else if(diffMin>=141&&diffMin<=160){
//                             bantee=3;
//                             chasam=32;
//                           }else if(diffMin>=161&&diffMin<=180){
//                             bantee=3;
//                             chasam=39;
//                           }else if(diffMin>=181&&diffMin<=200){
//                             bantee=3;
//                             if(diffMin>=181&&diffMin<=186){
//                               chasam=40;
//                             }else if(diffMin>=186&&diffMin<=180){
//                               chasam=42;
//                             }
//                           }else if(diffMin>=201&&diffMin<=220){
    
//                             bantee=4;
//                             chasam=43;
//                           }else if(diffMin>=221&&diffMin<=240){
//                             bantee=4;
//                             chasam=52;
//                           }
//                       console.log("add...");
//                           this.agasijungsantotal.push({"bantee":bantee,"chasam":chasam,"name":snap.val()[a].roomhistory[aa][b][c].name,"date":snap.val()[a].roomhistory[aa][b][c].date,"incharge":snap.val()[a].roomhistory[aa][b][c].incharge,"money":snap.val()[a].roomhistory[aa][b][c].money,"tc":snap.val()[a].roomhistory[aa][b][c].tc,"wantee":Math.floor(snap.val()[a].roomhistory[aa][b][c].tc)});
//                         }

//                         var startdate = snap.val()[a].roomhistory[aa][b][c].date;
//                         var end_date_full = snap.val()[a].roomhistory[aa][b][c].end_date_full;
//                         //calculate diff of stardate and end_date_full
//                         var startdate2 = new Date(startdate);
//                         var end_date_full2 = new Date(end_date_full);
//                         var d = end_date_full2.setHours(end_date_full2.getHours() - 9);
//                         console.log(startdate2);
//                         console.log(end_date_full2)
//                         console.log(d);
//                         var diff = end_date_full2.getTime() - startdate2.getTime();
//                         var diff = diff / 1000;
//                         var diff = diff / 60;
//                         console.log(diff);
//                         var diffMin = diff;
                        
//                         // var end = snap.val()[a].roomhistory[a][b][c].end_date_full
//                         // var start = snap.val()[a].roomhistory[a][b][c].date;
//                         // console.log(end);
//                         // console.log(start);

                          
// //1분~10분까지는 0
// //11분~20분까지는 0.3개 차삼 3만원 추가.
// //21분~40분까지 0.6개 차삼 3만원 추가. 총 차삼 6만원  추가. 이때 반티가 올라가는 찡이하나 올라가는거고  총 찡 1개 
// //41분~60분까지 tc 1개(완티) 13만원. 차삼 9만원 추가.  완티하나발생해서  총찡 1개. 
// //61분~80분까지 tc 1.3개 13만원 + 차삼 12만원 = 25만원  총 찡 1개
// //81분~100분까지 tc 1.6개 13만원 + 차삼 15만원 = 28만원  반티가 발생하니까 찡이 하나  총 찡 2개
// //101분~120분까지 tc 2개 13만원 + 차삼 18만원 = 31만원 완티가 발생하니까 찡이 하나 더올라가고.  총 찡 2개
//                       var chasam = 0;
//                       var bantee=0;
//                       var tt = 0;
//                       if(diffMin<=10){
//                         chasam=0;
//                       }else if(diffMin>=11&&diffMin<=20){
//                         tt = 0.3;
//                         chasam=3;
//                       }else if(diffMin>=21&&diffMin<=40){
//                         bantee=1;
//                       }else if(diffMin>=41&&diffMin<=60){
//                         bantee=1;
//                         chasam=13;
//                       }else if(diffMin>=61&&diffMin<=80){
//                         bantee=1;
//                         if(diffMin>=61&&diffMin<=66){
//                           chasam=14;
//                         }else if(diffMin>=67&&diffMin<=80){
//                           chasam=16;
//                         }
//                       }else if(diffMin>=81&&diffMin<=100){
//                         bantee=2;
//                       }else if(diffMin>=101&&diffMin<=120){
//                         bantee=2;
//                         chasam=26;
//                       }else if(diffMin>=121&&diffMin<=140){
//                         bantee=2;
//                         if(diffMin>=121&&diffMin<=126){
//                           chasam=27;
//                         }else if(diffMin>=126&&diffMin<=140){
//                           chasam=29;
//                         }
//                       }else if(diffMin>=141&&diffMin<=160){
//                         bantee=3;
//                         chasam=32;
//                       }else if(diffMin>=161&&diffMin<=180){
//                         bantee=3;
//                         chasam=39;
//                       }else if(diffMin>=181&&diffMin<=200){
//                         bantee=2;
//                         if(diffMin>=181&&diffMin<=186){
//                           chasam=40;
//                         }else if(diffMin>=186&&diffMin<=180){
//                           chasam=42;
//                         }
//                       }else if(diffMin>=201&&diffMin<=220){

//                         bantee=4;
//                         chasam=43;
//                       }else if(diffMin>=221&&diffMin<=240){
//                         bantee=4;
//                         chasam=52;
//                       }
//                       console.log(snap.val()[a].roomhistory[aa][b][c].name)
//                         this.agasijungsan.push({"diffMin":diffMin,"bantee":bantee, "chasam":(snap.val()[a].roomhistory[aa][b][c].tc-Math.floor(snap.val()[a].roomhistory[aa][b][c].tc) ).toFixed(1),"name":snap.val()[a].roomhistory[aa][b][c].name,"date":snap.val()[a].roomhistory[aa][b][c].date,"incharge":snap.val()[a].roomhistory[aa][b][c].incharge,"money":snap.val()[a].roomhistory[aa][b][c].money,"tc":snap.val()[a].roomhistory[aa][b][c].tc,"wantee":Math.floor(snap.val()[a].roomhistory[aa][b][c].tc)});

//                       }
//                     }
//                   }
//                 }
//               };

//             }
//           }
//         }
//       }
//     });

//mmmmmmmmmmmmmm

    this.firemain.child("company").child(this.company).child("jopanjjing").once("value", (snap) => {
      
      for(var a in snap.val()){
        console.log(snap.val()[a][this.selectedday])
        if(snap.val()[a][this.selectedday]!=undefined){
          for(var b in snap.val()[a][this.selectedday]){
            console.log(b);
            console.log(this.selectedday);
            console.log(snap.val()[a][this.selectedday])
            console.log(snap.val()[a][this.selectedday][b])
  
  
            var jopanjjing = snap.val()[a][this.selectedday][b].values;
            var date = snap.val()[a][this.selectedday][b].date;
            var agasi = snap.val()[a][this.selectedday][b].agasi;
            var incharge = snap.val()[a][this.selectedday][b].incharge;
            var team = snap.val()[a][this.selectedday][b].jopan;
            // //make key with team and make value with incharge and agasi
            if(this.jopanjjinglist[team]==undefined){
              this.jopanjjinglist[team]=[];
              this.jopanjjinglist2[team]=[];
            }
            var totaljjing = 0;
            this.jopanjjinglist[team].push({"agasi":agasi,"incharge":incharge,"date":date,"jopan":team,"values":jopanjjing});
            this.jopanjjinglist2[team].push({"dummy":0});
            for(var aa in this.jopanjjinglist[team]){
              console.log(this.jopanjjinglist[team][aa]);
              
              totaljjing+=parseInt(this.jopanjjinglist[team][aa].values);
              this.jopanjjinglist2[team].totaljjing = totaljjing;
              this.jopanjjinglist2[team].teamname = team;
              this.jopanlist.push({"team":team,"value":totaljjing});
            }
          }
        }
        
      }

        console.log(this.jopanjjinglist);
        for(var abc in this.jopanjjinglist){
          console.log(abc);
          console.log(this.jopanjjinglist[abc])
        }
        console.log(this.jopanjjinglist2);
        this.newlist=[];
        for(var abdc in this.jopanjjinglist2){
          console.log(abdc);
          this.newlist.push({"teamname":this.jopanjjinglist2[abdc].teamname,"jjing":this.jopanjjinglist2[abdc].totaljjing})
          console.log(this.jopanjjinglist2[abdc].totaljjing)
          console.log(this.jopanjjinglist2[abdc].teamname)
        }
        console.log(this.newlist);
    });
    console.log(this.agasijungsan);
    console.log(this.agasijungsantotal);
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
  }
    /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
    screenSwitch(e : any) : void {
      if(e.value==3){

        setTimeout(()=>{
          for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
            this.activeclass=e.value;
            console.log(this.activeclass)
          })
        },500)
      }else{
        for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{

          this.activeclass=e.value;
          console.log(this.activeclass)
        })
      }

    }


  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

  checkEvent(day){
    return false;
  }
  gotocalendardetail(day,flag){
    console.log("gotocalendardetail");
    console.log(flag);
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.currentDate);
    console.log("clicked"+day);
    this.selectedday=this.currentYear+"-"+this.currentMonth+"-"+day;

      this.generating();
  }
  getDaysOfMonth() {
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    // this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentMonth =this.date.getMonth()+1;
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  goToday(){
    this.today = new Date();
    this.date=new Date(this.today.getFullYear(),this.today.getMonth()+1,0);
    this.getDaysOfMonth();
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })

  }

  goToNextMonth() {
    console.log("gotonextmonth")
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }
}
