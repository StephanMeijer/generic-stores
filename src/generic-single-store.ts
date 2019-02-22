import { BehaviorSubject } from 'rxjs';

interface StoreOptions {
  storage: Storage | undefined;
  encoder: (subject: any) => string;
  decoder: (subject: string) => any;
  storageKey: BehaviorSubject<string>;
};

export abstract class GenericSingleStore<T extends object> {
  protected item: BehaviorSubject<T | undefined> = new BehaviorSubject<T | undefined>(undefined);
  protected options: StoreOptions;

  constructor(options: Partial<StoreOptions> = {} as StoreOptions) {
    const data = this.load();

    this.options = {
      storage: undefined,
      encoder: (subject: any) => JSON.stringify(subject),
      decoder: (subject: string) => JSON.parse(subject),
      ...options
    } as StoreOptions;

    this.options.storageKey.subscribe((key: string) => {
      if (key) {
        this.load(key);
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

  protected async load(key: string | undefined = undefined): Promise<void> {
    const storageKey = key || this.storageKey;

    if (this.options.storage && storageKey) {
      const data = await this.options.storage.getItem(storageKey);

      if (data) {
        const decoded = this.options.decoder(data);
        this.item.next(decoded as T);
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
