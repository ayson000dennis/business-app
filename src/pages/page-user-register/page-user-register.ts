import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../service/api.service.component';

import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import * as $ from "jquery";
import { Storage } from '@ionic/storage';

import Config from '../../app/config';

@Component({
  selector: 'page-user-register',
  templateUrl: 'page-user-register.html'
})

export class UserRegisterPage {
  user : string[];
  customer: any;
  posts: {first_name: string, last_name: string} = {
    first_name : '',
    last_name : ''
  }

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private api:ApiService,
    private storage: Storage) {

      this.customer = navParams.get('customer');
  }

  goScanner() {
    this.navCtrl.setRoot(UserScannerPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  goInbox() {
    this.navCtrl.setRoot(UserInboxPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  skipMe() {
    this.storage.get('user').then(user => {
      this.user = user;

      this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0], customer: this.customer.customer.user_id[0]}, {
        animate: true,
        direction: 'forward'
      });
    });
  }

  registerMe() {
    var getFName = this.posts.first_name,
      getLName = this.posts.last_name,
      nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;

    if (getFName && getLName) {
      var self = this;

      if (nameRegEx.test(getFName) == true && nameRegEx.test(getLName) == true) {
        $('form input').removeClass('has-error').siblings('.text-validate').text('');
        $('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        this.storage.get('user').then(user => {
          this.user = user;

          this.api.Users.user_name(this.posts.first_name, this.posts.last_name, this.customer.customer.user_id[0]).then(res => {
            $('.btn-green[type="submit"]').find('.fa-spinner').remove();

            this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0],customer : this.customer.customer.user_id[0]}, {
              animate: true,
              direction: 'forward'
            });
          });

          // this.api.Business.register(this.phone, user.shop_id[0],getFName,getLName).then(customer => {
          //   $('.btn-green[type="submit"]').find('.fa-spinner').remove();
          //   console.log(customer)
          //   this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0],customer : customer}, {
          //     animate: true,
          //     direction: 'forward'
          //   });
          // }).catch(err => {
          //   $('.btn-green[type="submit"]').find('.fa-spinner').remove();
          //   console.log(err);
          // });
        });
      } else {
        $('form input').each(function () {
          var thisInput = $(this),
            thisPlaceholder = thisInput.attr('placeholder'),
            thisVal = thisInput.val();

          if (nameRegEx.test(thisVal) == true) {
            thisInput.removeClass('has-error').siblings('.text-validate').text();
          } else {
            thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder + '.');
          }
        });
      }
    } else {
      $('form input').each(function () {
        var thisInput = $(this),
          thisPlaceholder = thisInput.attr('placeholder'),
          thisVal = thisInput.val();

        if (thisVal.length > 0) {
          thisInput.removeClass('has-error').siblings('.text-validate').text();
        } else {
          thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
        }
      });
    }
  }
}
