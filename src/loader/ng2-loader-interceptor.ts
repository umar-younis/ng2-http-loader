import { Injectable, EventEmitter } from '@angular/core';
import { Http, XHRBackend, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Ng2Emitter } from './ng2-emitter';

@Injectable()
export class Ng2HttpLoaderInterceptor extends Http {
  private totalRequests: number = 0;
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private emitter: Ng2Emitter) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.onRequest();
    return super.get((url), options).map(res => {
      this.onRequestEnd();
      return res;
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.onRequest();
    return super.post(url, body, options).map(res => {
      this.onRequestEnd();
      return res;
    });
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    this.onRequest();
    return super.put(url, body, options).map(res => {
      this.onRequestEnd();
      return res;
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.onRequest();
    return super.delete(url, options).map(res => {
      this.onRequestEnd();
      return res;
    });
  }

  private onRequest(): void {
    this.totalRequests++;
    this.emitter.emit(this.totalRequests);
  }

  onRequestEnd(): void {
    this.totalRequests--;
    this.emitter.emit(this.totalRequests);
  }
}

// This is to make happy the AoT compiler
export function httpLoaderFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, emitter: Ng2Emitter) {
  return new Ng2HttpLoaderInterceptor(xhrBackend, requestOptions, emitter);
}