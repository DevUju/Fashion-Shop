import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProductList } from '../../shared/interfaces/products.interface';
import { Navbar } from '../../navbar/navbar';
import { ProductList } from '../../product-list/product-list';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, ProductList],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  protected readonly title = signal('fashion-store');

  constructor(private router: Router, private productService: ProductService) { }

  prod: IProductList[] = []
  cartCount = signal(0);
  filteredData: IProductList[] = []

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.prod = products;
      this.filteredData = products;
      console.log("Home Component Initialized", this.prod);
    });
  }

  // async productData(): Promise<void> {
  //   const response = await this.productService.getAllProducts();
  //   const products = await response.json();
  //   this.prod = products;
  //   this.filteredData = products;
  // }

  onProductSelected(product: IProductList): void {
    if (product) {
      this.cartCount.update(count => count + 1);
    }
  }

  // async onSearchApp(query: string): Promise<void> {   

  //   if (query.length > 0){
  //     await this.productData();
  //     this.filterProducts(query);
  //     this.prod = this.filteredData;
  //   }
  //   if (query === '') {
  //     await this.productData();
  //   }
  // }

  // filterProducts(query: string): void {
  //   const lowerQuery = query.toLowerCase();
  //   this.filteredData = this.prod.filter(product =>
  //     product.name.toLowerCase().includes(lowerQuery));
  // }

  //  onProductDetails(productId: number): void {
  //    this.router.navigate(["/product", productId]);
  // }

  onSearchApp(query: string): void {
    if (query.length > 0) {
      this.filterProducts(query);
      this.prod = this.filteredData; // keep prod in sync with filtered results
    } else {
      // reset to full list without re-fetching
      this.filteredData = this.prod;
    }
  }

  filterProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredData = this.prod.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }

  onProductDetails(productId: number): void {
    this.router.navigate(["/product", productId]);
  }

}
