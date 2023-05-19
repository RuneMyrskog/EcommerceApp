import { take, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseUtility } from './database-utility';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  public async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId)
      .pipe(map(x => new ShoppingCart(x.data.items)));
    
  }

  private getItem(cartId: string, productId: string) {
    return DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();

    if (!result.key) return;
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId!, product.key)
    item$.pipe(take(1)).subscribe(item => {
      item.ref.update({
        product: product,
        quantity: item.exists ? item.data.quantity + change : 1 + change
      })
    })
  }




}
