import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../_services/ofertas.service';
import { Oferta } from '../_models/Oferta';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {
  public oferta: Oferta;
  public headingTabSelected: string;

  constructor(
    private ofertasService: OfertasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id)
    this.ofertasService.getOfertaDetail(id)
      .then((oferta: Oferta) => {
        this.oferta = oferta;
        console.log('recebi oferta!', oferta)
      });
  }

  public onSelect(tab: TabDirective)
  {
    this.headingTabSelected = tab.id;
    console.log(tab.id)
    this.router.navigate(["/oferta/" + this.oferta.id + "/" + tab.id]);
  }

}
