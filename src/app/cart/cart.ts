import { Component, OnInit, signal } from '@angular/core';
import { CartService } from '../services/cart/cart';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../navbar/navbar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, Navbar],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  cartCounter$!: Observable<number>; 
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) { }

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

  goBack(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
