import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Survey } from 'src/app/survey/core/models/survey';
import { AnsweredSurveyService } from 'src/app/survey/core/services/answered-survey.service';
import { SurveyService } from 'src/app/survey/core/services/survey.service';

@Component({
  selector: 'app-stagiaire-answers-details',
  templateUrl: './stagiaire-answers-details.component.html',
  styleUrls: ['./stagiaire-answers-details.component.scss']
})
export class StagiaireAnswersDetailsComponent implements OnInit {


  public surveys: Array<Survey> = [];
  public answeredSurveys: Array<any> = [];
  constructor(private surveyService: SurveyService,
    private answeredSurveyService:AnsweredSurveyService,
    private questionService:QuestionService,) { }

  ngOnInit(): void {
    

    this.answeredSurveyService.findAll().subscribe((answeredSurveys: any[]) =>
      this.answeredSurveys = answeredSurveys
      )

      this.surveyService.findAll().subscribe((surveys: Survey[]) =>
    this.surveys = surveys
    )

    
  }

}
