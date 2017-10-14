webpackJsonp([0],{

/***/ 148:
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

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(148);
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

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDealsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_redeem_page_user_redeem__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(24);
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
        selector: 'page-user-deals',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-deals/page-user-deals.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo.png" alt="">\n    <div class="profile">\n      <img class="profile-img" src="assets/images/img-profile.png" alt="">\n      <span class="fa fa-angle-down"></span>\n    </div>\n    <span class="inbox fa fa-envelope-o"></span>\n  </ion-navbar>\n\n  <ion-list>\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n      <span class="label-{{p.title}}">{{p.title}}</span>\n    </button>\n  </ion-list>\n</ion-header> -->\n\n<ion-content padding>\n  <p class="title" (click)="goScanner()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Scanner\n  </p>\n\n  <div class="holder-list" *ngIf="hasData">\n    <div class="holder-deal" *ngFor="let deals of dealsList">\n      <div class="deal-info">\n        <p class="deal-title">\n           {{deals.template}}\n        </p>\n        <p class="deal-stamp">\n          <span *ngIf="deals.is_stamp == \'1\'">{{deals.stamp}} of {{deals.buy_pcs}}</span>\n        </p>\n        <p class="deal-expire">\n          Expires {{dateFormat(deals.end_date)}}\n        </p>\n      </div>\n      <button (click)="Stamp(deals)" class="btn btn-green" *ngIf="deals.is_stamp == \'1\'">Stamp</button>\n      <button (click)="Redeem(deals, $event)" class="btn btn-green btn-redeem" *ngIf="deals.is_stamp == \'0\'">Redeem</button>\n    </div>\n  </div>\n</ion-content>\n\n<div id="redeem-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    DONE<br />\n    YOUR TOTAL CHECK-INS: <span class="checkins-count"></span><br />\n    THANK YOU! <span class="customer-name"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-deals/page-user-deals.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserDealsPage);

//# sourceMappingURL=page-user-deals.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(93);
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
        selector: 'page-reset-pass',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-reset-pass/page-reset-pass.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Reset Password\n  </p>\n  <form class="form-reset">\n    <label><input type="email" name="email" placeholder="Email address or Mobile number" [(ngModel)]="posts.email" /><span class="text-validate">Email address is required.</span></label>\n    <button class="btn-green" type="submit" (click)="resetMe()">Send</button>\n  </form>\n  <p class="description text-center">We\'ll email or text your new generated password.<p>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-reset-pass/page-reset-pass.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
], ResetPassPage);

//# sourceMappingURL=page-reset-pass.js.map

/***/ }),

/***/ 171:
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
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 214:
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
webpackEmptyAsyncContext.id = 214;

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_signup_page_signup__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(54);
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
        selector: 'page-signup-success',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-signup-success/page-signup-success.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Sign Up Success\n  </p>\n  <p class="description text-center">We’ve just emailed you a link. <br>Please check your inbox and confirm your email<p>\n  <a class="btn btn-green text-center" (click)="goLogin()">Okay</a>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-signup-success/page-signup-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], SignupSuccessPage);

