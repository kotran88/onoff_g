import { Component ,ViewChild,Renderer2} from '@angular/core';
import { IonicPage,ViewController,LoadingController,AlertController,ModalController, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
import { Choicemodal2Page } from '../choicemodal2/choicemodal2';
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
  lloading:any;
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

  name:any="";
  subscribedList=[];
  currentstartday:any="";
  currentstart:any="";
  constructor(public alertController:AlertController,public renderer:Renderer2,public modal:ModalController,public loading:LoadingController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.company = localStorage.getItem("company");
    this.name = localStorage.getItem("name");
    
    this.currentstart=localStorage.getItem("start");
    this.currentstartday=localStorage.getItem("startDate");
    this.a =  this.navParams.get("a");
    var agasi="";
    if(this.a==undefined){
    }else{
      agasi = this.a.agasi;
    }
    console.log(this.a);
    console.log("was this.a")
    // if(agasi==undefined){
    //   this.writer=this.name;
    //   this.writer2=this.name;
    // }
    // for(var a in agasi){
    //   console.log(agasi[a].name)
    //   console.log(this.agasilist.length)
    //   console.log("was agasi[a].name")
    //   console.log(this.agasilist);
    //   if(agasi[a].findate==undefined){
    //     this.agasilist.push({ "name":agasi[a].name,
    //     "writer":agasi[a].writer,
    //   "date":agasi[a].date,
    // })
    //   }else{
    //     this.agasilist.push({ "name":agasi[a].name,
    //   "findate":agasi[a].findate,
    //   "date":agasi[a].date, "writer":agasi[a].writer,
    //   "money":agasi[a].money,
    //   "roomno":agasi[a].roomno,
    //   "wt":agasi[a].wt,
    //   "tc":agasi[a].tc})
    //   }
      
    //   if(this.agasilist.length==1){
    //     this.text=this.agasilist[0].name;
    //     this.writer=this.agasilist[0].writer;
    //   }
    //   if(this.agasilist.length==2){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;

    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //   }
    //   if(this.agasilist.length==3){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;


    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //   }
    //   if(this.agasilist.length==4){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;


    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //   }
    //   if(this.agasilist.length==5){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;
    //     this.text5=this.agasilist[4].name;
    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //     this.writer5=this.agasilist[4].writer;
    //   }
    //   if(this.agasilist.length==6){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;
    //     this.text5=this.agasilist[4].name;
    //     this.text6=this.agasilist[5].name;
    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //     this.writer5=this.agasilist[4].writer;
    //     this.writer6=this.agasilist[5].writer;
    //   }
    //   if(this.agasilist.length==7){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;
    //     this.text5=this.agasilist[4].name;
    //     this.text6=this.agasilist[5].name;
    //     this.text7=this.agasilist[6].name;
    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //     this.writer5=this.agasilist[4].writer;
    //     this.writer6=this.agasilist[5].writer;
    //     this.writer7=this.agasilist[6].writer;
    //   }

    //   if(this.agasilist.length==8){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;
    //     this.text5=this.agasilist[4].name;
    //     this.text6=this.agasilist[5].name;
    //     this.text7=this.agasilist[6].name;
    //     this.text5=this.agasilist[7].name;
    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //     this.writer5=this.agasilist[4].writer;
    //     this.writer6=this.agasilist[5].writer;
    //     this.writer7=this.agasilist[6].writer;
    //     this.writer8=this.agasilist[7].writer;
    //   }

    //   if(this.agasilist.length==9){
    //     this.text=this.agasilist[0].name;
    //     this.text2=this.agasilist[1].name;
    //     this.text3=this.agasilist[2].name;
    //     this.text4=this.agasilist[3].name;
    //     this.text5=this.agasilist[4].name;
    //     this.text6=this.agasilist[5].name;
    //     this.text7=this.agasilist[6].name;
    //     this.text5=this.agasilist[7].name;
    //     this.text6=this.agasilist[8].name;

    //     this.writer=this.agasilist[0].writer;
    //     this.writer2=this.agasilist[1].writer;
    //     this.writer3=this.agasilist[2].writer;
    //     this.writer4=this.agasilist[3].writer;
    //     this.writer5=this.agasilist[4].writer;
    //     this.writer6=this.agasilist[5].writer;
    //     this.writer7=this.agasilist[6].writer;
    //     this.writer8=this.agasilist[7].writer;
    //     this.writer9=this.agasilist[8].writer;
    //   }

    // }

    console.log("current agasi : ");
    console.log(this.agasilist);
  }
  onKeyPressed(event){
    console.log(event.key) ;
    console.log(event.keyCode);
  };

  onChangeTime2(event,v){
    console.log(v);
    console.log(this.checkbox4);
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
    console.log(event.value);
    console.log(event.value.length);
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
    this.view.dismiss();
  }
  confirm(){
    this.lloading = this.loading.create({
      content: '저장중...'
    });
    this.lloading.present();
    console.log(this.checkbox);
    console.log(this.checkbox2);
    console.log(this.checkbox3);
    console.log(this.checkbox4);
    console.log(this.checkbox5);
    console.log(this.checkbox6);
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();

    // window.alert(year+"-"+month+"-"+day+" "+hour+":"+min);
    var numofcount=0;
    console.log(this.writer);
    console.log(this.writer2);
    console.log(this.writer3);
    console.log(this.writer4);
    if(this.writer.length==0){
      this.writer=this.name;
    }
    if(this.writer2.length==0){
      this.writer2=this.name;
    }
    if(this.writer3.length==0){
      this.writer3=this.name;
    }
    if(this.writer4.length==0){
      this.writer4=this.name;
    }
    if(this.writer5.length==0){
      this.writer5=this.name;
    }
    if(this.writer6.length==0){
      this.writer6=this.name;
    }
    if(this.writer7.length==0){
      this.writer7=this.name;
    }
    if(this.writer8.length==0){
      this.writer8=this.name;
    }
    if(this.writer9.length==0){
      this.writer9=this.name;
    }
    console.log("confirm");
    console.log(this.a);
    if(this.text.length>=2){
      console.log("agasilist input text");
    this.agasilist.push({  "name":this.text,"writer":this.writer,"angel":this.checkbox,
    "date": year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text2.length>=2){
      
      console.log("agasilist input text2");
    this.agasilist.push({ "name":this.text2,"writer":this.writer2,"angel":this.checkbox2,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text3.length>=2){
      
    this.agasilist.push({ "name":this.text3,"writer":this.writer3,"angel":this.checkbox3,
    "date":  year+"-"+month+"-"+day +" "+hour+":"+min})
    }
    if(this.text4.length>=2){
      
    this.agasilist.push({ "name":this.text4,"writer":this.writer4,"angel":this.checkbox4,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text5.length>=2){
      
    this.agasilist.push({ "name":this.text5,"writer":this.writer5,"angel":this.checkbox5,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text6.length>=2){
      
    this.agasilist.push({ "name":this.text6,"writer":this.writer6,"angel":this.checkbox6,
    "date": this.currentstartday +" "+hour+":"+min})
    }
    if(this.text7.length>=2){
      
      this.agasilist.push({ "name":this.text7,"writer":this.writer7,"angel":this.checkbox7,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text8.length>=2){
        
      this.agasilist.push({ "name":this.text8,"writer":this.writer8,"angel":this.checkbox8,
      "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text9.length>=2){
        
      this.agasilist.push({ "name":this.text9, "writer":this.writer9,"angel":this.checkbox9,
      "date": this.currentstartday +" "+hour+":"+min})
      }

      if(this.text10.length>=2){
        
        this.agasilist.push({ "name":this.text10, "writer":this.writer10,"angel":this.checkbox10,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text11.length>=2){
        this.agasilist.push({ "name":this.text11, "writer":this.writer11,"angel":this.checkbox11,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text12.length>=2){
        this.agasilist.push({ "name":this.text12, "writer":this.writer12,"angel":this.checkbox12,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text13.length>=2){
        this.agasilist.push({ "name":this.text13, "writer":this.writer13,"angel":this.checkbox13,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text14.length>=2){
        this.agasilist.push({ "name":this.text14, "writer":this.writer14,"angel":this.checkbox14,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text15.length>=2){
        this.agasilist.push({ "name":this.text15, "writer":this.writer15,"angel":this.checkbox15,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text16.length>=2){
        this.agasilist.push({ "name":this.text16, "writer":this.writer16,"angel":this.checkbox16,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text17.length>=2){
        this.agasilist.push({ "name":this.text17, "writer":this.writer17,"angel":this.checkbox17,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text18.length>=2){
        this.agasilist.push({ "name":this.text18, "writer":this.writer18,"angel":this.checkbox18,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text19.length>=2){
        this.agasilist.push({ "name":this.text19, "writer":this.writer19,"angel":this.checkbox19,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text20.length>=2){
        this.agasilist.push({ "name":this.text20, "writer":this.writer20,"angel":this.checkbox20,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      if(this.text21.length>=2){
        this.agasilist.push({ "name":this.text21, "writer":this.writer21,"angel":this.checkbox21,
        "date": this.currentstartday +" "+hour+":"+min})
      }
      
      console.log(this.agasilist);
      console.log(this.agasilist.length);

      var a = this.alertController.create({
        message: this.agasilist[this.agasilist.length-1].name+"를 날개로 지정하시겠습니까?",
        buttons: [
         
          {
            text: '아니요.',
            handler: () => {
              console.log('Let me think');
              console.log(this.agasilist);
        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }
            }
          },
          {
            text: '네',
            handler: () => {
              console.log('Whatever');
              this.agasilist[this.agasilist.length-1].angel=true;
              console.log(this.agasilist);
              this.regagasi();
              //날개 지정하면서 기존 등록 프로세스 시작 
        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }
            }
          }
        ]
      });
      a.present();

  console.log("agasilist to put in company node");
   }
  regagasi(){

    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();


    console.log(this.text);
    console.log(this.text2);
    console.log(this.text3);
    console.log(this.text4);
    console.log(this.text5);
    console.log(this.text6);
    console.log(this.text7);
    console.log(this.text8);
    console.log(this.text9);

    console.log(this.writer2);
    console.log(this.writer3);
    console.log(this.a);
    console.log(this.name);

    console.log(this.agasilist)
    var clean = this.agasilist.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.name === arr.name)))
    console.log(clean)
    this.agasilist=clean;
    for(var a in this.agasilist){
      this.originalList.push(this.agasilist[a]);
    }
    var dte = new Date();
    // this.originalList=this.agasilist;
    console.log(this.a);
      console.log(this.agasilist);
      console.log(this.originalList);
      var newflag=false;
      

      this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").once("value",snap3=>{
      
        var num = snap3.numChildren();
        var newnum = Number(num)-1;
        this.firemain.child("users").once("value",snap2=>{
      //   console.log(b);
        for(var b in snap2.val()){
          if(snap2.val()[b].type=="agasi"){
            var dupflag=false;
            for(var cc in this.agasilist){
              if(this.agasilist[cc].name.trim() == snap2.val()[b].name.trim()){
                dupflag=true;
                newnum++;
                var id = snap2.val()[b].id;
                var name = snap2.val()[b].name;
                  console.log("id and name : ");
                  console.log(id+","+name);
                  var dte = new Date();
                var currentflag = snap2.val()[b].current;

                if(currentflag==undefined){
                  //처음 들어옴. 
                }else{
                  //이미 방에 들어가있으므로 종료. 
                  console.log(currentflag);
                  console.log(currentflag.room);
                  console.log(this.a);
                  console.log(this.a.name);
                  
                    window.alert(""+currentflag.room+"번 방에 "+currentflag.enter_date.split("T")[1].split(":")[0]+"시"+currentflag.enter_date.split("T")[1].split(":")[1]+"분에 입장하여, 추가할수없습니다.");
                    this.view.dismiss();

        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }

                    return;
                }
                dte.setHours(dte.getHours()+9);
                this.firemain.child("users").child(id).child("attendance").child(this.currentstartday).update({"currentStatus":"attend"})
                this.firemain.child("users").child(id).child("attendance").child(this.currentstartday).child("attend").update({"team":snap2.val()[b].jopan,"name":name,"date":this.currentstartday,"flag":"attend","time":hour+":"+min})
                this.firemain.child("users").child(id).child("current").update({"room":this.a.name,"enter_date":dte})
                this.firemain.child("attendance").child(this.company).child(this.currentstartday).child(this.agasilist[cc].name).child("attend").update({ "team":snap2.val()[b].jopan,"name":this.agasilist[cc].name,"flag":"attend","date":this.currentstartday, "time":hour+":"+min})
                this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"lastupdatedperson":this.name, "lastupdated":(dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes()+""})
                this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.agasilist[cc].angel,"roomno":this.a.name,"incharge":this.a.incharge, "name":this.agasilist[cc].name,"writer":this.name,"date":year+"-"+month+"-"+day +" "+hour+":"+min})
                
                this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("message").push({ "date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드 ","type":"assigned", "agasi":this.agasilist[cc].name,"uploader":this.name, "name":"system"})
                this.subscribedList.push({"id":id,"name":name});
      
              }
            }
                  console.log(this.subscribedList.length);
                  var subscribedListNames = this.subscribedList.map(function(obj) {
                    return obj.name;
                  });
                  console.log(subscribedListNames);
                  this.newlist = this.agasilist.filter(function(obj) {
                    return !subscribedListNames.includes(obj.name);
                  });
                  console.log("nlist : ");
                  console.log(this.newlist);
          }
        }
       
        console.log("this is new List...")
        console.log(this.newlist);
        if(this.newlist.length==0){
          console.log(this.agasilist);
          console.log(this.originalList);
          this.view.dismiss();
        }else{
          console.log("추가등록할것...");
          console.log(this.newlist)
          let modal = this.modal.create(Choicemodal2Page,{"agasi":this.newlist,"subscribedList":this.subscribedList,"room":this.a,"currentstartday":this.currentstartday,"hour":hour,"min":min});
          modal.onDidDismiss(url => {
            console.log(url);
            if(url==undefined||url.result==undefined){
    
            }else if(url.result=="ok"){
              window.alert("신규아가씨 출근처리/배정되었습니다.(가입은안되었습니다)");
    
          console.log(this.newlist);
          for(var cca in this.newlist){
            console.log(this.newlist[cca])
            if(newflag){
    
            }else{
              this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("message").push({"date":month+"-"+day +" "+hour+":"+min+"","contents":"메이드..","agasi":this.newlist[cca].name,"uploader":this.name,"type":"assigned", "name":"system"})
         
            }
            newnum++;
             console.log("newnum..."+newnum);
              this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).update({"lastupdatedperson":this.name, "lastupdated":year+"-"+month+"-"+day +" "+hour+":"+min+""})
              this.firemain.child("company").child(this.company).child("roomlist").child(this.a.name).child("roomhistory").child(this.currentstartday).child(this.a.key).child("agasi").child(newnum+"").update({"angel": this.newlist[cca].angel, "roomno":this.a.name, "name":this.newlist[cca].name,"incharge":this.a.incharge, "writer":this.name,"date":year+"-"+month+"-"+day +" "+hour+":"+min});
             }

             
              this.navCtrl.pop();
              setTimeout(()=>{
               this.view.dismiss();
              },500)
            }
          });
          
      modal.present();
        }

      });
    });


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicemodalPage');
  }

}
