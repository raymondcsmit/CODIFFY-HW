import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SignalRConnected, SignalRDisConnected, SignalRMessageRecieved } from "../actions/notification.actions";
import { IMessage, INotification } from "../model/notification.model";
import { SignalRService } from "../service/notification.service";

export interface NotificationModel {
    connected: boolean;
    notifications:INotification[] ;
  }
  
  @State<NotificationModel>({
    name: 'notification',
    defaults: {
        connected: false,
        notifications:[]
    }
  })
  @Injectable()
  export class NotificationState {
    
    @Action(SignalRConnected)
    connected({ dispatch, getState, patchState }: StateContext<NotificationModel>, { payload }: SignalRConnected) {
        //payload to be use in toaster
        //console.log("signalR Connected",payload);
        const state = getState();       
        patchState({
            ...state,
            connected:payload
        })
        
    }
    @Action(SignalRDisConnected)
    disconnected({ dispatch, getState, patchState }: StateContext<NotificationModel>, { payload }: SignalRDisConnected) {
        //payload to be use in toaster
        //console.log("signalR Disconnected",payload);
        const state = getState();       
        patchState({
            ...state,
            connected:payload
        })
        
    }
    @Action(SignalRMessageRecieved)
    messageRecieve({ dispatch, getState, patchState }: StateContext<NotificationModel>, { payload }: SignalRMessageRecieved) {
        //payload to be use in toaster
        //console.log("signalR message recieved in store",payload);
        const state = getState();
        patchState({
            notifications:  [...state.notifications, payload]
        });
    }
    //@Reciever() 
}