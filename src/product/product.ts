import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IProduct } from '../shared/interfaces/products.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {

  selectedProductIds: number[] = [];
  selectedProductId: number = 0;
  @Input() data!: IProduct[];
  @Output() productSelected = new EventEmitter<IProduct>();
  @Output() singleData = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void { }

  selectProduct(product: IProduct): void {
    this.productSelected.emit(product);

    const index = this.selectedProductIds.indexOf(product.id);

    if (index === -1) {
      this.selectedProductIds.push(product.id);
    } 
    else {
      this.selectedProductIds.splice(index, 1);
    }
  }

  productDetails(product: IProduct): void {
    const singleProduct = product.id;
    this.singleData.emit(singleProduct);
  }
  
}
