import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit {

  title = 'Events';

  public dataSource: Array<any> = [];
  public offset: any = '0';
  public limit: any = '100';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<ListadoItem>;
  // dataSource: ListadoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  // displayedColumns = ['id', 'name'];

  constructor(private _service: CatalogoService) {
    // this.dataSource = new ListadoDataSource();
  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
  }

   ngOnInit(): void {
    this._service.getComics('Avengers',this.offset, this.limit).subscribe((res) => {
      console.log('Respuesta', res);
      this.dataSource = res.data.results;
    });
  }


}
