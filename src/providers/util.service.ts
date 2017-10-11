import {Injectable} from "@angular/core";
import moment from "moment";
import {ChatMessage, MessageType} from "./model";


@Injectable()
export class UtilService {

  constructor() {
  }

  static getEpoch(): number {
    return moment().unix();
  }

  static getCalendarDay(epoch: number): string {
    if (!epoch) {
      return null;
    }
    let timeString = 'h:mm A';
    return moment(epoch * 1000).calendar(null, {
      sameDay: '[Today] ' + timeString,
      lastDay: '[Yesterday] ' + timeString,
      sameElse: 'MM/DD ' + timeString
    });
  }

  static formatMessageRequest(user_id: string, business_id: string,company_name: string, message: string): ChatMessage {
    return {
      user_id: user_id,
      business_id: business_id,
      company_name: company_name,
      message: message,
      message_by: "business",
      is_read: false
    };
  }
}
