import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { OrderdetailPage } from '../orderdetail/orderdetail';
import { Orderdetail2Page } from '../orderdetail2/orderdetail2';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  a:any;
  paymentflag:any=false;
  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams) {
    this.a=this.navParams.get("a");

    var login=localStorage.getItem("login_data");
    console.log(login);
    console.log(JSON.parse(login).payment);
    this.paymentflag=JSON.parse(login).payment;
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
  gotopayment(){
    this.navCtrl.push(SignupPage);
  }
  cancelorder(){
    this.navCtrl.push(Orderdetail2Page,{"a":this.a,"flag":"cancel"});
  }
}
