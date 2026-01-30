import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProductList } from '../../shared/interfaces/products.interface';
import { Navbar } from '../../navbar/navbar';
import { ProductService } from '../services/product';
import { ProductList } from '../../product/product-list';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, ProductList, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home implements OnInit {
  protected readonly title = signal('fashion-store');

  constructor(private router: Router, private productService: ProductService) { }

  cartCount = signal(0);
  filteredData = signal<IProductList[]>([]);
  allProducts: IProductList[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filteredData.set(products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
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
      this.filteredData.set(this.allProducts);
    }
  }

  filterProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    const filtered = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(lowerQuery)
    );
    this.filteredData.set(filtered);
  }

  onProductDetails(event: { productId: string, category: string }): void {
    this.router.navigate([`/product/${event.productId}/category/${event.category}`]);
  }

  // createNewProduct() {
  //   this.router.navigate(['/products/new']);
  // }
}