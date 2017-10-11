import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';

import { MenuPage } from '../page-menu/page-menu';
import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import * as $ from "jquery";
import Config from '../../app/config';

@Component({
  selector: 'page-user-redeem',
  templateUrl: 'page-user-redeem.html'
})

export class UserRedeemPage {
  business_id: any;
  customer_id: any;
  customer: any;
  deal: any;
  quantity: any;
  hasData: boolean = false;
  backToScannerTimeout: any;

  constructor(
    public navCtrl: NavController,
    public navParams : NavParams,
    private api:ApiService,
    private storage: Storage) {
  }

  ionViewWillEnter() {
    this.business_id = this.navParams.get('business_id');
    this.customer_id = this.navParams.get('customer_id');
    this.deal = this.navParams.get('deal');
    this.hasData = true;

    $('.title-deal').text(this.deal.template);

    this.api.Users.user(this.customer_id).then(user => {
      this.customer = user;
    });
  }

  ionViewDidEnter() {
    setTimeout(function() {
      $('input[name="quantity"]').focus();
    },250);
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

  goBack() {
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  goScanner() {
    $('.confirmation-modal').hide();
    clearTimeout(this.backToScannerTimeout);
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

  Submit() {
    var getTitle = this.deal.template,
      getBuyPcs = this.deal.buy_pcs,
      getBuyProd = this.deal.buy_product,
      getFreePcs = this.deal.get_pcs,
      getFreeProd = this.deal.get_product == '' ? getBuyProd : this.deal.get_product;

    if (this.quantity) {
      $('#btn-submit').append('<span class="fa fa-spinner fa-spin"></span>');
      $('input[type="number"]').removeClass('has-error').next('.text-validate').text('');
      this.api.Loyalty.loyalty_add(this.quantity,this.business_id,this.deal._id,this.customer_id,this.deal.is_stamp)
      .then(data => {

        $('#btn-submit').find('.fa').remove();
        $('.free-pcs').text(getFreePcs);
        $('.free-prod').text(getFreeProd);

        console.log(parseInt(data.loyalty_details.stamp));
        console.log(parseInt(getBuyPcs));

        if (parseInt(data.loyalty_details.stamp) >= parseInt(getBuyPcs)) {
          $('#complete-modal').fadeIn(250);
        } else {
          // var stampsLeft = parseInt(getBuyPcs) - parseInt(data.loyalty_details.stamp);
          //
          // stampsLeft == 1 ?
          // $('.stamps-left').text(stampsLeft + ' stamp') :
          // $('.stamps-left').text(stampsLeft + ' stamps');

          console.log(this.customer.first_name + ' ' + this.customer.last_name);
          console.log(this.customer.number);

          if (this.customer.first_name != ' ' && this.customer.last_name != ' ') {
            $('.customer-name').text(this.customer.first_name + ' ' + this.customer.last_name);
          } else {
            $('.customer-name').text(this.customer.number);
          }

          this.quantity == 1 ?
          $('.stamps-added').text(this.quantity + ' stamp') :
          $('.stamps-added').text(this.quantity + ' stamps');

          $('#added-modal').fadeIn(250);
        }

        var self = this;
        self.backToScannerTimeout = setTimeout(function() {
          $('.confirmation-modal').hide();
          self.navCtrl.setRoot(UserScannerPage, {}, {
            animate: true,
            direction: 'back'
          });
        }, 5250);
      })
      .catch(error =>{
        $('#btn-submit').find('.fa').remove();
        console.log(error);
      })
    } else {
      $('input[type="number"]').addClass('has-error').next('.text-validate').text('Quantity must be greater than 0');
    }
  }
}
