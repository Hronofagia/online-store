interface IObjectKeys {
  [key: string]: string | number | string[];
}
export interface CatalogItem extends IObjectKeys {
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

export interface Promocode {
  [key: string]: number;
}
