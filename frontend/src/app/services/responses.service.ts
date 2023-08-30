import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { answers } from '../interfaces/questions';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

// API base URL from environment
const Res_API = `${environment.apiBaseUrl}/responses`;

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http: HttpClient) { }

  // Function to submit a response
  response(name: string, industry: string, description: string, isRegistered: string, hasBusinessPlan: string, businessPlanUrl: string): Observable<any> {
    const token = sessionStorage.getItem('accessToken'); // Get token from session storage

    // Set headers for the HTTP request
    const headersConfig: any = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig)
    };

    // Perform the POST request with the provided data
    return this.http.post<answers>(Res_API, { name, industry, description, isRegistered, hasBusinessPlan, businessPlanUrl }, httpOptions);
  }

  // Function to get all responses
  getResponses(): Observable<answers[]> {
    const token = sessionStorage.getItem('accessToken'); // Get token from session storage

    // Set headers for the HTTP request
    const headersConfig: any = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig)
    };

    // Perform the GET request to fetch all responses
    return this.http.get<answers[]>(Res_API, httpOptions);
  }

  // Function to get a response by ID
  getResponseById(id: number): Observable<answers> {
    const token = sessionStorage.getItem('accessToken'); // Get token from local storage

    // Set headers for the HTTP request
    const headersConfig: any = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headersConfig['x-access-token'] = token;
    }

    const httpOptions = {
      headers: new HttpHeaders(headersConfig)
    };

    // Perform the GET request to fetch a response by ID
    return this.http.get<answers>(`${Res_API}/${id}`, httpOptions);
  }

  // Create a signal for businesses using getResponses()
  public businesses = toSignal<answers[]>(this.getResponses());
}
