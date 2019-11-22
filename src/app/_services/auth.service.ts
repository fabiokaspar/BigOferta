import { CarrinhoService } from './carrinho.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URI: string = environment.URI_API;
  private decodedToken: any;
  private currentUser: User;
  
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) { }

  register(user: User): Observable<any>
  {
    return this.http.post(`${this.URI}/auth/register`, user).pipe(
      retry(10)
    );
  }

  login(user: User)
  {
    return this.http.post(`${this.URI}/auth/login`, user).pipe(
      retry(10),
      map((data: any) => {
        console.log(data);
        const token = data.token;
        const user = data.user;

        this.decodedToken = this.jwtHelperService.decodeToken(token);
        this.currentUser = user;
        console.log(this.decodedToken);

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
    const token = this.getToken();
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getTokenExpirationDate()
  {
    const expirationDate = this.jwtHelperService.getTokenExpirationDate(this.getToken());
    return expirationDate;
  }

  getCurrentUser(): User
  {
    if (this.currentUser === undefined)
    {
      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    return this.currentUser;
  }

  setCurrentUser(user: User): void
  {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(user: User): Observable<User>
  {
    const userId = this.getDecodedToken().nameid;
    let URL = `${environment.URI_API}/auth/${userId}/update`;

    return this.http.put<User>(URL, user).pipe(
      map(data => {
        this.setCurrentUser(data);

        return data;
      })
    );
  }

  getDecodedToken(): any
  {
    if (this.decodedToken === undefined)
    {
      this.decodedToken = this.jwtHelperService.decodeToken(this.getToken());
    }

    return this.decodedToken;
  }

  logout()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('purchase');
    this.decodedToken = undefined;
    this.currentUser = undefined;
  }
}
