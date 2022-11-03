import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './modules/admin/catalogo/comics/comics.component';
import { EventsComponent } from './modules/admin/catalogo/events/events.component';
import { CharactersComponent } from './modules/admin/catalogo/characters/characters.component';

const routes: Routes = [
  { path: 'characters', component: CharactersComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'characters', component: CharactersComponent },
//   {
//         path: "comics",
//         loadChildren: () =>
//           import("src/app/modules/admin/catalogo/catalogo.module").then((m) => m.CatalogoModule)
//           // canActivate: [AuthGuard]
//  },
{ path: '', redirectTo: 'characters', pathMatch: 'full' },
 { path: '**', component: CharactersComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
