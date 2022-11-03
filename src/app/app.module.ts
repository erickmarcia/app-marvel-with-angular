import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from './shared/modules/material.module';
import { BannerComponent } from './shared/components/partials/banner/banner.component';
import { FooterComponent } from './shared/components/partials/footer/footer.component';
import { SearchComponent } from './shared/components/partials/search/search.component';
import { HeaderComponent } from './shared/components/partials/header/header.component';
import { ListGroupComponent } from './shared/components/partials/list-group/list-group.component';
import { ComicsComponent } from './modules/admin/catalogo/comics/comics.component';
import { EventsComponent } from './modules/admin/catalogo/events/events.component';
import { CharactersComponent } from './modules/admin/catalogo/characters/characters.component';
import { SeriesComponent } from './shared/components/partials/series/series.component';
import { CardsComponent } from './modules/admin/catalogo/cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    FooterComponent,
    SearchComponent,
    HeaderComponent,
    ListGroupComponent,
    ComicsComponent,
    EventsComponent,
    CharactersComponent,
    SeriesComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
