import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { DashboardPage } from '../page-dashboard/page-dashboard';
import { LoginPage } from '../page-login/page-login';

import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-settings',
  templateUrl: 'page-settings.html'
})

export class SettingsPage {
  user: any;
  businesses: any;
  shop_id: any;
  hasData: boolean = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private storage: Storage,
    private api: ApiService,
    private navParams: NavParams) {

      this.shop_id = this.navParams.get('shop_id');
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      this.user = user;

      this.api.Business.list(this.user._id, this.user.permission).then(res => {
        $('.loader').remove();
        this.businesses = res.business;
        this.hasData = true;
        console.log(this.businesses);
      })
    });
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

  goDashboard(shop_id) {
    var self = this;

    $('#list-header').find('.label').text('Switching...').append('<span class="fa fa-spinner fa-spin"></span>')
    $('.label span').css('pointer-events', 'none');
    this.api.Business.info(shop_id).then(data => {
      this.storage.set('shop_name', data.company_name);

      setTimeout(function() {
        self.navCtrl.setRoot(DashboardPage, {shop_id}, {
          animate: true,
          direction: 'back'
        });
      }, 500)
    });
  }

  logOut() {
    this.storage.clear();

    this.storage.get('user').then(user => {
      if (user == null) {
        console.log('Storage data successfully cleared! You have been logout.');

        this.navCtrl.push(LoginPage, {}, {
          animate: true,
          direction: 'back'
        });
      } else {
        console.log('Storage data has not been cleared! Something went wrong.');
      }
    }).catch(err => {
      console.log('Oops! Something went wrong.');
      console.log('Error: ' + err);
    });
  }
}
