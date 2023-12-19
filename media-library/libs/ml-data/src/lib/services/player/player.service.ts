import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerConfiguration } from '../../models/configurations/PlayerConfiguration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService extends BaseService {
  public controller = 'player';

  constructor(public http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PlayerConfiguration> {
    return this.getBaseConfiguration<PlayerConfiguration>(this.controller);
  }

  public updateConfiguration(configuration: PlayerConfiguration): Observable<PlayerConfiguration> {
    return this.updateBaseConfiguration<PlayerConfiguration>(this.controller, configuration);
  }
}
