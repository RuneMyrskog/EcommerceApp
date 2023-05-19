import { take, Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseUtility } from './database-utility';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId)
      .pipe(map(x => new ShoppingCart(x.data.items)));
    
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId!, product.key)
    item$.pipe(take(1)).subscribe(item => {
      let quantity = item.exists ? item.data.quantity + change : 0 + change;

      if(quantity === 0) item.ref.remove();
      else item.ref.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      })
    })
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId + '/items/' + productId);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async waitAndReturnCartId() {
    let cartId: any;
    while (true) {
      cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;
      await this.delay(100)
    }
  }

  private async getOrCreateCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    if (localStorage.getItem('creatingCart')) {
      return await this.waitAndReturnCartId();
    }

    localStorage.setItem('creatingCart', "true");
    let result = await this.create();
    if (result.key) localStorage.setItem('cartId', result.key);

    return result.key;

  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }
}
