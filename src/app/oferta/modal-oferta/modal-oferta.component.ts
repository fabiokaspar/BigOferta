import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { OfertasService } from 'src/app/_services/ofertas.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Oferta } from 'src/app/_models/oferta';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-oferta',
  templateUrl: './modal-oferta.component.html',
  styleUrls: ['./modal-oferta.component.css'],
  
})
export class ModalOfertaComponent implements OnInit {
  oferta: Oferta;
  user: User;
  urlPhotoEditor: string;
  
  constructor(
    private bsModalRef: BsModalRef,
    private ofertasService: OfertasService
  ) { }

  ngOnInit()
  {
    this.user = JSON.parse(localStorage.getItem('user'));
    // const id = this.route.snapshot.params['id'];
    this.urlPhotoEditor = `${environment.URI_API}/users/${this.user.id}/photos/addPhotoToNewOffer`;

    this.oferta = new Oferta();
    this.oferta.photos = [];
    this.oferta.advertiser = this.user.userName;
  }

  close()
  {
    this.bsModalRef.hide();
  }

  cadastrarOferta(formulario: NgForm)
  {
    console.log(formulario.value.category)
    this.oferta.category = formulario.value.category;
    
    this.bsModalRef.hide();
    const userId = JSON.parse(localStorage.getItem('user')).id;

    let observable: Observable<any>;
    const offerData: Oferta = this.oferta;
    // debugger;
    if (this.oferta.photos.length === 0)
    {
      observable = this.ofertasService.salvaOferta(userId, offerData);
    }
    else
    {
      observable = this.ofertasService.updateOferta(userId, offerData);
    }

    observable.subscribe(data => {
      console.log(data);
      this.oferta = data;
      const currentUrl = window.location.href;
      window.location.href = currentUrl;
    });

  }

  setCategory(event: string)
  {
    this.oferta.category = event;
    console.log(this.oferta)
  }

  setTwoNumberDecimal($event)
  {
    const num: number = parseFloat($event.target.value);

    $event.target.value = (num < 0 ? 0 : num).toFixed(2);
  }

}
