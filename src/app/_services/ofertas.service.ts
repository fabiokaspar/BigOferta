import { Observable, throwError, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { Oferta } from '../_models/oferta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, debounceTime, map, catchError, distinctUntilChanged, switchMap, distinct } from 'rxjs/operators';

@Injectable()
export class OfertasService {
  public ofertas: Oferta[];

  constructor(private http: HttpClient) {}

  public getOfertasDestaque(): Promise<Oferta[]>
  {
    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas?destaque=true`)
      .toPromise()
      .then((ofertas: Oferta[]) => ofertas);
  }

  public getOfertasRestaurante(): Promise<Oferta[]>
  {
    return this.http.get(`${environment.URI_API}/ofertas?categoria=restaurante`)
      .toPromise()
      .then((ofertas: Oferta[]) => ofertas);
  }

  public getOfertasDiversao(): Promise<Oferta[]>
  {
    return this.http.get(`${environment.URI_API}/ofertas?categoria=diversao`)
      .toPromise()
      .then((ofertas: Oferta[]) => ofertas);
  }

  public getOfertaDetail(id): Observable<Oferta> {
    return this.http.get<Oferta>(`${environment.URI_API}/ofertas/${id}`);
  }

  public getComoUsarOferta(id): Promise<string> {
    return this.http.get(`${environment.URI_API}/como-usar/${id}`)
      .toPromise()
      .then((response: any) => {
        console.log(response)
        return response.descricao;
      });
  }

  public getOndeFicaOferta(id): Promise<string> {
    return this.http.get(`${environment.URI_API}/onde-fica/${id}`)
      .toPromise()
      .then((response: any) => {
        console.log(response)
        return response.descricao;
      });
  }

  public pesquisaPorOfertas(query: string): Observable<Oferta[]>
  {
    return this.http.get<Oferta[]>(`${environment.URI_API}/ofertas?descricao_like=${query}`).pipe(
      retry(10)
    );
  }

}
