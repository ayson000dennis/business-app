import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';

import { UserChatPage } from '../page-user-chat/page-user-chat';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

// Chat
import {SocketService} from "../../providers";

import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-user-inbox',
  templateUrl: 'page-user-inbox.html'
})

export class UserInboxPage {
  pages: Array<{title: string, component: any}>;
  membersList: string[];
  user: string[];
  hasData: boolean = false;
  hasNotify : boolean = false;
  message = [];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.init();

    }

  ionViewWillEnter() {
    this.storage.get('user').then(user =>{
      this.user = user;
      console.log(user);

      this.api.Message.member_list(user.shop_id[0]).then(users => {
        this.membersList = users;
        console.log(this.membersList);

        this.hasData = true;
        this.socketService.connect();
        $('body').find('.fa.loader').remove();
      }).catch((error) => {
          console.log(error);
      });

    });
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
  }

  init() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      console.log(chatNotification)

      this._zone.run(() => {

        this.storage.get('user').then(user =>{

          // if(chatNotification.business_id == user.shop_id[0]) {
          //     this.hasNotify = true;
          //     console.log('notify')
          // }

        }).catch((error) => {
            console.log(error);
        });

      });
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  viewMessage(memberDetail,businessDetail) {
    this.navCtrl.push(UserChatPage, {
      animate: true,
      direction: 'forward',
      "memberDetail": memberDetail,
      "businessDetail" : businessDetail
    });
  }
}
