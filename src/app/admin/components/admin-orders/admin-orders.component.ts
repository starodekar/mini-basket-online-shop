import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from './../../../shared/models/order';
import { OrderService } from './../../../shared/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  orders: Order[];
  sub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.sub = this.orderService.getOrders().snapshotChanges().subscribe(
      orders => this.orders = orders.map(details =>
        (
          {
            key: details.payload.key,
            userId: details.payload.val().userId,
            datePlaced: details.payload.val().datePlaced,
            shippingDetails: details.payload.val().shippingDetails,
            items: details.payload.val().items
          }))
    ); //Mapping the order object to get the order ID (key) so that we can passit to view any perticular order.
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}