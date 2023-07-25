import { Injectable } from '@angular/core';
// import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  signUp(registerObj: User):Observable<any> {
    return this.http.post<User>(`${baseUrl}/signup`, registerObj)
  }

  signIn(loginObj: User):Observable<any> {
    return this.http.post<User>(`${baseUrl}/login`, loginObj)
  }
 
}
