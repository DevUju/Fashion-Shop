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

  selectedProductIds: number[] = [];
  selectedProductId: number = 0;
  @Input() data: IProductList[] = [];
  @Output() productSelected = new EventEmitter<IProductList>();
  @Output() singleData = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    if (!this.data || this.data.length === 0) {
      console.warn("Product List received no data");
    } else {
      console.log("Product List Initialized", this.data);
    }

  }

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
    this.singleData.emit(singleProduct);
  }

}
