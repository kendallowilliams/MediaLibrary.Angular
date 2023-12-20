import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

@Injectable()
export class HttpErrorIntercepter implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
      .pipe(catchError((response: HttpErrorResponse, source: Observable<HttpEvent<unknown>>) => {
        // console.log(response);
        return of((response as unknown) as HttpResponse<unknown>)
      }));
  }
  
}