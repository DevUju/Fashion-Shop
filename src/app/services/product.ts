import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductList } from '../../shared/interfaces/products.interface';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandler } from './error-handler';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  getAllProducts(): Observable<IProductList[]> {
    return this.http.get<IProductList[]>(this.apiUrl)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getProductById(id: string): Observable<IProductList> {
    return this.http.get<IProductList>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  createProduct(product: IProductList): Observable<IProductList> {
    return this.http.post<IProductList>(this.apiUrl, product)
    .pipe(catchError(this.errorHandler.handleError));
  }

}