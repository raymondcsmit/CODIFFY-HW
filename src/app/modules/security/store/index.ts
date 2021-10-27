import { AuthStatusState } from './states/auth.state';
import { LoginState } from './states/login.state';
import { RegisterState } from './states/register.state';
import { AuthState } from './states/security.state';

export const AuthStates = [
    AuthState,
    AuthStatusState,
    LoginState,
    RegisterState
  ];
  export * from './actions/security.actions';
  export * from './states/security.state';
  export * from './states/login.state';