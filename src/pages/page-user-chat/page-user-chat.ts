import { NavController } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';

//chat
import {Component, EventEmitter, NgZone, ViewChild} from "@angular/core";
import {ChatMessage, DatabaseService, SocketService, UtilService} from "../../providers";
import * as _ from "lodash";

import * as $ from "jquery";

import Config from '../../app/config';

@Component({
  selector: 'page-user-chat',
  templateUrl: 'page-user-chat.html'
})

export class UserChatPage {

  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  messages: any[];
  chatBox: string;
  btnEmitter: EventEmitter<string>;


  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController,
    public _zone: NgZone,
    public databaseService: DatabaseService,
    public socketService: SocketService) {

    this.btnEmitter = new EventEmitter<string>();
    this.messages = [];
    this.chatBox = "";
    this.init();
  }

  ionViewWillEnter() {
    // Get all messages from database
    // this.databaseService.getJson("messages")
    //   .then(messages => {
    //     if (messages) {
    //       this.messages = this.messages.concat(_.sortBy(messages, ['epoch']));
    //     }
    //     this.scrollToBottom();
    //   });

    this.socketService.connect();
  }

  init() {

    // Get real time message response
    this.socketService.messages.subscribe((chatMessage: ChatMessage) => {
      this._zone.run(() => {
        this.messages.push(chatMessage);
      });
     this.scrollToBottom();
    });
  }

  public sendMessage() {
    this.btnEmitter.emit("sent clicked");
    this.txtChat.setFocus();
    let message = this.txtChat.content;
    this.send(message);
    this.txtChat.clearInput();
  }

  send(message) {
    //todo read email from database
    let from = "van@business.ph";
    let user_type = "business";

    this.socketService.newRequest(UtilService.formatMessageRequest(message,from,user_type));
    this.chatBox = '';
    this.scrollToBottom();
  }

  ionViewWillLeave() {
    this.socketService.disconnect();
  }

  scrollToBottom() {
    this._zone.run(() => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
    });
  }

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

}
