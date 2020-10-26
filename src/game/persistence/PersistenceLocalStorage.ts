import { PersistenceSystem } from "./PersistenceSystem";

export namespace PersistenceLocalStorage {
    export function create(): PersistenceSystem {
        const persistenceSystem: PersistenceSystem = {
            save: (t) => Promise.resolve(),
            load: (url) => Promise.resolve('data'),
        };

        return persistenceSystem;
    }
}