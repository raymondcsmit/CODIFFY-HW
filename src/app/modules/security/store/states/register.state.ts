import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { Login, RegisterFailure, RegisterUser } from '../actions/security.actions';
import { IAuthenticate } from '../model/security.model';
import { AuthService } from '../services/auth.service';

export interface RegisterStateModel {
    error: string | null;
    pending: boolean;
  }
  
  @State<RegisterStateModel>({
    name: 'registerPage',
    defaults: {
      error: null,
      pending: false
    }
  })
  @Injectable()
  export class RegisterState {
    constructor(private authService: AuthService) {}
    @Selector()
    static getError(state: RegisterStateModel) {
      return state.error;
    }
  
    @Selector()
    static getPending(state: RegisterStateModel) {
      return state.pending;
    }
    @Action(RegisterUser)
    register(
      { dispatch, patchState }: StateContext<RegisterStateModel>,
      action: RegisterUser
    ) {
      patchState({
        error: null,
        pending: true
      });
  
      return this.authService.register(action.payload).pipe(
        map(res => {
          if (res.success === true) {
  
            let loginData: IAuthenticate= {username:action.payload.username, password:action.payload.password};
            return dispatch(new Login(loginData));
  
            //console.log('response of api is ', res.data);
            //return dispatch(new LoginSuccess({ user: res.data }));
          } else return dispatch(new RegisterFailure(res.message));
        }),
        catchError(error => {
          return dispatch(new RegisterFailure(error));
        })
      );
    }
  
    @Action(RegisterFailure)
    loginFailure(
      { patchState }: StateContext<RegisterStateModel>,
      action: RegisterFailure
    ) {
      patchState({
        error: action.payload,
        pending: false
      });
    }
  }
  