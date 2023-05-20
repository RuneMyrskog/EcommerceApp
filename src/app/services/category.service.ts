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
   
    let query = (ref: any) => ref.orderByChild('name')
    return DatabaseUtility.getList(this.db, '/categories', query)
  }
}
