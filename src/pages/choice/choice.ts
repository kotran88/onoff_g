import { Component,NgZone } from '@angular/core';
import { IonicPage,ViewController,ModalController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 import  firebase from 'firebase';
import { AgasichoicePage } from '../agasichoice/agasichoice';
@Component({
  selector: 'page-choice',
  templateUrl: 'choice.html',
})
export class ChoicePage {

  mainlist:any = [];
  firemain = firebase.database().ref();
  activeclass='1';
  constructor(public modal:ModalController,public zone:NgZone,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoicePage');
    this.firemain.child('rooms').once('value').then((snap)=>{
      console.log(snap.val())
      for(var a in snap.val()){
        console.log("mmmm")
        for(var b in snap.val()[a]){
          console.log(snap.val()[a][b]);
          this.mainlist.push(snap.val()[a][b]);
        }
      }
    });
  }


  editing(a){
    console.log("editing...")
    console.log(a);
    let modal = this.modal.create(AgasichoicePage,{"a":a});
    modal.onDidDismiss(url => {
      console.log("dismiss !");
    });

    modal.present();
  }
  logout(){
    this.view.dismiss();
  }
      /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
      screenSwitch(e : any) : void {
        if(e.value==3){
         
          setTimeout(()=>{
            for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
            document.getElementById("ion-label-area-" + e.value).style.display = "";
            this.zone.run(()=>{
              this.activeclass=e.value;
              console.log(this.activeclass)
            })
          },500)
        }else{
          for (let i = 1; i <= 2; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
          document.getElementById("ion-label-area-" + e.value).style.display = "";
          this.zone.run(()=>{
      
            this.activeclass=e.value;
            console.log(this.activeclass)
          })
        }
        
      }
}
