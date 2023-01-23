import { ToastService } from './../../services/toast.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Coupon } from './../../models/coupon';
import { CouponService } from './../../services/coupon.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {

  // Cupones
  public coupons: Coupon[];
  // Mostrar camara del QR
  public showCamera: boolean;

  constructor(
    private couponsService: CouponService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertController: AlertController,
    private toastService: ToastService
  ) {
    this.coupons = [];
    this.showCamera = false;
  }

  ngOnInit() {
    // Recogemos los cupones
    this.couponsService.getCoupons().then(coupons => {

      // Recorro los cupones e instancio los objetos
      coupons.forEach(c => {
        const obj: Coupon = new Coupon(c);
        this.coupons.push(obj);
      });
      console.log(this.coupons);
    })
  }

  goToCard() {
    // Filtramos los cupones
    this.navParams.data.coupons = this.coupons.filter(c => c.active);
    this.navCtrl.navigateForward("card");
  }

  closeCamera(){
    this.showCamera = false;
    BarcodeScanner.stopScan();
  }

  async startCamera(){
    
    // Obtenemos los permisos
    const status = await BarcodeScanner.checkPermission();
    
    console.log("STATUS: ", JSON.stringify(status));
    
    // si no tiene permisos, lo pedimos
    if(!status.granted){
      const alert = await this.alertController.create({
        header: '',
        message: 'No tienes permisos para usar la cámara, ¿Quieres abrir las opciones de la aplicación para dar permisos?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          }, {
            text: 'OK',
            handler: () => {
              BarcodeScanner.openAppSettings();
            }
          }
        ]
      });
  
      await alert.present();
    }else{

      this.showCamera = true;

      // empezamos a escanear
      const result = await BarcodeScanner.startScan();

      console.log("has content: ", result.hasContent);
      
      // si detecta contenido
      if(result.hasContent){

        // obtengo el cupon
        console.log("Content QR: ", result.content);
        let coupon: Coupon = new Coupon(JSON.parse(result.content));
        
        console.log("Coupon: ", coupon.name, coupon.id_product, coupon.discount, coupon.active);
        
        // si es valido y el cupon es valido
        if(result.content && coupon && coupon.isValid()){
          this.coupons.push(coupon);
          this.toastService.showToast("QR escaneado correctamente");
        }else {
          this.toastService.showToast("QR error");
        }
      }

      // Cerramos la camara
      this.closeCamera();

    }

  }

}
