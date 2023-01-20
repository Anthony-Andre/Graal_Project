import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-survey-filter',
  templateUrl: './survey-filter.component.html',
  styleUrls: ['./survey-filter.component.scss']
})
export class SurveyFilterComponent implements OnInit {

  @Input() filterDate: String | null = null;
  @Output() public onChangeFilter: EventEmitter<String | null> = new EventEmitter<String | null>();

  private buttonMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() { }

  ngOnInit(): void {

    this.buttonMap.set('btnAll', true);
    this.buttonMap.set('btnOneMonth', false);
    this.buttonMap.set('btnSixMonths', false);
    this.buttonMap.set('btnOneYear', false);

    if (this.filterDate === null) {
      this.changeButtonState('btnAll');
    } else {
      if (this.filterDate === "oneMonth") {
        this.changeButtonState('btnOneMonth');
      } else {
        if (this.filterDate === "sixMonth") {
          this.changeButtonState('btnSixMonths');
        } else {
          this.changeButtonState('btnOneYear');
        }
      }
    }
  }

  public getButtonState(key: string): boolean {
    return this.buttonMap.get(key)!;
  }

  public changeButtonState(button: string): void {
    this.buttonMap.forEach((value: Boolean, key: string) => {
      if (key === button) {
        this.buttonMap.set(key, true);
      } else {
        this.buttonMap.set(key, false);
      }
    });

    if (button === 'btnAll') {
      this.onChangeFilter.emit(null);
    } else if (button === 'btnOneMonth') {
      this.onChangeFilter.emit('oneMonth');
    } else if (button === 'btnSixMonths') {
      this.onChangeFilter.emit('sixMonths');
    } else {
      this.onChangeFilter.emit('oneYear');
    }
  }

}
