import { ItemCarrinho } from './../_models/item-carrinho';
import { CarrinhoService } from './../_services/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../_services/ofertas.service';
import { Oferta } from '../_models/oferta';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;
  public headingTabSelected: string;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute,
    private router: Router,
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() 
  {
    // const id = this.route.snapshot.params['id'];
    // console.log(id)

    this.route.params.subscribe(
      (data: Params) => {
        console.log('=> ',data)
        const id = data.id;
        this.ofertasService.getOfertaDetail(id)
          .subscribe((oferta: Oferta) => {
            this.oferta = oferta;
            console.log('recebi oferta!', oferta)
          });
      },
      error => console.log(error)
    )
  }

  public adicionaItemCarrinho(): void
  {
    let item: ItemCarrinho  = new ItemCarrinho(
      this.oferta.id,
      this.oferta.titulo,
      this.oferta.descricao,
      this.oferta.anunciante,
      this.oferta.valor,
      1,
      this.oferta.imagens[0].url
    );
    
    this.carrinhoService.adicionaItem(item)
    
    console.log(this.carrinhoService.listaItens())
  }

  public removerItemCarrinho() 
  {

  }

  public onSelect(tab: TabDirective)
  {
    this.headingTabSelected = tab.id;
    console.log(tab.id)
    this.router.navigate(["/oferta/" + this.oferta.id + "/" + tab.id]);
  }

}
