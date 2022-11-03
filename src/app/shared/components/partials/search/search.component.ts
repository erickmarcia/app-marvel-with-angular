import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MarvelData } from 'src/app/models/response.model';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent  {

  // faSearch = faSearch;
  dataSource = new MatTableDataSource<MarvelData>();

  @Input() title: string = '';
  @Output() searchEvent = new EventEmitter();

  onSearch($event: any) {
    const searchText = $event && $event.target && $event.target.value || '';
    this.searchEvent.emit(searchText);
    // console.log(searchText);
  }

  applyFilter(event:Event)
  {
    const  filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
