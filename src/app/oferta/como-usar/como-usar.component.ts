import { OfertasService } from './../../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {
  public textoComoUsar: string;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getTextoComoUsar();
  }

  private getTextoComoUsar(): void 
  {
    const id = this.route.parent.snapshot.params['id'];
    this.ofertasService.getComoUsarOferta(id).then((texto: string) => {
      // debugger;
      this.textoComoUsar = texto;
    });
  }

}
