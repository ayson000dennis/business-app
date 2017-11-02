import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { DashboardPage } from '../page-dashboard/page-dashboard';
import { LoginPage } from '../page-login/page-login';

import { Storage } from '@ionic/storage';
import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-settings',
  templateUrl: 'page-settings.html'
})

export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storage: Storage) {
  }

  ionViewWillEnter() {

  }

  ComingSoon() {
    const alert = this.alertCtrl.create({
      title: 'Coming Soon',
      subTitle: 'This feature is under construction right now. Check back soon!',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  logOut() {
    this.storage.remove('user');
    this.navCtrl.push(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }
}
