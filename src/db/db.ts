import { DATABASE_NAME, DATABASE_VERSION, TRIPS_STORE, type StoreName } from './schema'

let databasePromise: Promise<IDBDatabase> | null = null

export function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
  })
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed'))
    transaction.onabort = () => reject(transaction.error ?? new Error('IndexedDB transaction was aborted'))
  })
}

export function openDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(TRIPS_STORE)) {
        const store = database.createObjectStore(TRIPS_STORE, { keyPath: 'id' })
        store.createIndex('updatedAt', 'updatedAt')
        store.createIndex('startDate', 'startDate')
      }
    }

    request.onsuccess = () => {
      const database = request.result
      database.onversionchange = () => {
        database.close()
        databasePromise = null
      }
      resolve(database)
    }

    request.onerror = () => {
      databasePromise = null
      reject(request.error ?? new Error('Could not open the local database'))
    }

    request.onblocked = () => {
      databasePromise = null
      reject(new Error('A previous Roamune tab is blocking a database upgrade'))
    }
  })

  return databasePromise
}

export async function withStore<T>(
  storeName: StoreName,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => Promise<T>,
): Promise<T> {
  const database = await openDatabase()
  const transaction = database.transaction(storeName, mode)
  const resultPromise = operation(transaction.objectStore(storeName))
  const [result] = await Promise.all([resultPromise, transactionDone(transaction)])
  return result
}

export async function closeDatabase(): Promise<void> {
  if (!databasePromise) return
  const database = await databasePromise
  database.close()
  databasePromise = null
}

