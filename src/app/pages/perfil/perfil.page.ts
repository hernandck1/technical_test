import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { MockDataService } from '../../services/mock-data.service';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { ListWithSearchPage } from 'src/app/popovers/list-with-search/list-with-search.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Pica from 'pica';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  dataUser: any = [];
  conexion: any;
  timezones: { name: string; }[];
  languages: any = ['es-ES', 'en-US', 'fr-FR'];
  customAlertOptions = { header: 'Seleccione opción:' }
  private pica: Pica;

  constructor(
    private utils: UtilsService,
    private mockDataService: MockDataService,
    public popoverCtrl: PopoverController,
    public actionSheetCtrl: ActionSheetController,
  ) { }

  async ngOnInit() {
    await this.utils.startLoading();
    this.pica = Pica();

    this.utils.dataTimesZones().then(data => {
      this.timezones = data;
    });

    this.conexion = this.mockDataService.getUserData().subscribe(async resp => {
      await this.utils.delay(3);
      this.dataUser = resp;
      this.utils.stopLoading();
    });
  }

  async changeImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Seleccione el origen de la imagen',
      mode: 'ios',
      buttons: [
        {
          text: 'Camara fotografica',
          data: {
            action: CameraSource.Camera,
          },
        },
        {
          text: 'Galeria de imagenes',
          data: {
            action: CameraSource.Photos,
          },
        },
        {
          text: 'Cancelar',
          role: 'destructive',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
    actionSheet.addEventListener('ionActionSheetDidDismiss', async (ev: any) => {
      if (ev.detail.data.action !== 'cancel') {
        this.actionTakePhoto(ev.detail.data.action);
      }
    });
  }

  async actionTakePhoto(origenImg) {
    const image = await Camera.getPhoto({
      quality: 95,
      resultType: CameraResultType.Base64,
      source: origenImg,
      correctOrientation: true,
    });
    if (image) {
      const imgElement = new Image();
      imgElement.src = 'data:image/jpeg;base64,' + image.base64String;

      imgElement.onload = async () => {
        const cropSize = Math.min(imgElement.width, imgElement.height);
        const startX = (imgElement.width - cropSize) / 2;
        const startY = (imgElement.height - cropSize) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = cropSize;
        canvas.height = cropSize;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(imgElement, startX, startY, cropSize, cropSize, 0, 0, cropSize, cropSize);

        const resizedCanvas = document.createElement('canvas');
        resizedCanvas.width = 200;
        resizedCanvas.height = 200;

        await this.pica.resize(canvas, resizedCanvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2
        });

        const croppedBase64 = resizedCanvas.toDataURL();

        this.dataUser.image = croppedBase64;
        this.mockDataService.updateUserData('image', croppedBase64);
        this.utils.showSimpleAlert('Imagen de perfil<br> actualizada exitosamente');
      };
    }
  }

  async actuData() {
    if (!this.dataUser.name || !this.dataUser.lastname || !this.dataUser.email) {
      this.utils.showSimpleAlert('Por favor verifique los datos suministrados, todos los campos son obligatorios');
      return;
    }

    await this.utils.startLoading();
    for (const key in this.dataUser) {
      if (this.dataUser.hasOwnProperty(key)) {
        this.mockDataService.updateUserData(key, this.dataUser[key]);
      }
    }
    this.utils.stopLoading();
    this.utils.showSimpleAlert('Información actualizada exitosamente')
  }

  async listPopoverSearch(ev: any) {
    await this.utils.startLoading();
    await this.utils.delay(1);
    this.utils.stopLoading();
    const popover = await this.popoverCtrl.create({
      component: ListWithSearchPage,
      event: ev,
      mode: 'ios',
      translucent: false,
      cssClass: 'popoverClass',
      componentProps: {
        items: this.timezones,
      }
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data !== null) {
      this.dataUser.timezone = data.selectedItem;
    }
  }

}
