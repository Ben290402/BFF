// src/app/app.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="callApiA()">Call API A</button>
    <button (click)="callApiB()">Call API B</button>

    <p *ngIf="message">{{ message }}</p>
  `,
  styles: []
})
export class AppComponent {
  message: string = '';

  constructor(private http: HttpClient) {}

  callApiA() {
    const M = 50; // Number of times to call API A
    this.message = 'Calling API A...';
    for (let i = 0; i < M; i++) {
      this.http.get('http://localhost:3001/api/object').subscribe(c => {
        // convert the result objet values to array
        const values = Object.values(c);
        // filters the array to keep only half of them
        const half = values.filter((_, index) => index % 2 === 0);
        // logs the half array
        console.log(half);
      });
    }
    this.message = `Called API A ${M} times`;
  }

  callApiB() {
    const L = 10; // Number of times to call API B
    this.message = 'Calling API B...';
    for (let i = 0; i < L; i++) {
      this.http.get('http://localhost:3002/api/aggregate').subscribe();
    }
    this.message = `Called API B ${L} times`;
  }
}
