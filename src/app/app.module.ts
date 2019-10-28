import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { OfertaComponent } from './oferta/oferta.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { DescricaoReduzidaPipe } from './_utils/descricao-reduzida.pipe';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';

import { CarrinhoService } from './_services/carrinho.service';
import { OfertasService } from './_services/ofertas.service';

// the second parameter 'pt' is optional
registerLocaleData(localePt, 'pt');

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
      OrdemCompraComponent
   ],
   imports: [
      BrowserModule,
      CarouselModule.forRoot(),
      HttpClientModule,
      AppRoutingModule,
      TabsModule.forRoot()
   ],
   providers: [
      CarrinhoService,
      OfertasService,
      { provide: LOCALE_ID, useValue: 'pt-Pt'}
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }