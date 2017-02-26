# Ng2-Http-Loader

The idea is simple: Add a loading bar / progress bar whenever an XHR request goes out in angular2.  Multiple requests within the same time period get bundled together such that each response increments the progress bar by the appropriate amount.

This is mostly cool because you simply include it in your app, and it works.  There's no complicated setup, and no need to maintain the state of the loading bar; it's all handled automatically by the interceptor.

## ng2-http-loader [![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)

Follow me [![twitter](https://img.shields.io/twitter/follow/babarxm.svg?style=social&label=%20babarxm)](https://twitter.com/babarxm) to be notified about new releases.

## Setup
`npm install ng2-http-loader --save`

## Inputs
  - `color` sets the color of loader.

## Configuration
### Step 1
    import { Ng2HttpLoaderModule } from "ng2-http-loader";
    @NgModule({
      imports: [ Ng2HttpLoaderModule ]
    })
    export class AppModule { }

### Step 2
#### Put it on the top of your root component.
    @Component({
      selector: `app-demo`,
      templateUrl: `<ng2-http-loader [color]="color"></ng2-http-loader>`
    })

    export class AppComponent{
      color = '#00f';
    }

### If you are going to use custom interceptor in your app.
    import { Ng2Http } from 'ng2-http-loader';
    @Injectable()
    export class HttpInterceptor extends Ng2Http {
      constructor(backend: ConnectionBackend,defaultOptions: RequestOptions, injector: Injector) {
        super(backend, defaultOptions, injector);
      }
      // setup your custom interceptor...
    }

## TODO
  - Demo 
  - Unit tests

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/babarxm/ng2-http-loader/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.


### License

The MIT License (see the [LICENSE](https://github.com/babarxm/ng2-http-loader/blob/master/LICENSE) file for the full text)