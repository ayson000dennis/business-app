import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { SignupPage } from '../page-signup/page-signup';

import * as $ from 'jquery';

@Component({
  selector: 'page-slider',
  templateUrl: 'page-slider.html'
})

export class SliderPage {
  constructor(
    public navCtrl: NavController) {
  }

  signUp() {
    this.navCtrl.setRoot(SignupPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  signIn() {
    this.navCtrl.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideNext(slider) {
    if (slider.isEnd()) {
      $('.btn-green-out').trigger('click');
    }
  }
}
