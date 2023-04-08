import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class BaseService {
  protected abstract _http: HttpClient;
  
  protected getBaseConfiguration<T>(controller: string) : Observable<T> {
    return this.get<T>(controller, 'Configuration');
  }
  
  protected updateBaseConfiguration<T>(controller: string, configuration: T) : Observable<T> {
    return this.post<T>(controller, 'Configuration', configuration);
  }

  protected get<T>(controller: string, action: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    }) : Observable<T> {
    return this._http.get<T>(`/api/${controller}/${action}`, options);
  }

  protected post<T>(controller: string, action: string, body: unknown | null, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    }) : Observable<T> {
    return this._http.post<T>(`/api/${controller}/${action}`, body, options);
  }
}