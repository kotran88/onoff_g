import { Component,NgZone } from '@angular/core';
import {  AlertController,NavController,LoadingController, NavParams, ViewController } from 'ionic-angular';
import  firebase from 'firebase';


import {IamportCordova} from '@ionic-native/iamport-cordova'
import { T } from '@angular/core/src/render3';
import { LoginpagePage } from '../loginpage/loginpage';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  firemain = firebase.database().ref();
  name='';
  usersyoung= "";
  nickname='';
  paytext='월 2,100원 결제하기';
  lloading:any;
  stage=1;
  youngup:any;
  jopanteam:any;
  gaming:any="";
  approvedflag:any = false;
  payment:any=false;
  approved:any=true;
  cellcert:any;dsfs
  residence='';
  sex='';
  young=[];
  jopan=[];
  id='';
  type=1;
  birth_year='';
  password='';
  password2='';
  selectedCompany:any;
  code='';
  phone:any;
  years=[];
  check=[false,false,false];
  pushcheck=true;

  flagflag=false;

  id_checker=false;
  password_checker=false;
  phone_checker=null;
  nick_checker=null;
  companies=[];
  initialize(){
    this.id=null;
    this.stage=1;
    localStorage.setItem("id","")
  }

  initialize2(){
    this.id=null;
    this.stage=1;
    localStorage.setItem("id","")
    this.navCtrl.setRoot(LoginpagePage);
  }
  constructor(public util:UtilsProvider, public zone:NgZone,public loading:LoadingController, public viewCtrl:ViewController,
    public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.firemain.child("company").once('value').then((snap)=>{
      console.log(snap.val())
      for(var a in snap.val()){
        console.log(snap.val())
      //   for(var b in snap.val()[a].younglist){
      //       console.log(snap.val()[a].younglist[b])
      //   }dfss
      //   for(var b in snap.val()[a].jopanlist){
      //     console.log(snap.val()[a].jopanlist[b])
      // }
        this.companies.push({"name":snap.val()[a].groupName,"address":snap.val()[a].address,"jopanlist":snap.val()[a].jopanlist,"younglist":snap.val()[a].younglist});
      }
    });
      // this.id = localStorage.getItem("id");
      // this.nickname = localStorage.getItem("nickname");
      // this.type = Number(localStorage.getItem("type"));
      // console.log(this.nickname)
      // console.log(this.id);
      // console.log(this.type);
      if(this.type==NaN){
        this.stage=1;
        return;

      }
     
      if(this.nickname!=null&&this.nickname!=undefined&&this.nickname.length!=0){
        try{

        // this.firemain.child("users").child(this.nickname).once('value').then((snap)=>{
        //   console.log(snap.val());
        //   if(snap.val()==null){
        //     return;
        //   }

        //   console.log(snap.val().approved);
        //   this.approved=snap.val().approved;
        //   var payment=snap.val().payment;
        //   console.log(payment);
        //   console.log(this.approved);
        //   if(this.approved==false){
        //     this.stage=5;
            
        //   }
        //   if(this.approved==true&&payment==true){
        //     this.stage=1;
        //   }
        //   if(this.approved==false&&payment==true){
        //     window.alert("d")
        //     this.stage=5;
        //   }
        // });
        }catch(e){
          window.alert("error:"+e);
          localStorage.setItem("id","");
          this.navCtrl.pop();
        }
      }else{
        console.log("else come")
      }
     
    

    console.log("result..")
    console.log(this.companies)
  }
  gotonext3(){
    console.log("gotonext...");
    console.log(this.youngup);
    console.log(this.jopanteam);
    this.approved=false;
    this.payment=false;
    if(this.type!=3){
      if(this.youngup==undefined){
        if(this.type==4){
          this.youngup="경리팀";
        }else{
          window.alert("영업팀을 선택해주세요 ");
          return;
        }
       
      }
    }
    

    if(this.jopanteam==undefined){
      if(this.type==4){
        this.jopanteam="경리팀";
      }else{
        window.alert("조판팀을 선택해주세요 ");
        return;
      }
    }

    var value = this.type;

    // this.stage=5;
    var nowdate=this.format_date(new Date())
   localStorage.setItem("type",value+"");
   localStorage.setItem("id",this.id);
   localStorage.setItem("nickname",this.nickname);
   console.log(this.nickname);
   console.log("id"+this.id+"jopan"+this.jopanteam+"pass"+this.password+"ph"+this.phone+"name"+this.name+"registerDate"+nowdate+"nickname"+this.nickname+ "approved"+true+"payment"+false+"company"+this.selectedCompany["name"]);
    if(value==1){
      console.log("부장 승인 요청 ")
      var nowdate=this.format_date(new Date())
      this.firemain.child("users").child(this.nickname).update({"type":"director","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname,"registerDate":nowdate,"approved":true,"payment":false,"company":this.selectedCompany["name"]})
    }else if(value==2){
      console.log("WT 승인 요청 ")
       this.firemain.child("users").child(this.nickname).update({"type":"wt","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname,"registerDate":nowdate,"approved":true,"payment":false,"company":this.selectedCompany["name"]})
    }else if(value==3){
      console.log("아가씨 승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(nowdate);
      this.firemain.child("users").child(this.nickname).update({"type":"agasi","id":this.id,"jopan":this.jopanteam,"pass":this.password,"ph":this.phone,"name":this.name,"registerDate":nowdate,"nickname":this.nickname, "approved":true,"payment":false,"company":this.selectedCompany["name"]})
    }else if(value==4){
      console.log("경리 승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(this.jopanteam)
      this.firemain.child("users").child(this.nickname).update({"type":"kyungri","id":this.id,"jopan":this.jopanteam,"pass":this.password,"ph":this.phone,"name":this.name,"registerDate":nowdate,"nickname":this.nickname, "approved":false,"payment":false,"company":this.selectedCompany["name"]})
    }else if(value==5){
      console.log("주차 승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(this.youngup);
      console.log(this.jopanteam)
      this.firemain.child("users").child(this.nickname).update({"type":"info","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname, "registerDate":nowdate,"payment":false,"approved":true,"company":this.selectedCompany["name"]})
    }else if(value==6){
      console.log("주차 승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(this.youngup);
      console.log(this.jopanteam)
      this.firemain.child("users").child(this.nickname).update({"type":"park","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname, "registerDate":nowdate,"payment":false,"approved":true,"company":this.selectedCompany["name"]})
    }else if(value==7){
      console.log("경리 승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(this.youngup);
      console.log(this.jopanteam)
      this.firemain.child("users").child(this.nickname).update({"type":"band","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname, "registerDate":nowdate,"payment":false,"approved":true,"company":this.selectedCompany["name"]})
    }else if(value==8){
      console.log("관리  승인 요청 ")
      var nowdate=this.format_date(new Date())
      console.log(this.youngup);
      console.log(this.jopanteam)
      this.firemain.child("users").child(this.nickname).update({"type":"admin","young":this.youngup,"jopan":this.jopanteam, "id":this.id,"pass":this.password,"ph":this.phone,"name":this.name,"nickname":this.nickname, "registerDate":nowdate,"payment":false,"approved":true,"company":this.selectedCompany["name"]})
    }else{

      window.alert("else 주차제외 가입 준비중.")
    }
    window.alert("회원가입이 완료되었습니다.");
    this.viewCtrl.dismiss({"result":"success"});




  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  passwordcheck(){
    this.password_checker=false;
    if(this.password===this.password2){
      this.password_checker=true;
    }
  }
  str_format(text, len) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
        text = '0' + text;
    }
    return text;
}
  format_date(d)
{
    var str = "";
    var date = new Date(d);
    // 2022-08-25T17:52:39.629Z
    str  = this.str_format(date.getFullYear(), 4) + '-';
    str += this.str_format(date.getMonth() + 1, 2) + '-';
    str += this.str_format(date.getDate(), 2) + ' ';
    str += this.str_format(date.getHours(), 2) + ':';
    str += this.str_format(date.getMinutes(), 2);

    return str;
}
  uploadToServer(value){
    //결제하기
    console.log(value)
    console.log("uploadtoServer come");
    console.log(this.id);
    this.util.presentLoading();
    // this.firemain.child('users').child(this.id.trim()).update({
    //   payment:true
    // }).then(()=>{

    // localStorage.setItem("id", "" )
    // localStorage.setItem("type", "" )
    //   localStorage.setItem("loginflag", "false" )
    //   window.alert("임시 결제처리완료");
    //   this.navCtrl.setRoot(LoginpagePage)
    // })

    localStorage.setItem("id", "" )
    localStorage.setItem("type", "" )
    localStorage.setItem("nickname", "" )
    this.id="";
    this.password="";
    this.password2="";
      localStorage.setItem("loginflag", "false" )
      window.alert("임시 결제처리완료");
      this.util.dismissLoading();
      this.navCtrl.setRoot(LoginpagePage)
//  var data = {
//         pay_method: 'card',
//         merchant_uid: 'mid_' + new Date().getTime(),
//         name: 'WAD 앱 정기결제',
//         amount: "20000",
//         app_scheme: 'ionickcp',
//         buyer_email: '',
//         buyer_tel: '010-1234-5678',
//         buyer_addr: '서울특별시 강남구 삼성동',
//         buyer_postcode: '123-456',
//         customer_uid: 'cid_' + new Date().getTime()
//       };
  
//       var PaymentObject = {
//         userCode: "imp58611631",
//         data: data,
//         callback: (response) => {
//           console.log(response);
//           if (response.imp_success == "true") {
      
//           }
//         }
//       }
//       IamportCordova.payment(PaymentObject)
//       .then((response) => {
//         window.alert("결제처리완료");
//         this.util.dismissLoading();
//         this.firemain.child('users').child(this.id.trim()).update({
//       payment:true
//     }).then(()=>{

//     localStorage.setItem("id", "" )
//     localStorage.setItem("type", "" )
//       localStorage.setItem("loginflag", "false" )
//       window.alert("임시 결제처리완료");
//       this.navCtrl.setRoot(LoginpagePage)
//     })
//       })
//       .catch((err) => {
//         window.alert("임시 결제처리완료");
//        this.util.dismissLoading();
//         this.firemain.child('users').child(this.id.trim()).update({
//       payment:true
//     }).then(()=>{

//     localStorage.setItem("id", "" )
//     localStorage.setItem("type", "" )
//       localStorage.setItem("loginflag", "false" )
//       window.alert("임시 결제처리완료");
//       this.navCtrl.setRoot(LoginpagePage)
//     })
//       });

    
  }
  checker_roop(n1,n2,val){

    for(var i=n1;i<=n2;i++){
      this.check[i]=val;
    }

    if(this.check[1]===true&&this.check[2]===true&&this.check[3]===true){
      this.check[0]=true;
    }
    else this.check[0]=false;
  }
  selecttype(value){
    console.log(value);
    
    this.type = value;
    if(value==4){
      this.gotonext3();
    }else{
      this.stage=4;
    }
  }
  selectcompany(value){
    console.log(value);
    this.stage=3;
    this.selectedCompany=value;
    console.log(this.companies);
    for(var i=0; i<this.companies.length; i++){
      console.log(this.companies[i]);
      console.log("value is : "+value);
      console.log(value);
      if(this.companies[i].name==value.name){
        console.log(this.companies[i]);
        console.log(this.companies[i].younglist)
        console.log(this.companies[i].jopanlist);
        
        for(var b in this.companies[i].younglist){
          console.log(this.companies[i].younglist[b].name)
          this.young.push(this.companies[i].younglist[b].name);
        }


        for(var b in this.companies[i].jopanlist){
          console.log(this.companies[i].jopanlist[b].name)
          this.jopan.push(this.companies[i].jopanlist[b].name);
        }
        // for(var b in this.companies[i].jopanlist){
        //   console.log(newjopan[b])
        //   if(newjopan[b]!=""){

        //     this.jopan.push(newjopan[b])
        //   }
        // }
      }
    }
    console.log(this.young);
  }
  checker(num){

    if(num===0){
      this.checker_roop(1,3,this.check[0]);
    }
    else if(num===1){
      this.checker_roop(1,1,this.check[1])
    }
    else if(num===2){
      this.checker_roop(2,2,this.check[2])
    }
    else if(num===3){
      this.checker_roop(3,3,this.check[3])
    }
  }

  pushchecker(){
    console.log(this.pushcheck)
    this.pushcheck=!this.pushcheck
    console.log("after change"+this.pushcheck)
  }
  dupul1(){

    console.log(this.nickname)
    if(this.nickname==undefined||this.nickname==""||this.nickname.length==0){
      window.alert("닉네임을 입력해주세요")
      return;
    }
    // this.util.presentLoading();

    this.nick_checker=false;
    console.log("nickname dupulicate check");
    this.firemain.child('users').orderByChild("nickname").equalTo(this.nickname).once("value", (snap) => {
      console.log(snap.val());
      
      if(snap.val()!=null){
        if(snap.val()[this.nickname]!=undefined&&snap.val()[this.nickname].young!=undefined){
          this.usersyoung = snap.val()[this.nickname].young;
        }
        if(snap.val()[this.nickname].ph==undefined){
          //디비에 올라만 가있고 가입은 안되있음. 

          this.nick_checker=false;
          window.alert("사용가능한 닉네임입니다.")
          this.util.dismissLoading();
        }else{

          this.nick_checker=true;
          window.alert("이미 등록된 닉네임입니다!!")
          this.util.dismissLoading();
        }
      }else{
        this.nick_checker=false;
          window.alert("사용가능한 닉네임입니다!")
          this.util.dismissLoading();
      }
      return;
      for(var aabb in snap.val()){
        if(snap.val()[aabb].nickname==this.nickname){
          if(snap.val()[aabb].name!=undefined){
            this.nick_checker=true;
            window.alert("이미 등록된 닉네임입니다")
            this.util.dismissLoading();
          }
        }
      }
      if(!this.nick_checker){
        window.alert("사용가능한 닉네임입니다")
        this.util.dismissLoading();
      }
    });
  }
  dupul2(){
    if(this.phone==undefined||this.phone==""||this.phone.length==0){
      window.alert("휴대전화를 입력해주세요")
      this.util.dismissLoading();
      return;
    }


    this.util.presentLoading();
    this.phone_checker=false;
    console.log("ㅊㅊcell phone dupulicate check");
    this.firemain.child('users').orderByChild("ph").equalTo(this.phone).once("value", (snap) => {
      console.log(snap.val());
      for(var a in snap.val()){
        console.log(a);
      }
      if(snap.val()==null){

        window.alert("사용가능한 번호입니다")
      }else{

        this.phone_checker=true;
        window.alert("이미 등록된 번호입니다.")
        this.util.dismissLoading();
      // }
      // for(var aabb in snap.val()){
      //   if(snap.val()[aabb].ph==this.phone){
      //     return;
      //   }
      // }
      // console.log(this.phone_checker)
      // if(!this.phone_checker){
      //   window.alert("사용가능한 번호입니다")
      }
      this.util.dismissLoading();
    });
    
  }

  // certificate(){
  //   if(this.name==undefined||this.phone==undefined||
  //     this.name==''||this.phone==''){
  //     window.alert("이름과 핸드폰 번호를 입력해주세요")
  //     return;
  //   }
  //   if(this.flagflag===false){
  //     this.flagflag=true;
  //     setTimeout(()=>{
  //       var userCode = 'imp10391932';
  //       var data = {
  //         merchant_uid: 'mid_' + new Date().getTime(),
  //         name:this.name,
  //         phone:this.phone,
  //       };


  //       var params = {
  //         userCode: userCode,                           // 가맹점 식별코드
  //         data: data,                             // 결제 데이터
  //         callback: (response)=> {console.log(response);
  //           console.log(response.imp_success)
  //           if(response.imp_success=="true"){
  //             this.cellcert=true;
  //             window.alert("휴대전화 인증이 완료되었습니다");
  //             this.zone.run(()=>{
               
  //             })
  //           }else{
  //             window.alert(JSON.stringify(response))
  //           }
  //         }, // 콜백 함수
  //       }
  //       IamportCordova.certification(params).catch((e)=>{
  //         window.alert(JSON.stringify(e))
  //       });
  //       this.flagflag=false;
  //     },3000)
  //   }
  // }
  nextstep(){

    this.firemain.child('users').orderByChild("id").equalTo(this.id).once("value", (snap) => {
      if(snap.val()==null){
      }else{
        window.alert("이미 등록된 아이디입니다.")
        return;
      }



    console.log("next step")
    console.log(this.phone_checker)
    console.log(this.nick_checker)
    var regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    var regex3 = /^([가-힣]{2,4}[0-9]{2})$/;

    console.log(this.id)
    console.log(regex3.test(this.id))

    if(regex.test(this.id)===true||this.id.indexOf(' ')!=-1){
      window.alert("아이디에 특수문자와 공백은 사용할수 없습니다.")
      return;
    }
    // else if(!regex3.test(this.id)){
    //   window.alert("형식을 맞춰주세요. (이름:2~4자 생년:2자)")
    //   return;
    // }
    else if(this.id==undefined||this.id==""){
      window.alert("아이디를 입력해주세요")
      return;
    }
    else if(this.name==undefined||this.name==""){
      window.alert("이름을 입력해주세요")
      return;
    }
    else if(this.phone_checker){
      window.alert("휴대폰번호 중복확인해주세요.")
      return;
    }else if(this.nick_checker){
      window.alert("닉네임 요건을 만족하지않았습니다.")
      return;
    }else if(this.nick_checker==null){
      window.alert("닉네임 중복확인해주세요.")
      return;
    }else if(this.phone_checker==null){
      window.alert("휴대폰번호 중복확인해주세요.")
      return;
    }

    var remove_email_check=false;
    console.log("ggggg")
    if(this.phone==undefined||this.phone===''){
      window.alert("휴대폰을 반드시 입력해주세요")
      return;
    }else{
      this.phone=this.phone.split('-');
      if(this.phone[1]===undefined){
        this.phone=this.phone[0];
      }
      else{
        this.phone=this.phone[0]+this.phone[1]+this.phone[2];
      }
    }

    if(this.id!=''&&this.password!=''&&this.phone!=''){
      this.phone_checker=null;
      this.firemain.child('users').once("value", (snap) => {
        console.log(snap.val())
        // for(var id in snap.val()){
        //   console.log("phone is..."+snap.val()[id].phone);
        //   if(snap.val()[id].phone===this.phone){
        //     this.phone_checker=false;
        //   }
        // }
        // if(this.phone_checker===null) {
          console.log("null so ")
          this.phone_checker=true;
          this.passwordcheck();
          this.firemain.child('users').child(this.id).once("value", (snap) => {

            console.log(snap.val())
            if(snap.val()!=null&&snap.numChildren()>1){
              window.alert('이미 존재하는 아이디 입니다.');
              return;
            }
            else if(remove_email_check===true){
              window.alert('생성할수 없는 계정입니다.')
              return;
            }
            else if(this.password_checker===false){
              window.alert('비밀번호가 일치하지 않습니다.');
              return
            }
            else{
              console.log("goto stage 2");
              console.log(this.stage)
              this.stage=2;
            }
          })
        // }else{
        //   // window.alert("이미 존재하는 핸드폰번호입니다. ")
        // }

      }).then(()=>{
        this.passwordcheck();
        this.firemain.child('users').child(this.id).once("value", (snap) => {

          console.log(snap.val())
          if(snap.val()!=null&&snap.numChildren()>1){
            window.alert('이미 존재하는 아이디 입니다.');
            return;
          }
          else if(remove_email_check===true){
            window.alert('생성할수 없는 계정입니다.')
            return;
          }
          else if(this.password_checker===false){
            window.alert('비밀번호가 일치하지 않습니다.');
            return
          }
          else{
            this.stage=2;
          }
        })
      })
    }

    });

    // else if(this.cellcert===false){
    //   window.alert('휴대폰 인증을 완료해주세요');
    // }
    // else {
    //   window.alert('비어있는 공간이 있습니다.');
    // }
  }

  create_account(){
    console.log(this.residence);
    console.log(this.sex);
    console.log(this.id);
    console.log(this.birth_year);
    console.log(this.password);
    console.log(this.password2);
    console.log(this.phone);
    console.log(this.check);
    console.log(this.name);


    if(this.check[1]===false){
      window.alert('이용약관 동의가 필요합니다.');
      return;
    }
    else if(this.check[2]===false){
      window.alert('개인정보 수집 및 이용 동의가 필요합니다.');
      return;
    }
    else if(this.residence===''){
      window.alert('소속본부/지부 를 선택해주세요')
      return;
    }
    else if(this.sex===''){
      window.alert('성별을 선택해주세요.')
      return;
    }
    else if(this.birth_year===''){
      window.alert('출생연도를 선택해주세요.')
      return;
    }
    else{

           this.firemain.child('users').child(this.id.trim()).update({
              id:this.id,
              password:this.password,
              residence:this.residence,
              sex:this.sex,
              name:this.name,
              nickname:this.nickname,
              birth_year:this.birth_year,
              terms:this.check,
              phone:this.phone,
              email:this.id+"@naver.com",
              push:true,
              signup_date:new Date().toISOString(),
            }).then(()=>{
              window.alert('회원가입이 완료되었습니다.  결제를 해야합니다.')
              
              this.viewCtrl.dismiss({"result":"success"});
              
            }).catch(error=>{
              console.log(error);
              alert(error.code);
            })
      // this.firebaseAuth.auth.createUserWithEmailAndPassword(String(this.id.trim())+"@naver.com", this.password).then( (data)=> {

      //   window.alert("auth 생성 완료")
      //   this.firemain.child('user').child(this.id.trim()).update(
      //     {
      //       id:this.id,
      //       password:this.password,
      //       residence:this.residence,
      //       sex:this.sex,
      //       name:this.name,
      //       birth_year:this.birth_year,
      //       terms:this.check,
      //       phone:this.phone,
      //       email:this.id+"@naver.com",
      //       push:true,
      //       signup_date:new Date().toISOString(),
      //     }
      //   ).then(()=>{
      //     window.alert('회원가입이 완료되었습니다.')
      //     this.viewCtrl.dismiss();
      //   })

      // }).catch((error)=>{
      //     console.log(error);
      //     if(error.code==="auth/email-already-in-use"){

      //      this.firemain.child('user').child(this.id.trim()).update({
      //         id:this.id,
      //         password:this.password,
      //         residence:this.residence,
      //         sex:this.sex,
      //         name:this.name,
      //         birth_year:this.birth_year,
      //         terms:this.check,
      //         phone:this.phone,
      //         email:this.id+"@naver.com",
      //         push:true,
      //         signup_date:new Date().toISOString(),
      //       }).then(()=>{
      //         window.alert('회원가입이 완료되었습니다.')
      //         this.viewCtrl.dismiss();
      //       }).catch(error=>{
      //         console.log(error);
      //         alert(error.code);
      //       })
      //     }
      //     else alert("signup failed : " + error);
      // });
    }
  }
}
