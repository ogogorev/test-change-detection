import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchString = '';
  loading = false;

  ngOnInit(): void { }

  ngAfterViewChecked() {
    console.log('SEARCH rendered');
  }

  onSearchButtonClick() {
    console.log('SEARCH button click');
    this.searchString = '' + Math.random();
  }

  onLoadingChange(loading: boolean) {
    console.log('SEARCH loading changed', loading);
    this.loading = loading;
  }

}
