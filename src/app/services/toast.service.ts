import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  /**
   * Muestra un toast
   * @param message
   * @param duration
   */
  async showToast(message: string, duration = 5000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'top',
    });
    toast.present();
  }
}
