import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  signUp(registerObj: User):Observable<any> {
    return this.http.post<User>(`${baseUrl}`, registerObj)
  }

  signIn(loginObj: User) {
    return this.http.post<User>(`${baseUrl}`, loginObj)
  }

}
