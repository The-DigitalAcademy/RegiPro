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
}
