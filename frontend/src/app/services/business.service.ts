import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';

const apiUrl = `${environment.apiBaseUrl}/business`;

@Injectable({
  providedIn: 'root',
})
export class BusinessPlanService {
  constructor(private http: HttpClient) {}

  business(url: string): Observable<any> {
    console.log('Request URL:', url);

    const token = localStorage.getItem('accessToken'); // Get token from local storage
    const headersConfig: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }
    console.log('Headers:', headersConfig)

    const httpOptions = {
      headers: new HttpHeaders(headersConfig),
    };
    return this.http.post(apiUrl, { url }, httpOptions);
  }

  getBusinesses(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    const headersConfig: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig),
    };

    return this.http.get(`${apiUrl}`, httpOptions);
  }

  getBusinessById(id: number): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    const headersConfig: any = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig),
    };

    return this.http.get(`${apiUrl}/${id}`, httpOptions);
  }

  public businesses = toSignal(this.getBusinesses());
}
