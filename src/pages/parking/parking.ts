import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-parking',
  templateUrl: 'parking.html',
})
export class ParkingPage {

  count : number[] = new Array();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 1; i <= 10; i++) {
      this.count.push(i);
    }
  }

  ionViewDidLoad() {
    
  }

  /** 주차현황 탭) 리스트 클릭시 메뉴가 아래로 확장된다. */
  extendedAccordion(tar : number, num : number) : void {
    let panel = document.getElementById("panel-" + tar + "-" + num);
    if (panel.style.display === "block") {
      panel.style.display = "none";
    }
    else {
      panel.style.display = "block";
    }
  }

  /** 탭바 영역 클리시 호출되는 함수) 화면이 바뀐다. */
  screenSwitch(e : any) : void {
    for (let i = 1; i <= 4; i++) { document.getElementById("ion-label-area-" + i).style.display = "none"; }
    document.getElementById("ion-label-area-" + e.value).style.display = "";
  }


}
