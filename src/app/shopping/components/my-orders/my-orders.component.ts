import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from './../../../shared/models/order';
import { AuthService } from './../../../shared/services/auth.service';
import { OrderService } from './../../../shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$: Observable<Order[]>;
  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.orders$ = this.authService.user$.pipe(switchMap((user: any) => this.orderService.getOrdersByUser(user.uid)));
  }

}
