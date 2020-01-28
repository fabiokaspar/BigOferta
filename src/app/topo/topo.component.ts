import { AlertifyService } from './../_services/alertify.service';
import { environment } from './../../environments/environment';
import { CarrinhoService } from './../_services/carrinho.service';
import { AuthService } from './../_services/auth.service';
import { OfertasService } from './../_services/ofertas.service';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError, of, Subject } from 'rxjs';
import { Oferta } from '../_models/oferta';
import { switchMap, debounceTime, catchError,distinctUntilChanged, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';

const PHOTO_DEFAULT = '/assets/user.png';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {
  public ofertas: Observable<Oferta[]>;
  public subjectPesquisa: Subject<string> = new Subject<string>();
  uploader: FileUploader;
  // photoUrl;
  user: User = new User();

  constructor(
    public ofertasService: OfertasService,
    public authService: AuthService,
    public alertifyService: AlertifyService,
    public carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit()
  {
    if (this.authService.isLoggedIn())
    {
      this.user = this.authService.getUser();
      this.carrinhoService.loadCartFromStorage();
    }

    this.authService.currentUser.subscribe(user => {
      console.log(user);
      if (user !== null)
      {
        this.user = user;
      }
    }, error => {
      console.log(error);
    });

    this.createObservableOfertas();
  }

  private createObservableOfertas()
  {
    this.ofertas = this.subjectPesquisa.pipe(
      retry(5),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        console.log('***' + termo + '***');
        if (termo === '') {
          return of([]);
        }

        return this.ofertasService.pesquisaPorOfertas(termo);
      }),
      catchError(error => {
        console.log(error);
        return throwError(error);
      })
    );

    this.ofertas.subscribe(x => console.log(x));
  }

  getUsername() {
    const username = this.authService.getUser().userName;

    return username;
  }

  public pesquisaPorOfertas(termoBusca: string): void {
    // console.log(termoBusca);
    this.subjectPesquisa.next(termoBusca.trim());
  }

  public limpaPesquisa(ofertaId: number): void {
    this.subjectPesquisa.next();
    this.router.navigate(['/oferta', ofertaId]);
  }

  public logout() {
    // window.location.href = '/login';
    this.alertifyService.confirm(
      'Deseja mesmo sair?',
      () => { this.quit(); },
      () => { }
    );
  }

  private quit()
  {
    this.router.navigate(['/login']);
    // this.user = null;
    this.authService.logout();
    this.carrinhoService.esvaziaCarrinho()
  }

  public initializePhotoUploader()
  {
    let user: User = this.authService.getUser();
    console.log(user)

    const id = this.authService.getDecodedToken().nameid;
    user.id = id;

    const URL = `${environment.URI_API}/users/${id}/photos/addPhotoToProfile`;

    this.uploader = new FileUploader({
      url: URL,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      method: 'post',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      queueLimit: 1,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    // this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response: string, status, headers) => {
      if (response)
      {
        const res = JSON.parse(response);
        console.log('response = ', res);

        user.profilePhoto = res;

        this.authService.currentUser.next(user);

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    }
  }

  removePhoto()
  {
    const id = this.authService.getDecodedToken().nameid;
    let user: User = this.authService.getUser();
    user.id = id;
    this.authService.removePhoto(id).subscribe((data: Photo) => {
      console.log(data);

      if (data.id > 0)
      {
        // this.authService.currentUser.next(PHOTO_DEFAULT);

        user.profilePhoto = new Photo();
        user.profilePhoto.url = PHOTO_DEFAULT;
        this.authService.currentUser.next(user);

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    }, error => {
      console.log(error)
    });
  }
}
