import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelevisionConfiguration } from '../../models/configurations/TelevisionConfiguration.interface';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { Series } from '../../models/television/Series.model';

@Injectable({
  providedIn: 'root'
})
export class TelevisionService extends BaseService {
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
