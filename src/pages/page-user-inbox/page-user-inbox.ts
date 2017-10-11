import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';

import { UserChatPage } from '../page-user-chat/page-user-chat';


import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-user-inbox',
  templateUrl: 'page-user-inbox.html'
})

export class UserInboxPage {
  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController) {
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  viewMessage() {
    this.navCtrl.push(UserChatPage, {
      animate: true,
      direction: 'forward'
    });
  }
}
