import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public hasMouse() : boolean {
    return window.matchMedia('(pointer:fine)').matches;
  }

  public isMobile() : boolean {
    return !this.hasMouse();
  }
}
