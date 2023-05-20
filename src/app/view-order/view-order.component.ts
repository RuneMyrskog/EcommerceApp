import { take, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  order: any;
  id: string | null;

  constructor(orderService: OrderService,
              route: ActivatedRoute){
    
                
    this.id = route.snapshot.paramMap.get('id');
    if (this.id) orderService.get(this.id)
      .pipe(take(1)).subscribe(order => {
        console.log("order: ", order)
        this.order = order});

  }

  totalPrice() {
    let sum = 0;
    for (let item of this.order.data.items) {
      sum += item.totalPrice
    } 
    return sum;
  }


}
