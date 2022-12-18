import { Component } from '@angular/core';
import { IonicPage,ViewController,LoadingController,ModalController, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
/**
 * Generated class for the RequestkoreaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-requestkorea',
  templateUrl: 'requestkorea.html',
})
export class RequestkoreaPage {
  firemain = firebase.database().ref();
  name:any;
  gender:any;
  count:any=0;
  number:any;
  birth:any;
  agencyname:any;
  lloading:any;
  representative:any;
  nationality:any;
  email:any;
  numofimage:any;
  department:any;
  diagnosis:any;
  symptom:any;
  photoarray=[];
  otherinfo:any;
  question:any;
  picdata:any;
  mypicref:any;
  key:any;
  tosendarray=[];
  totalnum:any;

  constructor(public loading:LoadingController,public view:ViewController,public navCtrl: NavController,public modal:ModalController, public navParams: NavParams) {

    var now=new Date();
    // var date='';
    var temp=this.navParams.get("mode");
    // alert(temp);
    console.log(temp);

    this.key=
    this.str_format(4,now.getFullYear())+'-'+
    this.str_format(2,now.getMonth()+1)+'-'+
    this.str_format(2,now.getDate())+'|'+
    this.str_format(2,now.getHours())+':'+
    this.str_format(2,now.getMinutes())+':'+
    this.str_format(2,now.getSeconds())+':'+
    this.str_format(3,now.getMilliseconds());

    // this.key=this.firemain.child("list").push().key;
    this.mypicref=firebase.storage().ref(temp);
    this.firemain.child("notify").once("value",(snap)=>{
      console.log(snap.val())
      for(var a in snap.val()){
        console.log();
        this.tosendarray.push(snap.val()[a].id)
      }
    })

    this.gotouploadphoto();
    // view.dismiss({"url":this.photoarray});
  }

  str_format(len, text) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
      text = '0' + text;
    }
    return text;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  uploadImageToFirebase(image,index){
    console.log("upload iamge to firebase");
    console.log(image);
    this.uploadImage(image,index)
  }
  uploadImage(imageURI,index){
      let storageRef = firebase.storage().ref();
      var result="image"+(index+1);
      console.log(imageURI);
      imageURI=  "data:image/png;base64," + imageURI;
      console.log("sssssssssss : "+result);
      console.log(imageURI);
      console.log("donE!!!!!!!!!!")
          var a = this.mypicref.child(this.key).child(result)
      console.log(this.key);
      console.log(result);
      console.log(a);
      this.encodeImageUri(imageURI, (image64)=>{
        a.putString(image64, 'data_url')
        .then(snapshot => {
          this.mypicref.child(this.key).child(result).getDownloadURL().then((url)=>{
            this.count++;
            console.log("download url is : "+url);
            this.photoarray.push(url);
            if(this.numofimage==this.photoarray.length){
              this.lloading.dismiss()
              window.alert("사진업로드 완료!")
              this.view.dismiss({'data':this.photoarray})
            }


          }).catch((e)=>{
            console.log('eeeee');
            console.log(e);
            if(this.lloading!=undefined){
              this.lloading.dismiss()
            }
          })
        }).catch((e)=>{
          console.log("error is....")
          window.alert(e);
          console.log(e);
          if(this.lloading!=undefined){
            this.lloading.dismiss()
          }
        })
      })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/png");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  gotouploadphoto(){
    console.log("multi shot")
    var value="";

    let modal = this.modal.create(Cameraselect2Page);
    modal.onDidDismiss(imagedata => {

      if(!imagedata){
        this.view.dismiss();
      }
      else if(imagedata.flag==='false'||imagedata.data==='OK'){
        if(imagedata.flag==='false') alert('취소하셨습니다.');
        this.view.dismiss()
      }
      else if(imagedata!=undefined){
        this.numofimage=imagedata.data.length;
        this.lloading = this.loading.create({
          spinner: 'hide',
          content: 'Loading Please Wait...'
        });
        this.lloading.present();
        console.log("retrieved image is : ");
        console.log(imagedata)

        console.log(imagedata);
        if(imagedata.flag=="multi"){
          console.log(imagedata.data);
          this.totalnum=imagedata.data.length;
          if(imagedata.data!=undefined){
            for(var i=0; i<imagedata.data.length; i++){
              console.log("uploading........"+i);
              this.picdata=imagedata.data[i];
              this.uploadImageToFirebase(imagedata.data[i],i);
            }
          }
        }
        else if(imagedata.flag=='single'){
          console.log(imagedata.data);
          this.totalnum=1;
          if(imagedata.data!=undefined){
            console.log("uploading........");
            this.picdata=imagedata.data;
            this.uploadImageToFirebase(imagedata.data,0);
          }
        }
      }
      else{
        if(this.lloading!=undefined){
          this.lloading.dismiss()
        }

        this.view.dismiss();
      }
    });
    modal.present();
  }
}
