import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, delay, tap } from "rxjs/operators";
import { Store } from "@ngxs/store";
import { HideLoader, ShowLoader } from "../store/app.actions";
import { LoaderState } from "../store/app.store";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private store: Store) { 

    //this.animals$ = this.store.select(state => state.LoaderState.);

  }
counter: number = 0;
  resultCounter: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.counter++;
    this.showLoader();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.resultCounter++;
        if (this.resultCounter === this.counter)
        this.hideLoader();
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.hideLoader();
          }
        }
        this.resultCounter++;
        if (this.resultCounter === this.counter)
        this.hideLoader();
      }));
  }

 
  private showLoader(): void {
    this.store.dispatch(new ShowLoader());
    //console.log("loader show from interceptor");
    //this.loaderService.show();
  }
  private hideLoader(): void {
    //this.loaderService.hide();
    this.store.dispatch(new HideLoader());
    //console.log("loader hide from interceptor");
  }

  
}