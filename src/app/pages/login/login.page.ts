import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MockDataService } from 'src/app/services/mock-data.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataForm: any = [];
  userData: any = [];

  constructor(
    private menuCtrl: MenuController,
    private utils: UtilsService,
    private router: Router,
    private mockDataService: MockDataService
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async login(data) {

    if (!data.pass || !data.user) {
      this.utils.showSimpleAlert('Por favor verifique <br>los datos ingresados');
      return;
    }

    await this.utils.startLoading();
    await this.utils.delay(2);

    this.mockDataService.getUserData().subscribe(resp => {
      this.userData = resp;

      if (data.user !== this.userData.user || data.pass !== this.userData.pass) {
        this.utils.stopLoading();
        this.utils.showSimpleAlert('Por favor verifique <br>los datos ingresados');
        return;
      }

      this.utils.stopLoading();
      this.router.navigate(['home'], { replaceUrl: true });

    })

  }

}
