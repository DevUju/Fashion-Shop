import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../shared/interfaces/products.interface';
import { Navbar } from '../../navbar/navbar';
import { Product } from '../../product/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Product],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{
  protected readonly title = signal('fashion-store');

  constructor(private router: Router) {}

  protected data!: IProduct[];
  cartCount = signal(0);
  filteredData!: IProduct[];

  ngOnInit(): void {
      this.productData();
  }

  async productData(): Promise<IProduct[]> {
    return this.data = [
      {
      id: 1,
      name: "Bangles",
      imageUrl: "../assets/images/bangles.jpg",
      description: "Bangles that add grace to every movement. Simple, stylish, and made to shine.",
      price: 50000.00
    },
    {
      id: 2,
      name: "Diamond Earrings",
      imageUrl: "../assets/images/diamond-earrings.jpg",
      description: "Pure diamonds, perfectly set. Effortless sparkle for every moment.",
      price: 100000.00
    },
    {
      id: 3,
      name: "Jewelry",
      imageUrl: "../assets/images/jewelry-set.jpg",
      description: "Thoughtfully designed jewelry for everyday elegance. Simple, refined, and unforgettable.",
      price: 70000.00
    },
    {
      id: 4,
      name: "Glass Frame",
      imageUrl: "../assets/images/glass-frame.jpg",
      description: "Frames that define your look. Designed to stand out, built to last.",
      price: 30000.00
    },
    {
      id: 5,
      name: "Wedding Rings",
      imageUrl: "../assets/images/wedding-rings.jpg",
      description: "Exquisite wedding rings made with devotion. Where commitment meets craftsmanship.",
      price: 500000.00
    },
    {
      id: 6,
      name: "Wrist Watch",
      imageUrl: "../assets/images/wristwatch.jpg",
      description: "Reliable wristwatches for daily wear. Simple, durable, and stylish.",
      price: 40000.00
    }
  ]
  }

  onProductSelected(product: IProduct): void {
    if (product) {
      this.cartCount.update(count => count + 1);
    }
  }

  onSearchApp(query: string): void {   

    if (query.length > 0){
      this.productData();
      this.filterProducts(query);
      this.data = this.filteredData;
    }
    if (query === '') {
      this.productData();
    }
  }

  filterProducts(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredData = this.data.filter(product =>
      product.name.toLowerCase().includes(lowerQuery));
  }

   onProductDetails(productId: number): void {
     this.router.navigate(["/product", productId]);
  }

  test(){
    this.router.navigate(["/desmond"]);
  }
}
