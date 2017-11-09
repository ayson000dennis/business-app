webpackJsonp([0],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCustomersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_add_customer_page_user_add_customer__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
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
        this.newCustomerList = [];
        this.hasNoCustomers = false;
    }
    UserCustomersPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserCustomersPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.dateFormat = function (value) {
        var dateNow = __WEBPACK_IMPORTED_MODULE_11_moment___default()(value), format = dateNow.format('MMM D YYYY at h:mm A'), newDateNow = new Date(value), getYear = newDateNow.getFullYear();
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
        var thisElem = __WEBPACK_IMPORTED_MODULE_8_jquery__($event.currentTarget).closest('.holder-accordion');
        __WEBPACK_IMPORTED_MODULE_8_jquery__(thisElem).toggleClass('show').siblings('.holder-accordion').removeClass('show');
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.dropdown-menu').fadeOut('150');
    };
    UserCustomersPage.prototype.showDropdown = function ($event) {
        var thisElem = __WEBPACK_IMPORTED_MODULE_8_jquery__($event.currentTarget).find('.dropdown-menu'), thisIndex = thisElem.closest('.holder-accordion').index();
        this.customerId = this.customersList[thisIndex].user_id[0]._id;
        this.thisFName = this.customersList[thisIndex].user_id[0].first_name,
            this.thisLName = this.customersList[thisIndex].user_id[0].last_name;
        this.getName(this.thisFName, this.thisLName);
        __WEBPACK_IMPORTED_MODULE_8_jquery__(thisElem).fadeToggle('150');
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.dropdown-menu').not(thisElem).hide();
    };
    UserCustomersPage.prototype.getName = function (fName, lName) {
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.name').text(fName + ' ' + lName + '\'s');
    };
    UserCustomersPage.prototype.updateModal = function (modalName) {
        this.openModal('#' + modalName + '-modal');
    };
    UserCustomersPage.prototype.updateThis = function (updateType) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-' + updateType).append('<span class="fa fa-spinner fa-spin"></span>');
        if (updateType == 'delete') {
            this.api.Users.user_delete(this.customerId).then(function (res) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-delete').find('.fa-spin').remove();
                _this.closeModal();
                _this.ionViewWillEnter();
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.success').text('deleted');
                _this.openModal('#success-modal');
            }).catch(function (err) {
                console.log(err);
            });
        }
        else if (updateType == 'suspend') {
            this.api.Users.user_suspend(this.customerId).then(function (res) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-suspend').find('.fa-spin').remove();
                _this.closeModal();
                _this.ionViewWillEnter();
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.success').text('suspended');
                _this.openModal('#success-modal');
            }).catch(function (err) {
                console.log(err);
            });
        }
    };
    UserCustomersPage.prototype.openModal = function (modal) {
        __WEBPACK_IMPORTED_MODULE_8_jquery__(modal).fadeIn('150');
    };
    UserCustomersPage.prototype.closeModal = function () {
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.confirmation-modal').fadeOut('150');
    };
    UserCustomersPage.prototype.ionViewWillEnter = function () {
        var self = this, getInitial;
        this.storage.get('shop_id').then(function (res) {
            self.shop_id = res;
        });
        var getList = function (page, page_size) {
            if (page_size == null || page_size == '0') {
                page_size = '10';
                __WEBPACK_IMPORTED_MODULE_8_jquery__('#page_size').val(10);
            }
            self.storage.get('user').then(function (user) {
                self.user = user;
                self.api.BusinessOwner.list(self.shop_id, page, page_size).then(function (users) {
                    console.log(users);
                    self.customersList = users.docs;
                    // self.newCustomerList.push(users.docs)
                    self.hasData = true;
                    if (users.total == 0) {
                        self.hasNoCustomers = true;
                    }
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                    var getTotalUsers = users.total, pageCount = Math.ceil(getTotalUsers / page_size);
                    if (pageCount > 1 && __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').length == 0) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.page-user-customers .scroll-content').append('<ul class="holder-pagination"></ul>');
                        for (var x = 1; x <= pageCount; x++) {
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').append('<li class="pagination-count" data-page="' + x + '">' + x + '</li>');
                        }
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').eq(0).addClass('active');
                        if (__WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length > 9) {
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').append('<li class="dot-last">...</li><li class="clone-pagination">' + __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length + '</li>');
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').prepend('<li class="clone-pagination hide" data-page="1">1</li><li class="dot-first hide">...</li>');
                            __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').eq(4).nextAll('.pagination-count').addClass('hide');
                        }
                    }
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').show();
                }).catch(function (err) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('body').find('.fa.loader').remove();
                    console.log(err);
                });
            });
        };
        this.page = '1';
        this.page_size = '10';
        getList(this.page, this.page_size);
        __WEBPACK_IMPORTED_MODULE_8_jquery__('#page_size').focus(function () {
            getInitial = self.page_size;
        });
        __WEBPACK_IMPORTED_MODULE_8_jquery__('#page_size').blur(function () {
            if (getInitial != self.page_size) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.holder-pagination').remove();
                self.hasData = false;
                self.page = '1';
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.page-user-customers .scroll-content').append('<span class="fa fa-spinner fa-spin loader"></span>');
                getList(self.page, self.page_size);
            }
        });
        __WEBPACK_IMPORTED_MODULE_8_jquery__('body').on('click', '.pagination-count', function () {
            var getPage = __WEBPACK_IMPORTED_MODULE_8_jquery__(this).data('page');
            self.hasData = false;
            __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').not(this).removeClass('active');
            if (__WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length > 9) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').not(this).addClass('hide');
                __WEBPACK_IMPORTED_MODULE_8_jquery__(this).removeClass('hide');
                if (getPage > 3 && getPage < __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length - 2) {
                    for (var x = 1; x < 3; x++) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + (getPage + x) + '"], .pagination-count[data-page="' + (getPage - x) + '"]').removeClass('hide');
                    }
                }
                else if (getPage < 4) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + getPage + '"]').prevAll('.pagination-count').removeClass('hide');
                    for (var x = 5 - getPage; x >= 1; x--) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + (getPage + x) + '"]').removeClass('hide');
                    }
                }
                else if (getPage > __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length - 4) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + getPage + '"]').nextAll('.pagination-count').removeClass('hide');
                    for (var x = getPage; x > __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length - 4; x--) {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + (x - 1) + '"]').removeClass('hide');
                    }
                }
                if (__WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="2"]').hasClass('hide')) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.clone-pagination:eq(0), .dot-first').removeClass('hide');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.clone-pagination:eq(0), .dot-first').addClass('hide');
                }
                if (__WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="' + (__WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length - 1) + '"]').hasClass('hide')) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.clone-pagination:last-child, .dot-last').removeClass('hide');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.clone-pagination:last-child, .dot-last').addClass('hide');
                }
            }
            __WEBPACK_IMPORTED_MODULE_8_jquery__(this).addClass('active').closest('.holder-pagination').hide().closest('.scroll-content').prepend('<span class="fa fa-spinner fa-spin loader"></span>');
            getList(getPage, self.page_size);
        });
        __WEBPACK_IMPORTED_MODULE_8_jquery__('body').on('click', '.clone-pagination', function () {
            if (__WEBPACK_IMPORTED_MODULE_8_jquery__(this).index() == 0) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count[data-page="1"]').trigger('click');
            }
            else {
                var paginationCount = __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').length;
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.pagination-count').eq(paginationCount - 1).trigger('click');
            }
        });
    };
    UserCustomersPage.prototype.goAddUser = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserCustomersPage.prototype.goEditUser = function () {
        var thisCustomer = this.customerId;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */], { thisCustomer: thisCustomer }, {
            animate: true,
            direction: 'forward'
        });
    };
    return UserCustomersPage;
}());
UserCustomersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-customers',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-customers\page-user-customers.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Customers</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="page-user-customers">\n\n  <p class="title">\n\n    Customers\n\n    <a class="btn btn-green" href="#" (click)="goAddUser()">Add New</a>\n\n  </p>\n\n  <p class="description">\n\n    Show <input id="page_size" type="number" name="entry" [(ngModel)]="page_size"/> entries\n\n  </p>\n\n  <span class="fa fa-spinner fa-spin loader"></span>\n\n  <div class="holder-list" *ngIf="hasData">\n\n    <h4 class="no-results" *ngIf="hasNoCustomers">You have no customers yet.</h4>\n\n\n\n    <div class="holder-accordion" *ngFor="let customer of customersList">\n\n      <span class="dropdown" (click)="showDropdown($event)">\n\n        Actions <span class="fa fa-angle-down"></span>\n\n        <ul class="dropdown-menu">\n\n          <li (click)="goEditUser()">Edit</li>\n\n          <li (click)="updateModal(\'suspend\')" *ngIf="customer.user_id[0].status !== \'2\'">Suspend</li>\n\n          <li (click)="updateModal(\'delete\')" *ngIf="customer.user_id[0].status !== \'0\'">Delete</li>\n\n        </ul>\n\n      </span>\n\n      <div class="accordion-header" (click)="toggleAccordion($event)">\n\n        <span *ngIf="customer.user_id[0].first_name != \' \'">{{customer.user_id[0].first_name}}</span> <span *ngIf="customer.user_id[0].last_name != \' \'">{{customer.user_id[0].last_name}}</span>\n\n        <span *ngIf="customer.user_id[0].first_name == \' \'"><span *ngIf="customer.user_id[0].last_name == \' \'">{{customer.user_id[0].number}}</span></span>\n\n      </div>\n\n      <div class="accordion-body">\n\n        <span class="list-label">Role</span><span class="list-data">{{customer.user_id[0].permission === \'1\' ? \'Administrator\' : customer.user_id[0].permission === \'2\' ? \'Ambassador\' : \'Member\'}}</span>\n\n        <span class="list-label">Account Type</span><span class="list-data">{{customer.user_id[0].account_type === \'1\' ? \'Member\' : customer.user_id[0].account_type === \'2\' ? \'Business-Essentials\' : \'Premium\'}}</span>\n\n        <span class="list-label">Status</span><span class="list-data"><span *ngIf="customer.user_id[0].status == \'1\'">Active</span><span class="not-active" *ngIf="customer.user_id[0].status != \'1\'">{{customer.user_id[0].status === \'0\' ? \'Deleted\' : \'Suspended\'}}</span></span>\n\n        <span class="list-label">Registered Date</span><span class="list-data">{{dateFormat(customer.user_id[0].created_at)}}</span>\n\n        <span class="list-label">Last Login</span><span class="list-data">{{dateFormat(customer.user_id[0].last_login)}}</span>\n\n      </div>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<div id="suspend-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n\n  <div class="confirmation-modal-content">\n\n    Are you sure you want to suspend <span class="name"></span> account?\n\n    <button id="btn-suspend" class="btn btn-green" (click)="updateThis(\'suspend\')">Yes</button>\n\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n\n  </div>\n\n</div>\n\n\n\n<div id="delete-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n\n  <div class="confirmation-modal-content">\n\n    Are you sure you want to delete <span class="name"></span> account?\n\n    <button id="btn-delete" class="btn btn-green" (click)="updateThis(\'delete\')">Yes</button>\n\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n\n  </div>\n\n</div>\n\n\n\n<div id="success-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n\n  <div class="confirmation-modal-content">\n\n    Account has been successfully <span class="success"></span>.\n\n\n\n    <button class="btn btn-green btn-okay" (click)="closeModal()">Okay</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-customers\page-user-customers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_10__service_api_service_component__["a" /* ApiService */]])
], UserCustomersPage);

