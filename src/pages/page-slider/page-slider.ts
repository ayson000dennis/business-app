import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { LoginPage } from '../page-login/page-login';
import { SignupPage } from '../page-signup/page-signup';

import * as $ from 'jquery';

@Component({
  selector: 'page-slider',
  templateUrl: 'page-slider.html'
})

export class SliderPage {
  swiper:any;
  @ViewChild('slider') slider: Slides;
  slidesOptions = { initialSlide: 0 }

  constructor(
    public navCtrl: NavController) {
  }

  slideNext(){
    this.slider.slideNext();
  }

  slidePrev(){
    this.slider.slidePrev();
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
      $('.btn-green').trigger('click');
    }
  }
}
