import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService{
  serverUrl = environment.baseUrl;
  loading: any;
  constructor(private http: HttpClient, public loadingController: LoadingController) {
    this.loadingController.create({
      message: 'Please Wait',
      spinner: 'bubbles',
      mode: 'ios',
      keyboardClose: true,
      translucent: true,
    });
  }


  async showLoader() {
    // await this.loading.present();
  }

  async hideLoader() {
      // await this.loading.dismiss();
  }

  requestViaGet(method: any) {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.get(this.serverUrl + method)
        .subscribe(res => {
          this.hideLoader();
          resolve(res);
        }, (err) => {
          this.hideLoader();
          reject(err);
        });
    });
  }

  requestViaPost(method: any, data: any) {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.post(this.serverUrl + method, data)
        .subscribe(res => {
          this.hideLoader();
          resolve(res);
        }, (err) => {
          this.hideLoader();
          reject(err);
        });
    });
  }

  requestViaPatch(method: any, data: any) {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.patch(this.serverUrl + method, data)
        .subscribe(res => {
          this.hideLoader();
          resolve(res);
        }, (err) => {
          this.hideLoader();
          reject(err);
        });
    });
  }

  requestViaDelete(method: string) {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverUrl + method)
        .subscribe(res => {
          this.hideLoader();
          resolve(res);
        }, (err) => {
          this.hideLoader();
          reject(err);
        });
    });
  }

  refreshToken(token: string) {
    return this.http.post(this.serverUrl + '/api/token/refresh/', {
      refresh: token
    }, httpOptions);
  }

}
