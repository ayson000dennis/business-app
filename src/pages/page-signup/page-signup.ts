import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http }  from '@angular/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { SliderPage } from '../page-slider/page-slider';
import { SignupSuccessPage } from '../page-signup-success/page-signup-success';
import { UserScannerPage } from '../page-user-scanner/page-user-scanner';

import * as $ from "jquery";
import 'rxjs/add/operator/map';

import Config from '../../app/config';

@Component({
  selector: 'page-signup',
  templateUrl: 'page-signup.html'
})

export class SignupPage {
  userData: any;

  posts: {first_name: string, last_name: string, username: string, email: string, password: string, permission: string} = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    permission: '4'
  }

  constructor(
    public navCtrl: NavController,
    public http: Http,
    private fb: Facebook,
    private gp: GooglePlus) {
  }

  goBack() {
    this.navCtrl.setRoot(SliderPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  fbConnect() {
    var baseUrl = Config.baseUrl;

    this.fb.login(['email', 'public_profile']).then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,email', []).then(profile => {
        this.http.post(baseUrl + 'api/users/login',{email: profile['email'], is_social: '1', permission: '4'}).subscribe(res => {
          this.navCtrl.setRoot(UserScannerPage, {}, {
            animate: true,
            direction: 'forward'
          });
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
      .then(res =>
        console.log(res));
        this.navCtrl.setRoot(UserScannerPage, {}, {
          animate: true,
          direction: 'forward'
        })
      .catch(err => console.log('error -- ' + err));
  }

  signMeUp() {
    var getFName = this.posts.first_name,
      getLName = this.posts.last_name,
      getUser = this.posts.username,
      getEmail = this.posts.email,
      getPass = this.posts.password,
      baseUrl = Config.baseUrl;

    var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
      userRegEx = /^[a-zA-Z0-9-_]+$/,
      emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (getFName) {
      if (nameRegEx.test(getFName) == false) {
        $('input[name="first_name"]').addClass('has-error').siblings('.text-validate').text('Invalid First name.');
      } else {
        $('input[name="first_name"]').removeClass('has-error');
      }
    } else {
      $('input[name="first_name"]').addClass('has-error').siblings('.text-validate').text('First name is required.');
    }

    if (getLName) {
      if (nameRegEx.test(getLName) == false) {
        $('input[name="last_name"]').addClass('has-error').siblings('.text-validate').text('Invalid Last name.');
      } else {
        $('input[name="last_name"]').removeClass('has-error');
      }
    } else {
      $('input[name="last_name"]').addClass('has-error').siblings('.text-validate').text('Last name is required.');
    }

    if (getUser) {
      if (userRegEx.test(getUser) == false) {
        $('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Invalid Username');
      } else {
        $('input[name="username"]').removeClass('has-error');
      }
    } else {
      $('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Username is required.');
    }

    if (getEmail) {
      if (emailRegEx.test(getEmail) == false) {
        $('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Invalid Email address.');
      } else {
        $('input[name="email"]').removeClass('has-error');

        if (!$('.form-signup input').not('.form-signup input[name="email"]').hasClass('has-error')) {
          this.http.post(baseUrl + 'api/users/add',this.posts).subscribe(res => {
            console.log(res);
            this.navCtrl.setRoot(SignupSuccessPage, {}, {
              animate: true,
              direction: 'forward'
            });
          }, err => {
            console.log(err.json());
            if(err.json().username == getUser){
              $('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Username already exists');
            }
            if(err.json().email == getEmail){
              $('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email already exists.');
            }
            // console.log(err.json());
          });
        }
      }
    } else {
      $('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email address is required.');
    }

    if (getPass) {
      $('input[name="password"]').removeClass('has-error');
    } else {
      $('input[name="password"]').addClass('has-error');
    }

    // if (!$('.form-signup input').hasClass('has-error')) {
    //   console.log('Success');
    //   this.http.post('' + baseUrl + 'api/users/add',this.posts).subscribe(res => {
    //     console.log(res);
    //     // this.navCtrl.setRoot(SignupSuccessPage, {}, {
    //     //   animate: true,
    //     //   direction: 'forward'
    //     // });
    //   }, err => {
    //     console.log(err);
    //   });
    // }
  }
}
