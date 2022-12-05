import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseService {
  protected abstract _http: HttpClient;
  
  protected getBaseConfiguration<T>(controller: string) : Observable<T> {
    return this._http.get<T>('/api/' + controller + '/Configuration');
  }
}