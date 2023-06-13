
/**
 * Generated class for the SlidetestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 import { Component, NgZone,ViewChild } from '@angular/core';
 import { MenuController, ModalController, NavController, NavParams, Slides } from 'ionic-angular';
 
 import * as $ from "jquery";
import  firebase from 'firebase';
import { UtilsProvider } from '../../providers/utils/utils';
import { LoginpagePage } from '../loginpage/loginpage';
import { InfomodalPage } from '../infomodal/infomodal';
import { EditingroomPage } from '../editingroom/editingroom';
import { ChoicedetailPage } from '../choicedetail/choicedetail';
import { WaitingPage } from '../waiting/waiting';
import { ChoicejimyungPage } from '../choicejimyung/choicejimyung';
@Component({
  selector: 'page-slidetest',
  templateUrl: 'slidetest.html',
})
export class SlidetestPage {
  jimyung:any=[];
  code:any="";
  activeclass='1';
  directorList:any=[];
  name:any="";
  mainlist=[];
  bu:any=0;
  yeonti:any="";
  allmainlist=[];
  taptriggered:any=false;
  interval:any;
  obj = [];
  firemain = firebase.database().ref();
  count : number[] = new Array();
  orderlist=[];
  noflaglist=[];
  information=[];
  todaymoney=0;
  totalcount=0;
  totalprice=0;
  currentstartday:any="";
  currentstart:any="";
  company:any;
  id:any="";
  nowtime:any=""
  nickname:any="";
  tc:any=0;
  paymentflag:any=false;
  public images: any;
  @ViewChild('slider') slider: Slides;
  page = 0;





  noagasi_info:any=0;
  agasinum_info:any=0;
  mainlist_info:any=[];
  mainlist_finished_info:any=[];
  smallroom=[];
  smallroom2=[];
  allroom=[];
  midroom=[];
  bigroom=[];
  midroom2=[];
  bigroom2=[];

  selectedIncharge:any;
  selectedKey:any;
  selectedAvec:any;
  selectedLogic:any;
  selectedNumber:any;



  //choice

  type:any="";
  standby:any=0;
  angelnumber_choice:any;
  searchon:any=false;
  mainlist_mine:any=[];
  mainlist_choice:any=[];
  mainlist2_mine:any=[];
  mainlist_finished_choice:any=[];
  mainlist_finished_status_choice:any=[];
  mainlist_angel_choice:any=[];
  agasijungsan_choice:any=[];
  mainlisttest:any=[];
  mainlist_attend:any=[];
  original_mainlist:any=[];
  jimyungnumber:any=0;
  angelnumber:any=0;

  tab1clicked:any=false;
  tab2clicked:any=false;
  constructor(public zone:NgZone, public modal: ModalController,public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname= localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");
    this.tc=localStorage.getItem("tc");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    var orderedQuery = this.firemain.child("users").orderByChild("type");
    orderedQuery.once("value", (snapshot) => {
     snapshot.forEach((childSnapshot) => {
       var childData = childSnapshot.val();
        this.directorList.push(childData);
     })

    });

  //  this.directorList=JSON.parse(localStorage.getItem("director"))

   console.log(this.directorList);
    var login=localStorage.getItem("login_data");
    
    this.code = JSON.parse(login).young;
    this.type = localStorage.getItem("type");
this.interval=setInterval(()=>{
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  if(min<10){
    this.nowtime=hour+":0"+min;
  }else{
    this.nowtime=hour+":"+min;
  }
}
,1000)
    //console.log(login);
    this.id = JSON.parse(login).id;
    this.code = JSON.parse(login).young;
    //console.log(login);
    //console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
  }
 
  write(){
    
    let modal = this.modal.create(ChoicejimyungPage,{});
    modal.onDidDismiss(url => {
      this.refreshChoiceonlyjimyung();
    });

    modal.present();
  }
    buchange(){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    //console.log("buchnage"+this.bu)
    if(this.bu==0){
      this.bu=1
    }else if(this.bu==1){
      this.bu=2;
    }else{
      this.bu=0;
    }

    this.firemain.child("company").child(this.company).update({"bu":this.bu});

  }

  slideChanged(){
    console.log("changed...");
    console.log(this.slider.getActiveIndex())
    this.page = this.slider.getActiveIndex();
    console.log(this.page)
  }
  selectedTab(index) {
    console.log("tab selected");
    this.slider.slideTo(index);
  }
  goToSlide(index) {
    this.slider.slideTo(index);
  }
  gotolink(value){
    
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
    
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
onrefresh(){
  this.util.presentLoading();
  this.generate();
  this.util.dismissLoading();
}

togglesection(i){
  //console.log(i)
  //console.log(this.orderlist);
  //console.log(this.orderlist[i]);
  this.orderlist[i].open = !this.orderlist[i].open;
  //console.log(this.orderlist[i]);
}

reorderItems(indexes){
  //console.log("reorder item...");
  //console.log(indexes);
  //console.log(indexes.from);
  //console.log(indexes.to);
  //console.log(this.mainlist[indexes.from]);
  let element = this.mainlist_choice[indexes.from];
  this.mainlist_choice[indexes.from].v=(indexes.to+1);
  this.mainlist_choice[indexes.to].v=(indexes.from+1);
  //console.log(element)
  this.mainlist_choice.splice(indexes.from, 1);
  this.mainlist_choice.splice(indexes.to, 0, element);
  //console.log(this.mainlist);
  for(var a in this.mainlist_choice){
    console.log(this.mainlist_choice[a]);
    if(this.mainlist_choice[a].up==undefined){
      console.log("up is not exist");
      // break;
    }
    var up = this.mainlist_choice[a].up;
    
    if(up!=undefined){

      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[a].name).child(this.mainlist_choice[a].key).update({"v":this.mainlist_choice[a].v,"up":up})
    }else{

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[a].name).child(this.mainlist_choice[a].key).update({"v":this.mainlist_choice[a].v})
    }
  }
  //console.log("for loop finished");
  var counting=0;
  //console.log(this.mainlist);
  for(var ababb in this.mainlist_choice){
    counting++;
    //console.log(this.mainlist[ababb])
    this.mainlist_choice[ababb].v = counting;
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_choice[ababb].name).child(this.mainlist_choice[ababb].key).update({"v":counting})
  }
  //console.log(this.mainlist);

};
gotowaiting(){
  this.navCtrl.push(WaitingPage,{flag:true}).then(() => {
    console.log("WaitingPage back")
    this.navCtrl.getActive().onDidDismiss(data => {
      console.log("off...")
      console.log(data);
      if(data==undefined){
        return;
      }
      if(data.result=="waiting"){
        window.alert("방을 선택하세요.");
        console.log(data.data);
        console.log(data.data.incharge);
        this.selectedKey = data.data.key;
        this.selectedIncharge=data.data.incharge;
        this.selectedAvec = data.data.avec;
        this.selectedLogic = data.data.logic;
        this.selectedNumber = data.data.numofpeople;
        console.log(data.data.avec);
        console.log(data.data.logic);
      }
  // this.firemain.child("company").child(this.company).child("roomlist").off();
    })
  });
}
godetail(a,v){
  if(!this.paymentflag){
    window.alert("결제전 이용 불가합니다.")
    return;
  }
  this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
    this.navCtrl.getActive().onDidDismiss(data => {

      console.log("ChoicedetailPage ondiddismiss....");
      console.log(data);
    this.refreshChoice2();

      setTimeout(()=>{
        this.screenSwitch(1);
      },10)
 

    })
  });
}
generate(){
  this.noflaglist=[];
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("company").child(this.company).once('value').then((snap2)=>{
    console.log(snap2.val().bu)
    if(snap2.val().bu==undefined){

      this.bu=0;
    }else{

      this.bu=snap2.val().bu;
    }
  });
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){
        console.log(snap.val()[a]);
              if(snap.val()[a].date==this.currentstartday){
                if(snap.val()[a].wt!=this.nickname){
                  continue;
                }

                console.log(snap.val()[a]);
      console.log(snap.val()[a].name);
                var numofangel =0;
                //console.log(snap.val()[a]);
                var mainlist=snap.val()[a];
                //console.log("mainlist...");
                //console.log(mainlist);
       console.log(snap.val()[a]);


      var newtc=0;
      var tcarray = [];
      var tcarraywithoutagasi = [];
      var tarray=[];
      var chasamarray=[];
      var chasamtotal=0;
      var tctotal=0;
      var yeontireason="";
      console.log(snap.val()[a].roomno);
      var numofpeople = snap.val()[a].numofpeople;
      var logic = snap.val()[a].logic;
      var inagasi = 0;
      var totaltc=0;
      console.log(mainlist);
      if(mainlist.agasi!=undefined){
        console.log(mainlist.agasi);
        console.log("numofagasi : "+mainlist.agasi.length);
      }
      console.log("agasi info");
      console.log(mainlist.agasi);

      var totalmoney=0;
      for(var cccc in mainlist.agasi){
        console.log("looping each agasi");
        console.log(mainlist.agasi[cccc].findate);
        if(mainlist.agasi[cccc].findate!=undefined){
          console.log("not undefined...so it is fin.")
          totaltc+=Number(mainlist.agasi[cccc].tc);
          console.log("plus : "+mainlist.agasi[cccc].money);
          totalmoney+=Number(mainlist.agasi[cccc].money);
        }else{

          console.log("is undefined!!!!so it is not fin....")
          var tm=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[0]);
          // if(mainlist.agasi[cccc].tc!=undefined){
            console.log(mainlist.agasi[cccc].name);
          console.log("totalmoney : "+tm);
          // }
          var tctotal=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[1]);
          var bantee=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[2]);
          mainlist.agasi[cccc].totalmoney=tm;
          totaltc+=tctotal;
          console.log("totalmoney add : "+tm);
          totalmoney+=Number(tm);
          console.log("current total : "+totalmoney);
          mainlist.agasi[cccc].tc=tctotal;
          mainlist.agasi[cccc].bantee=bantee;
          //console.log(mainlist.agasi[cccc]);
          if(mainlist.agasi[cccc].angel){
            numofangel++;
          }
        }

        inagasi++;
        newtc += Math.floor(mainlist.agasi[cccc].tc)
        if(mainlist.agasi[cccc].angel==true||mainlist.agasi[cccc].angel=="true"){

        }else{
          tcarraywithoutagasi.push(Math.floor(mainlist.agasi[cccc].tc));
        }
        tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
        tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
        console.log("tc add: "+Math.floor(mainlist.agasi[cccc].tc) );
        tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
        chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
        chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
      
      }
      console.log("totalmoney : "+totalmoney);
      chasamtotal=Number(chasamtotal.toFixed(2));
      console.log("chasamtotal:"+chasamtotal);
      var newchasamtotal=chasamtotal.toString();
      //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
      newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
      newchasamtotal = ""+newchasamtotal;
      if(chasamtotal==0){
        newchasamtotal="0";
      }
      // newchasamtotal
      console.log(numofpeople+"newtc"+newtc+",,,,"+newchasamtotal);
      tctotal=newtc;
      //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
      // 나머지 완티의 갯수를 고려해서 계산.  
      //console.log(snap.val()[a].orderlist);
      var orderl=[];
      var orderprice=0;
      var tp=0;
      var tbottle=0;
      

                if(snap.val()[a].orderlist==undefined){

                }else{
                  for(var d in snap.val()[a].orderlist.orderlist){

                    if(snap.val()[a].orderlist.orderlist[d].category=="주류"){
                      tbottle+=Number(snap.val()[a].orderlist.orderlist[d].num);
                    }
                    orderprice+= (Number(snap.val()[a].orderlist.orderlist[d].price) );
                    orderl.push(snap.val()[a].orderlist.orderlist[d])
                    tp += snap.val()[a].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].orderlist.orderlist[d].num;
                  }
                }
               
               
                console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
                var firstsumofv=0;
                var totalsum=0;
                var allzero=false;
                if(tbottle==0){

                }else{
                  if(logic==1){
                    tbottle=tbottle-1;
                    yeontireason+=" 술 -1 , "
                  }if(logic==2){
                    tbottle=tbottle-2;
                    yeontireason+=" 술 -2, "
                  }
                }
                
                if(tcarraywithoutagasi.length>numofpeople){
                  yeontireason="";
                  firstsumofv=0;
                  console.log("날개 제외 아가씨 수가 사람수보다 많다면....")
                  console.log(tarray);
                  tarray.sort(function(a,b){
                    //console.log(a.date+",,,"+b.date)
                    if (a.date < b.date) {
                      return -1;
                    }
                    if (a.date > b.date) {
                      return 1;
                    }
                    return 0;
                  });
                  console.log(tarray);
                  var cvalue=-1;
                  var stop=0;
                  for(var abab in tarray){
                    cvalue++;
                    console.log(cvalue+"????"+numofpeople);
                    if(cvalue<numofpeople){
                      console.log(tarray[abab]);
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc-tbottle
                        yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"더하고 뺌"+tbottle+""
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+""
                   
                        }
                      }
                      // firstsumofv+=tarray[abab].tc
                      // yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+"개를 더함??"
                    }
                    if(cvalue>=numofpeople){

                      console.log("cvalue>=numofpeople"+tarray[abab]);
                      if(tarray[abab].angel!=true){
                        stop++;
                        firstsumofv+=tarray[abab].tc
                        yeontireason+="/"+tarray[abab].name+"의tc"+tarray[abab].tc+"를 더함.!!!"
                      }else if(tarray[abab].angel){
                        if(tarray[abab].tc - tbottle>=0){

                           firstsumofv+= tarray[abab].tc - tbottle;
                           yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+"."
                   
                        }
                      }
                    }
                    totalsum+=tcarray[abab];
                  }
                    // yeontireason+=","+firstsumofv+"에서 술병"+tbottle*numofpeople+"를 뺌. ";
                    for(var ii=0; ii<numofpeople; ii++){

                      // firstsumofv= firstsumofv - tbottle;
                    }
                }else if (tcarraywithoutagasi.length==numofpeople){
                  console.log("날개 제외 아가씨 수가 사람수와 같다면....");
                  console.log(tarray);
                  console.log(tcarraywithoutagasi);
                for(var abab in tarray){
                  totalsum+=tarray[abab].tc;

                  if(tarray[abab].angel!=true){
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함.."
                  }else if(tarray[abab].angel){
                    console.log("angel!!!");
                    console.log(tarray[abab].tc);
                    console.log(tbottle);
                    if(tarray[abab].tc - tbottle>=0){
                       console.log("in")
                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개"+tarray[abab].name+"의 tc"+tarray[abab].tc+"-"+tbottle+"."
               
                    }else{
                      yeontireason+=tarray[abab].tc+"-"+tbottle+"=0 ,연티:0"
                    }
                  }

                }
                firstsumofv= numofpeople*tbottle-totalsum
                console.log(firstsumofv);
                if(firstsumofv>0){
                  firstsumofv=0;
                }
                yeontireason += "인원*병-완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
              }else if(tcarraywithoutagasi.length<numofpeople){
                console.log("날개 제외 아가씨 수가 사람수보다 작다면....");
                for(var abab in tcarray){
                  totalsum+=tcarray[abab];
                }
                  firstsumofv=0;
                  var newnumofpeople=tcarray.length;
                  firstsumofv= newnumofpeople*tbottle-totalsum
                  if(firstsumofv>0){
                    firstsumofv=0;
                  }
                   yeontireason = ""+tcarray.length+"로조정."+" 인원*병-완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
                }
               console.log(yeontireason)
                var yeonti=firstsumofv;
                if(yeonti<=0){
                  yeonti=Math.abs(yeonti)
                }
                if(tbottle==0){
                  yeonti=0;
                  yeontireason+="술이 0병이므로 연티 0"
                }
                console.log("yeontiiiii : "+yeonti);
              console.log(yeontireason)
                console.log("total bottle : "+tbottle);
                  console.log(mainlist)
                  console.log(tp);
                  console.log("totalmoney....")
                  totalmoney=totalmoney*10000;

                  console.log("calcuu");
                  console.log(this.todaymoney )
                  console.log(tp);
                  console.log(yeonti);
                  console.log(totalmoney);
                  this.todaymoney += tp+totalmoney+Number(yeonti*10000);
                  console.log(this.todaymoney);
                  var orderdate="";
                  var roomno="";
                  if(snap.val()[a].orderlist!=undefined){
                    orderdate = snap.val()[a].orderlist.orderDate
                    roomno=snap.val()[a].orderlist.roomno;
                  }else{
                    orderdate = "-"
                    roomno="-"
                  }


                  var enddate="";
                  if(snap.val()[a].end_date_full!=undefined){
                   
                    enddate=snap.val()[a].end_date_full
                  }else{
                    orderdate = "";
                  }
                  // if(snap.val()[a].noflag||!snap.val()[a].noflag){
                  //   // this.noflaglist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  // }else{
                    this.orderlist.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
                  // }
                     }
             
              
            
           
      }
    }
    // this.orderlist.
    //sort if orderlist's enddate is empty or not 
    this.orderlist.sort(function(a,b){
      if(a.enddate==""){
        return -1;
      }else if(b.enddate==""){
        return 1;
      }else{
        return 0;
      }
    })
    
    console.log(this.orderlist);
    // for(var aeq in this.noflaglist){
    //   this.orderlist.push({
    //     "open":false,"status":this.noflaglist[aeq].status,"noflag":this.noflaglist[aeq].noflag,  "enddate":enddate,"key":this.noflaglist[aeq].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":this.noflaglist[aeq].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":this.noflaglist[aeq].wt,"date":orderdate,"roomno":this.noflaglist[aeq].roomno, "value":orderl
    //   })
    // }
    console.log(this.orderlist);
    //console.log("end!");
  });
}

ionViewDidLeave(){
  clearInterval(this.interval)
}
ionViewWillEnter(){
  //console.log("will enter!!!");
  

}
refreshoneroom(mainlist){
  console.log("refreshoneroom ");
  console.log(mainlist);
  this.todaymoney=0;
  if(mainlist==undefined){
    this.generate();
    return;
  }
  var newtc=0;
  var tcarray = [];
  var tcarraywithoutagasi = [];
  var tarray=[];
  var chasamarray=[];
  var chasamtotal=0;
  var tctotal=0;
  var yeontireason="";
  console.log(mainlist.roomno);
  var numofpeople = mainlist.numofpeople;
  var logic = mainlist.logic;
  var inagasi = 0;
  var totaltc=0;
  var totalmoney=0;
  var numofangel =0;
  console.log(mainlist);
  if(mainlist.agasi!=undefined){
    console.log(mainlist.agasi);
    console.log("numofagasi : "+mainlist.agasi.length);
  }
  for(var cccc in mainlist.agasi){
    console.log("looping each agasi");

    if(mainlist.agasi[cccc].findate!=undefined){
      totaltc+=Number(mainlist.agasi[cccc].tc);
      totalmoney+=Number(mainlist.agasi[cccc].money);
    }else{
      var totalmoney=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[0]);
      // if(mainlist.agasi[cccc].tc!=undefined){

      // }
      var tctotal=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[1]);
      var bantee=Number(this.util.getTC(mainlist.agasi[cccc],mainlist.agasi[cccc].pausetime).split(",")[2]);
      mainlist.agasi[cccc].totalmoney=totalmoney;
      totaltc+=tctotal;
      totalmoney+=Number(totalmoney);
      mainlist.agasi[cccc].tc=tctotal;
      mainlist.agasi[cccc].bantee=bantee;
      //console.log(mainlist.agasi[cccc]);
      if(mainlist.agasi[cccc].angel){
        numofangel++;
      }
    }

    inagasi++;
    newtc += Math.floor(mainlist.agasi[cccc].tc)
    if(mainlist.agasi[cccc].angel==true||mainlist.agasi[cccc].angel=="true"){

    }else{
      tcarraywithoutagasi.push(Math.floor(mainlist.agasi[cccc].tc));
    }
    tarray.push({"tc":Math.floor(mainlist.agasi[cccc].tc),"name":mainlist.agasi[cccc].name,"angel":mainlist.agasi[cccc].angel, "date":mainlist.agasi[cccc].date});
    tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
    console.log("tc add: "+Math.floor(mainlist.agasi[cccc].tc) );
    tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
    chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
    chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
  
  }
  chasamtotal=Number(chasamtotal.toFixed(2));
  console.log("chasamtotal:"+chasamtotal);
  var newchasamtotal=chasamtotal.toString();
  //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
  newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
  newchasamtotal = ""+newchasamtotal;
  if(chasamtotal==0){
    newchasamtotal="0";
  }
  // newchasamtotal
  console.log(numofpeople+"newtc"+newtc+",,,,"+newchasamtotal);
  tctotal=newtc;
  //어떤 아가씨가 술병수보다 완티가 많거나 같거나 하면. 그 아가씨는 제외하고, 손님수도 그아가씨 수만큼 제외하고
  // 나머지 완티의 갯수를 고려해서 계산.  
  //console.log(mainlist.orderlist);
  var orderl=[];
  var orderprice=0;
  var tp=0;
  var tbottle=0;
  

            if(mainlist.orderlist==undefined){

            }else{
              for(var d in mainlist.orderlist.orderlist){

                if(mainlist.orderlist.orderlist[d].category=="주류"){
                  tbottle+=Number(mainlist.orderlist.orderlist[d].num);
                }
                orderprice+= (Number(mainlist.orderlist.orderlist[d].price) );
                orderl.push(mainlist.orderlist.orderlist[d])
                tp += mainlist.orderlist.orderlist[d].price.replace(",","")* mainlist.orderlist.orderlist[d].num;
              }
            }
           
           
            console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
            var firstsumofv=0;
            var totalsum=0;
            var allzero=false;
            if(logic){
              tbottle=tbottle-1;
              yeontireason+=" 술병 차감 -1 , "
            }
            if(tcarraywithoutagasi.length>numofpeople){

              yeontireason="";
              firstsumofv=0;
              console.log("아가씨 수가 사람수보다 많다면....")

              console.log(tarray);
              tarray.sort(function(a,b){
                //console.log(a.date+",,,"+b.date)
                if (a.date < b.date) {
                  return -1;
                }
                if (a.date > b.date) {
                  return 1;
                }
                return 0;
              });
              console.log(tarray);
              var cvalue=-1;
              var stop=0;
              for(var abab in tarray){
                cvalue++;
                console.log(cvalue+"????"+numofpeople);
                if(cvalue<numofpeople){
                  console.log("cvalue<numofpeople");

                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=(tarray[abab].tc-tbottle)
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+",,"+tbottle+"뺌."
                  }else if(tarray[abab].angel){
                    if(tarray[abab].tc - tbottle>=0){

                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
               
                    }
                  }
                  firstsumofv+=tarray[abab].tc-tbottle
                  yeontireason+="//"+tarray[abab].name+"의 tc:"+tarray[abab].tc+","+tbottle+"뺌."
                }
                if(cvalue>=numofpeople){
                  if(tarray[abab].angel!=true){
                    stop++;
                    firstsumofv+=tarray[abab].tc
                    yeontireason+="/"+tarray[abab].name+"의 tc"+tarray[abab].tc+"를 더함?."
                  }else if(tarray[abab].angel){
                    if(tarray[abab].tc - tbottle>=0){

                       firstsumofv+= tarray[abab].tc - tbottle;
                       yeontireason+="//날개아가씨"+tarray[abab].name+"의 tc"+tarray[abab].tc+"에서 술병"+tbottle+"를 뺀값."
               
                    }
                  }
                }
                totalsum+=tcarray[abab];
              }
                yeontireason+=","+firstsumofv+"에서 술병"+tbottle*numofpeople+"를 뺌.. ";
                for(var ii=0; ii<numofpeople; ii++){

                  firstsumofv= firstsumofv - tbottle;
                }
            }else if (tcarraywithoutagasi.length==numofpeople){
            for(var abab in tcarray){
              totalsum+=tcarray[abab];
            }
            firstsumofv= numofpeople*tbottle-totalsum
            console.log(firstsumofv);
            if(firstsumofv>0){
              firstsumofv=0;
            }
            yeontireason = "사람수 * 술병 - 전체 완티 "+numofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;                
          }else if(tcarraywithoutagasi.length<numofpeople){
            for(var abab in tcarray){
              totalsum+=tcarray[abab];
            }
              firstsumofv=0;
              var newnumofpeople=tcarray.length;
              firstsumofv= newnumofpeople*tbottle-totalsum
              if(firstsumofv>0){
                firstsumofv=0;
              }
               yeontireason = "인원수를"+tcarray.length+"명으로 조정후 계산."+" 사람수 * 술병 - 전체 완티 "+newnumofpeople+"*"+tbottle+"-"+totalsum+"="+firstsumofv;  
            }
           
            var yeonti=firstsumofv;
            if(yeonti<=0){
              yeonti=Math.abs(yeonti)
            }
            if(tbottle==0){
              yeonti=0;
              yeontireason+="술이 0병이므로 연티 0"
            }
            console.log("yeontiiiii : "+this.yeonti);
          console.log(yeontireason)
            console.log("total bottle : "+tbottle);
              console.log(mainlist)
              console.log(tp);
              console.log("totalmoney....")
              totalmoney=totalmoney*10000;
              console.log("calcu");

              console.log(this.todaymoney )
              console.log(tp);
              console.log(yeonti);
              console.log(totalmoney);
              this.todaymoney += tp+totalmoney+Number(yeonti*10000);
              console.log(this.todaymoney);
              var orderdate="";
              var roomno="";
              if(mainlist.orderlist!=undefined){
                orderdate = mainlist.orderlist.orderDate
                roomno=mainlist.orderlist.roomno;
              }else{
                orderdate = "-"
                roomno="-"
              }


              var enddate="";
              if(mainlist.end_date_full!=undefined){
               
                enddate=mainlist.end_date_full
              }else{
                orderdate = "";
              }
              var flagging =false;
              for(var sd in this.orderlist){
                if(this.orderlist[sd].key == mainlist.key){
                  flagging = true;
                  //console.log(this.orderlist[sd])
                  this.orderlist[sd].numofpeople = mainlist.numofpeople;
                  this.orderlist[sd].tctotal = tctotal;
                  this.orderlist[sd].chasam = newchasamtotal;
                  this.orderlist[sd].logic = logic;
                  this.orderlist[sd].reason = yeontireason;
                  this.orderlist[sd].tcarray = tcarray;
                  this.orderlist[sd].chasamarray = chasamarray;
                  this.orderlist[sd].tbottle = tbottle;
                  this.orderlist[sd].yeonti = yeonti;
                  this.orderlist[sd].tp = tp;
                  this.orderlist[sd].totalprice = orderprice;
                  this.orderlist[sd].tc = totaltc.toFixed(1);
                  this.orderlist[sd].money = totalmoney;
                  this.orderlist[sd].value = orderl;
                  //console.log(this.orderlist);
                  //console.log("modify...")
                  // this.orderlist[sd].push({"open":false, "enddate":enddate, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].roomhistory[b][c].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
          
                }
              }
              if(!flagging){
                this.orderlist.push({"open":false, "enddate":enddate,"status":mainlist.status,  "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":mainlist.incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":mainlist.wt,"date":orderdate,"roomno":mainlist.name, "value":orderl});
              }
              //console.log(this.orderlist);
}
  ionViewDidLoad() {
    this.firemain.child("company").child(this.company).child("jimyung").child(this.currentstartday).on("value",snap=>{
      //console.log(snap.val());
      //console.log("jimyung...")
      this.jimyung=[];
      this.jimyungnumber=0;
      for(var abc in snap.val()){
        this.jimyungnumber++;
        //console.log(snap.val()[abc]);
        this.jimyung.push({"room":snap.val()[abc].room,key:abc,v:snap.val()[abc].v,agasi:snap.val()[abc].agasi,"incharge":snap.val()[abc].incharge});
      }
    

    });
      //  "child_added", "child_changed", "child_removed", or "child_moved."
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_removed', function(snap, prevChildKey) {
        //console.log("child_removedchild_removedchild_removedchild_removed");
        //console.log(snap.val());
        //console.log(prevChildKey);
        // this.firemain.child("compan
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_moved', function(snap, prevChildKey) {
        //console.log("child_movedchild_movedchild_movedchild_moved");
        //console.log(snap.val());
        //console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_added', function(snap, prevChildKey) {
        //console.log("child_addedchild_addedchild_addedchild_added");
        //console.log(snap.val());
        //console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).on('child_changed', (snap, prevChildKey) =>{
          console.log("child_changedchild_changedchild_changedchild_changedchild_changed");
          console.log(snap.val());
          this.generate();
          // for(var date in snap.val()){
          //   console.log("date:"+date);
          //     // for(var sdate in snap.val().roomhistory[date]){
          //     //   this.refreshoneroom(snap.val().roomhistory[date][sdate]);
          //     // }
          //     var flagging=false;
          //     for(var room in this.orderlist){
          //         console.log(this.orderlist[room].key);
          //         console.log(snap.val().key);
                  
          //       if(this.orderlist[room].key == snap.val().key){
          //         //console.log("match!!!");
          //         flagging=true;
                
          //           }
          //     }
          //     if(!flagging){
          //       this.refreshoneroom(snap.val());
          //     }
          // }
          // this.refreshChoice2();
          // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
        });

        this.util.presentLoading();
    this.generate();
  
    this.generate_info();
    this.refreshChoiceonlyjimyung();
    // this.refreshChoice2();
    this.screenSwitch(1);
    this.util.dismissLoading();
    this.interval = setInterval(()=>{
      //console.log("setinterval...")
      // this.util.presentLoading();
      // this.generate();
      // this.util.dismissLoading();
    },1000*60)
  


  }






  generate_info(){
    //console.log("generate come");
    this.mainlist_info=[];
    this.mainlist_finished_info=[];
    this.noagasi_info=0;
    this.agasinum_info=0;



    this.mainlisttest=[];
    this.mainlist=[];
    this.mainlist_mine=[];
    this.mainlist2_mine=[];

    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];

    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];

    this.mainlist_choice=[];
    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];
    this.agasijungsan_choice=[];
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").once('value').then((snap)=>{
      for(var a in snap.val()){
            for(var b in snap.val()[a]){
              console.log(snap.val()[a][b]);


              // if(snap.snap.val()[a][b].end_date_full==undefined){
                if(snap.val()[a][b].date!=undefined){
                  var inagasi = 0;
                  var totalagasi = 0;
              if(snap.val()[a][b].agasi!=undefined){

                for(var c in snap.val()[a][b].agasi){
                  totalagasi++;
                  if(snap.val()[a][b].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  var orderlist="";
                  if(snap.val()[a][b].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=snap.val()[a][b].orderlist;
                  }
                if(snap.val()[a][b].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }


            var memo = "";
            console.log(snap.val()[a][b])
            memo = snap.val()[a][b].memo;

                console.log(snap.val()[a][b].name);
                console.log(snap.val()[a][b].key);
                console.log(snap.val()[a][b].noflag+" ,,,,  "+snap.val()[a][b].firstflag);
                //console.log(inagasi);
                //console.log(totalagasi);
                
                if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true||snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                  continue;
                }
                  if(snap.val()[a][b].ss){
                    if(snap.val()[a][b].status=="fin"){
                      this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "memo":memo,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
            
                    }else if(snap.val()[a][b].angel==true){
                      //날개방임.
                    
                      this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                  "memo":memo,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                 

                    }else{
                      //ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.
                      console.log("ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.")
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "memo":memo,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                    
                    }
                    }else{
                      console.log(" ss not true")
                      //초이스톡 방임.
                      console.log("total agasi "+totalagasi);
                      console.log(inagasi);
                      console.log(snap.val()[a][b].numofpeople);
                      console.log(snap.val()[a][b].ss);
                      var orderlist="";
                      if(snap.val()[a][b].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=snap.val()[a][b].orderlist;
                      }
                      console.log(snap.val()[a][b].ss);
                        console.log("ss is false")
                        //ㅅㅅ한 결과물임. 

                        if(snap.val()[a][b].status=="fin"){
                          console.log("is fin!");
                          this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "memo":memo,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else if(snap.val()[a][b].angel==true){
                          //날개방임.
                        
                          console.log("is angel!");
                          this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                      "insert_date":snap.val()[a][b].insert_date,
                      "memo":memo,
                    "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                      "wt":snap.val()[a][b].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                     
    
                        }else if(snap.val()[a][b].ss==false||snap.val()[a][b].ss==undefined){
                          console.log("ap.val()[a][b].ss is undefined....")
                          if(snap.val()[a][b].numofpeople<=inagasi){

                            console.log("but match so move to finished");
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            }else{
  
                              console.log("not match so remain");
                              this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                            "insert_date":snap.val()[a][b].insert_date,
                            "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                            "wt":snap.val()[a][b].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            
                            }

                        }else if(snap.val()[a][b].numofpeople<inagasi){

                          console.log("snap.val()[a][b].numofpeople<=totalagasi");
       this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
       "date":snap.val()[a][b].date,
     "incharge":snap.val()[a][b].incharge,
   "insert_date":snap.val()[a][b].insert_date,
 "insert_date_full":snap.val()[a][b].insert_date_full,
         "key":snap.val()[a][b].key,
         "memo":memo,
       "name":snap.val()[a][b].name,
       "orderlist":orderlist,"totalagasi":totalagasi,
       "avec":snap.val()[a][b].avec,
       "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
       "lastupdated":snap.val()[a][b].lastupdated,
       "directorId":snap.val()[a][b].directorId,
     "numofpeople":snap.val()[a][b].numofpeople,
     "status":snap.val()[a][b].status,
   "wt":snap.val()[a][b].wt,
 "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else {

                          
                          console.log("is else...");


      this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
      "date":snap.val()[a][b].date,
    "incharge":snap.val()[a][b].incharge,
    "insert_date":snap.val()[a][b].insert_date,
    "insert_date_full":snap.val()[a][b].insert_date_full,
        "key":snap.val()[a][b].key,
        "memo":memo,
      "name":snap.val()[a][b].name,
      "orderlist":orderlist,
      "showflag":true,
      "avec":snap.val()[a][b].avec,
      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
      "lastupdated":snap.val()[a][b].lastupdated,
      "directorId":snap.val()[a][b].directorId,
    "numofpeople":snap.val()[a][b].numofpeople,
    "status":snap.val()[a][b].status,
    "wt":snap.val()[a][b].wt,
    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }                   

                      
                  }
                  var counting=0;
                 
                  this.mainlist_choice.sort((a, b) => a.v - b.v);
                  counting=0;
                 

                  this.mainlist_choice.sort((a, b) => a.v - b.v);

                  counting=0;
                  for(var aaa in  this.mainlisttest){
                    counting++;
                  }
                  this.mainlist_choice.sort((a, b) => a.v - b.v);


                   counting=0;
                  for(var aaa in  this.mainlist_finished_choice){
                    counting++;
                    this.mainlist_finished_choice[aaa].v = counting;
                  }
                  this.mainlist_finished_choice.sort((a, b) => a.v - b.v);

                   counting=0;
                  for(var aaa in  this.mainlist_finished_status_choice){
                    counting++;
                    this.mainlist_finished_status_choice[aaa].v = counting;
                  }

                  this.mainlist_finished_status_choice.sort((a, b) => a.v - b.v);




                   counting=0;
              
                  //console.log(this.mainlisttest)
                  //console.log("test was")
                  //console.log(this.mainlist)
                  //console.log("this.mainlist_finished");
                  //console.log(this.mainlist_finished);
                  //console.log("this.mainlist_finished_status");
                  //console.log(this.mainlist_finished_status);
                  //console.log("this.mainlist_angel");
                  //console.log(this.mainlist_angel);
                  this.mainlist_finished_choice.sort(function(a,b){
                    if (a.status < b.status) {
                      return -1;
                    }
                    if (a.status > b.status) {
                      return 1;
                    }
                    return 0;

                  
                });
              }







              if(snap.val()[a][b].date!=undefined){
                if(snap.val()[a][b].end_date==undefined){
                  if(snap.val()[a][b].flag){
                    if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                      
                    }else{

                    this.mainlist_info.push(snap.val()[a][b]);
                    }
                  }
                  }else{
                    //console.log("this is finished room");
                    //console.log(snap.val()[a][b]);
                    if(snap.val()[a][b].agasi==undefined&&snap.val()[a][b].orderlist==undefined){
                      //이방은 OB처리해야함. 
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should be ob ++ ");
                      this.noagasi_info++;
                    }else{
                      
                      //console.log(snap.val()[a][b]);
                      //console.log("this bang should not be ob ++ ");
                      this.agasinum_info++;
                    }
                    //iterate through snap.val()[a][b] 
                    //and push to mainlist_finished
                    // this.mainlist_finished.push(snap.val()[a][b]);
                    var agasi = [];
                    if(snap.val()[a][b].agasi==undefined){
                      agasi = [];
                    }else{
                      agasi = snap.val()[a][b].agasi;
                    }
                    //console.log("agasi length : "+agasi.length);
                    //console.log(agasi);
                    if(agasi.length==0){
                      
                    }else{
                    }
                    
                    if(snap.val()[a][b].firstflag){

                    }else{
                      this.mainlist_finished_info.push({
                        "v":snap.val()[a][b].v, "agasi":agasi,
                            "date":snap.val()[a][b].date,
                          "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                      "insert_date_full":snap.val()[a][b].insert_date_full,
                              "key":snap.val()[a][b].key,
                            "name":snap.val()[a][b].name,
                            "avec":snap.val()[a][b].avec,
                            "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                            "lastupdated":snap.val()[a][b].lastupdated,
                            "directorId":snap.val()[a][b].directorId,
                          "numofpeople":snap.val()[a][b].numofpeople,
                          "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt
                      })
                    }
                    
                    // this.mainlist_finished.push(snap.val()[a][b]);
                  }
              }
              
            }
      
      }

      //console.log("this is finished room result")
      //console.log(this.noagasi);
      //console.log(this.agasinum);
      this.mainlist_info.sort(function(a, b) {
          // Compare dates
         
          var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
          var timeB = b.insert_date.split(":");
          return timeA[0]-timeB[0] || timeA[1]-timeB[1];
          
      });

      console.log("after sorting...")
      console.log(this.mainlist_info)
      this.mainlist_info.sort(function(a, b) {
        if (a.noflag === false && b.noflag !== false) {
          return -1; // a should come after b
        } else if (a.noflag !== false && b.noflag === false) {
          return 1; // a should come before b
        } else {
          return 0; // no change in order
        }
      });

      this.mainlist_finished_info.sort(function(a, b) {
        //console.log(a.insert_date);
        // Compare dates
       
        var timeA = a.insert_date.split(":"); // convert time string to array of hours and minutes
        var timeB = b.insert_date.split(":");
        return timeA[0]-timeB[0] || timeA[1]-timeB[1];
        
    });

    });

    this.generateroomcategory()
    //console.log(this.mainlist);
  }


  generateroomcategory(){
    console.log("generateroomcategory")
    this.smallroom=[];
    this.smallroom2=[];
    this.midroom=[];
    this.midroom2=[];
    this.bigroom=[];
    this.bigroom2=[];
    this.allroom=[];
    var roomin=[];
    
    this.firemain.child("company").child(this.company).child("roomlist").once('value').then((snap)=>{
      console.log("roomlist iterate...");
      if(snap.val()==null){

      }else{
        for(var a in snap.val()){
         var cat =  snap.val()[a].category;
         var name = snap.val()[a].name;
         var flag = snap.val()[a].flag;
         if(flag==undefined){
          flag=false;
         }
        //  console.log(name+"is:"+flag+"and cat : "+cat);
        this.allroom.push({"name":name,"category":cat,"flag":flag});
        if(cat=="소"){

          if(flag){
          }else{
            //console.log(name.substring(0,1));
            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.smallroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.smallroom2.push({"name":name,"category":cat,"flag":flag});
            }
          
          }
        }else if(cat=="중"){
          if(flag){
          }else{
            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.midroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.midroom2.push({"name":name,"category":cat,"flag":flag});
            }
            // this.midroom.push({"name":name,"category":cat,"flag":flag});
          }
        }else if(cat=="대"){
          if(flag){
          }else{
            if(name.substring(0,1)==1){
              //console.log("name : "+name);
              this.bigroom.push({"name":name,"category":cat,"flag":flag});
            }
            if(name.substring(0,1)==2){
              //console.log("name : "+name);
              this.bigroom2.push({"name":name,"category":cat,"flag":flag});
            }
            // this.bigroom.push({"name":name,"category":cat,"flag":flag});
          }
        }

       
      }
        
      }
  
      console.log(this.smallroom);
      console.log(this.midroom);
      console.log(this.bigroom);
      console.log(this.allroom)
    });

    
  }

  editing(a){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("editing...")
    console.log(a);
    console.log(a.name);
    let modal = this.modal.create(EditingroomPage,{"user":this.directorList, "mainlist":this.mainlist,"mainlist_finished":this.mainlist_finished_info, "a":a,"allroom":this.allroom,"bu":this.bu});
    modal.onDidDismiss(url => {
      console.log("EditingroomPageEditingroomPageEditingroomPageEditingroomPageEditingroomPage");
      console.log(url);
      if(url!=undefined){
        if(url.result){
          
        console.log("do nothing1");
        }else{

        console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
          },500)
        }
      }else{
        console.log("do nothing");
      }
    });

    modal.present();
  }
  addRoom(room){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    console.log("ad room come");
    console.log(room);
    let modal = this.modal.create(InfomodalPage,{"room":room,"bu":this.bu,"selectedKey":this.selectedKey, "selectedIncharge":this.selectedIncharge,"selectedAvec":this.selectedAvec,"selectedLogic":this.selectedLogic , "selectedNumber":this.selectedNumber});
    modal.onDidDismiss(url => {
      if(url!=undefined){
        if(url.result){
          
        //console.log("do nothing1");
        }else{

        //console.log("do refresh");
          setTimeout(()=>{
    
            this.generate();
            this.generate_info();
            this.refreshChoice2();
          },300)
        }
      }else{
        //console.log("do nothing");
      }
    

    });

    modal.present();
  }



  //choice come


  refreshChoice2(){
    console.log("refresh choice2 in choice.ts come...");
    var countingvalue=0;
    this.mainlist_choice=[];
    this.mainlist_finished_choice=[];
    this.mainlist_finished_status_choice=[];
    this.mainlist_angel_choice=[];
    this.agasijungsan_choice=[];
    //.on("value", function(snap) {
      // .on('child_changed', function(snap, prevChildKey) {
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday+"").once('value').then((snap)=>{
    
      this.mainlisttest=[];
      this.mainlist=[];
      this.mainlist_mine=[];
      this.mainlist2_mine=[];

      this.mainlist_finished_choice=[];
      this.mainlist_finished_status_choice=[];
      this.mainlist_angel_choice=[];

      this.mainlist_finished_choice=[];
      this.mainlist_finished_status_choice=[];
      this.mainlist_angel_choice=[];
      for(var a in snap.val()){
            for(var b in snap.val()[a]){
              // if(snap.snap.val()[a][b].end_date_full==undefined){
                if(snap.val()[a][b].date!=undefined){
                  var inagasi = 0;
                  var totalagasi = 0;
              if(snap.val()[a][b].agasi!=undefined){

                for(var c in snap.val()[a][b].agasi){
                  totalagasi++;
                  if(snap.val()[a][b].agasi[c].findate!=undefined){
                    //종료됨. 
                  }else{
                    inagasi++;
                    //종료 안됨. 들어가있는 상황 . 
                  }
                }
              }else{
                //agasi가 없는 경우.
              }
                  var orderlist="";
                  if(snap.val()[a][b].orderlist==undefined){
                    orderlist="no"
                  }else{
                    orderlist=snap.val()[a][b].orderlist;
                  }
                if(snap.val()[a][b].status=="fin"){

                }else{

              // countingvalue++;
                  
         
                }


            var memo = "";
            console.log(snap.val()[a][b])
            memo = snap.val()[a][b].memo;

                console.log(snap.val()[a][b].name);
                console.log(snap.val()[a][b].key);
                console.log(snap.val()[a][b].noflag+" ,,,,  "+snap.val()[a][b].firstflag);
                //console.log(inagasi);
                //console.log(totalagasi);
                
                if(!snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true||snap.val()[a][b].noflag&&snap.val()[a][b].firstflag==true){
                  continue;
                }
                  if(snap.val()[a][b].ss){
                    if(snap.val()[a][b].status=="fin"){
                      this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "memo":memo,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
            
                    }else if(snap.val()[a][b].angel==true){
                      //날개방임.
                    
                      this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                      "date":snap.val()[a][b].date,
                    "incharge":snap.val()[a][b].incharge,
                  "insert_date":snap.val()[a][b].insert_date,
                  "memo":memo,
                "insert_date_full":snap.val()[a][b].insert_date_full,
                        "key":snap.val()[a][b].key,
                      "name":snap.val()[a][b].name,
                      "orderlist":orderlist,
                      "avec":snap.val()[a][b].avec,
                      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                      "lastupdated":snap.val()[a][b].lastupdated,
                      "directorId":snap.val()[a][b].directorId,
                    "numofpeople":snap.val()[a][b].numofpeople,
                    "status":snap.val()[a][b].status,
                  "wt":snap.val()[a][b].wt,
                "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                 

                    }else{
                      //ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.
                      console.log("ㅅㅅ 방인데 ,   날개가아니고 완료도 아닌 경우.")
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "memo":memo,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                    
                    }
                    }else{
                      console.log(" ss not true")
                      //초이스톡 방임.
                      console.log("total agasi "+totalagasi);
                      console.log(inagasi);
                      console.log(snap.val()[a][b].numofpeople);
                      console.log(snap.val()[a][b].ss);
                      var orderlist="";
                      if(snap.val()[a][b].orderlist==undefined){
                        orderlist="no"
                      }else{
                        orderlist=snap.val()[a][b].orderlist;
                      }
                      console.log(snap.val()[a][b].ss);
                        console.log("ss is false")
                        //ㅅㅅ한 결과물임. 

                        if(snap.val()[a][b].status=="fin"){
                          console.log("is fin!");
                          this.mainlist_finished_status_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                        "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "memo":memo,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                        "wt":snap.val()[a][b].wt,"totalagasi":totalagasi,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else if(snap.val()[a][b].angel==true){
                          //날개방임.
                        
                          console.log("is angel!");
                          this.mainlist_angel_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                          "date":snap.val()[a][b].date,
                        "incharge":snap.val()[a][b].incharge,
                      "insert_date":snap.val()[a][b].insert_date,
                      "memo":memo,
                    "insert_date_full":snap.val()[a][b].insert_date_full,
                            "key":snap.val()[a][b].key,
                          "name":snap.val()[a][b].name,
                          "orderlist":orderlist,
                          "avec":snap.val()[a][b].avec,
                          "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                          "lastupdated":snap.val()[a][b].lastupdated,
                          "directorId":snap.val()[a][b].directorId,
                        "numofpeople":snap.val()[a][b].numofpeople,
                        "status":snap.val()[a][b].status,
                      "wt":snap.val()[a][b].wt,
                    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople<=inagasi});
                     
    
                        }else if(snap.val()[a][b].ss==false||snap.val()[a][b].ss==undefined){
                          console.log("ap.val()[a][b].ss is undefined....")
                          if(snap.val()[a][b].numofpeople<=inagasi){

                            console.log("but match so move to finished");
                              this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                          "insert_date":snap.val()[a][b].insert_date,
                        "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,"totalagasi":totalagasi,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                          "wt":snap.val()[a][b].wt,
                        "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            }else{
  
                              console.log("not match so remain");
                              this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
                              "date":snap.val()[a][b].date,
                            "incharge":snap.val()[a][b].incharge,
                            "insert_date":snap.val()[a][b].insert_date,
                            "insert_date_full":snap.val()[a][b].insert_date_full,
                                "key":snap.val()[a][b].key,
                                "memo":memo,
                              "name":snap.val()[a][b].name,
                              "orderlist":orderlist,
                              "showflag":true,
                              "avec":snap.val()[a][b].avec,
                              "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
                              "lastupdated":snap.val()[a][b].lastupdated,
                              "directorId":snap.val()[a][b].directorId,
                            "numofpeople":snap.val()[a][b].numofpeople,
                            "status":snap.val()[a][b].status,
                            "wt":snap.val()[a][b].wt,
                            "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                            
                            }

                        }else if(snap.val()[a][b].numofpeople<inagasi){

                          console.log("snap.val()[a][b].numofpeople<=totalagasi");
       this.mainlist_finished_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
       "date":snap.val()[a][b].date,
     "incharge":snap.val()[a][b].incharge,
   "insert_date":snap.val()[a][b].insert_date,
 "insert_date_full":snap.val()[a][b].insert_date_full,
         "key":snap.val()[a][b].key,
         "memo":memo,
       "name":snap.val()[a][b].name,
       "orderlist":orderlist,"totalagasi":totalagasi,
       "avec":snap.val()[a][b].avec,
       "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
       "lastupdated":snap.val()[a][b].lastupdated,
       "directorId":snap.val()[a][b].directorId,
     "numofpeople":snap.val()[a][b].numofpeople,
     "status":snap.val()[a][b].status,
   "wt":snap.val()[a][b].wt,
 "numofagasi":inagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }else {

                          
                          console.log("is else...");


      this.mainlist_choice.push({"v":snap.val()[a][b].v, "agasi":snap.val()[a][b].agasi,
      "date":snap.val()[a][b].date,
    "incharge":snap.val()[a][b].incharge,
    "insert_date":snap.val()[a][b].insert_date,
    "insert_date_full":snap.val()[a][b].insert_date_full,
        "key":snap.val()[a][b].key,
        "memo":memo,
      "name":snap.val()[a][b].name,
      "orderlist":orderlist,
      "showflag":true,
      "avec":snap.val()[a][b].avec,
      "lastupdatedperson":snap.val()[a][b].lastupdatedperson,
      "lastupdated":snap.val()[a][b].lastupdated,
      "directorId":snap.val()[a][b].directorId,
    "numofpeople":snap.val()[a][b].numofpeople,
    "status":snap.val()[a][b].status,
    "wt":snap.val()[a][b].wt,
    "numofagasi":inagasi,"totalagasi":totalagasi,"lack":snap.val()[a][b].numofpeople-inagasi});
                        }                   

                      
                  }
                  var counting=0;
                 
                  this.mainlist_choice.sort((a, b) => a.v - b.v);
                  counting=0;
                 

                  this.mainlist_choice.sort((a, b) => a.v - b.v);

                  counting=0;
                  for(var aaa in  this.mainlisttest){
                    counting++;
                  }
                  this.mainlist_choice.sort((a, b) => a.v - b.v);


                   counting=0;
                  for(var aaa in  this.mainlist_finished_choice){
                    counting++;
                    this.mainlist_finished_choice[aaa].v = counting;
                  }
                  this.mainlist_finished_choice.sort((a, b) => a.v - b.v);

                   counting=0;
                  for(var aaa in  this.mainlist_finished_status_choice){
                    counting++;
                    this.mainlist_finished_status_choice[aaa].v = counting;
                  }

                  this.mainlist_finished_status_choice.sort((a, b) => a.v - b.v);




                   counting=0;
              
                  //console.log(this.mainlisttest)
                  //console.log("test was")
                  //console.log(this.mainlist)
                  //console.log("this.mainlist_finished");
                  //console.log(this.mainlist_finished);
                  //console.log("this.mainlist_finished_status");
                  //console.log(this.mainlist_finished_status);
                  //console.log("this.mainlist_angel");
                  //console.log(this.mainlist_angel);
                  this.mainlist_finished_choice.sort(function(a,b){
                    if (a.status < b.status) {
                      return -1;
                    }
                    if (a.status > b.status) {
                      return 1;
                    }
                    return 0;

                  
                });
              }
              
            }
       
        
      }


      //console.log(this.mainlist);
      //console.log(this.mainlist_finished);
      //console.log(this.mainlist_finished_status);
      console.log(this.mainlist_angel_choice);
      this.angelnumber_choice=this.mainlist_angel_choice.length;
      this.agasijungsan_choice=[];
      for(var c in this.mainlist){
        for(var d in this.mainlist[c].agasi){
            if(this.mainlist[c].agasi[d].findate!=undefined){
  
            }else{
              this.agasijungsan_choice.push({"name":this.mainlist[c].agasi[d].name})
            }
           
        }
      }
      for(var c in this.mainlist_finished_choice){
        for(var d in this.mainlist_finished_choice[c].agasi){
            if(this.mainlist_finished_choice[c].agasi[d].findate!=undefined){
  
            }else{
  
              this.agasijungsan_choice.push({"name":this.mainlist_finished_choice[c].agasi[d].name})
            }
        }
      }
      //console.log(this.agasijungsan);

for(var main in this.mainlist_finished_choice){
  if(this.type=="wt"){
    if(this.mainlist_finished_choice[main].wt == this.nickname){
      console.log("mainlist_main added");
        this.mainlist2_mine.push({
          "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
            "date":this.mainlist_finished_choice[main].date,
          "incharge":this.mainlist_finished_choice[main].incharge,
          "insert_date":this.mainlist_finished_choice[main].insert_date,
          "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
              "key":this.mainlist_finished_choice[main].key,
              "memo":memo,
            "name":this.mainlist_finished_choice[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_finished_choice[main].avec,
            "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
            "lastupdated":this.mainlist_finished_choice[main].lastupdated,
            "directorId":this.mainlist_finished_choice[main].directorId,
          "numofpeople":this.mainlist_finished_choice[main].numofpeople,
          "status":this.mainlist_finished_choice[main].status,
          "wt":this.mainlist_finished_choice[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-inagasi
        })
  }
  }else if(this.type=="director"||this.type=="info"){

    if(this.mainlist_finished_choice[main].incharge == this.nickname){
      console.log("mainlist_main added");
        this.mainlist2_mine.push({
          "v":this.mainlist_finished_choice[main].v, "agasi":this.mainlist_finished_choice[main].agasi,
            "date":this.mainlist_finished_choice[main].date,
          "incharge":this.mainlist_finished_choice[main].incharge,
          "insert_date":this.mainlist_finished_choice[main].insert_date,
          "insert_date_full":this.mainlist_finished_choice[main].insert_date_full,
              "key":this.mainlist_finished_choice[main].key,
              "memo":memo,
            "name":this.mainlist_finished_choice[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_finished_choice[main].avec,
            "lastupdatedperson":this.mainlist_finished_choice[main].lastupdatedperson,
            "lastupdated":this.mainlist_finished_choice[main].lastupdated,
            "directorId":this.mainlist_finished_choice[main].directorId,
          "numofpeople":this.mainlist_finished_choice[main].numofpeople,
          "status":this.mainlist_finished_choice[main].status,
          "wt":this.mainlist_finished_choice[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_finished_choice[main].numofpeople-inagasi
        })
  }

  }
  
}
for(var main in this.mainlist_choice){
  if(this.type=="wt"){
    if(this.mainlist_choice[main].wt == this.nickname){
      console.log("mainlist_main added");
        this.mainlist_mine.push({
          "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
            "date":this.mainlist_choice[main].date,
          "incharge":this.mainlist_choice[main].incharge,
          "insert_date":this.mainlist_choice[main].insert_date,
          "insert_date_full":this.mainlist_choice[main].insert_date_full,
              "key":this.mainlist_choice[main].key,
              "memo":memo,
            "name":this.mainlist_choice[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_choice[main].avec,
            "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
            "lastupdated":this.mainlist_choice[main].lastupdated,
            "directorId":this.mainlist_choice[main].directorId,
          "numofpeople":this.mainlist_choice[main].numofpeople,
          "status":this.mainlist_choice[main].status,
          "wt":this.mainlist_choice[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_choice[main].numofpeople-inagasi
        })
  }
  }else if(this.type=="director"||this.type=="info"){

    if(this.mainlist_choice[main].incharge == this.nickname){
      console.log("mainlist_main added");
        this.mainlist_mine.push({
          "v":this.mainlist_choice[main].v, "agasi":this.mainlist_choice[main].agasi,
            "date":this.mainlist_choice[main].date,
          "incharge":this.mainlist_choice[main].incharge,
          "insert_date":this.mainlist_choice[main].insert_date,
          "insert_date_full":this.mainlist_choice[main].insert_date_full,
              "key":this.mainlist_choice[main].key,
              "memo":memo,
            "name":this.mainlist_choice[main].name,
            "orderlist":orderlist,
            "showflag":true,
            "avec":this.mainlist_choice[main].avec,
            "lastupdatedperson":this.mainlist_choice[main].lastupdatedperson,
            "lastupdated":this.mainlist_choice[main].lastupdated,
            "directorId":this.mainlist_choice[main].directorId,
          "numofpeople":this.mainlist_choice[main].numofpeople,
          "status":this.mainlist_choice[main].status,
          "wt":this.mainlist_choice[main].wt,
          "numofagasi":inagasi,"totalagasi":totalagasi,"lack":this.mainlist_choice[main].numofpeople-inagasi
        })
  }

  }
  
}
this.firemain.child('attendance').child(this.company).once('value').then((snap)=>{
  this.mainlist_attend=[];
  for(var a in snap.val()){
    if(a==this.currentstartday){
      for(var b in snap.val()[a]){
        if(snap.val()[a][b].attend!=undefined){
          this.mainlist_attend.push({"name":snap.val()[a][b].attend.name,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team,"tc":"-","wantee":"-","money":"-","bantee":"-"});
              
        }
      }
    }
  }

  console.log(this.mainlist_choice);
  console.log(this.mainlist_finished_choice);
  console.log(this.mainlist_finished_status_choice);
  console.log(this.mainlist_attend);
  console.log(this.agasijungsan_choice);
          this.standby=this.mainlist_attend.length-this.agasijungsan_choice.length;
     
});

    
      counting=0;
      for(var aaa in  this.mainlist){
        counting++;
        this.mainlist[aaa].v=counting;
      }
      this.mainlist.sort((a, b) => a.v - b.v);

      this.original_mainlist=this.mainlist;
  //console.log(this.mainlist)
  //console.log("snap fin...");
        });
        //console.log("refresh choice finished");
  }



  
  tabclicked(v){
    console.log("tab clicked : "+v);
    const checkbox = document.getElementById('tab2');
    const div = document.getElementById('custom-div');
    const div2 = document.getElementById('custom-div2');
    console.log(div);
    console.log(div2);
    console.log("tabclicked....");
    checkbox.addEventListener('change', function() {
     console.log(this);
    });
    if(v==1){

      if(this.tab1clicked){
        this.tab1clicked=false;
      }else{
        this.tab1clicked=true;
      }
      console.log("current : "+this.tab1clicked);
      if(this.tab1clicked){
        console.log("ta1 is true so go to false'");
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', false);

      div2.style.maxHeight="0px";
      div2.style.transform = 'translateY(-50%)';
      div2.style.maxHeight="200px";
      div2.classList.add('custom-transform2');
      }else{

        div2.classList.remove('custom-transform2');
        div2.style.maxHeight="0px";
        div2.style.transform = 'translateY(0%)';
        console.log("go to true'");
      $("#tab1").prop('checked', true);
      }
    }
    if(v==2){
      this.tab2clicked= !this.tab2clicked;
      if(this.tab2clicked){
        console.log("tab2 clicked : "+v);
        div.classList.add('custom-transform');
        div.style.maxHeight="0px";
        div.style.transform = 'translateY(-50%)';
        div.style.maxHeight="200px";
      $("#tab1").prop('checked', false);
      $("#tab2").prop('checked', true);
      }else{
        div.classList.remove('custom-transform');
        div.style.maxHeight="0px";
        div.style.transform = 'translateY(0%)';
      $("#tab2").prop('checked', false);
      }
    }
  }
    gotomorepage(a,v){
    if(!this.paymentflag){
      window.alert("결제전 이용 불가합니다.")
      return;
    }
    this.navCtrl.push(ChoicedetailPage,{"a":a,"v":v}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {

        console.log("ChoicedetailPage ondiddismiss....");
        console.log(data);
      this.refreshChoice2();

        setTimeout(()=>{
          this.screenSwitch(1);
        },10)
   

      })
    });

  }
  screenSwitch(values) : void {
    console.log("screenSwitch"+values);
   
      for (let i = 1; i <= 3; i++) { 
        document.getElementById("ion-label-area-"+i).style.display = "none"; 
      }
      document.getElementById("ion-label-area-" + values).style.display = "";
      this.zone.run(()=>{
  
        this.activeclass=values;
      })
  }
  
}