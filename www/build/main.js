webpackJsonp([0],{

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCustomersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_add_customer_page_user_add_customer__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var UserCustomersPage = (function () {
    function UserCustomersPage(navCtrl, navParams, http, storage, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.api = api;
        this.hasData = false;
    }
    UserCustomersPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.dateFormat = function (value) {
        var dateNow = __WEBPACK_IMPORTED_MODULE_10_moment___default()(value), format = dateNow.format('MMM D YYYY at h:mm A'), newDateNow = new Date(value), getYear = newDateNow.getFullYear();
        format = format.replace("amt", "at");
        format = format.replace("pmt", "at");
        if (getYear == 1970) {
            return '-';
        }
        else {
            return format;
        }
    };
    UserCustomersPage.prototype.toggleAccordion = function ($event) {
        var thisElem = __WEBPACK_IMPORTED_MODULE_7_jquery__($event.currentTarget).closest('.holder-accordion');
        __WEBPACK_IMPORTED_MODULE_7_jquery__(thisElem).toggleClass('show').siblings('.holder-accordion').removeClass('show');
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.dropdown-menu').fadeOut('150');
    };
    UserCustomersPage.prototype.showDropdown = function ($event) {
        var thisElem = __WEBPACK_IMPORTED_MODULE_7_jquery__($event.currentTarget).find('.dropdown-menu'), thisIndex = thisElem.closest('.holder-accordion').index();
        this.customerId = this.customersList[thisIndex].user_id[0]._id;
        this.thisFName = this.customersList[thisIndex].user_id[0].first_name,
            this.thisLName = this.customersList[thisIndex].user_id[0].last_name;
        this.getName(this.thisFName, this.thisLName);
        __WEBPACK_IMPORTED_MODULE_7_jquery__(thisElem).fadeToggle('150');
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.dropdown-menu').not(thisElem).hide();
    };
    UserCustomersPage.prototype.getName = function (fName, lName) {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.name').text(fName + ' ' + lName + '\'s');
    };
    UserCustomersPage.prototype.updateModal = function (modalName) {
        this.openModal('#' + modalName + '-modal');
    };
    UserCustomersPage.prototype.updateThis = function (updateType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-' + updateType).append('<span class="fa fa-spinner fa-spin"></span>');
        if (updateType == 'delete') {
            this.api.Users.user_delete(this.customerId).then(function (res) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-delete').find('.fa-spin').remove();
                _this.closeModal();
                _this.ionViewWillEnter();
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.success').text('deleted');
                _this.openModal('#success-modal');
            }).catch(function (err) {
                console.log(err);
            });
        }
        else if (updateType == 'suspend') {
            this.api.Users.user_suspend(this.customerId).then(function (res) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-suspend').find('.fa-spin').remove();
                _this.closeModal();
                _this.ionViewWillEnter();
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.success').text('suspended');
                _this.openModal('#success-modal');
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
    UserCustomersPage.prototype.openModal = function (modal) {
        __WEBPACK_IMPORTED_MODULE_7_jquery__(modal).fadeIn('150');
    };
    UserCustomersPage.prototype.closeModal = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.confirmation-modal').fadeOut('150');
    };
    UserCustomersPage.prototype.ionViewWillEnter = function () {
        var self = this, getInitial, getList = function (page, page_size) {
            self.storage.get('user').then(function (user) {
                self.user = user;
                self.api.BusinessOwner.list(user.shop_id[0], page, page_size).then(function (users) {
                    self.customersList = users.docs;
                    self.hasData = true;
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('body').find('.fa.loader').remove();
                    var getTotalUsers = users.total, pageCount = Math.ceil(getTotalUsers / page_size);
                    if (pageCount > 1 && __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').length == 0) {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.page-user-customers .scroll-content').append('<ul class="holder-pagination"></ul>');
                        for (var x = 1; x <= pageCount; x++) {
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').append('<li class="pagination-count" data-page="' + x + '">' + x + '</li>');
                        }
                    }
                }).catch(function (err) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('body').find('.fa.loader').remove();
                    console.log(err);
                });
            });
        };
        this.page = '1';
        this.page_size = '10';
        getList(this.page, this.page_size);
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#page_size').focus(function () {
            getInitial = self.page_size;
        });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('#page_size').blur(function () {
            if (getInitial != self.page_size) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').remove();
                self.hasData = false;
                self.page = '1';
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.page-user-customers .scroll-content').append('<span class="fa fa-spinner fa-spin loader"></span>');
                getList(self.page, self.page_size);
            }
        });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('body').on('click', '.pagination-count', function () {
            var getPage = __WEBPACK_IMPORTED_MODULE_7_jquery__(this).data('page');
            self.hasData = false;
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.page-user-customers .scroll-content .holder-pagination').prepend('<span class="fa fa-spinner fa-spin loader"></span>');
            getList(getPage, self.page_size);
        });
    };
    UserCustomersPage.prototype.goAddUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.goEditUser = function () {
        var thisCustomer = this.customerId;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */], { thisCustomer: thisCustomer }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserCustomersPage;
}());
UserCustomersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-customers',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-customers\page-user-customers.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="page-user-customers">\n  <p class="title">\n    <!-- <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()"> -->\n    Customers\n    <a class="btn btn-green" href="#" (click)="goAddUser()">Add New</a>\n  </p>\n  <p class="description">\n    Show <input id="page_size" type="number" name="entry" [(ngModel)]="page_size"/> entries\n  </p>\n  <span class="fa fa-spinner fa-spin loader"></span>\n  <div class="holder-list" *ngIf="hasData">\n    <div class="holder-accordion" *ngFor="let customer of customersList">\n      <span class="dropdown" (click)="showDropdown($event)">\n        Actions <span class="fa fa-angle-down"></span>\n        <ul class="dropdown-menu">\n          <li (click)="goEditUser()">Edit</li>\n          <li (click)="updateModal(\'suspend\')" *ngIf="customer.user_id[0].status !== \'2\'">Suspend</li>\n          <li (click)="updateModal(\'delete\')" *ngIf="customer.user_id[0].status !== \'0\'">Delete</li>\n        </ul>\n      </span>\n      <div class="accordion-header" (click)="toggleAccordion($event)">\n        <span *ngIf="customer.user_id[0].first_name != \' \'">{{customer.user_id[0].first_name}}</span> <span *ngIf="customer.user_id[0].last_name != \' \'">{{customer.user_id[0].last_name}}</span>\n        <span *ngIf="customer.user_id[0].first_name == \' \'"><span *ngIf="customer.user_id[0].last_name == \' \'">{{customer.user_id[0].number}}</span></span>\n      </div>\n      <div class="accordion-body">\n        <span class="list-label">Role</span><span class="list-data">{{customer.user_id[0].permission === \'1\' ? \'Administrator\' : customer.user_id[0].permission === \'2\' ? \'Ambassador\' : \'Member\'}}</span>\n        <span class="list-label">Account Type</span><span class="list-data">{{customer.user_id[0].account_type === \'1\' ? \'Member\' : customer.user_id[0].account_type === \'2\' ? \'Business-Essentials\' : \'Premium\'}}</span>\n        <span class="list-label">Status</span><span class="list-data"><span *ngIf="customer.user_id[0].status == \'1\'">Active</span><span class="not-active" *ngIf="customer.user_id[0].status != \'1\'">{{customer.user_id[0].status === \'0\' ? \'Deleted\' : \'Suspended\'}}</span></span>\n        <span class="list-label">Registered Date</span><span class="list-data">{{dateFormat(customer.user_id[0].created_at)}}</span>\n        <span class="list-label">Last Login</span><span class="list-data">{{dateFormat(customer.user_id[0].last_login)}}</span>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<div id="suspend-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Are you sure you want to suspend <span class="name"></span> account?\n    <button id="btn-suspend" class="btn btn-green" (click)="updateThis(\'suspend\')">Yes</button>\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n  </div>\n</div>\n\n<div id="delete-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Are you sure you want to delete <span class="name"></span> account?\n    <button id="btn-delete" class="btn btn-green" (click)="updateThis(\'delete\')">Yes</button>\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n  </div>\n</div>\n\n<div id="success-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully <span class="success"></span>.\n\n    <button class="btn btn-green btn-okay" (click)="closeModal()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-customers\page-user-customers.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */]) === "function" && _e || Object])
], UserCustomersPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=page-user-customers.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SliderPage = (function () {
    function SliderPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SliderPage.prototype.signUp = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.signIn = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    SliderPage.prototype.onSlideNext = function (slider) {
        if (slider.isEnd()) {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('.btn-green-out').trigger('click');
        }
    };
    return SliderPage;
}());
SliderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-slider',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-slider\page-slider.html"*/'<!-- <ion-header no-shadow>\n  <ion-navbar>\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content no-bounce class="page-slider text-center">\n  <ion-slides pager="true" (ionSlideNextStart)="onSlideNext($event)">\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n      <img class="slider-img main-image" src="assets/images/owner-main-image.png" alt="Business Owner Main Image">\n      <p class="main-title">Drive Traffic &amp; Engage Your <br>Customers With The GoPage <br>Platform</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-messages.png" alt="">\n      <p class="subtitle">\n        Communicate in real time with your <br>customers. Target certain customers for <br>products or services you already know <br>they love.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-qrcode.png" alt="">\n      <p class="subtitle">\n        Our digital punch card system allows you to <br>engage and reward your loyal customers, <br>directly impacting traffic, driving sales and <br>profitability.\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-deals.png" alt="">\n      <p class="subtitle">\n        GoPage technology allows you to <br>easily create and deliver deals and<br> specials to customers in your area.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n    </ion-slide>\n  </ion-slides>\n  <!-- <button class="btn-slider btn-green" (click)="signUp()">Get Started</button> -->\n  <button class="btn-slider btn-green-out" (click)="signIn()">Sign In</button>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-slider\page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_redeem_page_user_redeem__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserDealsPage = (function () {
    function UserDealsPage(navCtrl, navParams, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
        this.business_id = navParams.get('business_id');
        this.customer = navParams.get('customer');
        var self = this;
    }
    UserDealsPage.prototype.goScanner = function () {
        clearTimeout(this.backToScannerTimeout);
        __WEBPACK_IMPORTED_MODULE_6_jquery__('#redeem-modal').hide();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserDealsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log(this.customer);
        this.api.Loyalty.loyalty_list(this.business_id, this.customer).then(function (users) {
            _this.dealsList = users;
            _this.hasData = true;
        });
        this.api.Users.user(this.customer).then(function (user) {
            _this.customer = user;
            _this.customer_first_name = user.first_name;
            _this.customer_last_name = user.last_name;
            _this.customer_number = user.number;
            if (_this.customer_first_name != ' ' && _this.customer_last_name != ' ') {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('.customer-name').text(_this.customer_first_name + ' ' + _this.customer_last_name);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('.customer-name').text(_this.customer_number);
            }
        });
    };
    UserDealsPage.prototype.dateFormat = function (value) {
        var dateNow = __WEBPACK_IMPORTED_MODULE_7_moment___default()(value), format = dateNow.format('MMM/D/YYYY'), newDateNow = new Date(value), getYear = newDateNow.getFullYear();
        format = format.replace("amt", "at");
        format = format.replace("pmt", "at");
        if (getYear == 1970) {
            return '-';
        }
        else {
            return format;
        }
    };
    UserDealsPage.prototype.Stamp = function (deal) {
        console.log(deal);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__page_user_redeem_page_user_redeem__["a" /* UserRedeemPage */], {
            deal: deal,
            business_id: this.business_id,
            customer_id: this.customer._id
        }, {
            animate: true,
            direction: 'forward'
        });
    };
    UserDealsPage.prototype.Redeem = function (deal, $event) {
        var _this = this;
        this.deal = deal;
        __WEBPACK_IMPORTED_MODULE_6_jquery__($event.currentTarget).append('<span class="fa fa-spinner fa-spin"></span>');
        this.api.Loyalty.loyalty_add('0', this.business_id, this.deal._id, this.customer._id, this.deal.is_stamp)
            .then(function (data) {
            __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-redeem').find('.fa').remove();
            __WEBPACK_IMPORTED_MODULE_6_jquery__('.checkins-count').text(data.checkin);
            __WEBPACK_IMPORTED_MODULE_6_jquery__('#redeem-modal').fadeIn(250);
            var self = _this;
            self.backToScannerTimeout = setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('#redeem-modal').hide();
                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
                    animate: true,
                    direction: 'back'
                });
            }, 5250);
        })
            .catch(function (error) {
            __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-redeem').find('.fa').remove();
            console.log(error);
        });
    };
    return UserDealsPage;
}());
UserDealsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-deals\page-user-deals.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo.png" alt="">\n    <div class="profile">\n      <img class="profile-img" src="assets/images/img-profile.png" alt="">\n      <span class="fa fa-angle-down"></span>\n    </div>\n    <span class="inbox fa fa-envelope-o"><span class="count-msg">1</span></span>\n  </ion-navbar>\n\n  <ion-list>\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n      <span class="label-{{p.title}}">{{p.title}}</span>\n    </button>\n  </ion-list>\n</ion-header> -->\n\n<ion-content padding>\n  <p class="title" (click)="goScanner()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Scanner\n  </p>\n\n  <div class="holder-list" *ngIf="hasData">\n    <div class="holder-deal" *ngFor="let deals of dealsList">\n      <div class="deal-info">\n        <p class="deal-title">\n           {{deals.template}}\n        </p>\n        <p class="deal-stamp">\n          <span *ngIf="deals.is_stamp == \'1\'">{{deals.stamp}} of {{deals.buy_pcs}}</span>\n        </p>\n        <p class="deal-expire">\n          Expires {{dateFormat(deals.end_date)}}\n        </p>\n      </div>\n      <button (click)="Stamp(deals)" class="btn btn-green" *ngIf="deals.is_stamp == \'1\'">Stamp</button>\n      <button (click)="Redeem(deals, $event)" class="btn btn-green btn-redeem" *ngIf="deals.is_stamp == \'0\'">Redeem</button>\n    </div>\n  </div>\n</ion-content>\n\n<div id="redeem-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    DONE<br />\n    YOUR TOTAL CHECK-INS: <span class="checkins-count"></span><br />\n    THANK YOU! <span class="customer-name"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-deals\page-user-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(285);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(155);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(156);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(743);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(286);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(403);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__socket_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sql; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DB_NAME = '__mojoapp';
var win = window;
var Sql = (function () {
    function Sql(platform) {
        var _this = this;
        this.platform = platform;
        this._dbPromise = new Promise(function (resolve, reject) {
            try {
                var _db_1;
                _this.platform.ready().then(function () {
                    if (_this.platform.is('cordova') && win.sqlitePlugin) {
                        _db_1 = win.sqlitePlugin.openDatabase({
                            name: DB_NAME,
                            location: 'default'
                        });
                    }
                    else {
                        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
                        _db_1 = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
                    }
                    resolve(_db_1);
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
        this._tryInit();
    }
    // Initialize the DB with our required tables
    Sql.prototype._tryInit = function () {
        this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(function (err) {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    };
    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.query = function (query, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return new Promise(function (resolve, reject) {
            try {
                _this._dbPromise.then(function (db) {
                    db.transaction(function (tx) {
                        tx.executeSql(query, params, function (tx, res) { return resolve({ tx: tx, res: res }); }, function (tx, err) { return reject({ tx: tx, err: err }); });
                    }, function (err) { return reject({ err: err }); });
                });
            }
            catch (err) {
                reject({ err: err });
            }
        });
    };
    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.get = function (key) {
        return this.query('select key, value from kv where key = ? limit 1', [key]).then(function (data) {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    };
    /**
     * Set the value in the database for the given key. Existing values will be overwritten.
     * @param {string} key the key
     * @param {string} value The value (as a string)
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.set = function (key, value) {
        return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    };
    Sql.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                throw e; // rethrowing exception so it can be handled with .catch()
            }
        });
    };
    Sql.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    /**
     * Remove the value in the database for the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.remove = function (key) {
        return this.query('delete from kv where key = ?', [key]);
    };
    /**
     * Clear all keys/values of your database.
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    Sql.prototype.clear = function () {
        return this.query('delete from kv');
    };
    return Sql;
}());
Sql = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
], Sql);

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(155);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DatabaseService = (function () {
    function DatabaseService(_db) {
        this._db = _db;
    }
    //Shared getter setter
    DatabaseService.prototype.set = function (key, value) {
        return this._db.set(key, value)
            .then(function () { return true; })
            .catch(function (err) {
            console.error('[Error] Saving ' + key + ' - ' + JSON.stringify(err));
            return false;
        });
    };
    DatabaseService.prototype.get = function (key) {
        return this._db.get(key)
            .then(function (value) {
            if (value) {
                return value;
            }
            else {
                throw new Error('Undefined value');
            }
        })
            .catch(function (err) {
            console.error('[Error] Getting ' + key + ' - ' + JSON.stringify(err));
            return null;
        });
    };
    // remove(key: string): Promise<boolean> {
    //   return this._db.remove(key)
    //     .then(() => true)
    //     .catch(err => {
    //       console.error('[Error] Removing ' + key + ' - ' + JSON.stringify(err));
    //       return false;
    //     });
    // }
    DatabaseService.prototype.getJson = function (key) {
        return this.get(key).then(function (value) {
            try {
                return JSON.parse(value);
            }
            catch (err) {
                console.error('Storage getJson(): unable to parse value for key', key, ' as JSON');
                return null;
            }
        });
    };
    DatabaseService.prototype.setJson = function (key, value) {
        try {
            return this.set(key, JSON.stringify(value));
        }
        catch (err) {
            return Promise.resolve(false);
        }
    };
    return DatabaseService;
}());
DatabaseService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sql__["a" /* Sql */]])
], DatabaseService);

//# sourceMappingURL=database.service.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ResetPassPage = (function () {
    function ResetPassPage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.posts = {
            email: ''
        };
    }
    ResetPassPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassPage.prototype.resetMe = function () {
        var _this = this;
        var getUser = this.posts.email, baseUrl = __WEBPACK_IMPORTED_MODULE_7__app_config__["a" /* default */].baseUrl;
        if (getUser) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset .btn-green').append('<span class="fa fa-spinner fa-spin"></span>');
            this.http.post(baseUrl + 'api/users/sendemail', this.posts).subscribe(function (res) {
                console.log(res);
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset .btn-green').find('.fa').remove();
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */], {}, {
                    animate: true,
                    direction: 'forward'
                });
            }, function (err) {
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset .btn-green').find('.fa').remove();
                __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset label').each(function () {
                    var thisInput = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).find('input');
                    thisInput.addClass('has-error').siblings('.text-validate').text('Invalid user. Are you sure you are registered?');
                });
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('.form-reset label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).find('input');
                thisInput.addClass('has-error').siblings('.text-validate').text('Email address or mobile number is required.');
            });
        }
    };
    return ResetPassPage;
}());
ResetPassPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reset-pass',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-reset-pass\page-reset-pass.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Reset Password\n  </p>\n  <form class="form-reset">\n    <label><input type="email" name="email" placeholder="Email address or Mobile number" [(ngModel)]="posts.email" /><span class="text-validate">Email address is required.</span></label>\n    <button class="btn-green" type="submit" (click)="resetMe()">Send</button>\n  </form>\n  <p class="description text-center">We\'ll email or text your new generated password.<p>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-reset-pass\page-reset-pass.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 172;

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 215;

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_page_signup__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupSuccessPage = (function () {
    function SignupSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SignupSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupSuccessPage.prototype.goLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    return SignupSuccessPage;
}());
SignupSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup-success',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-signup-success\page-signup-success.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Sign Up Success\n  </p>\n  <p class="description text-center">We’ve just emailed you a link. <br>Please check your inbox and confirm your email<p>\n  <a class="btn btn-green text-center" (click)="goLogin()">Okay</a>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-signup-success\page-signup-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], SignupSuccessPage);

