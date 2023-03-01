let db;
let version = 1;

export const Stores = {
  toDo: 'toDo'
}

export const initDB = () => {
  return new Promise((resolve) => {
    const request = indexedDB.open('toDoDB', 1);

    request.onupgradeneeded = () => {
        db = request.result;


        // if the data object store doesn't exist, create it
        if (!db.objectStoreNames.contains(Stores.toDo)) {
          const store = db.createObjectStore(Stores.toDo, { keyPath: 'id' });
          store.createIndex('start', 'start', { unique: false })
          console.log(Stores.toDo);
        }
        // no need to resolve here
      };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};
// //const request = IDBOpenDBRequest;
// let db;
// let version = 1;

// export class User {
//   id = "";
//   name = "";
//   email = "";
//   start = "";
// }

// export const Stores = {
//   Users: 'users'
// }

// export const initDB = () => {
//   return new Promise((resolve) => {
//     // open the connection
//     const request = indexedDB.open('myDB', 1);
//     console.log('db init',request);

//     request.onupgradeneeded = () => {
//       alert("upgraded needed")
//       db = request.result;


//       // if the data object store doesn't exist, create it
//       if (!db.objectStoreNames.contains(Stores.Users)) {
//         console.log('Creating users store');
//         const store = db.createObjectStore(Stores.Users, { keyPath: 'id' });
//         //store.createIndex('start', 'start', { unique: false })
//         console.log(Stores.Users);
//       }
//       // no need to resolve here
//     };

//     request.onsuccess = () => {
//       alert("success")
//       db = request.result;
//       version = db.version;
//       console.log('request.onsuccess - initDB', version);
//       resolve(true);
//     };

//     request.onerror = () => {
//       alert("error")
//       resolve(false);
//     };
//   });
// };