import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import * as signalR from "@aspnet/signalr";
import * as signalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";
import { Store } from "@ngxs/store";
//import { HubConnection ,IHttpConnectionOptions } from "@aspnet/signalr";
import { Observable, Subject } from "rxjs";
import { AuthStatusState } from "src/app/modules/security/store/states/auth.state";
import { environment } from "src/environments/environment";
import { SignalRConnected, SignalRMessageRecieved } from "../actions/notification.actions";
import { ISignalRConnectionInfo } from "../model/signalRInfo.model";
@Injectable({
    providedIn: 'root'
  })
export class SignalRService {
    private readonly http: HttpClient;
    // private readonly _baseUrl: string = "http://localhost:7071/api/";
    //private readonly _baseUrl: string = environment.azureConnection;
    private hubConnection?: HubConnection;
    messages: Subject<string> = new Subject();
    notifications: Subject<any> = new Subject();
    constructor(chttp: HttpClient,private store: Store) {
      this.http = chttp;
    }

    public startConnection = () => {
      const authDetail = this.store.selectSnapshot(AuthStatusState.getUser);
    const token = authDetail?.accessToken;
      //var token = JSON.parse(localStorage.getItem('token') || '{}').accessToken;
      
  
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl(`${environment.baseUrl}/AppHub`,{accessTokenFactory:()=> token!})
                              .withAutomaticReconnect()                            
                              .build();
      this.hubConnection?.start()
                              .then(() => 
                                {
                                  //console.log('Connection started');
                                  this.store.dispatch(new SignalRConnected(true)); 
                                }                              
                              )
                              .catch(err => console.log('Error while starting connection: ' + err));
                        
      this.hubConnection?.on("LaweryAppMessage", (data: any) => {
        //console.log('server message recieved',data)
                                this.notifications.next(data);
                                this.store.dispatch(new SignalRMessageRecieved(data))
                               //this.messages.next(data);
                             });
      this.hubConnection.onclose(()=>{
          //console.log('Connection stoped');
          this.store.dispatch(new SignalRConnected(true)); 
        })
        
    }

    
      public stopConnection() {
        this.hubConnection?.stop().then(() => {
          //console.log('signal r connection stopped');
        }).catch(err => console.log(err));
      }
  /*
    private getConnectionInfo(): Observable<ISignalRConnectionInfo> {
      let requestUrl =`${environment.baseUrl}negotiate`;// `${this._baseUrl}negotiate`;
      return this.http.get<ISignalRConnectionInfo>(requestUrl);
    }
  
    init() {
      this.getConnectionInfo().subscribe((info) => {
        let options = {
          accessTokenFactory: () => info.accessToken,
        };
  
        this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl(info.url, options)
          .configureLogging(signalR.LogLevel.Information)
          .build();
  
        this.hubConnection.start().catch((err) => console.error(err.toString()));
  
        this.hubConnection.on("notify", (data: any) => {
           this.notifications.next(data);
          //this.messages.next(data);
        });
      });
    }
    */
}