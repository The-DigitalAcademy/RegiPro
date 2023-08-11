import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Res_API = 'http://localhost:5001/responses';

@Injectable({
  providedIn: 'root'
})
export class ResponsesService {

  constructor(private http: HttpClient) { }

  response(data: any) : Observable<any>{

    return this.http.post<any>(Res_API,data);
  }

  // Example method for making an authenticated GET request
  getAuthenticatedData(): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Assuming you store the token in local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${Res_API}/protected-route`, { headers });
  }
}
