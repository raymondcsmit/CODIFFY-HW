import { Selector } from "@ngxs/store";
import { NotificationModel, NotificationState } from "../state/notification.state";

export class NotificationQueries {
    
    
    @Selector([NotificationState])
    public static signalRConnected(state: NotificationModel) {
      return state.connected;
    }
    @Selector([NotificationState])
    public static getNotifications(state: NotificationModel) {
      return state.notifications;
    }
    @Selector([NotificationState])
    public static getChatMessages(state: NotificationModel) {
      const filteredArray =  state.notifications.filter(item => item.type === "Chats");
      return filteredArray;
    }
}