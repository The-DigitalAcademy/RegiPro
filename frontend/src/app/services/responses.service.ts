import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { answers } from '../interfaces/questions';
import { toSignal } from '@angular/core/rxjs-interop'


const Res_API = 'http://localhost:5000/responses';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http: HttpClient) { }

  response(name: string, industry: string, description: string, isRegistered: string, hasBusinessPlan: string) : Observable<any>{
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

    return this.http.get<answers[]>( `${Res_API}`,  httpOptions);
  }

  public businesses = toSignal<answers[]>(this.getResponses());

}
