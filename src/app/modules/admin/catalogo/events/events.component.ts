import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Category } from 'src/app/models/request.model';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit {

  category: Category = 'events';
  public dataSource: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service: CatalogoService) {
  }

  ngAfterViewInit(): void {
  }

   ngOnInit(): void {
    this.getItem();
  }

  private getItem()
  {
     this._service.getComics(this.category,'',this.offset, this.limit).subscribe((res) => {
      this.dataSource = res.data.results;
    });

      // this._service.getComics('Avengers',this.offset, this.limit).subscribe((res) => {
      //   this.dataSource = res.data.results;
      // });

  }
  
}
