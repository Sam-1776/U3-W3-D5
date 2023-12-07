import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take, switchMap } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  Req!: HttpRequest<any>;

  constructor(private authSrv: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authSrv.utente$.pipe(
      take(1),
      switchMap(utente => {
        if (!utente) {
          return next.handle(request)
        } else {
          this.Req = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${utente.accessToken}`)
          });
        }
        return next.handle(this.Req)
      })
    );
  }
}