//# sourceMappingURL=page-signup-success.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserRegisterPage = (function () {
    function UserRegisterPage(navCtrl, navParams, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.posts = {
            first_name: '',
            last_name: ''
        };
        this.customer = navParams.get('customer');
    }
    UserRegisterPage.prototype.goScanner = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserRegisterPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserRegisterPage.prototype.skipMe = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: _this.customer.customer.user_id[0] }, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    UserRegisterPage.prototype.registerMe = function () {
        var _this = this;
        var getFName = this.posts.first_name, getLName = this.posts.last_name, nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
        if (getFName && getLName) {
            var self = this;
            if (nameRegEx.test(getFName) == true && nameRegEx.test(getLName) == true) {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('form input').removeClass('has-error').siblings('.text-validate').text('');
                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                this.storage.get('user').then(function (user) {
                    _this.user = user;
                    _this.api.Users.user_name(_this.posts.first_name, _this.posts.last_name, _this.customer.customer.user_id[0]).then(function (res) {
                        __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: _this.customer.customer.user_id[0] }, {
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
            }
            else {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('form input').each(function () {
                    var thisInput = __WEBPACK_IMPORTED_MODULE_6_jquery__(this), thisPlaceholder = thisInput.attr('placeholder'), thisVal = thisInput.val();
                    if (nameRegEx.test(thisVal) == true) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder + '.');
                    }
                });
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_jquery__('form input').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_6_jquery__(this), thisPlaceholder = thisInput.attr('placeholder'), thisVal = thisInput.val();
                if (thisVal.length > 0) {
                    thisInput.removeClass('has-error').siblings('.text-validate').text();
                }
                else {
                    thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                }
            });
        }
    };
    return UserRegisterPage;
}());
UserRegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-register',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-register\page-user-register.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding>\n  <p class="title" (click)="goScanner()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Scanner\n  </p>\n\n  <form>\n    <label>\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n      <span class="text-validate"></span>\n    </label>\n    <label>\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n      <span class="text-validate"></span>\n    </label>\n    <button class="btn btn-gray" type="submit" (click)="skipMe()">Skip</button>\n    <button class="btn btn-green" type="submit" (click)="registerMe()">Submit</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-register\page-user-register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], UserRegisterPage);

