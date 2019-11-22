import { AuthService } from 'src/app/_services/auth.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ItemCarrinho } from './../_models/item-carrinho';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  // private carrinho: ItemCarrinho[];
  private totalPrice = 0;

  public subjectCart: BehaviorSubject<ItemCarrinho[]> =
    new BehaviorSubject<ItemCarrinho[]>([]);

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public loadCartFromStorage()
  {
    if (this.authService.isLoggedIn())
    {
      const id = this.authService.getDecodedToken().nameid;
      this.httpClient
        .get<ItemCarrinho[]>(`${environment.URI_API}/users/${id}/cart`)
        .pipe(
          map((cart: ItemCarrinho[]) => {
            return cart;
          }),
        ).subscribe((cart: ItemCarrinho[]) => {
          // this.carrinho = cart;
          this.totalPrice = 0;

          cart.forEach((item: ItemCarrinho) => {
            this.totalPrice += item.price * item.amount;
          });

          this.subjectCart.next(cart);
        });
    }
  }

  public adicionaItem(item: ItemCarrinho, amount: number)
  {
    const id: number = this.authService.getDecodedToken().nameid;

    const url = `${environment.URI_API}/users/${id}/addtocart`;
    const finalAmount = item.amount + amount;

    const body = {
      amount: finalAmount,
      userId: id,
      offerId: item.offerId
    };

    // debugger;

    return this.submitRequestItemCarrinho(url, body).pipe(
      map(response => {
        console.log(response);
        this.totalPrice += item.price * amount;

        return response;
      })
    );
  }

  public removeItem(item: ItemCarrinho, amount: number)
  {
    const id = this.authService.getDecodedToken().nameid;

    const url = `${environment.URI_API}/users/${id}/removefromcart`;
    // amount = (amount > item.amount) ? item.amount : amount;

    const finalAmount = item.amount - ((amount > item.amount) ? item.amount : amount);

    const body = {
      amount: finalAmount,
      userId: id,
      offerId: item.offerId
    };

    return this.submitRequestItemCarrinho(url, body).pipe(
      map(response => {
        console.log(response);
        this.totalPrice -= item.price * amount;

        return response;
      })
    );
  }

  private submitRequestItemCarrinho(url: string, body: any)
  {
    return this.httpClient.post(url, body).pipe(
      map((response: any) => {
        console.log(response);
        if (response.status === undefined)
        {
          this.subjectCart.next(response);
        }

        return response;
      }),
      catchError(error => {
        console.log(error);
        return throwError(error)
      })
    );
  }

  public getLastPurchaseOrder(): Observable<any>
  {
    const userId = this.authService.getDecodedToken().nameid;

    const URL = `${environment.URI_API}/users/${userId}/lastPurchase`;

    return this.httpClient.get(URL).pipe(
      map(purchase => purchase),
      catchError(error => throwError(error))
    );
  }

  public carrinhoEstaVazio()
  {
    let isEmpty: boolean = false;

    this.subjectCart.subscribe(cart => {
      isEmpty = cart.length === 0;
    });

    return isEmpty;
  }

  public getPrecoTotal()
  {
    return this.totalPrice;
  }

  public esvaziaCarrinho(): void
  {
    this.totalPrice = 0;
    this.subjectCart.next([]);
  }

  public cartContainsOffer(offerId): boolean
  {
    let itemProcurado: ItemCarrinho;

    this.subjectCart.subscribe(cart => {
      itemProcurado = cart.find(item => item.offerId === offerId);
    });

    return itemProcurado !== undefined;
  }

  public getItemCarrinhoFromCart(itemId): ItemCarrinho
  {
    let itemProcurado: ItemCarrinho;

    this.subjectCart.subscribe(cart => {
      itemProcurado = cart.find(item => item.offerId === itemId);
    });

    return itemProcurado;
  }

  public confirmaOrdemCompra(userId): Observable<any>
  {
    // let data: any;

    const URL = `${environment.URI_API}/users/${userId}/confirmPurchase`;
    // this.subjectCart.subscribe(response => {
    //   data = response;
    // });

    return this.httpClient.get(URL);
  }

}


