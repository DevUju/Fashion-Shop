import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IProductList } from '../shared/interfaces/products.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {

  selectedProductIds: string[] = [];
  selectedProductId: string = '';
  @Input() data: IProductList[] = [];
  @Output() productSelected = new EventEmitter<IProductList>();
  @Output() singleData = new EventEmitter<{productId: string, category: string}>();

  constructor() { }

  ngOnInit(): void {}

  selectProduct(product: IProductList): void {
    this.productSelected.emit(product);

    const index = this.selectedProductIds.indexOf(product.id);

    if (index === -1) {
      this.selectedProductIds.push(product.id);
    }
    else {
      this.selectedProductIds.splice(index, 1);
    }
  }

  productDetails(product: IProductList): void {
    const singleProduct = product.id;
    const category = product.category as string;
    this.singleData.emit({productId: singleProduct, category: category});
  }

}
