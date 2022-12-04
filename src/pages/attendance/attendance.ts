import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  firebase from 'firebase';
/**
 * Generated class for the AttendancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html',
})
export class AttendancePage {

  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';

  year:any="";
  month:any="";
  day:any="";
  hour:any="";
  min:any="";
  constructor(public zone:NgZone,public navCtrl: NavController, public navParams: NavParams) {
    var date = new Date();

    this.year=date.getFullYear();
    this.month=date.getMonth()+1;
    this.day = date.getDate();
    this.hour = date.getHours();
    this.min = date.getMinutes();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePage');

    console.log('ionViewDidLoad InfoPage');
    for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-1").style.display = "";
        this.zone.run(()=>{
    
          this.activeclass='1'
        })
    this.firemain.child('attendance').once('value').then((snap)=>{
      console.log(snap.val())

    var fulldate = this.year+"-"+this.month+"-"+this.day;
      for(var a in snap.val()){
        console.log(a)
        if(a==fulldate){
          console.log("mmmm")
          for(var b in snap.val()[a]){
            console.log(b);
            console.log(snap.val()[a][b]);
            console.log(snap.val()[a][b].attend.flag);
            if(snap.val()[a][b].attend!=undefined){
              this.mainlist.push({"name":b,"status":snap.val()[a][b].attend.flag,"team":snap.val()[a][b].attend.team});
            }
            if(snap.val()[a][b].noattend!=undefined){
              this.mainlist.push({"name":b,"status":snap.val()[a][b].noattend.flag,"team":snap.val()[a][b].noattend.team});
            }
            
          }
        }
        
      }
    });
  }

    /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
    screenSwitch(e : any) : void {
      if(e.value==3){
       
        setTimeout(()=>{
          for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
            this.activeclass=e.value;
            console.log(this.activeclass)
          })
        },500)
      }else{
        for (let i = 1; i <= 3; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
        document.getElementById("ion-label-area-" + e.value).style.display = "";
        this.zone.run(()=>{
    
          this.activeclass=e.value;
          console.log(this.activeclass)
        })
      }
      
    }
}
