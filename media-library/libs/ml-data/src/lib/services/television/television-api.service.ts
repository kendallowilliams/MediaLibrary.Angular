import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelevisionConfiguration } from '../../models/configurations/television-configuration.interface';
import { Observable, of } from 'rxjs';
import { BaseApiService } from '../base-api.service';
import { Series } from '../../models/television/Series.model';

@Injectable({
  providedIn: 'root'
})
export class TelevisionApiService extends BaseApiService {
  public _controller = 'television';

  constructor(public http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<TelevisionConfiguration> {
    return this.getBaseConfiguration<TelevisionConfiguration>(this._controller);
  }

  public updateConfiguration(configuration: TelevisionConfiguration): Observable<TelevisionConfiguration> {
    return this.updateBaseConfiguration<TelevisionConfiguration>(this._controller, configuration);
  }

  public getSeries(): Observable<Series[]> {
    return of([]);
  }
}
