import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/do';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(@Inject(DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = Number(request.headers.get('timeout')) || this.defaultTimeout;
    console.log(request);
    return next.handle(request).do(event => {
      if(event instanceof HttpResponse) {
        console.log(event);
      }else console.log("nie jest typu http response")
    })
  }
}
