import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Selector, Store } from '@ngxs/store';
import { ConnectWebSocket } from '@ngxs/websocket-plugin';
import { WebSocketHandler } from '@ngxs/websocket-plugin/src/websocket-handler';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MessageService } from 'src/app/service/message.service';
import { LockScreen } from '../../security/store';
import { LockAlertComponent } from '../lock-alert/lock-alert.component';
import { ChangeIdleState, ChangeLastPing, ChangeTimeOut, LastRoute } from '../store/actions/lock.actions';
import { SignalRMessageRecieved } from '../store/actions/notification.actions';
import { IMessage } from '../store/model/notification.model';
import { SignalRService } from '../store/service/notification.service';
import { LockState } from '../store/state/lock.state';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  lastRoute:string="";

  @Select(LockState.getIdleState) idleState$?: Observable<string>;
  @Select(LockState.getTimedOut) timedOut$?: Observable<boolean>;
  @Select(LockState.getLastPing) lastPing$?: Observable<boolean>;
  modalRef?: NgbModalRef;
  ngOnInit(): void {
    this.srvSignalR.startConnection();
    this.idle.watch();    
  }

  constructor(private store: Store, private srvSignalR: SignalRService, private idle: Idle,
    private keepalive: Keepalive, private modalService: NgbModal, private router: Router) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(300);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.store.dispatch(new ChangeIdleState('No longer idle.'));
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.closeModal();
      this.store.dispatch(new ChangeIdleState('Timed out!'));
      this.store.dispatch(new ChangeTimeOut(true));
      this.store.dispatch(new LockScreen(true,this.router.url));
      //this.store.dispatch(new LastRoute(this.router.url));
      this.store.dispatch(new Navigate(['/lock']));
    });

    idle.onIdleStart.subscribe(() => {
      this.store.dispatch(new ChangeIdleState('You\'ve gone idle!'));
      this.showModal();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.store.dispatch(new ChangeIdleState('You will time out in ' + countdown + ' seconds!'));
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(60);

    keepalive.onPing.subscribe(() => this.store.dispatch(new ChangeLastPing(new Date())));

    // this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
    //   if (userLoggedIn) {
    //     idle.watch()
    //     this.timedOut = false;
    //   } else {
    //     idle.stop();
    //   }
    // })
  }

  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.store.dispatch(new ChangeTimeOut(false));
    //this.timedOut = false;
  }
  closeModal() {
    this.modalRef?.close();
  }
  showModal() {
    this.modalRef = this.modalService.open(LockAlertComponent, { size: 'l', backdrop: 'static' });
    //modalRef.componentInstance.lesson = lesson;
    this.modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

}
