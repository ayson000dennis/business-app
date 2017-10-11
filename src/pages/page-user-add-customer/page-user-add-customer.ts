import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as $ from "jquery";

import Config from '../../app/config';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';

@Component({
  selector: 'page-user-add-customer',
  templateUrl: 'page-user-add-customer.html'
})

export class UserAddCustomerPage {
  user: string[];
  id: any;
  backToUsersList: any;
  posts: {first_name: string, last_name: string, phone: string, email: string, password: string} = {
    first_name : '',
    last_name : '',
    phone: '',
    email: '',
    password : ''
  }

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public api: ApiService) {
  }

  goBack() {
    clearTimeout(this.backToUsersList);
    $('#added-modal').hide();
    this.navCtrl.pop({
      animate: true,
      direction: 'back'
    });
  }

  ionViewWillEnter() {
    this.storage.get('user').then(user => {
      this.id = user._id;
    });
  }

  addUser() {
    $('#add-user').append('<span class="fa fa-spinner fa-spin"></span>');

    this.api.Users.user_add(this.posts.first_name, this.posts.last_name, '+' + this.posts.phone, this.posts.email, this.posts.password, this.id).then(res => {
      $('#add-user').find('.fa-spin').remove();
      $('#added-modal').fadeIn('250');

      var self = this;
      self.backToUsersList = setTimeout(function() {
        $('#added-modal').hide();
        self.navCtrl.pop({
          animate: true,
          direction: 'back'
        });
      }, 5250);
    })
  }
}
