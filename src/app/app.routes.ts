import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Notfound } from './notfound/notfound';
import { ProductDetail } from './product-detail/product-detail';
import { ProductForm } from './product-form/product-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'product/:id/category/:name', component: ProductDetail},
    {path: 'cart', component: Cart},
    {path: '**', component: Notfound},
    {path: 'products/new', component: ProductForm}
];
