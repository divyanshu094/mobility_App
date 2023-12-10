import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError, switchMap, filter, take, finalize } from 'rxjs';
import { ApiserviceService } from './apiservice.service';
import { CommonserviceService } from './commonservice.service';
import { LoadingController } from '@ionic/angular';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  token: any;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private tokenService: CommonserviceService, private authService: ApiserviceService, public loadingCtrl: LoadingController) {
    // var token = (sessionStorage.getItem('token'));

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

    this.loadingCtrl.getTop().then(hasLoading => {
      if (!hasLoading) {
        // this.loadingCtrl.create({
        //   message: 'Please Wait',
        //   spinner: 'bubbles',
        //   mode: 'ios',
        //   keyboardClose: true,
        //   translucent: true
        // }).then(loading => loading.present());
      }
    })

    let authReq = req;
    // var token = sessionStorage.getItem('token')
    const token = this.tokenService.getToken();
    if (token != null && !authReq.url.includes('login')) {
      authReq = this.addTokenHeader(req, token);
    }
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('login') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }
      return throwError(error);
    }),
      finalize(() => {
        this.loadingCtrl.getTop().then(hasLoading => {
          if (hasLoading) {
            this.loadingCtrl.dismiss();
          }
        });
      })
    )
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.tokenService.getRefreshToken();
      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.tokenService.saveToken(token.access);
            this.refreshTokenSubject.next(token.access);

            return next.handle(this.addTokenHeader(request, token.access));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.tokenService.signOut();
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    /* for Node.js Express back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }


  // intercept(req, next) {

  //   if (sessionStorage.getItem('token') != null) {
  //     var token = sessionStorage.getItem('token')
  //     this.token = 'Bearer' + ' ' + token;

  //   }
  //   else {
  //     this.token = ''
  //   }
  //   const timeoutValueNumeric = Number(90000);

  //   let tokenizedReq = req.clone(
  //     {
  //       headers: req.headers.set('authorization', this.token)

  //     }
  //   )
  //   return next.handle(tokenizedReq).pipe(timeout(timeoutValueNumeric));
  // }

}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
];
