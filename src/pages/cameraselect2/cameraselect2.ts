import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, NavParams,ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


/**
 * Generated class for the CameraselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cameraselect2',
  templateUrl: 'cameraselect2.html',
})
export class Cameraselect2Page {
  // imagePicker:any;
  flag:any;
  constructor(private camera: Camera,public loading:LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {

  }

  // getPhoto(){
  //   console.log("get photo come ");

  //   const options = {
  //     maximumImagesCount: 100,
  //     quality:100,
  //     outputType:1
  //   };
  //   setTimeout(()=>{
  //     // this.ip.getPictures(options).then((results) => {

  //     //   console.log(results);
  //     //   for (var i = 0; i < results.length; i++) {
  //     //       console.log('Image URI: ' + results[i]);
  //     //   }
  //     //   this.viewCtrl.dismiss({"flag":"multi","data":results});
  //     // }, (err) => { console.log(err)});
  //   },1000)
  // }
  // getSinglePhoto(){


  //   const options2: CameraOptions = {
  //     quality: 50,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true
  //   }
  //   const options3 = {
  //     // max images to be selected, defaults to 15. If this is set to 1, upon
  //     // selection of a single image, the plugin will return it.
  //     maximumImagesCount: 100,
  //     quality: 50,
  //     // max width and height to allow the images to be.  Will keep aspect
  //     // ratio no matter what.  So if both are 800, the returned image
  //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
  //     // 800 and height 0 the image will be 800 pixels wide if the source
  //     // is at least that wide.
  //     width: 600,
  //     height: 600,
  //     outputType:1

  //     // quality of resized image, defaults to 100
  //   };
  //   console.log("get photo come!")
  //   this.imagePicker.getPictures(options3).then((results) => {
  //     console.log(results);
  //     if(results[0].length<10) {
  //       this.viewCtrl.dismiss({"flag":"false","data":undefined})
  //     }
  //     for (var i = 0; i < results.length; i++) {
  //         console.log('Image URI: ' + results[i]);
  //     }
  //     this.viewCtrl.dismiss({"flag":"multi","data":results});
  //   }, (err) => {
  //     console.log("err si")
  //     console.log(err)
  //     this.viewCtrl.dismiss({"flag":"false","data":undefined})
  //   });
  // }

  // takePhoto(){
  //   console.log("Take photo!!!!");
  //   try{
  //     const options : CameraOptions={
  //       quality:50,
  //       targetHeight:600,
  //       targetWidth:600,
  //       sourceType: this.camera.PictureSourceType.CAMERA,
  //       destinationType:this.camera.DestinationType.DATA_URL,
  //       encodingType:this.camera.EncodingType.JPEG,
  //       mediaType:this.camera.MediaType.PICTURE,
  //       saveToPhotoAlbum:true
  //     }
  //     const result= this.camera.getPicture(options).then(imagedata=>{
  //       var temp=[];
  //       temp[0]=imagedata;
  //       this.viewCtrl.dismiss({'data':temp,"flag":"multi"});
  //     })
  //   }catch(e){
  //     console.log("error "+e);
  //     this.viewCtrl.dismiss({"flag":"false","data":undefined})
  //   }
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CameraselectPage22222');
  // }
  // confirm(){
  //   this.viewCtrl.dismiss();
  // }

}
