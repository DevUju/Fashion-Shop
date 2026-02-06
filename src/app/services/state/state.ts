import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductList } from '../../../shared/interfaces/products.interface';

interface AppState {
  products: IProductList[],
  cart: any[],
  loading: boolean,
  error: string | null,
  selectedProductIds: any[]
}

@Injectable({
  providedIn: 'root',
})

export class State {
  private initialState: AppState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
    selectedProductIds: []

  };

  private state$ = new BehaviorSubject<AppState>(this.initialState);

  products$ = this.state$.asObservable().pipe(map(s => s.products));
  cart$ = this.state$.asObservable().pipe(map(s => s.cart));
  cartCount$ = this.cart$.pipe(map(cart => cart.length));
  loading$ = this.state$.asObservable().pipe(map(s => s.loading));
  error$ = this.state$.asObservable().pipe(map(s => s.error));
  selectedProductIds$ = this.state$.asObservable().pipe(map(s => s.selectedProductIds));



  setProducts(products: IProductList[]) {
    this.state$.next({ ...this.state$.value, products });
  }

  addProduct(product: IProductList) {
    this.state$.next({
      ...this.state$.value,
      products: [...this.state$.value.products, product]
    });
  }

  addToCart(item: any) {
    this.state$.next({
      ...this.state$.value,
      cart: [...this.state$.value.cart, item]
    });
  }

  setLoading(loading: boolean) {
    this.state$.next({ ...this.state$.value, loading });
  }

  setError(error: string | null) {
    this.state$.next({ ...this.state$.value, error });
  }

  toggleSelectedProduct(productId: string) {
    const current = this.state$.value.selectedProductIds;
    const exists = current.includes(productId);
    const updated = exists
      ? current.filter(id => id !== productId)
      : [...current, productId];

    this.state$.next({ ...this.state$.value, selectedProductIds: updated });
  }
}


