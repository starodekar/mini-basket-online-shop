import { OrderDetailsComponent } from './../shared/components/order-details/order-details.component';
import { AuthGuardService } from './../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { NgModule } from '@angular/core';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';



@NgModule({
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "order-success/:id", component: OrderDetailsComponent, canActivate: [AuthGuardService] },
      { path: "check-out", component: CheckOutComponent, canActivate: [AuthGuardService] },
      { path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuardService] },

    ])
  ]
})
export class ShoppingModule { }
