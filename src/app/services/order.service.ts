import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { DatabaseUtility } from './database-utility';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private cartService: ShoppingCartService,private db: AngularFireDatabase) { }

  async placeOrder(order: any){
    let result =  await this.db.list('/orders').push(order)
    this.cartService.clearCart();
    return result;
  }

  get(orderId: string): Observable<any> {
    return DatabaseUtility.getItem(this.db, '/orders/' + orderId)
      // .pipe(map(x => new Order(x.data, x.key)));
  }

  getOrders(){
    return DatabaseUtility.getList(this.db, '/orders');
  }

  getOrdersByUser (userId: string) {
    let query = (ref: any) => ref.orderByChild('userId').equalTo(userId);
    return DatabaseUtility.getList(this.db, '/orders', query);
  }
}
