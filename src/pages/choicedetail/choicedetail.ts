import { ChoicemodalPage } from '../choicemodal/choicemodal';

import { IonicPage,ViewController,Platform,Content,LoadingController,ModalController, NavController,AlertController, NavParams } from 'ionic-angular';
import { Component ,NgZone,ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { UtilsProvider } from '../../providers/utils/utils';
import  firebase from 'firebase';
import { ChoicePage } from '../choice/choice';
import { E, T } from '@angular/core/src/render3';
import { SlidetestPage } from '../slidetest/slidetest';
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

  @ViewChild(Content) content: Content;
  @ViewChild('contentElement', { read: ElementRef }) contentElementRef: ElementRef;
  @ViewChild('targetElement', { read: ElementRef }) targetElementRef: ElementRef;
  startX: number = 0;
  startY: number = 0;
  swipeDirection: 'none' | 'right' | 'left' = 'none';

  isDragging: boolean = false;
  totalMovement: number = 0;
  threshold: number = 100; // Adjust this value to set your desired threshold

  a :any ;
  newname:any="";
  numofpeople:any=0;
  inagasi:any=0;
  angelcount:any=0;
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
  mainlist_finished_clone:any = [];
  mainlist_finished_origin:any = [];
  mainlist_origin:any=[];
  mainlist:any = [];
  tempmainlist:any=[];
  originalagasilist:any = [];
  firemain = firebase.database().ref();
  key:any;
  roomno:any;
  modalopen:any=false;

  constructor(public platform:Platform,public alertCtrl:AlertController, public util:UtilsProvider,public view:ViewController,public loading:LoadingController,public modal:ModalController,public zone:NgZone, public navCtrl: NavController, public navParams: NavParams) {
    
    console.log("choice detail come...");

    this.a=this.navParams.get("a");

    console.log("this.a ->"+this.a);

    this.v=this.navParams.get("v");
    this.nickname=localStorage.getItem("nickname");
    this.platform.registerBackButtonAction(() => { 
      console.log("back in detail..");
      console.log(this.modalopen);
      this.openclose();
    });

    console.log("this.a ->"+this.a);
    console.log("this.v ->"+this.v);

    if(this.v==undefined){
      this.activeclass='1';
    }else if(this.v==1||this.v=="1"){
      this.activeclass='1';
    }else if (this.v==2||this.v=="2"){
      this.activeclass='2';
    }else if (this.v==3||this.v=="3"){
      this.activeclass='3';
    }else{
      this.activeclass='4';
    }
    console.log("this.a->"+this.a);
    this.company = localStorage.getItem("company");
   
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


    /**
     * fillCount 만큼 0으로 채웁니다.
     * @param value 
     * @param fillCount 
     * @returns 
     */
    function zeorfill(value,fillCount){

      var result = value;
      // value가 number 타입일 경우 string으로 변경 후 작업
      if(typeof value === "number") result = value.toString()
   
      var fillText = Array(fillCount+1 - result.length).join('0')
      return result.toString().length < fillCount ?  fillText + result : result;

    }

  }//constructor :)

  /**
   * 비용 처리기준을 체크합니다.
   * 600초(10분) 보다 작으면 false 크면 true
   * @param dateTime 
   * @returns 
   */
  isPassedStandardWorkingTimeSec(dateTime:string):boolean{

    let myWorkingTimeSec:number = Math.trunc(this.calcRoomtime(dateTime));
    let standardWorkingTimeSec:number = 10*60;//10분 

    console.log(`일한 시간은 : ${myWorkingTimeSec} 초`);
    console.log(`기준 시간은 : ${standardWorkingTimeSec} 초`);

    if(standardWorkingTimeSec < myWorkingTimeSec){
      return true
    }else{
      return false;
    }
  }
  /**
   * 룸에 머문 시간을 계산합니다 sec 단위
   * @param startTime 
   * @returns 
   */
  calcRoomtime(startTime:any):number{

    const dateA = new Date();
    const dateB = new Date(startTime);

    console.log(`입장시간은 : ${dateA}`);
    console.log(`종료시간은 : ${dateB}`);

    const diffMSec = dateA.getTime() - dateB.getTime();
    const diffSec = diffMSec / 1000;
    const diffMin = diffMSec / (60 * 1000);

    console.log(`시간의 차이는 ${diffSec}초 입니다.`);  // 결과: '시간의 차이는 20분 입니다.'

    return diffSec;
  }

  /**
   * 페이지에서 떠날거고 곧 엑티브 페이지가 아니게 될때 실행.
   */
  ionViewWillLeave(){
    clearInterval(this.interval)
  }
  /**
   * 페이지를 떠났고 더이상 엑티브 페이지가 아닐때 실행됨.
   */
  ionViewDidLeave(){

  }
    /**
   * 페이지가 로드 될때 실행됨. 이 이벤트는 페이지가 생성될때만 호출됨.
   * 페이지를 떠났지만 캐시되었다가, 다시 나타날 경우에는 호출되지 않음. 
   * ionViewDidLoad 이벤트는 페이지 셋업 코드에 적당함. (역주 : 즉 한번만 실행)
   */
  ionViewDidLoad() {

    console.log('ionViewDidLoad ChoicedetailPage');
        
    this.refreshChoice2();
  }

  /**
   * refreshChoice2() 가 호출될때 마지막에 호출하는 func.
   */
  refresheverymin(){

    console.log("refresheveryminrefresheveryminrefresheverymin");
    console.log(this.mainlist);
    console.log(this.mainlist_finished);

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

            console.log(this.mainlist[c].agasi[d]);
            console.log(this.mainlist[c].agasi[d].tc);
            console.log(this.mainlist[c].agasi[d].money);
            console.log(this.mainlist[c].agasi[d].bantee);
            console.log(this.mainlist[c].agasi[d].pausetime);
            console.log(this.mainlist[c].agasi[d].name);
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
          this.mainlist_finished[c].agasi[d].wantee=Math.floor(this.mainlist_finished[c].agasi[d].tc);
          this.mainlist_finished[c].agasi[d].chasam=Number((this.mainlist_finished[c].agasi[d].tc-Math.floor(this.mainlist_finished[c].agasi[d].tc)).toFixed(1) )

          console.log(this.mainlist_finished[c].agasi[d]);

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

  }//refresheverymin :)
  /**
   * justrefresh
   */
  justrefresh(){

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

  }//justrefresh :)
  /**
   * 매 1분마다 호출되는 func.
   * tc 계산을 한다
   */
  refreshforeverymin(){

      console.log("refreshforeverymin");

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

  }//refreshforeverymin :)
  /**
   * open and close
   */
  openclose(){

    console.log("open and cloe");

    this.navCtrl.setRoot(SlidetestPage);

  }
  /**
   * choicestart
   */
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
    console.log("this.a.key : "+this.a.key);
    
    this.firemain.child("company").child(this.company).child("choice").child(this.a.key).update({"status":"start",
                                                                                                  "key":this.a.key, 
                                                                                                  "name":this.a.name, 
                                                                                                  "startdate":new Date()});

    let modal = this.modal.create(ChoicemodalPage,{"a":this.a,"numofpeople":this.numofpeople,"inagasi":this.inagasi,"angelcount":this.angelcount})

    modal.onDidDismiss(url => {

      this.firemain.child("company").child(this.company).child("choice").child(this.a.key).update({"status":"end",
                                                                                                    "name":this.a.name, 
                                                                                                    "enddate":new Date()});
      if(url==undefined){
        this.view.dismiss();
      }else if(url.result==true){
        window.alert("refresh..");
        this.refreshChoice2();
      }else if(url.result==false){
        console.log("do nothing....")
      }else if(url.result=="nono"){
        console.log("do nothing....")
        this.view.dismiss();
      }
      this.modalopen=false;
      //this should refresh a....
      // this.refreshChoice2();
    });

    this.modalopen=true;
    modal.present();

  }//choicestart :)

  /**
   * 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. 
   * @param values 
   */
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

  /**
   * 전체종료
   * @param c 
   * @param room 
   * @param mainlist 
   * @param num 
   */
  endall(c,room,mainlist,num) {

    console.group(num);
    console.log(this.mainlist_finished);
    this.util.presentLoading();
    
    console.log(c);
    console.log(room);
    console.log(mainlist);
    console.log(mainlist.agasi);

    if(num==2){
      mainlist.agasi = this.mainlist_finished[0].agasi;
    }else if (num==1){
      mainlist.agasi = this.mainlist[0].agasi;
    }

    console.log("----------endall----------");
    console.log(mainlist.agasi);

    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    
    console.log("snap2 come...");

    var totalsumtc="";
    for(var f in mainlist.agasi){
      if(mainlist.agasi[f].findate==undefined){             
        this.getIdOfagaci(this.currentstartday,mainlist.agasi[f].name,room,c.key,mainlist.wt,mainlist.incharge,mainlist)+"";
      }else{

      }
    }
            
    console.log("totalsumtc:"+totalsumtc);
    
    //firemain push
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":totalsumtc,
                                                                                                                                                            "date":endtime,
                                                                                                                                                            "contents":"전체종료 ",
                                                                                                                                                            "type":"fin", 
                                                                                                                                                            "uploader":this.nickname, 
                                                                                                                                                            "name":"system"})
    
    console.log(this.currentstartday+",,,"+room+"////"+mainlist.key);

    if(num==2){
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true}).then(()=>{
      }).catch((e)=>{
        window.alert(e);
      })
    }
     
    // this.refreshChoice2();

    // this.activeclass="2";
    console.log("this is end all this is end all this is end all this is end all this is end all this is end all this is end all ")
    setTimeout(()=>{
      this.util.dismissLoading();
      
      this.refreshChoice2();
    },1000)
    // });
  }//endall:)
  /**
   * 재진행
   * @param c 
   * @param room 
   * @param mainlist 
   * @param f 
   */
  reinit(c,room,mainlist, f){
      
    this.util.presentLoading();

    console.log("reinit come");
    console.log(c);
    console.log(room);
    console.log(mainlist);
    console.log(f);
  
    var agasiname="";
    var pausetime=c.pausetime;

    if(f==2){
      mainlist = this.mainlist_finished_origin;
    }else if(f==1){
      console.log(this.mainlist_origin);
      mainlist = this.mainlist_origin;
    }

    console.log("users > "+c.name);
    
    this.firemain.child("users").child(c.name).once("value",snapp=>{

      console.log(snapp.val());
      console.log(snapp.val().current);

      for(var a in mainlist.agasi){

        console.log(mainlist.agasi[a]);
        console.log(mainlist.agasi[a].name+", "+c.name)

        if(mainlist.agasi[a].name==c.name){

          agasiname+=c.name;
          var num = mainlist.agasi[a].num;

          console.log(c.name+"d is...at first : "+num);
          console.log("find");
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
          console.log(c);

          var angel = false;

          if(c.angel!=undefined){
            angel=c.angel;
          }

          var postData = {
            date: c.date,
            money: c.money,
            name: c.name,
            roomno: c.roomno,
            tc: c.tc,
            angel:angel,
            num:num,
            pausetime:pausetime,
            wt:mainlist.wt,
            writer:c.writer,
          };

          console.log(postData)
          console.log("find user");

          var user = snapp.val().id;
          var jopan = snapp.val().jopan;

          console.log(snapp.val().current)

          if(snapp.val().current!=undefined){
            window.alert("이미 "+snapp.val().name+" 유저가 들어가있는 방이 존재하므로, 재진행할수없습니다.");
            this.util.dismissLoading();
            return;
          }
          console.log("user:"+user);
          console.log("room:"+room+",,,"+this.currentstartday+","+mainlist.key+","+num);
          console.log("jopan : "+jopan);

          var dte = new Date();
          dte.setHours(dte.getHours()+9);
          
          //users > 사용자 > current 정보를 추가한다
          this.firemain.child("users").child(c.name).child("current").update({"room":c.roomno,"enter_date":dte,"date":this.currentstartday})
        
          this.firemain.child("company").child(this.company).child("jopanjjing").child(jopan).child(this.currentstartday).once("value",snap=>{
            for(var aaa in snap.val()){
              if(snap.val()[aaa].key==mainlist.key){
                this.firemain.child("company").child(this.company).child("jopanjjing").child(jopan).child(this.currentstartday).child(aaa).remove();
              }
            }
          });

          console.log(postData)

          var dte = new Date();
          
          this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num+"").remove();
          this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num+"").update(postData)
          
          if(f==2){

            var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

            this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
            //firemain push
            this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,
                                                                                                                                                                                        "contents":"재진행:"+agasiname,
                                                                                                                                                                                        "type":"reinit", 
                                                                                                                                                                                        "uploader":this.nickname, 
                                                                                                                                                                                        "name":"system"})
          
          }else{

            console.log(this.name);
            console.log(room);
            console.log(mainlist.key);

            var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

            this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
            //firemain push
            this.firemain.child("company").child(this.company).child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,
                                                                                                                                                                                        "contents":"재진행:"+agasiname,
                                                                                                                                                                                        "type":"reinit", 
                                                                                                                                                                                        "uploader":this.nickname, 
                                                                                                                                                                                        "name":"system"})
          
          }

        }//if :)
      }//for loop :)

      console.log("loop finish in reinit")
      // this.refreshChoice2();
      console.log("refreshchoice2 fin");
      console.log("end fin");

      setTimeout(()=>{
        this.refreshChoice2();
        this.util.dismissLoading();
      },500)

    });//this.firemain.child("users").child(c.name).once("value",snapp=>{ :)
          

  }// reinit :)

  onTouchStart(event: TouchEvent) {
    // Get the starting X position
    console.log("onTouchStartonTouchStartonTouchStart");
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isDragging = false;
    this.swipeDirection = 'none';
  }

  onTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      // Calculate the horizontal and vertical movement distances
      const deltaX = event.touches[0].clientX - this.startX;
      const deltaY = event.touches[0].clientY - this.startY;

      if (deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        // User is swiping to the right
        if (this.swipeDirection !== 'right') {
          this.swipeDirection = 'right';
          console.log('Swipe direction changed to right');
        }
        console.log('Swipe to the right detected');
        // Add your desired logic here
      } else if (deltaX < 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        // User is swiping to the left
        if (this.swipeDirection !== 'left') {
          this.swipeDirection = 'left';
          console.log('Swipe direction changed to left');
        }
        console.log('Swipe to the left detected');
        // Add your desired logic here
      }
    } else {
      // Check if the user has started dragging to the right
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (deltaX > 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        this.isDragging = true;
        this.swipeDirection = 'right';
        console.log('Started dragging to the right');
        this.view.dismiss();
        // Add any initial logic when the user starts dragging to the right
      } else if (deltaX < 0 && Math.abs(deltaY) < Math.abs(deltaX)) {
        this.isDragging = true;
        this.swipeDirection = 'left';
        console.log('Started dragging to the left');

        // this.navCtrl.push(InfoPage)
        // Add any initial logic when the user starts dragging to the left
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    if (this.isDragging) {
      console.log('Touch and drag ended');
      // Add any final logic when the user stops dragging to the right
    }
    this.isDragging = false;
  }

  /**
   * 종료
   * @param c 
   * @param room 
   * @param mainlist 
   * @param f 
   */
  end(c,room,mainlist, f){

    console.log("-------------------------end-------------------------");
    console.log("------------------------- param -------------------------");
    console.log(c);//a.agasi
    console.log(room);//a.name
    console.log(mainlist);//a
    console.log(f);//1
    console.log("------------------------- param :) -------------------------");

    console.log(this.mainlist_finished_clone);

    this.util.presentLoading();
    var date = new Date();
    
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var selectedid ="";
    var totalmoney=0;
    var bantee=0;
    var tctotal=0;
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    var alreadyexist=false;

    console.log("c name : "+c.name);

    //걍팅인지
    if(this.isPassedStandardWorkingTimeSec(c.date)){
      console.log(c.name+'-->지급기준을 통과하였습니다');
    }else{
      
      console.log(c.name+'-->걍팅입니다');

      var angel = false;

      if(c.angel!=undefined){
        console.log("한명일때");
        angel=c.angel; 
      }else{
        console.log("여러명중 한명이 남았을때");
      }
      
      this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(c.name).child("attend").update({"flag":"standby"});

      this.firemain.child("users").child(c.name).child("current").remove();

      //firemain push
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":tctotal,
                                                                                                                                                              "bantee":bantee,
                                                                                                                                                              "totalmoney":totalmoney, 
                                                                                                                                                              "date":endtime,
                                                                                                                                                              "contents":"종료 ",
                                                                                                                                                              "type":"fin", 
                                                                                                                                                              "uploader":this.nickname,
                                                                                                                                                              "agasi":c.name, 
                                                                                                                                                              "name":"system"});

      
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(c.num).remove();
      this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(c.num).remove();
      this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(c.num).remove();

      this.util.dismissLoading();
      this.refreshChoice2();

      return;
    }

    this.firemain.child("users").child(c.name).once("value",snap=>{

      console.log(snap.val());

      if(snap.val()==null){
        return;
      }

      if(snap.val().type=="agasi"){

        console.log(c.name+",,,,"+snap.val().nickname);

        alreadyexist=true;

        console.log("matched one : ");
        console.log(c);
        console.log(snap.val());

        selectedid=snap.val().id;
        var selectedjopan=snap.val().jopan;

        console.log(selectedid);
        console.log("mmmm")
        console.log(mainlist.agasi);
        console.log(this.mainlist_finished_origin);

        if(f==2){
          mainlist = this.mainlist_finished_origin;
        }else if(f==1){
          
          console.log(this.mainlist_origin);

          mainlist = this.mainlist_origin;
        }
        
        console.log("mainlist:");
        console.log(mainlist);

        for(var d in mainlist.agasi){

          if(mainlist.agasi[d].name==c.name){

            var num = mainlist.agasi[d].num;
            console.log("d is...at first : "+num);
            console.log("calculating..."+c.name);
            //chasam
            totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
            
            tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
            bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
            var jjing=Math.round(tctotal);

            console.log("jjing : "+jjing);

            if(Math.round(tctotal)>=1){

              console.log(snap.val());
              console.log(selectedjopan)
              console.log(c);
              //firemain push
              this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"wantee",
                                                                                                                                            "values":jjing,
                                                                                                                                            "key":mainlist.key, 
                                                                                                                                            "agasi":mainlist.agasi[d].name,
                                                                                                                                            "room":mainlist.name, 
                                                                                                                                            "jopan":selectedjopan, 
                                                                                                                                            "date":mainlist.agasi[d].date,
                                                                                                                                            "incharge":mainlist.incharge, 
                                                                                                                                            "end_date_full":dte,
                                                                                                                                            "tc":tctotal,
                                                                                                                                            "money":totalmoney,
                                                                                                                                            "wt":mainlist.wt})
            }
            if(bantee>=1){
              //firemain push
              this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"bantee", 
                                                                                                                                            "values":bantee,
                                                                                                                                            "key":mainlist.key,
                                                                                                                                            "room":mainlist.name,  
                                                                                                                                            "agasi":mainlist.agasi[d].name, 
                                                                                                                                            "jopan":selectedjopan,
                                                                                                                                            "date":mainlist.agasi[d].date,
                                                                                                                                            "incharge":mainlist.incharge, 
                                                                                                                                            "end_date_full":dte,
                                                                                                                                            "tc":tctotal,
                                                                                                                                            "money":totalmoney,
                                                                                                                                            "wt":mainlist.wt})
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

              this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
              this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})

            }else{

                console.log("no order detected...");

                this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt})
            }

            console.log("selectedid : "+selectedid);

            this.firemain.child("users").child(selectedid).child("current").remove();
            var angel = false;

            if(mainlist.agasi[d].angel!=undefined){
              angel=mainlist.agasi[d].angel;
            }

            console.log(room);
            console.log(mainlist.key);
            console.log(num);
           
            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(num).update({"roomno":room,
                                                                                                                                                                              "incharge":mainlist.incharge,
                                                                                                                                                                              "angel":angel, 
                                                                                                                                                                              "findate":year+"-"+month+"-"+day +" "+hour+":"+min,
                                                                                                                                                                              "tc":tctotal,
                                                                                                                                                                              "bantee":bantee, 
                                                                                                                                                                              "money":totalmoney,
                                                                                                                                                                              "wt":mainlist.wt,
                                                                                                                                                                              "lastupdatedperson":this.nickname, 
                                                                                                                                                                              "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});
            
            this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num).update({"roomno":room,
                                                                                                                                                                  "incharge":mainlist.incharge,
                                                                                                                                                                  "angel":angel, 
                                                                                                                                                                  "findate":year+"-"+month+"-"+day +" "+hour+":"+min,
                                                                                                                                                                  "tc":tctotal,
                                                                                                                                                                  "bantee":bantee, 
                                                                                                                                                                  "money":totalmoney,
                                                                                                                                                                  "wt":mainlist.wt,
                                                                                                                                                                  "lastupdatedperson":this.nickname, 
                                                                                                                                                                  "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});

            this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(num).update({"roomno":room,
                                                                                                                                                                        "incharge":mainlist.incharge, 
                                                                                                                                                                        "angel":angel,
                                                                                                                                                                        "findate":year+"-"+month+"-"+day +" "+hour+":"+min,
                                                                                                                                                                        "tc":tctotal,
                                                                                                                                                                        "bantee":bantee, 
                                                                                                                                                                        "money":totalmoney,
                                                                                                                                                                        "wt":mainlist.wt,
                                                                                                                                                                        "lastupdatedperson":this.nickname, 
                                                                                                                                                                        "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});

          }//if :)
        }//for(var d in mainlist.agasi){ :)

        console.log(snap.val().agasi)

        this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(c.name).child("attend").update({"flag":"standby"});
        //firemain push
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":tctotal,
                                                                                                                                                                "bantee":bantee,
                                                                                                                                                                "totalmoney":totalmoney, 
                                                                                                                                                                "date":endtime,
                                                                                                                                                                "contents":"종료 ",
                                                                                                                                                                "type":"fin", 
                                                                                                                                                                "uploader":this.nickname,
                                                                                                                                                                "agasi":c.name, 
                                                                                                                                                                "name":"system"})
     
        console.log("501!!!")
        console.log("loop finisehd");
  
      }//if(snap.val().type=="agasi"){ :)

      if(!alreadyexist){
        console.log("새로 등록된 아이임.")
      }
      if(f==2){

        console.log(this.company+','+room+'",,"'+this.currentstartday+'",'+mainlist.key)

        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true})
      }

      console.log("end fin before");

      setTimeout(()=>{
        this.util.dismissLoading();
        this.refreshChoice2();
      },800)

    });//this.firemain.child("users").child(c.name).once("value",snap=>{ :)

  }// end :)  

  /**
   * 페이지 로드될때 실행되는 func.
   */
  refreshChoice2(){

    console.log("refreshChoice2 ->");
    console.log(this.company);
    console.log(this.a);

    this.mainlist=[];
    this.mainlist_angel=[];
    this.mainlist_finished=[];
    this.mainlist_finished_status=[];
    var agasi = [];

    console.log(this.a.agasi);

    var sortedArray = [];
    sortedArray = this.a.agasi;

    console.log(this.company+">"+"madelist"+">"+this.currentstartday+">"+this.a.name+">"+this.a.key);

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).once("value", (snap)=>{

      console.log("get list");
      console.log(snap.val());

      console.log(snap.val().name);

      var agasiarray = snap.val().agasi;

      console.log(agasiarray);
      
      console.log(snap.val().logic);
      console.log(snap.val());

      var inagasi = 0;
      var totalagasi=0;

      if(snap.val().agasi!=undefined){

        var count=0;

        for(var c in snap.val().agasi){
          count++;
          totalagasi++;

          console.log(snap.val().agasi[c]);

          if(snap.val().agasi[c].angel){
            this.angelcount++;
          }
          if(snap.val().agasi[c].findate!=undefined){
            //종료됨. 
          }else{
            inagasi++;
            //종료 안됨. 들어가있는 상황 . 
          }
        }
      }else{
        //agasi가 없는 경우.
      }

      this.inagasi=inagasi;
      this.numofpeople = snap.val().numofpeople;

      console.log("inagasi is "+inagasi);

      var memo = "";
      memo = snap.val().memo;
          
      console.log(snap.val().name);
      console.log("memo....: "+memo);
      console.log(memo);

      var messages=[];
      for(var dd in snap.val().message){
        messages.push(snap.val().message[dd]);
      }
      console.log(messages);

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

      console.log(snap.val().name);
      console.log(snap.val());

      var findate = "";
      
      if(snap.val().findate!=undefined){
        findate = snap.val().findate;
      }

      console.log("findate is "+findate);
      console.log(snap.val().ss);

      if(snap.val().ss){

        console.log("snap.val().ss is true");

        if(snap.val().status=="fin"){

          this.mainlist_finished_status.push({"agasi":agasiarray,
                                              "date":snap.val().date,
                                              "incharge":snap.val().incharge,
                                              "insert_date":snap.val().insert_date,
                                              "insert_date_full":snap.val().insert_date_full,
                                              "key":snap.val().key,
                                              "message":messages,
                                              "memo":memo,
                                              "angel":snap.val().angel,
                                              "name":snap.val().name,
                                              "numofpeople":snap.val().numofpeople,
                                              "status":snap.val().status,
                                              "wt":snap.val().wt,
                                              "numofagasi":inagasi,
                                              "lack":snap.val().numofpeople-inagasi});
        
        }else if(snap.val().angel==true){

          this.mainlist_angel.push({"agasi":agasiarray,
                                    "date":snap.val().date,
                                    "incharge":snap.val().incharge,
                                    "insert_date":snap.val().insert_date,
                                    "insert_date_full":snap.val().insert_date_full,
                                    "key":snap.val().key,
                                    "message":messages,
                                    "memo":memo,
                                    "angel":snap.val().angel,
                                    "name":snap.val().name,
                                    "numofpeople":snap.val().numofpeople,
                                    "status":snap.val().status,
                                    "wt":snap.val().wt,
                                    "numofagasi":inagasi,
                                    "lack":snap.val().numofpeople-inagasi});

          this.mainlist_finished.push({"agasi":agasiarray,
                                        "date":snap.val().date,
                                        "incharge":snap.val().incharge,
                                        "insert_date":snap.val().insert_date,
                                        "insert_date_full":snap.val().insert_date_full,
                                        "key":snap.val().key,
                                        "name":snap.val().name,
                                        "message":messages,
                                        "memo":memo,
                                        "angel":snap.val().angel,
                                        "numofpeople":snap.val().numofpeople,
                                        "status":snap.val().status,
                                        "wt":snap.val().wt,
                                        "directorId":snap.val().directorId,
                                        "numofagasi":inagasi,
                                        "lack":snap.val().numofpeople-inagasi});

        }else{

          console.log("agasiarray::::");
          console.log(agasiarray);

          //초이스 ㅅㅅ 방에다가 날개가아니고 완료도 아닌 경우.
          this.mainlist_finished.push({"agasi":agasiarray,
                                        "date":snap.val().date,
                                        "incharge":snap.val().incharge,
                                        "insert_date":snap.val().insert_date,
                                        "insert_date_full":snap.val().insert_date_full,
                                        "key":snap.val().key,
                                        "name":snap.val().name,
                                        "message":messages,
                                        "memo":memo,
                                        "angel":snap.val().angel,
                                        "numofpeople":snap.val().numofpeople,
                                        "status":snap.val().status,
                                        "wt":snap.val().wt,
                                        "directorId":snap.val().directorId,
                                        "numofagasi":inagasi,
                                        "lack":snap.val().numofpeople-inagasi});
                
        }//if else-if else :)

      }else{
                  
          console.log(" 초이스 ㅅㅅ  undefined else...flag ");

          var orderlist="";
          if(snap.val().orderlist==undefined){
            orderlist="no"
          }else{
            orderlist=snap.val().orderlist;
          }
                
          console.log(snap.val().numofpeople);
          console.log(inagasi);
          console.log(totalagasi);

          if(snap.val().status=="fin"){

            console.log("is fin..");

            this.mainlist_finished_status.push({"agasi":agasiarray,
                                                "date":snap.val().date,
                                                "incharge":snap.val().incharge,
                                                "insert_date":snap.val().insert_date,
                                                "insert_date_full":snap.val().insert_date_full,
                                                "directorId":snap.val().directorId,
                                                "key":snap.val().key,
                                                "message":messages,
                                                "memo":memo,
                                                "angel":snap.val().angel,
                                                "name":snap.val().name,
                                                "numofpeople":snap.val().numofpeople,
                                                "status":snap.val().status,
                                                "wt":snap.val().wt,
                                                "numofagasi":inagasi,
                                                "lack":snap.val().numofpeople-inagasi});
            
          }else if(snap.val().angel==true){

            this.mainlist_angel.push({"agasi":agasiarray,
                                      "date":snap.val().date,
                                      "incharge":snap.val().incharge,
                                      "insert_date":snap.val().insert_date,
                                      "insert_date_full":snap.val().insert_date_full,
                                      "key":snap.val().key,
                                      "message":messages,
                                      "memo":memo,
                                      "angel":snap.val().angel,
                                      "name":snap.val().name,
                                      "numofpeople":snap.val().numofpeople,
                                      "status":snap.val().status,
                                      "wt":snap.val().wt,
                                      "numofagasi":inagasi,
                                      "lack":snap.val().numofpeople-inagasi});
                
            if(snap.val().ss==false||snap.val().ss==undefined){

              console.log("not fin not angle");
              console.log(snap.val().numofpeople+",,,"+inagasi);
              
              if(snap.val().numofpeople<=inagasi){
                this.mainlist_finished.push({"agasi":agasiarray,
                                              "date":snap.val().date,
                                              "incharge":snap.val().incharge,
                                              "insert_date":snap.val().insert_date,
                                              "insert_date_full":snap.val().insert_date_full,
                                              "directorId":snap.val().directorId,
                                              "key":snap.val().key,
                                              "message":messages,
                                              "memo":memo,
                                              "angel":snap.val().angel,
                                              "name":snap.val().name,
                                              "numofpeople":snap.val().numofpeople,
                                              "status":snap.val().status,
                                              "wt":snap.val().wt,
                                              "numofagasi":inagasi,
                                              "lack":snap.val().numofpeople-inagasi});
              }else{
                    
                console.log(agasiarray);

                this.mainlist.push({"agasi":agasiarray,
                                    "date":snap.val().date,
                                    "incharge":snap.val().incharge,
                                    "insert_date":snap.val().insert_date,
                                    "insert_date_full":snap.val().insert_date_full,
                                    "directorId":snap.val().directorId,
                                    "key":snap.val().key,
                                    "message":messages,
                                    "memo":memo,
                                    "angel":snap.val().angel,
                                    "name":snap.val().name,
                                    "numofpeople":snap.val().numofpeople,
                                    "status":snap.val().status,
                                    "wt":snap.val().wt,
                                    "numofagasi":inagasi,
                                    "lack":snap.val().numofpeople-inagasi});
              }

            }// if :)


      
          }else if(snap.val().ss==false){

              console.log("not fin not angle");
              console.log(snap.val().numofpeople+",,,"+inagasi);

              if(snap.val().numofpeople<=inagasi){

                this.mainlist_finished.push({"agasi":agasiarray,
                                            "date":snap.val().date,
                                            "incharge":snap.val().incharge,
                                            "insert_date":snap.val().insert_date,
                                            "insert_date_full":snap.val().insert_date_full,
                                            "directorId":snap.val().directorId,
                                            "key":snap.val().key,
                                            "message":messages,
                                            "memo":memo,
                                            "angel":snap.val().angel,
                                            "name":snap.val().name,
                                            "numofpeople":snap.val().numofpeople,
                                            "status":snap.val().status,
                                            "wt":snap.val().wt,
                                            "numofagasi":inagasi,
                                            "lack":snap.val().numofpeople-inagasi});
              }else{

                console.log(agasiarray);

                this.mainlist.push({"agasi":agasiarray,
                                    "date":snap.val().date,
                                    "incharge":snap.val().incharge,
                                    "insert_date":snap.val().insert_date,
                                    "insert_date_full":snap.val().insert_date_full,
                                    "directorId":snap.val().directorId,
                                    "key":snap.val().key,
                                    "message":messages,
                                    "memo":memo,
                                    "angel":snap.val().angel,
                                    "name":snap.val().name,
                                    "numofpeople":snap.val().numofpeople,
                                    "status":snap.val().status,
                                    "wt":snap.val().wt,
                                    "numofagasi":inagasi,
                                    "lack":snap.val().numofpeople-inagasi});
              }

          }else if(snap.val().ss==undefined){

              if(snap.val().numofpeople<=inagasi){

                this.mainlist_finished.push({"agasi":agasiarray,
                                            "date":snap.val().date,
                                            "incharge":snap.val().incharge,
                                            "insert_date":snap.val().insert_date,
                                            "insert_date_full":snap.val().insert_date_full,
                                            "directorId":snap.val().directorId,
                                            "key":snap.val().key,
                                            "message":messages,
                                            "memo":memo,
                                            "angel":snap.val().angel,
                                            "name":snap.val().name,
                                            "numofpeople":snap.val().numofpeople,
                                            "status":snap.val().status,
                                            "wt":snap.val().wt,
                                            "numofagasi":inagasi,
                                            "lack":snap.val().numofpeople-inagasi});
              }else{
                console.log(agasiarray);
                this.mainlist.push({"agasi":agasiarray,
                                    "date":snap.val().date,
                                    "incharge":snap.val().incharge,
                                    "insert_date":snap.val().insert_date,
                                    "insert_date_full":snap.val().insert_date_full,
                                    "directorId":snap.val().directorId,
                                    "key":snap.val().key,
                                    "message":messages,
                                    "memo":memo,
                                    "angel":snap.val().angel,
                                    "name":snap.val().name,
                                    "numofpeople":snap.val().numofpeople,
                                    "status":snap.val().status,
                                    "wt":snap.val().wt,
                                    "numofagasi":inagasi,
                                    "lack":snap.val().numofpeople-inagasi});
              }

          }else if(snap.val().numofpeople<=inagasi){

              console.log("snap.val()[a][b].numofpeople<=totalagasi");
              this.mainlist_finished.push({"agasi":agasiarray,
                                          "date":snap.val().date,
                                          "incharge":snap.val().incharge,
                                          "insert_date":snap.val().insert_date,
                                          "insert_date_full":snap.val().insert_date_full,
                                          "directorId":snap.val().directorId,
                                          "key":snap.val().key,
                                          "message":messages,
                                          "memo":memo,
                                          "angel":snap.val().angel,
                                          "name":snap.val().name,
                                          "numofpeople":snap.val().numofpeople,
                                          "status":snap.val().status,
                                          "wt":snap.val().wt,
                                          "numofagasi":inagasi,
                                          "lack":snap.val().numofpeople-inagasi});
          }else{

              console.log("is else...");
              this.mainlist.push({"agasi":agasiarray,
                                  "date":snap.val().date,
                                  "incharge":snap.val().incharge,
                                  "insert_date":snap.val().insert_date,
                                  "insert_date_full":snap.val().insert_date_full,
                                  "directorId":snap.val().directorId,
                                  "key":snap.val().key,
                                  "message":messages,
                                  "memo":memo,
                                  "angel":snap.val().angel,
                                  "name":snap.val().name,
                                  "numofpeople":snap.val().numofpeople,
                                  "status":snap.val().status,
                                  "wt":snap.val().wt,
                                  "numofagasi":inagasi,
                                  "lack":snap.val().numofpeople-inagasi});
          } 
                  
          console.log("ss false end");

      }//if(snap.val().ss){ :)

      console.log("ttttthis.mainlist_finished");
      console.log(agasiarray);
      console.log(this.mainlist);
      console.log(this.mainlist_finished);
      console.log(this.mainlist_finished_status);

      console.log("this.mainlist_finished_origin");
      console.log(this.mainlist_finished_origin);

      var count=-1;
      var newarray=[];

      if(this.mainlist[0]!=undefined){

        this.mainlist_origin = this.mainlist[0];
        
        console.log(this.mainlist[0].agasi);
        
        for(var a in agasiarray){
          count++;
          agasiarray[a].num = count;
          newarray.push(agasiarray[a]);
          console.log(a);
          console.log(agasiarray[a])
        }

        console.log("newarray");
        console.log(newarray);
        //   this.mainlist[0].agasi=(newarray);
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[0].name).child(this.mainlist[0].key).child("agasi").remove();
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist[0].name).child(this.mainlist[0].key).child("agasi").update(newarray);

      }

      var count=-1;
      var newarray=[];
      // console.log("before sorted: ");
      if(this.mainlist_finished[0]!=undefined){

        this.mainlist_finished_origin = this.mainlist_finished[0];
        //   console.log(this.mainlist_finished[0].agasi);
        for(var a in agasiarray){

          count++;

          console.log("pull this and add :"+a);
          console.log(agasiarray[a])

          agasiarray[a].num = count;
          newarray.push(agasiarray[a]);
        }

        console.log("newarray : ");
        console.log(newarray);

        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished[0].name).child(this.mainlist_finished[0].key).child("agasi").remove();
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.mainlist_finished[0].name).child(this.mainlist_finished[0].key).child("agasi").update(newarray);
      }



      var count=-1;
      var newarray=[];

      console.log(this.mainlist_finished_status);
      console.log(this.mainlist_finished_status[0]);

      if(this.mainlist_finished_status[0]!=undefined){

        console.log(this.mainlist_finished_status[0].agasi);

        for(var a in this.mainlist_finished_status[0].agasi){
          count++;
          
          newarray.push(this.mainlist_finished_status[0].agasi[a]);

          console.log(a);
          console.log(this.mainlist_finished_status[0].agasi[a])
        }

        console.log("newarray::::");
        console.log(newarray);

      }//if :)

      console.log(this.mainlist);
      console.log(this.mainlist_finished);
      //여기부터 아가씨 순서가이상. 
      this.mainlist_finished_clone=this.mainlist_finished[0];

      console.log(this.mainlist_finished_clone);
      console.log("before sort.....");
      console.log(this.mainlist_finished[0]);

      if(this.mainlist_finished[0]!=undefined){

        if(this.mainlist_finished[0].agasi!=undefined){

          this.mainlist_finished[0].agasi.sort(function(a, b) {
            //if each's findate is undefined, it should be at the bottom of array 
            if(a.findate==undefined){
              return -1;
            }
            if(b.findate==undefined){
              return -1;
            }
            //if each's findate is defined, it should be sorted by findate
            if(a.findate!=undefined&&b.findate!=undefined){
              return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
            }
      
          })

          const sortedArray = this.mainlist_finished[0].agasi.sort((a, b) => {
            if (a.findate && !b.findate) {
              return 1; // a has findate, b does not, so a should be placed after b
            }
            if (!a.findate && b.findate) {
              return -1; // b has findate, a does not, so b should be placed after a
            }
            return a.num - b.num; // compare num when findate is either defined or undefined
          }).filter(obj => !obj.findate); // Filter out objects with findate defined

          console.log(sortedArray);
        }
      }//if :)

      console.log(this.mainlist_finished_clone);
      console.log("after sort.....");
      console.log(this.mainlist_finished[0]);

      console.log(this.mainlist);


      if(this.mainlist[0]!=undefined){

        if(this.mainlist[0].agasi!=undefined){

          this.mainlist[0].agasi.sort(function(a, b) {
            //if each's findate is undefined, it should be at the bottom of array 
            if(a.findate==undefined){
              return -1;
            }
            if(b.findate==undefined){
              return -1;
            }
            //if each's findate is defined, it should be sorted by findate
            if(a.findate!=undefined&&b.findate!=undefined){
              return a.findate<b.findate ? -1 : a.findate>b.findate ? 1 : 0;
            }
        
          })

          const sortedArray = this.mainlist[0].agasi.sort((a, b) => {
            if (a.findate && !b.findate) {
              return 1; // a has findate, b does not, so a should be placed after b
            }
            if (!a.findate && b.findate) {
              return -1; // b has findate, a does not, so b should be placed after a
            }
            return a.num - b.num; // compare num when findate is either defined or undefined
          }).filter(obj => !obj.findate); // Filter out objects with findate defined

          console.log(sortedArray);
        }

      }//if :)

      console.log("############# log #################");
      console.log(this.mainlist.agasi);
      console.log(this.mainlist_finished_status);
      console.log("refresh didloaded")

      this.refresheverymin();

    });//this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).once("value", (snap)=>{ :)
  
  }//refreshChoice2 :)

  abcd(aa){
    //main.lastupdated.split(" ")[1]
    const timeString = aa.trim();
    var hours = timeString.split(' ')[1].split(":")[0];
    var minutes = timeString.split(' ')[1].split(":")[1];
    // const meridiem = Number(hours) < 12 ? '' : '';
    // const hours12 = ((Number(hours) + 11) % 12 + 1);
    const formattedTime = ` ${hours}:${minutes}`;
    return formattedTime;
  }
  async getIdOfagaci (d,name,room,key,wt,incharge,mainlist){

    console.log("getIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagacigetIdOfagaci")
    console.log(d);
    console.log(name);
    console.log(room);
    console.log(key);
    console.log(wt);
    console.log(incharge)
    console.log(mainlist);

    var selectedid ="";

    var alreadyexist=false;

    var totalmoney =0;
    var tctotal = 0;
    var bantee = 0;
    var date = new Date();

    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

    await this.firemain.child("users").child(name).once("value",snap=>{

      console.log(snap.val());
      console.log(snap.val().name);

      if(snap.val()==null){
        return;
      }
      if(snap.val().type=="agasi"){

        console.log(name+",,,,"+snap.val().nickname);

        alreadyexist=true;

        console.log("matched one : ");
        console.log(snap.val());

        selectedid=snap.val().id;
        var selectedjopan=snap.val().jopan;

        console.log(selectedid);
        console.log("mmmm")
            
        for(var d in mainlist.agasi){
          
          console.log(mainlist.agasi[d]);
          console.log("looping...");

          if(mainlist.agasi[d].name==name){

            this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(name).child("attend").update({"flag":"standby"})

            console.log("d start is...."+d);
            console.log(mainlist.agasi[d].name);
            //chasam
            totalmoney=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[0]);
            
            tctotal=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[1]);
            bantee=Number(this.util.getTC(mainlist.agasi[d],mainlist.agasi[d].pausetime).split(",")[2]);
            var jjing=Math.round(tctotal);

            console.log("jjing : "+jjing);

            if(Math.round(tctotal)>=1){

              console.log(snap.val());
              console.log(selectedjopan)
              //firemain push
              this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"wantee",
                                                                                                                                            "values":jjing,
                                                                                                                                            "key":mainlist.key,
                                                                                                                                            "agasi":mainlist.agasi[d].name,
                                                                                                                                            "room":mainlist.name, 
                                                                                                                                            "jopan":selectedjopan, 
                                                                                                                                            "date":mainlist.agasi[d].date,
                                                                                                                                            "incharge":mainlist.incharge, 
                                                                                                                                            "end_date_full":dte,
                                                                                                                                            "tc":tctotal,
                                                                                                                                            "money":totalmoney,
                                                                                                                                            "wt":mainlist.wt})
            }
            if(bantee>=1){
              //firemain push
              this.firemain.child("company").child(this.company).child("jopanjjing").child(selectedjopan).child(this.currentstartday).push({"type":"bantee", 
                                                                                                                                            "values":bantee,
                                                                                                                                            "key":mainlist.key,
                                                                                                                                            "room":mainlist.name,  
                                                                                                                                            "agasi":mainlist.agasi[d].name, 
                                                                                                                                            "jopan":selectedjopan, 
                                                                                                                                            "date":mainlist.agasi[d].date,
                                                                                                                                            "incharge":mainlist.incharge,
                                                                                                                                            "end_date_full":dte,
                                                                                                                                            "tc":tctotal,
                                                                                                                                            "money":totalmoney,
                                                                                                                                            "wt":mainlist.wt})
            }
            
            //아래에 연티가 들어가야함. 연티는 룸히스토리에 들어가야함.
            // if(mainlist.numofpeople>=5){

            // }else{
            console.log(mainlist.orderlist);

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

              this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+"","yeonti":yeonti,"yeonti_reason":yeonti_reason})
              this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt,"yeonti":yeonti,"yeonti_reason":yeonti_reason})

            }else{

              this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
              this.firemain.child("users").child(selectedid).child("roomhistory").child(room).child(this.currentstartday).child(mainlist.key).update({"room":room, "name":mainlist.agasi[d].name,  "date":this.currentstartday,"incharge":mainlist.incharge, "end_date_full":dte,"tc":tctotal,"money":totalmoney,"bantee":bantee,"wt":mainlist.wt})
            }

            this.firemain.child("users").child(selectedid).child("current").remove();

            console.log("d is "+d);

            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("agasi").child(mainlist.agasi[d].num).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
            
            this.firemain.child("users").child(mainlist.wt).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(mainlist.agasi[d].num).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
            this.firemain.child("users").child(mainlist.incharge).child("roomhistory").child(this.currentstartday).child(mainlist.key).child("agasi").child(mainlist.agasi[d].num).update({"roomno":room,"incharge":mainlist.incharge, "findate":year+"-"+month+"-"+day +" "+hour+":"+min,"tc":tctotal,"bantee":bantee, "money":totalmoney,"wt":mainlist.wt,"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
            
          }//if(mainlist.agasi[d].name==name){ :)
        }//for(var d in mainlist.agasi){ :)

        console.log(snap.val().agasi);
        //firemain push
        this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"tc":tctotal,
                                                                                                                                                                "bantee":bantee,
                                                                                                                                                                "totalmoney":totalmoney, 
                                                                                                                                                                "date":endtime,
                                                                                                                                                                "contents":"종료 "+tctotal+"개",
                                                                                                                                                                "type":"fin", 
                                                                                                                                                                "uploader":this.nickname,
                                                                                                                                                                "agasi":name, 
                                                                                                                                                                "name":"system"})

        console.log("501!!!");
        console.log("loop finisehd");

      }//if(snap.val().type=="agasi"){ :

      if(!alreadyexist){
        console.log("새로 등록된 아이임.");
      }
      console.log("end fin before");
    });// await this.firemain.child("users").child(name).once("value",snap=>{ :)
  }//async getIdOfagaci (d,name,room,key,wt,incharge,mainlist){ :)

  /**
   * 방에 대한 메모
   * @param room 
   * @param mainlist 
   */
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
            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"memo":data.title});
            this.refreshChoice2();
          }
        }
      ]
    });
    prompt.present();
  }
  /**
   * 메모
   * @param c 
   * @param room 
   * @param mainlist 
   */
  memo(c,room,mainlist) {
    
    this.showPrompt(room,mainlist);

    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

  }
  /**
   * 초이스 ㅅㅅ angel : false
   * @param c 
   * @param room 
   * @param mainlist 
   */
  ss_fromangel(c,room,mainlist) {

    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true,"angel":false})
    //firemain push
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,
                                                                                                                                                            "contents":"초이스 ㅅㅅ ",
                                                                                                                                                            "type":"ss", 
                                                                                                                                                            "uploader":this.nickname, 
                                                                                                                                                            "name":"system"})
      
    this.view.dismiss();
  }
  /**
   * 초이스 ㅅㅅ 
   * @param c 
   * @param room 
   * @param mainlist 
   */
  ss(c,room,mainlist) {

    console.log("ss come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":true})
    //firemain push
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,
                                                                                                                                                            "contents":"초이스 ㅅㅅ ",
                                                                                                                                                            "type":"ss", 
                                                                                                                                                            "uploader":this.nickname, 
                                                                                                                                                            "name":"system"})
      
    this.view.dismiss();
  }

  /**
   * 초이스 탭으로 이동시키기.
   * @param c 
   * @param room 
   * @param mainlist 
   */
  ss2(c,room,mainlist) {

    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();

    console.log("재초 넘어가서 초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"ss":false})
    //firemain push
    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).child("message").push({"date":endtime,
                                                                                                                                                            "contents":"재초이스",
                                                                                                                                                            "type":"ss", 
                                                                                                                                                            "uploader":this.nickname, 
                                                                                                                                                            "name":"system"})
     
    this.view.dismiss();
  }
  /**
   * 날개방으로 이동시키기.
   * @param c 
   * @param room 
   * @param mainlist 
   */
  ss3(c,room,mainlist) {

    console.log(" 날개초이스로변경");
    console.log(c);
    console.log(room);
    console.log(mainlist);

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(mainlist.key).update({"angel":true})

    this.view.dismiss();
  }
  /**
   * modify0
   * @param c 
   */
  modify0(c) {

    this.modifyflag=true;

    console.log("modify0modify0modify0modify0 come")
    console.log(c);
    console.log(this.mainlist);

    this.tempmainlist=this.mainlist[0];
    this.originalagasilist = this.mainlist[0].agasi;

    console.log("tempmainlist : ");
    console.log(this.tempmainlist);
  }
  /**
   * modifycancel0
   * @param c 
   * @param room 
   * @param mainlist 
   * @param aga 
   */
  modifycancel0(c,room,mainlist,aga) {

    console.log(aga);

    var falseflag=false;
    this.modifyflag=!this.modifyflag;

    console.log("modifycancel0modifycancel0modifycancel0 come")
    console.log(c.agasi);
    console.log(room);
    console.log(mainlist);

  }
  /**
   * modifyfin0
   * @param c 
   * @param room 
   * @param mainlist 
   * @param aga 
   * @returns 
   */
  modifyfin0(c,room,mainlist,aga) {

    console.log(aga);
    console.log("modifyfin0modifyfin0modifyfin0modifyfin0modifyfin0 come")
    console.log(c.agasi);
    console.log(c);
    console.log(room);
    console.log(mainlist);

    if(aga==undefined){
      window.alert("agasi is undefined");
      return;
    }

    var falseflag=false;
    this.modifyflag=false;

    var count=-1;
    var agasi=[];
    var initial = this.mainlist[0];

    console.log(this.mainlist)
    console.log(this.mainlist[0])
    console.log(this.mainlist[0].agasi)

    var v = this.view;
    var key = this.mainlist[0].key;
    var firemain = this.firemain;
    var company = this.company;
    var day = this.currentstartday;
    var countingv=-1;
    var finnum=0;

    console.log(this.mainlist);
    console.log(this.mainlist.length);
    console.log(this.mainlist[0]);
    console.log(this.tempmainlist);
    console.log(this.mainlist[0].agasi);
    console.log(aga);

    var flag = false;

    for(var a in this.mainlist[0].agasi){

      console.log("a is "+a);

      countingv++;

      console.log(this.mainlist[0].agasi[a]);
      console.log(this.mainlist[0].agasi[a].name);
      console.log(aga[a]);
      console.log(aga[a].name+", after change : "+this.mainlist[0].agasi[a].name);
      
      for(var bb in aga){

        console.log("looping through aga");
        console.log(aga[bb].num)
        console.log(this.mainlist[0].agasi[a].num);

        if(aga[bb].num==this.mainlist[0].agasi[a].num){

          console.log("num equal so check...");
          console.log(aga[bb]);
          console.log(this.mainlist[0].agasi[a]);

          flag = this.getNameChanged(aga[bb].name, this.mainlist[0].agasi[a].name,v,c.agasi,room,key,firemain,company,day,1);

          console.log(flag);
        }
      }
      
      console.log("compare...");

      count++;
      if(this.mainlist[0].agasi[a].findate==undefined){
        finnum++;
      }
      if(this.mainlist[0].agasi[a].tc==undefined){
        break;
      }

      console.log(this.mainlist[0].agasi[a].tc)

      var newmoney = this.util.getTCfromtc(this.mainlist[0].agasi[a].tc);

      console.log(newmoney);

      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist[0].agasi[a].money = newmoney;
    }
    
  }
  /**
   * modify
   * @param c 
   * @param room 
   * @param mainlist 
   */
  modify(c,room,mainlist) {

    this.modifyflag=true;

    console.log("modify come")
    console.log(c);
    console.log(room);
    console.log(mainlist);

    this.tempmainlist=this.mainlist_finished[0];

  }
  /**
   * getNameChanged
   * @param beforechanged 
   * @param tochanged 
   * @param v 
   * @param bc 
   * @param room 
   * @param key 
   * @param firemain 
   * @param company 
   * @param day 
   * @param numflag 
   * @returns 
   */
  getNameChanged(beforechanged,tochanged,v,bc,room,key,firemain,company,day,numflag) {

    var falseflag = false;

    console.log("getNameChanged");
    console.log(beforechanged);
    console.log(tochanged);
    console.log(v);
    console.log(bc);

    var agasi = [];
    var dte = new Date();
    dte.setHours(dte.getHours()+9);

    console.log(room);
    console.log(key);

    if(beforechanged==tochanged){

      console.log("33333 same so return");

      return true;

    }else{
      
      console.log("diff so check"+tochanged)

      firemain.child("users").child(tochanged).once("value",(snapshot)=>{

        console.log(snapshot.val());

        if(snapshot.val()==null&&snapshot.val()==undefined){

          console.log("33333 new user ");

          window.alert(tochanged+"는 없는 아가씨입니다. 다시 확인해주세요.");

        }else if(snapshot.val().current!=undefined&&snapshot.val().current!=null){

          console.log("33333 user already in");

          var currentflag = snapshot.val().current;
          window.alert(tochanged+""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[0]+" "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
          console.log(bc)
   
          v.dismiss();
          return false;

        }else{

          console.log("33333 change user to new user");
          //change user to new user 
          var date = new Date();
          var hour = date.getHours();
          var min = date.getMinutes();

          console.log(beforechanged+"remove current")
          console.log(tochanged+",,"+room+",,,"+dte+",,,,"+day);

          //tochanged 를 출근처리함. 
          firemain.child("users").child(tochanged.trim()).child("attendance").child(day).update({"currentStatus":"attend"})
          firemain.child("users").child(tochanged.trim()).child("attendance").child(day).child("attend").update({"team":snapshot.val().jopan,"name":tochanged,"date":day,"flag":"attend","time":hour+":"+min})
          firemain.child("users").child(tochanged.trim()).update({"jopan":snapshot.val().jopan,"name":tochanged,type:"agasi",writer:bc[0].writer,status:false,id:tochanged,company:company})
          firemain.child("attendance").child(company).child(day).child(tochanged).child("attend").update({ "team":snapshot.val().jopan,"name":tochanged,"flag":"attend","date":day, "time":hour+":"+min})
              
          if(numflag==1){

            for(var aaa in this.mainlist[0].agasi){

              agasi.push(this.mainlist[0].agasi[aaa]);

            }
            console.log(this.mainlist[0].agasi);
            console.log("agasi fin : "+agasi);
            console.log(agasi);

            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist[0].key).update({agasi})
            this.firemain.child("users").child(this.mainlist[0].incharge).child("roomhistory").child(this.currentstartday).child(this.mainlist[0].key).update({agasi})
            this.firemain.child("users").child(this.mainlist[0].wt).child("roomhistory").child(this.currentstartday).child(this.mainlist[0].key).update({agasi})
            
          }else{

            for(var aaa in this.mainlist_finished[0].agasi){
              agasi.push(this.mainlist_finished[0].agasi[aaa]);
            }

            console.log(this.mainlist_finished[0].agasi);
            console.log("agasi fin : "+agasi);
            console.log(agasi);

            this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist_finished[0].key).update({agasi})
            this.firemain.child("users").child(this.mainlist_finished[0].incharge).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished[0].key).update({agasi})
            this.firemain.child("users").child(this.mainlist_finished[0].wt).child("roomhistory").child(this.currentstartday).child(this.mainlist_finished[0].key).update({agasi})
          }

          setTimeout(()=>{
            this.refreshChoice2();
          },1000)
            
          return true;

        }

      });//firemain.child("users").child(tochanged).once("value",(snapshot)=>{ :)
    }
    
  }//getNameChanged :)
  /**
   * modifyfin
   * @param c 
   * @param room 
   * @param mainlist 
   * @param aga 
   * @returns 
   */
  modifyfin(c,room,mainlist,aga) {

    console.log("modifyfin come")

    var falseflag=false;
    this.modifyflag=false;

    var count=-1;
    var agasi=[];
    var initial = this.mainlist_finished[0];

    console.log(this.mainlist_finished)
    console.log(this.mainlist_finished[0])
    console.log(this.mainlist_finished[0].agasi)

    var finnum=0;
    var countingv=-1;

    console.log(this.mainlist_finished_origin);
    console.log("c done");

    var v = this.view;
    var key = this.mainlist_finished[0].key;
    var firemain = this.firemain;
    var company = this.company;
    var day = this.currentstartday;

    for(var a in this.mainlist_finished[0].agasi){

      countingv++;

      for(var bb in aga){

        console.log("looping through aga");
        console.log(aga[bb].num)
        console.log(this.mainlist_finished[0].agasi[a].num);

        if(aga[bb].num==this.mainlist_finished[0].agasi[a].num){

          console.log("num equal so check...");
          console.log(aga[bb]);
          console.log(this.mainlist_finished[0].agasi[a]);

          this.getNameChanged(aga[bb].name, this.mainlist_finished[0].agasi[a].name,v,c.agasi,room,key,firemain,company,day,2);
        }
      }
     
      count++;
      if(this.mainlist_finished[0].agasi[a].findate==undefined){
        finnum++;
      }
      if(this.mainlist_finished[0].agasi[a].tc==undefined){
        break;
      }
      var newmoney = this.util.getTCfromtc(this.mainlist_finished[0].agasi[a].tc);
      if(newmoney==undefined){
        newmoney=0;
      }
      if(newmoney==1000){
        falseflag=true;
      }
      this.mainlist_finished[0].agasi[a].money = newmoney;
    }
    if(falseflag){
      window.alert("tc계산이 잘못된 값입니다.(최대 tc : 24)");
      this.view.dismiss();
      return;
    }
   
  }
  /**
   * modifycancel
   * @param c 
   * @param room 
   * @param mainlist 
   */
  modifycancel(c,room,mainlist) {
    this.modifyflag=!this.modifyflag;
  }
  /**
   * modifyfin2
   * @param c 
   * @param room 
   * @param mainlist 
   * @returns 
   */
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

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(room).child(this.mainlist_finished_status[0].key).update({agasi})

    //tc 수정 
  }
}


