import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../interfaces/user';

const AUTH_API = 'http://localhost:5000/auth/';

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

//   requestReset(body: any): Observable<any> {
//     return this.http.post(`${AUTH_API}/req-reset-password`, body);
//   }

//   newPassword(body: any): Observable<any> {
//     return this.http.post(`${AUTH_API}/new-password`, body);
//   }

//   ValidPasswordToken(body: any): Observable<any> {
//     return this.http.post(`${AUTH_API}/valid-password-token`, body);

//   }
}

