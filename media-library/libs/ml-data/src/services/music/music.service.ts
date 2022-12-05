import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicConfiguration } from '../../models/configurations/music-configuration.interface';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends BaseService {
  protected _controller = 'music';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<MusicConfiguration> {
    return this.getBaseConfiguration<MusicConfiguration>(this._controller);
  }
}
