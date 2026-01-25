import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product';
import { IProductList } from '../../shared/interfaces/products.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {

  constructor(private productService: ProductService, private router: ActivatedRoute) { }
  productId: string | null = null;

  selectedProduct: IProductList = {} as IProductList;
  product: IProductList[] = [] as IProductList[];

  ngOnInit(): void {
    this.productId = this.router.snapshot.paramMap.get('id')
    this.getProductDetails();
  }


  getProductDetails(): void {
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.selectedProduct = product;
      });
    }

  }

}
