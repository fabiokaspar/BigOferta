import { AuthService } from './../_services/auth.service';
import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, from, fromEvent, interval, Subscription, throwError, of, Subject } from 'rxjs';
import { Oferta } from '../_models/oferta';
import { switchMap, debounceTime, catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

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
    public ofertasService: OfertasService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        console.log('***'+ termo+"***")
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

  getUsername()
  {
    const username = JSON.parse(localStorage.getItem('user')).username;
    return username;
  }

  public pesquisaPorOfertas(termoBusca: string): void
  {
    // console.log(termoBusca);
    this.subjectPesquisa.next(termoBusca.trim())
  }

  public limpaPesquisa(ofertaId: number): void
  {
    this.subjectPesquisa.next();
    this.router.navigate(['/oferta', ofertaId]).then()
  }

  public logout()
  {
    this.authService.logout()
  }

}
