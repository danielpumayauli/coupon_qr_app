import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  public codeQR: string;

  constructor(private navParams: NavParams) {
    // Generamos el QR
    this.codeQR = JSON.stringify(this.navParams.data.coupons);
    console.log(this.codeQR);
  }

  ngOnInit() {}
}
