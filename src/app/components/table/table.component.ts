import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() search: string;
  @Output() loadingChange = new EventEmitter<boolean>();

  loading = false;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.search) {
      console.log('TABLE on changes');
      this.triggerUpdate();
    }
  }

  ngAfterViewChecked() {
    console.log('TABLE rendered');
  }

  updateLoading(loading: boolean) {
    console.log('TABLE update loading');

    this.loading = loading;
    // setTimeout(() => {
    this.loadingChange.emit(this.loading);
    // }, 0);
  }

  triggerUpdate() {
    this.requestData();
  }

  requestData() {
    if (!this.search) {
      return;
    }

    console.log('TABLE requestData');
    this.updateLoading(true);
    of({})
      .pipe(delay(1000))
      .subscribe(x => {
        console.log('TABLE requestData, result arrived');
        this.updateLoading(false);
      });
  }

}
