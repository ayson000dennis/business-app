import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { SliderPage } from '../pages/page-slider/page-slider';
import { DashboardPage } from '../pages/page-dashboard/page-dashboard';
import { UserScannerPage } from '../pages/page-user-scanner/page-user-scanner';
import { UserCustomersPage } from '../pages/page-user-customers/page-user-customers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Storage } from '@ionic/storage';

//Chat Imports
import { Keyboard } from "@ionic-native/keyboard";
import { DatabaseService } from '../providers/database.service';
import { Sql } from '../providers/sql';
import { SocketService } from '../providers/socket.service';
import { KeyboardAttachDirective } from "../directives";

import * as $ from "jquery";

@Component({
  templateUrl: 'app.html',
  providers: [Keyboard,DatabaseService,Sql,SocketService]
})

export class MyApp {
  @ViewChild('nav') nav: NavController;

  // make SliderPage the root (or first) page
  public rootPage: any;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public screenOrientation: ScreenOrientation,
    public keyboard:Keyboard,
      public storage: Storage
  ) {
    platform.ready().then(() => {
      this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
    });

    this.initializeApp();

    this.storage.get("user").then(user => {
      if(user !== null) {
        this.rootPage = DashboardPage;
      } else {
        this.rootPage = SliderPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
