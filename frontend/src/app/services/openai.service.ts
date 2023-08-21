import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const apiUrl =`${environment.apiBaseUrl}/ai/`;


const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  constructor(private http: HttpClient) {}

  generate(
    name: string,
    industry: string,
    description: string
  ): Observable<any> {
    return this.http.post(
      apiUrl + 'generate',
      {
        name,
        industry,
        description,
      },
      httpOptions
    );
  }
}
