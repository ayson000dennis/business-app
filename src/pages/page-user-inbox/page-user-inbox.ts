import { Component,NgZone } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';
import { UserChatPage } from '../page-user-chat/page-user-chat';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
import {UtilService} from "../../providers/util.service";
// Chat
import {SocketService} from "../../providers";

import * as $ from "jquery";
import _ from "lodash";

import Config from '../../app/config';

@Component({
  selector: 'page-user-inbox',
  templateUrl: 'page-user-inbox.html'
})

export class UserInboxPage {
  pages: Array<{title: string, component: any}>;
  membersList: string[];
  user: string[];
  hasNotify : boolean = false;
  hasNoData : boolean = false;
  isRefetch : boolean = false;
  inInbox : boolean = true;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    public api: ApiService,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.init();
  }

  ionViewWillEnter() {
    this.socketService.connect();
    this.fetchInboxData();
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.inInbox = false;
  }

  fetchInboxData() {
    // Display all members
    this.storage.get('user').then(user =>{
      this.user = user;

      if(user.shop_id[0]) {
        this.api.Message.room_list(user.shop_id[0]).then(members => {
          console.log('Inbox data fetching....');

          // console.log(members);

          if(members.length) {
            var withChats = [],
              noChats = [];

            for (var x = 0; x < members.length; x++) {
              if (members[x].last_chat.length > 0) {
                withChats.push(members[x]);
              } else {
                noChats.push(members[x]);
              }
            }

            var chatsSort = withChats.sort(function(a, b){
                return b.last_chat[0].epoch - a.last_chat[0].epoch;
            });

            var newChats = withChats;

            noChats.forEach(function(res) {
              newChats.push(res);
            });

            if(!this.isRefetch) {

              this.isRefetch = true;

              console.log('Refetching inbox data...');

              return this.fetchInboxData();
            } else {

              this.membersList = newChats;

              console.log(members)
              $('body').find('.fa.loader').remove();

              console.log('Inbox data loaded');
            }
          } else {
            this.hasNoData = true;
            $('body').find('.fa.loader').remove();
          }

        }).catch((error) => {
            console.log(error);
        });
      } else {
        this.hasNoData = true;
        $('body').find('.fa.loader').remove();
      }

    });
  }

  init() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {

      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.business_id == user.shop_id[0]) {
            console.log('Notification from member');
            this.hasNotify = true;
          }

          if(this.inInbox){
             this.fetchInboxData();
          }

        }).catch((error) => {
            console.log(error);
        });

      });

    });
 }

  formatEpoch(epoch) {
    return UtilService.getCalendarDay(epoch);
  }

  viewMessage(memberDetail,businessDetail) {
      this.navCtrl.push(UserChatPage, {
        animate: true,
        direction: 'forward',
        "memberDetail": memberDetail,
        "businessDetail" : businessDetail
      });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

}
