import { ModalOfertaComponent } from './../../oferta/modal-oferta/modal-oferta.component';
import { AuthService } from './../../_services/auth.service';
import { OfertasService } from './../../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { Oferta } from 'src/app/_models/oferta';
import { User } from 'src/app/_models/user';
import { ModalAlteraOfertaComponent } from 'src/app/oferta/modal-altera-oferta/modal-altera-oferta.component';
// import { Photo } from 'src/app/_models/photo';

@Component({
  selector: 'app-painel-ofertas',
  templateUrl: './painel-ofertas.component.html',
  styleUrls: ['./painel-ofertas.component.css']
})
export class PainelOfertasComponent implements OnInit {
  ofertasProprietarias: Oferta[];
  user: User;
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private ofertasService: OfertasService,
    private authService: AuthService,
  ) { }

  ngOnInit()
  {
    this.user = JSON.parse(localStorage.getItem('user'));;

    const userParams = {
      advertiser: this.user.userName,
      // advertiser: 'FEK',
      isAdvertiser: true
    };

    this.ofertasService.getOfertasProprietarias(userParams).subscribe(
      data => {
        this.ofertasProprietarias = data;
      }
    );
  }

  openModalNovaOferta()
  {
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ignoreBackdropClick: true
    };

    this.bsModalRef = this.modalService.show(ModalOfertaComponent, config)
  }

  openModalAlteraOferta(offer)
  {
    const config: ModalOptions = {
      backdrop: 'static',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        oferta: offer
      }
    };

    this.bsModalRef = this.modalService.show(ModalAlteraOfertaComponent, config)
  }

  removerOferta(offerId)
  {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    this.ofertasService.removeOferta(userId, offerId).subscribe(data => {
      console.log(data)
      // alert('Oferta removida com suceso!')
      const currentUrl = window.location.href;
      window.location.href = currentUrl;
    }, error => {
      alert('erro ao remover oferta')
      console.log(error)
    })
  }

}
