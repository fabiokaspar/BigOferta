import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { CadastroComponent } from './user/cadastro/cadastro.component';
import { LoginComponent } from './user/login/login.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurante', component: RestaurantesComponent },
  { path: 'diversao', component: DiversaoComponent },
  { path: 'ordem-compra', component: OrdemCompraComponent },
  { path: 'oferta/:id', component: OfertaComponent,
    children: [
      { path: '', component: ComoUsarComponent },
      { path: 'como-usar', component: ComoUsarComponent },
      { path: 'onde-fica', component: OndeFicaComponent }
    ]
  },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
