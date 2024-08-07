import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { UtilsService } from './services/utils.service';
import { MockDataService } from './services/mock-data.service';
import { StatusBar } from '@capacitor/status-bar';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  dataUser: any = [];
  iOSDevice: any = null;
  public pages1 = [
    { name: 'Explorer', iconUrl: 'assets/icon/folder2.svg', urlPage: 'home', available: true },
    { name: 'Documents', iconUrl: 'assets/icon/document.svg', urlPage: '', available: false },
    { name: 'Favorites', iconUrl: 'assets/icon/favorite.svg', urlPage: '', available: false },
    { name: 'About', iconUrl: 'assets/icon/about.svg', urlPage: '', available: false }
  ];

  public pages2 = [
    { name: 'Applications', iconUrl: 'assets/icon/applications.svg', urlPage: '', available: false },
    { name: 'Log out', iconUrl: 'assets/icon/logout.svg', urlPage: 'login', available: true }
  ];

  constructor(
    private plt: Platform,
    private router: Router,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private utils: UtilsService,
    private mockDataService: MockDataService
  ) {
    this.plt.ready().then(() => {
      let deviceiOSType = this.utils.deviceiOSType();
      if (deviceiOSType) StatusBar.hide();
    });

    this.iOSDevice = this.utils.deviceiOSType();
    this.mockDataService.getUserData().subscribe(resp => {
      this.dataUser = resp;
    })
  }

  async eventPage(data) {
    if (!data.available) {
      this.utils.startToast('Pagina en construcción')
    }
    else {
      if (data.urlPage == 'login') {
        this.salir();
      }
      else {
        this.router.navigate([data.urlPage]);
      }
    }
  }

  async showDataUser() {
    this.menuCtrl.toggle();
    this.router.navigate(['perfil']);
  }

  async salir() {
    const alert1 = await this.alertCtrl.create({
      cssClass: 'alertas',
      backdropDismiss: false,
      mode: 'ios',
      message: '¿Esta seguro que <br>desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Sí',
          handler: async () => {
            this.router.navigate(['login'], { replaceUrl: true });
          },
        },
      ],
    });
    await alert1.present();
  }
}
