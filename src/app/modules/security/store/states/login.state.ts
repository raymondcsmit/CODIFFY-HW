import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Login, LoginFailure, LoginRedirect, LoginSuccess, LoginWithRefreshToken } from '../actions/security.actions';
import { AuthService } from '../services/auth.service';
import { IUser } from '../model/security.model';

export interface LoginStateModel {
    error: string | null;
    pending: boolean;
  }
  
  @State<LoginStateModel>({
    name: 'loginPage',
    defaults: {
      error: null,
      pending: false
    }
  })
  @Injectable()
  export class LoginState {
    constructor(private authService: AuthService) {}
  
    @Selector()
    static getError(state: LoginStateModel) {
      return state.error;
    }
 
    @Selector()
    static getPending(state: LoginStateModel) {
      return state.pending;
    }
  //LoginWithRefreshToken
    @Action(Login)
    login(
      { dispatch, patchState }: StateContext<LoginStateModel>,
      action: Login
    ) {
      patchState({
        error: null,
        pending: true
      });
  
      return this.authService.apilogin(action.payload).pipe(
        map(res => {
          if (res.success === true) {
            //console.log('response of api is ', res.data);
            return dispatch(new LoginSuccess({ user: res.data as IUser }));
          } else return dispatch(new LoginFailure(res.message));
        }),
        catchError(error => {
          return dispatch(new LoginFailure(error));
        })
      );
    }
  
    @Action(LoginWithRefreshToken)
    loginwithrefreshtoken(
      { dispatch, patchState }: StateContext<LoginStateModel>,
      action: LoginWithRefreshToken
    ) {
      patchState({
        error: null,
        pending: true
      });
  
      return this.authService.loginWithRefreshToken(action.payload.reftoken).pipe(
        map(res => {
          if (res.success === true) {
            //console.log('response of api is ', res.data);
            return dispatch(new LoginSuccess({ user: res.data as IUser }));
          } else return dispatch(new LoginFailure(res.message));
        }),
        catchError(error => {
          return dispatch(new LoginFailure(error));
        })
      );
    }
  
  
    @Action(LoginSuccess)
    loginSuccess({ dispatch, patchState }: StateContext<LoginStateModel>) {
      patchState({
        error: null,
        pending: false
      });
  
      dispatch(new Navigate(['/']));
    }
  
    @Action(LoginRedirect)
    loginRedirect({dispatch, patchState }: StateContext<LoginStateModel>,
      action: LoginRedirect)
    {
      dispatch(new Navigate(['/security']));
    }

    @Action(LoginFailure)
    loginFailure(
      { patchState }: StateContext<LoginStateModel>,
      action: LoginFailure
    ) {
      patchState({
        error: action.payload,
        pending: false
      });
    }
  }
  