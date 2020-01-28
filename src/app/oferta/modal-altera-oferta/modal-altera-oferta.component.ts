import { NgForm } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { OfertasService } from 'src/app/_services/ofertas.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Oferta } from 'src/app/_models/oferta';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-altera-oferta',
  templateUrl: './modal-altera-oferta.component.html',
  styleUrls: ['./modal-altera-oferta.component.css'],
  
})
export class ModalAlteraOfertaComponent implements OnInit {
  oferta: Oferta;
  // user: User;
  urlPhotoEditor: string;

  constructor(
    private bsModalRef: BsModalRef,
    private ofertasService: OfertasService
  ) { }

  ngOnInit()
  {
    // const id = this.route.snapshot.params['id'];
    const userId = JSON.parse(localStorage.getItem('user')).id;
    // const id = this.route.snapshot.params['id'];
    this.urlPhotoEditor = `${environment.URI_API}/users/${userId}/photos/addPhotoToOffer/${this.oferta.id}`;
  }

  close()
  {
    this.bsModalRef.hide();
  }

  alterarOferta()
  {
    const userId = JSON.parse(localStorage.getItem('user')).id;
 
    // this.bsModalRef = this.modalService.show(template, this.modalService.config);

    this.ofertasService.updateOferta(userId, this.oferta).subscribe(data => {
      console.log(data)
      // alert('Alteração com sucesso!!');
      const currentUrl = window.location.href;
      window.location.href = currentUrl;
    }, error => {
      console.log(error)
      alert('ERRO ao alterar oferta')
    })
  }

  removeFoto(photoId, oferta: Oferta)
  {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    this.ofertasService.removeFoto(userId, photoId).subscribe(data => {
      oferta.photos.splice(oferta.photos.findIndex(p => p.id === photoId), 1);
      // alert('foto REMOVIDA!')
      console.log(data)
    }, error => {
      alert('ERRO ao remover foto')
      console.log(error)
    })
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
