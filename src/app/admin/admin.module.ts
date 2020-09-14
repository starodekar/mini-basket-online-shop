import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './../shared/components/order-details/order-details.component';
import { AuthGuardService } from './../shared/services/auth-guard.service';
import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminGuardService } from './services/admin-guard.service';



@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "admin/products/new", component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: "admin/products/:id", component: ProductFormComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: "admin/products", component: AdminProductsComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: "admin/orders", component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminGuardService] },
      { path: "admin/orders/:id", component: OrderDetailsComponent, canActivate: [AuthGuardService] },
    ])
  ]
})
export class AdminModule { }
