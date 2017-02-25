import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Ng2Emitter } from './ng2-emitter';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ng2-http-loader',
  template: `
    <div class="ng2-http-loader-div" [style.width]="progress + '%'"></div>
  `,
  styles: [`
    .ng2-http-loader-div{
      position: fixed;
      left: 0px;
      top: 0px;
      background: #f00;
      opacity: 0.5;
      box-shadow: 0.5px 0.5px 2px 2px #f00;
    }
  `]
})

export class Ng2HttpLoaderComponent implements OnInit {
  private subscriber: Subscription;
  private timer: any;
  @Input() color: string;
  private progress: number = 0;
  private totalRequests: number = 0;
  constructor(private emitter: Ng2Emitter) {
    if (!this.subscriber) {
      this.subscriber = this.emitter.getEmitter().subscribe(data => {
        this.totalRequests = data;
        this.startLoader();
      });
    }
  }

  ngOnInit(): void {}

  private startLoader(): void {
    if ((!this.timer) && (this.totalRequests > 0)) {
      this.timer = setInterval(() => {
        if (this.progress >= 65) {
          clearInterval(this.timer);
        } else {
          this.handleProgress();
        }
      }, 25);
    }
  }

  private handleProgress(): void {
    this.progress += 1;
  }
}
