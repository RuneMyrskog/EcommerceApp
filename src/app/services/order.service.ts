import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';

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
}
