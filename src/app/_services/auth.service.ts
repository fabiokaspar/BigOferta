import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public URI: string = environment.URI_API;
  public decodedToken: string;
  public currentUser: User;
  
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  register(user: User): Observable<any>
  {
    return this.http.post(`${this.URI}/auth/register`, user);
  }

  login(user: User)
  {
    return this.http.post(`${this.URI}/auth/login`, user).pipe(
      map((data: any) => {
        console.log(data);
        const token = data.token;
        const user = data.user;

        this.decodedToken = this.jwtHelperService.decodeToken(token);
        this.currentUser = user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        return data;
      })
    );
  }

  getToken(): string
  {
    return localStorage.getItem('token');
  }

  isLoggedIn()
  {
    const token = localStorage.getItem('token');
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getTokenExpirationDate()
  {
    const expirationDate = this.jwtHelperService.getTokenExpirationDate(this.getToken());
    return expirationDate;
  }

  logout()
  {
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.decodedToken = '';
    this.currentUser = undefined;
  }
}
