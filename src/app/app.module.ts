import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SliderPage } from '../pages/page-slider/page-slider';
import { LoginPage } from '../pages/page-login/page-login';
import { ResetPassPage } from '../pages/page-reset-pass/page-reset-pass';
import { ResetPassSuccessPage } from '../pages/page-reset-pass-success/page-reset-pass-success';
import { SignupPage } from '../pages/page-signup/page-signup';
import { SignupSuccessPage } from '../pages/page-signup-success/page-signup-success';
import { MenuPage } from '../pages/page-menu/page-menu';
import { UserScannerPage } from '../pages/page-user-scanner/page-user-scanner';
import { UserRegisterPage } from '../pages/page-user-register/page-user-register';
import { UserCustomersPage } from '../pages/page-user-customers/page-user-customers';
import { UserInboxPage } from '../pages/page-user-inbox/page-user-inbox';
import { UserDealsPage } from '../pages/page-user-deals/page-user-deals';
import { UserRedeemPage } from '../pages/page-user-redeem/page-user-redeem';
import { UserAddCustomerPage } from '../pages/page-user-add-customer/page-user-add-customer';
import { UserEditCustomerPage } from '../pages/page-user-edit-customer/page-user-edit-customer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiService } from '../service/api.service.component';
import { IonicStorageModule } from '@ionic/storage';

//chat
import { UserChatPage } from '../pages/page-user-chat/page-user-chat';
import {DatabaseService, SocketService, Sql, UtilService} from "../providers";
import {ElasticTextarea} from "../components/elasticTextarea";
import {ChatBubble} from "../components/chatBubble";
import {Keyboard} from "@ionic-native/keyboard";
import {KeyboardAttachDirective} from "../directives";

@NgModule({
  declarations: [
    MyApp,
    SliderPage,
    LoginPage,
    ResetPassPage,
    ResetPassSuccessPage,
    SignupPage,
    SignupSuccessPage,
    MenuPage,
    UserScannerPage,
    UserRegisterPage,
    UserCustomersPage,
    UserInboxPage,
    UserDealsPage,
    UserRedeemPage,
    UserAddCustomerPage,
    UserEditCustomerPage,
    ElasticTextarea,
    ChatBubble,
    KeyboardAttachDirective,
    UserChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SliderPage,
    LoginPage,
    ResetPassPage,
    ResetPassSuccessPage,
    SignupPage,
    SignupSuccessPage,
    MenuPage,
    UserScannerPage,
    UserRegisterPage,
    UserCustomersPage,
    UserInboxPage,
    UserDealsPage,
    UserRedeemPage,
    UserAddCustomerPage,
    UserEditCustomerPage,
    ElasticTextarea,
    ChatBubble,
    UserChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenOrientation,
    Facebook,
    GooglePlus,
    BarcodeScanner,
    ApiService,
    DatabaseService,
    SocketService,
    UtilService
  ]
})
export class AppModule {}
