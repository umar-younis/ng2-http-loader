import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Ng2HttpLoaderEmitter } from './ng2-http-loader-emitter';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ng2-http-loader',
  template: `
    <div class="ng2-http-loader-div"
    [style.width]="progress + '%'"
    [class.ng2-start-loader]="anim1"
    [class.ng2-end-loader]="anim2"
    [style.background]="color"
    [style.box-shadow]="'0.5px 0.5px 2px 2px' + color"
    [style.visibility]="visibility"></div>
  `,
  styles: [`

    @keyframes ng2-anim1 {
        from { width: 0% }
        to { width: 60% }
    }
    @keyframes ng2-anim2 {
        from { width: 60% }
        to { width: 100% }
    }
    .ng2-http-loader-div{
      position: fixed;
      left: 0px;
      top: 0px;
      opacity: 0.5;
      z-index: 100000;
    }

    .ng2-start-loader{
      animation: ng2-anim1;
      animation-duration: 4s;
    }
    .ng2-end-loader{
      animation: ng2-anim2;
      animation-duration: 4s;
    }
  `]
})

export class Ng2HttpLoaderComponent implements OnInit {
  private subscriber: Subscription;
  @Input() color: string;
  private progress: number = 0;
  private totalRequests: number = 0;
  private visibility: string = 'hidden';
  private thresHold: number = 60;
  private anim1: boolean = false;
  private anim2: boolean = false;
  constructor(private emitter: Ng2HttpLoaderEmitter) {
    if (!this.subscriber) {
      this.subscriber = this.emitter.getEmitter().subscribe(data => {
        this.totalRequests = data.count;
        this.startLoader(data.action);
      });
    }
  }

  ngOnInit(): void {
    this.color = this.color ? this.color : '#ff0000';
  }

  private startLoader(action?: string): void {
    if (action === 'init' && this.totalRequests === 1) {
      this.show();
      this.progress = 60;
    } else if (action === 'end' && this.totalRequests === 0) {
      this.progress = 100;
      this.hide();
    }
  }

  handleProgressPercentage(flag: boolean): void {
    this.progress += 1;
  }

  private show(): void {
    this.anim2 = false;
    this.anim1 = true;
    this.visibility = 'visible';
  }

  private hide(): void {
    this.anim1 = false;
    this.anim2 = true;
    setTimeout(() => {
      this.visibility = 'hidden';
    }, 4000);
  }
}
