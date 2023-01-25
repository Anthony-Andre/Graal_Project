import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Answer } from 'src/app/answer/core/models/answer';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { AnsweredSurvey } from 'src/app/survey/core/models/answered-survey';
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
  public answers: Array<Answer> = [];
  public survey: Survey = new Survey();
  public answeredSurvey: AnsweredSurvey = new AnsweredSurvey();
  public answeredSurveys: Array<any> = [];
  public surveysIdsOfStagiaire: Array<Number> = []
  public stagiaire: Stagiaire = new Stagiaire();


  constructor(private surveyService: SurveyService,
    private answeredSurveyService: AnsweredSurveyService,
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private stagiaireService: StagiaireService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe((routeParams: Params) => {
        const surveyId: number = routeParams['id'];
        this.answeredSurveyService.findOne(surveyId).subscribe((answeredSurvey: any) => {
          this.answeredSurvey = answeredSurvey;
          const survey: Survey = new Survey();
          survey.setId(answeredSurvey.getSurvey().id);
          survey.setLevel(answeredSurvey.getSurvey().level);
          survey.setTitle(answeredSurvey.getSurvey().title);
          this.survey = survey;
          this.answeredSurvey.getAnswers().map((anyAnswer: any) => {
            const answer: Answer = new Answer();
            const question: Question = new Question();
            question.setId(anyAnswer.question.id);
            question.setAnswerType(anyAnswer.question.answerType);
            question.setText(anyAnswer.question.text);
            answer.setId(anyAnswer.id);
            answer.setQuestion(question);
            answer.setText(anyAnswer.answer);
            this.answers.push(answer);
            return answer;
          })
        });
      })

  }

}
