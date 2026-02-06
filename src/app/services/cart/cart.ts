import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    if (this.isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  private updateLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(this.cartItems);
    this.updateLocalStorage();  
  }

  getCartItems() {
    return this.cartItems;
  }


  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartSubject.next(this.cartItems);
    this.updateLocalStorage();  
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    if (this.isBrowser) {
      localStorage.removeItem('cart');
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}