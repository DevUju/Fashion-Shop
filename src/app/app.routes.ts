import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Notfound } from './notfound/notfound';
import { ProductDetail } from './product-detail/product-detail';
import { ProductForm } from './product-form/product-form';
import { authGuard } from './auth-guard'
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [authGuard] },
    { path: 'product/:id/category/:name', canActivate: [authGuard], component: ProductDetail },
    { path: 'cart', canActivate: [authGuard], component: Cart },
    { path: 'products/new', canActivate: [authGuard], component: ProductForm },
    { path: 'login', component: Login },
    { path: '**', component: Notfound }
];
