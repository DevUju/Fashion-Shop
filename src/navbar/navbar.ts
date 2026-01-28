import { Component, Output, Input, EventEmitter, Signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Search } from './search/search';
import { RouterLink } from '@angular/router';
import { CartService } from '../app/services/cart';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Search, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar{

  @Input() cartCounter!: Signal<number>;
  @Output() getSearchQueryNav = new EventEmitter<string>();

  constructor(private cartService: CartService) {}

  onSearchNav(query: string) {
    console.log('Search query:', query);
    this.getSearchQueryNav.emit(query);
  }
}