//# sourceMappingURL=page-user-register.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRedeemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserRedeemPage = (function () {
    function UserRedeemPage(navCtrl, navParams, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.hasData = false;
    }
    UserRedeemPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.business_id = this.navParams.get('business_id');
        this.customer_id = this.navParams.get('customer_id');
        this.deal = this.navParams.get('deal');
        this.hasData = true;
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.title-deal').text(this.deal.template);
        this.api.Users.user(this.customer_id).then(function (user) {
            _this.customer = user;
        });
    };
    UserRedeemPage.prototype.ionViewDidEnter = function () {
        setTimeout(function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('input[name="quantity"]').focus();
        }, 250);
    };
    UserRedeemPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserRedeemPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    UserRedeemPage.prototype.goScanner = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('.confirmation-modal').hide();
        clearTimeout(this.backToScannerTimeout);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserRedeemPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserRedeemPage.prototype.Submit = function () {
        var _this = this;
        var getTitle = this.deal.template, getBuyPcs = this.deal.buy_pcs, getBuyProd = this.deal.buy_product, getFreePcs = this.deal.get_pcs, getFreeProd = this.deal.get_product == '' ? getBuyProd : this.deal.get_product;
        if (this.quantity) {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-submit').append('<span class="fa fa-spinner fa-spin"></span>');
            __WEBPACK_IMPORTED_MODULE_7_jquery__('input[type="number"]').removeClass('has-error').next('.text-validate').text('');
            this.api.Loyalty.loyalty_add(this.quantity, this.business_id, this.deal._id, this.customer_id, this.deal.is_stamp)
                .then(function (data) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-submit').find('.fa').remove();
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.free-pcs').text(getFreePcs);
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.free-prod').text(getFreeProd);
                console.log(parseInt(data.loyalty_details.stamp));
                console.log(parseInt(getBuyPcs));
                if (parseInt(data.loyalty_details.stamp) >= parseInt(getBuyPcs)) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('#complete-modal').fadeIn(250);
                }
                else {
                    // var stampsLeft = parseInt(getBuyPcs) - parseInt(data.loyalty_details.stamp);
                    //
                    // stampsLeft == 1 ?
                    // $('.stamps-left').text(stampsLeft + ' stamp') :
                    // $('.stamps-left').text(stampsLeft + ' stamps');
                    console.log(_this.customer.first_name + ' ' + _this.customer.last_name);
                    console.log(_this.customer.number);
                    if (_this.customer.first_name != ' ' && _this.customer.last_name != ' ') {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.customer-name').text(_this.customer.first_name + ' ' + _this.customer.last_name);
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.customer-name').text(_this.customer.number);
                    }
                    _this.quantity == 1 ?
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.stamps-added').text(_this.quantity + ' stamp') :
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.stamps-added').text(_this.quantity + ' stamps');
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('#added-modal').fadeIn(250);
                }
                var self = _this;
                self.backToScannerTimeout = setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.confirmation-modal').hide();
                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
                        animate: true,
                        direction: 'back'
                    });
                }, 5250);
            })
                .catch(function (error) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('#btn-submit').find('.fa').remove();
                console.log(error);
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('input[type="number"]').addClass('has-error').next('.text-validate').text('Quantity must be greater than 0');
        }
    };
    return UserRedeemPage;
}());
UserRedeemPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-redeem',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-redeem\page-user-redeem.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding>\n  <!-- <p class="title" (click)="goBack()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Deals\n  </p> -->\n\n  <div>\n    <p class="title-deal"></p>\n		<form>\n			<label>\n        <ion-input type="number" name="quantity" placeholder="Enter Quantity" [(ngModel)]="quantity" [ngModelOptions]="{standalone: true}" value="1"></ion-input>\n        <span class="text-validate"></span>\n      </label>\n			<button id="btn-submit" (click)="Submit()" class="btn btn-green">Submit</button>\n		</form>\n	</div>\n</ion-content>\n\n<div id="complete-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    CONGRATULATIONS<br />\n    YOU\'VE EARNED <span class="free-pcs"></span> FREE <span class="free-prod"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n\n<div id="added-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    DONE<br />\n    YOU\'VE GIVEN <span class="stamps-added"></span> TO <br />\n    <span class="customer-name"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-redeem\page-user-redeem.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserRedeemPage);

