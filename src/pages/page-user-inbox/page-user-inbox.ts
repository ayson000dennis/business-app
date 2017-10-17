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
  hasData: boolean = false;
  hasNotify : boolean = false;
  hasLeave : boolean = false;
  hasStartChatId : string;
  hasNewMsgUserId : string;
  messages : string[];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.initNotification();
  }

  ionViewWillEnter() {
    this.socketService.connect();
  }

  ionViewDidLoad() {

    // Display all members
    this.storage.get('user').then(user =>{
      this.user = user;

      this.api.Message.member_list(user.shop_id[0]).then(members => {
        this.membersList = members;
        // console.log(members)

        this.hasData = true;
        this.socketService.connect();
        $('body').find('.fa.loader').remove();

        // members.forEach((member_each) => {
        //
        //   // console.log(member_each);
        //
        //   var room_id = member_each.user_id[0]._id + member_each.business_id[0]._id;
        //   // console.log(room_id)
        //
        //   // GET ALL MESSAGES FROM DATABASE
        //   this.api.Message.fetch_last_chat(room_id).then(chats => {
        //     // if(this.hasLeave){
        //     //   return;
        //     // }
        //
        //     // this.messages.push(chats);
        //
        //     this.messages = chats;
        //     // console.log(chats)
        //
        //   }).catch((error) => {
        //       console.log(error);
        //   });
        //
        //   if(member_each.user_id[0]._id || member_each.business[0]._id) {
        //
        //   } else {
        //     console.log('Business owner Id '+ member_each._id + ' has no member/business data')
        //   }
        //
        // });

      }).catch((error) => {
          console.log(error);
      });

    });

  }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
    this.hasData = false;
  }

  initNotification() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {
      // console.log(chatNotification)
      console.log('Notif from member');

      this._zone.run(() => {

        this.storage.get('user').then(user =>{

          // if(chatNotification.business_id == user.shop_id[0]) {
          //     this.hasNotify = true;
          //     this.hasNewMsgUserId = chatNotification.user_id;
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

  data(user_id,business_id){
    console.log(user_id + business_id)
  }
}
