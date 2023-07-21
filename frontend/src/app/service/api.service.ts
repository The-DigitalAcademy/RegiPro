import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  
  signUp(registerObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, registerObj)
  }

  signIn(loginObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, loginObj)
  }

}