//# sourceMappingURL=page-user-customers.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sql; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
], Sql);

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(150);
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

/***/ 152:
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
    UtilService.formatMessageRequest = function (user_id, business_id, company_name, message) {
        return {
            user_id: user_id,
            business_id: business_id,
            company_name: company_name,
            message: message,
            message_by: "business",
            is_read: false
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

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_redeem_page_user_redeem__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(22);
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
        this.hasNoDeals = false;
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
        var self = this;
        this.storage.get('shop_id').then(function (res) {
            self.shop_id = res;
            _this.api.Loyalty.loyalty_list(_this.shop_id, _this.customer).then(function (deals) {
                console.log(deals);
                _this.dealsList = deals;
                _this.hasData = true;
                if (_this.dealsList.length == 0) {
                    _this.hasNoDeals = true;
                }
            });
            _this.api.Users.user(_this.customer).then(function (user) {
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
            business_id: this.shop_id,
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
        this.api.Loyalty.loyalty_add('0', this.shop_id, this.deal._id, this.customer._id, this.deal.is_stamp)
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
        selector: 'page-user-deals',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-deals\page-user-deals.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo.png" alt="">\n\n    <div class="profile">\n\n      <img class="profile-img" src="assets/images/img-profile.png" alt="">\n\n      <span class="fa fa-angle-down"></span>\n\n    </div>\n\n    <span class="inbox fa fa-envelope-o"></span>\n\n  </ion-navbar>\n\n\n\n  <ion-list>\n\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n      <span class="label-{{p.title}}">{{p.title}}</span>\n\n    </button>\n\n  </ion-list>\n\n</ion-header> -->\n\n\n\n<ion-content padding>\n\n  <p class="title" (click)="goScanner()">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n\n    Back to Scanner\n\n  </p>\n\n\n\n  <div class="holder-list" *ngIf="hasData">\n\n    <h4 class="no-results" *ngIf="hasNoDeals">You have no deals yet.</h4>\n\n\n\n    <div class="holder-deal" *ngFor="let deals of dealsList">\n\n      <div class="deal-info">\n\n        <p class="deal-title">\n\n           {{deals.template}}\n\n        </p>\n\n        <p class="deal-stamp">\n\n          <span *ngIf="deals.is_stamp == \'1\'">{{deals.stamp}} of {{deals.buy_pcs}}</span>\n\n        </p>\n\n        <p class="deal-expire">\n\n          Expires {{dateFormat(deals.end_date)}}\n\n        </p>\n\n      </div>\n\n      <button (click)="Stamp(deals)" class="btn btn-green" *ngIf="deals.is_stamp == \'1\'">Stamp</button>\n\n      <button (click)="Redeem(deals, $event)" class="btn btn-green btn-redeem" *ngIf="deals.is_stamp == \'0\'">Redeem</button>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n\n\n<div id="redeem-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay"></div>\n\n  <div class="confirmation-modal-content">\n\n    <span class="fa fa-check"></span>\n\n    DONE<br />\n\n    YOUR TOTAL CHECK-INS: <span class="checkins-count"></span><br />\n\n    THANK YOU! <span class="customer-name"></span>\n\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-deals\page-user-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(95);
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
        selector: 'page-reset-pass',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-reset-pass\page-reset-pass.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Reset Password\n\n  </p>\n\n  <form class="form-reset">\n\n    <label><input type="email" name="email" placeholder="Email address or Mobile number" [(ngModel)]="posts.email" /><span class="text-validate">Email address is required.</span></label>\n\n    <button class="btn-green" type="submit" (click)="resetMe()">Send</button>\n\n  </form>\n\n  <p class="description text-center">We\'ll email or text your new generated password.<p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-reset-pass\page-reset-pass.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 174:
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
webpackEmptyAsyncContext.id = 174;

/***/ }),

/***/ 217:
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
webpackEmptyAsyncContext.id = 217;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(504);
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
            user_name: function (firstName, lastName, customerId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/edit/" + customerId, { first_name: firstName, last_name: lastName, in_mobile: '1' }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_edit: function (firstName, lastName, phone, email, customerId) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/edit/" + customerId, { first_name: firstName, last_name: lastName, number: phone, email: email }).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            user_add: function (firstName, lastName, phone, email, password, ownerId, permission, business_id) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/users/add?permission=" + permission + '&business_id=' + business_id, { first_name: firstName, last_name: lastName, number: phone, email: email, password: password, permission: '3', account_type: '1', status: '1', owner_id: ownerId }).map(function (response) {
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
            },
            list: function (userId, permission) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/init_list/" + userId + "/" + permission, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            info: function (businessId) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business/view/" + businessId).map(function (response) {
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
                    is_stamp: isStamp
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
            },
            favorite_list: function (business_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/favorites/list/" + business_id).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
        this.Message = {
            member_list: function (shop_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/list/" + shop_id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            room_list: function (shop_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/rooms/" + shop_id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            update_read: function (room_id, message_by) {
                return _this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/chats/update_read/" + room_id + "/" + message_by, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/chats/list/" + room_id).map(function (response) {
                    return response.json();
                }).toPromise();
            }
        };
    }
    return ApiService;
}());
ApiService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], ApiService);

//# sourceMappingURL=api.service.component.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_page_signup__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(50);
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
        selector: 'page-signup-success',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-signup-success\page-signup-success.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Sign Up Success\n\n  </p>\n\n  <p class="description text-center">We’ve just emailed you a link. <br>Please check your inbox and confirm your email<p>\n\n  <a class="btn btn-green text-center" (click)="goLogin()">Okay</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-signup-success\page-signup-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], SignupSuccessPage);

