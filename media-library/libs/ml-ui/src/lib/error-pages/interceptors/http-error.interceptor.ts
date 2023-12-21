import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpErrorIntercepter implements HttpInterceptor {
  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req)
      .pipe(catchError((response: HttpErrorResponse) => {let errorMsg = '';
        if (response.error instanceof ErrorEvent) {
          /** Scripts/File Errors */
          errorMsg = `Error: ${response.error.message}`;
        } else {
          /** Server Errors */
          errorMsg = `Error Code: ${response.status},  Message: ${response.message}`;
        }
        return throwError(() => errorMsg);
      }));
  }
  
}