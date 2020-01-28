import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';
import { OfertaResolver } from './_resolvers/oferta-resolver';
import { PainelOfertasComponent } from './user/painel-ofertas/painel-ofertas.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurante', component: RestaurantesComponent },
  { path: 'diversao', component: DiversaoComponent },
  { path: 'ordem-compra', component: OrdemCompraComponent },
  { path: 'oferta/:id', component: OfertaComponent, resolve: {offer: OfertaResolver} },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'photo-editor', component: PhotoEditorComponent },
  { path: 'user',
      children: [
        { path: '', component: UserComponent },
        { path: 'painel', component: PainelOfertasComponent}
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
