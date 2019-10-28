import { CarrinhoService } from './../_services/carrinho.service';
import { ItemCarrinho } from './../_models/item-carrinho';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {
  public listaOrdemCompra: ItemCarrinho[];

  constructor(
    public carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.listaOrdemCompra = this.carrinhoService.listaItens();
  }

  public incrementaItem(item: ItemCarrinho): void
  {
    this.carrinhoService.adicionaItem(item);
  }

  public decrementaItem(item: ItemCarrinho): void
  {
    this.carrinhoService.removeItem(item);
  }

}
