import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ImageVariant } from 'src/app/models/image.model';
import { MarvelData } from 'src/app/models/response.model';
import { CatalogoService } from 'src/app/modules/admin/catalogo/services/catalogo.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent  implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<MarvelData>();

 @ViewChild('searchInput')
  inputSearch?: ElementRef;


  constructor(private _service: CatalogoService) { }

  ngAfterViewInit(): void {
      fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value), debounceTime(400),
        distinctUntilChanged()
      ).subscribe(text => this._service.emitText(text))
  }


  ngOnInit(): void {
      this._service.textObservable.subscribe();
  }



}

