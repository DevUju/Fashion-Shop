import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductList } from '../../shared/interfaces/products.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProductList[]> {
    return this.http.get<IProductList[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<IProductList> {
    return this.http.get<IProductList>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: IProductList): Observable<IProductList> {
    return this.http.post<IProductList>(this.apiUrl, product);
  }

}