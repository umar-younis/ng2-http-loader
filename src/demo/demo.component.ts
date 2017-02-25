import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.html'
})

export class DemoComponent implements OnInit{
  constructor(private http: Http): void { }

  ngOnInit(): void {
    this.http.get('http://localhost:3001').subscribe(asd => {

    });
  }
}