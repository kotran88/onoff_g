import { Component ,ViewChild,Renderer2} from '@angular/core';
import { IonicPage,ViewController,LoadingController,AlertController,ModalController, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
import { UtilsProvider } from '../../providers/utils/utils';
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
  constructor(public util:UtilsProvider, public alertController:AlertController,public renderer:Renderer2,public modal:ModalController,public loading:LoadingController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");
    this.name = localStorage.getItem("name");
    this.nickname=localStorage.getItem("nickname");
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.a =  this.navParams.get("a");
    console.log(this.a);
    this.inagasi = this.navParams.get("inagasi");
    this.angelcount = this.navParams.get("angelcount");
    this.numofpeople = this.navParams.get("numofpeople");
    var agasi="";
    if(this.a==undefined){
    }else{
      agasi = this.a.agasi;
    }

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
  confirm(){
    this.util.presentLoading();

    //console.log(this.checkbox);
    //console.log(this.checkbox2);
    //console.log(this.checkbox3);
    //console.log(this.checkbox4);
    //console.log(this.checkbox5);
    //console.log(this.checkbox6);
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    // window.alert(year+"-"+month+"-"+day+" "+hour+":"+min);
    var numofcount=0;
    //console.log(this.writer);
    //console.log(this.writer2);
    //console.log(this.writer3);
    //console.log(this.writer4);
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

    //console.log("confirm");
    //console.log(this.a);
    //console.log(this.agasilist)
    this.agasilist=[];
    if(this.text.length>=2){
      //console.log("agasilist input text");
    this.agasilist.push({  "name":this.text.trim(),"writer":this.writer,"angel":this.checkbox,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
      
      //console.log("agasilist input text2");
    this.agasilist.push({ "name":this.text2.trim(),"writer":this.writer2,"angel":this.checkbox2,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text3.length>=2){
      
      //console.log("agasilist input text3");
    this.agasilist.push({ "name":this.text3.trim(),"writer":this.writer3,"angel":this.checkbox3,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text4.length>=2){
      
      //console.log("agasilist input text4");
    this.agasilist.push({ "name":this.text4.trim(),"writer":this.writer4,"angel":this.checkbox4,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text5.length>=2){
      
      //console.log("agasilist input text5");
    this.agasilist.push({ "name":this.text5.trim(),"writer":this.writer5,"angel":this.checkbox5,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text6.length>=2){
      
      //console.log("agasilist input text6");
    this.agasilist.push({ "name":this.text6.trim(),"writer":this.writer6,"angel":this.checkbox6,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text7.length>=2){
      
      //console.log("agasilist input text7");
      this.agasilist.push({ "name":this.text7.trim(),"writer":this.writer7,"angel":this.checkbox7,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text8.length>=2){
        
      //console.log("agasilist input text8");
      this.agasilist.push({ "name":this.text8.trim(),"writer":this.writer8,"angel":this.checkbox8,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text9.length>=2){
        
      //console.log("agasilist input text9");
      this.agasilist.push({ "name":this.text9.trim(), "writer":this.writer9,"angel":this.checkbox9,
      "date": this.currentstartday +" "+hour+":"+min})
      }

      if(this.text10.length>=2){
        
      //console.log("agasilist input text10");
        this.agasilist.push({ "name":this.text10.trim(), "writer":this.writer10,"angel":this.checkbox10,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text11.length>=2){
        //console.log("agasilist input text11");
        this.agasilist.push({ "name":this.text11.trim(), "writer":this.writer11,"angel":this.checkbox11,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text12.length>=2){
        //console.log("agasilist input text12");
        this.agasilist.push({ "name":this.text12.trim(), "writer":this.writer12,"angel":this.checkbox12,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text13.length>=2){
        //console.log("agasilist input text13");
        this.agasilist.push({ "name":this.text13.trim(), "writer":this.writer13,"angel":this.checkbox13,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text14.length>=2){
        //console.log("agasilist input text14");
        this.agasilist.push({ "name":this.text14.trim(), "writer":this.writer14,"angel":this.checkbox14,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text15.length>=2){
        //console.log("agasilist input text15");
        this.agasilist.push({ "name":this.text15.trim(), "writer":this.writer15,"angel":this.checkbox15,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text16.length>=2){
        //console.log("agasilist input text16");
        this.agasilist.push({ "name":this.text16.trim(), "writer":this.writer16,"angel":this.checkbox16,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text17.length>=2){
        //console.log("agasilist input text17");
        this.agasilist.push({ "name":this.text17.trim(), "writer":this.writer17,"angel":this.checkbox17,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text18.length>=2){
        //console.log("agasilist input text18");
        this.agasilist.push({ "name":this.text18.trim(), "writer":this.writer18,"angel":this.checkbox18,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text19.length>=2){
        //console.log("agasilist input text19");
        this.agasilist.push({ "name":this.text19.trim(), "writer":this.writer19,"angel":this.checkbox19,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text20.length>=2){
        //console.log("agasilist input text20");
        this.agasilist.push({ "name":this.text20.trim(), "writer":this.writer20,"angel":this.checkbox20,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text21.length>=2){
        //console.log("agasilist input text21");
        this.agasilist.push({ "name":this.text21.trim(), "writer":this.writer21,"angel":this.checkbox21,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      var angelcount=0;
      
      //console.log(this.agasilist);

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

      //console.log(this.a.numofpeople)
      for(var abe in this.agasilist){
        //console.log(this.agasilist[abe]);
        if(this.agasilist[abe].angel==true){
          angelcount++;
        }
      }

      //console.log(this.a.numofpeople) //4

      var result= this.filterDuplicates(this.agasilist);
      if(result==true)
    {
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
      //console.log(this.agasilist.length+"+"+this.inagasi+"-"+this.angelcount+"-"+angelcount)
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
        this.regagasi();
      }
     

  //console.log("agasilist to put in company node");
   }
    filterLastN(arr, n) {
    if (n >= arr.length) {
      // if n is greater than or equal to the array length, return the original array
      return arr;
    } else {
      // otherwise, return a new array containing the last n elements of the original array
      return arr.slice(-n);
    }
  }
 
  getRoomList(v,newlist,subscribedList,currentstartday,modal,length,view,firemain,company,a,nickname,newnum,duflag){
    console.log(v);
    console.log(v.name);
    console.log("newnum add " +newnum);
    this.firemain.child("users").child(v.name).once("value",function(snapshot){
      console.log(snapshot.val());
      console.log(v.name);
      if(snapshot.val()!=null&&snapshot.val().current!=undefined&&snapshot.val().current!=null){
        var currentflag = snapshot.val().current;
        subscribedList.push({"id":v.name,"name":v.name});
        window.alert(v.name+""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[0]+" "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
        duflag=true;
        return;
      }
            var dte = new Date();
              dte.setHours(dte.getHours()+9);

              var date = new Date();
              var year=date.getFullYear();
              var month=date.getMonth()+1;
              var day = date.getDate();
              var hour = date.getHours();
              var min = date.getMinutes();
      if(snapshot.val()==null){
        //최초등록
        console.log(v.name+'first so push to newlist')
        newlist.push({ "name":v.name,
        "date": v.date ,"writer":v.writer,"angel":v.angel});
      }else if (snapshot.val().jopan==undefined){

      console.log(snapshot.val().jopan);
        console.log(v.name+"already")
       // 이미등록되었지만 조판팀 설정안되있음. 
      }else{


      console.log(snapshot.val().jopan);
        console.log(v.name+"already real")

        var date = new Date();
  
      
        var hour = date.getHours();
        var min = date.getMinutes();
        console.log("newnum..."+newnum);
        console.log(a);
        firemain.child("users").child(a.wt).child("roomhistory").child(currentstartday).child(a.key).child("agasi").child(newnum+"").update({"angel": v.angel,"roomno":a.name,"incharge":a.incharge, "name":v.name,"writer":nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        firemain.child("users").child(a.directorId).child("roomhistory").child(currentstartday).child(a.key).child("agasi").child(newnum+"").update({"angel": v.angel,"roomno":a.name,"incharge":a.incharge, "name":v.name,"writer":nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        

        firemain.child("users").child(nickname).child("attendance").child(currentstartday).update({"currentStatus":"attend"})
        firemain.child("users").child(nickname).child("attendance").child(currentstartday).child("attend").update({"team":snapshot.val().jopan,"name":name,"date":currentstartday,"flag":"attend","time":hour+":"+min})
        firemain.child("users").child(nickname).child("current").update({"room":a.name,"enter_date":dte,"date":currentstartday})
        firemain.child("attendance").child(company).child(currentstartday).child(v.name).child("attend").update({ "team":snapshot.val().jopan,"name":v.name,"flag":"attend","date":currentstartday, "time":hour+":"+min})
        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).update({"lastupdatedperson":nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").child(newnum+"").update({"angel": v.angel,"roomno":a.name,"incharge":a.incharge, "name":v.name,"writer":nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("message").push({ "date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드 ","type":"assigned", "agasi":v.name,"uploader":nickname, "name":"system"})
    
        subscribedList.push({"id":v.name,"name":v.name});

         // 이미등록됨
      }

      var date = new Date();
  
      
      var hour = date.getHours();
      var min = date.getMinutes();
      console.log(newnum);
      console.log(newlist);
      console.log(subscribedList);
      console.log(length);
      console.log(newlist.length);
      console.log(subscribedList.length);
      if(subscribedList.length + newlist.length == length){
        console.log("Fin!!!")
        firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").once("value",function(snap){
          console.log(snap.val())
          var startvalue = -1;
          for(var dd in snap.val()){
            console.log(dd);
            startvalue++;
            console.log("번째 삭제하고 다시 넣기"+startvalue)
            var bantee=snap.val()[dd].bantee;
            var findate = snap.val()[dd].findate;
            var lastupdated = snap.val()[dd].lastupdated;
            var lastupdatedperson = snap.val()[dd].lastupdatedperson;
            var money = snap.val()[dd].money;
            var tc = snap.val()[dd].tc;
            var wt = snap.val()[dd].wt;
            var angel = snap.val()[dd].angel;
            var roomno = snap.val()[dd].roomno;
            var incharge = snap.val()[dd].incharge;
            var name = snap.val()[dd].name;
            var writer = snap.val()[dd].writer;
            var date = snap.val()[dd].date;
            console.log(angel);
            console.log(roomno);
            console.log(incharge);
            console.log(name);
            console.log(writer);
            console.log(date);
            console.log(bantee);
            console.log(findate);
            console.log(lastupdated);
            console.log(lastupdatedperson);
            console.log(money);
            console.log(tc);
            console.log(wt);

            firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").child(dd).remove();
            if(bantee!=undefined){
              firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").child(startvalue).update({
                "angel": angel,
                "roomno":roomno,
                "incharge":incharge,
                "name":name,
                "writer":writer,
                "date":date,
                "bantee":bantee,
                "findate":findate,
                "money":money,
                "tc":tc,
                "wt":wt
              })
            }else{
              firemain.child("company").child(company).child("madelist").child(currentstartday).child(a.name).child(a.key).child("agasi").child(startvalue).update({
                "angel": angel,
                "roomno":roomno,
                "incharge":incharge,
                "name":name,
                "writer":writer,
                "date":date
  
              })
            }
            


          }

        });
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
        console.log(a);
        console.log(agasinum);
        console.log(newlist);
          let modal2 = modal.create(Choicemodal2Page,{ "agasi":newlist,"subscribedList":agasinum,"room":a,"currentstartday":currentstartday,"hour":hour,"min":min});
          modal2.onDidDismiss(url => {
            //console.log(url);
            if(url==undefined){
              return;
            }else{
              if(url.result=="ok"){
                window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
                //console.log(this.originalList);
                view.dismiss();
              }
            }
            
          });
      modal2.present();
        }
       
      }

    });
  }
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
  regagasi(){
    console.log("reagasi...");
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    
    var dte = new Date();
    // this.originalList=this.agasilist;
    //console.log(this.a);
      //console.log(this.agasilist);
      //console.log(this.originalList);
      var newflag=false;
      
      this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").once("value",snap3=>{
      
        var num = snap3.numChildren();
        console.log(snap3.val());
        var newnum = Number(num)-1;
        var totalagasi=[];
      //   //console.log(b);
       





        var dupflag=false;

        var newlist = [];
        var subscribedList = [];
        var duflag=false;
        console.log(this.agasilist);
        for(var cc in this.agasilist){
          console.log(this.agasilist[cc]);
          newnum++;
            this.getRoomList(this.agasilist[cc],newlist,subscribedList,this.currentstartday,this.modal,this.agasilist.length,this.view,this.firemain,this.company,this.a,this.agasilist[cc].name,newnum,duflag);
          console.log(this.util.newnumber);
            // for(var dd in totalagasi){
        //   console.log(totalagasi[dd].nickname)
        //   if(totalagasi[dd].nickname!=undefined&&this.agasilist[cc].name.trim() == totalagasi[dd].nickname.trim()){
        //     //console.log("IN!!!!"+totalagasi[dd].nickname);
        //     dupflag=true;
        //     newnum++;
        //     var nickname = totalagasi[dd].nickname;
        //     var name = totalagasi[dd].nickname;
        //       var dte = new Date();
        //       dte.setHours(dte.getHours()+9);
        //     var currentflag = totalagasi[dd].current;
        //     //console.log(currentflag);
        //     if(currentflag==undefined){
        //       //처음 들어옴. 
        //     }else{
        //       //이미 방에 들어가있으므로 종료. 
        //       //console.log(currentflag);
        //       //console.log(this.currentstartday)
        //       //console.log(currentflag.room);
        //       //console.log(this.a);
        //       //console.log(this.a.name);
        //       if(currentflag.date==this.currentstartday){
        //         window.alert(name+""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[0]+" "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
        //             this.view.dismiss({result:true});
        //             return;
        //       }
              
                
          
        //     }

        //     this.firemain.child("users").child(this.a.wt).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        //     this.firemain.child("users").child(this.a.directorId).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
            

        //     this.firemain.child("users").child(nickname).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
        //     this.firemain.child("users").child(nickname).child("attendance").child(this.currentstartday).child("attend").update({"team":totalagasi[dd].jopan,"name":name,"date":this.currentstartday,"flag":"attend","time":hour+":"+min})
        //     this.firemain.child("users").child(nickname).child("current").update({"room":this.a.name,"enter_date":dte,"date":this.currentstartday})
        //     this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":totalagasi[dd].jopan,"name":this.agasilist[cc].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
        //     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({"lastupdatedperson":this.nickname, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
        //     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
        //     this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("message").push({ "date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드 ","type":"assigned", "agasi":this.agasilist[cc].name,"uploader":this.nickname, "name":"system"})
        //     this.subscribedList.push({"id":nickname.trim(),"name":nickname.trim()});
  
        //   }
        // }
      }

      this.util.dismissLoading();
      
      return;
      //console.log(this.subscribedList);
      //console.log(this.agasilist);
              var subscribedListNames = this.subscribedList.map(function(obj) {
                return obj.name;
              });
              //console.log(subscribedListNames);
              this.newlist = this.agasilist.filter(function(obj) {
                //console.log("obj...");
                //console.log(obj.name);
                //console.log(subscribedListNames.includes(obj.name));
                return !subscribedListNames.includes(obj.name);
              });





        //console.log(totalagasi);
       
        console.log("this is new List...")
        console.log(this.newlist);
        console.log(this.agasilist);
        console.log(this.originalList);
        console.log(this.subscribedList);
        console.log(this.a)
        var agasinum=0;
        if(this.a.agasi==undefined){

        }else{
          agasinum = this.a.agasi.length;
        }
        if(this.newlist.length!=0){
         // 수정 1개로 만원. 
         let modal = this.modal.create(Choicemodal2Page,{ "agasi":this.newlist,"subscribedList":agasinum,"room":this.a,"currentstartday":this.currentstartday,"hour":hour,"min":min});
         modal.onDidDismiss(url => {
           //console.log(url);
           if(url==undefined||url.result==undefined){
            this.util.dismissLoading();
           }else if(url.result=="ok"){
             window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
   
         for(var cca in this.newlist){
           if(newflag){
   
           }else{
             this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("message").push({"date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드..","agasi":this.newlist[cca].name,"uploader":this.nickname,"type":"assigned", "name":"system"})
           }
           newnum++;
             this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).update({"lastupdatedperson":this.nickname, "lastupdated":year+"-"+month+"-"+day +" "+hour+":"+min+""})
             this.firemain.child("company").child(this.company).child("madelist").child(this.currentstartday).child(this.a.name).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.newlist[cca].angel, "roomno":this.a.name, "name":this.newlist[cca].name,"incharge":this.a.incharge, "writer":this.nickname,"date":year+"-"+month+"-"+day +" "+hour+":"+min});
            }

            this.view.dismiss({"result":"nono"})
           }
         });
         
     modal.present();

        }else{
          //console.log("else...come...");
          this.view.dismiss({"result":"nono"})
        }

     this.util.dismissLoading();
    });


  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ChoicemodalPage');
  }

}
