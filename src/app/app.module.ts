import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { OfertaComponent } from './oferta/oferta.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { FormularioOrdemCompraComponent } from './ordem-compra/formulario-ordem-compra/formulario-ordem-compra.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { BannerComponent } from './banner/banner.component';
import { PainelOfertasComponent } from './user/painel-ofertas/painel-ofertas.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { DescricaoReduzidaPipe } from './_utils/descricao-reduzida.pipe';
import { CarrinhoService } from './_services/carrinho.service';
import { OfertasService } from './_services/ofertas.service';
import { AuthService } from './_services/auth.service';
import { OfertaResolver } from './_resolvers/oferta-resolver';

registerLocaleData(localePt, 'pt');

export function attachToken() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      TopoComponent,
      HomeComponent,
      RodapeComponent,
      RestaurantesComponent,
      OfertaComponent,
      DiversaoComponent,
      ComoUsarComponent,
      OndeFicaComponent,
      DescricaoReduzidaPipe,
      OrdemCompraComponent,
      UserComponent,
      LoginComponent,
      CadastroComponent,
      BannerComponent,
      FormularioOrdemCompraComponent,
      PainelOfertasComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      CarouselModule.forRoot(),
      HttpClientModule,
      FileUploadModule,
      AppRoutingModule,
      ModalModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      JwtModule.forRoot({
         config: {
           tokenGetter: attachToken,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/bowebapi/auth']
         }
       }),
      TabsModule.forRoot()
   ],
   providers: [
      CarrinhoService,
      OfertasService,
      AuthService,
      JwtHelperService,
      OfertaResolver,
      { provide: LOCALE_ID, useValue: 'pt-Pt'}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }