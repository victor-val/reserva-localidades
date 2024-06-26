import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarteleraComponent } from './modules/cartelera/cartelera.component';
import { DetalleEventoComponent } from './modules/detalle-evento/detalle-evento.component';

const routes: Routes = [
  { path: '', component: CarteleraComponent },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'detalle-evento/:id', component: DetalleEventoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