//# sourceMappingURL=page-signup-success.js.map

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(26);
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
    function UserChatPage(navCtrl, navParams, _zone, databaseService, socketService, storage, api) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._zone = _zone;
        this.databaseService = databaseService;
        this.socketService = socketService;
        this.storage = storage;
        this.api = api;
        this.hasData = false;
        this.hasLeave = false;
        this.isRefetch = false;
        this.memberDetail = this.navParams.get("memberDetail");
        this.businessDetail = this.navParams.get("businessDetail");
        // this.chatList = this.navParams.get("chatList");
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["w" /* EventEmitter */]();
        this.messages = [];
        this.chatBox = "";
        this.room_id = this.memberDetail._id + this.businessDetail._id;
        this.init();
        // console.log(this.memberDetail);
        // console.log(this.businessDetail);
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.socketService.joinRoom(this.room_id);
        this.fetchChats();
        this.updateRead();
    };
    UserChatPage.prototype.ionViewDidLoad = function () {
    };
    UserChatPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.hasLeave = true;
        this.hasData = false;
    };
    UserChatPage.prototype.fetchChats = function () {
        var _this = this;
        // GET ALL MESSAGES FROM DATABASE
        this.api.Message.fetch_chats(this.room_id).then(function (chats) {
            console.log('fetching chats...');
            if (_this.hasLeave) {
                return;
            }
            // if(this.message_by === 'member' && !this.hasData) {
            //   this.message_by = '';
            //   console.log('load again')
            //   return this.fetchChats();
            // }
            if (!_this.isRefetch) {
                _this.isRefetch = true;
                console.log('Refetching chat data...');
                return _this.fetchChats();
            }
            else {
                _this.messages = chats;
                _this.hasData = true;
                _this.scrollToBottom();
                __WEBPACK_IMPORTED_MODULE_5_jquery__('body').find('.fa.loader').remove();
                console.log('Chat data loaded');
            }
        }).catch(function (error) {
            console.log(error);
        });
    };
    UserChatPage.prototype.updateRead = function () {
        this.api.Message.update_read(this.room_id, 'member').then(function (update) {
            console.log('is_read updated');
        });
    };
    UserChatPage.prototype.init = function () {
        var _this = this;
        // REAL TIME MESSAGE RESPONSE
        this.socketService.messages.subscribe(function (chatMessage) {
            _this.message_by = chatMessage.message_by;
            _this._zone.run(function () {
                // this.fetchChats();
                _this.messages.push(chatMessage);
                _this.scrollToBottom();
                _this.updateRead();
            });
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
        var user_id = this.memberDetail._id, business_id = this.businessDetail._id, company_name = this.businessDetail.company_name;
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_4__providers__["d" /* UtilService */].formatMessageRequest(user_id, business_id, company_name, message));
        this.chatBox = '';
        this.scrollToBottom();
    };
    UserChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        this._zone.run(function () {
            setTimeout(function () {
                _this.content.scrollToBottom(300);
            });
        });
    };
    UserChatPage.prototype.goToInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {
            animate: true,
            direction: 'back'
        });
    };
    return UserChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-user-chat',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-chat\page-user-chat.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button class="back-btn-new" (click)="goToInbox()">\n\n       <i class="fa fa-angle-left" aria-hidden="true"></i>\n\n    </button>\n\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /><span class="count-msg">1</span></a> -->\n\n    <span class=\'title\' *ngIf="memberDetail.first_name && memberDetail.last_name">{{ memberDetail.first_name }} {{ memberDetail.last_name }}</span>\n\n\n\n    <span class=\'title\' *ngIf="!memberDetail.first_name || memberDetail.first_name == \' \' && !memberDetail.last_name || memberDetail.last_name == \' \' "> {{ memberDetail.number }}</span>\n\n\n\n    <span class=\'title\' *ngIf="!memberDetail.first_name || memberDetail.first_name == \' \'"> {{ memberDetail.last_name }}</span>\n\n\n\n    <span class=\'title\' *ngIf="!memberDetail.last_name || memberDetail.last_name == \' \'"> {{ memberDetail.first_name }}</span>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content id="messages" #content>\n\n  <div *ngIf="hasData">\n\n    <ion-list no-lines>\n\n\n\n      <ion-item *ngFor="let msg of messages">\n\n        <chat-bubble [chatMessage]="msg"></chat-bubble>\n\n      </ion-item>\n\n\n\n    </ion-list>\n\n  </div>\n\n\n\n  <span class="fa fa-spinner fa-spin loader"></span>\n\n</ion-content>\n\n\n\n<ion-footer *ngIf="hasData" no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n\n  <ion-toolbar position="bottom">\n\n\n\n    <ion-item no-lines >\n\n      <ion-label style="margin:0px;"></ion-label>\n\n      <div item-content style="width:100%;">\n\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n\n      </div>\n\n    </ion-item>\n\n\n\n    <ion-buttons right style="margin-left:10px">\n\n      <button ion-button icon-only\n\n              [disabled]="txtChat.content.trim().length<1"\n\n              (click)="sendMessage()">\n\n              SEND\n\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-chat\page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
// export const SOCKET_HOST = "http://localhost:3000";
// export const SOCKET_HOST = "http://localhost:3000";
var SOCKET_HOST = "https://chat-gopage-server.herokuapp.com/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(151);
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
        this.notify = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observerNotify) {
            _this.socketObserverNotify = observerNotify;
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
        this.socket.on('message', function (response) {
            var chatMessage = response;
            // console.log(chatMessage);
            chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
            _this.socketObserver.next(chatMessage);
        });
        // Real time notification
        this.socket.on('notify', function (response) {
            var chatNofitication = response;
            // console.log(chatNofitication);
            _this.socketObserverNotify.next(chatNofitication);
        });
    };
    SocketService.prototype.newRequest = function (chatMessage) {
        // Send message
        chatMessage.epoch = __WEBPACK_IMPORTED_MODULE_4__util_service__["a" /* UtilService */].getEpoch();
        this.socketObserver.next(chatMessage);
        this.socket.emit('message_send', chatMessage);
    };
    SocketService.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    SocketService.prototype.connect = function () {
        this.socket.connect();
    };
    SocketService.prototype.joinRoom = function (room_id) {
        this.socket.emit('joinroom', room_id);
    };
    return SocketService;
}());
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__database_service__["a" /* DatabaseService */]])
], SocketService);

//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingsPage = (function () {
    function SettingsPage(navCtrl, alertCtrl, storage, api, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.api = api;
        this.navParams = navParams;
        this.hasData = false;
        this.shop_id = this.navParams.get('shop_id');
    }
    SettingsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.api.Business.list(_this.user._id, _this.user.permission).then(function (res) {
                __WEBPACK_IMPORTED_MODULE_6_jquery__('.loader').remove();
                _this.businesses = res.business;
                _this.hasData = true;
                console.log(_this.businesses);
            });
        });
    };
    SettingsPage.prototype.ComingSoon = function () {
        var alert = this.alertCtrl.create({
            title: 'Coming Soon',
            subTitle: 'This feature is under construction right now. Check back soon!',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    SettingsPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    SettingsPage.prototype.goDashboard = function (shop_id) {
        var _this = this;
        var self = this;
        __WEBPACK_IMPORTED_MODULE_6_jquery__('#list-header').find('.label').text('Switching...').append('<span class="fa fa-spinner fa-spin"></span>');
        __WEBPACK_IMPORTED_MODULE_6_jquery__('.label span').css('pointer-events', 'none');
        this.api.Business.info(shop_id).then(function (data) {
            _this.storage.set('shop_name', data.company_name);
            setTimeout(function () {
                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__page_dashboard_page_dashboard__["a" /* DashboardPage */], { shop_id: shop_id }, {
                    animate: true,
                    direction: 'back'
                });
            }, 500);
        });
    };
    SettingsPage.prototype.logOut = function () {
        var _this = this;
        this.storage.clear();
        this.storage.get('user').then(function (user) {
            if (user == null) {
                console.log('Storage data successfully cleared! You have been logout.');
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_login_page_login__["a" /* LoginPage */], {}, {
                    animate: true,
                    direction: 'back'
                });
            }
            else {
                console.log('Storage data has not been cleared! Something went wrong.');
            }
        }).catch(function (err) {
            console.log('Oops! Something went wrong.');
            console.log('Error: ' + err);
        });
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-settings',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-settings\page-settings.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Settings</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="loader">Fetching your businesses... <span class="fa fa-spinner fa-spin"></span></div>  \n\n\n\n  <ion-list *ngIf=(hasData)>\n\n    <ion-list-header id="list-header">Switch Account</ion-list-header>\n\n    <ion-item-group>\n\n      <ion-item *ngFor="let business of businesses"><span class="{{business._id == shop_id ? \'active\' : \'\'}}" (click)="goDashboard(business._id)">{{business.company_name}}</span></ion-item>\n\n    </ion-item-group>\n\n  </ion-list>\n\n  <div class="container settings-menu">\n\n    <a (click)="ComingSoon()">Notif<span></span>ication</a>\n\n    <hr class="divider" />\n\n    <a class="logout" (click)="logOut()">Logout</a>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-settings\page-settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], SettingsPage);

//# sourceMappingURL=page-settings.js.map

/***/ }),

