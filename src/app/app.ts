import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductForm } from './product-form/product-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { ngSkipHydration: 'true' }
})
export class App {
}