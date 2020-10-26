export type PersistenceSystem = {
    save(data: string): Promise<void>;
    load(url: string): Promise<string>;
}