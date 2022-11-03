import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [];
// const routes: Routes = [
//   {
//     path:'',
//     children: [
//        { path: '', redirectTo: 'listadoComic', pathMatch: 'full' },
//        { path: 'listado', component: ComicsComponent },
//        { path: 'events', component: EventsComponent },
//       { path: '**', redirectTo: 'listadoComic' },
//   ]
// }
// ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
