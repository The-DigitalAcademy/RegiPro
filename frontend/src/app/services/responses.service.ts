import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { answers } from '../interfaces/questions';

const Res_API = 'http://localhost:5001/responses';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http: HttpClient) { }

  response(name: string, industry: string, description: string, isRegistered: boolean, hasBusinessPlan: boolean) : Observable<any>{
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    const headersConfig: any = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig)
    };
    return this.http.post<answers>(Res_API, {name, industry, description, isRegistered, hasBusinessPlan}, httpOptions);
  }

  getResponses(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    const headersConfig: any = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig)
    };

    return this.http.get<answers>( `${Res_API}`,  httpOptions);
  }

}
