import { IonicPage, ViewController,NavController, NavParams } from 'ionic-angular';
import { Component ,ViewChild,Renderer2} from '@angular/core';
import  firebase from 'firebase';
/**
 * Generated class for the AccountingmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountingmodal',
  templateUrl: 'accountingmodal.html',
})
export class AccountingmodalPage {

  @ViewChild('input2') myInput2 ;
  inputname:any="";
  inputcard:any="";
  inputcash:any="";
  accumulus:any=0;
  accumuluswithdraw:any=0;
  year:any="";
  month:any="";
  day:any="";
  selected:any="";
  firemain = firebase.database().ref();
  company:any="";
  flag:any=1;
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    console.log("accountmodal come...")
    this.flag = this.navParams.get("flag");
    console.log("flag : "+this.flag);
    this.year=this.navParams.get("year")
    this.month=this.navParams.get("month")
    this.day=this.navParams.get("day")
    this.selected=this.navParams.get("selected")
    this.company=  localStorage.getItem("company");
    console.log(this.year)
    console.log(this.month)
    console.log(this.day)
    console.log(this.selected)
    console.log(this.selected.name)
    console.log(this.company);
    this.firemain.child("users").child(this.selected.nickname).child("accounting").once("value",snap=>{
      console.log(snap.val());
      if(snap.val()!=null){
        this.accumulus=snap.val().incoming;
        if(this.accumulus==undefined){
          this.accumulus=0;
        }
      }else{
        this.accumulus=0;
      }
      if(snap.val()!=null){
        this.accumuluswithdraw=snap.val().withdraw;
        if(this.accumuluswithdraw==undefined){
          this.accumuluswithdraw=0;
        }
      }else{
        this.accumuluswithdraw=0;
      }
      console.log("user find...")
     console.log(this.accumulus);
     console.log(this.accumuluswithdraw);
    }
    )
  }
  //return the current time in milliseconds
  getNow() {
    return new Date().getTime();
  }
  // return the current time in millise
  getTheCurrentTime() {
    return this.getNow().toString();
    //return new Date(this.getTheCurrentTime()).toString();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountingmodalPage');
  }
  formatInput(event) {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/,/g, ''); // remove existing commas
    inputVal = (+inputVal).toLocaleString(); // add commas
    event.target.value = inputVal; // set formatted value back into input field
    console.log(inputVal);
  }

  onChangeTime(event,v){
console.log("onChangeTime")
    console.log(event.value);
    console.log(event.value.length);
    let inputVal = event.value;
    inputVal = inputVal.replace(/,/g, ''); // remove existing commas
  inputVal = (+inputVal).toLocaleString(); // add commas
  console.log(inputVal);
  event.value=inputVal;
  }

  confirm(){
    if(this.inputname.length==0){
      window.alert("이름은 필수입력입니다.");
      return;
    }
    var dte = new Date();
    var endtime = (dte.getMonth()+1)+"-"+dte.getDate()+" "+dte.getHours()+":"+dte.getMinutes();
    console.log("confirm");
    console.log(this.inputcard)
    console.log(this.inputcash)
    console.log(this.inputname)
    console.log(this.accumulus)
    console.log(this.selected.nickname);
    console.log(this.year+"-"+this.month+"-"+this.day)

    var inputcard =0;
    var inputcash=0;
    if(this.inputcash.length!=0){
      inputcash = Number(this.inputcash.replace(/,/g, ''));
    }
    if(this.inputcard.length!=0){
      inputcard = Number(this.inputcard.replace(/,/g, ''));
    }
    if(this.flag==1){
      
      var inputcard =0;
      var inputcash=0;
      if(this.inputcash.length!=0){
        inputcash = Number(this.inputcash.replace(/,/g, ''));
      }
      if(this.inputcard.length!=0){
        inputcard = Number(this.inputcard.replace(/,/g, ''));
      }

      this.firemain.child("users").child(this.selected.nickname).child("accounting").update({"incoming":Number(this.accumulus)+Number(inputcard)+Number(inputcash) })

      this.firemain.child("users").child(this.selected.nickname).child("accounting").child(this.year+"-"+this.month+"-"+this.day).push({"incoming":Number(this.accumulus)+Number(inputcard)+Number(inputcash) ,"name":this.inputname,"card":inputcard,"cash":inputcash,"year":this.year+"-"+this.month+"-"+this.day,"time":endtime}).then(()=>{
        this.view.dismiss();
        window.alert("입금완료!")
      });
    }else{
      console.log(this.accumuluswithdraw);
      console.log(this.inputcard);
      console.log(this.inputcash);
      var inputcard =0;
      var inputcash=0;
      if(this.inputcash.length!=0){
        inputcash = Number(this.inputcash.replace(/,/g, ''));
      }
      if(this.inputcard.length!=0){
        inputcard = Number(this.inputcard.replace(/,/g, ''));
      }
      // console.log(Number(this.inputcard.replace(/,/g, '')));
      // console.log(Number(this.inputcash.replace(/,/g, '')))
      this.firemain.child("users").child(this.selected.nickname).child("accounting").update({"incoming":this.accumulus-Number(inputcard)-Number(inputcash) });
      this.firemain.child("users").child(this.selected.nickname).child("accounting").update({"withdraw":this.accumuluswithdraw+Number(inputcard)+Number(inputcash) })
    this.firemain.child("users").child(this.selected.nickname).child("accounting").child(this.year+"-"+this.month+"-"+this.day).push({"withdraw":Number(this.accumuluswithdraw)+Number(inputcard)+Number(inputcash) ,"name":this.inputname,"card":inputcard,"cash":inputcash,"year":this.year+"-"+this.month+"-"+this.day,"time":endtime}).then(()=>{
      this.view.dismiss();

      window.alert("출금완료!")
    });
    }
    // this.firemain.child("users").child(this.selected.nickname).child("accounting").update({"incoming":this.accumulus+Number(this.inputcard)+Number(this.inputcash) })
    
  }
  cancel(){

    this.view.dismiss();
  }
}
