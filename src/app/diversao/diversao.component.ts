import { Component, OnInit } from '@angular/core';
import { Oferta } from '../_models/oferta';
import { OfertasService } from '../_services/ofertas.service';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers: [OfertasService]
})
export class DiversaoComponent implements OnInit {

  public ofertas: Oferta[];
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.getOfertas();
  }

  private getOfertas(): void {
    this.ofertasService.getOfertasDiversao()
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
      });
  }

}