//# sourceMappingURL=page-user-redeem.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//chat


var UserChatPage = (function () {
    function UserChatPage(navCtrl, _zone, databaseService, socketService) {
        this.navCtrl = navCtrl;
        this._zone = _zone;
        this.databaseService = databaseService;
        this.socketService = socketService;
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["w" /* EventEmitter */]();
        this.messages = [];
        this.chatBox = "";
        this.init();
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        // Get all messages from database
        // this.databaseService.getJson("messages")
        //   .then(messages => {
        //     if (messages) {
        //       this.messages = this.messages.concat(_.sortBy(messages, ['epoch']));
        //     }
        //     this.scrollToBottom();
        //   });
        this.socketService.connect();
    };
    UserChatPage.prototype.init = function () {
        var _this = this;
        // Get real time message response
        this.socketService.messages.subscribe(function (chatMessage) {
            _this._zone.run(function () {
                _this.messages.push(chatMessage);
            });
            _this.scrollToBottom();
        });
    };
    UserChatPage.prototype.sendMessage = function () {
        this.btnEmitter.emit("sent clicked");
        this.txtChat.setFocus();
        var message = this.txtChat.content;
        this.send(message);
        this.txtChat.clearInput();
    };
    UserChatPage.prototype.send = function (message) {
        //todo read email from database
        var from = "van@business.ph";
        var user_type = "business";
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_3__providers__["d" /* UtilService */].formatMessageRequest(message, from, user_type));
        this.chatBox = '';
        this.scrollToBottom();
    };
    UserChatPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
    };
    UserChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            });
        });
    };
    UserChatPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    return UserChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* ViewChild */])('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["n" /* Component */])({
        selector: 'page-user-chat',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-chat\page-user-chat.html"*/'<ion-header>\n  <ion-navbar>\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a> -->\n    <span class=\'title\'>{{ \'Name\' }}</span>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="messages" #content>\n  <ion-list no-lines>\n\n    <ion-item *ngFor="let msg of messages">\n      <chat-bubble [chatMessage]="msg"></chat-bubble>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n\n<ion-footer no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n  <ion-toolbar>\n\n    <ion-item no-lines>\n      <ion-label style="margin:0px;"></ion-label>\n      <div item-content style="width:100%;">\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n      </div>\n    </ion-item>\n\n    <ion-buttons right style="margin-left:10px">\n      <button ion-button icon-only\n              [disabled]="txtChat.content.trim().length<1"\n              (click)="sendMessage()">\n              SEND\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n      </button>\n    </ion-buttons>\n\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-chat\page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_3__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_3__providers__["c" /* SocketService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
var SOCKET_HOST = "http://localhost:8001/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UtilService = (function () {
    function UtilService() {
    }
    UtilService.getEpoch = function () {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()().unix();
    };
    UtilService.getCalendarDay = function (epoch) {
        if (!epoch) {
            return null;
        }
        var timeString = 'h:mm A';
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(epoch * 1000).calendar(null, {
            sameDay: '[Today] ' + timeString,
            lastDay: '[Yesterday] ' + timeString,
            sameElse: 'MM/DD ' + timeString
        });
    };
    UtilService.formatMessageRequest = function (message, from, user_type) {
        return {
            type: 'message_by_business',
            from: from,
            message: message,
            user_type: user_type
        };
    };
    return UtilService;
}());
UtilService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilService);

