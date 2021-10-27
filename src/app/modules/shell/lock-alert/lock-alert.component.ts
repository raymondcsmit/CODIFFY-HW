import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from '../../security/store';
import { LockState } from '../store/state/lock.state';

@Component({
  selector: 'app-lock-alert',
  templateUrl: './lock-alert.component.html',
  styleUrls: ['./lock-alert.component.css']
})
export class LockAlertComponent implements OnInit {

  @Select(LockState.getIdleState) idleState$?: Observable<string>;
  constructor(public activeModal: NgbActiveModal,private store: Store) { }
  idleState:string="";
  ngOnInit(): void {
    this.idleState$?.subscribe(data=> this.idleState=data);
  }
  stay() {
    this.activeModal.close();
    //this.reset();
    //dispatch reset time
  }

  logout() {
    this.store.dispatch(new Logout());
    this.activeModal.close();

    //this.store.dispatch(new Navigate(['/register']));
    // dispatch lock user action
    // route to lock screen
  }
}
