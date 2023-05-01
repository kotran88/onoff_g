import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, ViewController,IonicErrorHandler, IonicModule, NavController} from 'ionic-angular';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginpagePage} from '../pages/loginpage/loginpage'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { IamportCordova } from '@ionic-native/iamport-cordova';
// import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MyApp } from './app.component';
import { initializeApp } from "firebase/app";
import { HttpClientModule } from '@angular/common/http/';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { StarRatingModule } from 'ionic3-star-rating';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { ChatroomlistPage } from '../pages/chatroomlist/chatroomlist';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { SignupPage } from '../pages/signup/signup';
import { ParkingPage } from '../pages/parking/parking';
import { ReceiptPage } from '../pages/receipt/receipt';
import { LongPressModule } from 'ionic-long-press';

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';import { ParkingdetailPage } from '../pages/parkingdetail/parkingdetail';
import { TestpagePage } from '../pages/testpage/testpage';
import { UtilsProvider } from '../providers/utils/utils';
import { DirectorpagePage } from '../pages/directorpage/directorpage';
import { AccountPage } from '../pages/account/account';
import { InfoPage } from '../pages/info/info';
import { InfomodalPage } from '../pages/infomodal/infomodal';
import { EditingroomPage } from '../pages/editingroom/editingroom';
import { AccountingmodalPage } from '../pages/accountingmodal/accountingmodal';
import { OrderPage } from '../pages/order/order';
import { OrderdetailPage } from '../pages/orderdetail/orderdetail';
import { AgasiPage } from '../pages/agasi/agasi';
import { ChoicePage } from '../pages/choice/choice';
import { AgasichoicePage } from '../pages/agasichoice/agasichoice';
import { AttendancePage } from '../pages/attendance/attendance';
import { WtPage } from '../pages/wt/wt';
import { BandPage } from '../pages/band/band';
import { ChoicemodalPage } from '../pages/choicemodal/choicemodal';
import { GongjiPage } from '../pages/gongji/gongji';
import { GongjiwritePage } from '../pages/gongjiwrite/gongjiwrite';
import { OrdermainPage } from '../pages/ordermain/ordermain';
import { Choicemodal2Page } from '../pages/choicemodal2/choicemodal2';
import { Choicemodal3Page } from '../pages/choicemodal3/choicemodal3';
import { ChoicedetailPage } from '../pages/choicedetail/choicedetail';
import { ChoicejimyungPage } from '../pages/choicejimyung/choicejimyung';
import { HistoryPage } from '../pages/history/history';
import { SplashscreenPage } from '../pages/splashscreen/splashscreen';
import { Orderdetail2Page } from '../pages/orderdetail2/orderdetail2';
import { ServinghistoryPage } from '../pages/servinghistory/servinghistory';

var firebaseConfig = {
  apiKey: "AIzaSyB0v0GCI5fBGFT6Scc0efmLy_UgkLRILlc",
  authDomain: "gangnam-6c9f5.firebaseapp.com",
  projectId: "gangnam-6c9f5",
  databaseURL: "https://gangnam-6c9f5-default-rtdb.firebaseio.com",
  storageBucket: "gangnam-6c9f5.appspot.com",
  messagingSenderId: "311863716146",
  appId: "1:311863716146:web:af29d613f47e3077aecf2b",
  measurementId: "G-EVS4KN0VHZ"
};
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginpagePage,
    SplashscreenPage,
    SignupPage,
    GongjiPage,
    TestpagePage,
    ServinghistoryPage,
    AccountPage,
    InfomodalPage,
    OrdermainPage,
    EditingroomPage,
    HistoryPage,
    InfoPage,
    AccountingmodalPage,
    DirectorpagePage,
    OrderdetailPage,
    ParkingPage,
    ParkingdetailPage,
    ReceiptPage,
    AgasiPage,
    ChoicePage,
    OrderPage,
    GongjiwritePage,
    AgasichoicePage,
    Orderdetail2Page,
    WtPage,
    ChoicemodalPage,
    BandPage,
    AttendancePage,
    ChoicedetailPage,
    ChoicejimyungPage,
    Choicemodal2Page,
    Choicemodal3Page,
  ],
  imports: [
    BrowserModule,
    StarRatingModule,
    LongPressModule,HttpClientModule,
    IonicModule.forRoot(MyApp,{
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
      monthShortNames: ['jan', 'fev', 'mar', 'avr', 'mai', 'jui', 'jui', 'aou', 'sep', 'oct', 'nov', 'dec' ],
      dayNames:['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
      dayShortNames:['dim','lun','mar','mer','jeu','ven','sam'],
    }),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginpagePage,
    ChoicedetailPage,
    SplashscreenPage,
    OrdermainPage,
    ChoicemodalPage,
    ChoicejimyungPage,
    ServinghistoryPage,
    Orderdetail2Page,
    Choicemodal3Page,
    Choicemodal2Page,
    GongjiwritePage,
    ChoicePage,
    GongjiPage,
    AgasiPage,
    AgasichoicePage,
    EditingroomPage,
    OrderPage,
    HistoryPage,
    AttendancePage,
    AccountingmodalPage,
    OrderdetailPage,
    WtPage,
    BandPage,
    AccountPage,
    AttendancePage,
    SignupPage,
    InfomodalPage,
    ParkingdetailPage,
    ParkingPage,
    DirectorpagePage,
    TestpagePage,
    InfoPage,
    ReceiptPage,
    // ChatroomlistPage,
  ],
  providers: [
    StatusBar,
    // SplashScreen,
    AppVersion,
    Camera,
    InAppBrowser,
    AngularFireAuth,
    DatePicker,
    PhotoViewer,
    UtilsProvider,HttpModule,
    Keyboard,
    UniqueDeviceID,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