//# sourceMappingURL=page-signup-success.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCustomersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_add_customer_page_user_add_customer__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(29);
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
            if (page_size == null || page_size == '0') {
                page_size = '10';
                __WEBPACK_IMPORTED_MODULE_7_jquery__('#page_size').val(10);
            }
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
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').eq(0).addClass('active');
                        if (__WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length > 9) {
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').append('<li class="dot-last">...</li><li class="clone-pagination">' + __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length + '</li>');
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').prepend('<li class="clone-pagination hide" data-page="1">1</li><li class="dot-first hide">...</li>');
                            __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').eq(4).nextAll('.pagination-count').addClass('hide');
                        }
                    }
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.holder-pagination').show();
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
            __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').not(this).removeClass('active');
            if (__WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length > 9) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').not(this).addClass('hide');
                __WEBPACK_IMPORTED_MODULE_7_jquery__(this).removeClass('hide');
                if (getPage > 3 && getPage < __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length - 2) {
                    for (var x = 1; x < 3; x++) {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + (getPage + x) + '"], .pagination-count[data-page="' + (getPage - x) + '"]').removeClass('hide');
                    }
                }
                else if (getPage < 4) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + getPage + '"]').prevAll('.pagination-count').removeClass('hide');
                    for (var x = 5 - getPage; x >= 1; x--) {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + (getPage + x) + '"]').removeClass('hide');
                    }
                }
                else if (getPage > __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length - 4) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + getPage + '"]').nextAll('.pagination-count').removeClass('hide');
                    for (var x = getPage; x > __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length - 4; x--) {
                        __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + (x - 1) + '"]').removeClass('hide');
                    }
                }
                if (__WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="2"]').hasClass('hide')) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.clone-pagination:eq(0), .dot-first').removeClass('hide');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.clone-pagination:eq(0), .dot-first').addClass('hide');
                }
                if (__WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="' + (__WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length - 1) + '"]').hasClass('hide')) {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.clone-pagination:last-child, .dot-last').removeClass('hide');
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_7_jquery__('.clone-pagination:last-child, .dot-last').addClass('hide');
                }
            }
            __WEBPACK_IMPORTED_MODULE_7_jquery__(this).addClass('active').closest('.holder-pagination').hide().closest('.scroll-content').prepend('<span class="fa fa-spinner fa-spin loader"></span>');
            getList(getPage, self.page_size);
        });
        __WEBPACK_IMPORTED_MODULE_7_jquery__('body').on('click', '.clone-pagination', function () {
            if (__WEBPACK_IMPORTED_MODULE_7_jquery__(this).index() == 0) {
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count[data-page="1"]').trigger('click');
            }
            else {
                var paginationCount = __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').length;
                __WEBPACK_IMPORTED_MODULE_7_jquery__('.pagination-count').eq(paginationCount - 1).trigger('click');
            }
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
        selector: 'page-user-customers',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-customers/page-user-customers.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="page-user-customers">\n  <p class="title">\n    Customers\n    <a class="btn btn-green" href="#" (click)="goAddUser()">Add New</a>\n  </p>\n  <p class="description">\n    Show <input id="page_size" type="number" name="entry" [(ngModel)]="page_size"/> entries\n  </p>\n  <span class="fa fa-spinner fa-spin loader"></span>\n  <div class="holder-list" *ngIf="hasData">\n    <div class="holder-accordion" *ngFor="let customer of customersList">\n      <span class="dropdown" (click)="showDropdown($event)">\n        Actions <span class="fa fa-angle-down"></span>\n        <ul class="dropdown-menu">\n          <li (click)="goEditUser()">Edit</li>\n          <li (click)="updateModal(\'suspend\')" *ngIf="customer.user_id[0].status !== \'2\'">Suspend</li>\n          <li (click)="updateModal(\'delete\')" *ngIf="customer.user_id[0].status !== \'0\'">Delete</li>\n        </ul>\n      </span>\n      <div class="accordion-header" (click)="toggleAccordion($event)">\n        <span *ngIf="customer.user_id[0].first_name != \' \'">{{customer.user_id[0].first_name}}</span> <span *ngIf="customer.user_id[0].last_name != \' \'">{{customer.user_id[0].last_name}}</span>\n        <span *ngIf="customer.user_id[0].first_name == \' \'"><span *ngIf="customer.user_id[0].last_name == \' \'">{{customer.user_id[0].number}}</span></span>\n      </div>\n      <div class="accordion-body">\n        <span class="list-label">Role</span><span class="list-data">{{customer.user_id[0].permission === \'1\' ? \'Administrator\' : customer.user_id[0].permission === \'2\' ? \'Ambassador\' : \'Member\'}}</span>\n        <span class="list-label">Account Type</span><span class="list-data">{{customer.user_id[0].account_type === \'1\' ? \'Member\' : customer.user_id[0].account_type === \'2\' ? \'Business-Essentials\' : \'Premium\'}}</span>\n        <span class="list-label">Status</span><span class="list-data"><span *ngIf="customer.user_id[0].status == \'1\'">Active</span><span class="not-active" *ngIf="customer.user_id[0].status != \'1\'">{{customer.user_id[0].status === \'0\' ? \'Deleted\' : \'Suspended\'}}</span></span>\n        <span class="list-label">Registered Date</span><span class="list-data">{{dateFormat(customer.user_id[0].created_at)}}</span>\n        <span class="list-label">Last Login</span><span class="list-data">{{dateFormat(customer.user_id[0].last_login)}}</span>\n      </div>\n    </div>\n  </div>\n</ion-content>\n\n<div id="suspend-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Are you sure you want to suspend <span class="name"></span> account?\n    <button id="btn-suspend" class="btn btn-green" (click)="updateThis(\'suspend\')">Yes</button>\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n  </div>\n</div>\n\n<div id="delete-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Are you sure you want to delete <span class="name"></span> account?\n    <button id="btn-delete" class="btn btn-green" (click)="updateThis(\'delete\')">Yes</button>\n    <button class="btn btn-gray" (click)="closeModal()">No</button>\n  </div>\n</div>\n\n<div id="success-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay" (click)="closeModal()"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully <span class="success"></span>.\n\n    <button class="btn btn-green btn-okay" (click)="closeModal()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-customers/page-user-customers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__["a" /* ApiService */]])
], UserCustomersPage);

//# sourceMappingURL=page-user-customers.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__ = __webpack_require__(29);
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
        this.memberDetail = this.navParams.get("memberDetail");
        this.businessDetail = this.navParams.get("businessDetail");
        console.log(this.businessDetail);
        this.btnEmitter = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["w" /* EventEmitter */]();
        this.messages = [];
        this.chatBox = "";
        this.init();
        // console.log(this.memberDetail);
        // console.log(this.businessDetail);
    }
    UserChatPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var room_id = this.memberDetail._id + this.businessDetail._id;
        // GET ALL MESSAGES FROM DATABASE
        this.api.Message.fetch_chats(room_id).then(function (chats) {
            _this.messages = chats;
            _this.hasData = true;
            __WEBPACK_IMPORTED_MODULE_5_jquery__('body').find('.fa.loader').remove();
            _this.scrollToBottom();
        }).catch(function (error) {
            console.log(error);
        });
        this.socketService.connect();
        this.socketService.joinRoom(room_id);
    };
    UserChatPage.prototype.init = function () {
        var _this = this;
        // REAL TIME MESSAGE RESPONSE
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
        var user_id = this.memberDetail._id, business_id = this.businessDetail._id, company_name = this.businessDetail.company_name;
        this.socketService.newRequest(__WEBPACK_IMPORTED_MODULE_4__providers__["d" /* UtilService */].formatMessageRequest(user_id, business_id, company_name, message));
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
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('txtChat'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "txtChat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_14" /* ViewChild */])('content'),
    __metadata("design:type", Object)
], UserChatPage.prototype, "content", void 0);
UserChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["n" /* Component */])({
        selector: 'page-user-chat',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-chat/page-user-chat.html"*/'<ion-header>\n  <ion-navbar>\n    <!-- <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /></a> -->\n    <span class=\'title\' *ngIf="memberDetail.first_name && memberDetail.last_name">{{ memberDetail.first_name }} {{ memberDetail.last_name }}</span>\n\n    <span class=\'title\' *ngIf="!memberDetail.first_name && !memberDetail.last_name"> {{ memberDetail.number }}</span>\n  </ion-navbar>\n</ion-header>\n\n<ion-content id="messages" #content>\n  <div *ngIf="hasData">\n    <ion-list no-lines>\n\n      <ion-item *ngFor="let msg of messages">\n        <chat-bubble [chatMessage]="msg"></chat-bubble>\n      </ion-item>\n\n    </ion-list>\n  </div>\n\n  <span class="fa fa-spinner fa-spin loader"></span>\n</ion-content>\n\n<ion-footer *ngIf="hasData" no-border class="chatPageFooter" [keyboardAttach]="content" [btnClicked]="btnEmitter">\n  <ion-toolbar>\n\n    <ion-item no-lines >\n      <ion-label style="margin:0px;"></ion-label>\n      <div item-content style="width:100%;">\n        <elastic-textarea #txtChat placeholder="Send a message" lineHeight="20" maxExpand="5"></elastic-textarea>\n      </div>\n    </ion-item>\n\n    <ion-buttons right style="margin-left:10px">\n      <button ion-button icon-only\n              [disabled]="txtChat.content.trim().length<1"\n              (click)="sendMessage()">\n              SEND\n        <!-- <ion-icon name="md-send"></ion-icon> -->\n      </button>\n    </ion-buttons>\n\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-chat/page-user-chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["a" /* DatabaseService */],
        __WEBPACK_IMPORTED_MODULE_4__providers__["c" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__service_api_service_component__["a" /* ApiService */]])
], UserChatPage);

