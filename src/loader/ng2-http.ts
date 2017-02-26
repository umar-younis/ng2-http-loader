import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Http, XHRBackend, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Ng2HttpLoaderEmitter } from './ng2-http-loader-emitter';

@Injectable()
export class Ng2Http extends Http {
  private totalRequests: number = 0;
  private emitter: Ng2HttpLoaderEmitter;
  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private injector: Injector) {
    super(backend, defaultOptions);
    this.emitter = injector.get(Ng2HttpLoaderEmitter);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.onRequest();
      let subscribe: Subscription = super.get((url), options).map(res => {
        this.onRequestEnd();
        return res;
      }).subscribe(res => {
        subscribe.unsubscribe();
        observer.next(res);
        observer.complete();
      });
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.onRequest();
      let subscribe: Subscription = super.post(url, body, options).map(res => {
        this.onRequestEnd();
        return res;
      }).subscribe(res => {
        subscribe.unsubscribe();
        observer.next(res);
        observer.complete();
      });
    });
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.onRequest();
      let subscribe: Subscription = super.put(url, body, options).map(res => {
        this.onRequestEnd();
        return res;
      }).subscribe(res => {
        subscribe.unsubscribe();
        observer.next(res);
        observer.complete();
      });
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.onRequest();
      let subscribe: Subscription = super.delete(url, options).map(res => {
      this.onRequestEnd();
      return res;
      }).subscribe(res => {
        subscribe.unsubscribe();
        observer.next(res);
        observer.complete();
      });
    });
  }

  private onRequest(): void {
    this.totalRequests++;
    this.emitter.emit({
      action: 'init',
      count: this.totalRequests
    });
  }

  onRequestEnd(): void {
    this.totalRequests--;
    this.emitter.emit({
      action: 'end',
      count: this.totalRequests
    });
  }
}

// This is to make happy the AoT compiler
export function httpLoaderFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, injector: Injector) {
  return new Ng2Http(xhrBackend, requestOptions, injector);
}