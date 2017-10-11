import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ResetPassPage } from '../page-reset-pass/page-reset-pass';
import { LoginPage } from '../page-login/page-login';

@Component({
  selector: 'page-reset-pass-success',
  templateUrl: 'page-reset-pass-success.html'
})

export class ResetPassSuccessPage {
  constructor(public navCtrl: NavController ){
  }

  goBack() {
    this.navCtrl.setRoot(ResetPassPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goHome() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
    });
  }
}
