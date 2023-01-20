import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Question } from 'src/app/question/core/models/question';
import { environment } from 'src/environments/environment';
import { SurveyDto } from '../../dto/survey-dto';
import { Survey } from '../models/survey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Array<Survey> = [];
  private controllerBaseUrl: string = `${environment.apiBaseUrl}/survey`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get<any>(
      this.controllerBaseUrl
    )
      .pipe(
        take(1),
        map((surveys: any[]) => {
          return surveys.map((inputSurvey: any) => {
            const survey: Survey = new Survey();
            survey.setId(inputSurvey.id);
            survey.setTitle(inputSurvey.title)
            survey.setLevel(inputSurvey.level)
            survey.setPoeType(inputSurvey.poeType)
            survey.setQuestions(inputSurvey.questions)

            //console.log(survey);
            return survey;
          })
        })
      )
  }

  public findOne(id: number): Observable<Survey> {
    return this.httpClient.get<any>(
      `${this.controllerBaseUrl}/${id}`
    ).pipe(
      take(1),
      map((inputSurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(inputSurvey.id);
        survey.setTitle(inputSurvey.title);
        survey.setLevel(inputSurvey.level)
        survey.setPoeType(inputSurvey.poeType)
        survey.setQuestions(inputSurvey.questions);
        return survey;
      })
    )
  }

  public addSurvey(survey: SurveyDto): Observable<Survey> {
    console.log('add survey : ', survey)
    return this.httpClient.patch<SurveyDto>(
      this.controllerBaseUrl,
      survey
    )
      .pipe(
        take(1),
        map((surveyDto: any) => {
          const survey: Survey = new Survey();
          survey.setId(surveyDto.id!);
          survey.setTitle(surveyDto.title)
          survey.setLevel(surveyDto.level)
          survey.setPoeType(surveyDto.poeType)
          survey.setQuestions(surveyDto.questions)
          return survey;
        })
      );
  }

  public delete(survey: Survey): Observable<HttpResponse<any>> {
    return this.httpClient.delete(
      `${this.controllerBaseUrl}/${survey.getId()}`,
      {
        observe: 'response'
      }
    );
  }

  public addQuestion(survey: Survey, question: Question): Observable<Survey> {
    return this.httpClient.post<Survey>(
      `${this.controllerBaseUrl}/${survey.getId()}/addQuestion/${question.getId()}`, survey)
      .pipe(
        take(1),
        map((inputSurvey: any) => {
          const survey: Survey = new Survey();
          survey.setId(inputSurvey.id!);
          survey.setTitle(inputSurvey.title);
          survey.setLevel(inputSurvey.level);
          survey.setPoeType(inputSurvey.poeType);

          const questions: Array<Question> = [];
          //survey.setQuestions(inputSurvey.questions);
          return survey;
        })
      )
  }

  public addQuestions(survey: Survey, questions: Array<Question>): Observable<Survey> {
    const questionIds: any[] = [];
    for (let question of questions) { questionIds.push(question.getId); }
    return this.httpClient.patch<Survey>(
      `${this.controllerBaseUrl}/${survey.getId()}/addQuestions`,
      questionIds
    ).pipe(
      take(1),
      map((inputSurvey: any) => {
        const survey: Survey = new Survey();
        survey.setId(inputSurvey.id!);
        survey.setTitle(inputSurvey.title);
        survey.setLevel(inputSurvey.level);
        survey.setPoeType(inputSurvey.poeType)

        //survey.setQuestions(inputSurvey.questions);
        return survey;
      })
    )
  }

}
