import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, of, throwError } from 'rxjs';
import { switchMap, take, filter, catchError, observeOn } from 'rxjs/operators';
import { AuthStatusState } from '../modules/security/store/states/auth.state';
import { Select, Store } from '@ngxs/store';
import { IUser } from '../modules/security/store/model/security.model';
import { AuthState, LoginState, LoginWithRefreshToken } from '../modules/security/store';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  // @Select(AuthStatusState.getUser)
  // user$!: Observable<string>
  constructor(private store: Store) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // exempt some paths from authentication
    if (req.headers.get('authExempt') === 'true') {

      return next.handle(req);
    }
    const authDetail = this.store.selectSnapshot(AuthStatusState.getUser);
    const token = authDetail?.accessToken;
    const refreshToken = authDetail?.refreshToken;

    if (req.url.includes("api/auth/refreshtoken")) {

      const refreshRequest = req.clone({
        headers: req.headers.set('refreshToken', refreshToken?.token ? refreshToken?.token : '')
      });
      return next.handle(refreshRequest);
    }


    // Clone the request to add the new header.
    const modifiedRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${token ? token : ''}`)
    });

    // return next.handle(modifiedRequest)
    return next.handle(modifiedRequest).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
            //     return this.handle401Error(req, next);
            default:
              return throwError(error);
          }
        } else {
          return throwError(error);
        }
      }));
  }

  handle400Error(error: any) {
    // if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
    //     // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
    //     return this.logoutUser();
    // }

    return throwError(error);
  }

  // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
  //    return next;
  // }
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      let authDetail = this.store.selectSnapshot(AuthStatusState.getUser);
      let token = authDetail?.accessToken;
      let refTo = authDetail!.refreshToken;//?.token;+++
      let refreshToken = refTo!.token;
      this.store.dispatch(new LoginWithRefreshToken({ reftoken: refreshToken })).toPromise();
      authDetail = this.store.selectSnapshot(AuthStatusState.getUser);
      token = authDetail?.accessToken;
      const modifiedRequest = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token ? token : ''}`)
          .set('authExempt', 'true')
          .set('refreshtokenvalue', '')
      });
      return next.handle(modifiedRequest);


    }
    return throwError("");
  }

  protected tryGetRefreshTokenService(): Observable<boolean> {

    console.log("Refresh token request");
    return of(false);
  }
  handleError(error: Response) {
    // if (error.status == 500) {      
    //   this.router.navigate(['/login']);
    // } else {
    return Observable.throw(error);

  }
}