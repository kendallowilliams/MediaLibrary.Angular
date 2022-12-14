import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelevisionConfiguration } from '../../models/configurations/television-configuration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class TelevisionService extends BaseService {
  protected _controller = 'television';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<TelevisionConfiguration> {
    return this.getBaseConfiguration<TelevisionConfiguration>(this._controller);
  }
}
