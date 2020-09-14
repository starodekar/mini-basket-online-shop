import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Order } from './../models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async createOrder(order) {
    let result = await this.db.list("/orders").push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrder(orderId): Observable<Order> {
    return this.db.object<Order>("/orders/" + orderId).valueChanges();
  }

  //areturning AngularFireList Object because we need to use .snapshotChanges() and .valuechanges() in different locations.
  getOrders(): AngularFireList<Order> {
    return this.db.list<Order>("/orders");
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.db.list<Order>("/orders", query => query.orderByChild('userId').equalTo(userId)).valueChanges();
  }
}
