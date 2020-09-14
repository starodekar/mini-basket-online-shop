import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from './../../../shared/models/order';
import { ShoppingCart } from './../../../shared/models/shopping-cart';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  userId: string;
  cart$: Observable<ShoppingCart>;
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private router: Router) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();

    this.subscription = this.auth.user$.subscribe(user => {
      if (user)
        this.userId = user.uid
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async submit(shippingDetails, cart) {
    let order = new Order(this.userId, shippingDetails, cart);
    let result = await this.orderService.createOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }
}
