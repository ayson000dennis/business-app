import { Injectable } from '@angular/core';
import { Http }  from '@angular/http';
import Config from '../app/config';
import "rxjs/Rx"
@Injectable()
export class ApiService {
  constructor(private http :Http) { }

  Users = {
		user: (userId: string) => {
      return this.http.get(Config.baseUrl + "api/users/view/" + userId).map(response => {
          return response.json();
      }).toPromise();
    },
    user_list: (userId : string, permission : string, account_type : string, page_size : string) =>{
      return this.http.get(Config.baseUrl + "api/users/list2/" + userId + "/" + permission + "?account_type=" + account_type + "&page=1&page_size=" + page_size).map(response => {
        return response.json();
      }).toPromise();
    },
    user_delete: (userId: string) => {
      return this.http.post(Config.baseUrl + "api/users/delete/" + userId, {}).map(response => {
          return response.json();
      }).toPromise();
    },
    user_suspend: (userId: string) => {
      return this.http.post(Config.baseUrl + "api/users/suspend/" + userId, {}).map(response => {
          return response.json();
      }).toPromise();
    },
    user_name: (firstName: string, lastName: string, customerId: string) => {
      return this.http.post(Config.baseUrl + "api/users/edit/" + customerId, {first_name: firstName, last_name: lastName, in_mobile: '1'}).map(response => {
          return response.json();
      }).toPromise();
    },
    user_edit: (firstName: string, lastName: string, phone: string, email: string, customerId: string) => {
      return this.http.post(Config.baseUrl + "api/users/edit/" + customerId, {first_name: firstName, last_name: lastName, number: phone, email: email}).map(response => {
          return response.json();
      }).toPromise();
    },
    user_add: (firstName: string, lastName: string, phone: string, email: string, password: string, ownerId: string,permission : string,business_id : string) => {
      return this.http.post(Config.baseUrl + "api/users/add?permission=" + permission + '&business_id=' + business_id, {first_name: firstName, last_name: lastName, number: phone, email: email, password: password, permission: '3', account_type: '1', status: '1', owner_id: ownerId  }).map(response => {
          return response.json();
      }).toPromise();
    }
  }

  Business = {
		checker: (phone: string, userId: string) => {
      return this.http.post(Config.baseUrl + "api/business/check_phone/" + phone + "/" + userId, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    register: (phone: string, businessId: string,first_name : string, last_name : string) => {
      return this.http.post(Config.baseUrl + "api/business/send_sms/" + phone + "/" + businessId, {first_name :first_name, last_name : last_name}).map(response => {
        return response.json();
      }).toPromise();
    },
    scan_qr : (MembershipNumber,userId,businessId) => {
      return this.http.post(Config.baseUrl + "api/business/qr_scan/" + MembershipNumber + "/" + userId + "/" + businessId, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    list : (userId,permission) => {
      return this.http.post(Config.baseUrl + "api/business/init_list/" + userId + "/" + permission, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    info : (businessId) => {
      return this.http.get(Config.baseUrl + "api/business/view/" + businessId).map(response => {
        return response.json();
      }).toPromise();
    }
  }

  Deals = {
    deals_list: (businessId: string) => {
      return this.http.get(Config.baseUrl + "api/deals/list/" + businessId +'/2').map(response => {
        return response.json();
      }).toPromise();
    }
  }

  Loyalty = {
    loyalty_list : (businessId : string,customerId: string) => {
      return this.http.get(Config.baseUrl + "api/loyalties/list/" + customerId +'/' + businessId).map(response => {
        return response.json();
      }).toPromise();
    },
    loyalty_add : (quantity : string,businessId : string,dealId : string,customerId : string, isStamp: string) => {
      return this.http.post(Config.baseUrl + "api/loyalties/add/" + quantity,{
        business_id : businessId,
        customer_id : customerId,
        deals_id : dealId,
        is_stamp : isStamp
      }).map(response => {
        return response.json();
      }).toPromise();
    }
  }
  BusinessOwner = {
    list : (businessId : string, page: string, page_size: string) => {
      return this.http.get(Config.baseUrl + "api/business_owners/customer/list/" + businessId + "/?page=" + page + "&page_size=" + page_size).map(response => {
        return response.json();
      }).toPromise();
    },
    favorite_list: (business_id) => {
      return this.http.get(Config.baseUrl + "api/favorites/list/" + business_id).map(response => {
        return response.json();
      }).toPromise();
    }
  }
  Message = {
    member_list: (shop_id: string) => {
      return this.http.get(Config.baseUrl + "api/business_owners/list/" + shop_id, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    room_list: (shop_id: string) => {
      return this.http.get(Config.baseUrl + "api/business_owners/rooms/" + shop_id, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    update_read: (room_id: string, message_by: string) => {
      return this.http.post(Config.ChatBaseUrl + "api/chats/update_read/" + room_id + "/" + message_by, {}).map(response => {
        return response.json();
      }).toPromise();
    },
    fetch_chats: (room_id: string) => {
      return this.http.get(Config.ChatBaseUrl + "api/chats/list/" + room_id ).map(response => {
        return response.json();
      }).toPromise();
    }
  }
}
