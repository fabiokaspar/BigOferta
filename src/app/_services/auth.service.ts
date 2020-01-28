import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map, retry } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Photo } from '../_models/photo';

const PHOTO_DEFAULT = '/assets/user.png';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URI: string = environment.URI_API;
  private decodedToken: any;
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);


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
        // console.log(data);
        const token = data.token;
        const user: User = data.user;
        console.log(user)

        if (user.profilePhoto === null)
        {
          user.profilePhoto = new Photo();
          user.profilePhoto.url = PHOTO_DEFAULT;
        }

        this.currentUser.next(user);
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        this.decodedToken = this.jwtHelperService.decodeToken(token);
        console.log(this.decodedToken);

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

  updateUser(user: User): Observable<User>
  {
    const userId = this.getDecodedToken().nameid;
    let URL = `${environment.URI_API}/auth/${userId}/update`;

    return this.http.put<User>(URL, user).pipe(
      map(data => {
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      })
    );
  }

  getUser(): User
  {
    return JSON.parse(localStorage.getItem('user'));
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
    localStorage.clear();
    this.decodedToken = undefined;
    // this.currentUser.next(null);
  }

  removePhoto(userId): Observable<any>
  {
    return this.http.delete(`${environment.URI_API}/users/${userId}/photos`);
  }
}
