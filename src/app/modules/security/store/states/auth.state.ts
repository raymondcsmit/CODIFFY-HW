import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { LockScreen, LoginRedirect, LoginSuccess, Logout, UnLockScreen } from '../actions/security.actions';
import { IUser } from '../model/security.model';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

export interface AuthStatusStateModel {
  loggedIn: boolean;
  user: IUser | null;
  lastActiveRoute:string;
}

const authStatusStateDefaults: AuthStatusStateModel = {
  loggedIn: false,
  user: null,
  lastActiveRoute:"/"
};

@State<AuthStatusStateModel>({
  name: 'status',
  defaults: authStatusStateDefaults
})
@Injectable()
export class AuthStatusState {

  constructor(private authService: AuthService) { }


  @Selector()
  static getLoggedIn(state: AuthStatusStateModel) {
    return state.loggedIn;
  }

  @Selector()
  static getUser(state: AuthStatusStateModel) {
    return state.user;
  }

  @Selector()
  static getToken(state: AuthStatusStateModel) {
    return state.user?.accessToken;

  }
  @Selector()
  static getRefreshToken(state: AuthStatusStateModel) {
    return state.user?.refreshToken;
  }
  //LoginWithRefreshToken

  //   @Selector()
  // static token(state: AuthStateModel) {
  //   return state.token;
  // }
  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<AuthStatusStateModel>,
    action: LoginSuccess
  ) {
    patchState({
      loggedIn: true,
      user: action.payload.user
    });
  }

  @Action(LockScreen)
  lockScreen(
    { getState, patchState }: StateContext<AuthStatusStateModel>, action: LockScreen) {
    console.log('last active route is :', action.lastactiveroute);
    const state = getState();
    patchState({
      lastActiveRoute:action.lastactiveroute
    });
  }
  @Action(UnLockScreen)
  unLockScreen(
    { getState, patchState, dispatch }: StateContext<AuthStatusStateModel>,
    action: UnLockScreen
  ) {
    return this.authService.unLock(action.payload).pipe(
      map(res => {
        if (res.isSuccess) {
          const state = getState();
          patchState({
            loggedIn: true
          });
          dispatch(new Navigate([state.lastActiveRoute]));
        }
        //setState(authStatusStateDefaults);
        //dispatch(new Navigate(['/login']));
      })
    );
    // patchState({
    //   loggedIn: !action.payload
    // });
  }
  @Action([Logout, LoginRedirect])
  logout({ dispatch, setState }: StateContext<AuthStatusStateModel>) {


    return this.authService.logout().pipe(
      map(res => {
        setState(authStatusStateDefaults);
        dispatch(new Navigate(['/login']));
      })
    );

    //todo fire api request to logout user

  }
}
