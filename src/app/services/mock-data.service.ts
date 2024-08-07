import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private storageKey = 'userData';
  private userData: BehaviorSubject<any>;

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.userData = this.localStorageService.watchStorage(this.storageKey);
    this.initializeUserData();
  }

  private initializeUserData(): void {
    const initialData = this.localStorageService.getItem(this.storageKey);
    if (!initialData) {
      const defaultData: any = {
        user: 'hernandck',
        pass: 'test123',
        name: 'hernan',
        lastname: 'catacoly',
        email: 'hernandck@gmail.com',
        timezone: '(UTC-5:00) Bogota',
        lan: 'es-ES',
        image: ''
      };
      this.localStorageService.setItem(this.storageKey, defaultData);
    }
  }

  getUserData(): BehaviorSubject<any> {
    return this.userData;
  }

  updateUserData(key: string, value: any): void {
    const currentData = this.localStorageService.getItem(this.storageKey);
    if (currentData && currentData.hasOwnProperty(key)) {
      currentData[key] = value;
      this.localStorageService.setItem(this.storageKey, currentData);
    }
  }

  setUserData(data: any): void {
    this.localStorageService.setItem(this.storageKey, data);
  }
}
