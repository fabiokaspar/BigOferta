import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, from, fromEvent, interval, Subscription, throwError, of, Subject } from 'rxjs';
import { Oferta } from '../_models/Oferta';
import { switchMap, debounceTime, catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  public subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(
    private ofertasService: OfertasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if (termo === '')
        {
          return of([]);
        }

        return this.ofertasService.pesquisaPorOfertas(termo);
      }),
      catchError(error => {
        console.log(error)
        return throwError(error)
      })
    );

    this.ofertas.subscribe(x => console.log(x))
  }

  public pesquisaPorOfertas(termoBusca: string): void
  {
    // console.log(termoBusca);
    this.subjectPesquisa.next(termoBusca)
  }

  public limpaPesquisa(ofertaId: number): void
  {
    this.subjectPesquisa.next();
    this.router.navigate(['/oferta', ofertaId]).then()
  }

}
