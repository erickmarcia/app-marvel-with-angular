import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, fromEvent, map, Subject, switchMap } from 'rxjs';
import { Category, MarvelRequestOptions } from 'src/app/models/request.model';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.scss']
})
export class ComicsComponent implements AfterViewInit {

  category: Category = 'comics';
  public dataSource: Array<any> = [];
  characters: any[] = [];
  character: any;
  notFound = false;
  modal: any;
  options!: MarvelRequestOptions;

  public offset: any = '0';
  public limit: any = '100';

  @ViewChild('searchInput')
  inputSearch?: ElementRef;
  searchText$ = new Subject<string>();
  text:string ='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service: CatalogoService) {
  }

  ngAfterViewInit(): void {

    if(this.dataSource.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }

      fromEvent<any>(this.inputSearch?.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value), debounceTime(400),
        distinctUntilChanged()
      ).subscribe(text => this._service.emitText(text))

  }

   ngOnInit(): void {
        this.text ='';
        this._service.emitText(this.text);

       this.getItem();

        this._service.textObservable.subscribe(text =>{
        this.text = text;
        this.filter(text);
    } )

  }

  total(data: any, price: any){
    let total = 0;
      if(data == 'printPrice')
      {
          total = price;
      }
       else if(data == 'digitalPurchasePrice')
      {
          total = price;
      }
      else {
         total = 0;
      }
      return (total)
    }

  filter(characters: string)
  {
        this.text = characters
        // console.log(this.text);

        if(characters !=='' && characters.length >= 2){
            this.getItemStartWith(this.text);
        }
        else if(characters =='' )
        {
            this.getItem()
        }
  }

   private getItemStartWith(startwith: string)
  {
                this._service.getListComics(startwith,this.offset, this.limit).subscribe((res) => {
       this.dataSource = res.data.results;
    });

      this.searchText$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => this._service.getData(this.category, this.options))).subscribe(data => {this.handleResponse(data, true)
          // console.log(this.dataSource);
        });

    }

  private getItem()
  {

     this._service.getComics(this.category,'',this.offset, this.limit).subscribe((res) => {
      this.dataSource = res.data.results;
    });

  }

        handleResponse(data: any, reset: boolean = false) {
      this.characters = reset ? data.results : [...this.characters, ...data.results];
      this.total = data.total;
      this.options.offset = this.options.offset || data.offset;
      this.notFound = !!!data.results.length;
  }

}
