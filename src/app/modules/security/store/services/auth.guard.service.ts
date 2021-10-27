import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from '@ngxs/store';
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { LoginRedirect } from "../actions/security.actions";
import { AuthStatusState } from "../states/auth.state";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthStatusState.getLoggedIn).pipe(
      map((authed) => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}