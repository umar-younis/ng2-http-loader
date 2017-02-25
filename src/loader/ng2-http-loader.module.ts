import { NgModule } from '@angular/core';
import { Ng2HttpLoaderComponent } from './ng2-http-loader.component';
import { Ng2HttpLoaderInterceptor, httpLoaderFactory } from './ng2-loader-interceptor';
import { Http, ConnectionBackend, XHRBackend, RequestOptions } from '@angular/http';
import { Ng2Emitter } from './ng2-emitter';

@NgModule({
  imports: [],
  exports: [Ng2HttpLoaderComponent],
  declarations: [Ng2HttpLoaderComponent],
  providers: [
    Ng2Emitter,
    { provide: Http,
      useFactory: httpLoaderFactory,
      deps: [XHRBackend, RequestOptions, Ng2Emitter] }
  ]
})
export class Ng2HttpLoaderModule { }
