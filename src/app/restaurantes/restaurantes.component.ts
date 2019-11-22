import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Oferta } from '../_models/oferta';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {
  public ofertas: Oferta[];
  // public data: Date = new Date(2019, 8, 30);

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.getOfertas();
  }

  private getOfertas(): void {
    this.ofertasService.getOfertasRestaurante()
      .subscribe((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      });
  }
}
