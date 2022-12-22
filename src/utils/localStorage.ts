export class LocalStorageUtil {
  key: string;

  constructor() {
    this.key = 'products';
  }

  getProducts(): number[] {
    const productsFromLocalStarage = localStorage.getItem(this.key);
    if (productsFromLocalStarage !== null) {
      return JSON.parse(productsFromLocalStarage);
    } else return [];
  }

  pullProducts(id: number): {} {
    let pusheProduct: boolean = false;
    const ptoducts = this.getProducts();

    const index = ptoducts.indexOf(id);
    if (index === -1) {
      ptoducts.push(id);
      pusheProduct = true;
    } else {
      ptoducts.splice(index, 1);
    }
    localStorage.setItem(this.key, JSON.stringify(ptoducts));
    return { ptoducts, pusheProduct };
  }
}
