import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerType } from 'src/app/core/enums/AnswerType';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Survey } from '../../core/models/survey';
import { SurveyService } from '../../core/services/survey.service';
import { SurveyDto } from '../../dto/survey-dto';

@Component({
  selector: 'app-trainee-survey',
  templateUrl: './trainee-survey.component.html',
  styleUrls: ['./trainee-survey.component.scss']
})
export class TraineeSurveyComponent implements OnInit {

  survey: Survey = new Survey();
  surveyFormGroup!: FormGroup;
  questions: Array<Question> = [];
  questionsYesNo: Array<Question> = [];
  questionsFree: Array<Question> = [];
  questionsChooseOne: Array<Question> = [];
  questionsChooseMany: Array<Question> = [];
  idTrainee!: number;

  YESNO!: AnswerType;

  public stagiaire: Stagiaire = new Stagiaire();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private stagiaireService: StagiaireService,
    private _location: Location,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {


    // Récupération du survey via le resolver :
    const data: any = this.route.snapshot.data;
    this.surveyFormGroup = data.form;

    this.route.params
      .subscribe((routeParams: Params) => {
        const surveyId: number = routeParams['idSurvey'];
        this.surveyService.findOne(surveyId)
          .subscribe((survey: Survey) => {
            this.survey = survey;
            this.survey.getQuestions().map((anyQuestion: any) => {
              const question: Question = new Question();
              question.setId(anyQuestion.id);
              question.setText(anyQuestion.text);
              question.setAnswerType(anyQuestion.answerType);
              question.setAnswersProposed(anyQuestion.answersProposed);
              this.questions.push(question);
              // if (anyQuestion.answerType === "FREE") {
              //   this.questionsFree.push(question);
              // } else if (anyQuestion.answerType === "CHOOSE_ONE") {
              //   this.questionsChooseOne.push(question)
              // } else if (anyQuestion.answerType === "CHOOSE_MANY") {
              //   this.questionsChooseMany.push(question)
              // } else if (anyQuestion.answerType === "YES_NO") {
              //   this.questionsChooseOne.push(question)
              // }
              return question;
            }
            )
          });
      })

    console.log(this.questions);

    // Récupération du stagiaire : 
    this.idTrainee = this.route.snapshot.params['id'];
    this.stagiaireService.findOne(this.idTrainee).subscribe((trainee) => {
      return this.stagiaire = trainee;
    });

  }

  public get c(): { [key: string]: AbstractControl } {
    return this.surveyFormGroup.controls;
  }

  public goHome(): void {
    this._location.back();
  }

  onSubmit() {
    const dto: SurveyDto = new SurveyDto(this.surveyFormGroup.value);
    dto.setQuestions(this.questions);
    let subscription: Observable<any>;
    subscription = this.surveyService.addSurvey(this.surveyFormGroup.value); // A remplacer par un update ? 
    subscription.subscribe(() => this.goHome())
  }
}
