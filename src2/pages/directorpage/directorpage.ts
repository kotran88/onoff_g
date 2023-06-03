import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { MenuController } from 'ionic-angular';
import { LoginpagePage } from '../loginpage/loginpage';
import { ParkingPage } from '../parking/parking';
import { InfoPage } from '../info/info';
import { AttendancePage } from '../attendance/attendance';
import { ChoicePage } from '../choice/choice';
import { GongjiPage } from '../gongji/gongji';
import { AccountPage } from '../account/account';
import { HistoryPage } from '../history/history';
import { UtilsProvider } from '../../providers/utils/utils';
import { SignupPage } from '../signup/signup';
@Component({
  selector: 'page-directorpage',
  templateUrl: 'directorpage.html',
})
export class DirectorpagePage {
  name:any="";
  nickname:any="";
  mainlist=[];
  allmainlist=[];
  directorList=[];
  orderlist=[];
  information=[];
  todaymoney=0;
  yeonti:any="";
  obj = [];
  interval:any;
  firemain = firebase.database().ref();
  count : number[] = new Array();
  totalcount=0;
  totalprice=0;
  paymentflag:any=false;
  currentstartday:any="";
  currentstart:any="";
  company:any;
  constructor(public util:UtilsProvider, public menuCtrl: MenuController , public navCtrl: NavController, public navParams: NavParams) {
    this.name= localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.company=localStorage.getItem("company");
    this.directorList=this.navParams.get("user");
    console.log(this.directorList);
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");


    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;


  }
  
  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  gotolink(value){
    if(value == 1){
    this.navCtrl.push(ParkingPage,{flag:true});
    }else if(value==2){
      this.navCtrl.push(InfoPage,{flag:true,user:this.directorList});
    }else if(value==3){
      this.navCtrl.push(AttendancePage,{flag:true});
    }else if(value==4){
      this.navCtrl.push(ChoicePage,{flag:true});
    }else if(value==5){
      this.navCtrl.push(GongjiPage,{flag:true});
    }else if(value==6){
      this.navCtrl.push(AccountPage,{flag:true});
    }else if(value==7){
      this.navCtrl.push(HistoryPage);
    }
  }
  openclose(){
    console.log("open and cloe");
    this.menuCtrl.open();
  }
  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    window.alert(localStorage.getItem("loginflag"))
    this.navCtrl.setRoot(LoginpagePage)
}

