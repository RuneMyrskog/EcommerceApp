import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DatabaseUtility {

    constructor(){

    }

    private static itemFromPayload(item: SnapshotAction<unknown>) {
        const key= item.payload.key;
        const ref = item.payload.ref;
        const exists = item.payload.exists();
        const data: any = item.payload.val();
        return { data, key, exists, ref };
    }

    public static getItem(db: AngularFireDatabase, path: string): Observable<any> {
        return db.object(path).snapshotChanges()
            .pipe(map(
                    a => this.itemFromPayload(a)
                )
            )
    }

    public static getList(db: AngularFireDatabase, path: string, query?: any): Observable<any> {
        let list = query ? db.list(path, query)  : db.list(path)

        return list.snapshotChanges()
            .pipe(map(actions => 
                actions.map(a => this.itemFromPayload(a))
        ));
    }

}