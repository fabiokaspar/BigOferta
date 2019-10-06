import { environment } from './../../environments/environment';
import { Oferta } from '../_models/Oferta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public getOfertaDetail(id): Promise<Oferta> {
    return this.http.get(`${environment.URI_API}/ofertas/${id}`)
      .toPromise()
      .then((oferta: Oferta) => {
        console.log(oferta);
        return oferta;
      });
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

}
