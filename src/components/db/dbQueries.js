import { useContext } from 'react'
import { Stores } from "../db/initDb";
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { mainContext } from '../../pages/home/Main';
import { initDB } from '../db/initDb';
import { format } from 'date-fns';

const dbPromise = initDB().then(() => openDB('toDoDB', 1))

export const getRecords = (id) => {
    let result;
    return('dbprom',dbPromise
        .then(function (db) {
            const store = db.transaction(Stores.toDo).objectStore(Stores.toDo);
            if(id) {
                result = store.get(id)
            } else {
                result = store.getAll();
            }
            return result;
        }))

}

export const findByDate = async (date) => {
            // const store = db.transaction(Stores.toDo).objectStore(Stores.toDo);
            // const index = store.index('start');
            return('dbprom',dbPromise
            .then(async (db) => {
                // const date = IDBKeyRange.only(format(new Date(), 'dd/MM/yyyy'));
                if (!date) {const date = IDBKeyRange.only(new Date())};
                const store = db.transaction(Stores.toDo, 'readwrite').objectStore(Stores.toDo);
                console.log('separation')
                const index = store.index('start', 'next');
                let cursor = await index.openCursor(date);
                let result = [];
                while (cursor) {
                    result.push([cursor.key, cursor.value])
                    cursor = await cursor.continue();
                }
                return result;
            })
            )
    }

export const Write = (values) => {
    
    
    return('dbprom',dbPromise
        .then(async (db) => {
            const store = db.transaction(Stores.toDo, 'readwrite').objectStore(Stores.toDo);
            store.openCursor(null, 'prev')
            .then((cursor) => {
                
                const id = cursor ? cursor.value.id + 1 : 1;
                //const start = format(values.start, 'dd/MM/yyyy');
                const data = {title: values.title, start: values.start, end: values.end, id: id};
                store.add({id: id, ...data})
        })
        }))
}