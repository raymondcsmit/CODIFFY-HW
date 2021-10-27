import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { ApiResponse } from "../store/api.response.model";

@Injectable()
export class PostInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if(req.method==="POST")
    {
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {

          if (event instanceof HttpResponse && (event.status === 201 || event.status === 200)) {
            let res=event.body as ApiResponse;
          if(res && res.success)
          this.toastr.success(res.message); 
          else          
            this.toastr.error(res.message);
           // this.toastr.success(event.body.message); // todo bind it to the response message of api
          }
          else          
            throwError(event);
        })
      );
    }
    return next.handle(req);
    
  }
}