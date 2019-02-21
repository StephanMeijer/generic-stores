import { BehaviorSubject } from 'rxjs';

interface StoreOptions {
  storage: Storage | undefined;
  encoder: (subject: any) => string;
  decoder: (subject: string) => any;
  storageKey: BehaviorSubject<string>;
};

export abstract class GenericSingleStore<T extends object> {
  protected item: BehaviorSubject<T> = new BehaviorSubject<T>(undefined);
  protected classObject: any;
  protected storage: Storage;
  protected options: StoreOptions;

  constructor(classObject, options: Partial<StoreOptions> = {} as StoreOptions) {
    this.classObject = classObject;

    this.options = { storage: undefined, ...options } as StoreOptions;

    this.options.storageKey.subscribe((key: string) => {
      this.load(key);
    });
  }

  public get(): BehaviorSubject<T> {
    return this.item;
  }

  public async set(item: T): Promise<any> {
    this.item.next(item);
    await this.save(item);
  }

  public updateProperties(properties: Partial<T>) {
    this.set(new this.classObject({ ...this.item.value as object, ...properties }));
  }

  protected async load(key: string = undefined): Promise<void> {
    if (this.options.storage) {
      if (!key) {
        key = this.options.storageKey.value;
      }

      const data = await this.options.storage.getItem(key);
      this.item.next(this.options.decoder(data) as T);
    }

    return Promise.resolve();
  }

  protected async save(item: T): Promise<void> {
    if (this.options.storage) {
      const data = this.options.encoder(item);
      await this.options.storage.setItem(this.options.storageKey.value, data);
    }

    return Promise.resolve();
  }
}
