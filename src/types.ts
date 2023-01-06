export interface CatalogItem {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface CatalogSettings {
  category: string[];
  brand: string[];
  price: { min: number; max: number };
  stock: { min: number; max: number };
  sortBy: string;
  search: string;
  cardView: string[];
}

export interface Store {
  items: CatalogItem[];
  settings: CatalogSettings;
  setSetting: (key: keyof CatalogSettings, data: number | string) => void;
}
