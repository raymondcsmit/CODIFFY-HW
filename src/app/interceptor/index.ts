import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { ToastrService } from 'ngx-toastr';
import { PostInterceptor } from './post.interceptor';
import { PutInterceptor } from './put.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
import { TokenInterceptor } from './token.interceptor';

export const httpInterceptorProviders = [
  //{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  //TokenInterceptor
  //
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true,deps: [ToastrService] },
  { provide: HTTP_INTERCEPTORS, useClass: PostInterceptor, multi: true,deps: [ToastrService] },
  { provide: HTTP_INTERCEPTORS, useClass: PutInterceptor, multi: true,deps: [ToastrService] },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
];