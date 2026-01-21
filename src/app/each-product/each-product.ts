import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../shared/interfaces/products.interface';

@Component({
  selector: 'app-each-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './each-product.html',
  styleUrl: './each-product.css',
})
export class EachProduct implements OnInit {

  selectedProduct!: IProduct;
 
  constructor(private route: ActivatedRoute) {
   
  }
  
  async ngOnInit(): Promise<void> {
    console.log('paramMap:', this.route.snapshot.paramMap);
    console.log("Each Product Component Initialized");
    // console.log("Product ID:", this.productId);
    
    const products = this.productData();
    this.searchProduct(products);

    console.log("Selected Product:", this.selectedProduct);
  }

   productData(){
    return [
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
    ];
  }

  searchProduct(products: any): void{
    const productId = this.route.snapshot.paramMap.get("id") as string;
    this.selectedProduct = products.find((product: IProduct) => product.id === Number(productId)) ?? ({} as IProduct);
  }
}

