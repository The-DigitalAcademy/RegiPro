import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const AUTH_API = `${environment.apiBaseUrl}/auth/`

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<user> {
    return this.http.post<user>(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<user> {
    return this.http.post<user>(
      AUTH_API + 'signup',
      {
        firstname,
        lastname,
        email,
        password,
      },
      httpOptions
    );
  }


  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  resetPassword(body:any): Observable<any> {
    return this.http.put(`${AUTH_API}resetPassword`, body);
  }

  newPassword(email: any): Observable<any> {
    return this.http.post(`${AUTH_API}forgotPassword`, email);
  }

  // resetPassword(id: string, password: string, confirmPassword: string): Observable<any> {
  //   return this.http.post(`${AUTH_API}resetPassword`, { id, password, confirmPassword });
  // }
}

