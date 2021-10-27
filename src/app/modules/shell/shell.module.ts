import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { TopnavComponent } from './component/topnav/topnav.component';
import { AsidenavComponent } from './component/asidenav/asidenav.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NotificationState } from './store/state/notification.state';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { LockAlertComponent } from './lock-alert/lock-alert.component';
import { LockState } from './store/state/lock.state';



@NgModule({
  declarations: [   
    ShellComponent,
    TopnavComponent,
    AsidenavComponent,
    FooterComponent,
    LockAlertComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShellRoutingModule,
    //NgIdleKeepaliveModule,
    //MomentModule,
    NgxsModule.forFeature([
      NotificationState, LockState
    ]),
  ],
  entryComponents: [LockAlertComponent],
 // providers:[SignalRService]
})
export class ShellModule { }