//# sourceMappingURL=page-user-chat.js.map

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SOCKET_HOST; });
// export const SOCKET_HOST = "http://localhost:3000";
// export const SOCKET_HOST = "http://localhost:3000";
var SOCKET_HOST = "https://chat-gopage-server.herokuapp.com/";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 261:
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

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_config__ = __webpack_require__(93);
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
        this.Message = {
            member_list: function (shop_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].baseUrl + "api/business_owners/list/" + shop_id, {}).map(function (response) {
                    return response.json();
                }).toPromise();
            },
            fetch_chats: function (room_id) {
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_2__app_config__["a" /* default */].ChatBaseUrl + "api/inbox/members/" + room_id).map(function (response) {
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

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__database_service__ = __webpack_require__(149);
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

/***/ 416:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserAddCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(29);
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
        selector: 'page-user-add-customer',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-add-customer/page-user-add-customer.html"*/'<ion-content padding>\n  <p class="title">\n    Add New User\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <form>\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /><span class="text-validate"></span></label>\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /><span class="text-validate"></span></label>\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.phone" /><span class="text-validate"></span></label>\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate"></span></label>\n    <button id="add-user" class="btn btn-green" type="submit" (click)="addUser()">Save</button>\n  </form>\n</ion-content>\n\n<div id="added-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully added.\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-add-customer/page-user-add-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */]])
], UserAddCustomerPage);

//# sourceMappingURL=page-user-add-customer.js.map

/***/ }),

