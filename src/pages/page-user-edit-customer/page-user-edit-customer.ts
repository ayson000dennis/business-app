import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import * as $ from "jquery";

import Config from '../../app/config';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

@Component({
  selector: 'page-user-edit-customer',
  templateUrl: 'page-user-edit-customer.html'
})

export class UserEditCustomerPage {
  customerId: any;
  backToUsersList: any;
  posts: {first_name: string, last_name: string, number: string, email: string} = {
    first_name : '',
    last_name : '',
    number: '',
    email: ''
  }

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService,
    private navParams: NavParams) {

      this.customerId = navParams.get('thisCustomer');
  }

  ionViewWillEnter() {
    this.api.Users.user(this.customerId).then(thisCustomer => {
      if (thisCustomer.first_name == ' ') {
        thisCustomer.first_name = '';
      } else {
        this.posts.first_name = thisCustomer.first_name;
      }

      if (thisCustomer.last_name == ' ') {
        thisCustomer.last_name = '';
      } else {
        this.posts.last_name = thisCustomer.last_name;
      }
      this.posts.number = thisCustomer.number;
      this.posts.email = thisCustomer.email;
    });
  }

  goBack() {
    clearTimeout(this.backToUsersList);
    $('#edit-modal').hide();
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  saveUser() {
    var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
      mobileRegEx = /^[0-9]{3,14}$/,
      emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.posts.number && this.posts.email) {
      if (nameRegEx.test(this.posts.first_name) == true && nameRegEx.test(this.posts.last_name) == true && mobileRegEx.test(this.posts.number) == true && emailRegEx.test(this.posts.email) == true) {
        if (!this.posts.first_name) {
          var newFName = ' ';
        } else {
          newFName = this.posts.first_name;
        }

        if (!this.posts.last_name) {
          var newLName = ' ';
        } else {
          newLName = this.posts.last_name;
        }

        $('#save-user').append('<span class="fa fa-spinner fa-spin"></span>');
        $('input').removeClass('has-error');

        this.api.Users.user_edit(newFName, newLName, this.posts.number, this.posts.email, this.customerId).then(res => {
          $('#save-user').find('.fa-spin').remove();
          $('#edit-modal').fadeIn('250');

          var self = this;
          self.backToUsersList = setTimeout(function() {
            $('#edit-modal').hide();
            self.navCtrl.pop({
              animate: true,
              direction: 'back'
            });
          }, 5250);
        }).catch(err => {
          console.log(err)
        })
      } else {
        $('#edit-form').find('input').each(function() {
          var thisVal = $(this).val(),
            thisType = $(this).attr('name'),
            thisPlaceholder = $(this).attr('placeholder');

          if (thisType == 'first_name' || thisType == 'last_name') {
            if (nameRegEx.test(thisVal) == true) {
              $(this).removeClass('has-error');
            } else {
              $(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
            }
          } else if (thisType == 'number') {
            if (mobileRegEx.test(thisVal) == true) {
              $(this).removeClass('has-error');
            } else {
              $(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
            }
          } else {
            if (emailRegEx.test(thisVal) == true) {
              $(this).removeClass('has-error');
            } else {
              $(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
            }
          }
        });
      }
    } else {
      $('#edit-form').find('input').not('input[name="first_name"], input[name="last_name"]').each(function() {
        var thisVal = $(this).val(),
          thisPlaceholder = $(this).attr('placeholder');

        if (thisVal.length > 0) {
          $(this).removeClass('has-error');
        } else {
          $(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is required.');
        }
      });
    }
  }
}
