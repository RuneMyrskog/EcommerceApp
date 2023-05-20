import { OrderService } from './../../services/order.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {


  orders$: Observable<any>;

  constructor(private orderService: OrderService){
    this.orders$ = orderService.getOrders();
  }
}
