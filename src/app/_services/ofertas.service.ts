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
    let path: string = `${environment.URI_API}/ofertas`;

    if (this.authService.isLoggedIn())
    {
      path += `/user/${this.authService.getDecodedToken().nameid}`;
    }
    return this.http.get<Oferta[]>(path);
  }

  public getOfertasRestaurante(): Observable<Oferta[]>
  {
    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas?category=restaurantes`);
  }

  public getOfertasDiversao(): Observable<Oferta[]>
  {
    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas?category=diversao`);
  }

  public getOfertaDetail(id): Observable<Oferta> {
    return this.http.get<Oferta>(`${environment.URI_API}/ofertas/${id}`);
  }

  public pesquisaPorOfertas(query: string): Observable<Oferta[]>
  {
    return this.http.post<Oferta[]>(`${environment.URI_API}/ofertas/like`, query).pipe(
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
        console.log(key + " => "+ offerParams[key]);
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
    return this.http.post(`${environment.URI_API}/ofertas/update?userId=${userId}`, oferta);
  }

  
}
