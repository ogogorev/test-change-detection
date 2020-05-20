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

    /**
     * 
     * If we send loadingChange event synchronously (without setTimeout),
     * it will produce an ExpressionChangedAfterItHasBeenCheckedError.
     * 
     * As I understand, following events are happening:
     * 1. (search) Search button in the search.component is clicked
     * 2. (search) the searchString is changed in the handler method 
     * 3. (table) new value of searchString passed into table.component
     * 4. (table) new data request is triggered
     * 5. (table) updateLoading function in the table.component is called
     * 6. (table) loadingChange event emitted
     * 7. (search) handler of this event is called
     * 8. (search) loading var is updated with 'true'
     * 9. Angular starts checking (probably it is already started somewhere between steps above)
     * 10. the error is thrown
     * 
     * My assumption is that Angular starts checking between steps 2 and 3.
     * I don't understand why is change detection process started but not finished before the step 3
     * 
     */

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
