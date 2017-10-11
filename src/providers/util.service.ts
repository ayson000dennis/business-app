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

  static formatMessageRequest(message: string, from: string, user_type: string): ChatMessage {
    return {
      type: 'message_by_business',
      from: from,
      message: message,
      user_type: user_type
    };
  }
}
