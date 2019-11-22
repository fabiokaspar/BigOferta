import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
import { Oferta } from '../_models/oferta';

// const URL = '/api/';

@Component({
  selector: 'app-photo-editor',
  templateUrl: 'photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  @Input() offer: Oferta;
  uploadDone: boolean;

  constructor() {}

  ngOnInit()
  {
    this.uploadDone = false;
    this.initializeUploader();
  }

  public initializeUploader()
  {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    const URL = `${environment.URI_API}/users/${userId}/photos/addPhotoToNewOffer`;

    this.uploader = new FileUploader({
      url: URL,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    });

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('category', (this.offer.category === undefined ? '': this.offer.category));
      form.append('title', (this.offer.category === undefined ? '': this.offer.category));
      form.append('description', (this.offer.description === undefined ? '': this.offer.description));
      form.append('advertiser', (this.offer.advertiser === undefined ? '': this.offer.advertiser));
      form.append('price', (this.offer.price === undefined ? 0 : this.offer.price));
      form.append('isHanked', (this.offer.isHanked === undefined ? false : this.offer.isHanked));
      form.append('comoUsar', (this.offer.comoUsar === undefined ? '': this.offer.comoUsar));
      form.append('ondeFica', (this.offer.ondeFica === undefined ? '': this.offer.ondeFica));
    }

    this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item, response: string, status, headers) => {
      if (response)
      {
        this.uploadDone = true;
        const res: Oferta = JSON.parse(response);
        console.log('response = ', res);

        // this.offer.photos.push(res.photos[0]);
        Object.assign(this.offer, res);
        console.log("--------------->>>>>> ", this.offer)
      }
    };

    this.hasBaseDropZoneOver = false;

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.destroy()
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}

