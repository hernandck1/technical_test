import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storageSubscriptions: Map<string, BehaviorSubject<any>> = new Map();

  constructor() { }

  private getStorageSubscription(key: string): BehaviorSubject<any> {
    if (!this.storageSubscriptions.has(key)) {
      const value = this.getItem(key);
      const subject = new BehaviorSubject<any>(value);
      this.storageSubscriptions.set(key, subject);
    }
    return this.storageSubscriptions.get(key)!;
  }

  watchStorage(key: string): BehaviorSubject<any> {
    return this.getStorageSubscription(key);
  }

  setItem(key: string, value: any): void {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
    this.getStorageSubscription(key).next(value);
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.getStorageSubscription(key).next(null);
  }

  async clear() {
    await localStorage.clear();
    this.storageSubscriptions.forEach(sub => sub.next(null));
  }
}
