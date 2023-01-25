import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/answer/core/models/answer';
import { AnswerType } from 'src/app/core/enums/AnswerType';
import { Stagiaire } from 'src/app/core/models/stagiaire';
import { StagiaireService } from 'src/app/core/services/stagiaire.service';
import { Question } from 'src/app/question/core/models/question';
import { QuestionService } from 'src/app/question/core/services/question.service';
import { Request } from 'src/app/user/models/request';
import { AuthService } from 'src/app/user/services/auth-service.service';
import { Survey } from '../../core/models/survey';
import { AnsweredSurveyService } from '../../core/services/answered-survey.service';
import { SurveyService } from '../../core/services/survey.service';
import { AnsweredSurveyDto } from '../../dto/answered-survey-dto';
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
  answer: Answer = new Answer;
  answers: Array<Answer> = [];
  request!: Request;
  public selectedOption!: string;

  YESNO!: AnswerType;

  public stagiaire: Stagiaire = new Stagiaire();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private questionService: QuestionService,
    private stagiaireService: StagiaireService,
    private answeredSurveyService: AnsweredSurveyService,
    private _location: Location,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
              this.surveyFormGroup.addControl(question.getText(), this.formBuilder.control('', [Validators.required]));
              return question;
            }
            )
          });
      })

    // Récupération du stagiaire : 
    this.idTrainee = this.route.snapshot.params['id'];
    this.stagiaireService.findOne(this.idTrainee).subscribe((trainee) => {
      return this.stagiaire = trainee;
    });

  }

  public get c(): { [key: string]: AbstractControl } {
    return this.surveyFormGroup.controls;
  }

  public goThanks(): void {
    this.router.navigateByUrl('/thanks');
  }

  onSubmit() {

    for (const question of this.questions) {
      let answer: Answer = new Answer();
      answer.setQuestion(question);
      answer.setText(this.surveyFormGroup.get(question.getText())!.value);
      this.answers.push(answer);
    }
    this.surveyFormGroup.value.trainee = this.stagiaire;
    this.surveyFormGroup.value.survey = this.survey;
    this.surveyFormGroup.value.answers = this.answers;
    const dto: AnsweredSurveyDto = new AnsweredSurveyDto(this.surveyFormGroup.value);
    dto.setAnswers(this.answers);
    let subscription: Observable<any>;
    subscription = this.answeredSurveyService.addSurvey(dto);
    subscription.subscribe(() => this.goThanks());
  }
}
