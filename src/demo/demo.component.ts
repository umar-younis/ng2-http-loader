import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.html'
})

export class DemoComponent implements OnInit{

  counter: number = 0;
  bgcolor: string = '#00f';
  constructor(private http: Http) { }

  ngOnInit(): void {
    this.sendReq();
    
    setInterval(() => {
      if (this.counter++ < 3) {
        this.sendReq();
      }
    }, 2000);
  }

  sendReq(): void {
    this.http.get('http://localhost:3001').subscribe();
  }
}