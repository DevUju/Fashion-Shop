import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { ngSkipHydration: 'true' }
})
export class App implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
  }
  
}