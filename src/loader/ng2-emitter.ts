import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class Ng2Emitter {
  private emitter: EventEmitter<any>;
  constructor(){
    this.emitter = new EventEmitter<any>();
  }

  getEmitter(): EventEmitter<any> {
    return this.emitter;
  }

  emit(data: any): void {
    this.emitter.emit(data);
  }
}