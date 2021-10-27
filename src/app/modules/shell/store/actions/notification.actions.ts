import { IMessage, INotification } from "../model/notification.model";

export class SignalRMessageRecieved {
    static readonly type = '[Layout] Message recieved';
    constructor(public payload: INotification) {
    }
  }
  export class SignalRConnected {
    static readonly type = '[Layout] SignalR Connected';
    constructor(public payload: boolean) {
    }
  }
  export class SignalRDisConnected {
    static readonly type = '[Layout] SignalR Disconnected';
    constructor(public payload: boolean) {
    }
  }