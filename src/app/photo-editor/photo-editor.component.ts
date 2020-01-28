import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/photo';
import { Oferta } from '../_models/oferta';
import { throws } from 'assert';

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
  @Input() url: string;
  @Input() isUpdating: boolean;
  uploadDone: boolean;

  constructor() {}

  ngOnInit()
  {
    this.initializeUploader();
  }

  public initializeUploader()
  {
    this.uploadDone = false;
    const URL = this.url;

    this.uploader = new FileUploader({
      url: URL,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      // queueLimit: 1,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    });

    if (!this.isUpdating)
    {
      this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
        if (this.offer.id !== undefined && this.offer.id !== null)
        {
          form.append('id', this.offer.id);
        }
        form.append('category', this.offer.category || '');
        form.append('title', this.offer.title || '');
        form.append('description', this.offer.description || '');
        form.append('advertiser', this.offer.advertiser || '');
        form.append('price', this.offer.price || 0);
        form.append('isHanked', this.offer.isHanked || false);
        form.append('comoUsar', this.offer.comoUsar || '');
        form.append('ondeFica', this.offer.ondeFica || '');
      }
    }

    // this.uploader.uploadAll();

    this.uploader.onSuccessItem = (item, response: string, status, headers) => {
      if (response)
      {
        this.uploadDone = true;
        const res: Oferta = JSON.parse(response);
        console.log('response = ', res);

        if (!this.isUpdating)
        {
          Object.assign(this.offer, res);
        }
        else
        {
          this.offer.photos.push(res);
        }
        console.log("--------------->>>>>> ", this.offer)
      }
    };

    this.hasBaseDropZoneOver = false;

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}