//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiService = (function () {
    function ApiService(http) {
        var _this = this;
        this.http = http;
        this.Users = {
            user: function (userId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/view/" + userId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_list: function (userId, permission, account_type, page_size) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/list2/" + userId + "/" + permission + "?account_type=" + account_type + "&page=1&page_size=" + page_size).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_delete: function (userId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/delete/" + userId, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_suspend: function (userId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/suspend/" + userId, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_add: function (firstName, lastName, phone, email, password, ownerId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/add/", { first_name: firstName, last_name: lastName, number: phone, email: email, password: password, permission: '3', account_type: '1', status: '1', owner_id: ownerId }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_name: function (firstName, lastName, customerId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/edit/" + customerId, { first_name: firstName, last_name: lastName }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_edit: function (firstName, lastName, phone, email, customerId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/edit/" + customerId, { first_name: firstName, last_name: lastName, number: phone, email: email }).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Business = {
            checker: function (phone, userId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/check_phone/" + phone + "/" + userId, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            register: function (phone, businessId, first_name, last_name) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/send_sms/" + phone + "/" + businessId, { first_name: first_name, last_name: last_name }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            scan_qr: function (MembershipNumber, userId, businessId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/qr_scan/" + MembershipNumber + "/" + userId + "/" + businessId, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Deals = {
            deals_list: function (businessId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/deals/list/" + businessId + '/2').map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Loyalty = {
            loyalty_list: function (businessId, customerId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/loyalties/list/" + customerId + '/' + businessId).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            loyalty_add: function (quantity, businessId, dealId, customerId, isStamp) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/loyalties/add/" + quantity, {
                    business_id: businessId,
                    customer_id: customerId,
                    deals_id: dealId,
                    isStamp: isStamp
                }).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.BusinessOwner = {
            list: function (businessId, page, page_size) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/customer/list/" + businessId + "/?page=" + page + "&page_size=" + page_size).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], ApiService);

var _a;
//# sourceMappingURL=api.service.component.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SocketService = (function () {
    function SocketService(databaseService) {
        var _this = this;
        this.databaseService = databaseService;
        this.messages = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.socketObserver = observer;
        });
        this.init();
    }
    SocketService.prototype.init = function () {
        var _this = this;
        this.socket = __WEBPACK_IMPORTED_MODULE_2_socket_io_client__(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* SOCKET_HOST */], { autoConnect: true });
        this.socket.on("connect", function () {
            console.debug('***Socket Connected***');
        });
        this.socket.on("reconnecting", function (attempt) {
            console.debug('***Socket Reconnecting***', attempt);
        });
        this.socket.on("reconnect_failed", function () {
            console.debug('***Socket Reconnect failed***');
        });
        this.socket.on('disconnect', function () {
            console.debug('***Socket Disconnected***');
        });
        // Get Message Response
        this.socket.on('message_by_member', function (response) {
            var chatMessage = response;
            if (typeof response === 'string') {
                chatMessage = {
                    type: 'message_by_member',
                    from: chatMessage.from,
                    message: chatMessage.message,
                    user_type: chatMessage.user_type
                };
            }
            // console.log(chatMessage);
            chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
            _this.socketObserver.next(chatMessage);
            // this.databaseService.getJson("messages")
            //   .then(messages => {
            //     if (messages === null) {
            //       messages = [];
            //     }
            //     messages.push(chatMessage);
            //     return this.databaseService.setJson("messages", messages);
            //   })
            //   .then(success => {
            //     if (success) {
            //       this.socketObserver.next(chatMessage);
            //     }
            //   });
        });
    };
    SocketService.prototype.newRequest = function (chatMessage) {
        // Send message
        chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
        this.socketObserver.next(chatMessage);
        this.socket.emit('message_send', chatMessage);
        // this.databaseService.getJson("messages")
        //   .then(messages => {
        //     if (!messages) {
        //       messages = [];
        //     }
        //     messages.push(chatMessage);
        //     return this.databaseService.setJson("messages", messages);
        //   })
        //   .then(success => {
        //     if (success) {
        //       this.socketObserver.next(chatMessage);
        //       this.socket.emit(MessageType.MSG_REQ, chatMessage);
        //     }
        //   });
    };
    SocketService.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    SocketService.prototype.connect = function () {
        this.socket.connect();
    };
    return SocketService;
}());
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__database_service__["a" /* DatabaseService */]])
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResetPassSuccessPage = (function () {
    function ResetPassSuccessPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ResetPassSuccessPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__["a" /* ResetPassPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    ResetPassSuccessPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return ResetPassSuccessPage;
}());
ResetPassSuccessPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-reset-pass-success',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Reset Password Success\n  </p>\n  <p class="description text-center">You should receive an email or text from us shortly. <br>We’ll meet you back here.<p>\n  <a class="btn btn-green text-center" (click)="goHome()">Back to Login</a>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], ResetPassSuccessPage);

//# sourceMappingURL=page-reset-pass-success.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAddCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserAddCustomerPage = (function () {
    function UserAddCustomerPage(navCtrl, storage, api) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.api = api;
        this.posts = {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            password: ''
        };
    }
    UserAddCustomerPage.prototype.goBack = function () {
        clearTimeout(this.backToUsersList);
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#added-modal').hide();
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    UserAddCustomerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.id = user._id;
        });
    };
    UserAddCustomerPage.prototype.addUser = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#add-user').append('<span class="fa fa-spinner fa-spin"></span>');
        this.api.Users.user_add(this.posts.first_name, this.posts.last_name, '+' + this.posts.phone, this.posts.email, this.posts.password, this.id).then(function (res) {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#add-user').find('.fa-spin').remove();
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#added-modal').fadeIn('250');
            var self = _this;
            self.backToUsersList = setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#added-modal').hide();
                self.navCtrl.pop({
                    animate: true,
                    direction: 'back'
                });
            }, 5250);
        });
    };
    return UserAddCustomerPage;
}());
UserAddCustomerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-add-customer',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-add-customer\page-user-add-customer.html"*/'<ion-content padding>\n  <p class="title">\n    Add New User\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <form>\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /><span class="text-validate"></span></label>\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /><span class="text-validate"></span></label>\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.phone" /><span class="text-validate"></span></label>\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate"></span></label>\n    <button id="add-user" class="btn btn-green" type="submit" (click)="addUser()">Save</button>\n  </form>\n</ion-content>\n\n<div id="added-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully added.\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-add-customer\page-user-add-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */]])
], UserAddCustomerPage);

//# sourceMappingURL=page-user-add-customer.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserEditCustomerPage = (function () {
    function UserEditCustomerPage(navCtrl, storage, api, navParams) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.api = api;
        this.navParams = navParams;
        this.posts = {
            first_name: '',
            last_name: '',
            number: '',
            email: ''
        };
        this.customerId = navParams.get('thisCustomer');
    }
    UserEditCustomerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.api.Users.user(this.customerId).then(function (thisCustomer) {
            if (thisCustomer.first_name == ' ') {
                thisCustomer.first_name = '';
            }
            else {
                _this.posts.first_name = thisCustomer.first_name;
            }
            if (thisCustomer.last_name == ' ') {
                thisCustomer.last_name = '';
            }
            else {
                _this.posts.last_name = thisCustomer.last_name;
            }
            _this.posts.number = thisCustomer.number;
            _this.posts.email = thisCustomer.email;
        });
    };
    UserEditCustomerPage.prototype.goBack = function () {
        clearTimeout(this.backToUsersList);
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#edit-modal').hide();
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    UserEditCustomerPage.prototype.saveUser = function () {
        var _this = this;
        var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/, mobileRegEx = /^[0-9]{3,14}$/, emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.posts.number && this.posts.email) {
            if (nameRegEx.test(this.posts.first_name) == true && nameRegEx.test(this.posts.last_name) == true && mobileRegEx.test(this.posts.number) == true && emailRegEx.test(this.posts.email) == true) {
                if (!this.posts.first_name) {
                    var newFName = ' ';
                }
                else {
                    newFName = this.posts.first_name;
                }
                if (!this.posts.last_name) {
                    var newLName = ' ';
                }
                else {
                    newLName = this.posts.last_name;
                }
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#save-user').append('<span class="fa fa-spinner fa-spin"></span>');
                __WEBPACK_IMPORTED_MODULE_2_jquery__('input').removeClass('has-error');
                this.api.Users.user_edit(newFName, newLName, this.posts.number, this.posts.email, this.customerId).then(function (res) {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__('#save-user').find('.fa-spin').remove();
                    __WEBPACK_IMPORTED_MODULE_2_jquery__('#edit-modal').fadeIn('250');
                    var self = _this;
                    self.backToUsersList = setTimeout(function () {
                        __WEBPACK_IMPORTED_MODULE_2_jquery__('#edit-modal').hide();
                        self.navCtrl.pop({
                            animate: true,
                            direction: 'back'
                        });
                    }, 5250);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#edit-form').find('input').each(function () {
                    var thisVal = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).val(), thisType = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('name'), thisPlaceholder = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('placeholder');
                    if (thisType == 'first_name' || thisType == 'last_name') {
                        if (nameRegEx.test(thisVal) == true) {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).removeClass('has-error');
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
                        }
                    }
                    else if (thisType == 'number') {
                        if (mobileRegEx.test(thisVal) == true) {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).removeClass('has-error');
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
                        }
                    }
                    else {
                        if (emailRegEx.test(thisVal) == true) {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).removeClass('has-error');
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is invalid.');
                        }
                    }
                });
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#edit-form').find('input').not('input[name="first_name"], input[name="last_name"]').each(function () {
                var thisVal = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).val(), thisPlaceholder = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('placeholder');
                if (thisVal.length > 0) {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).removeClass('has-error');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).addClass('has-error').next('.text-validate').text(thisPlaceholder + ' is required.');
                }
            });
        }
    };
    return UserEditCustomerPage;
}());
UserEditCustomerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-edit-customer',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-edit-customer\page-user-edit-customer.html"*/'<ion-content padding>\n  <p class="title">\n    Edit User\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <form id="edit-form">\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /></label>\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /></label>\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.number" /><span class="text-validate"></span></label>\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n    <button id="save-user" class="btn btn-green" type="submit" (click)="saveUser()">Save</button>\n  </form>\n</ion-content>\n\n<div id="edit-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully updated.\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-edit-customer\page-user-edit-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], UserEditCustomerPage);

//# sourceMappingURL=page-user-edit-customer.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(432);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 432:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_success_page_signup_success__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_user_register_page_user_register__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_user_customers_page_user_customers__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_user_deals_page_user_deals__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_user_redeem_page_user_redeem__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_user_add_customer_page_user_add_customer__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_screen_orientation__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_qrcode2__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_barcode_scanner__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_page_user_chat_page_user_chat__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_elasticTextarea__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_chatBubble__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__directives__ = __webpack_require__(790);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























//chat





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_user_scanner_page_user_scanner__["a" /* UserScannerPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_user_register_page_user_register__["a" /* UserRegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_user_customers_page_user_customers__["a" /* UserCustomersPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_user_redeem_page_user_redeem__["a" /* UserRedeemPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_31__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_32__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_33__directives__["a" /* KeyboardAttachDirective */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_28__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_25_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_user_scanner_page_user_scanner__["a" /* UserScannerPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_user_register_page_user_register__["a" /* UserRegisterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_user_customers_page_user_customers__["a" /* UserCustomersPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_user_redeem_page_user_redeem__["a" /* UserRedeemPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_31__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_32__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_29__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_27__service_api_service_component__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_30__providers__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_30__providers__["c" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_30__providers__["d" /* UtilService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_user_customers_page_user_customers__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_service__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sql__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__ = __webpack_require__(403);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//Chat Imports




var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen, screenOrientation, keyboard) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.screenOrientation = screenOrientation;
        this.keyboard = keyboard;
        // make SliderPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_page_user_customers_page_user_customers__["a" /* UserCustomersPage */];
        platform.ready().then(function () {
            _this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
        });
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\app\app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n\n<!-- <ion-menu [content]="nav">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu> -->\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_7__providers_database_service__["a" /* DatabaseService */], __WEBPACK_IMPORTED_MODULE_8__providers_sql__["a" /* Sql */], __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__["a" /* SocketService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_register_page_user_register__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var UserScannerPage = (function () {
    function UserScannerPage(navCtrl, navParams, barcodeScanner, api, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.api = api;
        this.storage = storage;
        this.qrData = null;
        this.createdCode = null;
        this.scannedCode = null;
        this.hasData = false;
    }
    UserScannerPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserScannerPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserScannerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.hasData = true;
        });
    };
    UserScannerPage.prototype.SubmitNumber = function () {
        var _this = this;
        var mobileRegex = /^[0-9]{3,14}$/;
        if (this.phone) {
            if (mobileRegex.test(this.phone) == true) {
                this.phone = "+" + this.phone;
                __WEBPACK_IMPORTED_MODULE_6_jquery__('input[name="number"]').removeClass('has-error').siblings('.text-validate').text('');
                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                this.storage.get('user').then(function (user) {
                    _this.user = user;
                    _this.api.Business.checker(_this.phone, user._id).then(function (customer) {
                        _this.api.Users.user(customer.customer.user_id[0]).then(function (thisCustomer) {
                            __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                            if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_register_page_user_register__["a" /* UserRegisterPage */], { customer: customer }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: customer.customer.user_id[0] }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }
                        });
                    }).catch(function (err) {
                        var exist = JSON.parse(err['_body']).exist;
                        if (exist == 0) {
                            var getFName = ' ', getLName = ' ';
                            _this.api.Business.register(_this.phone, user.shop_id[0], getFName, getLName).then(function (customer) {
                                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: customer.customer.user_id[0] }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }).catch(function (err) {
                                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                console.log(err);
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                        }
                    });
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is invalid.');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is required.');
        }
    };
    UserScannerPage.prototype.scanCode = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // this.createdCode = barcodeData
            _this.createdCode = JSON.parse(barcodeData.text);
            _this.storage.get("user").then(function (user) {
                _this.api.Business.scan_qr(_this.createdCode.MembershipNumber, user._id, user.shop_id[0]).then(function (customer) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: customer }, {
                        animate: true,
                        direction: 'forward'
                    });
                })
                    .catch(function (err) {
                    this.message = 'Invalid membership code';
                });
            });
        });
    };
    return UserScannerPage;
}());
UserScannerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-scanner',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-scanner\page-user-scanner.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <a class="btn btn-green" (click)="scanCode()">Scan QR Code</a>\n  <span>{{message}}</span>\n  <div class="divider">\n    <span>or</span>\n  </div>\n  <form class="form-mobile">\n    <label>\n      <input type="number" [(ngModel)]="phone" name="number" placeholder="Mobile number" />\n      <span class="text-validate"></span>\n\n    </label>\n    <button class="btn btn-orange" (click)="SubmitNumber()" type="submit">Submit</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-scanner\page-user-scanner.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
], UserScannerPage);

//# sourceMappingURL=page-user-scanner.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MenuPage = (function () {
    function MenuPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.pages = [
            { title: 'scanner', component: __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */] },
            { title: 'customers', component: __WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__["a" /* UserCustomersPage */] },
            { title: 'inbox', component: __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */] }
        ];
    }
    MenuPage.prototype.goBack = function () {
        this.navCtrl.pop({
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.openPage = function (page) {
        this.navCtrl.setRoot(page.component, {}, {
            animate: true,
            direction: 'back'
        });
    };
    MenuPage.prototype.logOut = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_login_page_login__["a" /* LoginPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-menu\page-menu.html"*/'<ion-content padding class="content-page-menu">\n  <p class="title">\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <ion-list class="menu-list">\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n      <span class="label-{{p.title}}">{{p.title}}</span>\n    </button>\n  </ion-list>\n\n  <hr class="divider" />\n  <a class="logout" href="#" (click)="logOut()">Logout</a>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-menu\page-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], MenuPage);

//# sourceMappingURL=page-menu.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_page_signup__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_config__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var LoginPage = (function () {
    function LoginPage(navCtrl, http, fb, gp, storage, api) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.storage = storage;
        this.api = api;
        this.posts = {
            username: '',
            password: ''
        };
    }
    LoginPage.prototype.goSlider = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__["a" /* SliderPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    LoginPage.prototype.goSignup = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_signup_page_signup__["a" /* SignupPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    LoginPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_13__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '4' }).subscribe(function (res) {
                    _this.getUser(res.json());
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    LoginPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) { return console.log(res); })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    LoginPage.prototype.goReset = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__["a" /* ResetPassPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    LoginPage.prototype.logMeIn = function () {
        var _this = this;
        var getUser = this.posts.username, getPass = this.posts.password, baseUrl = __WEBPACK_IMPORTED_MODULE_13__app_config__["a" /* default */].baseUrl;
        if (__WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser && getPass) {
            this.http.post(baseUrl + 'api/users/login', this.posts).subscribe(function (res) {
                __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                _this.getUser(res.json());
            }, function (err) {
                __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                __WEBPACK_IMPORTED_MODULE_11_jquery__('.form-login label').each(function () {
                    var thisInput = __WEBPACK_IMPORTED_MODULE_11_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                    if (thisInputName == 'username') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid ' + thisPlaceholder);
                    }
                    else if (thisInputName == 'password') {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Invalid Password.');
                    }
                });
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.form-login label').each(function () {
                var thisInput = __WEBPACK_IMPORTED_MODULE_11_jquery__(this).find('input'), thisInputName = thisInput.attr('name'), thisPlaceholder = thisInput.attr('placeholder');
                if (thisInputName == 'username') {
                    if (getUser) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text(thisPlaceholder + ' is required.');
                    }
                }
                else {
                    if (getPass) {
                        thisInput.removeClass('has-error').siblings('.text-validate').text();
                    }
                    else {
                        thisInput.addClass('has-error').siblings('.text-validate').text('Password is required .');
                    }
                }
            });
        }
    };
    LoginPage.prototype.getUser = function (token) {
        var _this = this;
        this.api.Users.user(token.user_id).then(function (user) {
            _this.storage.set('user', user);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-login\page-login.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <!-- <ion-card *ngIf="userData">\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n  </ion-card> -->\n\n  <p class="title">\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goSlider()">\n    Welcome Back\n  </p>\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n  <div class="divider">\n    <span>or</span>\n  </div>\n  <form class="form-login">\n    <label><input type="email" name="username" placeholder="Email or Phone" [(ngModel)]="posts.username" /><span class="text-validate">Email address is required.</span></label>\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span></label>\n    <button class="btn-green" type="submit" (click)="logMeIn()">Log In</button>\n  </form>\n  <a class="description forgot-pass" (click)="goReset()">Forgot your password?</a>\n  <!-- <hr class="hr" />\n  <p class="description">Don\'t have an account? <a href="#" (click)="goSignup()">Sign Up</a></p> -->\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-login\page-login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */]])
], LoginPage);

//# sourceMappingURL=page-login.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserInboxPage = (function () {
    function UserInboxPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.viewMessage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!-- <p class="title">\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n    Inbox Page\n  </p> -->\n\n    <ion-list id="inbox-list">\n      <ion-item>\n        <span class="name"> Juan Dela Cruz </span>\n        <button id="btn-message" ion-button (click)="viewMessage()"> MESSAGE </button>\n\n      </ion-item>\n\n      <ion-item>\n        <span class="name"> John Devera </span>\n\n        <span class="date-time"> 7:15am &nbsp;&nbsp; 10/29/17 </span>\n\n        <!-- <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward"></ion-icon> -->\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget velit leo. Etiam a ipsum et elit maximus volutpat non quis leo. Morbi viverra auctor nibh egestas finibus. Maecenas egestas augue in posuere hendrerit. Cras posuere fermentum dui, nec posuere nisl facilisis ut. Duis aliquam, diam tristique faucibus venenatis, mi ante mollis elit, non pulvinar leo orci pharetra augue. Donec dignissim eu velit id imperdiet. Donec sit amet facilisis quam. Duis non risus sodales ante sollicitudin rhoncus et a nulla. </p>\n\n      </ion-item>\n\n      <ion-item>\n        <span class="name-new"> John Devera </span>\n\n        <span class="date-time-new"> 7:12am &nbsp;&nbsp; 10/30/17 </span>\n\n        <!-- <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward"></ion-icon> -->\n        <p class="message-new">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget velit leo. Etiam a ipsum et elit maximus volutpat non quis leo. Morbi viverra auctor nibh egestas finibus. Maecenas egestas augue in posuere hendrerit. Cras posuere fermentum dui, nec posuere nisl facilisis ut. Duis aliquam, diam tristique faucibus venenatis, mi ante mollis elit, non pulvinar leo orci pharetra augue. Donec dignissim eu velit id imperdiet. Donec sit amet facilisis quam. Duis non risus sodales ante sollicitudin rhoncus et a nulla. </p>\n\n      </ion-item>\n\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-user-inbox\page-user-inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], UserInboxPage);

//# sourceMappingURL=page-user-inbox.js.map

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageType; });
var MessageType = (function () {
    function MessageType() {
    }
    return MessageType;
}());

