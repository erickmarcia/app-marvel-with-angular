import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { Category, MarvelRequestOptions } from 'src/app/models/request.model';
import { MarvelData, MarvelResponse } from 'src/app/models/response.model';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {

  response!: Response
  public dataSource: Array<any> = [];

  category: Category = 'characters';
  characters: any[] = [];
  character: any;
  total = 0;
  notFound = false;
  modal: any;
  options!: MarvelRequestOptions;

  text:string ='';
  public offset: any = '0';
  public limit: any = '100';

  searchText$ = new Subject<string>();

  constructor(private _service: CatalogoService
                     ) { }

  ngOnDestroy(): void {
        this.searchText$.next('null');
        this.searchText$.complete();
  }

  ngOnInit(): void {
    this.text ='';
    this._service.emitText(this.text);
    this._service.textObservable.subscribe(text =>{
        this.text = text;
        this.filter(text);
    } )

  }


  filter(characters: string)
  {
        this.text =characters
        console.log('data'+this.text);
        if(characters !=='' && characters.length >= 2){
            this.getItemStartWith(this.text);
        }
        else if(characters =='' )
        {
            this.getItem()
        }
  }

  private getItem()
  {
     this._service.getCharacters(this.category,'',this.offset, this.limit).subscribe((res) => {
      this.dataSource = res.data.results;
    });

  }

  private getItemStartWith(startwith: string)
  {
      this._service.getCharacters(this.category,startwith,this.offset, this.limit).subscribe((res) => {
        this.dataSource = res.data.results;
      });

      this.searchText$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => this._service.getData(this.category, this.options))).subscribe(data => {this.handleResponse(data, true)
          // console.log(this.dataSource);
        });

    }

      handleResponse(data: any, reset: boolean = false) {
      this.characters = reset ? data.results : [...this.characters, ...data.results];
      this.total = data.total;
      this.options.offset = this.options.offset || data.offset;
      this.notFound = !!!data.results.length;
  }


}
