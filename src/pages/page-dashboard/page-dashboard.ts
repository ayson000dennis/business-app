import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http }  from '@angular/http';

import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserCustomersPage } from '../page-user-customers/page-user-customers';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { SettingsPage } from '../page-settings/page-settings';

import { SocketService } from "../../providers";
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'page-dashboard.html'
})

export class DashboardPage {
  user : string;
  hasData : boolean = false;
  hasNotify : boolean = false;
  firstname : string;
  notifCount = 0;
  shop_id : any;
  hasShopId : boolean = false;
  shop_name : any;
  notifCountTotal = 0;

  constructor(
    public navCtrl: NavController,
    public http : Http,
    private api:ApiService,
    private storage: Storage,
    public _zone: NgZone,
    public socketService: SocketService,
    private navParams: NavParams) {

    if (this.navParams.get('shop_id')) {
      $('.company-name').text('');
      this.hasShopId = true;
      this.storage.set('shop_id', this.navParams.get('shop_id'));
    }
  }

  ionViewWillEnter() {
    this.socketService.connect();
    this.getNotificationCount();

    this.storage.get('shop_name').then(result => {
      if (result != null) {
        $('.company-name').text(result);
      }
    });

    this.storage.get('user').then(user => {
      this.user = user;
      this.firstname = user.first_name;

      this.storage.get('shop_id').then(res => {
        if (res == null) {
          this.storage.set('shop_id', user.shop_id[0])
          this.shop_id = user.shop_id[0];
        } else {
          this.shop_id = res;
        }

        this.storage.get('shop_name').then(result => {
          if (result == null) {
            this.api.Business.info(this.shop_id).then(data => {
              $('.company-name').text(data.company_name);
              this.storage.set('shop_name', data.company_name);
            });
          }
        });
      });

      this.initInboxNotification();
    });
  }

  getNotificationCount() {

    this.storage.get('user').then(user =>{
      this.user = user;

      if(user.shop_id[0]) {
        this.api.Message.room_list(user.shop_id[0]).then(members => {

          if(members.length) {
            var withChats = [];

            for (var x = 0; x < members.length; x++) {
              if (members[x].last_chat.length >  0 && members[x].last_chat[0].is_read === false && members[x].last_chat[0].message_by !== 'business') {
                withChats.push(members[x]);
              }
            }

            this.notifCountTotal = withChats.length;
            this.hasData = true;

          }

        }).catch((error) => {
            console.log(error);
        });
      } else {

      }

    });
  }

  initInboxNotification() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {

      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.business_id == this.shop_id) {
            this.hasNotify = true;
            this.getNotificationCount();
            // this.notifCount++;
          }

        }).catch((error) => {
            console.log(error);
        });
      });

    });
  }

  ToScanner() {
    this.navCtrl.setRoot(UserScannerPage, {shop_id: this.shop_id}, {
      animate: true,
      direction: 'forward'
    });
  }

  ToCustomers() {
    this.navCtrl.setRoot(UserCustomersPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ToInbox() {
    this.navCtrl.setRoot(UserInboxPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ToSettings() {
    this.navCtrl.setRoot(SettingsPage, {shop_id: this.shop_id}, {
      animate: true,
      direction: 'forward'
    });
  }
}
