import { useContext } from 'react'
import { Stores } from "../db/initDb";
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { MainViewContext } from '../../pages/home/Main';
import { initDB } from '../db/initDb';

const dbPromise = initDB().then(() => openDB('toDoDB', 1))

export const Select = async (id) => {
    

    return('dbprom',dbPromise
        .then(function (db) {
            const store = db.transaction(Stores.toDo).objectStore(Stores.toDo);
            const result = store.getAll();
            console.log(result);
            
            return result;
        }))

}

export const Write = (values) => {
    
    
    return('dbprom',dbPromise
        .then(async (db) => {
            const store = db.transaction(Stores.toDo, 'readwrite').objectStore(Stores.toDo);
            store.openCursor(null, 'prev')
            .then((cursor) => {
                console.log('getting cursor',cursor);
                const id = cursor ? cursor.value.id + 1 : 1;
                const data = {...values, end: values.start, id: id};
                store.add({id: id, ...data})
        })
        }))
}