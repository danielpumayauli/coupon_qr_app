export class Coupon {
  id_product: string;
  img: string;
  name: string;
  discount: number;
  active: boolean = false;

  constructor(data) {
    this.id_product = data.id_product;
    this.img = data.img;
    this.name = data.name;
    this.discount = data.discount;
  }

  isValid() {
    return this.id_product && this.img && this.name && this.discount;
  }
}
