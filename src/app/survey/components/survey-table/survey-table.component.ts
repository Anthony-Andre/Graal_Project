import { Component, OnInit } from '@angular/core';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.scss']
})
export class SurveyTableComponent implements OnInit {

  // public surveyService!: SurveyService;
  public surveys: Array<Survey> = [];

  constructor(
    private surveyService: SurveyService
  ) { }

  ngOnInit(): void {
    this.surveyService.findAll().subscribe((surveys: Survey[]) => {
      this.surveys = surveys;
    })
  }

}
