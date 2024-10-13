import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL } from "../tokens/api-base-url.token";

export abstract class BaseApiService {
  public abstract http: HttpClient;
  private _baseUrl = inject(API_BASE_URL);
  
  public getBaseConfiguration<T>(controller: string) : Observable<T> {
    return this.get<T>(controller, 'Configuration');
  }
  
  public updateBaseConfiguration<T>(controller: string, configuration: T) : Observable<T> {
    return this.post<T>(controller, 'Configuration', configuration);
  }

  public get<T>(controller: string, action: string | null = null, options?: {
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
    const url = `${this._baseUrl}/${controller}${action ? '/'.concat(action) : ''}`;
    return this.http.get<T>(url, options);
  }

  public post<T>(controller: string, action: string | null = null, body: unknown | null, options?: {
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
    const url = `${this._baseUrl}/${controller}${action ? '/'.concat(action) : ''}`;
    return this.http.post<T>(url, body, options);
  }
}