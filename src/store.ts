import { CatalogItem, CatalogSettings } from './types';

export enum SortTypes {
  Popular = 'mostPopular',
  Unpopular = 'lessPopular',
  Cheap = 'maxMinPrice',
  Expensive = 'minMaxPrice',
}

export enum CatalogView {
  card = 'card_product',
  list = 'list_product',
}
export class Store {
  readonly items: CatalogItem[];
  readonly settings: CatalogSettings;
  filteredItems: CatalogItem[];
  cardView: CatalogView;
  setSetting: (key: keyof CatalogSettings, data: number | string) => void;
  setView: (type: CatalogView) => void;
  resetSetting: (key?: keyof CatalogSettings) => void;
  setItems: (items: CatalogItem[]) => void;
  sortItems: () => void;
  filterItems: () => void;
  resetCategoryFIlterValue: (value: string) => void;
  resetBrandFIlterValue: (value: string) => void;
  setPrice: (key: 'min' | 'max', value: string) => void;
  setStock: (key: 'min' | 'max', value: string) => void;
  // searchProduct: () => void;

  constructor() {
    this.items = [];
    this.filteredItems = [];
    this.cardView = CatalogView.card;
    this.settings = {
      category: [],
      brand: [],
      price: { min: '15', max: '2271' },
      stock: { min: '1', max: '28' },
      sortBy: SortTypes.Popular,
      search: '',
    };

    this.setItems = (items) => {
      this.items.push(...items);
      this.filterItems();
    };

    this.sortItems = () => {
      if (this.settings.sortBy === SortTypes.Popular)
        this.filteredItems = this.filteredItems.sort(
          (a, b) => a.rating - b.rating,
        );
    };

    this.filterItems = () => {
      let temporaryItems: CatalogItem[] = this.items;
      if (this.settings.category.length > 0) {
        temporaryItems = temporaryItems.filter((el) => {
          const filters = this.settings.category;
          return filters.includes(el.category);
        });
      }
      if (this.settings.brand.length > 0) {
        temporaryItems = temporaryItems.filter((el) => {
          const filters = this.settings.brand;
          return filters.includes(el.brand);
        });
      }
      temporaryItems = temporaryItems.filter((el) => {
        const min = this.settings.price.min;
        const max = this.settings.price.max;
        return +min <= el.price && el.price <= +max;
      });
      temporaryItems = temporaryItems.filter((el) => {
        const min = this.settings.stock.min;
        const max = this.settings.stock.max;
        return +min <= el.stock && el.stock <= +max;
      });

      this.filteredItems = temporaryItems;
    };

    this.setSetting = (key, data) => {
      if (key === 'search' || key === 'sortBy')
        this.settings[key] = data as string;
      else (this.settings[key] as Array<string | number>)?.push(data);
      this.sortItems();
      this.filterItems();
    };

    this.setPrice = (key, value) => {
      this.settings.price[key] = value;
      this.filterItems();
    };

    this.setStock = (key, value) => {
      this.settings.stock[key] = value;
      this.filterItems();
    };

    this.setView = (type) => {
      this.cardView = type;
    };

    this.resetSetting = (key) => {
      if (key !== undefined) {
        if (key === 'search') {
          this.settings[key] = '';
        } else if (key === 'price') {
          this.settings[key] = { min: '15', max: '2271' };
        } else if (key === 'stock') {
          this.settings[key] = { min: '1', max: '28' };
        } else if (key === 'sortBy') {
          this.settings[key] = SortTypes.Popular;
        } else {
          this.settings[key] = [];
        }
      } else {
        (Object.keys(this.settings) as Array<keyof CatalogSettings>).forEach(
          (key) => {
            if (key === 'search') this.settings[key] = '';
            else if (key === 'sortBy') this.settings[key] = SortTypes.Popular;
            else if (key === 'price')
              this.settings[key] = { min: '15', max: '2271' };
            else if (key === 'stock')
              this.settings[key] = { min: '1', max: '28' };
            else this.settings[key] = [];
          },
        );
      }
      this.filterItems();
    };

    this.resetCategoryFIlterValue = (value: string) => {
      this.settings.category = this.settings.category.filter(
        (el) => el !== value,
      );
      this.filterItems();
    };

    this.resetBrandFIlterValue = (value: string) => {
      this.settings.brand = this.settings.brand.filter((el) => el !== value);
      this.filterItems();
    };
  }
}
