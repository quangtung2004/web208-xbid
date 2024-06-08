import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product/list/list.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';
import { ProductDetailComponent } from './pages/products/detail/detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductCreateComponent } from './pages/admin/product/create/create.component';
import { ProductEditComponent } from './pages/admin/product/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductBidsComponent } from './pages/admin/product/bids/bids.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/create',
        component: ProductCreateComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'products/:id/bids',
        component: ProductBidsComponent,
      },
    ],
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