/***/ 417:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserEditCustomerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__ = __webpack_require__(29);
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
        selector: 'page-user-edit-customer',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-edit-customer/page-user-edit-customer.html"*/'<ion-content padding>\n  <p class="title">\n    Edit User\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <form id="edit-form">\n    <label><input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" /></label>\n    <label><input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" /></label>\n    <label><input type="number" name="number" placeholder="Mobile number" [(ngModel)]="posts.number" /><span class="text-validate"></span></label>\n    <label><input type="text" name="email" placeholder="E-mail address" [(ngModel)]="posts.email" /><span class="text-validate"></span></label>\n    <button id="save-user" class="btn btn-green" type="submit" (click)="saveUser()">Save</button>\n  </form>\n</ion-content>\n\n<div id="edit-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    Account has been successfully updated.\n    <button class="btn btn-green btn-okay" (click)="goBack()">Okay</button>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-edit-customer/page-user-edit-customer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_4__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], UserEditCustomerPage);

//# sourceMappingURL=page-user-edit-customer.js.map

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(28);
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
        selector: 'page-user-register',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-register/page-user-register.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding>\n  <p class="title" (click)="goScanner()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Scanner\n  </p>\n\n  <form>\n    <label>\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n      <span class="text-validate"></span>\n    </label>\n    <label>\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n      <span class="text-validate"></span>\n    </label>\n    <button class="btn btn-gray" type="submit" (click)="skipMe()">Skip</button>\n    <button class="btn btn-green" type="submit" (click)="registerMe()">Submit</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-register/page-user-register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], UserRegisterPage);

//# sourceMappingURL=page-user-register.js.map

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRedeemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(24);
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
        selector: 'page-user-redeem',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-redeem/page-user-redeem.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content padding>\n  <!-- <p class="title" (click)="goBack()">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" />\n    Back to Deals\n  </p> -->\n\n  <div>\n    <p class="title-deal"></p>\n		<form>\n			<label>\n        <ion-input type="number" name="quantity" placeholder="Enter Quantity" [(ngModel)]="quantity" [ngModelOptions]="{standalone: true}" value="1"></ion-input>\n        <span class="text-validate"></span>\n      </label>\n			<button id="btn-submit" (click)="Submit()" class="btn btn-green">Submit</button>\n		</form>\n	</div>\n</ion-content>\n\n<div id="complete-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    CONGRATULATIONS<br />\n    YOU\'VE EARNED <span class="free-pcs"></span> FREE <span class="free-prod"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n\n<div id="added-modal" class="confirmation-modal">\n  <div class="confirmation-modal-overlay"></div>\n  <div class="confirmation-modal-content">\n    <span class="fa fa-check"></span>\n    DONE<br />\n    YOU\'VE GIVEN <span class="stamps-added"></span> TO <br />\n    <span class="customer-name"></span>\n    <button class="btn btn-green" (click)="goScanner()">Complete</button>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-redeem/page-user-redeem.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], UserRedeemPage);

//# sourceMappingURL=page-user-redeem.js.map

/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPassSuccessPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_reset_pass_page_reset_pass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_login_page_login__ = __webpack_require__(54);
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
        selector: 'page-reset-pass-success',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-reset-pass-success/page-reset-pass-success.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">\n    Reset Password Success\n  </p>\n  <p class="description text-center">You should receive an email or text from us shortly. <br>We’ll meet you back here.<p>\n  <a class="btn btn-green text-center" (click)="goHome()">Back to Login</a>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-reset-pass-success/page-reset-pass-success.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], ResetPassSuccessPage);

//# sourceMappingURL=page-reset-pass-success.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(435);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_page_slider_page_slider__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_page_login_page_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_page_reset_pass_page_reset_pass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_page_reset_pass_success_page_reset_pass_success__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_page_signup_page_signup__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_page_signup_success_page_signup_success__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_page_user_register_page_user_register__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_page_user_customers_page_user_customers__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_page_user_deals_page_user_deals__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_page_user_redeem_page_user_redeem__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_page_user_add_customer_page_user_add_customer__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_page_user_edit_customer_page_user_edit_customer__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_status_bar__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_splash_screen__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_screen_orientation__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ngx_qrcode2__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_barcode_scanner__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_page_user_chat_page_user_chat__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_elasticTextarea__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_chatBubble__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__directives__ = __webpack_require__(792);
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

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_screen_orientation__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_database_service__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_sql__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_socket_service__ = __webpack_require__(381);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_page_slider_page_slider__["a" /* SliderPage */];
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/app/app.html"*/'<ion-nav #nav [root]="rootPage"></ion-nav>\n\n<!-- <ion-menu [content]="nav">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu> -->\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/app/app.html"*/,
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

