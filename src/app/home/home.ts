import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProductList } from '../../shared/interfaces/products.interface';
import { Navbar } from '../../navbar/navbar';
import { ProductService } from '../services/product';
import { ProductList } from '../../product/product-list';

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
  allProducts: IProductList[] = []

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
      this.prod = products;
      this.filteredData = products;
    });
  }

  onProductSelected(product: IProductList): void {
    if (product) {
      this.cartCount.update(count => count + 1);
    }
  }

  onSearchApp(query: string): void {
    if (query.length > 0) {
      this.filterProducts(query);
    } else {
      this.filteredData = this.allProducts;
    }
  }

  filterProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredData = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
  }

  onProductDetails(event: {productId: string, category: string}): void {
    this.router.navigate([`/product/${event.productId}/category/${event.category}`]);
  }
}