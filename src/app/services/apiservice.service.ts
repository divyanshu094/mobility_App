import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  serverUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  requestViaGet(method:any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.serverUrl + method)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  requestViaPost(method:any, data:any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.serverUrl + method, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  requestViaPatch(method:any, data:any) {
    return new Promise((resolve, reject) => {
      this.http.patch(this.serverUrl + method, data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  requestViaDelete(method: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverUrl + method)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
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