/***/ 482:
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

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 263,
	"./af.js": 263,
	"./ar": 264,
	"./ar-dz": 265,
	"./ar-dz.js": 265,
	"./ar-kw": 266,
	"./ar-kw.js": 266,
	"./ar-ly": 267,
	"./ar-ly.js": 267,
	"./ar-ma": 268,
	"./ar-ma.js": 268,
	"./ar-sa": 269,
	"./ar-sa.js": 269,
	"./ar-tn": 270,
	"./ar-tn.js": 270,
	"./ar.js": 264,
	"./az": 271,
	"./az.js": 271,
	"./be": 272,
	"./be.js": 272,
	"./bg": 273,
	"./bg.js": 273,
	"./bm": 274,
	"./bm.js": 274,
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
	"./es-us": 297,
	"./es-us.js": 297,
	"./es.js": 295,
	"./et": 298,
	"./et.js": 298,
	"./eu": 299,
	"./eu.js": 299,
	"./fa": 300,
	"./fa.js": 300,
	"./fi": 301,
	"./fi.js": 301,
	"./fo": 302,
	"./fo.js": 302,
	"./fr": 303,
	"./fr-ca": 304,
	"./fr-ca.js": 304,
	"./fr-ch": 305,
	"./fr-ch.js": 305,
	"./fr.js": 303,
	"./fy": 306,
	"./fy.js": 306,
	"./gd": 307,
	"./gd.js": 307,
	"./gl": 308,
	"./gl.js": 308,
	"./gom-latn": 309,
	"./gom-latn.js": 309,
	"./gu": 310,
	"./gu.js": 310,
	"./he": 311,
	"./he.js": 311,
	"./hi": 312,
	"./hi.js": 312,
	"./hr": 313,
	"./hr.js": 313,
	"./hu": 314,
	"./hu.js": 314,
	"./hy-am": 315,
	"./hy-am.js": 315,
	"./id": 316,
	"./id.js": 316,
	"./is": 317,
	"./is.js": 317,
	"./it": 318,
	"./it.js": 318,
	"./ja": 319,
	"./ja.js": 319,
	"./jv": 320,
	"./jv.js": 320,
	"./ka": 321,
	"./ka.js": 321,
	"./kk": 322,
	"./kk.js": 322,
	"./km": 323,
	"./km.js": 323,
	"./kn": 324,
	"./kn.js": 324,
	"./ko": 325,
	"./ko.js": 325,
	"./ky": 326,
	"./ky.js": 326,
	"./lb": 327,
	"./lb.js": 327,
	"./lo": 328,
	"./lo.js": 328,
	"./lt": 329,
	"./lt.js": 329,
	"./lv": 330,
	"./lv.js": 330,
	"./me": 331,
	"./me.js": 331,
	"./mi": 332,
	"./mi.js": 332,
	"./mk": 333,
	"./mk.js": 333,
	"./ml": 334,
	"./ml.js": 334,
	"./mr": 335,
	"./mr.js": 335,
	"./ms": 336,
	"./ms-my": 337,
	"./ms-my.js": 337,
	"./ms.js": 336,
	"./my": 338,
	"./my.js": 338,
	"./nb": 339,
	"./nb.js": 339,
	"./ne": 340,
	"./ne.js": 340,
	"./nl": 341,
	"./nl-be": 342,
	"./nl-be.js": 342,
	"./nl.js": 341,
	"./nn": 343,
	"./nn.js": 343,
	"./pa-in": 344,
	"./pa-in.js": 344,
	"./pl": 345,
	"./pl.js": 345,
	"./pt": 346,
	"./pt-br": 347,
	"./pt-br.js": 347,
	"./pt.js": 346,
	"./ro": 348,
	"./ro.js": 348,
	"./ru": 349,
	"./ru.js": 349,
	"./sd": 350,
	"./sd.js": 350,
	"./se": 351,
	"./se.js": 351,
	"./si": 352,
	"./si.js": 352,
	"./sk": 353,
	"./sk.js": 353,
	"./sl": 354,
	"./sl.js": 354,
	"./sq": 355,
	"./sq.js": 355,
	"./sr": 356,
	"./sr-cyrl": 357,
	"./sr-cyrl.js": 357,
	"./sr.js": 356,
	"./ss": 358,
	"./ss.js": 358,
	"./sv": 359,
	"./sv.js": 359,
	"./sw": 360,
	"./sw.js": 360,
	"./ta": 361,
	"./ta.js": 361,
	"./te": 362,
	"./te.js": 362,
	"./tet": 363,
	"./tet.js": 363,
	"./th": 364,
	"./th.js": 364,
	"./tl-ph": 365,
	"./tl-ph.js": 365,
	"./tlh": 366,
	"./tlh.js": 366,
	"./tr": 367,
	"./tr.js": 367,
	"./tzl": 368,
	"./tzl.js": 368,
	"./tzm": 369,
	"./tzm-latn": 370,
	"./tzm-latn.js": 370,
	"./tzm.js": 369,
	"./uk": 371,
	"./uk.js": 371,
	"./ur": 372,
	"./ur.js": 372,
	"./uz": 373,
	"./uz-latn": 374,
	"./uz-latn.js": 374,
	"./uz.js": 373,
	"./vi": 375,
	"./vi.js": 375,
	"./x-pseudo": 376,
	"./x-pseudo.js": 376,
	"./yo": 377,
	"./yo.js": 377,
	"./zh-cn": 378,
	"./zh-cn.js": 378,
	"./zh-hk": 379,
	"./zh-hk.js": 379,
	"./zh-tw": 380,
	"./zh-tw.js": 380
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
webpackContext.id = 483;

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_register_page_user_register__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_user_inbox_page_user_inbox__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(28);
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
                            console.log(user.shop_id[0]);
                            _this.api.Business.register(_this.phone, user.shop_id[0], getFName, getLName).then(function (customer) {
                                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__page_user_deals_page_user_deals__["a" /* UserDealsPage */], { business_id: user.shop_id[0], customer: customer.customer.user_id[0] }, {
                                    animate: true,
                                    direction: 'forward'
                                });
                            }).catch(function (err) {
                                __WEBPACK_IMPORTED_MODULE_6_jquery__('.btn-orange[type="submit"]').find('.fa-spinner').remove();
                                __WEBPACK_IMPORTED_MODULE_6_jquery__('input[name="number"]').addClass('has-error').siblings('.text-validate').text('Mobile number does not exist or invalid.');
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
        selector: 'page-user-scanner',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-scanner/page-user-scanner.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox" (click)="goInbox()"><img src="assets/images/icon-mail.png" alt="" /></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <a class="btn btn-green" (click)="scanCode()">Scan QR Code</a>\n  <span>{{message}}</span>\n  <div class="divider">\n    <span>or</span>\n  </div>\n  <form class="form-mobile">\n    <label>\n      <input type="number" [(ngModel)]="phone" name="number" placeholder="Mobile number" />\n      <span class="text-validate"></span>\n\n    </label>\n    <button class="btn btn-orange" (click)="SubmitNumber()" type="submit">Submit</button>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-scanner/page-user-scanner.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
        __WEBPACK_IMPORTED_MODULE_7__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */]])
], UserScannerPage);

