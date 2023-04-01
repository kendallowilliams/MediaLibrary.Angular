import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerConfiguration } from '../../models/configurations/PlayerConfiguration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService {
  protected _controller = 'player';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PlayerConfiguration> {
    return this.getBaseConfiguration<PlayerConfiguration>(this._controller);
  }
}
