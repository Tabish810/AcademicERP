import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
// Import RxJs required methods
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService} from 'ngx-spinner';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient, router: Router, private spinner: NgxSpinnerService) { }

  post(url, data) {
    debugger;
    // this.spinner.show();
    return (
      this.http
        .post(API_URL + url, data)
        .pipe(map(res => {
            // this.spinner.hide();
            return res;
        })
          // ...errors if any

          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }

  get(url) {
    // this.spinner.show();
    return (
      this.http
        .get(API_URL + url)
        .pipe(map(res => {
          // this.spinner.hide();
          return res;
        })
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }
  getid(url) {
    // this.spinner.show();
    return (
      this.http
        .get(API_URL + url)
        .pipe(map(res => {
          // this.spinner.hide();
          return res;
        })
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }
  put(url, data) {
    // this.spinner.show();
    return (
      this.http
        .put(API_URL + url, data)
        .pipe(map(res => {
          // this.spinner.hide();
          return res;
        })
          // ...errors if any
          , catchError((error: any) => throwError(this.showErrorSnackBar(error)))
        ));
  }

  delete(url, data) {
    // this.spinner.show();
    return (
      this.http
        .delete(API_URL + url, data)
        .pipe(map(res => {
          // this.spinner.hide();
          return res;
        })
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
