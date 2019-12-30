import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// Import RxJs required methods
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, router: Router) { }

  post(url, data) {
    debugger;
    return (
      this.http
        .post(API_URL + url, data)
        .pipe(map(res => res)
          // ...errors if any

          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }

  get(url) {

    return (
      this.http
        .get(API_URL + url)
        .pipe(map(res => res)
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }
  getid(url) {
    return (
      this.http
        .get(API_URL + url)
        .pipe(map(res => res)
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }
  put(url, data) {

    return (
      this.http
        .put(API_URL + url, data)
        .pipe(map(res => res)
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }

  delete(url, data) {
    return (
      this.http
        .delete(API_URL + url, data)
        .pipe(map(res => res)
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }

  showErrorSnackBar(err) {
    return err.error;
    // this.snackBar.open(err.message, 'close', {
    //   duration: 2000,

    //   extraClasses: ['error-snack-bar']
    // });
  }
}
