import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http }  from '@angular/http'

import { MenuPage } from '../page-menu/page-menu';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';
import { UserAddCustomerPage } from '../page-user-add-customer/page-user-add-customer';
import { UserEditCustomerPage } from '../page-user-edit-customer/page-user-edit-customer';

import * as $ from "jquery";
import { Storage } from '@ionic/storage';
import { ApiService } from '../../service/api.service.component';
import  moment  from 'moment';

import Config from '../../app/config';

@Component({
  selector: 'page-user-customers',
  templateUrl: 'page-user-customers.html'
})

export class UserCustomersPage {
  customersList: any;
  user: string[];
  hasData: boolean = false;
  customerId: any;
  thisFName: any;
  thisLName: any;
  page: any;
  page_size: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private storage: Storage,
    public api: ApiService,
    ) {
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

  dateFormat(value) {
    var dateNow = moment(value),
      format = dateNow.format('MMM D YYYY at h:mm A'),
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

  toggleAccordion($event) {
    var thisElem = $($event.currentTarget).closest('.holder-accordion');

    $(thisElem).toggleClass('show').siblings('.holder-accordion').removeClass('show');
    $('.dropdown-menu').fadeOut('150');
  }

  showDropdown($event) {
    var thisElem = $($event.currentTarget).find('.dropdown-menu'),
      thisIndex = thisElem.closest('.holder-accordion').index();

    this.customerId = this.customersList[thisIndex].user_id[0]._id;
    this.thisFName = this.customersList[thisIndex].user_id[0].first_name,
    this.thisLName = this.customersList[thisIndex].user_id[0].last_name;

    this.getName(this.thisFName,this.thisLName);
    $(thisElem).fadeToggle('150');
    $('.dropdown-menu').not(thisElem).hide();
  }

  getName(fName,lName) {
    $('.name').text(fName + ' ' + lName + '\'s');
  }

  updateModal(modalName) {
    this.openModal('#' + modalName +'-modal');
  }

  updateThis(updateType) {
    $('#btn-' + updateType).append('<span class="fa fa-spinner fa-spin"></span>');

    if (updateType == 'delete') {
      this.api.Users.user_delete(this.customerId).then(res => {
        $('#btn-delete').find('.fa-spin').remove();
        this.closeModal();
        this.ionViewWillEnter();
        $('.success').text('deleted');
        this.openModal('#success-modal');
      }).catch(err => {
        console.log(err);
      })
    } else if (updateType == 'suspend') {
      this.api.Users.user_suspend(this.customerId).then(res => {
        $('#btn-suspend').find('.fa-spin').remove();
        this.closeModal();
        this.ionViewWillEnter();
        $('.success').text('suspended');
        this.openModal('#success-modal');
      }).catch(err => {
        console.log(err);
      })
    }
  }

  openModal(modal) {
    $(modal).fadeIn('150');
  }

  closeModal() {
    $('.confirmation-modal').fadeOut('150');
  }

  ionViewWillEnter() {
    var self = this,
      getInitial,
      getList = function(page, page_size) {
        if(page_size == null || page_size == '0'){
          page_size = '10'
          $('#page_size').val(10);
        }
      self.storage.get('user').then(user => {
        self.user = user;
        self.api.BusinessOwner.list(user.shop_id[0], page, page_size).then(users => {
          self.customersList = users.docs;
          self.hasData = true;

          $('body').find('.fa.loader').remove();

          var getTotalUsers = users.total,
            pageCount = Math.ceil(getTotalUsers / page_size);

          if (pageCount > 1 && $('.holder-pagination').length == 0) {
            $('.page-user-customers .scroll-content').append('<ul class="holder-pagination"></ul>');

            for (var x = 1; x <= pageCount; x++) {
              $('.holder-pagination').append('<li class="pagination-count" data-page="' + x + '">' + x + '</li>');
            }

            $('.pagination-count').eq(0).addClass('active');

            if ($('.pagination-count').length > 9) {
              $('.holder-pagination').append('<li class="dot-last">...</li><li class="clone-pagination">' + $('.pagination-count').length + '</li>');
              $('.holder-pagination').prepend('<li class="clone-pagination hide" data-page="1">1</li><li class="dot-first hide">...</li>');
              $('.pagination-count').eq(4).nextAll('.pagination-count').addClass('hide');
            }
          }

          $('.holder-pagination').show();

        }).catch(err => {
          $('body').find('.fa.loader').remove();
          console.log(err);
        })
      });
    }

    this.page = '1';
    this.page_size = '5';

    getList(this.page, this.page_size);

    $('#page_size').focus(function() {
      getInitial = self.page_size;
    });

    $('#page_size').blur(function() {
      if (getInitial != self.page_size)  {
        $('.holder-pagination').remove();
        self.hasData = false;
        self.page = '1';
        $('.page-user-customers .scroll-content').append('<span class="fa fa-spinner fa-spin loader"></span>');
        getList(self.page, self.page_size);
      }
    });

    $('body').on('click', '.pagination-count' ,function() {
      var getPage = $(this).data('page');

      self.hasData = false;
      $('.pagination-count').not(this).removeClass('active');

      if ($('.pagination-count').length > 9) {
        $('.pagination-count').not(this).addClass('hide');
        $(this).removeClass('hide');
        if (getPage > 3 && getPage < $('.pagination-count').length - 2) {
          for (var x = 1; x < 3; x++) {
            $('.pagination-count[data-page="' + (getPage + x) + '"], .pagination-count[data-page="' + (getPage - x) + '"]').removeClass('hide');
          }
        } else if (getPage < 4) {
          $('.pagination-count[data-page="' + getPage + '"]').prevAll('.pagination-count').removeClass('hide');
          for (var x = 5 - getPage; x >= 1; x--) {
            $('.pagination-count[data-page="' + (getPage + x) + '"]').removeClass('hide');
          }
        } else if (getPage > $('.pagination-count').length - 4) {
          $('.pagination-count[data-page="' + getPage + '"]').nextAll('.pagination-count').removeClass('hide');
          for (var x = getPage; x > $('.pagination-count').length - 4; x--) {
            $('.pagination-count[data-page="' + (x - 1) + '"]').removeClass('hide');
          }
        }

        if ($('.pagination-count[data-page="2"]').hasClass('hide')) {
          $('.clone-pagination:eq(0), .dot-first').removeClass('hide')
        } else {
          $('.clone-pagination:eq(0), .dot-first').addClass('hide');
        }

        if ($('.pagination-count[data-page="' + ($('.pagination-count').length - 1) + '"]').hasClass('hide')) {
          $('.clone-pagination:last-child, .dot-last').removeClass('hide')
        } else {
          $('.clone-pagination:last-child, .dot-last').addClass('hide');
        }
      }

      $(this).addClass('active').closest('.holder-pagination').hide().closest('.scroll-content').prepend('<span class="fa fa-spinner fa-spin loader"></span>');
      getList(getPage, self.page_size);
    });

    $('body').on('click', '.clone-pagination' ,function() {
      if ($(this).index() == 0) {
        $('.pagination-count[data-page="1"]').trigger('click');
      }
      else {
        var paginationCount = $('.pagination-count').length;
        $('.pagination-count').eq(paginationCount - 1).trigger('click');
      }
    });
  }

  goAddUser() {
    this.navCtrl.push(UserAddCustomerPage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  goEditUser() {
    var thisCustomer = this.customerId;

    this.navCtrl.push(UserEditCustomerPage, {thisCustomer}, {
      animate: true,
      direction: 'forward'
    });
  }
}