//# sourceMappingURL=page-user-scanner.js.map

/***/ }),

/***/ 501:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_page_signup__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_reset_pass_page_reset_pass__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_config__ = __webpack_require__(93);
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
        selector: 'page-login',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-login/page-login.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <!-- <ion-card *ngIf="userData">\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n  </ion-card> -->\n\n  <p class="title">\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goSlider()">\n    Welcome Back\n  </p>\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n  <div class="divider">\n    <span>or</span>\n  </div>\n  <form class="form-login">\n    <label><input type="email" name="username" placeholder="Email or Phone" [(ngModel)]="posts.username" /><span class="text-validate">Email address is required.</span></label>\n    <label><input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" /><span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span></label>\n    <button class="btn-green" type="submit" (click)="logMeIn()">Log In</button>\n  </form>\n  <a class="description forgot-pass" (click)="goReset()">Forgot your password?</a>\n  <!-- <hr class="hr" />\n  <p class="description">Don\'t have an account? <a href="#" (click)="goSignup()">Sign Up</a></p> -->\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-login/page-login.html"*/
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

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_user_customers_page_user_customers__ = __webpack_require__(258);
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
        selector: 'page-menu',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-menu/page-menu.html"*/'<ion-content padding class="content-page-menu">\n  <p class="title">\n    <img class="btn-nav to-right" src="assets/icon/icon-close.png" alt="" (click)="goBack()">\n  </p>\n\n  <ion-list class="menu-list">\n    <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n      <span class="label-{{p.title}}">{{p.title}}</span>\n    </button>\n  </ion-list>\n\n  <hr class="divider" />\n  <a class="logout" href="#" (click)="logOut()">Logout</a>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-menu/page-menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], MenuPage);

//# sourceMappingURL=page-menu.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInboxPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_jquery__ = __webpack_require__(24);
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






// Chat


