import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { DatabaseUtility } from './database-utility';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product: any){
    this.db.list('/products').push(product);

  }

  getAll(): Observable<Product[]> {
    return DatabaseUtility.getList(this.db, '/products')
      .pipe(map(x => x.map((p: any) => new Product(p.data, p.key))));
  }

  get(productId: string): Observable<Product>{
    return DatabaseUtility.getItem(this.db, '/products/' + productId)
    .pipe(map(x => new Product(x.data, x.key)));
  }

  update(productId: string, product: object) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
