import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import * as io from "socket.io-client";
import {ChatMessage, MessageType, ChatNotification} from "./model";
import {SOCKET_HOST} from "./constants";
import {UtilService} from "./util.service";
import {DatabaseService} from "./database.service";
import Socket = SocketIOClient.Socket;

@Injectable()
export class SocketService {
  public messages: Observable<ChatMessage>;
  public notify :  Observable<ChatNotification>;
  private socketObserver: any;
  private socketObserverNotify: any;

  private socket: Socket;

  constructor(public databaseService: DatabaseService) {

    this.messages = Observable.create(observer => {
      this.socketObserver = observer;
    });

    this.notify = Observable.create(observerNotify => {
      this.socketObserverNotify = observerNotify;
    });

    this.init();
  }

  init() {
    this.socket = io(SOCKET_HOST, {autoConnect: true});

    this.socket.on("connect", () => {
      console.debug('***Socket Connected***');
    });

    this.socket.on("reconnecting", attempt => {
      console.debug('***Socket Reconnecting***', attempt);
    });

    this.socket.on("reconnect_failed", () => {
      console.debug('***Socket Reconnect failed***');
    });

    this.socket.on('disconnect', () => {
      console.debug('***Socket Disconnected***');
    });

    // Get Message Response
    this.socket.on('message', response => {

      let chatMessage: ChatMessage = response;

      // console.log(chatMessage);

      chatMessage.epoch = UtilService.getEpoch();
      this.socketObserver.next(chatMessage);
    });


    // Real time notification
    this.socket.on('notify', response => {

      let chatNofitication: ChatNotification = response;

      // console.log(chatNofitication);

      this.socketObserverNotify.next(chatNofitication);
    });
  }

  newRequest(chatMessage: ChatMessage) {
    // Send message
    chatMessage.epoch = UtilService.getEpoch();
    this.socketObserver.next(chatMessage);
    this.socket.emit('message_send', chatMessage);
  }

  disconnect() {
    this.socket.disconnect();
  }

  connect() {
    this.socket.connect();
  }

  joinRoom(room_id){
    this.socket.emit('joinroom',room_id);
  }
}
