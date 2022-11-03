import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// import { ComicsComponent } from './comics/comics.component';
// import { EventsComponent } from './events/events.component';


@NgModule({
  declarations: [
    // ComicsComponent,
    // EventsComponent
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
  ]
})
export class CatalogoModule { }
