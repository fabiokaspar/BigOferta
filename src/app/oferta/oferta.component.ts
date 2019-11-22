import { AuthService } from './../_services/auth.service';
import { ItemCarrinho } from "./../_models/item-carrinho";
import { CarrinhoService } from "./../_services/carrinho.service";
import { Component, OnInit } from "@angular/core";
import { Oferta } from "../_models/oferta";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-oferta",
  templateUrl: "./oferta.component.html",
  styleUrls: ["./oferta.component.css"]
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;
  public ofertaAdicionada: boolean;

  constructor(
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Oferta) => {
      this.oferta = data['offer'];
      this.ofertaAdicionada = this.carrinhoService.cartContainsOffer(this.oferta.id);
      console.log("recebi oferta do resolver!", this.oferta);

    }, error => {
      console.log(error)
    });

  }

  public isUserAuthenticated(): boolean
  {
    return this.authService.isLoggedIn();
  }

  public criaItemCarrinho(): void {
    const item: ItemCarrinho = new ItemCarrinho(
      this.oferta.id,
      this.oferta.category,
      this.oferta.title,
      this.oferta.description,
      this.oferta.advertiser,
      this.oferta.price,
      0,
      this.oferta.photos[0].url
    );

    this.carrinhoService.adicionaItem(item, 1).subscribe();

    this.ofertaAdicionada = true;
  }

  public removeItemCarrinho()
  {
    let item: ItemCarrinho = this.carrinhoService.getItemCarrinhoFromCart(this.oferta.id);

    if (item !== undefined)
    {
      this.carrinhoService.removeItem(item, 1).subscribe();
      this.ofertaAdicionada = false;
    }
  }
}
