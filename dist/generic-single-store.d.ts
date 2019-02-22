import { BehaviorSubject } from 'rxjs';
interface StoreOptions<T> {
    storage: Storage | undefined;
    encoder: (subject: T) => string;
    decoder: (subject: string) => T;
    storageKey: BehaviorSubject<string>;
    initialValue: T | undefined;
}
export declare abstract class GenericSingleStore<T extends object> {
    protected item: BehaviorSubject<T | undefined>;
    protected options: StoreOptions<T>;
    constructor(options?: Partial<StoreOptions<T>>);
    get(): BehaviorSubject<T | undefined>;
    set(item: T): Promise<void>;
    updateProperties(properties: Partial<T>): void;
    protected load(key: string | undefined, initialValue: T | undefined): Promise<void>;
    protected save(item: T): Promise<void>;
    readonly storageKey: string | undefined;
}
export {};
