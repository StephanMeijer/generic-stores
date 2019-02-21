import { BehaviorSubject } from 'rxjs';
interface StoreOptions {
    storage: Storage | undefined;
    encoder: (subject: any) => string;
    decoder: (subject: string) => any;
    storageKey: BehaviorSubject<string>;
}
export declare abstract class GenericSingleStore<T extends object> {
    protected item: BehaviorSubject<T | undefined>;
    protected classObject: any;
    protected options: StoreOptions;
    constructor(classObject: any, options?: Partial<StoreOptions>);
    get(): BehaviorSubject<T | undefined>;
    set(item: T): Promise<void>;
    updateProperties(properties: Partial<T>): void;
    protected load(key?: string | undefined): Promise<void>;
    protected save(item: T): Promise<void>;
}
export {};
