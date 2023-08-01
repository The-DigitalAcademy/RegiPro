import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:5000/ai/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {


  constructor(private http: HttpClient) {}

  login(animal: string): Observable<any> {
    return this.http.post(
      apiUrl + 'generate',
      {
        animal
      },
      httpOptions
    );
  }

}
