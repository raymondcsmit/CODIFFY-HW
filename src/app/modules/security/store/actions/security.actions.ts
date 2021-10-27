import { IAuthenticate, IRefreshToken, IRegister, IUser } from "../model/security.model";

export class Login {
    static readonly type = '[Auth] Login';
  
    constructor(public payload: IAuthenticate) {}
  }
  export class LockScreen {
    static readonly type = '[Auth] LockScreen';
  
    constructor(public lock: boolean,public lastactiveroute:string) {}
  }
  export class UnLockScreen {
    static readonly type = '[Auth] UnLockScreen';
  
    constructor(public payload: IAuthenticate) {}
  }
  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
  
    constructor(public payload: { user: IUser }) {}
  }
  
  export class LoginWithRefreshToken {
    static readonly type = '[Auth] Login with refresh token';
  
    constructor(public payload: { reftoken: string }) {}
  }
  
  export class LoginFailure {
    static readonly type = '[Auth] Login Failure';
  
    constructor(public payload: any) {}
  }
  export class RegisterFailure
  {
    static readonly type = '[Auth] Register Failure';
  
    constructor(public payload: any) {}
  }
  
  export class LoginRedirect {
    static readonly type = '[Auth] Login Redirect';
  }
  
  export class Logout {
    static readonly type = '[Auth] Logout';
  }
  export class RegisterUser {
    static readonly type = '[Auth] Register';
  
    constructor(public payload: IRegister) {}
  }
  