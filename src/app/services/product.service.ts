import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { DatabaseUtility } from './database-utility';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product: any){
    this.db.list('/products').push(product);

  }

  getAll() {
    // return this.db.list('/products').snapshotChanges().pipe(map(actions => {
    //   return actions.map(a => {
    //     const key = a.payload.key;
    //     const data = a.payload.val();
    //     return { data, key };
    //   })
    // }));

    return DatabaseUtility.getList(this.db, '/products');
  }

  get(productId: string){
    // return this.db.object('/products/' + productId).snapshotChanges()
    // .pipe(map(a => {
    //   const key = a.payload.key;
    //   const data = a.payload.val();
    //   return { data, key };
    // }))
    return DatabaseUtility.getItem(this.db, '/products/' + productId);
  }

  update(productId: string, product: object) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
