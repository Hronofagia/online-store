import { CatalogItem, CatalogSettings } from './types';
import { addQueryParam } from './utils/utils';

export enum SortTypes {
  Popular = 'mostPopular',
  Unpopular = 'lessPopular',
  Cheap = 'minMaxPrice',
  Expensive = 'maxMinPrice',
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
  setSetting: (
    key: keyof Omit<CatalogSettings, 'price' | 'stock'>,
    data: number | string,
  ) => void;

  setView: (type: CatalogView) => void;
  resetSetting: (key?: keyof CatalogSettings) => void;
  setItems: (items: CatalogItem[]) => void;
  sortItems: () => void;
  filterItems: () => void;
  resetCategoryFIlterValue: (value: string) => void;
  resetBrandFIlterValue: (value: string) => void;
  setPrice: (key: 'min' | 'max', value: string) => void;
  setStock: (key: 'min' | 'max', value: string) => void;

  constructor({
    price = { min: '15', max: '2271' },
    search = '',
    category = [],
    brand = [],
    stock = { min: '1', max: '28' },
    sortBy = SortTypes.Popular,
    cardView = CatalogView.card,
  }) {
    this.items = [];
    this.filteredItems = [];
    this.cardView = cardView;
    this.settings = {
      category,
      brand,
      price,
      stock,
      sortBy,
      search,
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
      if (this.settings.sortBy === SortTypes.Unpopular)
        this.filteredItems = this.filteredItems.sort(
          (a, b) => b.rating - a.rating,
        );
      if (this.settings.sortBy === SortTypes.Cheap)
        this.filteredItems = this.filteredItems.sort(
          (a, b) => a.price - b.price,
        );
      if (this.settings.sortBy === SortTypes.Expensive)
        this.filteredItems = this.filteredItems.sort(
          (a, b) => b.price - a.price,
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

      temporaryItems = temporaryItems.filter((el) => {
        const regExp = new RegExp(
          this.settings.search !== '' ? this.settings.search : /./,
          'i',
        );

        for (const key in el) {
          if (
            (key as keyof CatalogItem) === 'thumbnail' ||
            (key as keyof CatalogItem) === 'id' ||
            (key as keyof CatalogItem) === 'images'
          ) {
            continue;
          } else {
            if (
              regExp.test(
                `${
                  el[
                    key as keyof Omit<
                      CatalogItem,
                      'thumbnail' | 'id' | 'images'
                    >
                  ]
                }`,
              )
            )
              return true;
          }
        }
        return false;
      });
      this.filteredItems = temporaryItems;
    };

    this.setSetting = (key, data) => {
      if (key === 'search' || key === 'sortBy') {
        this.settings[key] = data as string;
        addQueryParam(key, this.settings[key]);
      } else {
        (this.settings[key] as Array<string | number>)?.push(data);
        addQueryParam(key, this.settings[key].join(','));
      }
      this.sortItems();
      this.filterItems();
    };

    this.setPrice = (key, value) => {
      this.settings.price[key] = value;
      this.filterItems();
      addQueryParam(
        'price',
        `min=${this.settings.price.min}+max=${this.settings.price.max}`,
      );
    };

    this.setStock = (key, value) => {
      this.settings.stock[key] = value;
      this.filterItems();
      addQueryParam(
        'stock',
        `min=${this.settings.stock.min}+max=${this.settings.stock.max}`,
      );
    };

    this.setView = (type) => {
      this.cardView = type;
      addQueryParam('cardView', type);
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
      addQueryParam('category', this.settings.category.join(','));
      this.filterItems();
    };

    this.resetBrandFIlterValue = (value: string) => {
      this.settings.brand = this.settings.brand.filter((el) => el !== value);
      addQueryParam('brand', this.settings.brand.join(','));
      this.filterItems();
    };
  }
}
