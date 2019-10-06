import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/_services/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [OfertasService]
})
export class OndeFicaComponent implements OnInit {
  public textoOndeFica: string;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTextoOndeFica();
  }

  private getTextoOndeFica(): void
  {
    const id = this.route.parent.snapshot.params['id'];
    this.ofertasService.getOndeFicaOferta(id).then((texto: string) => {
      // debugger;
      this.textoOndeFica = texto;
    });
  }
}
