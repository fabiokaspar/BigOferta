import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../_services/ofertas.service';
import { Oferta } from '../_models/oferta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];
  public ofertasByRow: Array<Oferta[]>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasDestaque()
      .subscribe((ofertas: Oferta[]) => {
        this.ofertas = ofertas;
        console.log(this.ofertas);
      });
  }

}
