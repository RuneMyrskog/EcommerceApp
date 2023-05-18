import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatabaseUtility {

    constructor(){

    }

    private static itemFromPayload(item: SnapshotAction<unknown>) {
        const key = item.payload.key;
        const exists = item.payload.exists();
        const data = item.payload.val();
        return { data, key, exists };
    }

    public static getItem(db: AngularFireDatabase, path: string){
        return db.object(path).snapshotChanges()
            .pipe(map(
                    a => this.itemFromPayload(a)
                )
            )
    }

    public static getList(db: AngularFireDatabase, path: string, query?: any){
        let list = query ? db.list(path, query)  : db.list(path)
        
        return list.snapshotChanges()
            .pipe(map(actions => 
                actions.map(a => this.itemFromPayload(a))
        ));
    }

}