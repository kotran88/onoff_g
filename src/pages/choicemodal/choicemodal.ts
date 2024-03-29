import { Component ,ViewChild,Renderer2} from '@angular/core';
import { IonicPage,ViewController,Platform,LoadingController,AlertController,ModalController, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
import { UtilsProvider } from '../../providers/utils/utils';
import { SlidetestPage } from '../slidetest/slidetest';
import { HTTP } from '@ionic-native/http/ngx';
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
  token:any="";
  @ViewChild('input')  myInput ;
  @ViewChild('input2') myInput2 ;
  @ViewChild('input3') myInput3 ;
  @ViewChild('input4') myInput4 ;
  @ViewChild('input5') myInput5 ;
  @ViewChild('input6') myInput6 ;
  @ViewChild('input7')  myInput7 ;
  @ViewChild('input8') myInput8 ;
  @ViewChild('input9') myInput9 ;
  @ViewChild('input10') myInput10 ;
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
  condition:any=false;
  condition1:any=false;
  condition2:any=false;
  newnum:any=0;
  condition3:any=false;
  condition4:any=false;
  condition5:any=false;
  condition6:any=false;
  condition7:any=false;
  condition8:any=false;
  condition9:any=false;
  condition10:any=false;
  condition11:any=false;
  condition12:any=false;
  condition13:any=false;
  condition14:any=false;
  condition15:any=false;
  condition16:any=false;
  condition17:any=false;
  condition18:any=false;
  condition19:any=false;
  condition20:any=false;
  a:any;
  firemain = firebase.database().ref();
  company:any = "";
  agasilist=[];
  newlist=[];
  originalList=[];

  checkbox:any=false;
  checkbox2:any=false;
  checkbox3:any=false;
  checkbox4:any=false;
  checkbox5:any=false;
  checkbox6:any=false;
  checkbox7:any=false;
  checkbox8:any=false;
  checkbox9:any=false;
  checkbox10:any=false;


  checkbox11:any=false;
  checkbox12:any=false;
  checkbox13:any=false;
  checkbox14:any=false;
  checkbox15:any=false;
  checkbox16:any=false;
  checkbox17:any=false;
  checkbox18:any=false;
  checkbox19:any=false;
  checkbox20:any=false;
  checkbox21:any=false;
  text:any="";
  text2:any="";
  text3:any="";
  text4:any="";
  text5:any="";
  text6:any="";
  text7:any="";
  text8:any="";
  text9:any="";

  text10:any="";
  text11:any="";
  text12:any="";
  text13:any="";
  text14:any="";
  text15:any="";
  text16:any="";
  text17:any="";
  text18:any="";
  text19:any="";
  text20:any="";
  text21:any="";

  writer:any="";
  writer2:any="";
  writer3:any="";
  writer4:any="";
  writer5:any="";
  writer6:any="";
  writer7:any="";
  writer8:any="";
  writer9:any="";

  writer10:any="";
  writer11:any="";
  writer12:any="";
  writer13:any="";
  writer14:any="";
  writer15:any="";
  writer16:any="";
  writer17:any="";
  writer18:any="";
  writer19:any="";
  writer20:any="";
  writer21:any="";
  nickname:any="";
  name:any="";
  subscribedList=[];
  currentstartday:any="";
  currentstart:any="";
  angelcount:any=0;
  numofpeople:any=0;
  inagasi:any=0;
  constructor(public http:HTTP,public platform : Platform,private modalCtrl: ModalController , public util:UtilsProvider, public alertController:AlertController,public renderer:Renderer2,public modal:ModalController,public loading:LoadingController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");
    this.name = localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.token = localStorage.getItem("token");
    this.a =  this.navParams.get("a");
    this.inagasi = this.navParams.get("inagasi");
    this.angelcount = this.navParams.get("angelcount");
    this.numofpeople = this.navParams.get("numofpeople");
    var agasi="";
    if(this.a==undefined){
    }else{
      agasi = this.a.agasi;
    }

    console.log(this.a);
    console.log(this.inagasi);
    console.log(this.angelcount);
    console.log(this.numofpeople);
    console.log("came to choice modal page");
    //메이드시, http request를 통해 룸 디테일 테이블에 넣어주기. 
    
    return;
    this.platform.registerBackButtonAction(() => { 
      const av = this.navCtrl.getActive();
      const activePage = av ? av.instance : null;
      console.log(activePage);

      this.view.dismiss();

      // if(activePage==null){
      //   console.log("slidetestpage...");
      // }else{

      // console.log("go backkkkkkkk!");
      // console.log(this.navCtrl.canGoBack());

      // this.cancel();
      // }
    });
    console.log(this.a);
    //console.log(this.a);
    //console.log("was this.a")
    //console.log("current agasi : ");
    //console.log(this.agasilist);


  }
  onKeyPressed(event){
    //console.log(event.key) ;
    //console.log(event.keyCode);
  };

  onChangeTime2(event,v){
    //console.log(v);
    //console.log(this.checkbox4);
    if(this.checkbox){
    this.condition=true;
    }else{
      this.condition=false;
    }

    if(this.checkbox2){
    this.condition1=true;
    }else{
      this.condition1=false;
    }

    if(this.checkbox3){
    this.condition2=true;
    }else{
      this.condition2=false;
    }

    if(this.checkbox4){
      this.condition3=true;
    }else{
      this.condition3=false;
    }

    if(this.checkbox5){
      this.condition4=true;
    }else{
      this.condition4=false;
    }

    if(this.checkbox6){
      this.condition5=true;
    }else{
      this.condition5=false;
    }

    if(this.checkbox7){
      this.condition6=true;
    }else{
      this.condition6=false;
    }

    if(this.checkbox8){
      this.condition7=true;
    }else{
      this.condition7=false;
    }
    if(this.checkbox9){
      this.condition8=true;
    }else{
      this.condition8=false;
    }
    if(this.checkbox10){
      this.condition9=true;
    }else{
      this.condition9=false;
    }

    if(this.checkbox11){
      this.condition10=true;
    }else{
      this.condition10=false;
    }
                
    if(this.checkbox12){
      this.condition11=true;
    }else{
      this.condition11=false;
    }
                
    if(this.checkbox13){
      this.condition12=true;
    }else{
      this.condition12=false;
    }
                
    if(this.checkbox14){
      this.condition13=true;
    }else{
      this.condition13=false;
    }

    if(this.checkbox15){
      this.condition14=true;
    }else{
      this.condition14=false;
    }

    if(this.checkbox16){
      this.condition15=true;
    }else{
      this.condition15=false;
    }

    if(this.checkbox17){
      this.condition16=true;
    }else{
      this.condition16=false;
    }

    if(this.checkbox18){
      this.condition17=true;
    }else{
      this.condition17=false;
    }

    if(this.checkbox19){
      this.condition18=true;
    }else{
      this.condition18=false;
    }

    if(this.checkbox20){
      this.condition19=true;
    }else{
      this.condition19=false;
    }

    if(this.checkbox21){
    this.condition20=true;
    }else{
      this.condition20=false;
    }

  }
  onChangeTime(event,v){
    //console.log(event.value);
    //console.log(event.value.length);
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
      if(v==6){
      this.myInput7.setFocus();
      }
      if(v==7){
        this.myInput8.setFocus();
       }
      if(v==8){
        this.myInput9.setFocus();
      }
      if(v==9){
        this.myInput10.setFocus();
      }

    }
    
  }
  cancel(){
    this.view.dismiss({"result":false});
  }
  /**
   * 아가씨 추가 confirm 
   * input 체크후 regagasi() 호출
   * @returns 
   */
  confirm(){

    this.util.presentLoading();

    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    console.log(year+"-"+month+"-"+day+" "+hour+":"+min);

    var numofcount=0;

    if(this.writer.length==0){
      this.writer=this.nickname;
    }
    if(this.writer2.length==0){
      this.writer2=this.nickname;
    }
    if(this.writer3.length==0){
      this.writer3=this.nickname;
    }
    if(this.writer4.length==0){
      this.writer4=this.nickname;
    }
    if(this.writer5.length==0){
      this.writer5=this.nickname;
    }
    if(this.writer6.length==0){
      this.writer6=this.nickname;
    }
    if(this.writer7.length==0){
      this.writer7=this.nickname;
    }
    if(this.writer8.length==0){
      this.writer8=this.nickname;
    }
    if(this.writer9.length==0){
      this.writer9=this.nickname;
    }
    if(this.writer10.length==0){
      this.writer10=this.nickname;
    }
    if(this.writer11.length==0){
      this.writer11=this.nickname;
    }
    if(this.writer12.length==0){
      this.writer12=this.nickname;
    }
    if(this.writer13.length==0){
      this.writer13=this.nickname;
    }
    if(this.writer14.length==0){
      this.writer14=this.nickname;
    }
    if(this.writer15.length==0){
      this.writer15=this.nickname;
    }
    if(this.writer16.length==0){
      this.writer16=this.nickname;
    }
    if(this.writer17.length==0){
      this.writer17=this.nickname;
    }
    if(this.writer18.length==0){
      this.writer18=this.nickname;
    }
    if(this.writer19.length==0){
      this.writer19=this.nickname;
    }
    if(this.writer20.length==0){
      this.writer20=this.nickname;
    }

    this.agasilist=[];

    if(this.text.length>=2){
    	this.agasilist.push({"name":this.text.trim(),"writer":this.writer,"angel":this.checkbox, "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
    	this.agasilist.push({"name":this.text2.trim(),"writer":this.writer2,"angel":this.checkbox2, "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text3.length>=2){
    	this.agasilist.push({"name":this.text3.trim(),"writer":this.writer3,"angel":this.checkbox3, "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text4.length>=2){
    	this.agasilist.push({"name":this.text4.trim(),"writer":this.writer4,"angel":this.checkbox4, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text5.length>=2){
    	this.agasilist.push({"name":this.text5.trim(),"writer":this.writer5,"angel":this.checkbox5, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text6.length>=2){
    	this.agasilist.push({"name":this.text6.trim(),"writer":this.writer6,"angel":this.checkbox6, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text7.length>=2){
      this.agasilist.push({"name":this.text7.trim(),"writer":this.writer7,"angel":this.checkbox7, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text8.length>=2){
      this.agasilist.push({"name":this.text8.trim(),"writer":this.writer8,"angel":this.checkbox8, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text9.length>=2){
     this.agasilist.push({"name":this.text9.trim(), "writer":this.writer9,"angel":this.checkbox9, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text10.length>=2){
      this.agasilist.push({"name":this.text10.trim(), "writer":this.writer10,"angel":this.checkbox10, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text11.length>=2){
      this.agasilist.push({"name":this.text11.trim(), "writer":this.writer11,"angel":this.checkbox11, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text12.length>=2){
      this.agasilist.push({"name":this.text12.trim(), "writer":this.writer12,"angel":this.checkbox12, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text13.length>=2){
      this.agasilist.push({"name":this.text13.trim(), "writer":this.writer13,"angel":this.checkbox13, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text14.length>=2){
      this.agasilist.push({"name":this.text14.trim(), "writer":this.writer14,"angel":this.checkbox14, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text15.length>=2){
      this.agasilist.push({"name":this.text15.trim(), "writer":this.writer15,"angel":this.checkbox15, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text16.length>=2){
      this.agasilist.push({"name":this.text16.trim(), "writer":this.writer16,"angel":this.checkbox16, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text17.length>=2){
      this.agasilist.push({"name":this.text17.trim(), "writer":this.writer17,"angel":this.checkbox17, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text18.length>=2){
      this.agasilist.push({"name":this.text18.trim(), "writer":this.writer18,"angel":this.checkbox18, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text19.length>=2){
      this.agasilist.push({"name":this.text19.trim(), "writer":this.writer19,"angel":this.checkbox19, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text20.length>=2){
      this.agasilist.push({"name":this.text20.trim(), "writer":this.writer20,"angel":this.checkbox20, "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text21.length>=2){
      this.agasilist.push({"name":this.text21.trim(), "writer":this.writer21,"angel":this.checkbox21, "date": this.currentstartday +" "+hour+":"+min})
    }
    var angelcount=0;
      
    //console.log(this.agasilist);

    //아가씨 중복체크 ->
    var nameList = [];
    var hasDuplicate = false;
    var dupname = "";

    for (var i = 0; i < this.agasilist.length; i++) {
      var name = this.agasilist[i].name;
      if (nameList.includes(name)) {
        hasDuplicate = true;
        dupname=name;
        break;
      }
      nameList.push(name);
    }
      
    if (hasDuplicate) {
      //console.log("The agasilist array contains duplicate names.");
      window.alert("중복된 이름 "+dupname+" 제거하고 등록해주세요.")
      this.util.dismissLoading();
      return;
    } else {
      //console.log("The agasilist array does not contain duplicate names.");
    }
    //아가씨 중복체크 :)

    //console.log(this.a.numofpeople)
    for(var abe in this.agasilist){
      //console.log(this.agasilist[abe]);
      if(this.agasilist[abe].angel==true){
        angelcount++;
      }
    }

    //console.log(this.a.numofpeople) //4

    var result= this.filterDuplicates(this.agasilist);

    if(result==true){
      this.util.dismissLoading();
      return;
    }
    
    //console.log(this.agasilist.length);  //1
    //console.log(angelcount); //0
    //console.log(this.a.numofpeople<this.agasilist.length-angelcount);
    //console.log(this.agasilist);
    //console.log(this.agasilist.length);
    //console.log("mmmmmmm");
    //console.log(this.numofpeople);
    //console.log(this.inagasi);

    //console.log(this.angelcount)
    //console.log("this time's angel count : "+angelcount);
    // window.alert(this.numofpeople-(this.inagasi-this.angelcount)+"명까진 괜찮고 그 걸 넘은 인원은 날개. ")
    //console.log(this.numofpeople);//4
    //console.log(this.inagasi-this.angelcount); //3
    //console.log("위 둘이 비교를 먼저 해야함. 그 다음에 현재 새로 등록하는 아가씨의 수 .")
    console.log(this.numofpeople+",,,,"+this.agasilist.length+"+"+this.inagasi+"-"+this.angelcount+"-"+angelcount)
    if(this.numofpeople<this.agasilist.length+this.inagasi-this.angelcount-angelcount){

      this.util.dismissLoading();
      //console.log(this.numofpeople);
      //console.log(this.agasilist.length+this.inagasi-this.angelcount-angelcount);
      //console.log(this.agasilist.length+this.inagasi-this.angelcount-angelcount-this.numofpeople+ "명을 날개 지정하면서 기존 등록 프로세스 시작 ");
      var newarray = this.filterLastN(this.agasilist, this.agasilist.length+this.inagasi-this.angelcount-angelcount-this.numofpeople);
      //console.log(newarray);
      //console.log(newarray.length);
      var numagasi ="";

      for(var eiei in newarray){
        numagasi+=newarray[eiei].name+",";
      }
      //console.log(numagasi);
      var a = this.alertController.create({
        message: numagasi+"를 날개로 지정하시겠습니까?",
        buttons: [        
                    {
                      text: '아니요.',
                      handler: () => {
                                        //console.log('Let me think');
                                        //console.log(this.agasilist);
                                        this.util.dismissLoading();
                                      }
                    },
                    {
                      text: '네',
                      handler: () => {
                                        //console.log('Whatever');
                                        var endcount = this.agasilist.length;
                                        //console.log(newarray.length);
                                        //console.log(endcount);
                                        for(var abab=0; abab<newarray.length; abab ++){
                                          endcount--;
                                          //console.log(endcount);
                                          this.agasilist[endcount].angel=true;
                                        }
                                        
                                        //console.log(this.agasilist);
                                        this.regagasi();
                                        //날개 지정하면서 기존 등록 프로세스 시작 
                                        this.util.dismissLoading();
                                      }
                    }
               ]
      });

      a.present();

    }else{
      console.log("just register...");
      //http request to register roomdetail 
      console.log(this.agasilist);
      
      this.http.get("https://captainq.wadteam.com/captainq/apis/member",{},{"token":this.token}).then(data => {
      console.log("get result...");
      console.log(data);
      var a = JSON.parse(data.data)
      var result = JSON.parse(a.rst_content);
      console.log(result);
      console.log("was result...");
      var regflag=false;
      for(var value in result){
        console.log(result[value])
        for(var agasi in this.agasilist){
          console.log(this.agasilist[agasi]);
          if(result[value].nickname==this.agasilist[agasi].name){
            this.agasilist[agasi].flag=true;
            console.log("same name");
            console.log(result[value]);
            //이미 등록된 회원이면 room_detail테이블에 바로 넣어버리자.
            
            

            regflag=true;
            var json2  = [];
            console.log("a is : ");
            console.log(this.a);
            json2.push({"room_idx":this.a.key,"member_idx":result[value].idx,"angel":0,"incharge":this.a.incharge,"enter_dt":this.util.getCurrentFormattedDateTime(),"created_by":this.nickname});
            console.log("json2222 : ");
            console.log(json2);
        this.http.post("https://captainq.wadteam.com/captainq/apis/roomdetail", {"room_idx":this.a.key,"member_idx":result[value].idx,"angel":0,"incharge":this.a.incharge,"enter_dt":this.util.getCurrentFormattedDateTime(),"created_by":this.nickname}, {"token":this.token}).then(data => {
           
              console.log("data from roomdetail");
              console.log(data);

          });      

            // this.agasilist[agasi].wt_id=result[value].wt_id;
            // this.agasilist[agasi].director_id=result[value].director_id;
            // this.agasilist[agasi].status=result[value].status;
            // console.log(this.agasilist[agasi]);
          }
  
        }

  //       console.log(result[value].idx)
  //       console.log(result[value].room_name)
  //       // if(result[value].room_name==this.a.name){

  //       // }
  //       console.log(result[value].num_of_people)
  //       console.log(result[value].max_people_count)
  //       console.log(result[value].wt_id)
  //       console.log(result[value].director_id)
  //       console.log(result[value].status)
      }
      var notregistered = [];
      for(var agasi in this.agasilist){
        if(this.agasilist[agasi].flag==undefined||!this.agasilist[agasi].flag){
          notregistered.push(this.agasilist[agasi]);
        }
      }
      console.log(a);//멤버?
      console.log(this.a);//방정보 
      console.log(notregistered);
      console.log("not registered");
      if(notregistered.length==0){
        this.util.dismissLoading();
          this.view.dismiss();
      }else{
      let modal2 = this.modal.create(Choicemodal2Page,{ "agasi":notregistered,"room":this.a,"currentstartday":this.currentstartday,"hour":hour,"min":min});

      modal2.onDidDismiss(url => {

        console.log(url);

        if(url==undefined){
          return;
        }else if(url.result == false){
          this.view.dismiss();
        }else{
          if(url.result=="ok"){
            window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
            //console.log(this.originalList);
            
          this.view.dismiss();
          }
        }
      });
      modal2.present();


      }
      if(regflag){
        //이미등록ㄷ
      }else{
        //등록 안된 회원의 경우에는 따로 조핀팀 설정창으로 이동한 후 등록처리. 
      }
  });
      // this.regagasi();
    }
     
    //console.log("agasilist to put in company node");

  }// confirm :)

  filterLastN(arr, n) {
    if (n >= arr.length) {
      // if n is greater than or equal to the array length, return the original array
      return arr;
    } else {
      // otherwise, return a new array containing the last n elements of the original array
      return arr.slice(-n);
    }
  }
 
  /**
   * Room List 가져온다
   * @param v 
   * @param newlist 
   * @param subscribedList 
   * @param currentstartday 
   * @param modal 
   * @param length 
   * @param view 
   * @param firemain 
   * @param company 
   * @param a 
   * @param nickname 
   * @param newnum 
   * @param duflag 
   * @param agasiname 
   */
  getRoomList(v,newlist,subscribedList,currentstartday,modal,length,view,firemain,company,a,nickname,newnum,duflag,agasiname){

    console.log("getRoomList ->");
    console.log(v);
    console.log(v.name);
    console.log("newnum add " +newnum);
    console.log(this.newnum);

    this.firemain.child("users").child(v.name).once("value",(snapshot)=>{

      console.log(snapshot.val());
      console.log("v.name : "+v.name);

      if(snapshot.val()!=null&&snapshot.val().current!=undefined&&snapshot.val().current!=null){

        var currentflag = snapshot.val().current;

        subscribedList.push({"id":v.name,"name":v.name});

        window.alert(v.name+""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[0]+" "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
        
        duflag=true;
        view.dismiss({"result":true});
        newnum--;
        this.newnum=newnum;
        this.newnum--;

        return;
      }

      console.log("not dupulicated so start add");

      var dte = new Date();
      dte.setHours(dte.getHours()+9);

      var date = new Date();
      var year=date.getFullYear();
      var month=date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();

      if(snapshot.val()==null){
        
        console.log("최초 등록 ->")

        this.newnum++;

        if(this.newnum==-1){
          this.newnum=0;
        }
        console.log("newnum ++ :"+this.newnum);
        console.log(v.name+'first so push to newlist')

        newlist.push({ "name":v.name,"date": v.date ,"writer":v.writer,"angel":v.angel,"num":this.newnum});

        console.log("최초등록 :)");

      } else if (snapshot.val().jopan==undefined){

        console.log("조판 없음...");

        this.newnum++;

        if(this.newnum==-1){
          this.newnum=0;
        }        

        console.log("newnumm ++ :"+this.newnum);
        console.log(snapshot.val().jopan);
        console.log(v.name+" jopan is not set");

        newlist.push({ "name":v.name,"date": v.date ,"writer":v.writer,"angel":v.angel,"num":this.newnum});

        console.log(newlist);
        
      }else{

        console.log("최초 등록 아님 ->");

        newnum++;
        this.newnum++;
        if(this.newnum==-1){
          this.newnum=0;
        }
        // window.alert("newnum : "+this.newnum);
        console.log("v : "+v);
        console.log("newnummm ++ :"+this.newnum);
        console.log(this.newnum);
        console.log(snapshot.val().jopan);
        console.log(v.name+"already real")

        var date = new Date();
  
        var hour = date.getHours();
        var min = date.getMinutes();

        console.log("newnum..??."+newnum);
        console.log(a);
        console.log("updating..."+v.name);

        let dateTimeStampStr:string = year+"-"+month+"-"+day +" "+hour+":"+min;
        //##### 아가씨 DB 등록 호출 ####
        firemain.child("users").child(a.wt).child("roomhistory").child(currentstartday).child(a.key).child("agasi").child(this.newnum+"").update({"angel": v.angel,
                                                                                                                                                  "roomno":a.name,
                                                                                                                                                  "incharge":a.incharge, 
                                                                                                                                                  "name":v.name,
                                                                                                                                                  "writer":nickname,
                                                                                                                                                  "date":dateTimeStampStr});

        firemain.child("users").child(a.directorId).child("roomhistory").child(currentstartday).child(a.key).child("agasi").child(this.newnum+"").update({"angel": v.angel,
                                                                                                                                                          "roomno":a.name,
                                                                                                                                                          "incharge":a.incharge, 
                                                                                                                                                          "name":v.name,
                                                                                                                                                          "writer":nickname,
                                                                                                                                                          "date":dateTimeStampStr});
        
        firemain.child("users").child(v.name).child("attendance").child(currentstartday).update({"currentStatus":"attend"});

        firemain.child("users").child(v.name).child("attendance").child(currentstartday).child("attend").update({ "team":snapshot.val().jopan,
                                                                                                                  "name":name,
                                                                                                                  "date":currentstartday,
                                                                                                                  "flag":"attend",
                                                                                                                  "time":hour+":"+min});
        //users > 사용자 > current 정보를 추가한다
        firemain.child("users").child(v.name).child("current").update({ "room":a.name,
                                                                        "enter_date":dte,
                                                                        "date":currentstartday});
        
        firemain.child("attendance").child(company).child(currentstartday).child(v.name).child("attend").update({ "team":snapshot.val().jopan,
                                                                                                                  "name":v.name,
                                                                                                                  "flag":"attend",
                                                                                                                  "date":currentstartday, 
                                                                                                                  "time":hour+":"+min});
        
        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).update({ "lastupdatedperson":nickname, 
                                                                                                                              "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""});

        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").child(this.newnum+"").update({"angel": v.angel,
                                                                                                                                                                  "num":this.newnum,
                                                                                                                                                                  "roomno":a.name,
                                                                                                                                                                  "incharge":a.incharge, 
                                                                                                                                                                  "name":v.name,
                                                                                                                                                                  "writer":nickname,
                                                                                                                                                                  "date":dateTimeStampStr});

        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("message").push({  "date":month+"-"+day +" "+hour+":"+min+"",
                                                                                                                                              "contents":"메이드 ",
                                                                                                                                              "type":"assigned", 
                                                                                                                                              "agasi":v.name,
                                                                                                                                              "uploader":nickname, 
                                                                                                                                              "name":"system"});
    
        // ##### 아가씨 DB 등록 호출 #### :)

        subscribedList.push({"id":v.name,"name":v.name});
        // 이미등록됨

        console.log("최초 등록 아님 :)");

      }//if - else if - else :)

      var date = new Date();
      var hour = date.getHours();
      var min = date.getMinutes();

      console.log(newnum);
      console.log(newlist);
      console.log(subscribedList);
      console.log(subscribedList.length); //0
      console.log(newlist.length);  //0
      console.log(length); //1 //하울. 
      console.log(this.newnum);

      if(subscribedList.length + newlist.length == length){

        console.log("Fin!!!")
        
        if(newlist.length==0){
          console.log("0 so just dismiss")
          view.dismiss();
        }else{
          console.log("not 0 so modal!")
          var agasinum=0;
          if(a.agasi==undefined){

          }else{
            agasinum = a.agasi.length;
          }
          agasinum=agasinum+subscribedList.length;

          console.log(subscribedList);
          console.log(a);
          console.log(agasinum);
          console.log(newlist);
          console.log("numnum..."+newnum+"and subscribedList.length : "+subscribedList.length);

          let modal2 = this.modal.create(Choicemodal2Page,{"newnum":newlist[0].num, "agasi":newlist,"room":a,"currentstartday":this.currentstartday,"hour":hour,"min":min});

          modal2.onDidDismiss(url => {

            console.log(url);

            if(url==undefined){
              return;
            }else if(url.result == false){
              this.view.dismiss();
            }else{
              if(url.result=="ok"){
                window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
                //console.log(this.originalList);
                
              this.view.dismiss();
              }
            }
          });
          modal2.present();
        }
      }
    });//firemain :)

    console.log("getRoomList :)");

  }//getRoomList :)

  filterDuplicates(arr) {
    var seen = {};
    console.log("Filter....");
    var dupflag=false;
    arr.filter(function(obj) {
      if (seen.hasOwnProperty(obj.name)) {
        console.log("is false");
        window.alert(obj.name+"은 이미 입력한 이름입니다."+arr.length);
        dupflag =  true
        return false;
      }else{
          seen[obj.name] = true;
          return true;
      }
    });
    return dupflag;
  }
  /**
   * 아가씨를 DB 에 등록합니다
   * Firebase Realtime Database 에 등록하는 func.
   */
  regagasi(){

    console.log("reagasi...");

    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var dte = new Date();
    var newflag=false;
    
    //유앤미 > madelist > 2023-7-17 > 101 >  -N_Yn1BrsdRAPWMXqKj0 > agasi -> 조회(once)
    console.log(`${this.company} > madelist > ${this.currentstartday} > ${this.a.name} >  ${this.a.key} > agasi -> 조회(once)`);

    this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").once("value",snap3=>{
      
      var num = snap3.numChildren();
      this.newnum = Number(num)-1;
      var totalagasi=[];
      var dupflag=false;
      var newlist = [];
      var subscribedList = [];
      var duflag=false;

      console.log("for loop");

      for(var cc in this.agasilist){

        console.log(this.agasilist[cc]);

        this.getRoomList(this.agasilist[cc],newlist,subscribedList,this.currentstartday,this.modal,this.agasilist.length,this.view,this.firemain,this.company,this.a,this.agasilist[cc].writer,this.newnum,duflag,this.a);

        console.log(this.util.newnumber);
      }

      console.log(this.newlist);
      console.log(this.newlist.length);
      console.log(this.subscribedList);
      console.log(this.subscribedList.length);
      
      var count=0;

      for(var listvalue in this.newlist){

        count++;

        console.log(this.newlist[listvalue]);
      }

      console.log(count);

      if(count>0){

        let modal2 = this.modal.create(Choicemodal2Page,{"newnum":this.newnum, "agasi":this.newlist,"subscribedList":this.subscribedList,"room":this.a,"currentstartday":this.currentstartday,"hour":hour,"min":min});

        modal2.onDidDismiss(url => {

          console.log(url);
          if(url==undefined){
            return;
          }else if(url.result == false){
            this.view.dismiss();
          }else{
            if(url.result=="ok"){
              window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
              //console.log(this.originalList);
            }
          }
        });

        modal2.present();

      }

      console.log("for loop :)");

      this.util.dismissLoading();
      
      console.log("reagasi :)");
      
      return;

    });//firebase :)

  }// regagasi :) 

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ChoicemodalPage');
  }

}