var UserInboxPage = (function () {
    function UserInboxPage(navCtrl, storage, api, _zone, socketService) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.api = api;
        this._zone = _zone;
        this.socketService = socketService;
        this.hasData = false;
        this.hasNotify = false;
        this.message = [];
        this.init();
    }
    UserInboxPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            _this.user = user;
            console.log(user);
            _this.api.Message.member_list(user.shop_id[0]).then(function (users) {
                _this.membersList = users;
                console.log(_this.membersList);
                _this.hasData = true;
                _this.socketService.connect();
                __WEBPACK_IMPORTED_MODULE_7_jquery__('body').find('.fa.loader').remove();
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    UserInboxPage.prototype.ionViewWillLeave = function () {
        this.socketService.disconnect();
    };
    UserInboxPage.prototype.init = function () {
        var _this = this;
        // Get real time message notification
        this.socketService.notify.subscribe(function (chatNotification) {
            console.log(chatNotification);
            _this._zone.run(function () {
                _this.storage.get('user').then(function (user) {
                    // if(chatNotification.business_id == user.shop_id[0]) {
                    //     this.hasNotify = true;
                    //     console.log('notify')
                    // }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        });
    };
    UserInboxPage.prototype.showMenu = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__page_menu_page_menu__["a" /* MenuPage */], {
            animate: true,
            direction: 'forward'
        });
    };
    UserInboxPage.prototype.viewMessage = function (memberDetail, businessDetail) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__page_user_chat_page_user_chat__["a" /* UserChatPage */], {
            animate: true,
            direction: 'forward',
            "memberDetail": memberDetail,
            "businessDetail": businessDetail
        });
    };
    return UserInboxPage;
}());
UserInboxPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-user-inbox',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-inbox/page-user-inbox.html"*/'<ion-header>\n  <ion-navbar>\n    <img class="header-logo" src="assets/images/logo-min.png" alt="">\n    <div class="holder-menu" (click)="showMenu()">Menu</div>\n    <a class="inbox"><img src="assets/images/icon-mail.png" alt="" /><span *ngIf="hasNotify" class="count-msg">!</span></a>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <!-- <span [ngClass]="[membersList ? \'hidden\' : \'visible\']"> Inbox is empty </span> -->\n\n    <ion-list id="inbox-list">\n\n      <ion-item *ngFor="let member of membersList;" tappable (click)="viewMessage(member.user_id[0],member.business_id[0])">\n\n        <span class="name" *ngIf="member.user_id[0] && member.user_id[0].last_name && member.user_id[0].first_name"> {{member.user_id[0].first_name}} {{member.user_id[0].last_name}}</span>\n\n        <span class="name" *ngIf="member.user_id[0] && member.user_id[0].first_name && !member.user_id[0].last_name"> {{member.user_id[0].first_name}} </span>\n\n        <span class="name" *ngIf="member.user_id[0] && member.user_id[0].last_name && !member.user_id[0].first_name"> {{member.user_id[0].last_name}} </span>\n\n        <span class="name" *ngIf="member.user_id[0] && member.user_id[0].first_name == \' \' && !member.user_id[0].last_name == \' \' "> {{ member.user_id[0].number }} </span>\n\n        <span class="name" *ngIf="member.user_id && member.user_id.length == 0"> No Member Data </span>\n\n        <!-- <button id="btn-message" ion-button [disabled]="member.user_id && member.user_id.length == 0" (click)="viewMessage(member.user_id[0],member.business_id[0])"> MESSAGE </button> -->\n\n      </ion-item>\n\n      <!-- <ion-item>\n        <span class="name-new"> John Devera </span>\n\n        <span class="date-time-new"> 7:12am &nbsp;&nbsp; 10/30/17 </span>\n\n        <p class="message-new">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget velit leo. Etiam a ipsum et elit maximus volutpat non quis leo. Morbi viverra auctor nibh egestas finibus. Maecenas egestas augue in posuere hendrerit. Cras posuere fermentum dui, nec posuere nisl facilisis ut. Duis aliquam, diam tristique faucibus venenatis, mi ante mollis elit, non pulvinar leo orci pharetra augue. Donec dignissim eu velit id imperdiet. Donec sit amet facilisis quam. Duis non risus sodales ante sollicitudin rhoncus et a nulla. </p>\n\n      </ion-item> -->\n      <span class="fa fa-spinner fa-spin loader"></span>\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-user-inbox/page-user-inbox.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_5__service_api_service_component__["a" /* ApiService */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* NgZone */],
        __WEBPACK_IMPORTED_MODULE_6__providers__["c" /* SocketService */]])
], UserInboxPage);

