import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Oferta } from '../_models/Oferta';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {
  public ofertas: Oferta[];
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.getOfertas();
  }

  private getOfertas(): void {
    this.ofertasService.getOfertasRestaurante()
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      });
  }
}
