import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProductList } from '../shared/interfaces/products.interface';
import { CommonModule } from '@angular/common';
import { State } from '../app/services/state/state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {

  selectedProductIds: string[] = [];
  selectedProductId: string = '';
  @Input() data$!: Observable<IProductList[]>;
  @Output() productSelected = new EventEmitter<IProductList>();
  @Output() singleData = new EventEmitter<{ productId: string, category: string }>();

  get loading$() {
    return this.state.loading$;
  }

  get error$() {
    return this.state.error$;
  }

  constructor(private state: State) { }

  ngOnInit() {}

  selectProduct(product: IProductList): void {
    this.state.toggleSelectedProduct(product.id);
    this.productSelected.emit(product);
  }

  productDetails(product: IProductList): void {
    const singleProduct = product.id;
    const category = product.category as string;
    this.singleData.emit({ productId: singleProduct, category: category });
  }
}


