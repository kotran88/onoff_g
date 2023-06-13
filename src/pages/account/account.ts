import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController,ViewController, ModalController,NavParams } from 'ionic-angular';
import { AccountingmodalPage } from '../accountingmodal/accountingmodal';
import { LoginpagePage } from '../loginpage/loginpage';

import { MenuController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { SignupPage } from '../signup/signup';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  firemain = firebase.database().ref();
  currentstartday:any="";
  selectedName:any="";
  bu=0;
  accumuls:Number=0;
  accountmessage:any=[];
  todaymoney=0;
  // 팀 리스트
  yeonti:any=0;
  view_list = [];
  // display: flex;로 정렬된 비율 유지를 위해 빈공간 리스트
  sort_temp_list =[];
  orderlist=[];
  detailarray=[];
  incen0:any=0;
  incen1:any=0;
  incen2:any=0;
  selectedDate:any=0;
  selectedMonth:any=0;
  selectedYear:any=0;
  name:any="";
  nickname:any="";
  login_data:any = {};
  company:any="";
  tomoney:any=0;
  cumulative:any=0;
  option_title_ch = 0; // 0 팀, 1 담당자, 2 달력
  option_title = ["팀을 선택해주세요.", "담당자를 선택해주세요."];

  today:Date; // 오늘 날짜
  date:Date; // 달력 표기일

  daysInThisMonth = []; // 이번달
  daysInLastMonth = []; // 저번달
  daysInNextMonth = []; // 다음달

  currentYear:number = 0; // 현재 년
  currentMonth:number = 0; // 현재 월
  currentDate:number = 0; // 현재 일

  directorList:any=[];
  paymentflag:any=false;
  firstflag=false;
  constructor(public util:UtilsProvider, public menuCtrl:MenuController,public view:ViewController,public modal:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = localStorage.getItem("name");
    this.nickname = localStorage.getItem("nickname");
    this.login_data = JSON.parse(localStorage.getItem("login_data"));
    this.company = localStorage.getItem("company");
    this.currentstartday=localStorage.getItem("startDate");
    this.firstflag = this.navParams.get("flag");

    var orderedQuery = this.firemain.child("users").orderByChild("type");
    orderedQuery.once("value", (snapshot) => {
     snapshot.forEach((childSnapshot) => {
       var childData = childSnapshot.val();
        this.directorList.push(childData);
     })

    });

  //  this.directorList=JSON.parse(localStorage.getItem("director"))

   console.log(this.directorList);
   
    this.get_team_list();

    this.goToday();

    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;


  }

  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  withdraw(){

    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.selectedDate)
    console.log(this.selectedName)
    //refreshing date by above info 
    let modal = this.modal.create(AccountingmodalPage,{"flag":2, "year":this.currentYear,"month":this.currentMonth,"day":this.selectedDate,"selected":this.selectedName});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");

      var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
      console.log(newdate);
      this.generatedata(this.selectedName.nickname,newdate);
      
    });

    modal.present();
  }
  confirm(){
    console.log(this.currentYear);
    console.log(this.currentMonth);
    console.log(this.selectedDate)
    console.log(this.selectedName)


    //refreshing date by above info 
    let modal = this.modal.create(AccountingmodalPage,{"flag":1,"year":this.currentYear,"month":this.currentMonth,"day":this.selectedDate,"selected":this.selectedName});
    modal.onDidDismiss(url => {
      console.log("dismiss second!");

      var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
      console.log(newdate);
      this.generatedata(this.selectedName.nickname,newdate);
      
    });

    modal.present();
  }
  close(){
    this.view.dismiss();
}  openclose(){
  console.log("open and cloe");
  this.menuCtrl.open();
}
  openmodal(v,month,year){
    console.log(year+","+month+","+v);
    this.selectedMonth=month;
    this.selectedYear=year;
    console.log("openmodalopenmodalopenmodalopenmodalopenmodalopenmodalopenmodalopenmodal");
    this.util.presentLoading();
    console.log(this.currentYear);
    console.log(this.currentDate);
    this.selectedDate=v;


    console.log(this.today.getMonth()+1+",,,,"+this.currentMonth);
    console.log("1111");
    console.log(this.today.getFullYear()+"comparedto : "+this.currentYear);

    console.log("2222");
    console.log(v+",,,"+this.selectedDate);
    console.log("3333");
    console.log(this.selectedName)




    var bujangid=this.selectedName.nickname;
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log(newdate);
    console.log(this.currentstartday)
    this.generatedata(bujangid,newdate);


    //refreshing date by above info 
    // let modal = this.modal.create(AccountingmodalPage,{"v":v,"year":this.currentYear,"month":this.currentMonth,"day":v,"selected":this.selectedName});
    // modal.onDidDismiss(url => {
    //   console.log("dismiss second!");
    // });

    // modal.present();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  get_team_list()
  {
    this.view_list = [];
   
    this.firemain.child('company').child(this.login_data.company).child("younglist").once('value').then((snap)=>{
      console.log(snap.val());
     
      for(var i in snap.val())
      {
        this.view_list.push(snap.val()[i]);
      }
      this.sort_temp_list = [];
      for(var j = 0; j < (this.view_list.length % 3); j++)
      {
        this.sort_temp_list.push(0)
      }
    })
  }

  logout(){
    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("loginflag", "false" )
    this.navCtrl.setRoot(LoginpagePage)
}
gotoview(view_list){
  this.view_list=view_list;

}
  get_charge_person(team)
  {
    this.util.presentLoading();
    console.log(team);
    this.option_title_ch = 1;
    this.view_list = [];
    var util = this.util;
    var view_list=[];
    var sort_temp_list=[];
    var a = this;
    for(var aabb in this.directorList){
      if(this.directorList[aabb].young!=undefined&&this.directorList[aabb].young.indexOf(team)>-1){
        view_list.push(this.directorList[aabb]);
      }
    }
    sort_temp_list = [];
      for(var j = 0; j < (view_list.length % 3); j++)
      {
        sort_temp_list.push(0)
      }
      console.log(view_list);
      a.gotoview(view_list);
      util.dismissLoading();

    // var orderedQuery = this.firemain.child("users").orderByChild("young");
    // orderedQuery.once("value", function(snap) {
    //   for(var i in snap.val())
    //   {
    //     if(snap.val()[i].young!=undefined){
    //       if(snap.val()[i].young.indexOf(team) > -1){
    //         view_list.push(snap.val()[i]);
    //       };
    //     }
    //   }
      

    // });

    // this.firemain.child('users').orderByChild("young").once('value').then((snap)=>{
      
    //   for(var i in snap.val())
    //   {
    //     if(snap.val()[i].young!=undefined){
    //       if(snap.val()[i].young.indexOf(team) > -1){
    //         this.view_list.push(snap.val()[i]);
    //       };
    //     }
    //   }
    //   this.sort_temp_list = [];
    //   for(var j = 0; j < (this.view_list.length % 3); j++)
    //   {
    //     this.sort_temp_list.push(0)
    //   }
    //   console.log(this.view_list);

    // this.util.dismissLoading();
    // })
  }

  get_money_data(name)
  {
    console.log("getmoneydata")
    this.util.presentLoading();
    console.log("get_money_data");
    console.log(name);
    this.selectedName=name;
    var bujangid=name.nickname;
    this.option_title_ch = 2;
    console.log(name);
    console.log("name was..");
    console.log(name.name);
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log(newdate);
    this.generatedata(bujangid,newdate);

  }
  checkEvent(day){
    return false;
  }
  generatedata(bujangid,nd){
    console.log("generatedata");
    console.log(bujangid);
    console.log(nd);
    this.accountmessage=[];
    this.detailarray=[];
    this.orderlist=[];
    this.tomoney=0;
    this.todaymoney=0;
    var newdate = this.currentYear+"-"+this.currentMonth+"-"+this.selectedDate;
    console.log("newdate : "+newdate);
    console.log(this.currentstartday);
    this.firemain.child("users").child(bujangid).child('roomhistory').child(newdate).once('value').then((snap)=>{
      if(snap.val()!=undefined){
        for(var a in snap.val()){
          console.log(snap.val()[a]);
                if(snap.val()[a].date==this.currentstartday){
                  if(snap.val()[a].incharge!=bujangid){
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
      for(var cccc in mainlist.agasi){
        console.log("looping each agasi");

        if(mainlist.agasi[cccc].findate!=undefined){
          //진행중임...
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
      console.log(mainlist.name);
      console.log("totalmoney ::::"+totalmoney);
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
                  if(yeonti==undefined){
                    yeonti=0;
                  }
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


                  this.tomoney+=tp+totalmoney+(yeonti*10000);
                  this.detailarray.push({"open":false,"status":snap.val()[a].status,"noflag":snap.val()[a].noflag,  "enddate":enddate,"key":snap.val()[a].key, "tctotal":tctotal,"chasam":newchasamtotal, "inagasi":inagasi, "incharge":snap.val()[a].incharge, "logic":logic, "reason":yeontireason,"tcarray":tcarray,"chasamarray":chasamarray,  "numofpeople":numofpeople,"tbottle":tbottle, "yeonti":yeonti,"tp":tp, "totalprice":orderprice,"tc":totaltc.toFixed(1),"money":totalmoney, "wt":snap.val()[a].wt,"date":orderdate,"roomno":snap.val()[a].name, "value":orderl});
              
                }
              }
            }
          });
    this.firemain.child("users").child(bujangid).once('value').then((snap)=>{
      if(snap.val())
      console.log(snap.val());
      if(snap.val().accounting==undefined){
      }else{

      console.log(snap.val().incentive);
      
      console.log(snap.val().accounting);
      console.log(snap.val().accounting.incoming);
      this.accumuls=snap.val().accounting.incoming;
      console.log(this.currentstartday);
        console.log(snap.val().accounting[nd]);
      this.todaymoney=0;
      for(var a in snap.val().accounting){
        console.log(a);
        console.log(this.currentstartday);
        console.log("mkmkmk")
        console.log(nd);
        if(a==nd){
          console.log(a);
          console.log(snap.val().accounting[a]);
          for(var c in snap.val().accounting[a]){
            console.log(c);
            console.log(snap.val().accounting[a][c]);
            console.log(snap.val().accounting[a][c].card);
            console.log(snap.val().accounting[a][c].cash);
            if(snap.val().accounting[a][c].withdraw!=undefined){
              //출금 
              this.todaymoney-=Number(Number(snap.val().accounting[a][c].card*0.85).toFixed(0));
              this.todaymoney-=Number(snap.val().accounting[a][c].cash);
            }else{
              this.todaymoney+=Number(Number(snap.val().accounting[a][c].card*0.85).toFixed(0));
              this.todaymoney+=Number(snap.val().accounting[a][c].cash);
            }
           

          }
        }
        for(var c in snap.val().accounting[a]){
          console.log(snap.val().accounting[a][c])
          console.log(nd);
          console.log(this.selectedDate)
          console.log(this.currentYear+"-"+Number(this.currentMonth)+"-"+this.selectedDate)
          if(snap.val().accounting[a][c].year==nd){
            if(snap.val().accounting[a][c].withdraw!=undefined&&snap.val().accounting[a][c].incoming==undefined){
              this.accountmessage.push({"type":"출금", "time":snap.val().accounting[a][c].time,"card":Number(snap.val().accounting[a][c].card),"cash":Number(snap.val().accounting[a][c].cash),"date":a,"name":snap.val().accounting[a][c].name});

              //출금
            }else if(snap.val().accounting[a][c].incoming!=undefined&&snap.val().accounting[a][c].withdraw==undefined){
              //입금
              this.accountmessage.push({"type":"입금", "time":snap.val().accounting[a][c].time,"card":Number(snap.val().accounting[a][c].card),"cash":Number(snap.val().accounting[a][c].cash),"date":a,"name":snap.val().accounting[a][c].name});

            }
            
          }
        
        }
      
      }
      }
      
      console.log(this.accountmessage);
      console.log(this.todaymoney);

      // if(snap.val().incentive==undefined){

      // }else{
      //   for(var a in snap.val().incentive){
      //     var date = a;
      //     console.log(date);
      //     console.log(this.currentstartday);
      //     console.log(a);
      //     console.log(newdate)
      //     if(a==newdate){
      //       var context = snap.val().incentive[a];
      //       console.log(context);
      //       for(var b in context){
      //         var detail = context[b];
      //         var aaaa;
      //         console.log(detail)
      //         detail.bottle=0;
      //         if(context[b].ordertype==undefined){
      //           return;
      //         }
      //         var orderlist = context[b].ordertype.orderlist;
      //         aaaa = detail.ordertype;
      //         aaaa.bottle=0;
      //         console.log(orderlist);
      //         var totalsumprice=0;
      //         for(var a in orderlist){
      //           console.log(orderlist[a]);
      //           if(orderlist[a].category=="주류"){
      //             console.log(orderlist[a].price);
      //             var price = orderlist[a].price.replace(",","");
      //             totalsumprice += Number(price)*Number(orderlist[a].num)
      //             console.log(orderlist[a].num)
      //             aaaa.bottle+=Number(orderlist[a].num);
      //             aaaa.totalsumprice= totalsumprice
      //           }
      //         }
      //         console.log(detail);
              
      //         console.log("aaaaa");
      //         console.log(aaaa);
      //         this.detailarray.push(aaaa);
    
    
    
      //       }
      //     }
        
      //   }
      // }
     
      console.log(this.detailarray)
    });


    this.firemain.child("company").child(this.company).once('value').then((snap)=>{
      console.log(snap.val().incen0)
      console.log(snap.val().incen1)
      console.log(snap.val().incen2)
      this.incen0=snap.val().incen0;
      this.incen1=snap.val().incen1;
      this.incen2=snap.val().incen2;

    });

    this.util.dismissLoading();

    // this.firemain.child("users").child(bujangid).child('roomhistory').child(newdate).once('value').then((snap)=>{
    //   console.log(snap.val())
    //   console.log("INININININININININININ!")
    
    // });
  }
  set_month(num)
  {
    this.date.setMonth(num-1);
    this.getDaysOfMonth();
  }

  getDaysOfMonth() {
    console.log("getDaysofMonth...")
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    this.currentMonth =this.date.getMonth()+1;
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
    this.selectedYear = this.currentstartday.split("-")[0];
    this.selectedMonth = this.currentstartday.split("-")[1];
    this.selectedDate = this.currentstartday.split("-")[2];
    
    console.log(this.selectedYear+","+this.selectedMonth+",,"+this.selectedDate);
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
    console.log("daysInThisMonth : "+this.daysInThisMonth);
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
    console.log("gotonextmonthgotonextmonth")
    console.log(this.date.getFullYear()+",,,,"+this.date.getMonth()+2, 0);
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    console.log(this.date);
    // this.zone.run(()=>{
      this.getDaysOfMonth();
    // })
  }
  
}
