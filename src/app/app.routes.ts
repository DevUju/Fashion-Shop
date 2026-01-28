import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Notfound } from './notfound/notfound';
import { ProductDetail } from './product-detail/product-detail';

export const routes: Routes = [
    {path: '', component: Home},
    // {path: 'products', component: ProductList},
    {path: 'product/:id/category/:name', component: ProductDetail},
    {path: 'cart', component: Cart},
    {path: '**', component: Notfound}
];
