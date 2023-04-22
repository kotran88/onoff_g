import { Component,NgZone } from '@angular/core';
import { IonicPage, ViewController,LoadingController,ModalController,NavController, NavParams, AlertController } from 'ionic-angular';
import { ChoicemodalPage } from '../choicemodal/choicemodal';

import { UtilsProvider } from '../../providers/utils/utils';
import  firebase from 'firebase';
import { ChoicePage } from '../choice/choice';
import { E } from '@angular/core/src/render3';
/**
 * Generated class for the ChoicedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choicedetail',
  templateUrl: 'choicedetail.html',
})
export class ChoicedetailPage {
   a :any ;

   v:any;
   moneyvalue:any=[];
   currentstartday:any="";
   mainlist_angel:any=[];
   currentstart:any="";
   activeclass='1';
   company:any="";
   modifyflag:any=false;
   name:any = "";
   nickname:any="";
  interval:any;
  mainlist_finished_status:any = [];
  mainlist_finished:any = [];
  mainlist:any = [];
  firemain = firebase.database().ref();
  constructor(public alertCtrl:AlertController, public util:UtilsProvider,public view:ViewController,public loading:LoadingController,public modal:ModalController,public zone:NgZone, public navCtrl: NavController, public navParams: NavParams) {
    this.a=this.navParams.get("a");
    this.v=this.navParams.get("v");
    this.nickname=localStorage.getItem("nickname");
  
    if(this.v==1||this.v=="1"){
      this.activeclass='1';
    }else if (this.v==2||this.v=="2"){
      this.activeclass='2';
    }else if (this.v==3||this.v=="3"){
      this.activeclass='3';
    }else{
      this.activeclass='4';
    }
    console.log(this.a);
    this.company = localStorage.getItem("company");
    this.firemain.child("company").child(this.company).child("roomlist").off();
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");

    this.name = localStorage.getItem("name");
// this.presentLoading();
    this.interval =setInterval(()=>{
      console.log("come minutes..")
      this.refreshforeverymin();
      // this.util.dismissLoading();
      // this.dismissLoading();
    },1000*60)

  }

  ionViewDidLeave(){
    clearInterval(this.interval)

  }

  refreshforeverymin(){

    setTimeout(()=>{
      for(var c in this.mainlist){
        for(var d in this.mainlist[c].agasi){
            if(this.mainlist[c].agasi[d].findate!=undefined){
  
            }else{
              var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
              var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
              var newtctotal = Math.floor(tctotal);
              var bantee=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[2]);
              this.mainlist[c].agasi[d].money=totalmoney;
              this.mainlist[c].agasi[d].tc=tctotal;
              this.mainlist[c].agasi[d].bantee=bantee;
            }
           
        }
      }
  
      for(var c in this.mainlist_finished){
        for(var d in this.mainlist_finished[c].agasi){
          if(this.mainlist_finished[c].agasi[d].findate!=undefined){
  
          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
            this.mainlist_finished[c].agasi[d].money=totalmoney;
            this.mainlist_finished[c].agasi[d].tc=tctotal;
          }
        }
      }

      for(var c in this.mainlist_angel){
        for(var d in this.mainlist_angel[c].agasi){
          if(this.mainlist_angel[c].agasi[d].findate!=undefined){
  
          }else{
            var totalmoney=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[0]);
            var tctotal=Number(this.util.getTC(this.mainlist_angel[c].agasi[d],this.mainlist_angel[c].agasi[d].pausetime).split(",")[1]);
            this.mainlist_angel[c].agasi[d].money=totalmoney;
            this.mainlist_angel[c].agasi[d].tc=tctotal;
          }
        }
      }
      console.log(this.mainlist);
      console.log(this.mainlist_finished);
      console.log(this.mainlist_finished_status)
      console.log(this.mainlist_angel);

    },1000)
    
  }
  openclose(){
    console.log("open and cloe");
    // this.menuCtrl.open();
    this.view.dismiss();
    // this.navCtrl.push(ChoicePage,{flag:true}).then(() => {
    //   this.navCtrl.getActive().onDidDismiss(data => {

    //   })
    // });
  }
  choicestart(){
    console.log("gotodetail...")
    console.log(this.a);
    if(this.a.agasi==undefined){
      this.a.agasi=[];
    }
    console.log(this.a)
    console.log(this.mainlist[0])
    if(this.mainlist[0]!=undefined){

      this.a.agasi=this.mainlist[0].agasi;
    }
    console.log("r is....");
    console.log(this.a);
    
    let modal = this.modal.create(ChoicemodalPage,{"a":this.a});
    modal.onDidDismiss(url => {

      console.log(url);
      if(url==undefined){
        this.view.dismiss();
      }else if(url.result==true){
        this.refreshChoice2();
      }else if(url.result==false){
        console.log("do nothing....")
      }
      //this should refresh a....
      // this.refreshChoice2();
     

    });

    modal.present();
  }
/** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
screenSwitch(values) : void {
  console.log("screenSwitch");
  console.log(values);
 
    for (let i = 1; i <= 3; i++) { 
      console.log("i to none"+i);
      console.log("ion-label-area-" + i)
      console.log(document.getElementById("ion-label-area-"+i))
      document.getElementById("ion-label-area-"+i).style.display = "none"; 
    }
    console.log(document.getElementById("ion-label-area-" + values))
    document.getElementById("ion-label-area-" + values).style.display = "";
    this.zone.run(()=>{

      this.activeclass=values;
      console.log(this.activeclass)
    })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicedetailPage');


      //  "child_added", "child_changed", "child_removed", or "child_moved."
      this.firemain.child("company").child(this.company).child("roomlist").on('child_removed', function(snap, prevChildKey) {
        console.log("on on on on on child_removed.....")
        console.log(snap.val());
        console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("company").child(this.company).child("roomlist").on('child_moved', function(snap, prevChildKey) {
        console.log("on on on on on child_moved.....")
        console.log(snap.val());
        console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
      this.firemain.child("company").child(this.company).child("roomlist").on('child_added', function(snap, prevChildKey) {
        console.log("on on on on on child_added.....")
        console.log(snap.val());
        console.log(prevChildKey);
        // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
      });
        this.firemain.child("company").child(this.company).child("roomlist").on('child_changed', (snap, prevChildKey) =>{
          console.log("on on on on on child_changed.....")
          console.log(snap.val());
          console.log(prevChildKey);
          // this.refreshChoice2();
          // this.firemain.child("company").child(this.company).child("roomlist").child(prevChildKey).child(this.currentstartday)
        });
        
    this.refreshChoice2();
  }
  endall(c,room,mainlist) {

    this.util.presentLoading();
    
    console.log(c);
    console.log(room);
    console.log(mainlist);
    console.log(mainlist);
    console.log(mainlist.agasi);
    for(var abcd in mainlist.agasi){

    }
    console.log("----------endall----------");


    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{

      console.log("snap2 come...")
      // console.log(snap2.val())
      var totalsumtc="";
      for(var f in mainlist.agasi){

        if(mainlist.agasi[f].findate==undefined){
          var tctotal=0;
          console.log(mainlist.agasi[f])
            console.log(mainlist.agasi[f].name)
              var totalmoney=0;
              console.log(mainlist.agasi[f]);
              var id="";
              totalmoney=Number(this.util.getTC(mainlist.agasi[f],mainlist.agasi[f].pausetime).split(",")[0]);
             tctotal=(Number(this.util.getTC(mainlist.agasi[f],mainlist.agasi[f].pausetime).split(",")[1]) );
             console.log(totalsumtc+"tctotal::::"+tctotal);
             totalsumtc+=mainlist.agasi[f].name+":"+tctotal+" "
              var bantee=Number(this.util.getTC(mainlist.agasi[f],0).split(",")[2]);
              console.log("totalmoney : "+totalmoney)
              console.log(tctotal);
              this.getIdOfagaci(this.currentstartday,mainlist.agasi[f].name,totalmoney,room,c.key,f,tctotal,mainlist.wt,mainlist.incharge,mainlist,bantee)+"";
            
        }else{

        }
      }
      console.log("totalsumtc:"+totalsumtc);
      this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"tc":totalsumtc,"date":endtime,"contents":"전체종료 ","type":"fin", "uploader":this.nickname, "name":"system"})
     this.util.dismissLoading();
       
      // this.refreshChoice2();

      
    this.activeclass="1";

    setTimeout(()=>{

      this.refreshChoice2();
    },1000)
    // });
  }
  reinit(c,room,mainlist, f){

this.util.presentLoading();
    console.log("reinit come");
    console.log(c);
    var agasiname="";
    var pausetime=c.pausetime;
    console.log(mainlist)
    console.log(f);
    console.log(room);
    

    this.firemain.child("users").once("value",snapp=>{
      for(var b in snapp.val()){
        if(snapp.val()[b].name==c.name){

          for(var a in mainlist.agasi){
            console.log(mainlist.agasi[a].name+", "+c.name)
            if(mainlist.agasi[a].name==c.name){
      
              agasiname+=c.name;
              console.log("find");
              var num = a;
              console.log(c.findate);
              var date = new Date();
              var findate = new Date(c.findate);
              console.log(date);
              console.log(findate);
              //get minutes betweetn c.findate and date
              var diff = date.getTime() - findate.getTime();
              console.log(diff);
              var minutes = Math.floor(diff / 1000 / 60);
              console.log(pausetime);
              if(pausetime==undefined){
                pausetime=0;
              }
              console.log(minutes);
              pausetime+=Number(minutes);
              console.log(pausetime);
              console.log(this.company+","+room+",,"+this.currentstartday+","+mainlist.key+","+num+",,,"+pausetime);
              var postData = {
                date: c.date,
                money: c.money,
                name: c.name,
                roomno: c.roomno,
                tc: c.tc,
                pausetime:pausetime,
                wt:c.wt,
                writer:c.writer,
              };

                console.log("find user");
                var user = snapp.val()[b].id;
                console.log(snapp.val()[b].current)
                if(snapp.val()[b].current!=undefined){
                  window.alert("이미 들어가있는 방이 존재하므로, 재진행할수없습니다.");
                  return;
                }
                console.log("user:"+user);
                console.log("room:"+room+",,,"+this.currentstartday+","+mainlist.key+","+num);
                // this.firemain.child("users").child(user).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update(postData);


                console.log(postData)
                var dte = new Date();
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").remove();
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num+"").update(postData)
              if(f==2){
                var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
                this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
                this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"재진행:"+agasiname,"type":"reinit", "uploader":this.nickname, "name":"system"})
              }else{
                console.log(this.name);
                console.log(room);
                console.log(mainlist.key);
                var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
                this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
                this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"재진행:"+agasiname,"type":"reinit", "uploader":this.nickname, "name":"system"})
              }

              
            }
          }
        }
      }

    console.log("loop finish in reinit")
    // this.refreshChoice2();
    console.log("refreshchoice2 fin");
this.util.dismissLoading();
  console.log("end fin");
  this.view.dismiss();
    });
        

  }

  end(c,room,mainlist, f){

    console.log("-------------------------end-------------------------");
    console.log(c);
    console.log(mainlist)
    this.util.presentLoading();
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var selectedid ="";
    var  totalmoney=0;
    var bantee=0;
    var tctotal=0;
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    dte.setHours(dte.getHours()+9);
    var alreadyexist=false;
    this.firemain.child("users").once("value",snap=>{
      for(var b in snap.val()){
        if(snap.val()[b].type=="agasi"){
            console.log(c.name+",,,,"+snap.val()[b].nickname);
            if(c.name == snap.val()[b].nickname){
              alreadyexist=true;
              console.log("matched one : ");
              console.log(c);
              console.log(snap.val()[b]);
              selectedid=snap.val()[b].id;
              var selectedjopan=snap.val()[b].jopan;
              console.log(selectedid);
              console.log("mmmm")
              // this.firemain.child("users").child(snap.val()[b].id).child("current").remove();
              // this.firemain.child("users").child(snap.val()[b].id).child("roomhistory").child(room).update({"end_date":hour+":"+min,"end_date_full":dte})
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).once('value').then((snap2)=>{
                for(var d in snap2.val().agasi){
                  console.log(snap2.val().agasi[d]);
                  if(snap2.val().agasi[d].name==c.name){

                    //chasam
                     totalmoney=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[0]);
                    
                     tctotal=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[1]);
                     bantee=Number(this.util.getTC(snap2.val().agasi[d],snap2.val().agasi[d].pausetime).split(",")[2]);
                    var jjing=Math.round(tctotal);
                    if(Math.round(tctotal)>=1){
                      console.log(snap.val()[b]);
                      console.log(selectedjopan)
                      console.log(c);
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"wantee","values":jjing,"agasi":snap2.val().agasi[d].name,"room":mainlist.name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    if(bantee>=1){
                      this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"bantee", "values":bantee,"key":mainlist.key,"room":mainlist.name,  "agasi":snap2.val().agasi[d].name, "jopan":selectedjopan, "date":snap2.val().agasi[d].date,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
                    }
                    
                    //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
                    // if(mainlist.numofpeople>=5){

                    // }else{
                      console.log(mainlist.orderlist)
                      if(mainlist.orderlist!=undefined){
                        var totalnum=0;
                        for(var a in mainlist.orderlist.orderlist){
                          //iterate through and calculate cumulative num 
                          if(mainlist.orderlist.orderlist[a].category="주류"){
                            totalnum+=mainlist.orderlist.orderlist[a].num;
                          }
                          console.log(mainlist.orderlist.orderlist[a])
                        }
                        console.log("total bottle : "+totalnum);
                        var totaltc=0;
                        for(var b in mainlist.agasi){
                          totaltc+=mainlist.agasi[b].tc;
                          
                        }
                        var yeonti=0;
                        var yeonti_reason="";
                        console.log("totalnum : "+totalnum);
                        console.log("tctotal : "+tctotal);

              // 2 * 
              // tc갯수 >방인원수 * 술 병수 
              //   방인원수*술병수 -tc갯수 
              // 만약에 술병수보다 아갓씨의 TC가  더 많으면, 해당아가씨의 TC에서 술병수를 뺀것이 연티로잡힘. 
              

              // 술 2 x 인원 1
              // 가 3 나 4 다 1
              // 이면. totaltc가 8 이므로 2X1보다 크므로, 
              // 1*2-8 = -6 이므로 연티는 -6이됨.

              // 술 2 손님 4명
              // 가 3 나 1 다1 라6 
              // 술갯수보다 각 아가씨의 tc가 크니까 먼저 고려하여 
              // 6-2 = 4, 3-2 = 1 해서 연티가 5. 



              // 만약에, 손님이 2명 x 술 2병이면 총 4 인데. 
              // 아가씨는 가가 10 , 나나 2 다다2 라고 치면. 

              // 가가가 10이니까. 10-술병 2병 해서 연티 8 발생. 

              // 이제 손님 한명을 떨구고. 나면 
              // 1명 x2병이니까 총 2이니까. 
              // 2랑 나나, 다다의 tc 더한 4와 비교해서 2의 연티가 추가발생. 
                        
              //totaltc가 방인원수*술병수보다 크면,
              //사람수 * 술병수 - tc갯수

                        if(totaltc>mainlist.numofpeople*totalnum){
                          yeonti = mainlist.numofpeople * totalnum -tctotal;
                          yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+tctotal;
                          console.log(mainlist.numofpeople+"*"+totalnum+"-"+tctotal);
                        }else{
                          yeonti=totalnum;
                          yeonti_reason="totaltc is so great so just count totalnum";
                          console.log("totaltc is so great so just count totalnum");
                        }
                        
                        console.log("this room's yeonti is : "+yeonti+"and yeontireason"+yeonti_reason);
                        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":snap2.val().agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})
                      }else{
                        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                        this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":snap2.val().agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt})
                      }
                  this.firemain.child("users").child(selectedid).child("current").remove();
                      console.log("d is "+d);
                    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(d).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                    
                  }
                }
                console.log(snap.val().agasi)

                this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"tc":tctotal,"bantee":bantee,"totalmoney":totalmoney, "date":endtime,"contents":"종료 "+tctotal+"개","type":"fin", "uploader":this.nickname,"agasi":c.name, "name":"system"})
     
                console.log("501!!!")
              });
              console.log("loop finisehd");
  
            }
          }
          if(!alreadyexist){
            console.log("새로 등록된 아이임.")
          }
      }
      if(f==2){
        console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)
        this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
      }
      

      console.log("end fin before");
  });
  this.util.dismissLoading();
  console.log("end fin");
  setTimeout(()=>{
    this.refreshChoice2();
  },1000)
  // this.view.dismiss({"result":true});
  }
  refreshChoice2(){
    console.log("refreshchoice222")
    console.log(this.company);
    console.log(this.a);
    this.mainlist=[];
    this.mainlist_angel=[];
    this.mainlist_finished=[];
    this.mainlist_finished_status=[];
    this.firemain.child("company").child(this.company).once("value", (snap2)=>{
      for(var ccddd in snap2.val().roomlist){
        var snap = snap2.val().roomlist[ccddd];
        if(snap.name == this.a.name){
          console.log(snap.roomhistory[this.currentstartday])

          for(var b in snap.roomhistory[this.currentstartday]){
            console.log(snap.roomhistory[this.currentstartday][b])
            var inagasi = 0;
            if(snap.roomhistory[this.currentstartday][b].agasi!=undefined){

              for(var c in snap.roomhistory[this.currentstartday][b].agasi){
                console.log(snap.roomhistory[this.currentstartday][b].agasi[c])
                if(snap.roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
                  //종료됨. 
                }else{
                  inagasi++;
                  //종료 안됨. 들어가있는 상황 . 
                }
              }
            }else{
              //agasi가 없는 경우.
            }
            console.log("inagasi is "+inagasi);
            var memo = "";
            memo = snap.roomhistory[this.currentstartday][b].memo;
            var messages=[];
            for(var dd in snap.roomhistory[this.currentstartday][b].message){
              messages.push(snap.roomhistory[this.currentstartday][b].message[dd]);
            }
            //sort message by date
            messages.sort(function(a, b) {
              var dateA = new Date("2023-" + a.date.replace(/-/g, "/"));
                var dateB = new Date("2023-" + b.date.replace(/-/g, "/"));

                // Compare dates
                if (dateA > dateB) {
                  return -1; // Sort b before a
                } else if (dateA < dateB) {
                  return 1; // Sort a before b
                } else {
                  return 0; // Keep order unchanged
                }
            });
            console.log(snap.roomhistory[this.currentstartday][b])
            var findate = "";
            if(snap.roomhistory[this.currentstartday][b].findate!=undefined){
              findate = snap.roomhistory[this.currentstartday][b].findate;
            }
            console.log("findate is "+findate);

            if(snap.roomhistory[this.currentstartday][b].ss){
              if(snap.roomhistory[this.currentstartday][b].status=="fin"){
                this.mainlist_finished_status.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                "date":snap.roomhistory[this.currentstartday][b].date,
              "incharge":snap.roomhistory[this.currentstartday][b].incharge,
            "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
          "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                  "key":snap.roomhistory[this.currentstartday][b].key,
                  "message":messages,
                  "memo":memo,
                  "angel":snap.roomhistory[this.currentstartday][b].angel,
                  "name":snap.roomhistory[this.currentstartday][b].name,
              "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
              "status":snap.roomhistory[this.currentstartday][b].status,
            "wt":snap.roomhistory[this.currentstartday][b].wt,
          "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
      
               }else if(snap.roomhistory[this.currentstartday][b].angel==true){

                this.mainlist_angel.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                "date":snap.roomhistory[this.currentstartday][b].date,
              "incharge":snap.roomhistory[this.currentstartday][b].incharge,
            "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
          "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                  "key":snap.roomhistory[this.currentstartday][b].key,
                  "message":messages,
                  "memo":memo,
                  "angel":snap.roomhistory[this.currentstartday][b].angel,
                  "name":snap.roomhistory[this.currentstartday][b].name,
              "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
              "status":snap.roomhistory[this.currentstartday][b].status,
            "wt":snap.roomhistory[this.currentstartday][b].wt,
          "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
           

              }else{

                //초이스 ㅅㅅ 방에다가 날개가아니고 완료도 아닌 경우.
                        this.mainlist_finished.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                        "date":snap.roomhistory[this.currentstartday][b].date,
                      "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                    "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
                  "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                          "key":snap.roomhistory[this.currentstartday][b].key,
                        "name":snap.roomhistory[this.currentstartday][b].name,
                        "message":messages,

                        "memo":memo,
                    "angel":snap.roomhistory[this.currentstartday][b].angel,
                        "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                      "status":snap.roomhistory[this.currentstartday][b].status,
                    "wt":snap.roomhistory[this.currentstartday][b].wt,
                    "directorId":snap.roomhistory[this.currentstartday][b].directorId,
                  "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
              
              }
              }else{
                
                console.log(" 초이스 ㅅㅅ 이 아님. 그러면 재초거나 undefined else...flag ")
                console.log(snap.roomhistory[this.currentstartday][b]);
                var orderlist="";
                if(snap.roomhistory[this.currentstartday][b].orderlist==undefined){
                  orderlist="no"
                }else{
                  orderlist=snap.roomhistory[this.currentstartday][b].orderlist;
                }
               

                if(snap.roomhistory[this.currentstartday][b].numofpeople-inagasi<=0){
                  //진행중인방으로 넘어가야함. 무조건. 
                  if(snap.roomhistory[this.currentstartday][b].status=="fin"){
                    this.mainlist_finished_status.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                    "date":snap.roomhistory[this.currentstartday][b].date,
                  "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
              "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
              "directorId":snap.roomhistory[this.currentstartday][b].directorId,
              "key":snap.roomhistory[this.currentstartday][b].key,
              "message":messages,
              "memo":memo,
              "angel":snap.roomhistory[this.currentstartday][b].angel,
              "name":snap.roomhistory[this.currentstartday][b].name,
                  "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                  "status":snap.roomhistory[this.currentstartday][b].status,
                "wt":snap.roomhistory[this.currentstartday][b].wt,
              "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
          
                  }else if(snap.roomhistory[this.currentstartday][b].angel==true){

                    this.mainlist_angel.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                    "date":snap.roomhistory[this.currentstartday][b].date,
                  "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
              "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                      "key":snap.roomhistory[this.currentstartday][b].key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.roomhistory[this.currentstartday][b].angel,
                      "name":snap.roomhistory[this.currentstartday][b].name,
                  "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                  "status":snap.roomhistory[this.currentstartday][b].status,
                "wt":snap.roomhistory[this.currentstartday][b].wt,
              "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
               

                  }else{

                            this.mainlist_finished.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                            "date":snap.roomhistory[this.currentstartday][b].date,
                          "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                      "directorId":snap.roomhistory[this.currentstartday][b].directorId,
                      "key":snap.roomhistory[this.currentstartday][b].key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.roomhistory[this.currentstartday][b].angel,
                      "name":snap.roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.roomhistory[this.currentstartday][b].status,
                        "wt":snap.roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
                  }
                }else{
                  if(snap.roomhistory[this.currentstartday][b].status=="fin"){
                    this.mainlist_finished_status.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                    "date":snap.roomhistory[this.currentstartday][b].date,
                  "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
              "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
              "directorId":snap.roomhistory[this.currentstartday][b].directorId,
              "key":snap.roomhistory[this.currentstartday][b].key,
              "message":messages,
              "memo":memo,
              "angel":snap.roomhistory[this.currentstartday][b].angel,
              "name":snap.roomhistory[this.currentstartday][b].name,
                  "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                  "status":snap.roomhistory[this.currentstartday][b].status,
                "wt":snap.roomhistory[this.currentstartday][b].wt,
              "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
          
                  }else if(snap.roomhistory[this.currentstartday][b].angel==true){

                    this.mainlist_angel.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                    "date":snap.roomhistory[this.currentstartday][b].date,
                  "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
              "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                      "key":snap.roomhistory[this.currentstartday][b].key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.roomhistory[this.currentstartday][b].angel,
                      "name":snap.roomhistory[this.currentstartday][b].name,
                  "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                  "status":snap.roomhistory[this.currentstartday][b].status,
                "wt":snap.roomhistory[this.currentstartday][b].wt,
              "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
               

                  }else{

                            this.mainlist.push({"agasi":snap.roomhistory[this.currentstartday][b].agasi,
                            "date":snap.roomhistory[this.currentstartday][b].date,
                          "incharge":snap.roomhistory[this.currentstartday][b].incharge,
                        "insert_date":snap.roomhistory[this.currentstartday][b].insert_date,
                      "insert_date_full":snap.roomhistory[this.currentstartday][b].insert_date_full,
                      "directorId":snap.roomhistory[this.currentstartday][b].directorId,
                      "key":snap.roomhistory[this.currentstartday][b].key,
                      "message":messages,
                      "memo":memo,
                      "angel":snap.roomhistory[this.currentstartday][b].angel,
                      "name":snap.roomhistory[this.currentstartday][b].name,
                          "numofpeople":snap.roomhistory[this.currentstartday][b].numofpeople,
                          "status":snap.roomhistory[this.currentstartday][b].status,
                        "wt":snap.roomhistory[this.currentstartday][b].wt,
                      "numofagasi":inagasi,"lack":snap.roomhistory[this.currentstartday][b].numofpeople-inagasi});
                  }
                }
                
             
            }

            console.log("ttttthis.mainlist_finished");
            console.log(this.mainlist);
            console.log(this.mainlist_finished);
            console.log(this.mainlist_finished_status);


          }
        }
      }

this.refreshforeverymin();
    });
//     this.firemain.child("company").child(this.company).child("roomlist").once("value", (snap)=>{

//       console.log("in ")
//     this.mainlist=[];
//     this.mainlist_finished=[];
//     this.mainlist_finished_status=[];
//     this.mainlist_angel=[];
//     console.log("in refreshchoice2")
//     console.log(snap.val())
//       for(var a in snap.val()){
//         console.log(snap.val()[a])
//           if(snap.val()[a].roomhistory!=undefined){
//             console.log(a+",,,"+this.a.name);
//       if(a==this.a.name){
//             for(var b in snap.val()[a].roomhistory[this.currentstartday]){
//                 if(snap.val()[a].roomhistory[this.currentstartday][b].date!=undefined){
//                   var inagasi = 0;
//               if(snap.val()[a].roomhistory[this.currentstartday][b].agasi!=undefined){

//                 for(var c in snap.val()[a].roomhistory[this.currentstartday][b].agasi){
//                   if(snap.val()[a].roomhistory[this.currentstartday][b].agasi[c].findate!=undefined){
//                     //종료됨. 
//                   }else{
//                     inagasi++;
//                     //종료 안됨. 들어가있는 상황 . 
//                   }
//                 }
//               }else{
//                 //agasi가 없는 경우.
//               }
//               var memo = "";
//               memo = snap.val()[a].roomhistory[this.currentstartday][b].memo;
//               var messages=[];
//               for(var dd in snap.val()[a].roomhistory[this.currentstartday][b].message){
//                 messages.push(snap.val()[a].roomhistory[this.currentstartday][b].message[dd]);
//               }
//               //sort message by date
//               messages.sort(function(a, b) {
//                 var dateA = new Date("2023-" + a.date.replace(/-/g, "/"));
//                   var dateB = new Date("2023-" + b.date.replace(/-/g, "/"));

//                   // Compare dates
//                   if (dateA > dateB) {
//                     return -1; // Sort b before a
//                   } else if (dateA < dateB) {
//                     return 1; // Sort a before b
//                   } else {
//                     return 0; // Keep order unchanged
//                   }
//               });
//               console.log(snap.val()[a].roomhistory[this.currentstartday][b])
//                   if(snap.val()[a].roomhistory[this.currentstartday][b].ss){
//                     if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
//                       this.mainlist_finished_status.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                       "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                     "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                   "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                 "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                         "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                         "message":messages,
//                         "memo":memo,
//                         "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                         "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                     "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                     "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                   "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                 "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
            
//                      }else if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){

//                       this.mainlist_angel.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                       "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                     "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                   "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                 "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                         "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                         "message":messages,
//                         "memo":memo,
//                         "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                         "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                     "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                     "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                   "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                 "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                 

//                     }else{

//                       //초이스 ㅅㅅ 방에다가 날개가아니고 완료도 아닌 경우.
//                               this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                               "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                             "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                           "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                         "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                                 "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                               "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                               "message":messages,

//                               "memo":memo,
//                           "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                               "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                             "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                           "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                           "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
//                         "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                    
//                     }
//                     }else{
                      
//                       console.log(" 초이스 ㅅㅅ 이 아님. 그러면 재초거나 undefined else...flag ")
//                       console.log(snap.val()[a].roomhistory[this.currentstartday][b]);
//                       var orderlist="";
//                       if(snap.val()[a].roomhistory[this.currentstartday][b].orderlist==undefined){
//                         orderlist="no"
//                       }else{
//                         orderlist=snap.val()[a].roomhistory[this.currentstartday][b].orderlist;
//                       }
                     

//                       if(snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi<=0){
//                         //진행중인방으로 넘어가야함. 무조건. 
//                         if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
//                           this.mainlist_finished_status.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                           "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                         "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                       "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                     "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                     "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
//                     "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                     "message":messages,
//                     "memo":memo,
//                     "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                     "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                         "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                       "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                     "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                
//                         }else if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){
  
//                           this.mainlist_angel.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                           "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                         "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                       "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                     "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                             "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                             "message":messages,
//                             "memo":memo,
//                             "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                             "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                         "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                       "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                     "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                     
    
//                         }else{
  
//                                   this.mainlist_finished.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                                   "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                                 "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                               "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                             "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                             "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
//                             "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                             "message":messages,
//                             "memo":memo,
//                             "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                             "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                                 "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                                 "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                               "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                             "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
//                         }
//                       }else{
//                         if(snap.val()[a].roomhistory[this.currentstartday][b].status=="fin"){
//                           this.mainlist_finished_status.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                           "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                         "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                       "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                     "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                     "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
//                     "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                     "message":messages,
//                     "memo":memo,
//                     "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                     "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                         "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                       "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                     "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                
//                         }else if(snap.val()[a].roomhistory[this.currentstartday][b].angel==true){
  
//                           this.mainlist_angel.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                           "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                         "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                       "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                     "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                             "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                             "message":messages,
//                             "memo":memo,
//                             "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                             "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                         "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                         "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                       "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                     "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
                     
    
//                         }else{
  
//                                   this.mainlist.push({"agasi":snap.val()[a].roomhistory[this.currentstartday][b].agasi,
//                                   "date":snap.val()[a].roomhistory[this.currentstartday][b].date,
//                                 "incharge":snap.val()[a].roomhistory[this.currentstartday][b].incharge,
//                               "insert_date":snap.val()[a].roomhistory[this.currentstartday][b].insert_date,
//                             "insert_date_full":snap.val()[a].roomhistory[this.currentstartday][b].insert_date_full,
//                             "directorId":snap.val()[a].roomhistory[this.currentstartday][b].directorId,
//                             "key":snap.val()[a].roomhistory[this.currentstartday][b].key,
//                             "message":messages,
//                             "memo":memo,
//                             "angel":snap.val()[a].roomhistory[this.currentstartday][b].angel,
//                             "name":snap.val()[a].roomhistory[this.currentstartday][b].name,
//                                 "numofpeople":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople,
//                                 "status":snap.val()[a].roomhistory[this.currentstartday][b].status,
//                               "wt":snap.val()[a].roomhistory[this.currentstartday][b].wt,
//                             "numofagasi":inagasi,"lack":snap.val()[a].roomhistory[this.currentstartday][b].numofpeople-inagasi});
//                         }
//                       }
                      
                   
//                   }

//                   console.log("ttttthis.mainlist_finished");
//                   console.log(this.mainlist);
//                   console.log(this.mainlist_finished);
//                   console.log(this.mainlist_finished_status);
//                 //   this.mainlist_finished.sort(function(a,b){
//                 //     console.log(a.status+",,,"+b.status)
//                 //     if (a.status < b.status) {
//                 //       return -1;
//                 //     }
//                 //     if (a.status > b.status) {
//                 //       return 1;
//                 //     }
//                 //     return 0;

                  
//                 // });
//                 // console.log(this.mainlist_finished);
//               }
              
//             }
//       }else{
       
//       }
      
//           }
       
        
//       }
//       for(var c in this.mainlist){
//         console.log(this.mainlist[c].agasi)
//         for(var d in this.mainlist[c].agasi){
//           console.log(this.mainlist[c].agasi[d].name)
//           if(this.mainlist[c].agasi[d].findate!=undefined){

//           }else{
//             var totalmoney=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[0]);
//             var tctotal=Number(this.util.getTC(this.mainlist[c].agasi[d],this.mainlist[c].agasi[d].pausetime).split(",")[1]);
//             console.log(totalmoney);
//             console.log(tctotal);
//             this.mainlist[c].agasi[d].totalmoney=totalmoney;
//             this.mainlist[c].agasi[d].tc=tctotal;
//             console.log(this.mainlist[c].agasi[d])
//           }
//         }
//       }


//       for(var c in this.mainlist_finished){
//         console.log(this.mainlist_finished[c].agasi)
//         for(var d in this.mainlist_finished[c].agasi){
//           console.log(this.mainlist_finished[c].agasi[d].name)
//           if(this.mainlist_finished[c].agasi[d].findate!=undefined){

//           }else{
//             var totalmoney=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[0]);
//             var tctotal=Number(this.util.getTC(this.mainlist_finished[c].agasi[d],this.mainlist_finished[c].agasi[d].pausetime).split(",")[1]);
//             console.log(totalmoney);
//             console.log(tctotal);
//             this.mainlist_finished[c].agasi[d].money=totalmoney;
//             this.mainlist_finished[c].agasi[d].tc=tctotal;
//             console.log(this.mainlist_finished[c].agasi[d])
//           }
//         }
//       }


//       console.log("start refresh evermin")

//     console.log(this.mainlist);
//       console.log(this.mainlist_finished);
//       console.log(this.mainlist_finished_status)
      
//       console.log("refresh didloaded")
      
    
// this.refreshforeverymin();
//     });
    console.log("refresh didloaded")

  
  }
  abcd(aa){
    //main.lastupdated.split(" ")[1]
    const timeString = aa.trim();
    var hours = timeString.split(':')[0];
    var minutes = timeString.split(':')[1];
    const meridiem = Number(hours) < 12 ? '오전' : '오후';
    const hours12 = ((Number(hours) + 11) % 12 + 1);
    const formattedTime = `${meridiem} ${hours12}시${minutes}분`;
    return formattedTime;
  }
  async getIdOfagaci (d,name,totalmoney,room,key,number,tctotal,wt,incharge,mainlist,bantee){
    console.log(d);
    console.log(name);
    console.log(totalmoney);
    console.log(room);
    console.log(key);
    console.log(number);
    console.log(tctotal);
    console.log(wt);
    console.log(incharge)
    console.log(mainlist);
    console.log(bantee)
    this.firemain.child("users").once("value",snap=>{
      var returnvalue="";
      var selectedjopan
      var agasiname=name;
      var ddate="";
          for(var b in snap.val()){

            if(snap.val()[b].name==name){
              returnvalue=b;
              selectedjopan=snap.val()[b].jopan;
              date = snap.val()[b].date;
            }
          }
          console.log(name+"' id : "+returnvalue + totalmoney+",,,,"+number);

          var date = new Date();
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          var day = date.getDate();
          var hour = date.getHours();
          var min = date.getMinutes();
          var dte = new Date();
          dte.setHours(dte.getHours()+9);
          this.firemain.child("users").child(returnvalue).child("current").remove();

          var jjing=Math.round(tctotal);
          if(Math.round(tctotal)>=1){
            console.log(snap.val()[b]);
            console.log(selectedjopan)
            this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"values":jjing,"agasi":name, "room":mainlist.name,"jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          if(bantee>=1){
            this.firemain.child("users").child(mainlist.directorId).child("incentive").child(this.currentstartday).child(mainlist.key).child("bantee").update({"values":bantee,"type":"bantee","room":mainlist.name, "agasi":name, "jopan":selectedjopan, "date":d,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"wt":mainlist.wt})
          }
          //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
          if(mainlist.numofpeople>=5){

          }else{
            console.log(mainlist.orderlist)
            if(mainlist.orderlist!=undefined){
              var totalnum=0;
              for(var a in mainlist.orderlist.orderlist){
                //iterate through and calculate cumulative num 
                if(mainlist.orderlist.orderlist[a].category="주류"){
                  totalnum+=mainlist.orderlist.orderlist[a].num;
                }
                console.log(mainlist.orderlist.orderlist[a])
              }
              console.log("total bottle : "+totalnum);
              console.log(mainlist);
              var newtc=0;
              var tcarray = [];
              var chasamarray=[];
              var yeonti_reason="";
              var yeonti=0;
              for(var cccc in mainlist.agasi){
                console.log(mainlist.agasi[cccc].tc)
                newtc += Math.floor(mainlist.agasi[cccc].tc)
                tcarray.push(Math.floor(mainlist.agasi[cccc].tc))

                chasamarray.push( (mainlist.agasi[cccc].tc-Math.floor(mainlist.agasi[cccc].tc)).toFixed(1) );
              
              }
              // 2 * 
              // tc갯수 >방인원수 * 술 병수 
              //   방인원수*술병수 -tc갯수 
              // 만약에 술병수보다 아갓씨의 TC가  더 많으면, 해당아가씨의 TC에서 술병수를 뺀것이 연티로잡힘. 
              

              // 술 2 x 인원 1
              // 가 3 나 4 다 1
              // 이면. totaltc가 8 이므로 2X1보다 크므로, 
              // 1*2-8 = -6 이므로 연티는 -6이됨.

              // 술 2 손님 4명
              // 가 3 나 1 다1 라6 
              // 술갯수보다 각 아가씨의 tc가 크니까 먼저 고려하여 
              // 6-2 = 4, 3-2 = 1 해서 연티가 5. 



              // 만약에, 손님이 2명 x 술 2병이면 총 4 인데. 
              // 아가씨는 가가 10 , 나나 2 다다2 라고 치면. 

              // 가가가 10이니까. 10-술병 2병 해서 연티 8 발생. 

              // 이제 손님 한명을 떨구고. 나면 
              // 1명 x2병이니까 총 2이니까. 
              // 2랑 나나, 다다의 tc 더한 4와 비교해서 2의 연티가 추가발생. 


              if(newtc>mainlist.numofpeople*totalnum){
                yeonti = mainlist.numofpeople * totalnum -newtc;
                yeonti_reason=mainlist.numofpeople+"*"+totalnum+"-"+newtc;
                console.log(mainlist.numofpeople+"*"+totalnum+"-"+newtc);
              }else{
                yeonti=totalnum;
                yeonti_reason="totaltc is so great so just count totalnum";
                console.log("totaltc is so great so just count totalnum");
              }
              
              console.log("this room's yeonti is : "+yeonti);
              this.firemain.child("users").child(returnvalue).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room,"name":name,"date":d,"incharge":mainlist.incharge,"end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})
              this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"date":d, "lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
              // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"date":d, "end_date":hour+":"+min,"end_date_full":dte,"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
            }
        }
          this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(key).child("agasi").child(number).update({"bantee":bantee, "roomno":room,"findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"money":totalmoney,"wt":wt,"incharge":incharge})

                
    });
  }
  showPrompt(room,mainlist) {
    console.log(mainlist);
    const prompt = this.alertCtrl.create({
      title: '메모',
      message: "이 방에 대해 메모를 남겨주세요.",
      inputs: [
        {
          name: 'title',
          placeholder: '메모'
        },
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '저장',
          handler: data => {
            this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"memo":data.title});
            this.refreshChoice2();
          }
        }
      ]
    });
    prompt.present();
  }
  memo(c,room,mainlist) {
    this.showPrompt(room,mainlist);
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"memo":})
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.name, "name":"system"})
      
  }
  ss_fromangel(c,room,mainlist) {
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true,"angel":false})
    // this.firemain.child("company").child(this.company).child("roomlist").off();
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.nickname, "name":"system"})
      

    this.view.dismiss();
  }
  ss(c,room,mainlist) {
    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":true})
    // this.firemain.child("company").child(this.company).child("roomlist").off();
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"초이스 ㅅㅅ ","type":"ss", "uploader":this.nickname, "name":"system"})
      

    this.view.dismiss();
  }

  //초이스 탭으로 이동시키기.
  ss2(c,room,mainlist) {

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    console.log("재초 넘어가서 초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"ss":false})
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("message").push({"date":endtime,"contents":"재초이스","type":"ss", "uploader":this.nickname, "name":"system"})
     
    this.view.dismiss();
  }
  //날개방으로 이동시키기.
  ss3(c,room,mainlist) {
    console.log(" 날개초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).update({"angel":true})

   

    this.view.dismiss();
  }

  modify(c,room,mainlist) {
    this.modifyflag=true;
    console.log("modify come")
    console.log(c);
    console.log(room);
    console.log(mainlist);
  }


  modifyfin(c,room,mainlist) {
    var falseflag=false;
    this.modifyflag=false;
    console.log("modifyfin come")
    console.log(c.agasi);

    console.log(room);
    console.log(mainlist);
    var count=-1;
    var agasi=[];
    var initial = this.mainlist_finished[0];
    console.log(this.mainlist_finished)
    console.log(this.mainlist_finished[0])
    console.log(this.mainlist_finished[0].agasi)
    for(var a in this.mainlist_finished[0].agasi){
      count++;
      if(this.mainlist_finished[0].agasi[a].tc==undefined){
        break;
      }
      console.log(this.mainlist_finished[0].agasi[a].tc)
      var newmoney = this.util.getTCfromtc(this.mainlist_finished[0].agasi[a].tc);
      console.log(newmoney);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist_finished[0].agasi[a].money = newmoney;
      // var totalmoney=this.util.getTC(this.mainlist_finished[0].agasi[a],this.mainlist_finished[0].agasi[a].pauseTime).split(",")[0];
      // var tctotal = this.util.getTC(this.mainlist_finished[0].agasi[a],this.mainlist_finished[0].agasi[a].pauseTime).split(",")[1];
      // var bantee = this.util.getTC(this.mainlist_finished[0].agasi[a],this.mainlist_finished[0].agasi[a].pauseTime).split(",")[2];
      // console.log("totalmoney ...");
      // console.log(totalmoney);
      // console.log("tctotal ...");
      // console.log(tctotal);
      // console.log("bantee ...");
      // console.log(bantee);
      agasi.push(this.mainlist_finished[0].agasi[a]);
      console.log("agasiiiiii");
      console.log(agasi);
      

    }
    if(falseflag){
      window.alert("잘못된 값입니다.");
      this.view.dismiss();
      return;
    }
    console.log(this.company);
    console.log(room);
    console.log(this.mainlist_finished[0].key);
    console.log(agasi);
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished[0].key).update({agasi})
       
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").update(this.mainlist_finished.agasi)

    //tc 수정 

  }

  modifycancel(c,room,mainlist) {
    this.modifyflag=!this.modifyflag;
  }

  modifyfin2(c,room,mainlist) {
    var falseflag=false;
    this.modifyflag=false;
    console.log("modifyfin come")
    console.log(c.agasi);

    console.log(room);
    console.log(mainlist);
    var count=-1;
    var agasi=[];
    console.log(this.mainlist_finished_status)
    console.log(this.mainlist_finished_status[0])
    console.log(this.mainlist_finished_status[0].agasi)
    for(var a in this.mainlist_finished_status[0].agasi){
      count++;
      console.log(this.mainlist_finished_status[0].agasi[a].tc)
      if(this.mainlist_finished_status[0].agasi[a].tc==undefined){
        return;
      }
      console.log(this.mainlist_finished_status[0])
      if(this.mainlist_finished_status[0]==undefined){
        return;
      }
      var newmoney = this.util.getTCfromtc(this.mainlist_finished_status[0].agasi[a].tc);
      console.log(newmoney);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist_finished_status[0].agasi[a].money = newmoney;
      agasi.push(this.mainlist_finished_status[0].agasi[a]);
      console.log("agasi");
      console.log(agasi);
      console.log(this.mainlist_finished_status[0].key)
      

    }
    if(falseflag){
      window.alert("잘못된 값입니다.");
      this.view.dismiss();
      return;
    }
    this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished_status[0].key).update({agasi})
       
    // this.firemain.child("company").child(this.company).child("roomlist").child(room).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").update(this.mainlist_finished.agasi)

    //tc 수정 

  }
}
