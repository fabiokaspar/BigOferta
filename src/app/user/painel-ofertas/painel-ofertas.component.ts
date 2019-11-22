import { AuthService } from './../../_services/auth.service';
import { OfertasService } from './../../_services/ofertas.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Oferta } from 'src/app/_models/oferta';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
// import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-painel-ofertas',
  templateUrl: './painel-ofertas.component.html',
  styleUrls: ['./painel-ofertas.component.css']
})
export class PainelOfertasComponent implements OnInit {
  modalRef: BsModalRef;
  novaOferta: Oferta;
  ofertasProprietarias: Oferta[];

  constructor(
    private modalService: BsModalService,
    private ofertasService: OfertasService,
    private authService: AuthService,
  ) { }

  ngOnInit()
  {
    const user: User = this.authService.getCurrentUser();

    const userParams = {
      // advertiser: user.userName
      advertiser: 'FEK',
      isAdvertiser: true
    };

    this.ofertasService.getOfertasProprietarias(userParams).subscribe(
      data => {
        this.ofertasProprietarias = data;
      }
    );

  }

  openModal(template: TemplateRef<any>)
  {
    this.novaOferta = new Oferta();
    this.novaOferta.photos = [];
    this.modalRef = this.modalService.show(template)
  }

  cadastrarOferta(formulario: NgForm)
  {
    this.modalRef.hide();
    const userId = JSON.parse(localStorage.getItem('user')).id;

    let observable: Observable<any>;

    // debugger;
    if (this.novaOferta.photos.length === 0)
    {
      observable = this.ofertasService.salvaOferta(userId, this.novaOferta);
    }
    else
    {
      observable = this.ofertasService.updateOferta(userId, this.novaOferta);
    }

    observable.subscribe(data => {
      console.log(data);
      this.novaOferta = data;
      const currentUrl = window.location.href;
      window.location.href = currentUrl;
    });

  }

  setCategory(event: string)
  {
    this.novaOferta.category = event;
    console.log(this.novaOferta)
  }

  setTwoNumberDecimal($event)
  {
    const num: number = parseFloat($event.target.value);

    $event.target.value = (num < 0 ? 0 : num).toFixed(2);
  }

}
