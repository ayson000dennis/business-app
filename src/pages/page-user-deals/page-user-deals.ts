import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../service/api.service.component';
import { Storage } from '@ionic/storage';

import { UserScannerPage } from '../page-user-scanner/page-user-scanner';
import { UserRedeemPage } from '../page-user-redeem/page-user-redeem';

import * as $ from "jquery";
import  moment  from 'moment';

@Component({
  selector: 'page-user-deals',
  templateUrl: 'page-user-deals.html'
})

export class UserDealsPage {
  user: string[];
  business_id: any;
  hasData: boolean = false;
  dealsList: any;
  customer : any;
  deal: any;
  customer_first_name: any;
  customer_last_name: any;
  customer_number: any;
  backToScannerTimeout: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api:ApiService,
    private storage: Storage){

      this.business_id = navParams.get('business_id');
      this.customer = navParams.get('customer');

      var self = this;
  }

  goScanner() {
    clearTimeout(this.backToScannerTimeout);
    $('#redeem-modal').hide();
    this.navCtrl.setRoot(UserScannerPage, {}, {
      animate: true,
      direction: 'back'
    });
  }

  ionViewWillEnter() {
    console.log(this.customer)
    this.api.Loyalty.loyalty_list(this.business_id,this.customer).then(users => {
      this.dealsList = users;
      this.hasData = true;
    });

    this.api.Users.user(this.customer).then(user => {
      this.customer = user;
      this.customer_first_name = user.first_name;
      this.customer_last_name = user.last_name;
      this.customer_number = user.number;

      if (this.customer_first_name != ' ' && this.customer_last_name != ' ') {
        $('.customer-name').text(this.customer_first_name + ' ' + this.customer_last_name);
      } else {
        $('.customer-name').text(this.customer_number);
      }
    });
  }

  dateFormat(value) {
    var dateNow = moment(value),
      format = dateNow.format('MMM/D/YYYY'),
      newDateNow = new Date(value),
      getYear = newDateNow.getFullYear();

    format = format.replace("amt", "at");
    format = format.replace("pmt", "at");

    if (getYear == 1970) {
      return '-'
    } else {
      return format;
    }
  }

  Stamp(deal) {
    console.log(deal);
    this.navCtrl.push(UserRedeemPage,{
      deal : deal,
      business_id : this.business_id,
      customer_id : this.customer._id
    }, {
      animate: true,
      direction: 'forward'
    });
  }

  Redeem(deal, $event) {
    this.deal = deal;
    $($event.currentTarget).append('<span class="fa fa-spinner fa-spin"></span>');
    this.api.Loyalty.loyalty_add('0',this.business_id,this.deal._id,this.customer._id,this.deal.is_stamp)
    .then(data => {
      $('.btn-redeem').find('.fa').remove();
      $('.checkins-count').text(data.checkin);
      $('#redeem-modal').fadeIn(250);

      var self = this;
      self.backToScannerTimeout = setTimeout(function() {
        $('#redeem-modal').hide();
        self.navCtrl.setRoot(UserScannerPage, {}, {
          animate: true,
          direction: 'back'
        });
      }, 5250);
    })
    .catch(error =>{
      $('.btn-redeem').find('.fa').remove();
      console.log(error);
    })
  }
}
