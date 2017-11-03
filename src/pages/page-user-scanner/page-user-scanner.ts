import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { MenuPage } from '../page-menu/page-menu';
import { DashboardPage } from '../page-dashboard/page-dashboard';
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
  message :  string;
  areaCode : any;
  shop_id : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private api:ApiService,
    private storage: Storage,
    public platform: Platform){
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goBack() {
    this.navCtrl.setRoot(DashboardPage, {}, {
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

  ionViewWillEnter() {
    var self = this;

    this.storage.get('shop_id').then(res => {
      self.shop_id = res;

      console.log(self.shop_id)

      self.areaCode = 1;
      self.storage.get('user').then(user => {
        self.user = user;
        self.hasData = true;
      });
    });
  }

  ionViewDidLoad() {
    var self = this;
    $('body').on('click', '.country-code, .country-dropdown-val', function() {
      $(this).closest('.holder-country-code').toggleClass('showDropdown');
      console.log('yes');

      if ($(this).hasClass('country-dropdown-val')) {
        var getImg = $(this).find('img').attr('src');
        self.areaCode = $(this).data('area');

        $(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
      }
    });
  }

  ionViewWillLeave() {
    $('body').off('click', '.country-code, .country-dropdown-val');
  }

  SubmitNumber() {
    var mobileRegex = /^[0-9]{10}$/,
      self = this;

    if (this.phone) {
      if (mobileRegex.test(this.phone) == true) {
        this.phone = "+" + this.areaCode + this.phone;

        // console.log(this.phone);
        // if (this.phone.toString().length == 10) {
        //   this.phone = "+1" + this.phone;
        // } else {
        //   this.phone = "+" + this.phone;
        // }

        $('input[name="number"]').removeClass('has-error').siblings('.text-validate').text('');
        $('.btn-orange[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');

        this.storage.get('user').then(user => {
          this.user = user;
          this.api.Business.checker(this.phone, self.shop_id).then(customer => {
            this.api.Users.user(customer.customer.user_id[0]).then(thisCustomer => {
              $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
              if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                this.navCtrl.setRoot(UserRegisterPage, {customer : customer}, {
                  animate: true,
                  direction: 'forward'
                });
              } else {
                this.navCtrl.setRoot(UserDealsPage, {business_id: self.shop_id,customer : customer.customer.user_id[0]}, {
                  animate: true,
                  direction: 'forward'
                });
              }
            });
          }).catch(err => {
            console.log(err);
            var exist = JSON.parse(err['_body']).exist;
            if (exist == 0) {
              var getFName = ' ',
                  getLName = ' ';

              this.api.Business.register(this.phone, self.shop_id,getFName,getLName).then(customer => {
                $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                this.navCtrl.setRoot(UserDealsPage, {business_id: self.shop_id,customer : customer.customer.user_id[0]}, {
                  animate: true,
                  direction: 'forward'
                });
              }).catch(err => {
                $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                $('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number does not exist or invalid.');
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
    var self = this;

    this.barcodeScanner.scan().then(barcodeData => {
      // this.createdCode = barcodeData
      this.createdCode = JSON.parse(barcodeData.text)
      this.storage.get("user").then(user => {
        this.api.Business.scan_qr(this.createdCode.MembershipNumber,user._id,self.shop_id).then(customer =>{
        this.api.Users.user(customer.customer.user_id[0]).then(thisCustomer => {
              $('.btn-orange[type="submit"]').find('.fa-spinner').remove();
              if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                this.navCtrl.setRoot(UserRegisterPage, {customer : customer}, {
                  animate: true,
                  direction: 'forward'
                });
              } else {
                this.navCtrl.setRoot(UserDealsPage, {business_id: self.shop_id,customer : customer.customer.user_id[0]}, {
                  animate: true,
                  direction: 'forward'
                });
              }
            }).catch(function(err){
             this.message = 'Invalid membership code'
           })

      })
    });
    })
  }
}
