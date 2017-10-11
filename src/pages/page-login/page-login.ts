import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SliderPage } from '../page-slider/page-slider';
import { SignupPage } from '../page-signup/page-signup';
import { ResetPassPage } from '../page-reset-pass/page-reset-pass';
import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';
import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-login',
  templateUrl: 'page-login.html'
})

export class LoginPage {
  userData: any;

  posts: {username: string, password: string} = {
    username : '',
    password : ''
  }

  constructor(
    public navCtrl: NavController,
    public http : Http,
    private fb: Facebook,
    private gp: GooglePlus,
    private storage: Storage,
    private api:ApiService) {
  }

  goSlider() {
    this.navCtrl.setRoot(SliderPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goSignup() {
    this.navCtrl.setRoot(SignupPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  fbConnect() {
    var baseUrl = Config.baseUrl;

    this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,email', []).then(profile => {
        this.http.post(baseUrl + 'api/users/login',{email: profile['email'], is_social: '1', permission: '4'}).subscribe(res => {
          this.getUser(res.json());
        }, err => {
          console.log(err);
        });
      });
    }).catch(err => {
      console.log('Error logging into Facebook', err)
    });
  }

  gpConnect() {
    this.gp.login({})
      .then(res => console.log(res))
      .catch(err => console.log('error -- ' + err));
  }

  goReset() {
    this.navCtrl.setRoot(ResetPassPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  logMeIn() {
    var getUser = this.posts.username,
      getPass = this.posts.password,
      baseUrl = Config.baseUrl;

    if ($('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
      $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
    }

    if (getUser && getPass) {
      this.http.post(baseUrl + 'api/users/login',this.posts).subscribe(res => {
        $('.btn-green[type="submit"]').find('.fa-spinner').remove();
        this.getUser(res.json());
      }, err => {
        $('.btn-green[type="submit"]').find('.fa-spinner').remove();
        $('.form-login label').each(function() {
          var thisInput = $(this).find('input'),
            thisInputName = thisInput.attr('name'),
            thisPlaceholder = thisInput.attr('placeholder');

          if (thisInputName == 'username') {
            thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder);
          } else if (thisInputName == 'password') {
            thisInput.addClass('has-error').siblings('.text-validate').text('Invalid Password.');
          }
        });
      });
    } else {
      $('.btn-green[type="submit"]').find('.fa-spinner').remove();
      $('.form-login label').each(function() {
        var thisInput = $(this).find('input'),
          thisInputName = thisInput.attr('name'),
          thisPlaceholder = thisInput.attr('placeholder');

        if (thisInputName == 'username') {
          if (getUser) {
            thisInput.removeClass('has-error').siblings('.text-validate').text();
          } else {
            thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
          }
        } else {
          if (getPass) {
            thisInput.removeClass('has-error').siblings('.text-validate').text();
          } else {
            thisInput.addClass('has-error').siblings('.text-validate').text('Password is required .');
          }
        }
      });
    }
  }

  getUser(token){
   this.api.Users.user(token.user_id).then(user =>{
      this.storage.set('user', user);

       this.navCtrl.setRoot(UserScannerPage, {}, {
            animate: true,
            direction: 'forward'
          });
    })
  }
}