MessageType.MSG_REQ = "message_request";
MessageType.MSG_RES = "message_response";
//# sourceMappingURL=model.js.map

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 288,
	"./af.js": 288,
	"./ar": 289,
	"./ar-dz": 290,
	"./ar-dz.js": 290,
	"./ar-kw": 291,
	"./ar-kw.js": 291,
	"./ar-ly": 292,
	"./ar-ly.js": 292,
	"./ar-ma": 293,
	"./ar-ma.js": 293,
	"./ar-sa": 294,
	"./ar-sa.js": 294,
	"./ar-tn": 295,
	"./ar-tn.js": 295,
	"./ar.js": 289,
	"./az": 296,
	"./az.js": 296,
	"./be": 297,
	"./be.js": 297,
	"./bg": 298,
	"./bg.js": 298,
	"./bn": 299,
	"./bn.js": 299,
	"./bo": 300,
	"./bo.js": 300,
	"./br": 301,
	"./br.js": 301,
	"./bs": 302,
	"./bs.js": 302,
	"./ca": 303,
	"./ca.js": 303,
	"./cs": 304,
	"./cs.js": 304,
	"./cv": 305,
	"./cv.js": 305,
	"./cy": 306,
	"./cy.js": 306,
	"./da": 307,
	"./da.js": 307,
	"./de": 308,
	"./de-at": 309,
	"./de-at.js": 309,
	"./de-ch": 310,
	"./de-ch.js": 310,
	"./de.js": 308,
	"./dv": 311,
	"./dv.js": 311,
	"./el": 312,
	"./el.js": 312,
	"./en-au": 313,
	"./en-au.js": 313,
	"./en-ca": 314,
	"./en-ca.js": 314,
	"./en-gb": 315,
	"./en-gb.js": 315,
	"./en-ie": 316,
	"./en-ie.js": 316,
	"./en-nz": 317,
	"./en-nz.js": 317,
	"./eo": 318,
	"./eo.js": 318,
	"./es": 319,
	"./es-do": 320,
	"./es-do.js": 320,
	"./es.js": 319,
	"./et": 321,
	"./et.js": 321,
	"./eu": 322,
	"./eu.js": 322,
	"./fa": 323,
	"./fa.js": 323,
	"./fi": 324,
	"./fi.js": 324,
	"./fo": 325,
	"./fo.js": 325,
	"./fr": 326,
	"./fr-ca": 327,
	"./fr-ca.js": 327,
	"./fr-ch": 328,
	"./fr-ch.js": 328,
	"./fr.js": 326,
	"./fy": 329,
	"./fy.js": 329,
	"./gd": 330,
	"./gd.js": 330,
	"./gl": 331,
	"./gl.js": 331,
	"./gom-latn": 332,
	"./gom-latn.js": 332,
	"./he": 333,
	"./he.js": 333,
	"./hi": 334,
	"./hi.js": 334,
	"./hr": 335,
	"./hr.js": 335,
	"./hu": 336,
	"./hu.js": 336,
	"./hy-am": 337,
	"./hy-am.js": 337,
	"./id": 338,
	"./id.js": 338,
	"./is": 339,
	"./is.js": 339,
	"./it": 340,
	"./it.js": 340,
	"./ja": 341,
	"./ja.js": 341,
	"./jv": 342,
	"./jv.js": 342,
	"./ka": 343,
	"./ka.js": 343,
	"./kk": 344,
	"./kk.js": 344,
	"./km": 345,
	"./km.js": 345,
	"./kn": 346,
	"./kn.js": 346,
	"./ko": 347,
	"./ko.js": 347,
	"./ky": 348,
	"./ky.js": 348,
	"./lb": 349,
	"./lb.js": 349,
	"./lo": 350,
	"./lo.js": 350,
	"./lt": 351,
	"./lt.js": 351,
	"./lv": 352,
	"./lv.js": 352,
	"./me": 353,
	"./me.js": 353,
	"./mi": 354,
	"./mi.js": 354,
	"./mk": 355,
	"./mk.js": 355,
	"./ml": 356,
	"./ml.js": 356,
	"./mr": 357,
	"./mr.js": 357,
	"./ms": 358,
	"./ms-my": 359,
	"./ms-my.js": 359,
	"./ms.js": 358,
	"./my": 360,
	"./my.js": 360,
	"./nb": 361,
	"./nb.js": 361,
	"./ne": 362,
	"./ne.js": 362,
	"./nl": 363,
	"./nl-be": 364,
	"./nl-be.js": 364,
	"./nl.js": 363,
	"./nn": 365,
	"./nn.js": 365,
	"./pa-in": 366,
	"./pa-in.js": 366,
	"./pl": 367,
	"./pl.js": 367,
	"./pt": 368,
	"./pt-br": 369,
	"./pt-br.js": 369,
	"./pt.js": 368,
	"./ro": 370,
	"./ro.js": 370,
	"./ru": 371,
	"./ru.js": 371,
	"./sd": 372,
	"./sd.js": 372,
	"./se": 373,
	"./se.js": 373,
	"./si": 374,
	"./si.js": 374,
	"./sk": 375,
	"./sk.js": 375,
	"./sl": 376,
	"./sl.js": 376,
	"./sq": 377,
	"./sq.js": 377,
	"./sr": 378,
	"./sr-cyrl": 379,
	"./sr-cyrl.js": 379,
	"./sr.js": 378,
	"./ss": 380,
	"./ss.js": 380,
	"./sv": 381,
	"./sv.js": 381,
	"./sw": 382,
	"./sw.js": 382,
	"./ta": 383,
	"./ta.js": 383,
	"./te": 384,
	"./te.js": 384,
	"./tet": 385,
	"./tet.js": 385,
	"./th": 386,
	"./th.js": 386,
	"./tl-ph": 387,
	"./tl-ph.js": 387,
	"./tlh": 388,
	"./tlh.js": 388,
	"./tr": 389,
	"./tr.js": 389,
	"./tzl": 390,
	"./tzl.js": 390,
	"./tzm": 391,
	"./tzm-latn": 392,
	"./tzm-latn.js": 392,
	"./tzm.js": 391,
	"./uk": 393,
	"./uk.js": 393,
	"./ur": 394,
	"./ur.js": 394,
	"./uz": 395,
	"./uz-latn": 396,
	"./uz-latn.js": 396,
	"./uz.js": 395,
	"./vi": 397,
	"./vi.js": 397,
	"./x-pseudo": 398,
	"./x-pseudo.js": 398,
	"./yo": 399,
	"./yo.js": 399,
	"./zh-cn": 400,
	"./zh-cn.js": 400,
	"./zh-hk": 401,
	"./zh-hk.js": 401,
	"./zh-tw": 402,
	"./zh-tw.js": 402
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 744;

/***/ }),

/***/ 763:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__ = __webpack_require__(787);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElasticTextarea; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ElasticTextarea = (function () {
    function ElasticTextarea() {
        this.content = "";
        this.lineHeight = 20;
        this.maxExpand = 5;
        this.maxHeight = this.lineHeight * this.maxExpand;
    }
    ElasticTextarea.prototype.ngAfterViewInit = function () {
        this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
        this.txtArea.style.height = this.lineHeight + "px";
        this.maxHeight = this.lineHeight * this.maxExpand;
        this.txtArea.style.resize = 'none';
    };
    ElasticTextarea.prototype.onChange = function () {
        this.txtArea.style.height = this.lineHeight + "px";
        if (this.txtArea.scrollHeight < this.maxHeight) {
            this.txtArea.style.height = this.txtArea.scrollHeight + "px";
        }
        else {
            this.txtArea.style.height = this.maxHeight + "px";
        }
    };
    ElasticTextarea.prototype.clearInput = function () {
        this.content = "";
        this.txtArea.style.height = this.lineHeight + "px";
    };
    ElasticTextarea.prototype.setFocus = function () {
        this.ionTxtArea.setFocus();
    };
    return ElasticTextarea;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('ionTxtArea'),
    __metadata("design:type", Object)
], ElasticTextarea.prototype, "ionTxtArea", void 0);
ElasticTextarea = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'elastic-textarea',
        inputs: ['placeholder', 'lineHeight', 'maxExpand'],template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\components\elasticTextarea\elasticTextarea.html"*/'<!--suppress ALL -->\n<ion-textarea #ionTxtArea\n              placeholder=\'{{ "Type your message..." }}\'\n              [(ngModel)]="content"\n              (ngModelChange)=\'onChange($event)\'>\n</ion-textarea>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\components\elasticTextarea\elasticTextarea.html"*/
    }),
    __metadata("design:paramtypes", [])
], ElasticTextarea);

//# sourceMappingURL=elasticTextarea.js.map

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatBubble__ = __webpack_require__(789);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chatBubble__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatBubble; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChatBubble = (function () {
    function ChatBubble() {
        this.messageType = __WEBPACK_IMPORTED_MODULE_1__providers__["b" /* MessageType */];
    }
    ChatBubble.prototype.formatEpoch = function (epoch) {
        return __WEBPACK_IMPORTED_MODULE_1__providers__["d" /* UtilService */].getCalendarDay(epoch);
    };
    return ChatBubble;
}());
ChatBubble = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'chat-bubble',
        inputs: ['chatMessage'],template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\components\chatBubble\chatBubble.html"*/'<div>\n  <div class="chat-bubble {{chatMessage.type === \'message_by_business\' ? \'right\' : \'left\'}}">\n    <div class="message">{{chatMessage.message}}</div>\n  </div>\n  <div class="message-detail {{chatMessage.type === \'message_by_business\' ? \'right\' : \'left\'}}">\n    <span>{{formatEpoch(chatMessage.epoch)}}</span>\n  </div>\n</div>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\components\chatBubble\chatBubble.html"*/
    }),
    __metadata("design:paramtypes", [])
], ChatBubble);

//# sourceMappingURL=chatBubble.js.map

/***/ }),

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__ = __webpack_require__(791);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 791:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardAttachDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name KeyboardAttachDirective
 * @description
 * The `keyboardAttach` directive will cause an element to float above the
 * keyboard when the keyboard shows. Currently only supports the `ion-footer` element.
 *
 * ### Notes
 * - This directive requires [Ionic Native](https://github.com/driftyco/ionic-native)
 * and the [Ionic Keyboard Plugin](https://github.com/driftyco/ionic-plugin-keyboard).
 * - Currently only tested to work on iOS.
 * - If there is an input in your footer, you will need to set
 *   `Keyboard.disableScroll(true)`.
 *
 * @usage
 *
 * ```html
 * <ion-content #content>
 * </ion-content>
 *
 * <ion-footer [keyboardAttach]="content">
 *   <ion-toolbar>
 *     <ion-item>
 *       <ion-input></ion-input>
 *     </ion-item>
 *   </ion-toolbar>
 * </ion-footer>
 * ```
 */
var KeyboardAttachDirective = (function () {
    function KeyboardAttachDirective(elementRef, keyboard, _zone, platform) {
        this.elementRef = elementRef;
        this.keyboard = keyboard;
        this._zone = _zone;
        this.platform = platform;
        this.shouldHide = true;
    }
    KeyboardAttachDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.platform.is('cordova') && this.platform.is('ios')) {
            this.onShowSubscription = this.keyboard.onKeyboardShow().subscribe(function (e) { return _this.onShow(e); });
            this.onHideSubscription = this.keyboard.onKeyboardHide().subscribe(function (e) { return _this.onHide(e); });
        }
        this.btnClicked.subscribe(function (data) { return _this.shouldHide = false; }, function (err) { return console.log(err); });
    };
    KeyboardAttachDirective.prototype.ngOnDestroy = function () {
        if (this.onShowSubscription) {
            this.onShowSubscription.unsubscribe();
        }
        if (this.onHideSubscription) {
            this.onHideSubscription.unsubscribe();
        }
    };
    KeyboardAttachDirective.prototype.onShow = function (e) {
        var keyboardHeight = e.keyboardHeight || (e.detail && e.detail.keyboardHeight);
        this.setElementPosition(keyboardHeight);
    };
    ;
    KeyboardAttachDirective.prototype.onHide = function (e) {
        if (this.shouldHide) {
            this.setElementPosition(0);
        }
        this.shouldHide = true;
    };
    ;
    KeyboardAttachDirective.prototype.setElementPosition = function (pixels) {
        var _this = this;
        this.elementRef.nativeElement.style.paddingBottom = pixels + 'px';
        this.content.resize();
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            }, 100);
        });
    };
    return KeyboardAttachDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('keyboardAttach'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* Content */])
], KeyboardAttachDirective.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */])
], KeyboardAttachDirective.prototype, "btnClicked", void 0);
KeyboardAttachDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[keyboardAttach]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* Platform */]])
], KeyboardAttachDirective);

//# sourceMappingURL=keyboard-attach.directive.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_success_page_signup_success__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_config__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SignupPage = (function () {
    function SignupPage(navCtrl, http, fb, gp) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.fb = fb;
        this.gp = gp;
        this.posts = {
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            permission: '4'
        };
    }
    SignupPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__["a" /* SliderPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SignupPage.prototype.fbConnect = function () {
        var _this = this;
        var baseUrl = __WEBPACK_IMPORTED_MODULE_10__app_config__["a" /* default */].baseUrl;
        this.fb.login(['email', 'public_profile']).then(function (res) {
            _this.fb.api('me?fields=id,email', []).then(function (profile) {
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '4' }).subscribe(function (res) {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
                        animate: true,
                        direction: 'forward'
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        }).catch(function (err) {
            console.log('Error logging into Facebook', err);
        });
    };
    SignupPage.prototype.gpConnect = function () {
        this.gp.login({})
            .then(function (res) {
            return console.log(res);
        });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
            animate: true,
            direction: 'forward'
        })
            .catch(function (err) { return console.log('error -- ' + err); });
    };
    SignupPage.prototype.signMeUp = function () {
        var _this = this;
        var getFName = this.posts.first_name, getLName = this.posts.last_name, getUser = this.posts.username, getEmail = this.posts.email, getPass = this.posts.password, baseUrl = __WEBPACK_IMPORTED_MODULE_10__app_config__["a" /* default */].baseUrl;
        var nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z\s]+)?)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/, userRegEx = /^[a-zA-Z0-9-_]+$/, emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (getFName) {
            if (nameRegEx.test(getFName) == false) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="first_name"]').addClass('has-error').siblings('.text-validate').text('Invalid First name.');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="first_name"]').removeClass('has-error');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="first_name"]').addClass('has-error').siblings('.text-validate').text('First name is required.');
        }
        if (getLName) {
            if (nameRegEx.test(getLName) == false) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="last_name"]').addClass('has-error').siblings('.text-validate').text('Invalid Last name.');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="last_name"]').removeClass('has-error');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="last_name"]').addClass('has-error').siblings('.text-validate').text('Last name is required.');
        }
        if (getUser) {
            if (userRegEx.test(getUser) == false) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Invalid Username');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="username"]').removeClass('has-error');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Username is required.');
        }
        if (getEmail) {
            if (emailRegEx.test(getEmail) == false) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Invalid Email address.');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="email"]').removeClass('has-error');
                if (!__WEBPACK_IMPORTED_MODULE_8_jquery__('.form-signup input').not('.form-signup input[name="email"]').hasClass('has-error')) {
                    this.http.post(baseUrl + 'api/users/add', this.posts).subscribe(function (res) {
                        console.log(res);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_signup_success_page_signup_success__["a" /* SignupSuccessPage */], {}, {
                            animate: true,
                            direction: 'forward'
                        });
                    }, function (err) {
                        console.log(err.json());
                        if (err.json().username == getUser) {
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="username"]').addClass('has-error').siblings('.text-validate').text('Username already exists');
                        }
                        if (err.json().email == getEmail) {
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email already exists.');
                        }
                        // console.log(err.json());
                    });
                }
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="email"]').addClass('has-error').siblings('.text-validate').text('Email address is required.');
        }
        if (getPass) {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="password"]').removeClass('has-error');
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="password"]').addClass('has-error');
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
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"E:\Projects\mobile-business-owner\src\pages\page-signup\page-signup.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <ion-card *ngIf="userData">\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n  </ion-card>\n\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">Sign Up\n  </p>\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n  <div class="divider">\n    <span>Or sign up with email</span>\n  </div>\n  <form class="form-signup">\n    <label>\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n      <span class="text-validate">First name is required.</span>\n    </label>\n    <label>\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n      <span class="text-validate">Last name is required.</span>\n    </label>\n    <label>\n      <input type="text" name="username" placeholder="Username" [(ngModel)]="posts.username" />\n      <span class="text-validate">Username is required.</span>\n    </label>\n    <label>\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n      <span class="text-validate">Email address is required.</span>\n    </label>\n    <label>\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n    </label>\n    <input class="btn-green" type="submit" value="Sign Up" (click)="signMeUp()" />\n  </form>\n  <p class="description">By signing up, you agree to GoPage\'s <br><a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></p>\n</ion-content>\n'/*ion-inline-end:"E:\Projects\mobile-business-owner\src\pages\page-signup\page-signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupPage);

//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    // baseUrl : 'https://warm-beach-10670.herokuapp.com/'
    baseUrl: 'http://localhost:5015/'
};
/* harmony default export */ __webpack_exports__["a"] = (config);
//# sourceMappingURL=config.js.map

/***/ })

},[427]);
//# sourceMappingURL=main.js.map