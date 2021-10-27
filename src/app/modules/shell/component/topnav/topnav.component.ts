import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Logout } from 'src/app/modules/security/store';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {

  constructor(private store:Store) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.store.dispatch(new Logout());
  }
  onProfile(){
    //this.store.dispatch(new Logout());
    this.store.dispatch(new Navigate(['/profile']));
  }
}
