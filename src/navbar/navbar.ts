import { Component, Output, Input, EventEmitter, Signal, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Search } from './search/search';
import { RouterLink } from '@angular/router';
import { CartService } from '../app/services/cart/cart';
import { Observable } from 'rxjs';
import { Login } from '../app/login/login';
import { AuthService } from '../app/services/auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Search, RouterLink, ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  getCartTotal = signal<number>(0);

  @Input() cartCounter$!: Observable<number>; 
  @Output() getSearchQueryNav = new EventEmitter<string>();

  constructor(private cartService: CartService, public auth: AuthService) {}

  ngOnInit(): void {
    this.getTotalCart();
  }

  onSearchNav(query: string) {
    this.getSearchQueryNav.emit(query);
  }

  getTotalCart() {
   const total = this.cartService.getTotalItems();
   
   this.getCartTotal.set(total);
  }

  logout() {
    this.auth.logout()
  }
}
