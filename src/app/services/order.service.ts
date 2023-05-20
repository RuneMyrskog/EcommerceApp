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

  getOrders(){
    return DatabaseUtility.getList(this.db, '/orders');
  }

  getOrderByUser (userId: string) {
    let query = (ref: any) => ref.orderByChild('userId').equalTo(userId);
    return DatabaseUtility.getList(this.db, '/orders', query);
  }
}
