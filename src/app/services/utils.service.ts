import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  timezones: any;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private plt: Platform
  ) { }

  async showSimpleAlert(msg) {
    const alert = await this.alertCtrl.create({
      cssClass: 'alertas',
      mode: 'ios',
      message: msg,
      backdropDismiss: false,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }


  async startLoading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'lines-sharp',
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'loaderFull',
    });
    await this.loading.present();
  }

  async stopLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  async startToast(msg = '') {
    this.toast = await this.toastCtrl.create({
      mode: 'ios',
      message: msg,
      position: 'bottom',
      duration: 3500,
      cssClass: 'toastLogin'
    });
    this.toast.present();

  }

  delay(seconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

  dataTimesZones(): Promise<Array<{ name: string }>> {
    return fetch("assets/data/timezones.json")
      .then(res => res.json())
      .then(json => {
        this.timezones = json.map((item: any) => ({ name: item.timezone }));
        return this.timezones; // Retorna los datos transformados
      });
  }

  getTimezones(): Array<{ name: string }> {
    return this.timezones;
  }

  deviceiOSType() {
    return this.plt.is('ios');
  }

}
