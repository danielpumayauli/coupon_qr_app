import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor() {}

  /**
   * Recoge los cupones del json
   */
  getCoupons() {
    return fetch('./assets/data/data.json').then((res) =>
      Promise.resolve(res.json())
    );
  }
}
