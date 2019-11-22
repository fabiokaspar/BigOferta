import { catchError } from 'rxjs/operators';
import { OfertasService } from 'src/app/_services/ofertas.service';
import { Oferta } from '../_models/oferta';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

export class OfertaResolver implements Resolve<Oferta> {
    
    constructor(private ofertasService: OfertasService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Oferta>
    {
        if (route.url.length >= 2)
        {
            const id = route.url[1].path;
            return this.ofertasService.getOfertaDetail(id).pipe(
                catchError(error => {
                    console.log(error)
                    return of(null)
                })
            )
        }

        return of(null);
    }

}