/***/ 415:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAddCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(26);
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
            _this.business_id = user.shop_id[0];
            _this.permission = user.permission;
        });
    };
    UserAddCustomerPage.prototype.addUser = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#add-user').append('<span class="fa fa-spinner fa-spin"></span>');
        this.api.Users.user_add(this.posts.first_name, this.posts.last_name, '+' + this.posts.phone, this.posts.email, this.posts.password, this.id, this.permission, this.business_id).then(function (res) {
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
        selector: 'page-user-add-customer',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-add-customer\page-user-add-customer.html"*/'<ion-content padding>\n\n  <p class="title">\n\n    Add New User\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <form>\n\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /><span class="text-validate"></span></label>\n\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /><span class="text-validate"></span></label>\n\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.phone" /><span class="text-validate"></span></label>\n\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate"></span></label>\n\n    <button id="add-user" class="btn btn-green" type="submit" (click)="addUser()">Save</button>\n\n  </form>\n\n</ion-content>\n\n\n\n<div id="added-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay"></div>\n\n  <div class="confirmation-modal-content">\n\n    Account has been successfully added.\n\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-add-customer\page-user-add-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */]])
], UserAddCustomerPage);

//# sourceMappingURL=page-user-add-customer.js.map

/***/ }),

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(26);
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
        selector: 'page-user-edit-customer',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-edit-customer\page-user-edit-customer.html"*/'<ion-content padding>\n\n  <p class="title">\n\n    Edit User\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <form id="edit-form">\n\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /></label>\n\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /></label>\n\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.number" /><span class="text-validate"></span></label>\n\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n\n    <button id="save-user" class="btn btn-green" type="submit" (click)="saveUser()">Save</button>\n\n  </form>\n\n</ion-content>\n\n\n\n<div id="edit-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay"></div>\n\n  <div class="confirmation-modal-content">\n\n    Account has been successfully updated.\n\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-edit-customer\page-user-edit-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], UserEditCustomerPage);

//# sourceMappingURL=page-user-edit-customer.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(24);
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
                    console.log(_this.customer);
                    _this.api.Users.user_name(_this.posts.first_name, _this.posts.last_name, _this.customer.customer.user_id[0]).then(function (res) {
                        __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                        console.log(res);
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
        selector: 'page-user-register',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-register\page-user-register.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content padding>\n\n  <p class="title" (click)="goScanner()">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n\n    Back to Scanner\n\n  </p>\n\n\n\n  <form>\n\n    <label>\n\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n\n      <span class="text-validate"></span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n\n      <span class="text-validate"></span>\n\n    </label>\n\n    <button class="btn btn-gray" type="submit" (click)="skipMe()">Skip</button>\n\n    <button class="btn btn-green" type="submit" (click)="registerMe()">Submit</button>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-register\page-user-register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], UserRegisterPage);

//# sourceMappingURL=page-user-register.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRedeemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
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
    function UserRedeemPage(navCtrl, navParams, api, storage, socketService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.socketService = socketService;
        this.hasData = false;
    }
    UserRedeemPage.prototype.ionViewWillEnter = function () {
        // this.socketService.connect();
        // console.log('entered')
        var _this = this;
        this.business_id = this.navParams.get('business_id');
        this.customer_id = this.navParams.get('customer_id');
        this.deal = this.navParams.get('deal');
        this.hasData = true;
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.title-deal').text(this.deal.template);
        this.api.Users.user(this.customer_id).then(function (user) {
            _this.customer = user;
        });
    };
    // ionViewWillLeave() {
    //   this.socketService.disconnect();
    // }
    UserRedeemPage.prototype.ionViewDidEnter = function () {
        setTimeout(function () {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[name="quantity"]').focus();
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
        __WEBPACK_IMPORTED_MODULE_8_jquery__('.confirmation-modal').hide();
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
            __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-submit').append('<span class="fa fa-spinner fa-spin"></span>');
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[type="number"]').removeClass('has-error').next('.text-validate').text('');
            this.api.Loyalty.loyalty_add(this.quantity, this.business_id, this.deal._id, this.customer_id, this.deal.is_stamp)
                .then(function (data) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-submit').find('.fa').remove();
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.free-pcs').text(getFreePcs);
                __WEBPACK_IMPORTED_MODULE_8_jquery__('.free-prod').text(getFreeProd);
                console.log(parseInt(data.loyalty_details.stamp));
                console.log(parseInt(getBuyPcs));
                if (parseInt(data.loyalty_details.stamp) >= parseInt(getBuyPcs)) {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('#complete-modal').fadeIn(250);
                }
                else {
                    // var stampsLeft = parseInt(getBuyPcs) - parseInt(data.loyalty_details.stamp);
                    //
                    // stampsLeft == 1 ?
                    // $('.stamps-left').text(stampsLeft + ' stamp') :
                    // $('.stamps-left').text(stampsLeft + ' stamps');
                    if (_this.customer.first_name != ' ' && _this.customer.last_name != ' ') {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.customer-name').text(_this.customer.first_name + ' ' + _this.customer.last_name);
                    }
                    else {
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.customer-name').text(_this.customer.number);
                    }
                    _this.quantity == 1 ?
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.stamps-added').text(_this.quantity + ' stamp') :
                        __WEBPACK_IMPORTED_MODULE_8_jquery__('.stamps-added').text(_this.quantity + ' stamps');
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('#added-modal').fadeIn(250);
                }
                var self = _this;
                self.backToScannerTimeout = setTimeout(function () {
                    __WEBPACK_IMPORTED_MODULE_8_jquery__('.confirmation-modal').hide();
                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], {}, {
                        animate: true,
                        direction: 'back'
                    });
                }, 5250);
            })
                .catch(function (error) {
                __WEBPACK_IMPORTED_MODULE_8_jquery__('#btn-submit').find('.fa').remove();
                console.log(error);
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_8_jquery__('input[type="number"]').addClass('has-error').next('.text-validate').text('Quantity must be greater than 0');
        }
    };
    return UserRedeemPage;
}());
UserRedeemPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-redeem',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-redeem\page-user-redeem.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content padding>\n\n  <!-- <p class="title" (click)="goBack()">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n\n    Back to Deals\n\n  </p> -->\n\n\n\n  <div>\n\n    <p class="title-deal"></p>\n\n		<form>\n\n			<label>\n\n        <ion-input type="number" name="quantity" placeholder="Enter Quantity" [(ngModel)]="quantity" [ngModelOptions]="{standalone: true}" value="1"></ion-input>\n\n        <span class="text-validate"></span>\n\n      </label>\n\n			<button id="btn-submit" (click)="Submit()" class="btn btn-green">Submit</button>\n\n		</form>\n\n	</div>\n\n</ion-content>\n\n\n\n<div id="complete-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay"></div>\n\n  <div class="confirmation-modal-content">\n\n    <span class="fa fa-check"></span>\n\n    CONGRATULATIONS<br />\n\n    YOU\'VE EARNED <span class="free-pcs"></span> FREE <span class="free-prod"></span>\n\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n\n  </div>\n\n</div>\n\n\n\n<div id="added-modal" class="confirmation-modal">\n\n  <div class="confirmation-modal-overlay"></div>\n\n  <div class="confirmation-modal-content">\n\n    <span class="fa fa-check"></span>\n\n    DONE<br />\n\n    YOU\'VE GIVEN <span class="stamps-added"></span> TO <br />\n\n    <span class="customer-name"></span>\n\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-redeem\page-user-redeem.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_7__providers__["c" /* SocketService */]])
], UserRedeemPage);

//# sourceMappingURL=page-user-redeem.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(50);
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
        selector: 'page-reset-pass-success',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n\n    Reset Password Success\n\n  </p>\n\n  <p class="description text-center">You should receive an email or text from us shortly. <br>We’ll meet you back here.<p>\n\n  <a class="btn btn-green text-center" (click)="goHome()">Back to Login</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-reset-pass-success\page-reset-pass-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], ResetPassSuccessPage);

//# sourceMappingURL=page-reset-pass-success.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(434);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_menu_page_menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_user_register_page_user_register__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_user_customers_page_user_customers__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_user_deals_page_user_deals__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_page_user_redeem_page_user_redeem__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_page_user_add_customer_page_user_add_customer__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_screen_orientation__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_ngx_qrcode2__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_barcode_scanner__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_page_user_chat_page_user_chat__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__providers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_elasticTextarea__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_chatBubble__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__directives__ = __webpack_require__(792);
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
            __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_user_scanner_page_user_scanner__["a" /* UserScannerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_user_register_page_user_register__["a" /* UserRegisterPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_user_customers_page_user_customers__["a" /* UserCustomersPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_redeem_page_user_redeem__["a" /* UserRedeemPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_33__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_34__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_35__directives__["a" /* KeyboardAttachDirective */],
            __WEBPACK_IMPORTED_MODULE_31__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {
                platforms: {
                    ios: {
                        // These options are available in ionic-angular@2.0.0-beta.2 and up.
                        scrollAssist: false,
                        autoFocusAssist: false // Valid options appear to be ['instant', 'delay', false]
                    }
                    // http://ionicframework.com/docs/v2/api/config/Config/)
                }
            }),
            __WEBPACK_IMPORTED_MODULE_30__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_27_ngx_qrcode2__["a" /* NgxQRCodeModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__["a" /* SliderPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_page_settings_page_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_page_reset_pass_page_reset_pass__["a" /* ResetPassPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_page_reset_pass_success_page_reset_pass_success__["a" /* ResetPassSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_page_signup_page_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_page_signup_success_page_signup_success__["a" /* SignupSuccessPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_page_menu_page_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_page_user_scanner_page_user_scanner__["a" /* UserScannerPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_page_user_register_page_user_register__["a" /* UserRegisterPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_page_user_customers_page_user_customers__["a" /* UserCustomersPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_page_user_inbox_page_user_inbox__["a" /* UserInboxPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_page_user_deals_page_user_deals__["a" /* UserDealsPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_page_user_redeem_page_user_redeem__["a" /* UserRedeemPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_page_user_add_customer_page_user_add_customer__["a" /* UserAddCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_page_user_edit_customer_page_user_edit_customer__["a" /* UserEditCustomerPage */],
            __WEBPACK_IMPORTED_MODULE_33__components_elasticTextarea__["a" /* ElasticTextarea */],
            __WEBPACK_IMPORTED_MODULE_34__components_chatBubble__["a" /* ChatBubble */],
            __WEBPACK_IMPORTED_MODULE_31__pages_page_user_chat_page_user_chat__["a" /* UserChatPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_24__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_29__service_api_service_component__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_32__providers__["a" /* DatabaseService */],
            __WEBPACK_IMPORTED_MODULE_32__providers__["c" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_32__providers__["d" /* UtilService */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_util_service__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// Chat


var UserInboxPage = (function () {
    function UserInboxPage(navCtrl, storage, navParams, api, _zone, socketService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.api = api;
        this._zone = _zone;
        this.socketService = socketService;
        this.hasNotify = false;
        this.hasNoData = false;
        this.isRefetch = false;
        this.inInbox = true;
        this.init();
    }
    UserInboxPage.prototype.ionViewWillEnter = function () {
        this.socketService.connect();
        this.fetchInboxData();
    };
    UserInboxPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
        this.inInbox = false;
    };
    UserInboxPage.prototype.fetchInboxData = function () {
        var _this = this;
        // Display all members
        this.storage.get('user').then(function (user) {
            _this.user = user;
            if (user.shop_id[0]) {
                _this.api.Message.room_list(user.shop_id[0]).then(function (members) {
                    console.log('Inbox data fetching....');
                    // console.log(members);
                    if (members.length) {
                        var withChats = [], noChats = [];
                        for (var x = 0; x < members.length; x++) {
                            if (members[x].last_chat.length > 0) {
                                withChats.push(members[x]);
                            }
                            else {
                                noChats.push(members[x]);
                            }
                        }
                        var chatsSort = withChats.sort(function (a, b) {
                            return b.last_chat[0].epoch - a.last_chat[0].epoch;
                        });
                        var newChats = withChats;
                        noChats.forEach(function (res) {
                            newChats.push(res);
                        });
                        if (!_this.isRefetch) {
                            _this.isRefetch = true;
                            console.log('Refetching inbox data...');
                            return _this.fetchInboxData();
                        }
                        else {
                            _this.membersList = newChats;
                            console.log(members);
                            __WEBPACK_IMPORTED_MODULE_9_jquery__('body').find('.fa.loader').remove();
                            console.log('Inbox data loaded');
                        }
                    }
                    else {
                        _this.hasNoData = true;
                        __WEBPACK_IMPORTED_MODULE_9_jquery__('body').find('.fa.loader').remove();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
                _this.hasNoData = true;
                __WEBPACK_IMPORTED_MODULE_9_jquery__('body').find('.fa.loader').remove();
            }
        });
    };
    UserInboxPage.prototype.init = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    if (chatNotification.business_id == user.shop_id[0]) {
                        console.log('Notification from member');
                        _this.hasNotify = true;
                    }
                    if (_this.inInbox) {
                        _this.fetchInboxData();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    UserInboxPage.prototype.formatEpoch = function (epoch) {
        return __WEBPACK_IMPORTED_MODULE_7__providers_util_service__["a" /* UtilService */].getCalendarDay(epoch);
    };
    UserInboxPage.prototype.viewMessage = function (memberDetail, businessDetail) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
            animate: true,
            direction: 'forward',
            "memberDetail": memberDetail,
            "businessDetail": businessDetail
        });
    };
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-inbox',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-inbox\page-user-inbox.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Inbox</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content >\n\n  <!-- <span [ngClass]="[membersList ? \'hidden\' : \'visible\']"> Inbox is empty </span> -->\n\n\n\n    <h5 *ngIf="hasNoData"> Your inbox is empty </h5>\n\n\n\n    <ion-list id="inbox-list">\n\n\n\n      <ion-item *ngFor="let member of membersList " tappable (click)="viewMessage(member.user_id[0],member.business_id[0])">\n\n\n\n        <span [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="name" *ngIf="member.user_id.length !=0 && member.user_id[0].first_name != \' \' || member.user_id.length !=0 && member.user_id[0].last_name != \' \'"> {{member.user_id[0].first_name}} {{member.user_id[0].last_name}}</span>\n\n\n\n        <!-- <span [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="name" *ngIf="member.user_id[0] && member.user_id[0].first_name && !member.user_id[0].last_name"> {{member.user_id[0].first_name}}</span>\n\n\n\n        <span [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="name" *ngIf="member.user_id[0] && member.user_id[0].last_name && !member.user_id[0].first_name"> {{member.user_id[0].last_name}}</span> -->\n\n\n\n        <span [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="name" *ngIf="member.user_id.length !=0 && member.user_id[0].first_name === \' \' && member.user_id[0].last_name === \' \' "> {{ member.user_id[0].number }}</span>\n\n\n\n        <span class="name" *ngIf="member.user_id.length == 0"> No Member Data </span>\n\n\n\n        <p [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="message" *ngIf="member.last_chat.length != 0"> {{ member.last_chat[0].message  }}  </p>\n\n\n\n        <span [ngClass]="[member.last_chat.length != 0 && member.last_chat[0].is_read == false && member.last_chat[0].message_by === \'member\' ? \'new\' : \'\']" class="date-time" *ngIf="member.last_chat.length != 0">  {{formatEpoch(member.last_chat[0].epoch)}} </span>\n\n\n\n      </ion-item>\n\n\n\n      <span class="fa fa-spinner fa-spin loader"></span>\n\n\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-inbox\page-user-inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_8__providers__["c" /* SocketService */]])
], UserInboxPage);

//# sourceMappingURL=page-user-inbox.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_database_service__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_sql__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_socket_service__ = __webpack_require__(379);
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
    function MyApp(platform, menu, statusBar, splashScreen, screenOrientation, keyboard, storage) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.screenOrientation = screenOrientation;
        this.keyboard = keyboard;
        this.storage = storage;
        platform.ready().then(function () {
            _this.screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
            _this.statusBar.styleDefault();
            var self = _this;
            setTimeout(function () {
                self.splashScreen.hide();
            }, 100);
        });
        this.storage.get("user").then(function (user) {
            if (user !== null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_page_dashboard_page_dashboard__["a" /* DashboardPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__["a" /* SliderPage */];
            }
        });
    }
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('nav'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\Projects\business-app\src\app\app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n\n\n\n<!-- <ion-menu [content]="nav">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Pages</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu> -->\n\n'/*ion-inline-end:"E:\Projects\business-app\src\app\app.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */], __WEBPACK_IMPORTED_MODULE_9__providers_database_service__["a" /* DatabaseService */], __WEBPACK_IMPORTED_MODULE_10__providers_sql__["a" /* Sql */], __WEBPACK_IMPORTED_MODULE_11__providers_socket_service__["a" /* SocketService */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 481:
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

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 264,
	"./af.js": 264,
	"./ar": 265,
	"./ar-dz": 266,
	"./ar-dz.js": 266,
	"./ar-kw": 267,
	"./ar-kw.js": 267,
	"./ar-ly": 268,
	"./ar-ly.js": 268,
	"./ar-ma": 269,
	"./ar-ma.js": 269,
	"./ar-sa": 270,
	"./ar-sa.js": 270,
	"./ar-tn": 271,
	"./ar-tn.js": 271,
	"./ar.js": 265,
	"./az": 272,
	"./az.js": 272,
	"./be": 273,
	"./be.js": 273,
	"./bg": 274,
	"./bg.js": 274,
	"./bn": 275,
	"./bn.js": 275,
	"./bo": 276,
	"./bo.js": 276,
	"./br": 277,
	"./br.js": 277,
	"./bs": 278,
	"./bs.js": 278,
	"./ca": 279,
	"./ca.js": 279,
	"./cs": 280,
	"./cs.js": 280,
	"./cv": 281,
	"./cv.js": 281,
	"./cy": 282,
	"./cy.js": 282,
	"./da": 283,
	"./da.js": 283,
	"./de": 284,
	"./de-at": 285,
	"./de-at.js": 285,
	"./de-ch": 286,
	"./de-ch.js": 286,
	"./de.js": 284,
	"./dv": 287,
	"./dv.js": 287,
	"./el": 288,
	"./el.js": 288,
	"./en-au": 289,
	"./en-au.js": 289,
	"./en-ca": 290,
	"./en-ca.js": 290,
	"./en-gb": 291,
	"./en-gb.js": 291,
	"./en-ie": 292,
	"./en-ie.js": 292,
	"./en-nz": 293,
	"./en-nz.js": 293,
	"./eo": 294,
	"./eo.js": 294,
	"./es": 295,
	"./es-do": 296,
	"./es-do.js": 296,
	"./es.js": 295,
	"./et": 297,
	"./et.js": 297,
	"./eu": 298,
	"./eu.js": 298,
	"./fa": 299,
	"./fa.js": 299,
	"./fi": 300,
	"./fi.js": 300,
	"./fo": 301,
	"./fo.js": 301,
	"./fr": 302,
	"./fr-ca": 303,
	"./fr-ca.js": 303,
	"./fr-ch": 304,
	"./fr-ch.js": 304,
	"./fr.js": 302,
	"./fy": 305,
	"./fy.js": 305,
	"./gd": 306,
	"./gd.js": 306,
	"./gl": 307,
	"./gl.js": 307,
	"./gom-latn": 308,
	"./gom-latn.js": 308,
	"./he": 309,
	"./he.js": 309,
	"./hi": 310,
	"./hi.js": 310,
	"./hr": 311,
	"./hr.js": 311,
	"./hu": 312,
	"./hu.js": 312,
	"./hy-am": 313,
	"./hy-am.js": 313,
	"./id": 314,
	"./id.js": 314,
	"./is": 315,
	"./is.js": 315,
	"./it": 316,
	"./it.js": 316,
	"./ja": 317,
	"./ja.js": 317,
	"./jv": 318,
	"./jv.js": 318,
	"./ka": 319,
	"./ka.js": 319,
	"./kk": 320,
	"./kk.js": 320,
	"./km": 321,
	"./km.js": 321,
	"./kn": 322,
	"./kn.js": 322,
	"./ko": 323,
	"./ko.js": 323,
	"./ky": 324,
	"./ky.js": 324,
	"./lb": 325,
	"./lb.js": 325,
	"./lo": 326,
	"./lo.js": 326,
	"./lt": 327,
	"./lt.js": 327,
	"./lv": 328,
	"./lv.js": 328,
	"./me": 329,
	"./me.js": 329,
	"./mi": 330,
	"./mi.js": 330,
	"./mk": 331,
	"./mk.js": 331,
	"./ml": 332,
	"./ml.js": 332,
	"./mr": 333,
	"./mr.js": 333,
	"./ms": 334,
	"./ms-my": 335,
	"./ms-my.js": 335,
	"./ms.js": 334,
	"./my": 336,
	"./my.js": 336,
	"./nb": 337,
	"./nb.js": 337,
	"./ne": 338,
	"./ne.js": 338,
	"./nl": 339,
	"./nl-be": 340,
	"./nl-be.js": 340,
	"./nl.js": 339,
	"./nn": 341,
	"./nn.js": 341,
	"./pa-in": 342,
	"./pa-in.js": 342,
	"./pl": 343,
	"./pl.js": 343,
	"./pt": 344,
	"./pt-br": 345,
	"./pt-br.js": 345,
	"./pt.js": 344,
	"./ro": 346,
	"./ro.js": 346,
	"./ru": 347,
	"./ru.js": 347,
	"./sd": 348,
	"./sd.js": 348,
	"./se": 349,
	"./se.js": 349,
	"./si": 350,
	"./si.js": 350,
	"./sk": 351,
	"./sk.js": 351,
	"./sl": 352,
	"./sl.js": 352,
	"./sq": 353,
	"./sq.js": 353,
	"./sr": 354,
	"./sr-cyrl": 355,
	"./sr-cyrl.js": 355,
	"./sr.js": 354,
	"./ss": 356,
	"./ss.js": 356,
	"./sv": 357,
	"./sv.js": 357,
	"./sw": 358,
	"./sw.js": 358,
	"./ta": 359,
	"./ta.js": 359,
	"./te": 360,
	"./te.js": 360,
	"./tet": 361,
	"./tet.js": 361,
	"./th": 362,
	"./th.js": 362,
	"./tl-ph": 363,
	"./tl-ph.js": 363,
	"./tlh": 364,
	"./tlh.js": 364,
	"./tr": 365,
	"./tr.js": 365,
	"./tzl": 366,
	"./tzl.js": 366,
	"./tzm": 367,
	"./tzm-latn": 368,
	"./tzm-latn.js": 368,
	"./tzm.js": 367,
	"./uk": 369,
	"./uk.js": 369,
	"./ur": 370,
	"./ur.js": 370,
	"./uz": 371,
	"./uz-latn": 372,
	"./uz-latn.js": 372,
	"./uz.js": 371,
	"./vi": 373,
	"./vi.js": 373,
	"./x-pseudo": 374,
	"./x-pseudo.js": 374,
	"./yo": 375,
	"./yo.js": 375,
	"./zh-cn": 376,
	"./zh-cn.js": 376,
	"./zh-hk": 377,
	"./zh-hk.js": 377,
	"./zh-tw": 378,
	"./zh-tw.js": 378
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
webpackContext.id = 482;

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_page_signup__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_config__ = __webpack_require__(95);
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
            password: '',
            in_mobile: true
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
                _this.http.post(baseUrl + 'api/users/login', { email: profile['email'], is_social: '1', permission: '4', in_mobile: true }).subscribe(function (res) {
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
        var errorLogin = function () {
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.form-login input[name="username"]').addClass('has-error').siblings('.text-validate').text('Invalid Email or Mobile number.');
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.form-login input[name="password"]').addClass('has-error').siblings('.text-validate').text('Invalid Password.');
        };
        if (__WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').length == 0) {
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
        }
        if (getUser && getPass) {
            __WEBPACK_IMPORTED_MODULE_11_jquery__('.form-login input').removeClass('has-error');
            this.http.post(baseUrl + 'api/users/login', this.posts).subscribe(function (res) {
                __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                if (res.json().permission == '3') {
                    errorLogin();
                }
                else {
                    _this.getUser(res.json());
                }
            }, function (err) {
                __WEBPACK_IMPORTED_MODULE_11_jquery__('.btn-green[type="submit"]').find('.fa-spinner').remove();
                errorLogin();
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
            console.log(user);
            //this.navCtrl.setRoot(UserScannerPage, {}, {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_8__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
                animate: true,
                direction: 'forward'
            });
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-login\page-login.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <!-- <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card> -->\n\n\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goSlider()">\n\n    Welcome Back\n\n  </p>\n\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n\n  <!-- <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button> -->\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n  <form class="form-login">\n\n    <label><input type="email" name="username" placeholder="Email or Mobile number" [(ngModel)]="posts.username" /><span class="text-validate">Email address is required.</span></label>\n\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span></label>\n\n    <button class="btn-green" type="submit" (click)="logMeIn()">Log In</button>\n\n  </form>\n\n  <a class="description forgot-pass" (click)="goReset()">Forgot your password?</a>\n\n  <!-- <hr class="hr" />\n\n  <p class="description">Don\'t have an account? <a href="#" (click)="goSignup()">Sign Up</a></p> -->\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-login\page-login.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */]) === "function" && _f || Object])
], LoginPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=page-login.js.map

/***/ }),

/***/ 501:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_register_page_user_register__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(24);
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
    function UserScannerPage(navCtrl, navParams, barcodeScanner, api, storage, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.api = api;
        this.storage = storage;
        this.platform = platform;
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
    UserScannerPage.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_dashboard_page_dashboard__["a" /* DashboardPage */], {}, {
            animate: true,
            direction: 'back'
        });
    };
    UserScannerPage.prototype.goInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    UserScannerPage.prototype.ionViewWillEnter = function () {
        var self = this;
        this.storage.get('shop_id').then(function (res) {
            self.shop_id = res;
            console.log(self.shop_id);
            self.areaCode = 1;
            self.storage.get('user').then(function (user) {
                self.user = user;
                self.hasData = true;
            });
        });
    };
    UserScannerPage.prototype.ionViewDidLoad = function () {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_7_jquery__('body').on('click', '.country-code, .country-dropdown-val', function () {
            __WEBPACK_IMPORTED_MODULE_7_jquery__(this).closest('.holder-country-code').toggleClass('showDropdown');
            console.log('yes');
            if (__WEBPACK_IMPORTED_MODULE_7_jquery__(this).hasClass('country-dropdown-val')) {
                var getImg = __WEBPACK_IMPORTED_MODULE_7_jquery__(this).find('img').attr('src');
                self.areaCode = __WEBPACK_IMPORTED_MODULE_7_jquery__(this).data('area');
                __WEBPACK_IMPORTED_MODULE_7_jquery__(this).parent('.country-dropdown').siblings('.country-code').find('img').attr('src', getImg);
            }
        });
    };
    UserScannerPage.prototype.ionViewWillLeave = function () {
        __WEBPACK_IMPORTED_MODULE_7_jquery__('body').off('click', '.country-code, .country-dropdown-val');
    };
    UserScannerPage.prototype.SubmitNumber = function () {
        var _this = this;
        var mobileRegex = /^[0-9]{10}$/, self = this;
        if (this.phone) {
            if (mobileRegex.test(this.phone) == true) {
                this.phone = "+" + this.areaCode + this.phone;
                // console.log(this.phone);
                // if (this.phone.toString().length == 10) {
                //   this.phone = "+1" + this.phone;
                // } else {
                //   this.phone = "+" + this.phone;
                // }
                __WEBPACK_IMPORTED_MODULE_7_jquery__('input[name="number"]').removeClass('has-error').siblings('.text-validate').text('');
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').append('<span class="fa fa-spinner fa-spin"></span>');
                this.storage.get('user').then(function (user) {
                    _this.user = user;
                    _this.api.Business.checker(_this.phone, self.shop_id).then(function (customer) {
                        _this.api.Users.user(customer.customer.user_id[0]).then(function (thisCustomer) {
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                            if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_register_page_user_register__["a" /* UserRegisterPage */], { customer: customer }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }
                            else {
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: self.shop_id, customer: customer.customer.user_id[0] }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }
                        });
                    }).catch(function (err) {
                        console.log(err);
                        var exist = JSON.parse(err['_body']).exist;
                        if (exist == 0) {
                            var getFName = ' ', getLName = ' ';
                            _this.api.Business.register(_this.phone, self.shop_id, getFName, getLName).then(function (customer) {
                                __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: self.shop_id, customer: customer.customer.user_id[0] }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }).catch(function (err) {
                                __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                __WEBPACK_IMPORTED_MODULE_7_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number does not exist or invalid.');
                            });
                        }
                        else {
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                        }
                    });
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is invalid.');
            }
        }
        else {
            __WEBPACK_IMPORTED_MODULE_7_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number is required.');
        }
    };
    UserScannerPage.prototype.scanCode = function () {
        var _this = this;
        var self = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // this.createdCode = barcodeData
            _this.createdCode = JSON.parse(barcodeData.text);
            _this.storage.get("user").then(function (user) {
                _this.api.Business.scan_qr(_this.createdCode.MembershipNumber, user._id, self.shop_id).then(function (customer) {
                    _this.api.Users.user(customer.customer.user_id[0]).then(function (thisCustomer) {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                        if (thisCustomer.first_name == ' ' && thisCustomer.last_name == ' ') {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_register_page_user_register__["a" /* UserRegisterPage */], { customer: customer }, {
                                animate: true,
                                direction: 'forward'
                            });
                        }
                        else {
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: self.shop_id, customer: customer.customer.user_id[0] }, {
                                animate: true,
                                direction: 'forward'
                            });
                        }
                    }).catch(function (err) {
                        this.message = 'Invalid membership code';
                    });
                });
            });
        });
    };
    return UserScannerPage;
}());
UserScannerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-scanner',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-user-scanner\page-user-scanner.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <i class="fa fa-angle-left fa-lg" (click)="goBack()"></i>\n\n    <span class="page-title">Scanner</span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <a class="btn btn-green" (click)="scanCode()">Scan QR Code</a>\n\n  <span>{{message}}</span>\n\n  <div class="divider">\n\n    <span>or</span>\n\n  </div>\n\n  <form class="form-mobile">\n\n    <label>\n\n      <div class="holder-country-code">\n\n        <div class="country-code">\n\n          <img src="assets/images/icon-flag-us.jpg" alt=""/>\n\n          <span class="fa fa-caret-down"></span>\n\n        </div>\n\n        <ul class="country-dropdown">\n\n          <li class="country-dropdown-val" data-area="1">\n\n            <img src="assets/images/icon-flag-us.jpg" alt=""/><span class="country-name">U.S. </span><span class="country-area-code">(+1)</span>\n\n          </li>\n\n          <li class="country-dropdown-val" data-area="1">\n\n            <img src="assets/images/icon-flag-ca.jpg" alt=""/><span class="country-name">Canada </span><span class="country-area-code">(+1)</span>\n\n          </li>\n\n          <li class="country-dropdown-val" data-area="63">\n\n            <img src="assets/images/icon-flag-ph.jpg" alt=""/><span class="country-name">PH </span><span class="country-area-code">(+63)</span>\n\n          </li>\n\n        </ul>\n\n      </div>\n\n      <input type="number" [(ngModel)]="phone" name="number" placeholder="Mobile number" />\n\n      <span class="text-validate"></span>\n\n    </label>\n\n    <button class="btn btn-orange" (click)="SubmitNumber()" type="submit">Submit</button>\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-user-scanner\page-user-scanner.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
], UserScannerPage);

//# sourceMappingURL=page-user-scanner.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_settings_page_settings__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var DashboardPage = (function () {
    function DashboardPage(navCtrl, http, api, storage, _zone, socketService, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.api = api;
        this.storage = storage;
        this._zone = _zone;
        this.socketService = socketService;
        this.navParams = navParams;
        this.hasData = false;
        this.hasNotify = false;
        this.notifCount = 0;
        this.hasShopId = false;
        this.notifCountTotal = 0;
        if (this.navParams.get('shop_id')) {
            __WEBPACK_IMPORTED_MODULE_10_jquery__('.company-name').text('');
            this.hasShopId = true;
            this.storage.set('shop_id', this.navParams.get('shop_id'));
        }
    }
    DashboardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.socketService.connect();
        this.getNotificationCount();
        this.storage.get('shop_name').then(function (result) {
            if (result != null) {
                __WEBPACK_IMPORTED_MODULE_10_jquery__('.company-name').text(result);
            }
        });
        this.storage.get('user').then(function (user) {
            _this.user = user;
            _this.firstname = user.first_name;
            _this.storage.get('shop_id').then(function (res) {
                if (res == null) {
                    _this.storage.set('shop_id', user.shop_id[0]);
                    _this.shop_id = user.shop_id[0];
                }
                else {
                    _this.shop_id = res;
                }
                _this.storage.get('shop_name').then(function (result) {
                    if (result == null) {
                        _this.api.Business.info(_this.shop_id).then(function (data) {
                            __WEBPACK_IMPORTED_MODULE_10_jquery__('.company-name').text(data.company_name);
                            _this.storage.set('shop_name', data.company_name);
                        });
                    }
                });
            });
            _this.hasData = true;
            _this.initInboxNotification();
        });
    };
    DashboardPage.prototype.getNotificationCount = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            if (user.shop_id[0]) {
                _this.api.Message.room_list(user.shop_id[0]).then(function (members) {
                    if (members.length) {
                        var withChats = [];
                        for (var x = 0; x < members.length; x++) {
                            if (members[x].last_chat.length > 0 && members[x].last_chat[0].is_read === false && members[x].last_chat[0].message_by !== 'business') {
                                withChats.push(members[x]);
                            }
                        }
                        _this.notifCountTotal = withChats.length;
                        console.log(_this.notifCountTotal);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
            else {
            }
        });
    };
    DashboardPage.prototype.initInboxNotification = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    if (chatNotification.business_id == _this.shop_id) {
                        _this.hasNotify = true;
                        _this.getNotificationCount();
                        // this.notifCount++;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    DashboardPage.prototype.ToScanner = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__["a" /* UserScannerPage */], { shop_id: this.shop_id }, {
            animate: true,
            direction: 'forward'
        });
    };
    DashboardPage.prototype.ToCustomers = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__["a" /* UserCustomersPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    DashboardPage.prototype.ToInbox = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__["a" /* UserInboxPage */], {}, {
            animate: true,
            direction: 'forward'
        });
    };
    DashboardPage.prototype.ToSettings = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__page_settings_page_settings__["a" /* SettingsPage */], { shop_id: this.shop_id }, {
            animate: true,
            direction: 'forward'
        });
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-dashboard',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-dashboard\page-dashboard.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <img class="header-logo" src="assets/images/logo-min.png" alt="GoPage Logo">\n\n    <img class="business-icon" src="assets/icon/for-business.png" alt="For Business">\n\n    <span class="name">\n\n      <span class="fa-stack has-notif"  (click)="ToInbox()">\n\n        <i class="fa fa-square fa-stack-2x"></i>\n\n        <!-- <span class="fa fa-stack-1x" *ngIf="!hasNotify">0</span> -->\n\n        <span class="fa fa-stack-1x" >{{ notifCountTotal }}</span>\n\n      </span>\n\n      Hi, {{firstname}}\n\n    </span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <div class="container dashboard-menu">\n\n    <h3 class="company-name"></h3>\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToScanner()">\n\n          <img src="assets/icon/scanner.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Scanner\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToCustomers()">\n\n          <img src="assets/icon/customers.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Customers\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n\n\n    <div class="row">\n\n      <div class="col">\n\n        <ion-card (click)="ToInbox()">\n\n          <img src="assets/icon/inbox.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Inbox\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n\n\n      <div class="col">\n\n        <ion-card (click)="ToSettings()">\n\n          <img src="assets/icon/settings.png"/>\n\n          <ion-card-content>\n\n            <ion-card-title>\n\n              Settings\n\n            </ion-card-title>\n\n          </ion-card-content>\n\n        </ion-card>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-dashboard\page-dashboard.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_8__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_7__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], DashboardPage);

//# sourceMappingURL=page-dashboard.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(262);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(150);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(151);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(481);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(152);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(379);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__socket_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(44);
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
        selector: 'page-menu',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-menu\page-menu.html"*/'<ion-content padding class="content-page-menu">\n\n  <p class="title">\n\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n\n  </p>\n\n\n\n  <ion-list class="menu-list">\n\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n      <span class="label-{{p.title}}">{{p.title}}</span>\n\n    </button>\n\n  </ion-list>\n\n\n\n  <hr class="divider" />\n\n  <a class="logout" href="#" (click)="logOut()">Logout</a>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-menu\page-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], MenuPage);

//# sourceMappingURL=page-menu.js.map

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__ = __webpack_require__(789);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__elasticTextarea__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 789:
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
        inputs: ['placeholder', 'lineHeight', 'maxExpand'],template:/*ion-inline-start:"E:\Projects\business-app\src\components\elasticTextarea\elasticTextarea.html"*/'<!--suppress ALL -->\n\n<ion-textarea #ionTxtArea\n\n              placeholder=\'{{ "Type your message..." }}\'\n\n              [(ngModel)]="content"\n\n              (ngModelChange)=\'onChange($event)\'>\n\n</ion-textarea>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\components\elasticTextarea\elasticTextarea.html"*/
    }),
    __metadata("design:paramtypes", [])
], ElasticTextarea);

//# sourceMappingURL=elasticTextarea.js.map

/***/ }),

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatBubble__ = __webpack_require__(791);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__chatBubble__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 791:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatBubble; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(57);
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
        inputs: ['chatMessage'],template:/*ion-inline-start:"E:\Projects\business-app\src\components\chatBubble\chatBubble.html"*/'<div>\n\n  <div class="chat-bubble {{chatMessage.message_by == \'business\' ? \'right\' : \'left\'}}">\n\n    <div class="message">{{chatMessage.message}}</div>\n\n  </div>\n\n  <div class="message-detail {{chatMessage.message_by == \'business\' ? \'right\' : \'left\'}}">\n\n    <span>{{formatEpoch(chatMessage.epoch)}}</span>\n\n  </div>\n\n</div>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\components\chatBubble\chatBubble.html"*/
    }),
    __metadata("design:paramtypes", [])
], ChatBubble);

//# sourceMappingURL=chatBubble.js.map

/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__ = __webpack_require__(793);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__keyboard_attach_directive__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeyboardAttachDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* Content */])
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
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */]])
], KeyboardAttachDirective);

//# sourceMappingURL=keyboard-attach.directive.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(22);
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
        this.slidesOptions = { initialSlide: 0 };
    }
    SliderPage.prototype.slideNext = function () {
        this.slider.slideNext();
    };
    SliderPage.prototype.slidePrev = function () {
        this.slider.slidePrev();
    };
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
            __WEBPACK_IMPORTED_MODULE_4_jquery__('.btn-green').trigger('click');
        }
    };
    return SliderPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('slider'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
], SliderPage.prototype, "slider", void 0);
SliderPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-slider',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-slider\page-slider.html"*/'<!-- <ion-header no-shadow>\n\n  <ion-navbar>\n\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n\n\n<ion-content no-bounce class="page-slider text-center">\n\n  <ion-slides #slider pager="true" (ionSlideNextStart)="onSlideNext($event)">\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <p class="subheading">For Business</p>\n\n      <img class="slider-img main-image" src="assets/images/owner-main-image.jpg" alt="Business Owner Main Image">\n\n      <!-- <p class="main-title">Drive Traffic &amp; Engage Your <br>Customers With The GoPage <br>Platform</p> -->\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <p class="subheading">For Business</p>\n\n\n\n      <img class="slider-img" src="assets/images/owner-iphone-messages.png" alt="">\n\n      <p class="subtitle">\n\n        Communicate in real time with your <br>customers. Target certain customers for <br>products or services you already know <br>they love.\n\n      </p>\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <p class="subheading">For Business</p>\n\n\n\n      <img class="slider-img" src="assets/images/owner-iphone-qrcode.png" alt="">\n\n      <p class="subtitle">\n\n        Our digital punch card system allows you to <br>engage and reward your loyal customers, <br>directly impacting traffic, driving sales and <br>profitability.\n\n        <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n        <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <p class="subheading">For Business</p>\n\n\n\n      <img class="slider-img" src="assets/images/owner-iphone-deals.png" alt="">\n\n      <p class="subtitle">\n\n        GoPage technology allows you to <br>easily create and deliver deals and<br> specials to customers in your area.\n\n      </p>\n\n      <span class="slide-nav prev" outline (click)="slidePrev()"><i class="fa fa-angle-left"></i></span>\n\n      <span class="slide-nav next" outline (click)="slideNext()"><i class="fa fa-angle-right"></i></span>\n\n    </ion-slide>\n\n\n\n    <ion-slide>\n\n    </ion-slide>\n\n  </ion-slides>\n\n  <!-- <button class="btn-slider btn-green" (click)="signUp()">Get Started</button> -->\n\n  <button class="btn-slider btn-green" (click)="signIn()">Log In</button>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-slider\page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_success_page_signup_success__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_scanner_page_user_scanner__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_config__ = __webpack_require__(95);
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
        selector: 'page-signup',template:/*ion-inline-start:"E:\Projects\business-app\src\pages\page-signup\page-signup.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Login</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-content padding>\n\n  <ion-card *ngIf="userData">\n\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n\n  </ion-card>\n\n\n\n  <p class="title">\n\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">Sign Up\n\n  </p>\n\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n\n  <div class="divider">\n\n    <span>Or sign up with email</span>\n\n  </div>\n\n  <form class="form-signup">\n\n    <label>\n\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n\n      <span class="text-validate">First name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n\n      <span class="text-validate">Last name is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="text" name="username" placeholder="Username" [(ngModel)]="posts.username" />\n\n      <span class="text-validate">Username is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n\n      <span class="text-validate">Email address is required.</span>\n\n    </label>\n\n    <label>\n\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n\n    </label>\n\n    <input class="btn-green" type="submit" value="Sign Up" (click)="signMeUp()" />\n\n  </form>\n\n  <p class="description">By signing up, you agree to GoPage\'s <br><a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></p>\n\n</ion-content>\n\n'/*ion-inline-end:"E:\Projects\business-app\src\pages\page-signup\page-signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupPage);

//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    baseUrl: 'https://gopage-api.herokuapp.com/',
    ChatBaseUrl: 'https://chat-gopage-server-api.herokuapp.com/',
};
/* harmony default export */ __webpack_exports__["a"] = (config);
//# sourceMappingURL=config.js.map

/***/ })

},[429]);
//# sourceMappingURL=main.js.map