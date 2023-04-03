import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { OrderdetailPage } from '../orderdetail/orderdetail';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  a:any;
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
    this.a=this.navParams.get("a");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }
  neworder(){
    this.navCtrl.push(OrderdetailPage,{"a":this.a,"flag":"new"}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        if(data.result==true){
          this.view.dismiss();
        }
      })
    });
  }
  moreorder(){
    this.navCtrl.push(OrderdetailPage,{"a":this.a,"flag":"more"}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        if(data==undefined){

        }else{
          if(data.result==true){
            this.view.dismiss();
          }
        }
        

      })
    });
  }
  cancelorder(){
    window.alert("준비중입니다.");
    // this.navCtrl.push(OrderdetailPage,{"a":this.a,"flag":"cancel"});
  }
}
