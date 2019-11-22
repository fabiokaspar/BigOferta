import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, of, Subscription, Observable } from 'rxjs';
import { AuthService } from './../_services/auth.service';
import { CarrinhoService } from './../_services/carrinho.service';
import { ItemCarrinho } from './../_models/item-carrinho';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit, OnDestroy {
  public ordemCompra: ItemCarrinho[];
  public lastPurchase: any;
  public subjectAmountItemCart: Subject<any> = new Subject<any>();
  public subscriptionCart: Subscription;

  constructor(
    public carrinhoService: CarrinhoService,
    public authService: AuthService,
  ) { }

  ngOnInit()
  {
    console.log(this.authService.getCurrentUser())
    this.createSubjectForUpdatingCart();

    this.carrinhoService.subjectCart.subscribe(cart => {
      this.ordemCompra = cart;
    });

    this.carrinhoService.getLastPurchaseOrder().subscribe(
      data => {
        console.log(data);
        this.lastPurchase = data;
      }
    )

    console.log(this.ordemCompra)
    
  }

  ngOnDestroy()
  {
    this.subscriptionCart.unsubscribe();
  }

  private createSubjectForUpdatingCart()
  {
    let cart: Observable<any> = this.subjectAmountItemCart.pipe(
      // debounceTime(1000),
      // distinctUntilChanged(),
      switchMap((data: any) => {
        // debugger;
        if (data.amount > 0)
        {
          // debugger;
          return this.carrinhoService.adicionaItem(data.itemCarrinho, data.amount)
        }
        else if (data.amount < 0)
        {
          return this.carrinhoService.removeItem(data.itemCarrinho, Math.abs(data.amount))
        }

        return of([]);
      })
    );

    this.subscriptionCart = cart.subscribe(data => {
      console.log(data)
      this.carrinhoService.subjectCart.next(data)
    }, error => {
      console.log(error)
    });
  }

  atualizaUltimaCompra(purchase: any)
  {
    this.lastPurchase = purchase;
    // localStorage.removeItem('purchase')
    // localStorage.setItem('purchase', JSON.stringify(purchase));
    console.log("PURCHASE --------------------------> ", purchase)
  }

  public adicionaItem(item: ItemCarrinho, acao: string)
  {
    if (acao === 'inc')
    {
      this.subjectAmountItemCart.next({itemCarrinho: item, amount: 1});
    }
    else
    {
      this.subjectAmountItemCart.next({itemCarrinho: item, amount: -1});
    }
  }
  
}
