import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-filter',
  templateUrl: './survey-filter.component.html',
  styleUrls: ['./survey-filter.component.scss']
})
export class SurveyFilterComponent implements OnInit {

  @Input() filterDate: String | null = null;


  constructor() { }

  ngOnInit(): void {
  }

}