//# sourceMappingURL=page-user-inbox.js.map

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
        inputs: ['placeholder', 'lineHeight', 'maxExpand'],template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/components/elasticTextarea/elasticTextarea.html"*/'<!--suppress ALL -->\n<ion-textarea #ionTxtArea\n              placeholder=\'{{ "Type your message..." }}\'\n              [(ngModel)]="content"\n              (ngModelChange)=\'onChange($event)\'>\n</ion-textarea>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/components/elasticTextarea/elasticTextarea.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(90);
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
        inputs: ['chatMessage'],template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/components/chatBubble/chatBubble.html"*/'<div>\n  <div class="chat-bubble {{chatMessage.message_by == \'business\' ? \'right\' : \'left\'}}">\n    <div class="message">{{chatMessage.message}}</div>\n  </div>\n  <div class="message-detail {{chatMessage.message_by == \'business\' ? \'right\' : \'left\'}}">\n    <span>{{formatEpoch(chatMessage.epoch)}}</span>\n  </div>\n</div>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/components/chatBubble/chatBubble.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_keyboard__ = __webpack_require__(425);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__page_login_page_login__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__page_signup_page_signup__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(24);
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
        selector: 'page-slider',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-slider/page-slider.html"*/'<!-- <ion-header no-shadow>\n  <ion-navbar>\n    <button class="btn-green" (click)="signUp()">Get Started</button>\n    <button class="btn-green-out" (click)="signIn()">Sign In</button>\n  </ion-navbar>\n</ion-header> -->\n\n<ion-content no-bounce class="page-slider text-center">\n  <ion-slides pager="true" (ionSlideNextStart)="onSlideNext($event)">\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n      <img class="slider-img main-image" src="assets/images/owner-main-image.png" alt="Business Owner Main Image">\n      <p class="main-title">Drive Traffic &amp; Engage Your <br>Customers With The GoPage <br>Platform</p>\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-messages.png" alt="">\n      <p class="subtitle">\n        Communicate in real time with your <br>customers. Target certain customers for <br>products or services you already know <br>they love.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-qrcode.png" alt="">\n      <p class="subtitle">\n        Our digital punch card system allows you to <br>engage and reward your loyal customers, <br>directly impacting traffic, driving sales and <br>profitability.\n    </ion-slide>\n\n    <ion-slide>\n      <img class="logo" src="assets/images/logo.png" alt="GoPage Logo">\n\n      <img class="slider-img" src="assets/images/owner-iphone-deals.png" alt="">\n      <p class="subtitle">\n        GoPage technology allows you to <br>easily create and deliver deals and<br> specials to customers in your area.\n      </p>\n    </ion-slide>\n\n    <ion-slide>\n    </ion-slide>\n  </ion-slides>\n  <!-- <button class="btn-slider btn-green" (click)="signUp()">Get Started</button> -->\n  <button class="btn-slider btn-green-out" (click)="signIn()">Sign In</button>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-slider/page-slider.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], SliderPage);

//# sourceMappingURL=page-slider.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__page_slider_page_slider__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_signup_success_page_signup_success__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__page_user_scanner_page_user_scanner__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_config__ = __webpack_require__(93);
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
        selector: 'page-signup',template:/*ion-inline-start:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-signup/page-signup.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header> -->\n<ion-content padding>\n  <ion-card *ngIf="userData">\n    <ion-card-header>{{ userData.email }}</ion-card-header>\n  </ion-card>\n\n  <p class="title">\n    <img class="btn-nav" src="assets/icon/icon-back.png" alt="" (click)="goBack()">Sign Up\n  </p>\n  <button class="btn login-fb" (click)="fbConnect()"><span class="fa fa-facebook"></span> Continue with Facebook</button>\n  <button class="btn login-google" (click)="gpConnect()"><span class="fa fa-google"></span> Continue with Google</button>\n  <div class="divider">\n    <span>Or sign up with email</span>\n  </div>\n  <form class="form-signup">\n    <label>\n      <input type="text" name="first_name" placeholder="First name" [(ngModel)]="posts.first_name" />\n      <span class="text-validate">First name is required.</span>\n    </label>\n    <label>\n      <input type="text" name="last_name" placeholder="Last name" [(ngModel)]="posts.last_name" />\n      <span class="text-validate">Last name is required.</span>\n    </label>\n    <label>\n      <input type="text" name="username" placeholder="Username" [(ngModel)]="posts.username" />\n      <span class="text-validate">Username is required.</span>\n    </label>\n    <label>\n      <input type="email" name="email" placeholder="Email address" [(ngModel)]="posts.email" />\n      <span class="text-validate">Email address is required.</span>\n    </label>\n    <label>\n      <input type="password" name="password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" [(ngModel)]="posts.password" />\n      <span class="btn-show">SHOW</span><span class="text-validate">Password is required.</span>\n    </label>\n    <input class="btn-green" type="submit" value="Sign Up" (click)="signMeUp()" />\n  </form>\n  <p class="description">By signing up, you agree to GoPage\'s <br><a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></p>\n</ion-content>\n'/*ion-inline-end:"/home/fullstack/Documents/node/gopage/merge/business-app/src/pages/page-signup/page-signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_facebook__["a" /* Facebook */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_plus__["a" /* GooglePlus */]])
], SignupPage);

//# sourceMappingURL=page-signup.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(260);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sql__ = __webpack_require__(148);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__database_service__ = __webpack_require__(149);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__database_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model__ = __webpack_require__(482);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__model__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_service__ = __webpack_require__(261);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__util_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__(381);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__socket_service__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
    baseUrl: 'https://gopage-api.herokuapp.com/',
    ChatBaseUrl: 'https://chat-gopage-server-api.herokuapp.com/',
};
/* harmony default export */ __webpack_exports__["a"] = (config);
//# sourceMappingURL=config.js.map

/***/ })

},[430]);
//# sourceMappingURL=main.js.map