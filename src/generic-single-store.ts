import { BehaviorSubject } from 'rxjs';

interface StoreOptions<T> {
  storage: Storage | undefined;
  encoder: (subject: T) => string;
  decoder: (subject: string) => T;
  storageKey: BehaviorSubject<string>;
  initialValue: T | undefined;
};

export abstract class GenericSingleStore<T extends object> {
  protected item: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  protected options: StoreOptions<T>;

  constructor(options: Partial<StoreOptions<T>> = {} as StoreOptions<T>) {
    this.options = {
      storage: undefined,
      encoder: (subject: T) => JSON.stringify(subject),
      decoder: (subject: string) => JSON.parse(subject),
      initialValue: undefined,
      ...options
    } as StoreOptions<T>;

    this.options.storageKey.subscribe((key: string) => {
      if (key) {
        this.load(key, this.options.initialValue);
      }
    });
  }

  public get(): BehaviorSubject<T | undefined> {
    return this.item;
  }

  public async set(item: T): Promise<void> {
    this.item.next(item);
    await this.save(item);
  }

  public updateProperties(properties: Partial<T>) {
    this.set({ ...this.item.value as object, ...properties } as T);
  }

  protected async load(key: string | undefined, initialValue: T | undefined): Promise<void> {
    if (this.options.storage && key) {
      const data = await this.options.storage.getItem(key);

      if (data) {
        const decoded = this.options.decoder(data);
        this.item.next(decoded as T);
      } else if (initialValue !== undefined) {
        this.item.next(initialValue);
      }
    }

    return Promise.resolve();
  }

  protected async save(item: T): Promise<void> {
    if (this.options.storage && this.storageKey) {
      const data = this.options.encoder(item);
      await this.options.storage.setItem(this.storageKey, data);
    }

    return Promise.resolve();
  }

  get storageKey(): string | undefined {
    return this.options.storageKey.value;
  }
}
