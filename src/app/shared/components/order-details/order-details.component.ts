import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from './../../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: string;
  order$: Observable<Order>;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  // Fetchincg the orderID and getting the order details
  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.order$ = this.orderService.getOrder(this.orderId);
  }

}

