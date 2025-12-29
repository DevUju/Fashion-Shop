import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../shared/interfaces/products.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {

  selectedProductIds: number[] = [];
  @Input() data!: IProduct[];
  @Output() productSelected = new EventEmitter<IProduct>();

  ngOnInit(): void { }

  selectProduct(product: IProduct): void {
    this.productSelected.emit(product);

    const index = this.selectedProductIds.indexOf(product.id);

    if (index === -1) {
      this.selectedProductIds.push(product.id);
    } 
    // else {
    //   this.selectedProductIds.splice(index, 1);
    // }
  }

}