generate(){
  console.log("generate come...indirector page");
  console.log(this.nickname);
  this.orderlist=[];
  this.mainlist=[];
  this.todaymoney=0;
  this.firemain.child("users").child(this.nickname).child('roomhistory').child(this.currentstartday).once('value').then((snap)=>{
    if(snap.val()!=undefined){
      for(var a in snap.val()){
        console.log(snap.val()[a]);
              if(snap.val()[a].date==this.currentstartday){
                if(snap.val()[a].incharge!=this.nickname){
                  continue;
                }

                //console.log(snap.val()[a]);
      console.log(snap.val()[a].name);
                var numofangel =0;
                //////console.log(snap.val()[a]);
                var mainlist=snap.val()[a];
                //////console.log("mainlist...");
                //////console.log(mainlist);
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
      var totalmoney=0;
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
          //////console.log(mainlist.agasi[cccc]);
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
      //////console.log(snap.val()[a].orderlist);
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
               
               
                //console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
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
                    //////console.log(a.date+",,,"+b.date)
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
    //////console.log("end!");
  });
}

// generating(){

//   this.orderlist=[];
//   this.mainlist=[];
//   console.log('ionViewDidLoad DirectorpagePage');

//   var date = new Date();

//   var year=date.getFullYear();
//   var month=date.getMonth()+1;
//   var day = date.getDate();
//   var hour = date.getHours();
//   var min = date.getMinutes();
//   this.firemain.child("company").child(this.company).child('roomlist').once('value').then((snap)=>{
//     console.log(snap.val())
//     console.log("INNNN!")
//     if(snap.val()!=undefined){
//       console.log(snap.val())
//       for(var cca in snap.val()){
//         console.log(snap.val()[cca])
//       }
//       for(var a in snap.val()){
//         console.log(snap.val()[a])
//         for(var b in snap.val()[a].roomhistory){
//           console.log(snap.val()[a].roomhistory[b])
//           for(var c in snap.val()[a].roomhistory[b]){
//             console.log(snap.val()[a].roomhistory[b][c])
//             if(snap.val()[a].roomhistory[b][c].incharge!=this.nickname){
//               continue;
//             }

//               if(snap.val()[a].roomhistory[b][c].date==this.currentstartday){
//                 console.log(snap.val()[a].roomhistory[b][c].incharge);
//                 console.log(this.name);
//                 console.log(this.nickname);
//                 console.log(snap.val()[a].roomhistory[b][c].incharge)
//                 if(snap.val()[a].roomhistory[b][c].incharge.trim()==this.nickname.trim()){
//                   var mainlist=snap.val()[a].roomhistory[b][c];

//                   console.log("is mainlist...")
  
//                   console.log(mainlist);
//           for(var d in mainlist.agasi){
//               if(mainlist.agasi[d].findate!=undefined){
    
//               }else{
//                 var totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
//                 var tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
//                 var bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
//                 mainlist.agasi[d].totalmoney=totalmoney;
//                 mainlist.agasi[d].tc=tctotal;
//                 mainlist.agasi[d].bantee=bantee;
//               }
//           }
//           var logic = snap.val()[a].roomhistory[b][c].logic;
//           console.log(mainlist);
//           var newtc=0;
//           var tcarray = [];
//           var tctotal=0;
//           var chasamarray=[];
//           var chasamtotal=0;
//       var yeontireason="";
//       var inagasi = 0;
//           var numofpeople = snap.val()[a].roomhistory[b][c].numofpeople;
//           for(var cccc in mainlist.agasi){
//             inagasi++;
//             console.log(mainlist.agasi[cccc].tc)
//             newtc += Math.floor(mainlist.agasi[cccc].tc)
//             tcarray.push(Math.floor(mainlist.agasi[cccc].tc))
//             console.log("add tc Math.floor(mainlist.agasi[cccc].tc:"+Math.floor(mainlist.agasi[cccc].tc));
//             tctotal+=Number(Math.floor(mainlist.agasi[cccc].tc));
//             console.log(tctotal);
//             chasamtotal+=Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
//             console.log("add chasam...");
//             console.log(Number((mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) ));
//             chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
//           }
//           console.log(tctotal)
//           console.log("original chasamtotal : "+chasamtotal);
//           chasamtotal=Number(chasamtotal.toFixed(2));
//           var newchasamtotal=chasamtotal.toString();
//           //can you make it like this? newchasamtotal should be look like 1.8 and I want it to be 0.18 
//           newchasamtotal = newchasamtotal.split(".")[0]+newchasamtotal.split(".")[1];
//           newchasamtotal = ""+newchasamtotal;
//           if(chasamtotal==0){
//             newchasamtotal="0";
//           }
//           console.log(newchasamtotal);
//           // newchasamtotal
//           console.log("chasamtotal"+chasamtotal);
//           console.log(numofpeople+"newtc"+newtc);
//                 var orderl=[];
//                 var orderprice=0;
//                 var tp=0;
//                 var tbottle=0;
//                 if(snap.val()[a].roomhistory[b][c].orderlist==undefined){

//                 }else{
//                   for(var d in snap.val()[a].roomhistory[b][c].orderlist.orderlist){
//                     if(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].category=="주류"){
//                       tbottle+=Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num);
//                     }
//                     orderprice+= (Number(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price) );
//                     console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d]);
//                     orderl.push(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d])
//                     console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price);
//                     console.log(snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num)
//                     tp += snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].price.replace(",","")* snap.val()[a].roomhistory[b][c].orderlist.orderlist[d].num;
//                     console.log(snap.val()[a].roomhistory[b][c].orderlist);
//                     console.log(snap.val()[a].roomhistory[b][c].orderlist.orderDate);
//                   }
//                 }
                
//                 console.log("tbottole : "+tbottle+", numofpeople : "+numofpeople+", newtc : "+tcarray);
//                 var firstsumofv=0;
//                 var totalsum=0;
//                 if(logic){
//                   tbottle=tbottle-1;
//                   yeontireason+="중/대방두병여부에 따른 술병 차감 -1 , "
//                 }
//                 if(tcarray.length>numofpeople){
//                   var minVal = Math.min.apply(null, tcarray);
//                   console.log("minvalue : "+minVal);
//                   var maxVal = Math.max.apply(null, tcarray);
//                   console.log("maxvalue : "+maxVal);
//                   firstsumofv=minVal+maxVal-tbottle
//                   yeontireason += "인원수<아가씨, 가장큰 tc"+maxVal+"+가장작은 tc"+minVal+"에서 총술병"+tbottle+"를 뺀값."
//                 }
//                 // for(var abab in tcarray){
//                 //   console.log(tcarray[abab])
//                 //   console.log(tcarray[abab]+",,,"+tbottle)
//                 //   totalsum+=tcarray[abab];
//                 //   if(tcarray[abab]>=tbottle){
//                 //     var v = tcarray[abab]-tbottle;
//                 //     console.log(v);
//                 //     firstsumofv+=v;
//                 //   }
//                 // }
//                 // if(firstsumofv==0){
//                 //   firstsumofv=tbottle*numofpeople-totalsum;
//                 // }
//                 console.log("firstsumofv : "+firstsumofv);
//                 var yeonti=firstsumofv;
//                 console.log("yeontiiiii : "+yeonti);
//                 console.log("total bottle : "+tbottle);
//                 console.log(snap.val()[a].roomhistory[b][c])
//                   console.log(snap.val()[a].roomhistory[b][c].agasi)
//                   var totaltc=0;
//                   var totalmoney=0;
//                   for(var aga in mainlist.agasi){
//                     console.log("aga : ");
//                     console.log(mainlist.agasi[aga])
//                     console.log("tc:::"+mainlist.agasi[aga].tc);
//                     console.log("money:::"+mainlist.agasi[aga].totalmoney);
//                     if(mainlist.agasi[aga].tc==undefined){

//                     }else{
//                       totaltc+=Number(mainlist.agasi[aga].tc);
//                       if(mainlist.agasi[aga].totalmoney==undefined){

//                         totalmoney+=Number(mainlist.agasi[aga].money);
//                       }else{

//                         totalmoney+=Number(mainlist.agasi[aga].totalmoney);
//                       }
//                     }
//                   }
//                   console.log("tp ...r : "+tp);
//                   totalmoney=totalmoney*10000;
                  
//                   console.log(totalmoney);
//                   this.todaymoney += tp+totalmoney+Number(yeonti*10000);
//                   console.log(this.todaymoney);

//                   var orderdate="";
//                   var roomno="";
//                   if(snap.val()[a].roomhistory[b][c].orderlist!=undefined){
//                     orderdate = snap.val()[a].roomhistory[b][c].orderlist.orderDate
//                     roomno=snap.val()[a].roomhistory[b][c].orderlist.roomno;
//                   }else{
//                     orderdate = "-"
//                     roomno="-"
//                   }

//                   this.orderlist.push({"tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "numofpeople":numofpeople,"incharge":snap.val()[a].roomhistory[b][c].incharge,"tbottle":tbottle, "yeonti":yeonti,"reason":yeontireason,"logic":logic, "tcarray":tcarray,"chasamarray":chasamarray,  "tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].roomhistory[b][c].wt,"date":orderdate,"roomno":snap.val()[a].roomhistory[b][c].name, "value":orderl});
//               }
                
//               }
             
              
           
//           }
//         }
//       }
//     }else{
//       console.log(snap.val())
//     }
//     for(var cc in this.orderlist){
//       console.log(this.orderlist[cc].value);
//     }
    
//     console.log(this.orderlist)
//   });

//   this.firemain.child("company").child(this.company).child('park').once('value').then((snap)=>{
//     console.log(snap.val())
//     for(var a in snap.val()){
//       console.log("a is :"+a);
//       var todaylist=[];
//       var countingvalue=0;
//       var countingprice =0;

//       // this.mainlist.push(snap.val()[a]);
//       // todaylist.push({"carnum":snap.val()[a].carnum,"date":snap.val()[a].date,"incharge":snap.val()[a].incharge,"key":snap.val()[a].key,"price":snap.val()[a].price,"receiver":snap.val()[a].receiver,"room":snap.val()[a].room,"time":snap.val()[a].time,"type":snap.val()[a].type});
//       for(var b in snap.val()[a]){
//         console.log(b);
//         console.log(snap.val()[a][b]);

//         todaylist.push(snap.val()[a][b]);
//       countingvalue++;
//       countingprice+=Number(snap.val()[a][b].price);
//       console.log(this.currentstartday);
//       console.log(a);
//       console.log(snap.val()[a][b].date);
//         if(this.currentstartday==a){
//           this.totalcount++;
//           this.totalprice+=Number(snap.val()[a][b].price);
//           this.mainlist.push(snap.val()[a][b]);

//         }

//         // this.allmainlist.push(snap.val()[a][b]);
        
//       }
//     }

//     console.log(this.mainlist)
//   });
// }

togglesection(i){
  this.orderlist[i].open = !this.orderlist[i].open;
}
  ionViewDidLeave(){
    clearInterval(this.interval)
  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad DirectorpagePage');
  
      this.generate();
  
  
    }
  
}
