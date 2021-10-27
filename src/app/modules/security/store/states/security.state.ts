import { Injectable } from "@angular/core";
import { State } from '@ngxs/store';
import { AuthStatusState } from "./auth.state";
import { LoginState } from "./login.state";
import { RegisterState } from "./register.state";
@State({
    name: 'auth',
    children: [AuthStatusState, LoginState,RegisterState],
  })
  @Injectable()
  export class AuthState {}