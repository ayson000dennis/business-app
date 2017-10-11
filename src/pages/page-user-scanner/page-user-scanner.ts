import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MenuPage } from '../page-menu/page-menu';
import { UserRegisterPage } from '../page-user-register/page-user-register';
import { UserDealsPage } from '../page-user-deals/page-user-deals';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import * as $ from "jquery";
import { ApiService } from '../../service/api.service.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-user-scanner',
  templateUrl: 'page-user-scanner.html'
})

export class UserScannerPage {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  user : string[];
  phone : any;
  hasData : boolean = false;
  business : string[];
  message :  string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private api:ApiService,
    private storage: Storage){
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goInbox() {
    this.navCtrl.setRoot(UserInboxPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      this.user = user;
      this.hasData = true;
    });
  }

  SubmitNumber() {
    var mobileRegex = /^[0-9]{3,14}$/;

    if (this.phone) {
      if (mobileRegex.test(this.phone) == true) {
        this.phone = "+" + this.phone;

        $('input[name="number"]').removeClass('has-error').siblings('.text-validate').text('');
        $('.btn-orange[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');

        this.storage.get('user').then(user => {
          this.user = user;
          this.api.Business.checker(this.phone, user._id).then(customer => {

            this.api.Users.user(customer.customer.user_id[0]).then(thisCustomer => {
              $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
              if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                this.navCtrl.setRoot(UserRegisterPage, {customer : customer}, {
                  animate: true,
                  direction: 'forward'
                });
              } else {
                this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0],customer : customer.customer.user_id[0]}, {
                  animate: true,
                  direction: 'forward'
                });
              }
            });
          }).catch(err => {
            var exist = JSON.parse(err['_body']).exist;
            if (exist == 0) {
              var getFName = ' ',
                  getLName = ' ';

              this.api.Business.register(this.phone, user.shop_id[0],getFName,getLName).then(customer => {

                $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0],customer : customer.customer.user_id[0]}, {
                  animate: true,
                  direction: 'forward'
                });
              }).catch(err => {
                $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                console.log(err);
              });
            } else {
              $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
            }
          });
        });
      } else {
        $('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is invalid.');
      }
    } else {
      $('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is required.');
    }
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      // this.createdCode = barcodeData
      this.createdCode = JSON.parse(barcodeData.text)
      this.storage.get("user").then(user => {
        this.api.Business.scan_qr(this.createdCode.MembershipNumber,user._id,user.shop_id[0]).then(customer =>{
        this.navCtrl.setRoot(UserDealsPage, {business_id: user.shop_id[0], customer : customer}, {
              animate: true,
              direction: 'forward'
            });
      })
      .catch(function(err){
          this.message = 'Invalid membership code'
      })
      })

    });
  }
}
