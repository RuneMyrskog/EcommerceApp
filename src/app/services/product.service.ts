import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }


  create(product: any){
    this.db.list('/products').push(product);

  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const key = a.payload.key;
        const data = a.payload.val();
        return { data, key };
      })
    }));
  }

  get(productId: string){
    return this.db.object('/products/' + productId).snapshotChanges()
    .pipe(map(a => {
      const key = a.payload.key;
      const data = a.payload.val();
      return { data, key };
    }))
  }
}
