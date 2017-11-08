import { NavController,NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';
import { UserInboxPage } from '../page-user-inbox/page-user-inbox';

import { Storage } from '@ionic/storage';

//chat
import {Component, EventEmitter, NgZone, ViewChild} from "@angular/core";
import {ChatMessage, DatabaseService, SocketService, UtilService} from "../../providers";

import * as _ from "lodash";
import * as $ from "jquery";

import Config from '../../app/config';
import { ApiService } from '../../service/api.service.component';

@Component({
  selector: 'page-user-chat',
  templateUrl: 'page-user-chat.html'
})

export class UserChatPage {

  @ViewChild('txtChat') txtChat: any;
  @ViewChild('content') content: any;
  messages: any[];
  membersList: string[];
  chatBox: string;
  room_id: string;
  btnEmitter: EventEmitter<string>;
  user: string[];

  private memberDetail;
  private businessDetail;
  hasData : boolean = false;
  hasLeave : boolean = false;
  isRefetch : boolean = false;
  message_by : string;

  pages: Array<{title: string, component: any}>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _zone: NgZone,
    public databaseService: DatabaseService,
    public socketService: SocketService,
    private storage: Storage,
    public api: ApiService) {

    this.memberDetail = this.navParams.get("memberDetail");
    this.businessDetail = this.navParams.get("businessDetail");
    // this.chatList = this.navParams.get("chatList");

    this.btnEmitter = new EventEmitter<string>();
    this.messages = [];
    this.chatBox = "";
    this.room_id = this.memberDetail._id + this.businessDetail._id
    this.init();

    // console.log(this.memberDetail);
    // console.log(this.businessDetail);
  }

   ionViewWillEnter() {
    this.socketService.connect();
    this.socketService.joinRoom(this.room_id);

    this.fetchChats();
    this.updateRead();
   }

   ionViewDidLoad() {

   }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
    this.hasData = false;
  }

  fetchChats() {

    // GET ALL MESSAGES FROM DATABASE
    this.api.Message.fetch_chats(this.room_id).then(chats => {
      console.log('fetching chats...');

      if(this.hasLeave){
        return;
      }

      // if(this.message_by === 'member' && !this.hasData) {
      //   this.message_by = '';
      //   console.log('load again')
      //   return this.fetchChats();
      // }

      if(!this.isRefetch) {

        this.isRefetch = true;

        console.log('Refetching chat data...');

        return this.fetchChats();
      } else {

        this.messages = chats;

        this.hasData = true;

        this.scrollToBottom();

        $('body').find('.fa.loader').remove();

        console.log('Chat data loaded');
      }

    }).catch((error) => {
        console.log(error);
    });
  }

  updateRead(){
    this.api.Message.update_read(this.room_id,'member').then(update => {
      console.log('is_read updated');
    });
  }

  init(){
    // REAL TIME MESSAGE RESPONSE
    this.socketService.messages.subscribe((chatMessage: ChatMessage) => {

      this.message_by = chatMessage.message_by;

      this._zone.run(() => {

        // this.fetchChats();

        this.messages.push(chatMessage);
        this.scrollToBottom();
        this.updateRead();

      });

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
    let user_id = this.memberDetail._id,
    business_id = this.businessDetail._id,
    company_name = this.businessDetail.company_name;

    this.socketService.newRequest(UtilService.formatMessageRequest(user_id,business_id,company_name,message));
    this.chatBox = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    this._zone.run(() => {
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
    });
  }

  goToInbox() {
    this.navCtrl.setRoot(UserInboxPage, {
      animate: true,
      direction: 'back'
    });
  }

}
