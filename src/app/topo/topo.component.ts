import { CarrinhoService } from './../_services/carrinho.service';
import { AuthService } from './../_services/auth.service';
import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError, of, Subject } from 'rxjs';
import { Oferta } from '../_models/oferta';
import { switchMap, debounceTime, catchError,distinctUntilChanged } from 'rxjs/operators';
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
    public ofertasService: OfertasService,
    public authService: AuthService,
    public carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.carrinhoService.loadCartFromStorage();
    }

    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        console.log('***' + termo + '***');
        if (termo === '') {
          return of([]);
        }

        return this.ofertasService.pesquisaPorOfertas(termo);
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );

    this.ofertas.subscribe(x => console.log(x));
  }

  criarOferta()
  {
    
  }

  getUsername() {
    const username = JSON.parse(localStorage.getItem('user')).userName;
    return username;
  }

  public pesquisaPorOfertas(termoBusca: string): void {
    // console.log(termoBusca);
    this.subjectPesquisa.next(termoBusca.trim());
  }

  public limpaPesquisa(ofertaId: number): void {
    this.subjectPesquisa.next();
    this.router.navigate(['/oferta', ofertaId]).then();
  }

  public logout() {
    this.authService.logout();
    this.carrinhoService.esvaziaCarrinho();
  }
}
