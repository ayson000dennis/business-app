import { Component,NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';

import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserCustomersPage } from '../page-user-customers/page-user-customers';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { SettingsPage } from '../page-settings/page-settings';

import {SocketService} from "../../providers";
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

  constructor(
    public navCtrl: NavController,
    public http : Http,
    private api:ApiService,
    private storage: Storage,
    public _zone: NgZone,
    public socketService: SocketService) {
    this.initInboxNotification();

  }

  ionViewWillEnter() {

    this.socketService.connect();

    this.storage.get('user').then(user => {
      this.user = user;
      this.firstname = user.first_name;
      this.hasData = true;
    });
  }

  initInboxNotification() {
    // Get real time message notification
    this.socketService.notify.subscribe((chatNotification) => {

      this._zone.run(() => {
        this.storage.get('user').then(user =>{

          if(chatNotification.business_id == user.shop_id[0]) {
            this.hasNotify = true;
            this.notifCount++;
          }

        }).catch((error) => {
            console.log(error);
        });
      });

    });
  }

  ToScanner() {
    this.navCtrl.setRoot(UserScannerPage, {}, {
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
    this.navCtrl.setRoot(SettingsPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
