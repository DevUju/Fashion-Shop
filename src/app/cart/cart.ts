import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../services/cart';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, Navbar],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartCounter = signal<number>(0); 
  cartItems: any[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      return this.cartService.getCartItems()
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
