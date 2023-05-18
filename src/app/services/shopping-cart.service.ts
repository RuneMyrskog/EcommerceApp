import { map, take } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DatabaseUtility } from './database-utility';

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

  private getCart(cartId: string) {
    // return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    //   .pipe(map(a => {
    //     const key = a.payload.key;
    //     const data = a.payload.val();
    //     return { data, key };
    //   }))

    return DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId);
    
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();

    if (!result.key) return;
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: any) {
    let cartId = await this.getOrCreateCartId();
    let item$ = DatabaseUtility.getItem(this.db, '/shopping-carts/' + cartId + '/items/' + product.key);
    item$.pipe(take(1)).subscribe(item => {
      
    })
  }


}
