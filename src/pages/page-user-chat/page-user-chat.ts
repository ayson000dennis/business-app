import { NavController,NavParams } from 'ionic-angular';
import { LoginPage } from '../page-login/page-login';
import { MenuPage } from '../page-menu/page-menu';

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
  chatBox: string;
  btnEmitter: EventEmitter<string>;
  user: string[];

  private memberDetail;
  private businessDetail;
  // private chatList;
  hasData : boolean = false;
  hasLeave : boolean = false;
  hasNewMsg : boolean = false;

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
    this.init();

    // console.log(this.memberDetail);
    // console.log(this.businessDetail);
  }

  ionViewWillEnter() {
    var room_id = this.memberDetail._id + this.businessDetail._id;

    this.socketService.connect();
    this.socketService.joinRoom(room_id);
   }

   ionViewDidLoad() {
     this.fetchChats();
   }

  ionViewWillLeave() {
    this.socketService.disconnect();
    this.hasLeave = true;
  }

  fetchChats() {
    var room_id = this.memberDetail._id + this.businessDetail._id;

    // GET ALL MESSAGES FROM DATABASE
    this.api.Message.fetch_chats(room_id).then(chats => {
      if(this.hasLeave){
        return;
      }

      if(this.hasNewMsg && !this.hasData){
        this.hasNewMsg = false;
        return this.fetchChats();
      }
      console.log(chats);
      this.messages = chats;
      this.hasData = true;
      console.log('Chats loaded')

      $('body').find('.fa.loader').remove();
      this.scrollToBottom();
    }).catch((error) => {
        console.log(error);
    });

  }

  init(){
    // REAL TIME MESSAGE RESPONSE
    this.socketService.messages.subscribe((chatMessage: ChatMessage) => {
      this._zone.run(() => {
        this.messages.push(chatMessage);
      });

      this.hasNewMsg = true;

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

  showMenu() {
    this.navCtrl.push(MenuPage, {
      animate: true,
      direction: 'forward'
    });
  }

}
