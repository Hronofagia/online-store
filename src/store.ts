import { CatalogItem, CatalogSettings } from './types';

export class Store {
  readonly items: CatalogItem[];
  readonly settings: CatalogSettings;
  readonly filteredItems = [];
  setSetting: (key: keyof CatalogSettings, data: number | string) => void;
  resetSetting: (key?: keyof CatalogSettings) => void;
  setItems: (items: CatalogItem[]) => void;

  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.settings = {
      category: [],
      brand: [],
      price: [],
      stock: [],
      sortBy: [],
      cardView: [],
      search: '',
    };

    this.setItems = (items) => {
      this.items.push(...items);
    };

    this.setSetting = (key, data) => {
      console.log(key, data);
      if (key === 'search') this.settings[key] = data as string;
      else (this.settings[key] as Array<string | number>)?.push(data);
      console.log(this.settings);
    };

    this.resetSetting = (key) => {
      console.log('reset', this.settings.search);

      if (key !== undefined) {
        if (key === 'search') {
          this.settings[key] = '';
        } else {
          this.settings[key] = [];
        }
      } else {
        (Object.keys(this.settings) as Array<keyof CatalogSettings>).forEach(
          (key) => {
            if (key === 'search') this.settings[key] = '';
            else this.settings[key] = [];
          },
        );
      }
      console.log('reset2', this.settings.search);
    };
  }
}
