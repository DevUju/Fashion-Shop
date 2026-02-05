import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';
import { State } from '../services/state';
import { catchError, Observable } from 'rxjs';
import { ErrorHandler } from '../services/error-handler';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css'],
})
export class ProductForm implements OnInit {

  productForm!: FormGroup;
  imageError = false;
  // loading$!: Observable<boolean>
  // products$ = this.state$.asObservable().pipe(map(s => s.products));
  // cart$ = this.state$.asObservable().pipe(map(s => s.cart));
  // cartCount$ = this.cart$.pipe(map(cart => cart.length));
  // error$ = this.state$.asObservable().pipe(map(s => s.error));
  // selectedProductIds$ = this.state$.asObservable().pipe(map(s => s.selectedProductIds));


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private state: State,
    private errorHandler: ErrorHandler
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.listenToImageUrlChanges();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      category: ['', Validators.required],
      imageUrl: ['', [
        Validators.required,
        Validators.pattern('https?://.+')
      ]],
      instock: [false],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([this.createProperty()])
    });
  }

  private listenToImageUrlChanges(): void {
    this.productForm.get('imageUrl')?.valueChanges.subscribe(() => {
      this.imageError = false;
    });
  }

  createProperty(): FormGroup {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  get properties(): FormArray {
    return this.productForm.get('properties') as FormArray;
  }

  addProperty(): void {
    this.properties.push(this.createProperty());
  }

  removeProperty(index: number): void {
    if (this.properties.length > 1) {
      this.properties.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

  }

}

//   onSubmit() {
//     this.loading$ = this.state.loading$;
//     this.productService.createProduct(this.productForm.value).pipe(
//       catchError(err => {
//         this.errorHandler.handleError(err); // logs or transforms error
//         this.state.setError('Failed to create product'); // update global error state
//         this.loading$ = false;
//         return EMPTY;
//       })
//     ).subscribe(newProduct => {
//       const currentProducts = this.state$.value.products;
//       this.state.setProducts([...currentProducts, newProduct]);
//       this.loading = false;
//     });
//   }


//   const product = this.productForm.value;

//     this.productService.createProduct(product).subscribe({
//     next: () => {
//       alert('Product created successfully!');
//       this.productForm.reset();
//       this.properties.clear();
//       this.addProperty();
//       this.router.navigate(['']);
//     },
//     error: () => {
//       alert('Failed to create product');
//     }
//   });
//   }

