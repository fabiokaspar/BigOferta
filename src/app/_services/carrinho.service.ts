import { ItemCarrinho } from './../_models/item-carrinho';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinho: Array<ItemCarrinho> = [];
  private total: number = 0;

  constructor() { }
  
  public adicionaItem(itemNovo: ItemCarrinho): void
  {
    let indexItem = this.carrinho.findIndex((item: ItemCarrinho) => item.id === itemNovo.id);

    if (indexItem !== -1)
    {
      this.carrinho[indexItem].quantidade += 1;
    }
    else
    {
      this.carrinho.push(itemNovo);
    }

    this.total += itemNovo.valor;
  }

  public removeItem(itemRemovido: ItemCarrinho): void
  {
    let index = 0;

    this.carrinho.forEach((item: ItemCarrinho) => {
      if (itemRemovido.id === item.id)
      {
        item.quantidade -= 1;
        this.total -= item.valor;

        if (item.quantidade === 0)
        {
          this.carrinho.splice(index, 1);
        }

        return;
      }

      index += 1;
    });
    
  }

  public totalCarrinho(): number
  {
    return this.total;
  }

  public listaItens(): Array<ItemCarrinho>
  {
    return this.carrinho;
  }

  public carrinhoEstaVazio(): boolean
  {
    return (this.carrinho.length === 0);
  }

  public itemPresenteNoCarrinho(id: number): boolean
  {
    return this.carrinho.some((item: ItemCarrinho) => item.id === id);
  }
}
