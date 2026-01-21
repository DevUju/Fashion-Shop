import { Routes } from '@angular/router';
import { EachProduct } from './each-product/each-product';
import { ProductDetail } from './product-detail/product-detail';
import { Home } from './home/home';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'product/:id', component: EachProduct},
    {path: 'desmond', component: ProductDetail},
];
