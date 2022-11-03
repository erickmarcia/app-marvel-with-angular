import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent{

  // constructor() { }

  // ngOnInit(): void {
  // }

  @Input() subTitle: string = '';

}
