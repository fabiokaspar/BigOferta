import { AuthService } from './auth.service';
import { Observable, throwError, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Oferta } from '../_models/oferta';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable()
export class OfertasService {
  public ofertas: Oferta[];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  public getOfertasDestaque(): Observable<Oferta[]>
  {
    let path = `${environment.URI_API}/ofertas/filter`;
    let params = new HttpParams();
    params = params.append('isHanked', 'true');

    if (this.authService.isLoggedIn())
    {
      path += `/user/${this.authService.getDecodedToken().nameid}`;
    }
    
    return this.http.get<Oferta[]>(path, { params });
  }

  public getOfertasByCategory(category: string): Observable<Oferta[]>
  {
    let path = `${environment.URI_API}/ofertas/filter`;
    let params = new HttpParams();
    params = params.append('category', category);
    // params = params.append('advertiser', '');

    if (this.authService.isLoggedIn())
    {
      path += `/user/${this.authService.getDecodedToken().nameid}`;
    }

    return this.http.get<Oferta[]>(path, { params });
  }

  public getOfertaDetail(id): Observable<Oferta> {
    return this.http.get<Oferta>(`${environment.URI_API}/ofertas/${id}`);
  }

  public pesquisaPorOfertas(query: string): Observable<Oferta[]>
  {
    let params = new HttpParams();
    params = params.append('queryFilter', query);

    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas/like`, { params }).pipe(
      retry(10)
    );
  }

  public getOfertasProprietarias(offerParams?): Observable<Oferta[]>
  {
    let params = new HttpParams();

    if (offerParams != null)
    {
      // tslint:disable-next-line: forin
      for (const key in offerParams)
      {
        // console.log(key + " => "+ offerParams[key]);
        params = params.append(key, offerParams[key]);
      }
      console.log(params)
    }

    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas/filter`, { params } ).pipe(
      map(response => {
        console.log(response)
        return response;
      }),
      catchError(error => {
        console.log(error)
        return throwError(error);
      })
    )
  }

  public salvaOferta(userId, novaOferta: Oferta): Observable<any>
  {
    return this.http.post(`${environment.URI_API}/ofertas/create?userId=${userId}`, novaOferta);
  }

  public updateOferta(userId, oferta): Observable<any>
  {
    let params = new HttpParams();
    params = params.append('userId', `${userId}`)

    return this.http.put(`${environment.URI_API}/ofertas/update`, oferta, {params});
  }

  public removeOferta(userId, offerId): Observable<any>
  {
    let params = new HttpParams();
    params = params.append('userId', `${userId}`)

    return this.http.delete(`${environment.URI_API}/ofertas/${offerId}`, {params});
  }

  public removeFoto(userId, photoId): Observable<any>
  {
    return this.http.delete(`${environment.URI_API}/users/${userId}/photos/${photoId}`);
  }

}
