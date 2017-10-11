import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserCustomersPage } from '../page-user-customers/page-user-customers';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-menu',
  templateUrl: 'page-menu.html'
})

export class MenuPage {
  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController) {

    this.pages = [
      { title: 'scanner', component: UserScannerPage },
      { title: 'customers', component: UserCustomersPage },
      { title: 'inbox', component: UserInboxPage }
    ];
  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component, {}, {
      animate: true,
      direction: 'back'
    });
  }

  logOut() {
    this.navCtrl.push(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }
}
