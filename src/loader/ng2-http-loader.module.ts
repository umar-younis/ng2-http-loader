import { NgModule, Injector } from '@angular/core';
import { Ng2HttpLoaderComponent } from './ng2-http-loader.component';
import { Ng2Http, httpLoaderFactory } from './ng2-http';
import { Http, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { Ng2HttpLoaderEmitter } from './ng2-http-loader-emitter';

@NgModule({
  imports: [],
  exports: [Ng2HttpLoaderComponent],
  declarations: [Ng2HttpLoaderComponent],
  providers: [
    Ng2HttpLoaderEmitter,
    { provide: Http,
      useFactory: httpLoaderFactory,
      deps: [XHRBackend, RequestOptions, Injector] }
  ]
})
export class Ng2HttpLoaderModule { }
