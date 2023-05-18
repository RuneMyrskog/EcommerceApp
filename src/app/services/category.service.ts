import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { DatabaseUtility } from './database-utility';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    // return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges())
    // return this.db.list('/categories').snapshotChanges().pipe(map(actions => {
    //   return actions.map(a => {
    //     const key = a.payload.key;
    //     const data = a.payload.val();
    //     return { data, key };
    //   })
    // }));
    let query = (ref: any) => ref.orderByChild('name')
    return DatabaseUtility.getList(this.db, '/categories', query)
  }
}
