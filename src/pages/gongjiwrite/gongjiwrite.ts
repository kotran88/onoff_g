import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController ,LoadingController} from 'ionic-angular';
import firebase from 'firebase'

import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestkoreaPage } from '../requestkorea/requestkorea';
/**
 * Generated class for the GongjiwritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gongjiwrite',
  templateUrl: 'gongjiwrite.html',
})
export class GongjiwritePage {

  company:any;
  pushcheck:any=false;
  firemain = firebase.database().ref();
  // list=[{title:'',note:'',date:'',link:'',url:'',imageurl:'',date2:''}];
  temp={title:'',category:'', note:'',date:'',link:'',url:'',imageurl:'',date2:'',key:''};
  name:any;
  link:any;
  // count:any;
  imageurl:'';
  title:any;
  category:any;
  cat:any;
  constructor(public zone:NgZone,public navCtrl: NavController,
      public navParams: NavParams,public viewCtrl:ViewController,
      public modal:ModalController,public loading:LoadingController,
      public camera:Camera,public domSanitizer: DomSanitizer) {
        this.company = localStorage.getItem("company");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main-ArticlePage');
  }

  pick_image(){
    this.imageupload();
  }

  imageupload(){
    console.log("image upload come")
    // alert(this.name);
    let modal = this.modal.create(RequestkoreaPage,{'mode':this.name});
    modal.onDidDismiss(url => {
      if(url!=undefined){
        this.imageurl=url.data;
      }
      console.log("total url is : ");
      console.log(url);

      console.log('imageurl',this.imageurl)
    })
    modal.present();
  }

  photo_viewer(){
    // this.photoViewer.show(this.imageurl);
  }

  save(){
    console.log(this.temp.note);
    var notetosend=this.temp.note;
    this.temp.note=this.temp.note.replace(/ /g, '&nbsp;');


    console.log(this.temp.note);
    console.log('saveeeee come')
    this.temp.url=this.imageurl;
    this.temp.imageurl=this.imageurl;
    this.temp.category = this.cat;
    console.log(this.link);
    this.temp.link=this.link;
    // this.list.push(this.temp);
    console.log(today)
    // console.log("llllist is...."+this.count);
    console.log(this.imageurl)
    // console.log(this.list)


    // console.log(this.list);

    var today=new Date();
    this.temp.key=this.firemain.child("aaa").push().key;
    this.temp.date=new Date().toISOString();
    this.temp.date2=today.getFullYear()+"년 "+(today.getMonth()+1)+"월 "+today.getDate()+"일"

    if(this.temp.url==undefined){this.temp.url="";}
    if(this.temp.link==undefined){this.temp.link="";}
    if(this.temp.imageurl==undefined){this.temp.imageurl="";}

    console.log(this.temp);
    console.log(this.name)
    window.alert(this.company);
    this.firemain.child("company").child(this.company).child("gongji").child(this.temp.key).update(this.temp)
    .then((data)=>{
      console.log(data);
        this.viewCtrl.dismiss({"push":this.pushcheck, "flag": this.name,mode:'update',"title":this.temp.title,"content":this.temp.note,"showcontent":notetosend});
    })
    .catch((err)=>{
      console.log(err);
    })

    // this.firemain.child(this.name).remove().then(()=>{
    //   for(var cnt=0;cnt<=this.count;cnt++){
    //   // if(this.list[cnt].imageurl==undefined){
    //     if(this.list[cnt].url==undefined){
    //       this.list[cnt].url="";
    //     }
    //     if(this.list[cnt].link==undefined){
    //       this.list[cnt].link="";
    //     }
    //     if(cnt===this.count){
    //       var date=new Date();
    //       var date2=date.getFullYear()+"년 "+(date.getMonth()+1)+"월 "+date.getDate()+"일"
    //       this.firemain.child(this.name).child(String(cnt)).update(
    //         {
    //           'title':this.list[cnt].title,
    //           'note':this.list[cnt].note,
    //           'date':date,
    //           'date2':date2,
    //           'imageurl':this.list[cnt].url,
    //           "link":this.list[cnt].link,
    //         }
    //       );
    //     }
    //     else{
    //       this.firemain.child(this.name).child(String(cnt)).update(
    //         {
    //           'title':this.list[cnt].title,
    //           'note':this.list[cnt].note,
    //           'date':this.list[cnt].date,
    //           'date2':this.list[cnt].date2,
    //           'imageurl':this.list[cnt].url,
    //           "link":this.list[cnt].link,
    //         }
    //       );
    //     }
    //   }
    //   setTimeout(()=>{
    //     this.zone.run(()=>{
    //       this.viewCtrl.dismiss({"push":this.pushcheck, "flag": this.name,mode:'update',"title":this.temp.title,"content":this.temp.note});
    //     })
    //   },1000)
    // });
  }

  Dismiss(){
    this.viewCtrl.dismiss();
  }

  checkbox_click(){
    this.pushcheck = !this.pushcheck;
  }
}
