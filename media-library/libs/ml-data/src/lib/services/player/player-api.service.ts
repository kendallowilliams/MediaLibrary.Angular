import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerConfiguration } from '../../models/configurations/player-configuration.interface';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api.service';
import { getMediaPagesEnumString } from '../../enums/enum-functions';
import { MediaPages } from '../../enums/enums';

@Injectable({
  providedIn: 'root'
})
export class PlayerApiService extends BaseApiService {
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

  public getFileUrl(type: MediaPages, id: number) : string {
    return `${this.getBaseUrl()}/${getMediaPagesEnumString(type)}/File/${id}`;
  }
}
